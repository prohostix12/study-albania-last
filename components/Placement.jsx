'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './Placement.module.css';
import { getPlacements } from '../lib/placements-data';

export default function Placement() {
  const [placements, setPlacements] = useState([]);
  const [visibleRows, setVisibleRows] = useState(new Set());
  const rowRefs = useRef([]);

  useEffect(() => {
    setPlacements(getPlacements());
  }, []);

  useEffect(() => {
    if (!placements.length) return;
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
    rowRefs.current.forEach(row => { if (row) observer.observe(row); });
    return () => observer.disconnect();
  }, [placements]);

  return (
    <section className={styles.section} id="placement">
      <div className={styles.container}>
        {placements.map((p, i) => (
          <div
            key={p.id}
            data-index={i}
            ref={el => rowRefs.current[i] = el}
            className={`${styles.row} ${p.layout === 'right' ? styles.reverse : ''} ${visibleRows.has(String(i)) ? styles.revealed : ''}`}
          >
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
