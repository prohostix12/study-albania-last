'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './UniversitiesHome.module.css';

/*
  Grid areas:
  col:   1(left)    2+3(right, merged for epoka/wbu)
  row1:  CIT        EPOKA
  row2:  CIT        WBU
  row3:  MUA        LUARASI

  Accordion behaviour (horizontal only):
  - Hover CIT     → col1 grows,  cols2-3 shrink
  - Hover EPOKA/WBU → col1 shrinks, cols2-3 grow
  - Hover MUA     → col1 grows,  cols2-3 shrink  (bottom row)
  - Hover LUARASI → col1 shrinks, cols2-3 grow   (bottom row)
*/

const UNIVERSITIES = [
  {
    id: 1,
    name: 'Canadian Institute of Technology',
    badge: 'Top Ranked',
    color: '#C8102E',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=900&q=80&auto=format&fit=crop',
    area: 'cit',
    side: 'left',   // which column group this card belongs to
  },
  {
    id: 2,
    name: 'Epoka University',
    badge: 'EU Accredited',
    color: '#003087',
    image: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=900&q=80&auto=format&fit=crop',
    area: 'epoka',
    side: 'right',
  },
  {
    id: 3,
    name: 'Western Balkans University',
    badge: 'Innovation Hub',
    color: '#1B5E20',
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=900&q=80&auto=format&fit=crop',
    area: 'wbu',
    side: 'right',
  },
  {
    id: 4,
    name: 'Mediterranean University of Albania',
    badge: 'International',
    color: '#006BA6',
    image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=900&q=80&auto=format&fit=crop',
    area: 'mua',
    side: 'left',
  },
  {
    id: 5,
    name: 'Luarasi University',
    badge: 'Law Excellence',
    color: '#6A1B9A',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=900&q=80&auto=format&fit=crop',
    area: 'luarasi',
    side: 'right',
  },
];

// Default column ratio: col1 = 2fr, cols2+3 = 2.8fr total
const DEFAULT_LEFT  = 2;
const DEFAULT_RIGHT = 2.8;
const EXPAND_LEFT   = 2.9;   // col1 when a left-side card is hovered
const SHRINK_LEFT   = 1.4;   // col1 when a right-side card is hovered

export default function UniversitiesHome() {
  const sectionRef  = useRef(null);
  const [hovered, setHovered] = useState(null);   // uni id
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.06 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Compute column widths based on which card is hovered
  const hoveredUni = UNIVERSITIES.find(u => u.id === hovered);
  let col1, col23;
  if (!hoveredUni) {
    col1  = DEFAULT_LEFT;
    col23 = DEFAULT_RIGHT;
  } else if (hoveredUni.side === 'left') {
    col1  = EXPAND_LEFT;
    col23 = DEFAULT_LEFT + DEFAULT_RIGHT - EXPAND_LEFT;
  } else {
    col1  = SHRINK_LEFT;
    col23 = DEFAULT_LEFT + DEFAULT_RIGHT - SHRINK_LEFT;
  }

  // cols 2 and 3 are always equal halves of col23
  const col2 = col23 / 2;
  const col3 = col23 / 2;

  const gridStyle = {
    gridTemplateColumns: `${col1}fr ${col2}fr ${col3}fr`,
  };

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.inner}>

        {/* Header */}
        <div className={`${styles.header} ${visible ? styles.headerVisible : ''}`}>
          <span className={styles.tag}>🎓 Partner Universities</span>
          <h2 className={styles.title}>
            Top Universities in <span className={styles.accent}>Albania</span>
          </h2>
          <p className={styles.subtitle}>
            Fully accredited, internationally recognized degrees with English-taught programs.
          </p>
        </div>

        {/* Bento grid */}
        <div
          className={`${styles.grid} ${visible ? styles.gridVisible : ''}`}
          style={gridStyle}
        >
          {UNIVERSITIES.map((uni, i) => (
            <UniCard
              key={uni.id}
              uni={uni}
              hovered={hovered}
              setHovered={setHovered}
              delay={i * 90}
              visible={visible}
            />
          ))}
        </div>

        {/* CTA */}
        <div className={`${styles.cta} ${visible ? styles.ctaVisible : ''}`}>
          <a href="/universities" className={styles.ctaBtn}>
            View All Universities
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}

function UniCard({ uni, hovered, setHovered, delay, visible }) {
  const isHovered = hovered === uni.id;

  return (
    <div
      className={[
        styles.card,
        styles[`area_${uni.area}`],
        visible   ? styles.cardVisible  : '',
        isHovered ? styles.cardHovered  : '',
      ].join(' ')}
      style={{ transitionDelay: `${delay}ms`, '--card-color': uni.color }}
      onMouseEnter={() => setHovered(uni.id)}
      onMouseLeave={() => setHovered(null)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={uni.image} alt={uni.name} className={styles.cardImg} loading="lazy" />
      <div className={styles.overlay} />

      <div className={styles.cardContent}>
        <span className={styles.cardBadge}>✦ {uni.badge}</span>
        <h3 className={styles.cardName}>{uni.name}</h3>
      </div>

      <div className={styles.cardArrow}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M7 17L17 7M17 7H7M17 7v10"/>
        </svg>
      </div>
    </div>
  );
}
