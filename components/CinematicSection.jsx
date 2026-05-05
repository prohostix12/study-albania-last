'use client';
import { useEffect, useRef } from 'react';
import styles from './CinematicSection.module.css';

export default function CinematicSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      {/* Background Video */}
      <div className={styles.mediaBg}>
        <video
          className={styles.video}
          src="/videos/albania-hero.mp4.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className={styles.overlay} />
      </div>

      {/* Top label */}
      <div className={styles.topLabel}>
        <span>STUDY ALBANIA</span>
        <span>003</span>
      </div>

      {/* Bottom Content */}
      <div className={styles.bottomContent}>
        <div className={styles.textBlock}>
          <p className={styles.tagline}>YOUR FUTURE STARTS HERE</p>
          <h2 className={styles.headline}>
            Unlock European<br />Education
          </h2>
          <p className={styles.sub}>
            Join thousands of international students building<br />
            global careers through Albania's world-class universities.
          </p>
        </div>

        <a href="#contact" className={styles.cta}>
          Apply Now
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </section>
  );
}
