'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './LivingCost.module.css';

const costs = [
  { label: 'Rent (shared flat)', range: '₹8,000 – ₹14,000', icon: '🏠' },
  { label: 'Food & Groceries', range: '₹7,000 – ₹10,000', icon: '🍽️' },
  { label: 'Transport', range: '₹1,500 – ₹2,500', icon: '🚌' },
  { label: 'Phone & Internet', range: '₹800 – ₹1,200', icon: '📱' },
];

const partTimeInfo = [
  { icon: '⏰', title: 'Flexible Hours', desc: 'Work up to 20 hours/week during semester and full-time during holidays.' },
  { icon: '💵', title: 'Earn While You Learn', desc: 'Average part-time income covers 30–50% of your monthly living expenses.' },
  { icon: '📋', title: 'Legal & Supported', desc: 'Our team helps you find legitimate part-time work with proper documentation.' },
];

const livingSections = [
  {
    id: 'costs',
    tag: 'Living Economy 01',
    title: 'Monthly Cost Breakdown',
    desc: 'Enjoy a high quality of life at a fraction of the cost. Albania is one of the most affordable study destinations in Europe, allowing students to maintain a comfortable lifestyle on a modest budget.',
    image: '/images/cit_campus.png',
    color: '#4A7AFA',
    layout: 'left',
    type: 'costs'
  },
  {
    id: 'part-time',
    tag: 'Living Economy 02',
    title: 'Part-Time Work Opportunities',
    desc: 'International students can work part-time in Albania legally, helping offset living costs while gaining valuable work experience in a growing economy.',
    image: '/images/mua_campus.png',
    color: '#7B4FFF',
    layout: 'right',
    type: 'part-time'
  },
  {
    id: 'accommodation',
    tag: 'Living Economy 03',
    title: 'Premium Student Housing',
    desc: 'University dorms, shared apartments, and homestays are available at highly competitive prices. All locations are near campuses with modern facilities and full security.',
    image: '/images/epoka_campus.png',
    color: '#E8A020',
    layout: 'left',
    type: 'accommodation'
  }
];

export default function LivingCost() {
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
    <section className={styles.section} id="living-cost" ref={sectionRef}>
      <div className={styles.container}>
        {livingSections.map((s, i) => (
          <div 
            key={s.id} 
            data-index={i}
            className={`${styles.row} ${s.layout === 'right' ? styles.reverse : ''} ${visibleRows.has(String(i)) ? styles.revealed : ''}`}
          >
            {/* Image Side */}
            <div className={styles.imageSide}>
              <div className={styles.imageFrame}>
                <Image 
                  src={s.image} 
                  alt={s.title} 
                  fill 
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className={styles.imageOverlay} style={{ background: `linear-gradient(135deg, ${s.color}22, transparent)` }} />
              </div>
            </div>

            {/* Content Side */}
            <div className={styles.contentSide}>
              <div className={styles.contentInner}>
                <div className={styles.tag} style={{ color: s.color, background: `${s.color}11` }}>
                  {s.tag}
                </div>
                <h2 className={styles.title}>{s.title}</h2>
                <p className={styles.description}>{s.desc}</p>
                
                {s.type === 'costs' && (
                  <div className={styles.costGrid}>
                    {costs.map((c, idx) => (
                      <div key={idx} className={styles.costItem}>
                        <div className={styles.costMain}>
                          <span className={styles.costLabel}>{c.label}</span>
                          <span className={styles.costValue}>{c.range}</span>
                        </div>
                        <div className={styles.costBar}>
                          <div className={styles.costBarFill} style={{ width: `${40 + idx * 15}%`, background: s.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {s.type === 'part-time' && (
                  <div className={styles.featureGrid}>
                    {partTimeInfo.map((item, idx) => (
                      <div key={idx} className={styles.featureItem}>
                        <div className={styles.featureIcon} style={{ background: `${s.color}18`, color: s.color }}>{item.icon}</div>
                        <div>
                          <h4 className={styles.featureTitle}>{item.title}</h4>
                          <p className={styles.featureDesc}>{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {s.type === 'accommodation' && (
                  <div className={styles.amenities}>
                    {['🛏️ Furnished Rooms', '🔒 24/7 Security', '📶 High-speed Wi-Fi', '🍳 Kitchen Access'].map((item, idx) => (
                      <span key={idx} className={styles.amenity}>{item}</span>
                    ))}
                  </div>
                )}

                <a href="#apply" className={styles.cta} style={{ borderBottomColor: s.color }}>
                  Explore Life in Albania
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
