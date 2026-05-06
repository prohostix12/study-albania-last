'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './PageHeader.module.css';

export default function PageHeader({ 
  title, 
  subtitle, 
  videoSrc = '/videos/albania-hero.mp4.mp4',
  imageSrc = null
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsVisible(true);
  }, []);

  return (
    <header className={styles.header}>
      {/* Background: Image or Video */}
      <div className={styles.videoWrapper}>
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={title}
            fill
            className={styles.video}
            style={{ objectFit: 'cover' }}
            priority
          />
        ) : (
          <video 
            className={styles.video}
            src={videoSrc} 
            autoPlay 
            muted 
            loop 
            playsInline
          />
        )}
        <div className={styles.overlay} />
      </div>
      
      <div className={`container ${styles.content}`}>
        <div className={`${styles.revealContent} ${isVisible ? styles.revealed : ''}`}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
      </div>
    </header>
  );
}
