'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './Universities.module.css';
import { getUniversities } from '../lib/universities-data';

export default function Universities() {
  const sectionRef = useRef(null);
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    setUniversities(getUniversities());
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.fade-up').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100);
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

        {/* ── Header ── */}
        <div className={styles.header}>
          <span className={`${styles.sectionTag} fade-up`}>🎓 Partner Universities</span>
          <h2 className={`${styles.title} fade-up`}>
            Top Universities in <span className={styles.accent}>Albania</span>
          </h2>
          <p className={`${styles.subtitle} fade-up`}>
            All our partner universities are fully accredited, offering internationally recognized degrees with English-taught programs.
          </p>
        </div>

        {/* ── Grid ── */}
        <div className={styles.grid}>
          {universities.map((uni, i) => (
            <div key={uni.id ?? i} className={`${styles.card} fade-up`}>

              {/* Cover / Banner */}
              <div
                className={styles.cover}
                style={{ background: uni.coverImage ? undefined : `linear-gradient(135deg, ${uni.color}22 0%, ${uni.color}44 100%)` }}
              >
                {uni.coverImage && (
                  <Image
                    src={uni.coverImage}
                    alt={`${uni.name} campus`}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className={styles.coverImg}
                  />
                )}
                {/* Badge */}
                <span className={styles.badge} style={{ background: uni.badgeColor ?? uni.color }}>
                  {uni.badge}
                </span>
              </div>

              {/* Card Body */}
              <div className={styles.body}>

                {/* Logo + Name row */}
                <div className={styles.logoRow}>
                  <div className={styles.logoWrap} style={{ background: uni.bgColor ?? '#f0f4ff', borderColor: `${uni.color}33` }}>
                    {uni.logo ? (
                      <Image
                        src={uni.logo}
                        alt={`${uni.name} logo`}
                        width={48}
                        height={48}
                        className={styles.logoImg}
                      />
                    ) : (
                      <span className={styles.logoText} style={{ color: uni.color }}>
                        {uni.short}
                      </span>
                    )}
                  </div>

                  <div className={styles.nameBlock}>
                    <h3 className={styles.uniName}>{uni.name}</h3>
                    <p className={styles.uniType}>{uni.type}</p>
                  </div>
                </div>

                {/* Description */}
                {uni.description && (
                  <p className={styles.description}>{uni.description}</p>
                )}

                {/* Stats row */}
                <div className={styles.statsRow}>
                  <div className={styles.stat}>
                    <span className={styles.statIcon}>📍</span>
                    <span className={styles.statVal}>{uni.location}</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statIcon}>📅</span>
                    <span className={styles.statVal}>Est. {uni.founded}</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statIcon}>👥</span>
                    <span className={styles.statVal}>{uni.students}</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statIcon}>💰</span>
                    <span className={styles.statVal}>{uni.tuition}</span>
                  </div>
                </div>

                {/* Divider */}
                <div className={styles.divider} />

                {/* Courses */}
                <div className={styles.courses}>
                  <p className={styles.coursesLabel}>Available Programs</p>
                  <div className={styles.courseTags}>
                    {uni.courses.map(c => (
                      <span key={c} className={styles.courseTag} style={{ borderColor: `${uni.color}33`, color: uni.color }}>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className={styles.actions}>
                  <a href="#apply" className={styles.applyBtn} style={{ background: uni.color }}>
                    Apply Now
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </a>
                  {uni.website && (
                    <a href={uni.website} target="_blank" rel="noopener noreferrer" className={styles.websiteBtn}>
                      Visit Website
                    </a>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
