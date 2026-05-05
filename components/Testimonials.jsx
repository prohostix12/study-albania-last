'use client';
import { useEffect, useRef } from 'react';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    name: 'Rahul Sharma',
    country: '🇮🇳 India',
    course: 'BSc Computer Science — CIT',
    year: '2024',
    quote: 'Moving to Albania was the best decision of my life. The tuition is incredibly affordable, professors are world-class, and the city of Tirana is beautiful. I got an internship in my second year with a tech firm!',
    rating: 5,
    avatar: 'RS',
    avatarColor: '#2D6BE4',
  },
  {
    name: 'Amina Hassan',
    country: '🇳🇬 Nigeria',
    course: 'BEng Civil Engineering — Epoka',
    year: '2024',
    quote: 'I compared dozens of European countries before choosing Albania. Nothing matched the value — English programs, ECTS credits, safe campus, and living costs I could actually manage on my budget.',
    rating: 5,
    avatar: 'AH',
    avatarColor: '#7B4FFF',
  },
  {
    name: 'Syed Ahmed',
    country: '🇵🇰 Pakistan',
    course: 'MBA Business — Mediterranean Uni',
    year: '2023',
    quote: 'The counselling team was phenomenal. They handled everything from admission to visa to finding accommodation. I arrived in Tirana feeling fully prepared. My MBA is opening doors I never imagined.',
    rating: 5,
    avatar: 'SA',
    avatarColor: '#E8A020',
  },
  {
    name: 'Priya Nair',
    country: '🇮🇳 India',
    course: 'LLB Law — Luarasi University',
    year: '2024',
    quote: 'Albania surprised me in the best possible way. The legal faculty is exceptional, and studying European law from inside Europe is a massive advantage. Part-time work helps cover most of my expenses.',
    rating: 5,
    avatar: 'PN',
    avatarColor: '#25D366',
  },
  {
    name: 'Daniel Osei',
    country: '🇬🇭 Ghana',
    course: 'BSc IT — Western Balkans Uni',
    year: '2023',
    quote: 'The technology program at WBU is cutting-edge. I\'m learning AI and Cloud Computing while getting real project experience. The EU pathway after graduation is a massive plus for my career goals.',
    rating: 5,
    avatar: 'DO',
    avatarColor: '#EF4444',
  },
  {
    name: 'Fatima Malik',
    country: '🇧🇩 Bangladesh',
    course: 'MSc Architecture — Epoka',
    year: '2024',
    quote: 'Epoka University\'s architecture department has studios, labs, and mentors that rival any European institution. At a fraction of the cost. My work is getting recognized internationally now.',
    rating: 5,
    avatar: 'FM',
    avatarColor: '#0891B2',
  },
];

export default function Testimonials() {
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
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section" id="testimonials" ref={sectionRef}>
      <div className="container">
        <div className={styles.header}>
          <div className="section-tag fade-up">⭐ Student Stories</div>
          <h2 className="section-title fade-up">
            Real Students,<br />
            <span className="gradient-text">Real Success</span>
          </h2>
          <p className="section-subtitle fade-up">
            Hear from students who chose Albania and transformed their futures. These are real stories from our alumni.
          </p>
        </div>

        <div className={styles.grid}>
          {testimonials.map((t, i) => (
            <div key={i} className={`${styles.card} fade-up`}>
              <div className={styles.cardTop}>
                <div className={styles.avatar} style={{ background: t.avatarColor }}>{t.avatar}</div>
                <div className={styles.studentInfo}>
                  <strong className={styles.studentName}>{t.name}</strong>
                  <span className={styles.studentCountry}>{t.country}</span>
                  <span className={styles.studentCourse}>{t.course}</span>
                </div>
                <div className={styles.yearBadge}>{t.year}</div>
              </div>

              <div className={styles.stars}>
                {'★'.repeat(t.rating)}
                {'☆'.repeat(5 - t.rating)}
              </div>

              <p className={styles.quote}>"{t.quote}"</p>
            </div>
          ))}
        </div>

        <div className={`${styles.ctaRow} fade-up`}>
          <a href="#apply" className="btn btn-primary">Join These Students — Apply Free</a>
        </div>
      </div>
    </section>
  );
}
