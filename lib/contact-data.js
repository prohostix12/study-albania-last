export const defaultContact = {
  address: 'Tirana, Albania (Head Office)\nNew Delhi, India (Regional)',
  phone: '+355 00 000 0000',
  email: 'hello@studyalbania.com',
  whatsapp: '',
};

export async function getContact() {
  try {
    const res = await fetch('/api/data/contact');
    if (!res.ok) return defaultContact;
    const data = await res.json();
    return data ? { ...defaultContact, ...data } : defaultContact;
  } catch {
    return defaultContact;
  }
}

export async function saveContact(data) {
  await fetch('/api/data/contact', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}
