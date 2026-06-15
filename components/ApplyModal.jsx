'use client';
import { useState, useEffect } from 'react';
import styles from './ApplyModal.module.css';
import { saveEnquiry } from '../lib/enquiries-data';

const COURSES = [
  'IT & Computer Science',
  'Engineering',
  'Business & Economics',
  'Architecture',
  'Law & Social Sciences',
  'Technology & Innovation',
];

export default function ApplyModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', country: '', course: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('open-apply-modal', handler);
    return () => window.removeEventListener('open-apply-modal', handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await saveEnquiry({ ...form, source: 'Apply Now Modal' });
    setSubmitted(true);
  }

  function handleClose() {
    setOpen(false);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', phone: '', email: '', country: '', course: '', message: '' });
    }, 300);
  }

  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={e => { if (e.target === e.currentTarget) handleClose(); }}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={handleClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        {!submitted ? (
          <>
            <div className={styles.modalHeader}>
              <span className={styles.badge}>✦ 100% Free — No Hidden Fees</span>
              <h2 className={styles.title}>Start Your Application</h2>
              <p className={styles.sub}>Fill in your details and our expert counsellor will reach out within 24 hours.</p>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.field}>
                <label htmlFor="am-name">Full Name <span>*</span></label>
                <input id="am-name" name="name" type="text" placeholder="Enter your full name" value={form.name} onChange={handleChange} required />
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="am-phone">Phone / WhatsApp <span>*</span></label>
                  <input id="am-phone" name="phone" type="tel" placeholder="+91 00000 00000" value={form.phone} onChange={handleChange} required />
                </div>
                <div className={styles.field}>
                  <label htmlFor="am-email">Email Address <span>*</span></label>
                  <input id="am-email" name="email" type="email" placeholder="you@email.com" value={form.email} onChange={handleChange} required />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="am-country">Country <span>*</span></label>
                  <select id="am-country" name="country" value={form.country} onChange={handleChange} required>
                    <option value="">Select country</option>
                    <option>India</option>
                    <option>Pakistan</option>
                    <option>Bangladesh</option>
                    <option>Nepal</option>
                    <option>Nigeria</option>
                    <option>Kenya</option>
                    <option>Egypt</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className={styles.field}>
                  <label htmlFor="am-course">Course of Interest <span>*</span></label>
                  <select id="am-course" name="course" value={form.course} onChange={handleChange} required>
                    <option value="">Select course</option>
                    {COURSES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="am-message">Message <span className={styles.optional}>(optional)</span></label>
                <textarea id="am-message" name="message" placeholder="Tell us about your goals or any questions you have..." value={form.message} onChange={handleChange} rows={3} />
              </div>

              <button type="submit" className={styles.submitBtn}>
                Submit Application — It&apos;s Free
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
              <p className={styles.note}>🔒 Your details are 100% secure and never shared with third parties.</p>
            </form>
          </>
        ) : (
          <div className={styles.success}>
            <div className={styles.successRing}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h2 className={styles.successTitle}>Application Received!</h2>
            <p className={styles.successMsg}>
              Thank you, <strong>{form.name}</strong>! Our counsellor will contact you within 24 hours on <strong>{form.phone}</strong>.
            </p>
            <div className={styles.successPoints}>
              <span>✦ Check your email for confirmation</span>
              <span>✦ Save our WhatsApp number for quick updates</span>
            </div>
            <button className={styles.doneBtn} onClick={handleClose}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}
