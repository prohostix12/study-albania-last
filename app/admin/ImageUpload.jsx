'use client';
import { useRef, useState } from 'react';
import styles from './admin.module.css';

export default function ImageUpload({ value, onChange, placeholder = 'https://... or upload a file', label, previewHeight = 140 }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
    if (!allowed.includes(file.type)) {
      setError('Only JPG, PNG, WEBP, GIF, SVG files are allowed.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('File must be under 5 MB.');
      return;
    }

    setError('');
    setUploading(true);

    const reader = new FileReader();
    reader.onload = (ev) => {
      onChange(ev.target.result);
      setUploading(false);
    };
    reader.onerror = () => {
      setError('Failed to read file. Please try again.');
      setUploading(false);
    };
    reader.readAsDataURL(file);

    // reset so same file can be re-selected
    e.target.value = '';
  }

  return (
    <div className={styles.imageUploadWrap}>
      {label && <label className={styles.label}>{label}</label>}

      {/* URL input + Upload button row */}
      <div className={styles.imageUploadRow}>
        <input
          className={styles.input}
          value={value}
          onChange={e => { onChange(e.target.value); setError(''); }}
          placeholder={placeholder}
        />
        <button
          type="button"
          className={styles.uploadBtn}
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          title="Upload from device"
        >
          {uploading ? (
            <span className={styles.uploadSpinner} />
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              Upload
            </>
          )}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
          style={{ display: 'none' }}
          onChange={handleFile}
        />
      </div>

      {error && <p className={styles.uploadError}>{error}</p>}

      {/* Preview */}
      {value && (
        <div className={styles.uploadPreviewWrap} style={{ height: previewHeight }}>
          <img src={value} alt="preview" className={styles.uploadPreviewImg} />
          <button
            type="button"
            className={styles.uploadRemoveBtn}
            onClick={() => { onChange(''); setError(''); }}
            title="Remove image"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
