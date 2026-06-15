export const defaultPlacements = [
  {
    id: 'placement-1',
    title: 'Internships During Study',
    desc: 'Our partnered universities maintain strong tie-ups with leading local and international companies, offering professional paid internships that start as early as your second year of study.',
    points: [
      'Paid internship programs in major cities',
      'Direct industry mentoring from experts',
      'Practical real-world experience',
      'Build a professional CV & portfolio',
    ],
    image: '/images/placement-internship.png',
    color: '#4A7AFA',
    layout: 'left',
  },
  {
    id: 'placement-2',
    title: 'Global Job Opportunities',
    desc: "Albania's rapidly growing economy and strategic ties to EU markets provide graduates with exclusive access to high-demand roles both within the country and across the European Union.",
    points: [
      'Access to IT, Engineering & Business roles',
      'Direct placements in EU-based companies',
      'Support for remote work opportunities',
      'Personalized career counselling and prep',
    ],
    image: '/images/why-albania-bg.png',
    color: '#7B4FFF',
    layout: 'right',
  },
  {
    id: 'placement-3',
    title: 'EU Higher Studies Pathway',
    desc: "Your Albanian degree is ECTS-recognized across Europe, serving as a powerful gateway for seamless applications to prestigious Master's or PhD programs throughout the continent.",
    points: [
      'Direct admission to EU universities',
      'Erasmus+ international mobility programs',
      'Advanced research opportunities',
      'Clear PhD pathways across European capitals',
    ],
    image: '/images/faq-students.png',
    color: '#E8A020',
    layout: 'left',
  },
];

export async function getPlacements() {
  try {
    const res = await fetch('/api/data/placements');
    if (!res.ok) return defaultPlacements;
    const data = await res.json();
    return data ?? defaultPlacements;
  } catch {
    return defaultPlacements;
  }
}

export async function savePlacements(data) {
  await fetch('/api/data/placements', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}
