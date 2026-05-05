'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './UniversitiesHome.module.css';

/*
  Layout:

  ┌──────────────────┬──────────────────────┐
  │                  │  EPOKA  (flex-grow)  │  ← epoka & wbu share vertical space
  │  CIT  (tall)     ├──────────────────────┤    hover one → other shrinks vertically
  │                  │  WBU    (flex-grow)  │
  ├──────────┬───────┴──────────────────────┤
  │  MUA     │  LUARASI                     │  ← mua & luarasi share horizontal space
  └──────────┴──────────────────────────────┘

  Accordion pairs:
  1. CIT  ↔  rightPanel  (horizontal, flex-grow)
  2. EPOKA ↔ WBU         (vertical,   flex-grow inside rightPanel)
  3. MUA  ↔  LUARASI     (horizontal, flex-grow)
*/

const UNIS = {
  cit:     { id:1, name:'Canadian Institute of Technology',    badge:'Top Ranked',    color:'#C8102E', image:'https://images.unsplash.com/photo-1562774053-701939374585?w=900&q=80&auto=format&fit=crop' },
  epoka:   { id:2, name:'Epoka University',                    badge:'EU Accredited', color:'#003087', image:'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=900&q=80&auto=format&fit=crop' },
  wbu:     { id:3, name:'Western Balkans University',          badge:'Innovation Hub',color:'#1B5E20', image:'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=900&q=80&auto=format&fit=crop' },
  mua:     { id:4, name:'Mediterranean University of Albania', badge:'International', color:'#006BA6', image:'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=900&q=80&auto=format&fit=crop' },
  luarasi: { id:5, name:'Luarasi University',                  badge:'Law Excellence',color:'#6A1B9A', image:'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=900&q=80&auto=format&fit=crop' },
};

const D = 1;      // default flex-grow
const E = 1.35;   // expanded  (was 1.75)
const S = 0.72;   // shrunk    (was 0.35)

export default function UniversitiesHome() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // 3 independent accordion states
  const [lrHover,    setLrHover]    = useState(null); // 'cit' | 'right'   — left/right top
  const [tbHover,    setTbHover]    = useState(null); // 'epoka' | 'wbu'   — top/bottom inside right panel
  const [botHover,   setBotHover]   = useState(null); // 'mua' | 'luarasi' — bottom row

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.06 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // CIT ↔ rightPanel (horizontal)
  const citGrow   = lrHover === 'cit'   ? E : lrHover === 'right' ? S : D;
  const rightGrow = lrHover === 'right' ? E : lrHover === 'cit'   ? S : D;

  // EPOKA ↔ WBU (vertical inside right panel)
  const epokaGrow = tbHover === 'epoka' ? E : tbHover === 'wbu'   ? S : D;
  const wbuGrow   = tbHover === 'wbu'   ? E : tbHover === 'epoka' ? S : D;

  // MUA ↔ LUARASI (horizontal)
  const muaGrow     = botHover === 'mua'     ? E : botHover === 'luarasi' ? S : D;
  const luarasiGrow = botHover === 'luarasi' ? E : botHover === 'mua'     ? S : D;

  // topSection ↔ bottomRow (vertical) — triggered when bottom row is hovered
  const topGrow = botHover ? S : D;
  const botGrow = botHover ? E : D;

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

        <div className={`${styles.gridWrap} ${visible ? styles.gridVisible : ''}`}>

          {/* ── TOP SECTION ── */}
          <div className={styles.topSection} style={{ flexGrow: topGrow }}>

            {/* CIT — left tall */}
            <div
              className={styles.citWrap}
              style={{ flexGrow: citGrow }}
              onMouseEnter={() => setLrHover('cit')}
              onMouseLeave={() => setLrHover(null)}
            >
              <Card uni={UNIS.cit} visible={visible} delay={0} nameLg />
            </div>

            {/* Right panel — EPOKA stacked on WBU, each with independent vertical accordion */}
            <div
              className={styles.rightPanel}
              style={{ flexGrow: rightGrow }}
            >
              {/* EPOKA */}
              <div
                className={styles.rightCard}
                style={{ flexGrow: epokaGrow }}
                onMouseEnter={() => { setLrHover('right'); setTbHover('epoka'); }}
                onMouseLeave={() => { setLrHover(null);    setTbHover(null);   }}
              >
                <Card uni={UNIS.epoka} visible={visible} delay={90} />
              </div>

              {/* WBU */}
              <div
                className={styles.rightCard}
                style={{ flexGrow: wbuGrow }}
                onMouseEnter={() => { setLrHover('right'); setTbHover('wbu'); }}
                onMouseLeave={() => { setLrHover(null);    setTbHover(null);  }}
              >
                <Card uni={UNIS.wbu} visible={visible} delay={180} />
              </div>
            </div>

          </div>

          {/* ── BOTTOM ROW ── */}
          <div className={styles.bottomRow} style={{ flexGrow: botGrow }}>

            <div
              className={styles.muaWrap}
              style={{ flexGrow: muaGrow }}
              onMouseEnter={() => setBotHover('mua')}
              onMouseLeave={() => setBotHover(null)}
            >
              <Card uni={UNIS.mua} visible={visible} delay={270} nameSm />
            </div>

            <div
              className={styles.luarasiWrap}
              style={{ flexGrow: luarasiGrow }}
              onMouseEnter={() => setBotHover('luarasi')}
              onMouseLeave={() => setBotHover(null)}
            >
              <Card uni={UNIS.luarasi} visible={visible} delay={360} />
            </div>

          </div>

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

function Card({ uni, visible, delay, nameLg, nameSm }) {
  return (
    <div
      className={`${styles.card} ${visible ? styles.cardVisible : ''}`}
      style={{ transitionDelay: `${delay}ms`, '--card-color': uni.color }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={uni.image} alt={uni.name} className={styles.cardImg} loading="lazy" />
      <div className={styles.overlay} />
      <div className={styles.cardContent}>
        <span className={styles.cardBadge}>✦ {uni.badge}</span>
        <h3 className={`${styles.cardName} ${nameLg ? styles.nameLg : ''} ${nameSm ? styles.nameSm : ''}`}>
          {uni.name}
        </h3>
      </div>
      <div className={styles.cardArrow}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M7 17L17 7M17 7H7M17 7v10"/>
        </svg>
      </div>
    </div>
  );
}
