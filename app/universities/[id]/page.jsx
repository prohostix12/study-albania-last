'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import CTABanner from '../../../components/CTABanner';
import { getUniversities } from '../../../lib/universities-data';
import styles from './UniversityDetail.module.css';

export default function UniversityDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [uni, setUni] = useState(null);
  const [activeTab, setActiveTab] = useState('courses');

  useEffect(() => {
    getUniversities().then(universities => {
      const found = universities.find(u => String(u.id) === String(id));
      if (!found) {
        router.replace('/universities');
      } else {
        setUni(found);
      }
    });
  }, [id, router]);

  if (!uni) {
    return (
      <main>
        <Navbar />
        <div className={styles.loading}>
          <div className={styles.spinner} />
          <p>Loading university details…</p>
        </div>
        <Footer />
      </main>
    );
  }

  const hasFaculties = uni.faculties?.length > 0;
  const hasRankings  = uni.rankings?.length > 0;
  const hasAdmission = uni.admission?.requirements?.length > 0;

  const tabs = [
    { key: 'courses',      label: 'Programs & Courses' },
    ...(uni.facilities?.length  ? [{ key: 'facilities',   label: 'Facilities' }]        : []),
    ...(hasRankings              ? [{ key: 'rankings',     label: 'Rankings' }]           : []),
    ...(uni.accreditations?.length ? [{ key: 'accreditations', label: 'Accreditations' }] : []),
    ...(hasAdmission             ? [{ key: 'admission',    label: 'Admission' }]          : []),
  ];

  return (
    <main>
      <Navbar />

      {/* ── Hero ── */}
      <div className={styles.hero} style={{ '--uni-color': uni.color }}>
        <div className={styles.heroBg}>
          <Image
            src={uni.coverImage || '/images/why-albania-bg.png'}
            alt={uni.name}
            fill
            className={styles.heroBgImg}
            priority
          />
          <div className={styles.heroOverlay} style={{ background: `linear-gradient(to bottom, ${uni.color}99 0%, #000000ee 100%)` }} />
        </div>

        <div className={styles.heroInner}>
          <Link href="/universities" className={styles.backLink}>
            ← Back to Universities
          </Link>

          <div className={styles.heroContent}>
            <span className={styles.heroBadge} style={{ background: uni.badgeColor || uni.color }}>
              {uni.badge}
            </span>
            <h1 className={styles.heroTitle}>{uni.name}</h1>
            <div className={styles.heroMeta}>
              <span className={styles.heroMetaItem}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/>
                </svg>
                {uni.location}
              </span>
              <span className={styles.heroMetaItem}>Est. {uni.founded}</span>
              <span className={styles.heroMetaItem}>{uni.type}</span>
              {uni.students && <span className={styles.heroMetaItem}>{uni.students} Students</span>}
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick Stats ── */}
      <div className={styles.statsBar} style={{ '--uni-color': uni.color }}>
        <div className={styles.statsBarInner}>
          {[
            { label: 'Annual Tuition', value: uni.tuition || 'Contact us' },
            { label: 'Founded',        value: uni.founded },
            { label: 'Location',       value: uni.location },
            { label: 'Students',       value: uni.students || '—' },
            { label: 'Language',       value: 'English' },
          ].map(s => (
            <div key={s.label} className={styles.statItem}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.bodyInner}>

          {/* ── Highlights row (for Epoka / Luarasi) ── */}
          {uni.highlights?.length > 0 && (
            <div className={styles.highlights}>
              {uni.highlights.map(h => (
                <div key={h.label} className={styles.highlightCard} style={{ '--uni-color': uni.color }}>
                  <span className={styles.highlightValue}>{h.value}</span>
                  <span className={styles.highlightLabel}>{h.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* ── Description ── */}
          <div className={styles.descSection}>
            <h2 className={styles.sectionTitle}>About {uni.name}</h2>
            <p className={styles.descText}>{uni.description}</p>
          </div>

          {/* ── Tabbed Content ── */}
          <div className={styles.tabs}>
            {tabs.map(t => (
              <button
                key={t.key}
                className={`${styles.tab} ${activeTab === t.key ? styles.tabActive : ''}`}
                style={activeTab === t.key ? { '--uni-color': uni.color } : {}}
                onClick={() => setActiveTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Programs & Courses */}
          {activeTab === 'courses' && (
            <div className={styles.tabContent}>
              {hasFaculties ? (
                uni.faculties.map(faculty => (
                  <div key={faculty.name} className={styles.facultyBlock}>
                    <div className={styles.facultyHeader}>
                      <h3 className={styles.facultyName} style={{ color: uni.color }}>{faculty.name}</h3>
                      {faculty.established && (
                        <span className={styles.facultyEst}>Est. {faculty.established}</span>
                      )}
                    </div>
                    <div className={styles.programsTable}>
                      <div className={styles.programsTableHead}>
                        <span>Program</span>
                        <span>Level</span>
                        <span>Duration</span>
                        <span>Language</span>
                        <span>Credits</span>
                      </div>
                      {faculty.programs.map(p => (
                        <div key={p.name} className={styles.programRow}>
                          <span className={styles.programName}>{p.name}</span>
                          <span className={styles.programBadge} style={{ background: `${uni.color}18`, color: uni.color }}>{p.level}</span>
                          <span>{p.duration}</span>
                          <span>{p.language}</span>
                          <span className={styles.programEcts}>{p.ects}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.coursesGrid}>
                  {(uni.courses || []).map(c => (
                    <div key={c} className={styles.courseCard} style={{ '--uni-color': uni.color }}>
                      <span className={styles.courseIcon}>🎓</span>
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tuition note */}
              <div className={styles.tuitionNote} style={{ borderColor: `${uni.color}33` }}>
                <span className={styles.tuitionIcon}>💰</span>
                <div>
                  <strong>Estimated Annual Tuition:</strong> {uni.tuition || 'Contact us for fees'}
                  <p>Fees may vary by program. Contact us or visit the official university website for the most up-to-date fee schedule.</p>
                </div>
              </div>
            </div>
          )}

          {/* Facilities */}
          {activeTab === 'facilities' && (
            <div className={styles.tabContent}>
              <div className={styles.facilitiesGrid}>
                {(uni.facilities || []).map(f => (
                  <div key={f} className={styles.facilityCard} style={{ '--uni-color': uni.color }}>
                    <span className={styles.facilityDot} style={{ background: uni.color }} />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rankings */}
          {activeTab === 'rankings' && (
            <div className={styles.tabContent}>
              <div className={styles.rankingsGrid}>
                {(uni.rankings || []).map(r => (
                  <div key={r.label} className={styles.rankCard} style={{ '--uni-color': uni.color }}>
                    <span className={styles.rankValue} style={{ color: uni.color }}>{r.value}</span>
                    <span className={styles.rankLabel}>{r.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Accreditations */}
          {activeTab === 'accreditations' && (
            <div className={styles.tabContent}>
              <div className={styles.accreditList}>
                {(uni.accreditations || []).map(a => (
                  <div key={a} className={styles.accreditItem}>
                    <span className={styles.accreditCheck} style={{ color: uni.color }}>✓</span>
                    <span>{a}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Admission */}
          {activeTab === 'admission' && (
            <div className={styles.tabContent}>
              <div className={styles.admissionGrid}>
                <div className={styles.admissionBlock}>
                  <h3 className={styles.admissionTitle} style={{ color: uni.color }}>Entry Requirements</h3>
                  <ul className={styles.admissionList}>
                    {(uni.admission?.requirements || []).map(r => (
                      <li key={r} className={styles.admissionItem}>
                        <span style={{ color: uni.color }}>→</span> {r}
                      </li>
                    ))}
                  </ul>
                </div>
                {uni.admission?.scholarships?.length > 0 && (
                  <div className={styles.admissionBlock}>
                    <h3 className={styles.admissionTitle} style={{ color: uni.color }}>Scholarships & Support</h3>
                    <ul className={styles.admissionList}>
                      {uni.admission.scholarships.map(s => (
                        <li key={s} className={styles.admissionItem}>
                          <span style={{ color: uni.color }}>★</span> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── CTA buttons ── */}
          <div className={styles.ctaRow}>
            <a href="#apply" className={styles.ctaApply} style={{ background: uni.color }}>
              Apply Now
            </a>
            <a href={uni.website} target="_blank" rel="noreferrer" className={styles.ctaWebsite}>
              Visit Official Website ↗
            </a>
          </div>

        </div>
      </div>

      <CTABanner />
      <Footer />
    </main>
  );
}
