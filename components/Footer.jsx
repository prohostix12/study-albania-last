'use client';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContent}`}>
        <div className={styles.brandCol}>
          <a href="#" className={styles.logo}>
            <span className={styles.logoFlag}>🇦🇱</span>
            <span className={styles.logoText}>
              <span className={styles.logoBold}>Study</span>
              <span className={styles.logoLight}> Albania</span>
            </span>
          </a>
          <p className={styles.brandDesc}>
            Your trusted gateway to affordable, world-class European education in Albania. 
            We provide end-to-end support for international students.
          </p>
          <div className={styles.socials}>
            <a href="#" aria-label="Facebook">Fb</a>
            <a href="#" aria-label="Instagram">Ig</a>
            <a href="#" aria-label="LinkedIn">In</a>
            <a href="#" aria-label="YouTube">Yt</a>
          </div>
        </div>

        <div className={styles.linksCol}>
          <h4 className={styles.linksTitle}>Quick Links</h4>
          <ul className={styles.linkList}>
            <li><a href="#why-albania">Why Albania</a></li>
            <li><a href="#universities">Universities</a></li>
            <li><a href="#placement">Placements</a></li>
            <li><a href="#living-cost">Living Costs</a></li>
          </ul>
        </div>

        <div className={styles.linksCol}>
          <h4 className={styles.linksTitle}>Support</h4>
          <ul className={styles.linkList}>
            <li><a href="#apply">Apply Now</a></li>
            <li><a href="#">Visa Guidelines</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        <div className={styles.contactCol}>
          <h4 className={styles.linksTitle}>Contact Us</h4>
          <ul className={styles.contactList}>
            <li>
              <span className={styles.contactIcon}>📍</span>
              <span>Tirana, Albania (Head Office)<br/>New Delhi, India (Regional)</span>
            </li>
            <li>
              <span className={styles.contactIcon}>📞</span>
              <a href="tel:+355000000000">+355 00 000 0000</a>
            </li>
            <li>
              <span className={styles.contactIcon}>✉️</span>
              <a href="mailto:hello@studyalbania.com">hello@studyalbania.com</a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className="container">
          <p>&copy; {currentYear} Study Albania. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
