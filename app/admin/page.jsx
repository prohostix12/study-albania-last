'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUniversities, saveUniversities, defaultUniversities } from '../../lib/universities-data';
import { getFaqs, saveFaqs, defaultFaqs } from '../../lib/faqs-data';
import { getPlacements, savePlacements, defaultPlacements } from '../../lib/placements-data';
import { getEnquiries, markEnquiryRead, deleteEnquiry } from '../../lib/enquiries-data';
import { getStudents, saveStudents, defaultStudents } from '../../lib/students-data';
import { getContact, saveContact, defaultContact } from '../../lib/contact-data';
import { isLoggedIn, logout } from '../../lib/auth';
import ImageUpload from './ImageUpload';
import styles from './admin.module.css';

/* ─────────────────────────────────────────────
   UNIVERSITIES
───────────────────────────────────────────── */
const EMPTY_UNI = {
  id: null, name: '', short: '', color: '#1A3C8F', bgColor: '#EEF3FF',
  logo: '', coverImage: '', courses: [], facilities: [], type: 'Private University',
  founded: '', location: 'Tirana', badge: '', badgeColor: '#1A3C8F',
  website: '', tuition: '', students: '', description: '',
  rankings: [], accreditations: [],
  admission: { requirements: [], scholarships: [] },
  highlights: [], faculties: [],
};

function Universities() {
  const [universities, setUniversities] = useState([]);
  const [editing, setEditing] = useState(null);
  const [courseInput, setCourseInput] = useState('');
  const [facilityInput, setFacilityInput] = useState('');
  const [accreditInput, setAccreditInput] = useState('');
  const [requirementInput, setRequirementInput] = useState('');
  const [scholarshipInput, setScholarshipInput] = useState('');
  const [rankLabelInput, setRankLabelInput] = useState('');
  const [rankValueInput, setRankValueInput] = useState('');
  const [hlLabelInput, setHlLabelInput] = useState('');
  const [hlValueInput, setHlValueInput] = useState('');
  const [facultiesJson, setFacultiesJson] = useState('');
  const [facultiesJsonError, setFacultiesJsonError] = useState('');
  const [saved, setSaved] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => { setUniversities(getUniversities()); }, []);

  function persist(data) {
    setUniversities(data);
    saveUniversities(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function resetInputs() {
    setCourseInput(''); setFacilityInput(''); setAccreditInput('');
    setRequirementInput(''); setScholarshipInput('');
    setRankLabelInput(''); setRankValueInput('');
    setHlLabelInput(''); setHlValueInput('');
    setFacultiesJsonError('');
  }
  function openNew() {
    setEditing({ ...EMPTY_UNI, id: Date.now() });
    setFacultiesJson('[]');
    resetInputs();
  }
  function openEdit(uni) {
    const u = {
      ...EMPTY_UNI, ...uni,
      facilities: uni.facilities || [],
      rankings: uni.rankings || [],
      accreditations: uni.accreditations || [],
      admission: uni.admission || { requirements: [], scholarships: [] },
      highlights: uni.highlights || [],
      faculties: uni.faculties || [],
    };
    setEditing(u);
    setFacultiesJson(JSON.stringify(u.faculties, null, 2));
    resetInputs();
  }

  function saveCard() {
    if (!editing.name.trim() || !editing.short.trim()) { alert('Name and abbreviation are required.'); return; }
    const exists = universities.find(u => u.id === editing.id);
    const updated = exists ? universities.map(u => u.id === editing.id ? editing : u) : [...universities, editing];
    persist(updated);
    setEditing(null);
  }

  function confirmDelete(id) { setDeleteConfirm(id); }
  function doDelete() { persist(universities.filter(u => u.id !== deleteConfirm)); setDeleteConfirm(null); }
  function resetDefaults() { if (confirm('Reset all universities to defaults?')) persist(defaultUniversities); }
  function addCourse() {
    const c = courseInput.trim();
    if (c && !editing.courses.includes(c)) setEditing(e => ({ ...e, courses: [...e.courses, c] }));
    setCourseInput('');
  }
  function removeCourse(c) { setEditing(e => ({ ...e, courses: e.courses.filter(x => x !== c) })); }
  function addFacility() {
    const f = facilityInput.trim();
    if (f && !(editing.facilities || []).includes(f)) setEditing(e => ({ ...e, facilities: [...(e.facilities || []), f] }));
    setFacilityInput('');
  }
  function removeFacility(f) { setEditing(e => ({ ...e, facilities: (e.facilities || []).filter(x => x !== f) })); }

  function addAccreditation() {
    const a = accreditInput.trim();
    if (a && !(editing.accreditations || []).includes(a)) setEditing(e => ({ ...e, accreditations: [...(e.accreditations || []), a] }));
    setAccreditInput('');
  }
  function removeAccreditation(a) { setEditing(e => ({ ...e, accreditations: (e.accreditations || []).filter(x => x !== a) })); }

  function addRequirement() {
    const r = requirementInput.trim();
    if (r) setEditing(e => ({ ...e, admission: { ...e.admission, requirements: [...(e.admission?.requirements || []), r] } }));
    setRequirementInput('');
  }
  function removeRequirement(r) { setEditing(e => ({ ...e, admission: { ...e.admission, requirements: (e.admission?.requirements || []).filter(x => x !== r) } })); }

  function addScholarship() {
    const s = scholarshipInput.trim();
    if (s) setEditing(e => ({ ...e, admission: { ...e.admission, scholarships: [...(e.admission?.scholarships || []), s] } }));
    setScholarshipInput('');
  }
  function removeScholarship(s) { setEditing(e => ({ ...e, admission: { ...e.admission, scholarships: (e.admission?.scholarships || []).filter(x => x !== s) } })); }

  function addRanking() {
    const lbl = rankLabelInput.trim(), val = rankValueInput.trim();
    if (lbl && val) setEditing(e => ({ ...e, rankings: [...(e.rankings || []), { label: lbl, value: val }] }));
    setRankLabelInput(''); setRankValueInput('');
  }
  function removeRanking(i) { setEditing(e => ({ ...e, rankings: (e.rankings || []).filter((_, idx) => idx !== i) })); }

  function addHighlight() {
    const lbl = hlLabelInput.trim(), val = hlValueInput.trim();
    if (lbl && val) setEditing(e => ({ ...e, highlights: [...(e.highlights || []), { label: lbl, value: val }] }));
    setHlLabelInput(''); setHlValueInput('');
  }
  function removeHighlight(i) { setEditing(e => ({ ...e, highlights: (e.highlights || []).filter((_, idx) => idx !== i) })); }

  function applyFacultiesJson() {
    try {
      const parsed = JSON.parse(facultiesJson);
      if (!Array.isArray(parsed)) throw new Error('Must be an array');
      setEditing(e => ({ ...e, faculties: parsed }));
      setFacultiesJsonError('');
    } catch (err) {
      setFacultiesJsonError(err.message);
    }
  }

  function field(key, value) { setEditing(e => ({ ...e, [key]: value })); }

  if (editing) {
    return (
      <div className={styles.content}>
        <div className={styles.contentTopBar}>
          <button className={styles.backBtn} onClick={() => setEditing(null)}>← Back</button>
          <h2 className={styles.contentTitle}>{universities.find(u => u.id === editing.id) ? 'Edit University' : 'Add University'}</h2>
          <button className={styles.saveBtn} onClick={saveCard}>💾 Save Changes</button>
        </div>
        <div className={styles.formGrid}>
          <div className={styles.previewCol}>
            <p className={styles.previewLabel}>Live Preview</p>
            <div className={styles.previewCard}>
              <div className={styles.previewCover} style={{ background: editing.coverImage ? undefined : `linear-gradient(135deg, ${editing.color}22 0%, ${editing.color}44 100%)` }}>
                {editing.coverImage && <img src={editing.coverImage} alt="cover" className={styles.previewCoverImg} />}
                {editing.badge && <span className={styles.previewBadge} style={{ background: editing.badgeColor }}>{editing.badge}</span>}
              </div>
              <div className={styles.previewBody}>
                <div className={styles.previewLogoRow}>
                  <div className={styles.previewLogo} style={{ background: editing.bgColor, borderColor: `${editing.color}44` }}>
                    {editing.logo
                      ? <img src={editing.logo} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 6 }} />
                      : <span style={{ color: editing.color, fontWeight: 800, fontSize: '0.85rem' }}>{editing.short || 'UNI'}</span>
                    }
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '1rem', color: '#fff', margin: 0 }}>{editing.name || 'University Name'}</p>
                    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', margin: 0 }}>{editing.type}</p>
                  </div>
                </div>
                {editing.description && <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5, margin: '10px 0 0' }}>{editing.description}</p>}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
                  {editing.courses.map(c => (
                    <span key={c} style={{ border: `1.5px solid ${editing.color}44`, color: editing.color, borderRadius: 7, padding: '4px 10px', fontSize: '0.75rem', fontWeight: 600 }}>{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.formCol}>
            <div className={styles.formSection}>
              <h3 className={styles.formSectionTitle}>Basic Info</h3>
              <div className={styles.formRow}><label className={styles.label}>University Name *</label><input className={styles.input} value={editing.name} onChange={e => field('name', e.target.value)} placeholder="e.g. Epoka University" /></div>
              <div className={styles.formRow}><label className={styles.label}>Abbreviation *</label><input className={styles.input} value={editing.short} onChange={e => field('short', e.target.value)} placeholder="e.g. EU" maxLength={5} /></div>
              <div className={styles.formRow}><label className={styles.label}>Type</label><select className={styles.input} value={editing.type} onChange={e => field('type', e.target.value)}><option>Private University</option><option>Public University</option><option>Technical University</option><option>Medical University</option></select></div>
              <div className={styles.formRow}><label className={styles.label}>Description</label><textarea className={styles.textarea} value={editing.description} onChange={e => field('description', e.target.value)} rows={3} /></div>
            </div>

            <div className={styles.formSection}>
              <h3 className={styles.formSectionTitle}>Details</h3>
              <div className={styles.twoCol}>
                <div className={styles.formRow}><label className={styles.label}>Location</label><input className={styles.input} value={editing.location} onChange={e => field('location', e.target.value)} /></div>
                <div className={styles.formRow}><label className={styles.label}>Founded Year</label><input className={styles.input} value={editing.founded} onChange={e => field('founded', e.target.value)} /></div>
                <div className={styles.formRow}><label className={styles.label}>Students</label><input className={styles.input} value={editing.students} onChange={e => field('students', e.target.value)} /></div>
                <div className={styles.formRow}><label className={styles.label}>Tuition</label><input className={styles.input} value={editing.tuition} onChange={e => field('tuition', e.target.value)} /></div>
              </div>
              <div className={styles.formRow}><label className={styles.label}>Website URL</label><input className={styles.input} value={editing.website} onChange={e => field('website', e.target.value)} /></div>
            </div>

            <div className={styles.formSection}>
              <h3 className={styles.formSectionTitle}>Branding</h3>
              <div className={styles.twoCol}>
                <div className={styles.formRow}><label className={styles.label}>Primary Color</label><div className={styles.colorRow}><input type="color" className={styles.colorPicker} value={editing.color} onChange={e => field('color', e.target.value)} /><input className={styles.input} value={editing.color} onChange={e => field('color', e.target.value)} /></div></div>
                <div className={styles.formRow}><label className={styles.label}>Background Color</label><div className={styles.colorRow}><input type="color" className={styles.colorPicker} value={editing.bgColor} onChange={e => field('bgColor', e.target.value)} /><input className={styles.input} value={editing.bgColor} onChange={e => field('bgColor', e.target.value)} /></div></div>
              </div>
              <div className={styles.formRow}><label className={styles.label}>Badge Text</label><input className={styles.input} value={editing.badge} onChange={e => field('badge', e.target.value)} placeholder="EU Accredited" /></div>
              <div className={styles.formRow}><label className={styles.label}>Badge Color</label><div className={styles.colorRow}><input type="color" className={styles.colorPicker} value={editing.badgeColor} onChange={e => field('badgeColor', e.target.value)} /><input className={styles.input} value={editing.badgeColor} onChange={e => field('badgeColor', e.target.value)} /></div></div>
            </div>

            <div className={styles.formSection}>
              <h3 className={styles.formSectionTitle}>Images</h3>
              <ImageUpload label="Logo" value={editing.logo} onChange={v => field('logo', v)} placeholder="https://... or upload (leave blank to use abbreviation)" previewHeight={100} />
              <ImageUpload label="Cover / Banner Image" value={editing.coverImage} onChange={v => field('coverImage', v)} placeholder="https://... or upload" previewHeight={140} />
            </div>

            <div className={styles.formSection}>
              <h3 className={styles.formSectionTitle}>Programs / Courses</h3>
              <div className={styles.courseInputRow}>
                <input className={styles.input} value={courseInput} onChange={e => setCourseInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addCourse())} placeholder="Type a course and press Enter or Add" />
                <button className={styles.addCourseBtn} onClick={addCourse}>Add</button>
              </div>
              <div className={styles.courseTags}>
                {editing.courses.map(c => (
                  <span key={c} className={styles.courseTag}>{c}<button className={styles.removeTag} onClick={() => removeCourse(c)}>×</button></span>
                ))}
                {editing.courses.length === 0 && <p className={styles.emptyTags}>No courses added yet.</p>}
              </div>
            </div>

            <div className={styles.formSection}>
              <h3 className={styles.formSectionTitle}>Facilities</h3>
              <div className={styles.courseInputRow}>
                <input className={styles.input} value={facilityInput} onChange={e => setFacilityInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFacility())} placeholder="Type a facility and press Enter or Add" />
                <button className={styles.addCourseBtn} onClick={addFacility}>Add</button>
              </div>
              <div className={styles.courseTags}>
                {(editing.facilities || []).map(f => (
                  <span key={f} className={styles.courseTag}>{f}<button className={styles.removeTag} onClick={() => removeFacility(f)}>×</button></span>
                ))}
                {(editing.facilities || []).length === 0 && <p className={styles.emptyTags}>No facilities added yet.</p>}
              </div>
            </div>

            <div className={styles.formSection}>
              <h3 className={styles.formSectionTitle}>Accreditations</h3>
              <div className={styles.courseInputRow}>
                <input className={styles.input} value={accreditInput} onChange={e => setAccreditInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addAccreditation())} placeholder="e.g. ASCAL — Albanian Quality Assurance Agency" />
                <button className={styles.addCourseBtn} onClick={addAccreditation}>Add</button>
              </div>
              <div className={styles.courseTags}>
                {(editing.accreditations || []).map(a => (
                  <span key={a} className={styles.courseTag}>{a}<button className={styles.removeTag} onClick={() => removeAccreditation(a)}>×</button></span>
                ))}
                {(editing.accreditations || []).length === 0 && <p className={styles.emptyTags}>No accreditations added yet.</p>}
              </div>
            </div>

            <div className={styles.formSection}>
              <h3 className={styles.formSectionTitle}>Rankings</h3>
              <div className={styles.twoColInput}>
                <input className={styles.input} value={rankLabelInput} onChange={e => setRankLabelInput(e.target.value)} placeholder="Ranking name (e.g. QS 2026 — Albania)" />
                <input className={styles.input} value={rankValueInput} onChange={e => setRankValueInput(e.target.value)} placeholder="Position (e.g. #2)" style={{ maxWidth: 120 }} />
                <button className={styles.addCourseBtn} onClick={addRanking}>Add</button>
              </div>
              <div className={styles.kvList}>
                {(editing.rankings || []).map((r, i) => (
                  <div key={i} className={styles.kvRow}>
                    <span className={styles.kvValue}>{r.value}</span>
                    <span className={styles.kvLabel}>{r.label}</span>
                    <button className={styles.removeTag} onClick={() => removeRanking(i)}>×</button>
                  </div>
                ))}
                {(editing.rankings || []).length === 0 && <p className={styles.emptyTags}>No rankings added yet.</p>}
              </div>
            </div>

            <div className={styles.formSection}>
              <h3 className={styles.formSectionTitle}>Highlights (Key Stats)</h3>
              <div className={styles.twoColInput}>
                <input className={styles.input} value={hlLabelInput} onChange={e => setHlLabelInput(e.target.value)} placeholder="Label (e.g. Employability Rate)" />
                <input className={styles.input} value={hlValueInput} onChange={e => setHlValueInput(e.target.value)} placeholder="Value (e.g. 98%)" style={{ maxWidth: 120 }} />
                <button className={styles.addCourseBtn} onClick={addHighlight}>Add</button>
              </div>
              <div className={styles.kvList}>
                {(editing.highlights || []).map((h, i) => (
                  <div key={i} className={styles.kvRow}>
                    <span className={styles.kvValue}>{h.value}</span>
                    <span className={styles.kvLabel}>{h.label}</span>
                    <button className={styles.removeTag} onClick={() => removeHighlight(i)}>×</button>
                  </div>
                ))}
                {(editing.highlights || []).length === 0 && <p className={styles.emptyTags}>No highlights added yet.</p>}
              </div>
            </div>

            <div className={styles.formSection}>
              <h3 className={styles.formSectionTitle}>Admission Requirements</h3>
              <div className={styles.courseInputRow}>
                <input className={styles.input} value={requirementInput} onChange={e => setRequirementInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addRequirement())} placeholder="e.g. High school diploma or equivalent" />
                <button className={styles.addCourseBtn} onClick={addRequirement}>Add</button>
              </div>
              <div className={styles.courseTags}>
                {(editing.admission?.requirements || []).map(r => (
                  <span key={r} className={styles.courseTag}>{r}<button className={styles.removeTag} onClick={() => removeRequirement(r)}>×</button></span>
                ))}
                {(editing.admission?.requirements || []).length === 0 && <p className={styles.emptyTags}>No requirements added yet.</p>}
              </div>
            </div>

            <div className={styles.formSection}>
              <h3 className={styles.formSectionTitle}>Scholarships & Support</h3>
              <div className={styles.courseInputRow}>
                <input className={styles.input} value={scholarshipInput} onChange={e => setScholarshipInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addScholarship())} placeholder="e.g. Merit-based scholarships available" />
                <button className={styles.addCourseBtn} onClick={addScholarship}>Add</button>
              </div>
              <div className={styles.courseTags}>
                {(editing.admission?.scholarships || []).map(s => (
                  <span key={s} className={styles.courseTag}>{s}<button className={styles.removeTag} onClick={() => removeScholarship(s)}>×</button></span>
                ))}
                {(editing.admission?.scholarships || []).length === 0 && <p className={styles.emptyTags}>No scholarships added yet.</p>}
              </div>
            </div>

            <div className={styles.formSection}>
              <h3 className={styles.formSectionTitle}>Faculties & Programs (JSON)</h3>
              <p className={styles.formHint}>Advanced: paste the full faculties array as JSON. Click Apply to validate.</p>
              <textarea
                className={styles.textarea}
                rows={12}
                value={facultiesJson}
                onChange={e => setFacultiesJson(e.target.value)}
                spellCheck={false}
                style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}
              />
              {facultiesJsonError && <p style={{ color: '#ef4444', fontSize: '0.82rem', marginTop: 4 }}>Error: {facultiesJsonError}</p>}
              <button className={styles.addCourseBtn} style={{ marginTop: 8 }} onClick={applyFacultiesJson}>Apply JSON</button>
              {editing.faculties?.length > 0 && !facultiesJsonError && (
                <p style={{ color: '#22c55e', fontSize: '0.82rem', marginTop: 4 }}>✓ {editing.faculties.length} {editing.faculties.length === 1 ? 'faculty' : 'faculties'} loaded</p>
              )}
            </div>
          </div>
        </div>

        {deleteConfirm && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h3>Delete University?</h3>
              <p>This will remove <strong>{universities.find(u => u.id === deleteConfirm)?.name}</strong>. This cannot be undone.</p>
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

  return (
    <div className={styles.content}>
      <div className={styles.contentTopBar}>
        <div>
          <h2 className={styles.contentTitle}>Universities</h2>
          <p className={styles.contentSubtitle}>Manage university cards shown on the website</p>
        </div>
        <div className={styles.topActions}>
          {saved && <span className={styles.savedBadge}>✓ Saved</span>}
          <button className={styles.resetBtn} onClick={resetDefaults}>Reset Defaults</button>
          <button className={styles.addBtn} onClick={openNew}>+ Add University</button>
        </div>
      </div>

      <div className={styles.statsRow}>
        <div className={styles.statCard}><span className={styles.statNum}>{universities.length}</span><span className={styles.statLbl}>Universities</span></div>
        <div className={styles.statCard}><span className={styles.statNum}>{universities.reduce((a, u) => a + u.courses.length, 0)}</span><span className={styles.statLbl}>Total Programs</span></div>
        <div className={styles.statCard}><span className={styles.statNum}>{universities.reduce((a, u) => a + (u.facilities?.length || 0), 0)}</span><span className={styles.statLbl}>Facilities Listed</span></div>
        <div className={styles.statCard}><span className={styles.statNum}>{universities.filter(u => u.coverImage).length}</span><span className={styles.statLbl}>With Cover</span></div>
      </div>

      <div className={styles.uniList}>
        {universities.map(uni => (
          <div key={uni.id} className={styles.uniRow}>
            <div className={styles.uniRowLogo} style={{ background: uni.bgColor, borderColor: `${uni.color}44` }}>
              {uni.logo
                ? <img src={uni.logo} alt={uni.short} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 6 }} />
                : <span style={{ color: uni.color, fontWeight: 800, fontSize: '0.8rem' }}>{uni.short}</span>
              }
            </div>
            <div className={styles.uniRowInfo}>
              <p className={styles.uniRowName}>{uni.name}</p>
              <p className={styles.uniRowMeta}>{uni.type} · {uni.location} · Est. {uni.founded}</p>
              <div className={styles.uniRowTags}>
                {uni.courses.slice(0, 3).map(c => <span key={c} className={styles.miniTag}>{c}</span>)}
                {uni.courses.length > 3 && <span className={styles.miniTagMore}>+{uni.courses.length - 3} more</span>}
              </div>
            </div>
            <div className={styles.uniRowBadge}>
              <span style={{ background: uni.badgeColor, color: '#fff', padding: '4px 12px', borderRadius: 100, fontSize: '0.72rem', fontWeight: 700 }}>{uni.badge}</span>
            </div>
            <div className={styles.uniRowActions}>
              <button className={styles.editBtn} onClick={() => openEdit(uni)}>✏️ Edit</button>
              <button className={styles.deleteBtn} onClick={() => confirmDelete(uni.id)}>🗑️ Delete</button>
            </div>
          </div>
        ))}
        {universities.length === 0 && <div className={styles.emptyState}><p>No universities yet.</p><button className={styles.addBtn} onClick={openNew}>+ Add Your First University</button></div>}
      </div>

      {deleteConfirm && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Delete University?</h3>
            <p>This will remove <strong>{universities.find(u => u.id === deleteConfirm)?.name}</strong>. This cannot be undone.</p>
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

/* ─────────────────────────────────────────────
   ENQUIRIES
───────────────────────────────────────────── */
function Enquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => { setEnquiries(getEnquiries()); }, []);

  function handleRead(id) {
    markEnquiryRead(id);
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, read: true } : e));
  }

  function handleDelete(id) { setDeleteConfirm(id); }
  function doDelete() {
    deleteEnquiry(deleteConfirm);
    setEnquiries(prev => prev.filter(e => e.id !== deleteConfirm));
    setDeleteConfirm(null);
  }

  const unread = enquiries.filter(e => !e.read).length;

  return (
    <div className={styles.content}>
      <div className={styles.contentTopBar}>
        <div>
          <h2 className={styles.contentTitle}>Enquiries</h2>
          <p className={styles.contentSubtitle}>All enquiries submitted via the website</p>
        </div>
        {unread > 0 && <span className={styles.unreadBadge}>{unread} unread</span>}
      </div>

      <div className={styles.statsRow}>
        <div className={styles.statCard}><span className={styles.statNum}>{enquiries.length}</span><span className={styles.statLbl}>Total</span></div>
        <div className={styles.statCard}><span className={styles.statNum}>{unread}</span><span className={styles.statLbl}>Unread</span></div>
        <div className={styles.statCard}><span className={styles.statNum}>{enquiries.filter(e => e.read).length}</span><span className={styles.statLbl}>Read</span></div>
        <div className={styles.statCard}><span className={styles.statNum}>{enquiries.length > 0 ? new Date(enquiries[0].date).toLocaleDateString() : '—'}</span><span className={styles.statLbl}>Latest</span></div>
      </div>

      <div className={styles.enquiryList}>
        {enquiries.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📬</div>
            <p>No enquiries yet. They will appear here once someone submits the contact form on the website.</p>
          </div>
        )}
        {enquiries.map(e => (
          <div key={e.id} className={`${styles.enquiryRow} ${!e.read ? styles.enquiryUnread : ''}`}>
            <div className={styles.enquiryDot} style={{ background: e.read ? 'transparent' : '#3b82f6', border: e.read ? '2px solid rgba(255,255,255,0.1)' : 'none' }} />
            <div className={styles.enquiryInfo}>
              <div className={styles.enquiryMeta}>
                <span className={styles.enquiryName}>{e.name || 'Anonymous'}</span>
                <span className={styles.enquiryEmail}>{e.email}</span>
                {e.phone && <span className={styles.enquiryPhone}>📞 {e.phone}</span>}
                <span className={styles.enquirySource}>{e.source}</span>
              </div>
              {(e.country || e.course) && (
                <div className={styles.enquiryTags}>
                  {e.country && <span className={styles.enquiryTag}>🌍 {e.country}</span>}
                  {e.course && <span className={styles.enquiryTag}>🎓 {e.course}</span>}
                </div>
              )}
              {e.message && <p className={styles.enquiryMessage}>"{e.message}"</p>}
              <p className={styles.enquiryDate}>{new Date(e.date).toLocaleString()}</p>
            </div>
            <div className={styles.enquiryActions}>
              {!e.read && <button className={styles.readBtn} onClick={() => handleRead(e.id)}>Mark Read</button>}
              <button className={styles.deleteBtn} onClick={() => handleDelete(e.id)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>

      {deleteConfirm && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Delete Enquiry?</h3>
            <p>This will permanently remove this enquiry.</p>
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

/* ─────────────────────────────────────────────
   PLACEMENTS
───────────────────────────────────────────── */
function PlacementsAdmin() {
  const [placements, setPlacements] = useState([]);
  const [editing, setEditing] = useState(null);
  const [saved, setSaved] = useState(false);
  const [pointInput, setPointInput] = useState('');

  useEffect(() => { setPlacements(getPlacements()); }, []);

  function persist(data) {
    setPlacements(data);
    savePlacements(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function openEdit(p) { setEditing({ ...p, points: [...p.points] }); setPointInput(''); }

  function saveCard() {
    if (!editing.title.trim()) { alert('Title is required.'); return; }
    persist(placements.map(p => p.id === editing.id ? editing : p));
    setEditing(null);
  }

  function field(key, value) { setEditing(e => ({ ...e, [key]: value })); }

  function addPoint() {
    const pt = pointInput.trim();
    if (pt) setEditing(e => ({ ...e, points: [...e.points, pt] }));
    setPointInput('');
  }
  function removePoint(idx) { setEditing(e => ({ ...e, points: e.points.filter((_, i) => i !== idx) })); }

  if (editing) {
    return (
      <div className={styles.content}>
        <div className={styles.contentTopBar}>
          <button className={styles.backBtn} onClick={() => setEditing(null)}>← Back</button>
          <h2 className={styles.contentTitle}>Edit Placement Card</h2>
          <button className={styles.saveBtn} onClick={saveCard}>💾 Save Changes</button>
        </div>
        <div className={styles.placementFormWrap}>
          <div className={styles.formCol} style={{ maxWidth: 680 }}>
            <div className={styles.formSection}>
              <h3 className={styles.formSectionTitle}>Content</h3>
              <div className={styles.formRow}><label className={styles.label}>Title</label><input className={styles.input} value={editing.title} onChange={e => field('title', e.target.value)} /></div>
              <div className={styles.formRow}><label className={styles.label}>Description</label><textarea className={styles.textarea} rows={4} value={editing.desc} onChange={e => field('desc', e.target.value)} /></div>
              <div className={styles.formRow}>
                <label className={styles.label}>Layout</label>
                <select className={styles.input} value={editing.layout} onChange={e => field('layout', e.target.value)}>
                  <option value="left">Image Left</option>
                  <option value="right">Image Right</option>
                </select>
              </div>
            </div>

            <div className={styles.formSection}>
              <h3 className={styles.formSectionTitle}>Photo</h3>
              <ImageUpload label="Image" value={editing.image} onChange={v => field('image', v)} placeholder="https://... or upload" previewHeight={160} />
              <div className={styles.formRow}>
                <label className={styles.label}>Accent Color</label>
                <div className={styles.colorRow}>
                  <input type="color" className={styles.colorPicker} value={editing.color} onChange={e => field('color', e.target.value)} />
                  <input className={styles.input} value={editing.color} onChange={e => field('color', e.target.value)} />
                </div>
              </div>
            </div>

            <div className={styles.formSection}>
              <h3 className={styles.formSectionTitle}>Bullet Points</h3>
              <div className={styles.courseInputRow}>
                <input className={styles.input} value={pointInput} onChange={e => setPointInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addPoint())} placeholder="Add a bullet point..." />
                <button className={styles.addCourseBtn} onClick={addPoint}>Add</button>
              </div>
              <div className={styles.pointsList}>
                {editing.points.map((pt, i) => (
                  <div key={i} className={styles.pointRow}>
                    <span className={styles.pointDot} style={{ background: editing.color }} />
                    <span className={styles.pointText}>{pt}</span>
                    <button className={styles.removeTag} onClick={() => removePoint(i)}>×</button>
                  </div>
                ))}
                {editing.points.length === 0 && <p className={styles.emptyTags}>No bullet points yet.</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.content}>
      <div className={styles.contentTopBar}>
        <div>
          <h2 className={styles.contentTitle}>Student Placements</h2>
          <p className={styles.contentSubtitle}>Edit placement section photos and content</p>
        </div>
        <div className={styles.topActions}>
          {saved && <span className={styles.savedBadge}>✓ Saved</span>}
          <button className={styles.resetBtn} onClick={() => { if (confirm('Reset placements to defaults?')) persist(defaultPlacements); }}>Reset Defaults</button>
        </div>
      </div>

      <div className={styles.placementGrid}>
        {placements.map((p, i) => (
          <div key={p.id} className={styles.placementCard}>
            <div className={styles.placementThumb}>
              <img src={p.image} alt={p.title} className={styles.placementThumbImg} />
              <div className={styles.placementThumbOverlay} style={{ background: `linear-gradient(135deg, ${p.color}44, transparent)` }} />
            </div>
            <div className={styles.placementCardBody}>
              <div className={styles.placementTag} style={{ color: p.color, background: `${p.color}18` }}>Pillar 0{i + 1}</div>
              <h3 className={styles.placementCardTitle}>{p.title}</h3>
              <p className={styles.placementCardDesc}>{p.desc.slice(0, 100)}...</p>
              <div className={styles.placementCardMeta}>
                <span>{p.points.length} bullet points</span>
                <span>Layout: {p.layout}</span>
              </div>
            </div>
            <button className={styles.editBtn} onClick={() => openEdit(p)} style={{ margin: '0 20px 20px', width: 'calc(100% - 40px)' }}>✏️ Edit Card</button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FAQS
───────────────────────────────────────────── */
const EMPTY_FAQ = { id: null, question: '', answer: '' };

function FAQsAdmin() {
  const [faqs, setFaqs] = useState([]);
  const [editing, setEditing] = useState(null);
  const [saved, setSaved] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => { setFaqs(getFaqs()); }, []);

  function persist(data) {
    setFaqs(data);
    saveFaqs(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function openNew() { setEditing({ ...EMPTY_FAQ, id: `faq-${Date.now()}` }); }
  function openEdit(faq) { setEditing({ ...faq }); }

  function saveCard() {
    if (!editing.question.trim() || !editing.answer.trim()) { alert('Question and answer are required.'); return; }
    const exists = faqs.find(f => f.id === editing.id);
    const updated = exists ? faqs.map(f => f.id === editing.id ? editing : f) : [...faqs, editing];
    persist(updated);
    setEditing(null);
  }

  function doDelete() {
    persist(faqs.filter(f => f.id !== deleteConfirm));
    setDeleteConfirm(null);
  }

  function moveUp(i) {
    if (i === 0) return;
    const arr = [...faqs];
    [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
    persist(arr);
  }

  function moveDown(i) {
    if (i === faqs.length - 1) return;
    const arr = [...faqs];
    [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
    persist(arr);
  }

  if (editing) {
    return (
      <div className={styles.content}>
        <div className={styles.contentTopBar}>
          <button className={styles.backBtn} onClick={() => setEditing(null)}>← Back</button>
          <h2 className={styles.contentTitle}>{faqs.find(f => f.id === editing.id) ? 'Edit FAQ' : 'Add FAQ'}</h2>
          <button className={styles.saveBtn} onClick={saveCard}>💾 Save</button>
        </div>
        <div className={styles.placementFormWrap}>
          <div className={styles.formCol} style={{ maxWidth: 680 }}>
            <div className={styles.formSection}>
              <h3 className={styles.formSectionTitle}>FAQ Content</h3>
              <div className={styles.formRow}><label className={styles.label}>Question</label><input className={styles.input} value={editing.question} onChange={e => setEditing(v => ({ ...v, question: e.target.value }))} placeholder="e.g. How do I apply?" /></div>
              <div className={styles.formRow}><label className={styles.label}>Answer</label><textarea className={styles.textarea} rows={6} value={editing.answer} onChange={e => setEditing(v => ({ ...v, answer: e.target.value }))} placeholder="Provide a clear, helpful answer..." /></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.content}>
      <div className={styles.contentTopBar}>
        <div>
          <h2 className={styles.contentTitle}>FAQs</h2>
          <p className={styles.contentSubtitle}>Manage frequently asked questions on the home page</p>
        </div>
        <div className={styles.topActions}>
          {saved && <span className={styles.savedBadge}>✓ Saved</span>}
          <button className={styles.resetBtn} onClick={() => { if (confirm('Reset FAQs to defaults?')) persist(defaultFaqs); }}>Reset Defaults</button>
          <button className={styles.addBtn} onClick={openNew}>+ Add FAQ</button>
        </div>
      </div>

      <div className={styles.faqList}>
        {faqs.map((faq, i) => (
          <div key={faq.id} className={styles.faqRow}>
            <div className={styles.faqOrder}>
              <button className={styles.orderBtn} onClick={() => moveUp(i)} disabled={i === 0}>↑</button>
              <span className={styles.faqNum}>{String(i + 1).padStart(2, '0')}</span>
              <button className={styles.orderBtn} onClick={() => moveDown(i)} disabled={i === faqs.length - 1}>↓</button>
            </div>
            <div className={styles.faqInfo}>
              <p className={styles.faqQuestion}>{faq.question}</p>
              <p className={styles.faqAnswer}>{faq.answer.slice(0, 120)}{faq.answer.length > 120 ? '...' : ''}</p>
            </div>
            <div className={styles.uniRowActions}>
              <button className={styles.editBtn} onClick={() => openEdit(faq)}>✏️ Edit</button>
              <button className={styles.deleteBtn} onClick={() => setDeleteConfirm(faq.id)}>🗑️</button>
            </div>
          </div>
        ))}
        {faqs.length === 0 && <div className={styles.emptyState}><p>No FAQs yet.</p><button className={styles.addBtn} onClick={openNew}>+ Add First FAQ</button></div>}
      </div>

      {deleteConfirm && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Delete FAQ?</h3>
            <p>This will remove the FAQ: <strong>{faqs.find(f => f.id === deleteConfirm)?.question}</strong></p>
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

/* ─────────────────────────────────────────────
   STUDENTS
───────────────────────────────────────────── */
const EMPTY_STUDENT = { id: null, name: '', course: '', photo: '', quote: '' };

function StudentsAdmin() {
  const [students, setStudents] = useState([]);
  const [editing, setEditing] = useState(null);
  const [saved, setSaved] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => { setStudents(getStudents()); }, []);

  function persist(data) {
    setStudents(data);
    saveStudents(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function openNew() { setEditing({ ...EMPTY_STUDENT, id: `s-${Date.now()}` }); }
  function openEdit(s) { setEditing({ ...s }); }

  function saveCard() {
    if (!editing.name.trim() || !editing.course.trim()) { alert('Name and course are required.'); return; }
    const exists = students.find(s => s.id === editing.id);
    const updated = exists
      ? students.map(s => s.id === editing.id ? editing : s)
      : [...students, editing];
    persist(updated);
    setEditing(null);
  }

  function doDelete() {
    persist(students.filter(s => s.id !== deleteConfirm));
    setDeleteConfirm(null);
  }

  function field(key, value) { setEditing(e => ({ ...e, [key]: value })); }

  if (editing) {
    return (
      <div className={styles.content}>
        <div className={styles.contentTopBar}>
          <button className={styles.backBtn} onClick={() => setEditing(null)}>← Back</button>
          <h2 className={styles.contentTitle}>{students.find(s => s.id === editing.id) ? 'Edit Student' : 'Add Student'}</h2>
          <button className={styles.saveBtn} onClick={saveCard}>💾 Save</button>
        </div>
        <div className={styles.placementFormWrap}>
          <div className={styles.formGrid} style={{ gridTemplateColumns: '260px 1fr', padding: 0 }}>
            {/* Preview */}
            <div className={styles.previewCol}>
              <p className={styles.previewLabel}>Live Preview</p>
              <div className={styles.studentPreviewCard}>
                <div className={styles.studentPreviewPhoto}>
                  {editing.photo
                    ? <img src={editing.photo} alt={editing.name} />
                    : <span className={styles.studentPreviewPlaceholder}>No photo</span>
                  }
                </div>
                <div className={styles.studentPreviewBody}>
                  <p className={styles.studentPreviewCourse}>{editing.course || 'Course / Degree'}</p>
                  <p className={styles.studentPreviewName}>{editing.name || 'Student Name'}</p>
                  {editing.quote && <p className={styles.studentPreviewQuote}>&ldquo;{editing.quote}&rdquo;</p>}
                </div>
              </div>
            </div>
            {/* Form */}
            <div className={styles.formCol}>
              <div className={styles.formSection}>
                <h3 className={styles.formSectionTitle}>Student Info</h3>
                <div className={styles.formRow}>
                  <label className={styles.label}>Full Name *</label>
                  <input className={styles.input} value={editing.name} onChange={e => field('name', e.target.value)} placeholder="e.g. Rahul Sharma" />
                </div>
                <div className={styles.formRow}>
                  <label className={styles.label}>Course / Degree *</label>
                  <input className={styles.input} value={editing.course} onChange={e => field('course', e.target.value)} placeholder="e.g. BSc Computer Science" />
                </div>
                <ImageUpload label="Photo" value={editing.photo} onChange={v => field('photo', v)} placeholder="https://... or upload a photo" previewHeight={160} />
                <div className={styles.formRow}>
                  <label className={styles.label}>Testimonial / Quote</label>
                  <textarea className={styles.textarea} rows={4} value={editing.quote} onChange={e => field('quote', e.target.value)} placeholder="What the student says about their experience..." />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.content}>
      <div className={styles.contentTopBar}>
        <div>
          <h2 className={styles.contentTitle}>Student Stories</h2>
          <p className={styles.contentSubtitle}>Manage the &ldquo;Meet our successful students&rdquo; section on the home page</p>
        </div>
        <div className={styles.topActions}>
          {saved && <span className={styles.savedBadge}>✓ Saved</span>}
          <button className={styles.resetBtn} onClick={() => { if (confirm('Reset to default students?')) persist(defaultStudents); }}>Reset Defaults</button>
          <button className={styles.addBtn} onClick={openNew}>+ Add Student</button>
        </div>
      </div>

      <div className={styles.statsRow}>
        <div className={styles.statCard}><span className={styles.statNum}>{students.length}</span><span className={styles.statLbl}>Students</span></div>
        <div className={styles.statCard}><span className={styles.statNum}>{students.filter(s => s.photo).length}</span><span className={styles.statLbl}>With Photo</span></div>
        <div className={styles.statCard}><span className={styles.statNum}>{students.filter(s => s.quote).length}</span><span className={styles.statLbl}>With Quote</span></div>
        <div className={styles.statCard}><span className={styles.statNum}>{new Set(students.map(s => s.course.split(' ')[0])).size}</span><span className={styles.statLbl}>Programs</span></div>
      </div>

      <div className={styles.studentGrid}>
        {students.map(s => (
          <div key={s.id} className={styles.studentCard}>
            <div className={styles.studentCardPhoto}>
              {s.photo
                ? <img src={s.photo} alt={s.name} />
                : <div className={styles.studentCardNoPhoto}>No photo</div>
              }
            </div>
            <div className={styles.studentCardBody}>
              <p className={styles.studentCardCourse}>{s.course}</p>
              <p className={styles.studentCardName}>{s.name}</p>
              {s.quote && <p className={styles.studentCardQuote}>&ldquo;{s.quote.slice(0, 90)}{s.quote.length > 90 ? '…' : ''}&rdquo;</p>}
            </div>
            <div className={styles.studentCardActions}>
              <button className={styles.editBtn} onClick={() => openEdit(s)}>✏️ Edit</button>
              <button className={styles.deleteBtn} onClick={() => setDeleteConfirm(s.id)}>🗑️</button>
            </div>
          </div>
        ))}
        {students.length === 0 && (
          <div className={styles.emptyState} style={{ gridColumn: '1/-1' }}>
            <div className={styles.emptyIcon}>🌟</div>
            <p>No student stories yet.</p>
            <button className={styles.addBtn} onClick={openNew}>+ Add First Student</button>
          </div>
        )}
      </div>

      {deleteConfirm && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Remove Student?</h3>
            <p>This will remove <strong>{students.find(s => s.id === deleteConfirm)?.name}</strong> from the section.</p>
            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className={styles.confirmDeleteBtn} onClick={doDelete}>Yes, Remove</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   CONTACT INFO
───────────────────────────────────────────── */
function ContactAdmin() {
  const [contact, setContact] = useState(defaultContact);
  const [saved, setSaved] = useState(false);

  useEffect(() => { setContact(getContact()); }, []);

  function field(key, value) { setContact(c => ({ ...c, [key]: value })); }

  function persist() {
    saveContact(contact);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className={styles.content}>
      <div className={styles.contentTopBar}>
        <div>
          <h2 className={styles.contentTitle}>Contact Information</h2>
          <p className={styles.contentSubtitle}>Manage the contact details shown in the website footer</p>
        </div>
        <div className={styles.topActions}>
          {saved && <span className={styles.savedBadge}>✓ Saved</span>}
          <button className={styles.resetBtn} onClick={() => { setContact(defaultContact); }}>Reset Defaults</button>
          <button className={styles.saveBtn} onClick={persist}>💾 Save Changes</button>
        </div>
      </div>

      <div className={styles.placementFormWrap}>
        <div className={styles.formCol} style={{ maxWidth: 640 }}>

          <div className={styles.formSection}>
            <h3 className={styles.formSectionTitle}>Address</h3>
            <div className={styles.formRow}>
              <label className={styles.label}>Address</label>
              <textarea
                className={styles.textarea}
                rows={3}
                value={contact.address}
                onChange={e => field('address', e.target.value)}
                placeholder="e.g. Tirana, Albania (Head Office)"
              />
            </div>
            {contact.address && (
              <button
                className={styles.deleteBtn}
                style={{ marginTop: 4 }}
                onClick={() => field('address', '')}
              >
                🗑️ Remove Address
              </button>
            )}
            {!contact.address && (
              <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: 4 }}>
                Address removed — it will not appear in the footer.
              </p>
            )}
          </div>

          <div className={styles.formSection}>
            <h3 className={styles.formSectionTitle}>Phone</h3>
            <div className={styles.formRow}>
              <label className={styles.label}>Phone Number</label>
              <input
                className={styles.input}
                value={contact.phone}
                onChange={e => field('phone', e.target.value)}
                placeholder="e.g. +91 98765 43210"
              />
            </div>
            {contact.phone && (
              <button className={styles.deleteBtn} style={{ marginTop: 4 }} onClick={() => field('phone', '')}>
                🗑️ Remove Phone
              </button>
            )}
          </div>

          <div className={styles.formSection}>
            <h3 className={styles.formSectionTitle}>WhatsApp</h3>
            <div className={styles.formRow}>
              <label className={styles.label}>WhatsApp Number</label>
              <input
                className={styles.input}
                value={contact.whatsapp}
                onChange={e => field('whatsapp', e.target.value)}
                placeholder="e.g. +91 98765 43210"
              />
            </div>
            {contact.whatsapp && (
              <button className={styles.deleteBtn} style={{ marginTop: 4 }} onClick={() => field('whatsapp', '')}>
                🗑️ Remove WhatsApp
              </button>
            )}
          </div>

          <div className={styles.formSection}>
            <h3 className={styles.formSectionTitle}>Email</h3>
            <div className={styles.formRow}>
              <label className={styles.label}>Email Address</label>
              <input
                className={styles.input}
                type="email"
                value={contact.email}
                onChange={e => field('email', e.target.value)}
                placeholder="e.g. hello@studyalbania.com"
              />
            </div>
            {contact.email && (
              <button className={styles.deleteBtn} style={{ marginTop: 4 }} onClick={() => field('email', '')}>
                🗑️ Remove Email
              </button>
            )}
          </div>

          <div className={styles.formSection} style={{ background: 'rgba(59,130,246,0.06)', borderRadius: 12, padding: '16px 20px' }}>
            <h3 className={styles.formSectionTitle} style={{ marginBottom: 8 }}>Preview</h3>
            {contact.address && <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', margin: '4px 0', whiteSpace: 'pre-line' }}>📍 {contact.address}</p>}
            {contact.phone    && <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', margin: '4px 0' }}>📞 {contact.phone}</p>}
            {contact.whatsapp && <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', margin: '4px 0' }}>💬 {contact.whatsapp} (WhatsApp)</p>}
            {contact.email    && <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', margin: '4px 0' }}>✉️ {contact.email}</p>}
            {!contact.address && !contact.phone && !contact.whatsapp && !contact.email && (
              <p style={{ fontSize: '0.82rem', color: '#6b7280' }}>No contact info — the section will be empty in the footer.</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN ADMIN SHELL
───────────────────────────────────────────── */
const NAV_ITEMS = [
  { key: 'universities', icon: '🎓', label: 'Universities' },
  { key: 'enquiries',    icon: '📬', label: 'Enquiries' },
  { key: 'placements',   icon: '🖼️', label: 'Placements' },
  { key: 'students',     icon: '🌟', label: 'Students' },
  { key: 'faqs',         icon: '❓', label: 'FAQs' },
  { key: 'contact',      icon: '📞', label: 'Contact' },
];

export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab] = useState('universities');
  const [unreadCount, setUnreadCount] = useState(0);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace('/login');
    } else {
      setAuthed(true);
    }
  }, [router]);

  useEffect(() => {
    setUnreadCount(getEnquiries().filter(e => !e.read).length);
  }, [tab]);

  function handleLogout() {
    logout();
    router.replace('/login');
  }

  if (!authed) return null;

  return (
    <div className={styles.shell}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <span className={styles.sidebarFlag}>🇦🇱</span>
          <span className={styles.sidebarLogoText}>Admin</span>
        </div>
        <nav className={styles.sidebarNav}>
          {NAV_ITEMS.map(item => (
            <button
              key={item.key}
              className={`${styles.navItem} ${tab === item.key ? styles.navItemActive : ''}`}
              onClick={() => setTab(item.key)}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel}>{item.label}</span>
              {item.key === 'enquiries' && unreadCount > 0 && (
                <span className={styles.navBadge}>{unreadCount}</span>
              )}
            </button>
          ))}
        </nav>
        <a href="/" className={styles.sidebarViewSite} target="_blank" rel="noopener noreferrer">
          ↗ View Site
        </a>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          ⏻ Logout
        </button>
      </aside>

      {/* Main */}
      <main className={styles.main}>
        {tab === 'universities' && <Universities />}
        {tab === 'enquiries'    && <Enquiries />}
        {tab === 'placements'   && <PlacementsAdmin />}
        {tab === 'students'     && <StudentsAdmin />}
        {tab === 'faqs'         && <FAQsAdmin />}
        {tab === 'contact'      && <ContactAdmin />}
      </main>
    </div>
  );
}
