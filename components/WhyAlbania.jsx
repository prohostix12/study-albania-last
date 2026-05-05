'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './WhyAlbania.module.css';

const advantages = [
  {
    id: '01',
    label: 'ADVANTAGE',
    title: 'Affordable Tuition',
    desc: 'Save 60–70% compared to Western Europe. Quality European education without the premium price tag.',
  },
  {
    id: '02',
    label: 'RECOGNITION',
    title: 'European ECTS',
    desc: 'All degrees follow the Bologna Process. Fully recognized across EU member states for your career.',
  },
  {
    id: '03',
    label: 'OPPORTUNITY',
    title: 'EU Pathway',
    desc: 'Albania\'s EU candidacy opens doors to Erasmus+ and eventual career pathways across Europe.',
  },
  {
    id: '04',
    label: 'ENVIRONMENT',
    title: 'Safe & Vibrant',
    desc: 'Experience a welcoming Mediterranean lifestyle with low living costs and a safe student community.',
  },
];

export default function WhyAlbania() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.fade-up').forEach((el) => {
              el.classList.add('visible');
            });
          }
        });

      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} id="why-albania" ref={sectionRef}>
      <div className={styles.topInfo}>
        <div className="container">
          <div className={styles.topFlex}>
            <span>*</span>
            <span>002</span>
            <span>WHY CHOOSE ALBANIA?</span>
          </div>
        </div>
      </div>

      <div className="container">
        <div className={styles.layout}>
          <div className={`${styles.mainCard} fade-up`}>
            <div className={styles.cardBg}>
              <Image 
                src="/images/why-albania-bg.png" 
                alt="Study in Albania" 
                fill 
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardIcon}>✦</div>
              <div className={styles.mainWindow}>
                <h2 className={styles.cardMainTitle}>
                  The Smart Choice For<br />
                  International Students
                </h2>
                
                <div className={styles.windowFooter}>
                  <div className={styles.footerLabel}>PREMIUM EDUCATION ACCESS</div>
                  <p>
                    Secure your future with European-standard degrees, English-taught 
                    programs, globally recognized ECTS credits, and extensive 
                    placement opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles.grid} fade-up`}>
            {advantages.map((item, i) => (
              <div key={i} className={`${styles.item} fade-up`}>
                <div className={styles.line}></div>
                <div className={styles.label}>{item.id} — {item.label}</div>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                <p className={styles.itemDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

