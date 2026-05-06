'use client';
import { useState } from 'react';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', country: '', course: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const courses = ['IT & Computer Science', 'Engineering', 'Business & Economics', 'Architecture', 'Law & Social Sciences', 'Technology & Innovation'];

  // Helper function to animate each letter
  const renderAnimatedText = (text, startIndex) => {
    return text.split('').map((char, index) => (
      <span 
        key={index} 
        className={styles.animChar} 
        style={{ animationDelay: `${0.1 + (startIndex + index) * 0.03}s` }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (

    <section className={styles.hero} id="home">
      {/* Background */}
      <div className={styles.heroBg}>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className={styles.heroBgVideo}
          poster="/albania-hero.png"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Fallback gradient if video fails */}
        <div className={styles.heroBgFallback} />
      </div>


      <div className={`container ${styles.heroContent}`}>
        {/* Left: Copy */}
        <div className={styles.heroLeft}>


          <h1 className={styles.heroTitle}>
            <div className={styles.titleLine}>
              {renderAnimatedText("Study in ", 0)}
              <span className={styles.heroAccent}>{renderAnimatedText("Albania", 9)}</span>
            </div>
            <div className={styles.titleLine}>
              {renderAnimatedText("Your European", 16)}
            </div>
            <div className={styles.titleLine}>
              {renderAnimatedText("Dream Starts Here", 29)}
            </div>
          </h1>

          <p className={styles.heroSub}>
            Join thousands of international students at top Albanian universities.
            English-taught programs, EU-recognized degrees, and living costs starting
            at just <strong style={{ color: '#FFB84D' }}>₹25,000/month</strong>.
          </p>

          {/* Trust Badges */}
          <div className={styles.trustRow}>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>🎓</span>
              <span>5 Partner Universities</span>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>📋</span>
              <span>ECTS Recognized</span>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>🌍</span>
              <span>EU Pathway</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className={styles.heroBtns}>
            <a href="#apply" className={`btn btn-accent ${styles.heroBtn}`}>
              ✦ Apply Now — Free
            </a>
            <a href="https://wa.me/355000000000" target="_blank" rel="noopener noreferrer" className={`btn btn-whatsapp ${styles.heroBtn}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp Us
            </a>
          </div>

          {/* Stats Row */}
          <div className={styles.miniStats}>
            <div className={styles.miniStat}>
              <strong>500+</strong><span>Students Placed</span>
            </div>
            <div className={styles.miniStatDivider} />
            <div className={styles.miniStat}>
              <strong>5</strong><span>Top Universities</span>
            </div>
            <div className={styles.miniStatDivider} />
            <div className={styles.miniStat}>
              <strong>100%</strong><span>Visa Success Rate</span>
            </div>
          </div>
        </div>

        {/* Right: Lead Form */}
        <div className={styles.heroRight} id="apply">
          <div className={styles.formCard}>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>Get Free Counselling</h2>
              <p className={styles.formSub}>Fill in your details & our expert will contact you within 24 hours</p>
            </div>

            {submitted ? (
              <div className={styles.successMsg}>
                <span className={styles.successIcon}>✅</span>
                <h3>Thank You!</h3>
                <p>Our counsellor will contact you within 24 hours.</p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Full Name</label>
                  <input id="name" name="name" type="text" placeholder="Enter your full name" value={form.name} onChange={handleChange} required />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="phone">Phone / WhatsApp</label>
                    <input id="phone" name="phone" type="tel" placeholder="+91 00000 00000" value={form.phone} onChange={handleChange} required />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email Address</label>
                    <input id="email" name="email" type="email" placeholder="you@email.com" value={form.email} onChange={handleChange} required />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="country">Country of Residence</label>
                  <select id="country" name="country" value={form.country} onChange={handleChange} required>
                    <option value="">Select your country</option>
                    <option>India</option>
                    <option>Pakistan</option>
                    <option>Bangladesh</option>
                    <option>Nepal</option>
                    <option>Nigeria</option>
                    <option>Kenya</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="course">Course of Interest</label>
                  <select id="course" name="course" value={form.course} onChange={handleChange} required>
                    <option value="">Select a course</option>
                    {courses.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>

                <button type="submit" className={`btn btn-primary ${styles.submitBtn}`}>
                  Apply for Free Counselling →
                </button>

                <p className={styles.formNote}>
                  🔒 Your information is 100% secure and confidential
                </p>
              </form>
            )}

            <div className={styles.formFooter}>
              <div className={styles.formFooterItem}>⚡ Quick Response</div>
              <div className={styles.formFooterItem}>💬 Expert Guidance</div>
              <div className={styles.formFooterItem}>🎯 100% Free</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator}>
        <span className={styles.scrollText}>Scroll to explore</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
