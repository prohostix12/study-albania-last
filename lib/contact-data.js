export const CONTACT_KEY = 'sia_contact';

export const defaultContact = {
  address: 'Tirana, Albania (Head Office)\nNew Delhi, India (Regional)',
  phone: '+355 00 000 0000',
  email: 'hello@studyalbania.com',
  whatsapp: '',
};

export function getContact() {
  if (typeof window === 'undefined') return defaultContact;
  try {
    const stored = localStorage.getItem(CONTACT_KEY);
    return stored ? { ...defaultContact, ...JSON.parse(stored) } : defaultContact;
  } catch {
    return defaultContact;
  }
}

export function saveContact(data) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CONTACT_KEY, JSON.stringify(data));
}
