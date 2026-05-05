'use client';
import { useEffect, useRef } from 'react';
import styles from './LivingCost.module.css';

const costs = [
  { label: 'Rent (shared flat)', range: '₹8,000 – ₹14,000', icon: '🏠' },
  { label: 'Food & Groceries', range: '₹7,000 – ₹10,000', icon: '🍽️' },
  { label: 'Transport', range: '₹1,500 – ₹2,500', icon: '🚌' },
  { label: 'Phone & Internet', range: '₹800 – ₹1,200', icon: '📱' },
  { label: 'Entertainment', range: '₹2,000 – ₹4,000', icon: '🎭' },
  { label: 'Health & Personal', range: '₹1,500 – ₹3,000', icon: '💊' },
];

const partTimeInfo = [
  { icon: '⏰', title: 'Flexible Hours', desc: 'Work up to 20 hours/week during semester and full-time during holidays.' },
  { icon: '💵', title: 'Earn While You Learn', desc: 'Average part-time income covers 30–50% of your monthly living expenses.' },
  { icon: '📋', title: 'Legal & Supported', desc: 'Our team helps you find legitimate part-time work with proper documentation.' },
];

export default function LivingCost() {
  const sectionRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.fade-up').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 100);
          });
        }
      }),
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-alt" id="living-cost" ref={sectionRef}>
      <div className="container">

        <div className={styles.layout}>
          {/* Cost Breakdown */}
          <div className={`${styles.costCard} fade-up`}>
            <div className={styles.costCardHeader}>
              <h3 className={styles.costCardTitle}>Monthly Cost Breakdown</h3>
              <div className={styles.totalBadge}>Total: ₹25K – ₹40K/mo</div>
            </div>
            <div className={styles.costGrid}>
              {costs.map((c, i) => (
                <div key={i} className={styles.costItem}>
                  <div className={styles.costIcon}>{c.icon}</div>
                  <div className={styles.costInfo}>
                    <span className={styles.costLabel}>{c.label}</span>
                    <span className={styles.costRange}>{c.range}</span>
                  </div>
                  <div className={styles.costBar}>
                    <div className={styles.costBarFill} style={{ width: `${40 + i * 10}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.comparison}>
              <div className={styles.compareItem}>
                <span className={styles.compareFlag}>🇦🇱</span>
                <div>
                  <strong>Albania</strong>
                  <span>₹25,000 – ₹40,000/mo</span>
                </div>
                <div className={styles.compareBar}>
                  <div className={styles.compareBarFill} style={{ width: '30%', background: '#25D366' }} />
                </div>
              </div>
              <div className={styles.compareItem}>
                <span className={styles.compareFlag}>🇬🇧</span>
                <div>
                  <strong>UK</strong>
                  <span>₹1,20,000 – ₹2,00,000/mo</span>
                </div>
                <div className={styles.compareBar}>
                  <div className={styles.compareBarFill} style={{ width: '95%', background: '#EF4444' }} />
                </div>
              </div>
              <div className={styles.compareItem}>
                <span className={styles.compareFlag}>🇩🇪</span>
                <div>
                  <strong>Germany</strong>
                  <span>₹80,000 – ₹1,30,000/mo</span>
                </div>
                <div className={styles.compareBar}>
                  <div className={styles.compareBarFill} style={{ width: '70%', background: '#F59E0B' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Part-Time Info */}
          <div className={styles.rightCol}>
            <div className={`${styles.partTimeCard} fade-up`}>
              <h3 className={styles.partTimeTitle}>💼 Part-Time Work</h3>
              <p className={styles.partTimeDesc}>
                International students can work part-time in Albania legally, helping offset living costs while gaining valuable work experience.
              </p>
              <div className={styles.partTimeItems}>
                {partTimeInfo.map((item, i) => (
                  <div key={i} className={styles.partTimeItem}>
                    <div className={styles.partTimeIcon}>{item.icon}</div>
                    <div>
                      <strong className={styles.partTimeItemTitle}>{item.title}</strong>
                      <p className={styles.partTimeItemDesc}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${styles.accommodationCard} fade-up`}>
              <div className={styles.accomEmoji}>🏘️</div>
              <h3 className={styles.accomTitle}>Student Accommodation</h3>
              <p className={styles.accomDesc}>
                University dorms, shared apartments, and homestays available. All located near campuses with modern facilities.
              </p>
              <div className={styles.accomFeatures}>
                <span>🛏️ Furnished rooms</span>
                <span>🔒 24/7 security</span>
                <span>📶 High-speed Wi-Fi</span>
                <span>🍳 Kitchen access</span>
              </div>
              <a href="#apply" className={`btn btn-primary ${styles.accomBtn}`}>Find Accommodation →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
