'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Universities.module.css';
import { getUniversities } from '../lib/universities-data';

export default function Universities() {
  const sectionRef = useRef(null);
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    getUniversities().then(setUniversities);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(`.${styles.card}`).forEach((el, i) => {
              setTimeout(() => el.classList.add(styles.visible), i * 150);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [universities]);

  return (
    <section className={styles.section} id="universities" ref={sectionRef}>
      <div className={styles.inner}>
        
        {/* ── Grid ── */}
        <div className={styles.grid}>
          {universities.map((uni, i) => (
            <div key={uni.id ?? i} className={styles.card}>
              
              {/* Image Header */}
              <div className={styles.imageHeader}>
                <Image
                  src={uni.coverImage || '/images/why-albania-bg.png'}
                  alt={uni.name}
                  fill
                  className={styles.coverImg}
                  priority={i < 3}
                />
                <div className={styles.badge}>
                  {uni.badge || 'Accredited'}
                </div>
                <div className={styles.logoOverlay} />
                <div className={styles.logoBox}>
                  {uni.logo ? (
                    <Image src={uni.logo} alt="logo" width={40} height={40} />
                  ) : (
                    <span style={{ color: uni.color, fontWeight: 800 }}>{uni.short}</span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className={styles.content}>
                <div className={styles.mainInfo}>
                  <div className={styles.locationRow}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/>
                    </svg>
                    {uni.location}
                  </div>
                  <h3 className={styles.uniName}>{uni.name}</h3>
                </div>

                <p className={styles.description}>{uni.description}</p>

                <div className={styles.statsGrid}>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Annual Tuition</span>
                    <span className={styles.statValue}>{uni.tuition}</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Est. Year</span>
                    <span className={styles.statValue}>{uni.founded}</span>
                  </div>
                </div>

                <div className={styles.actions}>
                  <a href="#apply" className={styles.applyBtn}>
                    Apply Now
                  </a>
                  <Link href={`/universities/${uni.id}`} className={styles.detailsBtn}>
                    Explore →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
