'use client';
import { useState, useEffect } from 'react';
import { getUniversities, saveUniversities, defaultUniversities } from '../../lib/universities-data';
import styles from './admin.module.css';

const EMPTY_UNI = {
  id: null,
  name: '',
  short: '',
  color: '#1A3C8F',
  bgColor: '#EEF3FF',
  logo: '',
  coverImage: '',
  courses: [],
  type: 'Private University',
  founded: '',
  location: 'Tirana',
  badge: '',
  badgeColor: '#1A3C8F',
  website: '',
  tuition: '',
  students: '',
  description: '',
};

export default function AdminPage() {
  const [universities, setUniversities] = useState([]);
  const [editing, setEditing] = useState(null); // null = list view, object = edit view
  const [courseInput, setCourseInput] = useState('');
  const [saved, setSaved] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUniversities(getUniversities());
  }, []);

  /* ── Persist ── */
  function persist(data) {
    setUniversities(data);
    saveUniversities(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  /* ── Open editor ── */
  function openNew() {
    setEditing({ ...EMPTY_UNI, id: Date.now() });
    setCourseInput('');
  }

  function openEdit(uni) {
    setEditing({ ...uni });
    setCourseInput('');
  }

  /* ── Save card ── */
  function saveCard() {
    if (!editing.name.trim() || !editing.short.trim()) {
      alert('University name and abbreviation are required.');
      return;
    }
    const exists = universities.find(u => u.id === editing.id);
    const updated = exists
      ? universities.map(u => u.id === editing.id ? editing : u)
      : [...universities, editing];
    persist(updated);
    setEditing(null);
  }

  /* ── Delete ── */
  function confirmDelete(id) { setDeleteConfirm(id); }
  function doDelete() {
    persist(universities.filter(u => u.id !== deleteConfirm));
    setDeleteConfirm(null);
  }

  /* ── Reset to defaults ── */
  function resetDefaults() {
    if (confirm('Reset all universities to default data? This cannot be undone.')) {
      persist(defaultUniversities);
    }
  }

  /* ── Course tag helpers ── */
  function addCourse() {
    const c = courseInput.trim();
    if (c && !editing.courses.includes(c)) {
      setEditing(e => ({ ...e, courses: [...e.courses, c] }));
    }
    setCourseInput('');
  }
  function removeCourse(c) {
    setEditing(e => ({ ...e, courses: e.courses.filter(x => x !== c) }));
  }

  /* ── Field helper ── */
  function field(key, value) {
    setEditing(e => ({ ...e, [key]: value }));
  }

  /* ────────────────────────────────────────────────
     RENDER: Edit Form
  ──────────────────────────────────────────────── */
  if (editing) {
    return (
      <div className={styles.page}>
        <div className={styles.topBar}>
          <button className={styles.backBtn} onClick={() => setEditing(null)}>
            ← Back to Dashboard
          </button>
          <h1 className={styles.pageTitle}>
            {universities.find(u => u.id === editing.id) ? 'Edit University' : 'Add University'}
          </h1>
          <button className={styles.saveBtn} onClick={saveCard}>
            💾 Save Changes
          </button>
        </div>

        <div className={styles.formGrid}>

          {/* Preview Card */}
          <div className={styles.previewCol}>
            <p className={styles.previewLabel}>Live Preview</p>
            <div className={styles.previewCard}>
              <div
                className={styles.previewCover}
                style={{ background: editing.coverImage ? undefined : `linear-gradient(135deg, ${editing.color}22 0%, ${editing.color}44 100%)` }}
              >
                {editing.coverImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={editing.coverImage} alt="cover" className={styles.previewCoverImg} />
                )}
                {editing.badge && (
                  <span className={styles.previewBadge} style={{ background: editing.badgeColor }}>
                    {editing.badge}
                  </span>
                )}
              </div>
              <div className={styles.previewBody}>
                <div className={styles.previewLogoRow}>
                  <div className={styles.previewLogo} style={{ background: editing.bgColor, borderColor: `${editing.color}44` }}>
                    {editing.logo
                      // eslint-disable-next-line @next/next/no-img-element
                      ? <img src={editing.logo} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 6 }} />
                      : <span style={{ color: editing.color, fontWeight: 800, fontSize: '0.85rem' }}>{editing.short || 'UNI'}</span>
                    }
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '1rem', color: '#fff', margin: 0 }}>{editing.name || 'University Name'}</p>
                    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', margin: 0 }}>{editing.type}</p>
                  </div>
                </div>
                {editing.description && (
                  <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5, margin: '10px 0 0' }}>{editing.description}</p>
                )}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
                  {editing.courses.map(c => (
                    <span key={c} style={{ border: `1.5px solid ${editing.color}44`, color: editing.color, borderRadius: 7, padding: '4px 10px', fontSize: '0.75rem', fontWeight: 600 }}>{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className={styles.formCol}>

            <div className={styles.formSection}>
              <h3 className={styles.formSectionTitle}>Basic Info</h3>
              <div className={styles.formRow}>
                <label className={styles.label}>University Name *</label>
                <input className={styles.input} value={editing.name} onChange={e => field('name', e.target.value)} placeholder="e.g. Epoka University" />
              </div>
              <div className={styles.formRow}>
                <label className={styles.label}>Abbreviation *</label>
                <input className={styles.input} value={editing.short} onChange={e => field('short', e.target.value)} placeholder="e.g. EU" maxLength={5} />
              </div>
              <div className={styles.formRow}>
                <label className={styles.label}>Type</label>
                <select className={styles.input} value={editing.type} onChange={e => field('type', e.target.value)}>
                  <option>Private University</option>
                  <option>Public University</option>
                  <option>Technical University</option>
                  <option>Medical University</option>
                </select>
              </div>
              <div className={styles.formRow}>
                <label className={styles.label}>Description</label>
                <textarea className={styles.textarea} value={editing.description} onChange={e => field('description', e.target.value)} rows={3} placeholder="Short description of the university..." />
              </div>
            </div>

            <div className={styles.formSection}>
              <h3 className={styles.formSectionTitle}>Details</h3>
              <div className={styles.twoCol}>
                <div className={styles.formRow}>
                  <label className={styles.label}>Location</label>
                  <input className={styles.input} value={editing.location} onChange={e => field('location', e.target.value)} placeholder="Tirana" />
                </div>
                <div className={styles.formRow}>
                  <label className={styles.label}>Founded Year</label>
                  <input className={styles.input} value={editing.founded} onChange={e => field('founded', e.target.value)} placeholder="2007" />
                </div>
                <div className={styles.formRow}>
                  <label className={styles.label}>Students</label>
                  <input className={styles.input} value={editing.students} onChange={e => field('students', e.target.value)} placeholder="4,500+" />
                </div>
                <div className={styles.formRow}>
                  <label className={styles.label}>Tuition</label>
                  <input className={styles.input} value={editing.tuition} onChange={e => field('tuition', e.target.value)} placeholder="€3,000 / year" />
                </div>
              </div>
              <div className={styles.formRow}>
                <label className={styles.label}>Website URL</label>
                <input className={styles.input} value={editing.website} onChange={e => field('website', e.target.value)} placeholder="https://university.edu.al" />
              </div>
            </div>

            <div className={styles.formSection}>
              <h3 className={styles.formSectionTitle}>Branding</h3>
              <div className={styles.twoCol}>
                <div className={styles.formRow}>
                  <label className={styles.label}>Primary Color</label>
                  <div className={styles.colorRow}>
                    <input type="color" className={styles.colorPicker} value={editing.color} onChange={e => field('color', e.target.value)} />
                    <input className={styles.input} value={editing.color} onChange={e => field('color', e.target.value)} placeholder="#1A3C8F" />
                  </div>
                </div>
                <div className={styles.formRow}>
                  <label className={styles.label}>Background Color</label>
                  <div className={styles.colorRow}>
                    <input type="color" className={styles.colorPicker} value={editing.bgColor} onChange={e => field('bgColor', e.target.value)} />
                    <input className={styles.input} value={editing.bgColor} onChange={e => field('bgColor', e.target.value)} placeholder="#EEF3FF" />
                  </div>
                </div>
              </div>
              <div className={styles.formRow}>
                <label className={styles.label}>Badge Text</label>
                <input className={styles.input} value={editing.badge} onChange={e => field('badge', e.target.value)} placeholder="EU Accredited" />
              </div>
              <div className={styles.formRow}>
                <label className={styles.label}>Badge Color</label>
                <div className={styles.colorRow}>
                  <input type="color" className={styles.colorPicker} value={editing.badgeColor} onChange={e => field('badgeColor', e.target.value)} />
                  <input className={styles.input} value={editing.badgeColor} onChange={e => field('badgeColor', e.target.value)} />
                </div>
              </div>
            </div>

            <div className={styles.formSection}>
              <h3 className={styles.formSectionTitle}>Images</h3>
              <div className={styles.formRow}>
                <label className={styles.label}>Logo URL</label>
                <input className={styles.input} value={editing.logo} onChange={e => field('logo', e.target.value)} placeholder="https://... (leave blank to use abbreviation)" />
              </div>
              <div className={styles.formRow}>
                <label className={styles.label}>Cover / Banner Image URL</label>
                <input className={styles.input} value={editing.coverImage} onChange={e => field('coverImage', e.target.value)} placeholder="https://... (leave blank for gradient)" />
              </div>
            </div>

            <div className={styles.formSection}>
              <h3 className={styles.formSectionTitle}>Programs / Courses</h3>
              <div className={styles.courseInputRow}>
                <input
                  className={styles.input}
                  value={courseInput}
                  onChange={e => setCourseInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addCourse())}
                  placeholder="Type a course and press Enter or Add"
                />
                <button className={styles.addCourseBtn} onClick={addCourse}>Add</button>
              </div>
              <div className={styles.courseTags}>
                {editing.courses.map(c => (
                  <span key={c} className={styles.courseTag}>
                    {c}
                    <button className={styles.removeTag} onClick={() => removeCourse(c)}>×</button>
                  </span>
                ))}
                {editing.courses.length === 0 && <p className={styles.emptyTags}>No courses added yet.</p>}
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────────
     RENDER: Dashboard List
  ──────────────────────────────────────────────── */
  return (
    <div className={styles.page}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div>
          <h1 className={styles.pageTitle}>🎓 University Admin</h1>
          <p className={styles.pageSubtitle}>Manage university cards shown on the website</p>
        </div>
        <div className={styles.topActions}>
          {saved && <span className={styles.savedBadge}>✓ Saved</span>}
          <button className={styles.resetBtn} onClick={resetDefaults}>Reset Defaults</button>
          <button className={styles.addBtn} onClick={openNew}>+ Add University</button>
        </div>
      </div>

      {/* Stats */}
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <span className={styles.statNum}>{universities.length}</span>
          <span className={styles.statLbl}>Universities</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNum}>{universities.reduce((a, u) => a + u.courses.length, 0)}</span>
          <span className={styles.statLbl}>Total Programs</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNum}>{universities.filter(u => u.logo).length}</span>
          <span className={styles.statLbl}>With Logo</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNum}>{universities.filter(u => u.coverImage).length}</span>
          <span className={styles.statLbl}>With Cover Image</span>
        </div>
      </div>

      {/* University List */}
      <div className={styles.uniList}>
        {universities.map((uni, i) => (
          <div key={uni.id} className={styles.uniRow}>
            {/* Color swatch + logo */}
            <div className={styles.uniRowLogo} style={{ background: uni.bgColor, borderColor: `${uni.color}44` }}>
              {uni.logo
                // eslint-disable-next-line @next/next/no-img-element
                ? <img src={uni.logo} alt={uni.short} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 6 }} />
                : <span style={{ color: uni.color, fontWeight: 800, fontSize: '0.8rem' }}>{uni.short}</span>
              }
            </div>

            <div className={styles.uniRowInfo}>
              <p className={styles.uniRowName}>{uni.name}</p>
              <p className={styles.uniRowMeta}>{uni.type} · {uni.location} · Est. {uni.founded}</p>
              <div className={styles.uniRowTags}>
                {uni.courses.slice(0, 3).map(c => (
                  <span key={c} className={styles.miniTag}>{c}</span>
                ))}
                {uni.courses.length > 3 && <span className={styles.miniTagMore}>+{uni.courses.length - 3} more</span>}
              </div>
            </div>

            <div className={styles.uniRowBadge}>
              <span style={{ background: uni.badgeColor, color: '#fff', padding: '4px 12px', borderRadius: 100, fontSize: '0.72rem', fontWeight: 700 }}>
                {uni.badge}
              </span>
            </div>

            <div className={styles.uniRowActions}>
              <button className={styles.editBtn} onClick={() => openEdit(uni)}>✏️ Edit</button>
              <button className={styles.deleteBtn} onClick={() => confirmDelete(uni.id)}>🗑️ Delete</button>
            </div>
          </div>
        ))}

        {universities.length === 0 && (
          <div className={styles.emptyState}>
            <p>No universities yet.</p>
            <button className={styles.addBtn} onClick={openNew}>+ Add Your First University</button>
          </div>
        )}
      </div>

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Delete University?</h3>
            <p>This will remove <strong>{universities.find(u => u.id === deleteConfirm)?.name}</strong> from the list. This action cannot be undone.</p>
            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className={styles.confirmDeleteBtn} onClick={doDelete}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
