export async function getEnquiries() {
  try {
    const res = await fetch('/api/data/enquiries');
    if (!res.ok) return [];
    const data = await res.json();
    return data ?? [];
  } catch {
    return [];
  }
}

export async function saveEnquiry(entry) {
  const existing = await getEnquiries();
  const newEntry = {
    id: Date.now(),
    ...entry,
    date: new Date().toISOString(),
    read: false,
  };
  await fetch('/api/data/enquiries', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify([newEntry, ...existing]),
  });
}

export async function markEnquiryRead(id) {
  const data = (await getEnquiries()).map(e => e.id === id ? { ...e, read: true } : e);
  await fetch('/api/data/enquiries', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function deleteEnquiry(id) {
  const data = (await getEnquiries()).filter(e => e.id !== id);
  await fetch('/api/data/enquiries', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}
