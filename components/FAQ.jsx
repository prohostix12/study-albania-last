'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './FAQ.module.css';
import { getFaqs } from '../lib/faqs-data';

export default function FAQ() {
  const [faqs, setFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    getFaqs().then(setFaqs);
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {/* ── Header ── */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <p className={styles.sectionLabel}>FAQ</p>
            <h2 className={styles.title}>
              Albania simplifying{' '}
              <span className={styles.accent}>education for</span>{' '}
              <span className={styles.accent}>everyone</span>
            </h2>
          </div>
          <div className={styles.headerImage}>
            <Image
              src="/images/faq-students.png"
              alt="Students in Albania"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* ── Accordion ── */}
        <div className={styles.accordion}>
          {faqs.map((faq, i) => {
            const isOpen = activeIndex === i;
            const num = String(i + 1).padStart(2, '0');
            return (
              <div
                key={faq.id}
                className={`${styles.row} ${isOpen ? styles.active : ''}`}
              >
                <button
                  className={styles.rowHeader}
                  onClick={() => setActiveIndex(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span className={styles.num}>{num}</span>
                  <span className={styles.question}>{faq.question}</span>
                  <span className={styles.arrow}>
                    {isOpen ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    )}
                  </span>
                </button>

                <div className={`${styles.rowBody} ${isOpen ? styles.rowBodyOpen : ''}`}>
                  <div className={styles.bodyInner}>
                    <div className={styles.bodyLeft}>
                      <p className={styles.answer}>{faq.answer}</p>
                      <span className={styles.star}>✦</span>
                    </div>
                    <div className={styles.bodyImage}>
                      {isOpen && (
                        <video
                          src="/videos/albania-hero.mp4.mp4"
                          autoPlay
                          muted
                          loop
                          playsInline
                          className={styles.faqVideo}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
