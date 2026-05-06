'use client';
import { useEffect, useState } from 'react';
import styles from './PageHeader.module.css';
import Link from 'next/link';

export default function PageHeader({ title, subtitle, breadcrumb }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className={styles.header}>
      {/* Video Background */}
      <div className={styles.videoWrapper}>
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
      
      <div className={`container ${styles.content}`}>
        <div className={`${styles.revealContent} ${isVisible ? styles.revealed : ''}`}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
      </div>
    </section>
  );
}
