'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './CTABanner.module.css';
import { saveEnquiry } from '../lib/enquiries-data';

export default function CTABanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    saveEnquiry({ name: name.trim(), email: email.trim(), source: 'CTA Banner' });
    setName('');
    setEmail('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  }

  return (
    <section className={styles.banner} id="cta" ref={sectionRef}>
      <div className={styles.container}>
        <div className={`${styles.card} ${isVisible ? styles.cardVisible : ''}`}>

          <div className={styles.header}>
            <h2 className={styles.title}>
              Ready to get started your journey?
            </h2>
            <p className={styles.subtitle}>
              This adds a bit more emphasis while still being concise.
            </p>
          </div>

          {submitted ? (
            <div className={styles.successMsg}>
              ✓ Thank you! We&apos;ll be in touch soon.
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <input
                  type="text"
                  placeholder="Your name..."
                  className={styles.input}
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className={styles.formRow}>
                <input
                  type="email"
                  placeholder="Your e-mail..."
                  className={styles.input}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className={styles.submitBtn}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </section>
  );
}
