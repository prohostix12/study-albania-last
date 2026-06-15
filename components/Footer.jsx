'use client';
import { useEffect, useState } from 'react';
import styles from './Footer.module.css';
import { getContact, defaultContact } from '../lib/contact-data';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [contact, setContact] = useState(defaultContact);

  useEffect(() => {
    getContact().then(setContact);
  }, []);

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
            <li><a href="/about">About Us</a></li>
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
            {contact.address && (
              <li>
                <span className={styles.contactIcon}>📍</span>
                <span style={{ whiteSpace: 'pre-line' }}>{contact.address}</span>
              </li>
            )}
            {contact.phone && (
              <li>
                <span className={styles.contactIcon}>📞</span>
                <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a>
              </li>
            )}
            {contact.whatsapp && (
              <li>
                <span className={styles.contactIcon}>💬</span>
                <a href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer">
                  {contact.whatsapp} (WhatsApp)
                </a>
              </li>
            )}
            {contact.email && (
              <li>
                <span className={styles.contactIcon}>✉️</span>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
            )}
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
