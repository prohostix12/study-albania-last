'use client';
import { useState } from 'react';
import Image from 'next/image';
import styles from './FAQ.module.css';

const faqs = [
  {
    id: '01',
    question: 'How do I apply to a university in Albania?',
    answer: 'Applying is straightforward and fully guided. Simply reach out through our platform, complete a short profile, and our counsellors will match you with the right university. We handle document preparation, application submission, and admission follow-up — so you can focus on your future.',
    image: '/images/faq-students.png',
  },
  {
    id: '02',
    question: 'What are the tuition fees for international students?',
    answer: 'Tuition fees in Albania are among the most affordable in Europe, ranging from €1,500 to €4,000 per year depending on the program and university. This is 60–70% lower than Western European institutions offering the same ECTS-recognized degrees.',
    image: '/images/why-albania-bg.png',
  },
  {
    id: '03',
    question: 'Are Albanian degrees recognized internationally?',
    answer: 'Yes. All universities we partner with follow the Bologna Process, meaning degrees are fully recognized across all 49 European Higher Education Area member countries. Your qualification will be accepted by employers and institutions across the EU and beyond.',
    image: '/images/faq-students.png',
  },
  {
    id: '04',
    question: 'What language are courses taught in?',
    answer: 'Most international programs are taught entirely in English, with no Albanian language requirement for admission. Some specialized programs offer bilingual instruction. Our team will confirm the language of instruction for each program before you apply.',
    image: '/images/why-albania-bg.png',
  },
  {
    id: '05',
    question: 'What is the cost of living in Albania?',
    answer: 'Albania offers one of the lowest costs of living in Europe. Students typically spend €300–€600 per month on accommodation, food, transport, and leisure. Tirana, the capital, is vibrant, safe, and highly walkable — making it ideal for student life on a budget.',
    image: '/images/faq-students.png',
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(-1);

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
            return (
              <div
                key={faq.id}
                className={`${styles.row} ${isOpen ? styles.active : ''}`}
              >
                {/* Row Header */}
                <button
                  className={styles.rowHeader}
                  onClick={() => setActiveIndex(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span className={styles.num}>{faq.id}</span>
                  <span className={styles.question}>{faq.question}</span>
                  <span className={styles.arrow}>
                    {isOpen ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    )}
                  </span>
                </button>

                {/* Expanded Content */}
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
