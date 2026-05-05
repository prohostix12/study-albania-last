'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './StatsBar.module.css';

const stats = [
  { value: 500, suffix: '+', label: 'Students Placed', icon: '🎓' },
  { value: 5, suffix: '', label: 'Partner Universities', icon: '🏛️' },
  { value: 30, suffix: '+', label: 'Countries Represented', icon: '🌍' },
  { value: 98, suffix: '%', label: 'Visa Success Rate', icon: '✅' },
  { value: 100, suffix: '%', label: 'Free Counselling', icon: '💬' },
];

function CountUp({ target, suffix, active }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [active, target]);

  return <>{count}{suffix}</>;
}

export default function StatsBar() {
  const [active, setActive] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) { setActive(true); observer.disconnect(); }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.statsBar} ref={ref}>
      <div className={styles.bgDecor} aria-hidden="true" />
      <div className="container">
        <div className={styles.grid}>
          {stats.map((s, i) => (
            <div key={i} className={styles.statItem}>
              <div className={styles.statIcon}>{s.icon}</div>
              <div className={styles.statValue}>
                <CountUp target={s.value} suffix={s.suffix} active={active} />
              </div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
