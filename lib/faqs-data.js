export const defaultFaqs = [
  {
    id: 'faq-1',
    question: 'How do I apply to a university in Albania?',
    answer: 'Applying is straightforward and fully guided. Simply reach out through our platform, complete a short profile, and our counsellors will match you with the right university. We handle document preparation, application submission, and admission follow-up — so you can focus on your future.',
  },
  {
    id: 'faq-2',
    question: 'What are the tuition fees for international students?',
    answer: 'Tuition fees in Albania are among the most affordable in Europe, ranging from €1,500 to €4,000 per year depending on the program and university. This is 60–70% lower than Western European institutions offering the same ECTS-recognized degrees.',
  },
  {
    id: 'faq-3',
    question: 'Are Albanian degrees recognized internationally?',
    answer: 'Yes. All universities we partner with follow the Bologna Process, meaning degrees are fully recognized across all 49 European Higher Education Area member countries. Your qualification will be accepted by employers and institutions across the EU and beyond.',
  },
  {
    id: 'faq-4',
    question: 'What language are courses taught in?',
    answer: 'Most international programs are taught entirely in English, with no Albanian language requirement for admission. Some specialized programs offer bilingual instruction. Our team will confirm the language of instruction for each program before you apply.',
  },
  {
    id: 'faq-5',
    question: 'What is the cost of living in Albania?',
    answer: 'Albania offers one of the lowest costs of living in Europe. Students typically spend €300–€600 per month on accommodation, food, transport, and leisure. Tirana, the capital, is vibrant, safe, and highly walkable — making it ideal for student life on a budget.',
  },
];

export async function getFaqs() {
  try {
    const res = await fetch('/api/data/faqs');
    if (!res.ok) return defaultFaqs;
    const data = await res.json();
    return data ?? defaultFaqs;
  } catch {
    return defaultFaqs;
  }
}

export async function saveFaqs(data) {
  const res = await fetch('/api/data/faqs', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to save FAQs');
}
