import styles from './PageHeader.module.css';
import Link from 'next/link';

export default function PageHeader({ title, subtitle, breadcrumb }) {
  return (
    <section className={styles.header}>
      <div className={styles.headerBg}>
        <div className={styles.overlay} />
        <div className={styles.gradient} />
      </div>
      
      <div className={`container ${styles.content}`}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
    </section>
  );
}
