'use client';
import { useEffect, useRef } from 'react';
import styles from './Placement.module.css';

const placements = [
  {
    icon: '💼',
    title: 'Internships During Study',
    desc: 'All universities have tie-ups with local and international companies offering paid internships starting from your 2nd year.',
    points: ['Paid internship programs', 'Industry mentoring', 'Real-world experience', 'CV & portfolio building'],
    color: '#2D6BE4',
  },
  {
    icon: '🌍',
    title: 'Job Opportunities',
    desc: 'Albania\'s growing economy and strong ties to EU markets give graduates access to jobs both locally and across Europe.',
    points: ['IT, Business & Engineering jobs', 'EU company placements', 'Remote work opportunities', 'Career counselling support'],
    color: '#7B4FFF',
    featured: true,
  },
  {
    icon: '🎓',
    title: 'EU Higher Studies Pathway',
    desc: 'Your Albanian degree is ECTS-recognized across Europe, enabling seamless applications for Master\'s or PhD programs in EU.',
    points: ['Apply to EU universities', 'Erasmus+ mobility programs', 'Research opportunities', 'PhD pathways in Europe'],
    color: '#E8A020',
  },
];

export default function Placement() {
  const sectionRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.fade-up').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 130);
          });
        }
      }),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section" id="placement" ref={sectionRef}>
      <div className="container">

        <div className={styles.cards}>
          {placements.map((p, i) => (
            <div key={i} className={`${styles.card} ${p.featured ? styles.featured : ''} fade-up`} style={{ '--card-color': p.color }}>
              {p.featured && <div className={styles.featuredBadge}>Most Popular</div>}
              <div className={styles.cardIcon} style={{ background: `${p.color}18` }}>
                <span>{p.icon}</span>
              </div>
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.cardDesc}>{p.desc}</p>
              <ul className={styles.points}>
                {p.points.map(pt => (
                  <li key={pt} className={styles.point}>
                    <span className={styles.pointCheck} style={{ color: p.color }}>✓</span>
                    {pt}
                  </li>
                ))}
              </ul>
              <a href="#apply" className={styles.cardCta} style={{ background: `linear-gradient(135deg, ${p.color}, ${p.color}cc)` }}>
                Learn More →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
