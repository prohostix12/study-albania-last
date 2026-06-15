export const defaultStudents = [
  {
    id: 's-1',
    name: 'Rahul Sharma',
    course: 'BSc Computer Science',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop&crop=face',
    quote: 'Moving to Albania was the best decision of my life. Affordable tuition, world-class professors, and I landed an internship in my second year!',
  },
  {
    id: 's-2',
    name: 'Amina Hassan',
    course: 'BEng Civil Engineering',
    photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80&auto=format&fit=crop&crop=face',
    quote: 'English programs, ECTS credits, safe campus, and living costs I could actually manage. Albania was the perfect choice for my future.',
  },
  {
    id: 's-3',
    name: 'Syed Ahmed',
    course: 'MBA Business',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&auto=format&fit=crop&crop=face',
    quote: 'The counselling team handled everything — admission, visa, accommodation. I arrived fully prepared. My MBA is opening doors I never imagined.',
  },
  {
    id: 's-4',
    name: 'Priya Nair',
    course: 'LLB Law',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&auto=format&fit=crop&crop=face',
    quote: 'The legal faculty is exceptional. Studying European law from inside Europe is a massive advantage. Part-time work covers most of my expenses!',
  },
  {
    id: 's-5',
    name: 'Daniel Osei',
    course: 'BSc Info Technology',
    photo: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&q=80&auto=format&fit=crop&crop=face',
    quote: 'Cutting-edge tech program. The EU pathway after graduation is a massive plus for my career goals.',
  },
  {
    id: 's-6',
    name: 'Fatima Malik',
    course: 'MSc Architecture',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80&auto=format&fit=crop&crop=face',
    quote: 'Studios, labs, and mentors that rival any European institution — at a fraction of the cost.',
  },
];

export async function getStudents() {
  try {
    const res = await fetch('/api/data/students');
    if (!res.ok) return defaultStudents;
    const data = await res.json();
    return data ?? defaultStudents;
  } catch {
    return defaultStudents;
  }
}

export async function saveStudents(data) {
  await fetch('/api/data/students', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}
