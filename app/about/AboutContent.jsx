'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './about.module.css';

/* ── Intersection-observer hook ── */
function useVisible(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

const STATS = [
  { num: '500+', label: 'Students Placed' },
  { num: '5',    label: 'Partner Universities' },
  { num: '30+',  label: 'Countries Represented' },
  { num: '98%',  label: 'Visa Success Rate' },
];

const VALUES = [
  {
    icon: '🎯',
    title: 'Student-First',
    desc: 'Every decision we make starts with one question: what is best for the student? From university matching to visa support, your success is our only measure.',
  },
  {
    icon: '🤝',
    title: 'Honest Guidance',
    desc: 'We tell you the truth — about costs, timelines, and realistic outcomes. No false promises, no hidden fees. Just clear, reliable advice you can plan your future around.',
  },
  {
    icon: '🌍',
    title: 'Global Perspective',
    desc: 'We work with students from South Asia, Africa, the Middle East and beyond — understanding each region\'s unique needs, expectations, and aspirations.',
  },
  {
    icon: '⚡',
    title: 'End-to-End Support',
    desc: 'From your first inquiry to graduation day, we are with you. Application, admission, visa, accommodation, arrival, and career placement — all under one roof.',
  },
];

const STEPS = [
  { num: '01', title: 'Free Consultation', desc: 'Speak to a counsellor who listens to your goals, budget, and course preferences — no pressure, no fees.' },
  { num: '02', title: 'University Matching', desc: 'We shortlist the best-fit programs from our verified partner universities based on your profile.' },
  { num: '03', title: 'Application & Offer', desc: 'We prepare and submit your application, then manage communication until you receive your official offer letter.' },
  { num: '04', title: 'Visa & Documentation', desc: 'Our experts handle the entire Albanian student visa process, with a 98% approval track record.' },
  { num: '05', title: 'Arrival & Settling In', desc: 'Airport pickup, accommodation, SIM card, bank account — we make your first days in Albania smooth and stress-free.' },
  { num: '06', title: 'Career & Placements', desc: 'Internship connections, CV workshops, and placement drives start from your first year of study.' },
];

export default function AboutContent() {
  const [missionRef, missionVisible] = useVisible(0.1);
  const [storyRef, storyVisible] = useVisible(0.1);
  const [statsRef, statsVisible] = useVisible(0.1);
  const [valuesRef, valuesVisible] = useVisible(0.1);
  const [stepsRef, stepsVisible] = useVisible(0.05);
  const [videoRef, videoVisible] = useVisible(0.1);

  return (
    <>
      {/* ── MISSION ── */}
      <section className={styles.mission} ref={missionRef}>
        <div className={`container ${styles.missionInner}`}>
          <div className={`${styles.missionText} ${missionVisible ? styles.missionVisible : ''}`}>
            <span className={styles.sectionTag}>Our Mission</span>
            <h2 className={styles.missionTitle}>
              Making quality European<br />education <span className={styles.underline}>accessible to all</span>
            </h2>
            <p className={styles.missionBody}>
              Millions of students dream of studying in Europe but are stopped by high tuition fees, complex visa processes, and lack of guidance. Albania breaks that barrier — offering Bologna-recognized degrees at a fraction of the cost, in a safe, welcoming country. We are here to make that opportunity a reality for every ambitious student, regardless of where they come from.
            </p>
          </div>
          <div className={`${styles.missionImageGrid} ${missionVisible ? styles.missionVisible : ''}`} style={{ transitionDelay: '0.2s' }}>
            <div className={styles.missionImg1}>
              <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80&auto=format&fit=crop" alt="University campus" />
            </div>
            <div className={styles.missionImg2}>
              <img src="https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&q=80&auto=format&fit=crop" alt="Students studying" />
            </div>
            <div className={styles.missionImg3}>
              <img src="https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&q=80&auto=format&fit=crop" alt="Graduation" />
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className={styles.statsSection} ref={statsRef}>
        <div className={`container ${styles.statsGrid}`}>
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`${styles.statCard} ${statsVisible ? styles.statCardVisible : ''}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <span className={styles.statNum}>{s.num}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── VIDEO SECTION ── */}
      <section className={styles.videoSection} ref={videoRef}>
        <div className={`container ${styles.videoInner}`}>
          <div className={`${styles.videoTextCol} ${videoVisible ? styles.videoVisible : ''}`}>
            <span className={styles.sectionTag}>Experience Albania</span>
            <h2 className={styles.videoTitle}>
              See the country that will shape your future
            </h2>
            <p className={styles.videoBody}>
              Albania is more than a study destination. It is a vibrant, safe, and welcoming country with a rich culture, Mediterranean coastline, and a rapidly growing capital city — Tirana. Watch what life looks like for our students on the ground.
            </p>
            <ul className={styles.videoPoints}>
              <li><span className={styles.vDot} />Safe, student-friendly environment</li>
              <li><span className={styles.vDot} />Thriving expat and student community</li>
              <li><span className={styles.vDot} />Modern campuses in the heart of Tirana</li>
              <li><span className={styles.vDot} />Easy travel access to all of Europe</li>
            </ul>
          </div>
          <div className={`${styles.videoPlayerCol} ${videoVisible ? styles.videoVisible : ''}`} style={{ transitionDelay: '0.2s' }}>
            <div className={styles.videoPlayerFrame}>
              <video
                src="/videos/albania-hero.mp4.mp4"
                autoPlay
                muted
                loop
                playsInline
                className={styles.videoPlayer}
              />
              <div className={styles.videoPlayerOverlay} />
              <div className={styles.videoPlayerBadge}>
                <span className={styles.videoPlayIcon}>▶</span>
                <span>Life in Albania</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR STORY ── */}
      <section className={styles.story} id="our-story" ref={storyRef}>
        <div className={`container ${styles.storyInner}`}>
          <div className={`${styles.storyImage} ${storyVisible ? styles.storyVisible : ''}`}>
            <div className={styles.storyImgFrame}>
              <img
                src="https://images.unsplash.com/photo-1525921429624-479b6a26d84d?w=700&q=80&auto=format&fit=crop"
                alt="Tirana, Albania"
                className={styles.storyImg}
              />
            </div>
            <div className={styles.storyImgAccent}>
              <img
                src="https://images.unsplash.com/photo-1562774053-701939374585?w=320&q=80&auto=format&fit=crop"
                alt="Campus life"
              />
            </div>
            <div className={styles.storyFloatBadge}>
              <span className={styles.storyBadgeNum}>2019</span>
              <span className={styles.storyBadgeLbl}>Founded</span>
            </div>
          </div>

          <div className={`${styles.storyContent} ${storyVisible ? styles.storyVisible : ''}`} style={{ transitionDelay: '0.18s' }}>
            <span className={styles.sectionTag}>Our Story</span>
            <h2 className={styles.storyTitle}>Born from a simple question: <em>why is European education still out of reach?</em></h2>
            <p className={styles.storyBody}>
              In 2019, our founder Arjun Mehta visited Tirana for the first time and was struck by something remarkable — world-class universities, English-taught programs, EU-recognized degrees, and tuition fees that were 70% lower than anywhere else in Europe. Yet almost no international students knew about it.
            </p>
            <p className={styles.storyBody}>
              He came back, built a team with deep roots in Albanian academia and international education consulting, and launched Study Albania with a clear purpose: to be the bridge that connects deserving students with an opportunity that was hiding in plain sight.
            </p>
            <p className={styles.storyBody}>
              Today we have helped over 500 students from India, Bangladesh, Nepal, Nigeria, Egypt, and beyond start their European education journey — with zero visa rejections in our most recent cohort.
            </p>
            <Link href="/#apply" className={styles.storyBtn}>
              Join Our Next Cohort
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className={styles.values}>
        <div className="container">
          <div className={styles.valuesHeader}>
            <span className={styles.sectionTag}>Our Values</span>
            <h2 className={styles.valuesTitle}>What drives everything we do</h2>
          </div>
          <div className={styles.valuesGrid} ref={valuesRef}>
            {VALUES.map((v, i) => (
              <div
                key={v.title}
                className={`${styles.valueCard} ${valuesVisible ? styles.valueCardVisible : ''}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <span className={styles.valueIcon}>{v.icon}</span>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueDesc}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW WE WORK ── */}
      <section className={styles.steps} ref={stepsRef}>
        <div className={styles.stepsImageCol}>
          <img
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80&auto=format&fit=crop"
            alt="Students in discussion"
            className={styles.stepsImage}
          />
          <div className={styles.stepsImageCaption}>
            <span>✦</span> Full support from day one to graduation
          </div>
        </div>
        <div className={`${styles.stepsContent} ${stepsVisible ? styles.stepsVisible : ''}`}>
          <span className={styles.sectionTag}>How We Work</span>
          <h2 className={styles.stepsTitle}>Your journey to Albania in 6 steps</h2>
          <div className={styles.stepsList}>
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                className={`${styles.stepRow} ${stepsVisible ? styles.stepVisible : ''}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className={styles.stepNum}>{step.num}</span>
                <div className={styles.stepBody}>
                  <h4 className={styles.stepTitle}>{step.title}</h4>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
