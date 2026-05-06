'use client';
import { useEffect, useRef } from 'react';
import styles from './Testimonials.module.css';
import Link from 'next/link';

const students = [
  {
    name: 'Rahul Sharma',
    course: 'BSc Computer Science',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop&crop=face',
    quote: 'Moving to Albania was the best decision of my life. Affordable tuition, world-class professors, and I landed an internship in my second year!',
  },
  {
    name: 'Amina Hassan',
    course: 'BEng Civil Engineering',
    photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80&auto=format&fit=crop&crop=face',
    quote: 'English programs, ECTS credits, safe campus, and living costs I could actually manage. Albania was the perfect choice for my future.',
  },
  {
    name: 'Syed Ahmed',
    course: 'MBA Business',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&auto=format&fit=crop&crop=face',
    quote: 'The counselling team handled everything — admission, visa, accommodation. I arrived fully prepared. My MBA is opening doors I never imagined.',
  },
  {
    name: 'Priya Nair',
    course: 'LLB Law',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&auto=format&fit=crop&crop=face',
    quote: 'The legal faculty is exceptional. Studying European law from inside Europe is a massive advantage. Part-time work covers most of my expenses!',
  },
  {
    name: 'Daniel Osei',
    course: 'BSc Info Technology',
    photo: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&q=80&auto=format&fit=crop&crop=face',
    quote: 'Cutting-edge tech program. The EU pathway after graduation is a massive plus for my career goals.',
  },
  {
    name: 'Fatima Malik',
    course: 'MSc Architecture',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80&auto=format&fit=crop&crop=face',
    quote: "Studios, labs, and mentors that rival any European institution — at a fraction of the cost.",
  }
];

export default function Testimonials() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animate left column
          const leftCol = entry.target.querySelector(`.${styles.leftCol}`);
          if (leftCol) leftCol.classList.add(styles.visible);

          // Animate cards with stagger
          entry.target.querySelectorAll(`.${styles.cardWrap}`).forEach((el, i) => {
            setTimeout(() => el.classList.add(styles.visible), 200 + (i * 100));
          });
        }
      }),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);


  return (
    <section className={styles.section} id="testimonials" ref={sectionRef}>
      <div className={styles.inner}>
        <div className={styles.container}>
          {/* Top Bar inside container */}
          <div className={styles.topBar}>
            <div className={styles.asterisk}>*</div>
            <div className={styles.topBarText}>003 / SIMPLIFYING GLOBAL EDUCATION FOR EVERYONE</div>
          </div>

          <div className={styles.content}>
            {/* Left Column */}
            <div className={`${styles.leftCol} ${styles.reveal}`}>
              <div className={styles.tags}>
                <span className={`${styles.tag} ${styles.active}`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/>
                  </svg>
                  Alumni Stories
                </span>
                <span className={styles.tag}>Undergraduates</span>
                <span className={styles.tag}>Postgraduates</span>
              </div>
              
              <h2 className={styles.title}>
                Meet our successful students
              </h2>
              
              <p className={styles.subtitle}>
                Our students are revolutionizing their careers by getting world-class European education. With a focus on practical skills and global recognition, they are shaping a more efficient and secure future.
              </p>
              
              <Link href="#apply" className={styles.ctaBtn}>
                View All Stories 
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px' }}>
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>


            {/* Right Column Grid */}
            <div className={styles.rightCol}>
              {students.map((s, i) => (
                <div key={i} className={`${styles.cardWrap} ${styles.reveal}`}>

                  <div className={styles.cardInner}>
                    
                    {/* Front */}
                    <div className={styles.front}>
                      <div className={styles.photoBox}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={s.photo} alt={s.name} className={styles.photo} loading="lazy" />
                      </div>
                      <div className={styles.frontFooter}>
                        <p className={styles.frontRole}>{s.course}</p>
                        <p className={styles.frontName}>{s.name}</p>
                      </div>
                    </div>

                    {/* Back */}
                    <div className={styles.back}>
                      <div className={styles.backTop}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={s.photo} alt={s.name} className={styles.backAvatar} loading="lazy" />
                        <div className={styles.backMeta}>
                          <p className={styles.backRole}>{s.course}</p>
                          <p className={styles.backName}>{s.name}</p>
                        </div>
                        <div className={styles.playBtn}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                      
                      <p className={styles.quote}>{s.quote}</p>
                      
                      <svg className={styles.sparkleIcon} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/>
                      </svg>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
