'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

function openApplyModal() {
  window.dispatchEvent(new CustomEvent('open-apply-modal'));
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Why Albania', href: '/#why-albania' },
    { label: 'Universities', href: '/universities' },
    { label: 'Placements', href: '/placements' },
    { label: 'About Us', href: '/about' },
  ];

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`} id="navbar">
      <div className={`container ${styles.navInner}`}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>
            <span className={styles.logoBold}>Study</span>
            <span className={styles.logoLight}> Albania</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className={styles.navLinks}>
          {navLinks.map(link => (
            <li key={link.href}>
              <Link href={link.href} className={styles.navLink}>{link.label}</Link>
            </li>
          ))}
        </ul>

        {/* CTAs */}
        <div className={styles.navCtas}>
          <a href="tel:+355000000000" className={styles.phoneLink}>
            <span className={styles.phoneIcon}>📞</span>
            <span>+355 00 000 0000</span>
          </a>
          <Link href="/login" className={styles.loginBtn}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>
            </svg>
            Login
          </Link>
          <button type="button" onClick={openApplyModal} className={`btn btn-primary ${styles.navBtn}`}>Apply Now</button>
        </div>

        {/* Hamburger */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileOpen : ''}`}>
        {navLinks.map(link => (
          <Link key={link.href} href={link.href} className={styles.mobileLink} onClick={() => setMenuOpen(false)}>
            {link.label}
          </Link>
        ))}
        <a href="tel:+355000000000" className={styles.mobileLinkPhone}>📞 Call Now</a>
        <Link href="/login" className={styles.mobileLoginBtn} onClick={() => setMenuOpen(false)}>
          Login
        </Link>
        <button type="button" className={`btn btn-primary ${styles.mobileApplyBtn}`} onClick={() => { setMenuOpen(false); openApplyModal(); }}>
          Apply Now
        </button>
      </div>
    </nav>
  );
}
