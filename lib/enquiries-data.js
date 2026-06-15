const STORAGE_KEY = 'sia_enquiries';

export function getEnquiries() {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveEnquiry(entry) {
  if (typeof window === 'undefined') return;
  const existing = getEnquiries();
  const newEntry = {
    id: Date.now(),
    ...entry,
    date: new Date().toISOString(),
    read: false,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify([newEntry, ...existing]));
}

export function markEnquiryRead(id) {
  if (typeof window === 'undefined') return;
  const data = getEnquiries().map(e => e.id === id ? { ...e, read: true } : e);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function deleteEnquiry(id) {
  if (typeof window === 'undefined') return;
  const data = getEnquiries().filter(e => e.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
