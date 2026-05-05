import styles from './MovingBanner.module.css';

export default function MovingBanner() {
  const repeat = 10;
  
  return (
    <div className={styles.banner}>
      <div className={styles.track}>
        <div className={styles.content}>
          {Array(repeat).fill(0).map((_, i) => (
            <span key={i} className={i % 2 === 0 ? styles.solidGroup : styles.outlineGroup}>
              <span className={styles.white}>STUDY IN </span>
              <span className={i % 2 === 0 ? styles.gray : styles.outlineGray}>ALBANIA</span>
              <span className={styles.spacer}>   </span>
            </span>
          ))}
        </div>
        <div className={styles.content} aria-hidden="true">
          {Array(repeat).fill(0).map((_, i) => (
            <span key={i} className={i % 2 === 0 ? styles.solidGroup : styles.outlineGroup}>
              <span className={styles.white}>STUDY IN </span>
              <span className={i % 2 === 0 ? styles.gray : styles.outlineGray}>ALBANIA</span>
              <span className={styles.spacer}>   </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
