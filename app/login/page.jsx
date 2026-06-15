'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { login, isLoggedIn } from '../../lib/auth';
import styles from './login.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  useEffect(() => {
    if (isLoggedIn()) router.replace('/admin');
  }, [router]);

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      if (login(username.trim(), password)) {
        router.replace('/admin');
      } else {
        setError('Invalid username or password.');
        setLoading(false);
      }
    }, 600);
  }

  return (
    <div className={styles.page}>
      {/* ── Left brand panel ── */}
      <div className={styles.brand}>
        <div className={styles.brandInner}>
          <div className={styles.brandLogo}>
            <span className={styles.brandFlag}>🇦🇱</span>
            <span className={styles.brandName}>Study Albania</span>
          </div>

          <div className={styles.brandBody}>
            <h2 className={styles.brandHeading}>
              Your student pipeline,<br />all in one place.
            </h2>
            <p className={styles.brandSub}>
              Manage universities, track enquiries, update placements and FAQs — from a single secure dashboard.
            </p>

            <ul className={styles.brandFeatures}>
              <li>
                <span className={styles.featureDot} />
                Real-time enquiry inbox with unread tracking
              </li>
              <li>
                <span className={styles.featureDot} />
                Edit universities, placements &amp; student profiles
              </li>
              <li>
                <span className={styles.featureDot} />
                Update FAQs and website content instantly
              </li>
            </ul>
          </div>

          <div className={styles.brandFooter}>
            <div className={styles.statRow}>
              <div className={styles.brandStat}>
                <strong>500+</strong>
                <span>Students Placed</span>
              </div>
              <div className={styles.brandStatDivider} />
              <div className={styles.brandStat}>
                <strong>5</strong>
                <span>Universities</span>
              </div>
              <div className={styles.brandStatDivider} />
              <div className={styles.brandStat}>
                <strong>98%</strong>
                <span>Visa Success</span>
              </div>
            </div>
          </div>
        </div>

        {/* decorative blobs */}
        <div className={styles.blob1} />
        <div className={styles.blob2} />
      </div>

      {/* ── Right form panel ── */}
      <div className={styles.formPanel}>
        <div className={styles.formWrap}>
          <div className={styles.formTop}>
            <div className={styles.avatarRing}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <p className={styles.welcomeText}>Welcome back</p>
            <p className={styles.welcomeSub}>Sign in to access the admin panel</p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="login-user">Username</label>
              <div className={styles.inputWrap}>
                <svg className={styles.inputIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
                <input
                  id="login-user"
                  className={`${styles.input} ${error ? styles.inputError : ''}`}
                  type="text"
                  autoComplete="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={e => { setUsername(e.target.value); setError(''); }}
                  required
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="login-pw">Password</label>
              <div className={styles.inputWrap}>
                <svg className={styles.inputIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input
                  id="login-pw"
                  className={`${styles.input} ${styles.inputPw} ${error ? styles.inputError : ''}`}
                  type={showPw ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  required
                />
                <button type="button" className={styles.eyeBtn} onClick={() => setShowPw(v => !v)} aria-label="Toggle password">
                  {showPw ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className={styles.errorBox}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                {error}
              </div>
            )}

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? (
                <>
                  <span className={styles.spinner} />
                  Signing in…
                </>
              ) : (
                <>
                  Sign In
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </>
              )}
            </button>
          </form>

          <Link href="/" className={styles.backLink}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}
