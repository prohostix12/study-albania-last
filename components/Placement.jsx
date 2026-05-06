'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './Placement.module.css';

const placements = [
  {
    id: 'internships',
    title: 'Internships During Study',
    desc: 'Our partnered universities maintain strong tie-ups with leading local and international companies, offering professional paid internships that start as early as your second year of study.',
    points: ['Paid internship programs in major cities', 'Direct industry mentoring from experts', 'Practical real-world experience', 'Build a professional CV & portfolio'],
    image: '/images/placement-internship.png',
    color: '#4A7AFA',
    layout: 'left'
  },
  {
    id: 'jobs',
    title: 'Global Job Opportunities',
    desc: 'Albania\'s rapidly growing economy and strategic ties to EU markets provide graduates with exclusive access to high-demand roles both within the country and across the European Union.',
    points: ['Access to IT, Engineering & Business roles', 'Direct placements in EU-based companies', 'Support for remote work opportunities', 'Personalized career counselling and prep'],
    image: '/images/why-albania-bg.png',
    color: '#7B4FFF',
    layout: 'right'
  },
  {
    id: 'pathway',
    title: 'EU Higher Studies Pathway',
    desc: 'Your Albanian degree is ECTS-recognized across Europe, serving as a powerful gateway for seamless applications to prestigious Master\'s or PhD programs throughout the continent.',
    points: ['Direct admission to EU universities', 'Erasmus+ international mobility programs', 'Advanced research opportunities', 'Clear PhD pathways across European capitals'],
    image: '/images/faq-students.png',
    color: '#E8A020',
    layout: 'left'
  },
];

export default function Placement() {
  const [visibleRows, setVisibleRows] = useState(new Set());
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = entry.target.getAttribute('data-index');
            if (index !== null) {
              setVisibleRows(prev => {
                const next = new Set(prev);
                next.add(index);
                return next;
              });
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      const rows = sectionRef.current.querySelectorAll(`.${styles.row}`);
      rows.forEach(row => observer.observe(row));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} id="placement" ref={sectionRef}>
      <div className={styles.container}>
        {placements.map((p, i) => (
          <div 
            key={p.id} 
            data-index={i}
            className={`${styles.row} ${p.layout === 'right' ? styles.reverse : ''} ${visibleRows.has(String(i)) ? styles.revealed : ''}`}
          >
            {/* Image Side */}
            <div className={styles.imageSide}>
              <div className={styles.imageFrame}>
                <Image 
                  src={p.image} 
                  alt={p.title} 
                  fill 
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className={styles.imageOverlay} style={{ background: `linear-gradient(135deg, ${p.color}22, transparent)` }} />
              </div>
            </div>

            {/* Content Side */}
            <div className={styles.contentSide}>
              <div className={styles.contentInner}>
                <div className={styles.tag} style={{ color: p.color, background: `${p.color}11` }}>
                  Placement Pillar 0{i + 1}
                </div>
                <h2 className={styles.title}>{p.title}</h2>
                <p className={styles.description}>{p.desc}</p>
                
                <ul className={styles.points}>
                  {p.points.map((pt, idx) => (
                    <li key={idx} className={styles.point}>
                      <span className={styles.dot} style={{ background: p.color }} />
                      {pt}
                    </li>
                  ))}
                </ul>

                <a href="#apply" className={styles.cta} style={{ borderBottomColor: p.color }}>
                  Explore Opportunities
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
