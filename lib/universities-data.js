// Default university data — admin can override via localStorage
export const defaultUniversities = [
  {
    id: 1,
    name: 'Canadian Institute of Technology',
    short: 'CIT',
    color: '#C8102E',
    bgColor: '#FFF0F0',
    logo: '',          // URL to logo image (optional)
    coverImage: '/images/cit_campus.png',    // URL to cover/banner image (optional)
    courses: ['IT & Computer Science', 'Software Engineering', 'Business Administration'],
    type: 'Private University',
    founded: '2011',
    location: 'Tirana',
    badge: 'Top Ranked',
    badgeColor: '#C8102E',
    website: 'https://cit.edu.al',
    tuition: '€2,500 / year',
    students: '3,000+',
    description: 'A leading technology-focused university offering internationally accredited programs in IT, engineering, and business.',
  },
  {
    id: 2,
    name: 'Epoka University',
    short: 'EU',
    color: '#003087',
    bgColor: '#EEF3FF',
    logo: '',
    coverImage: '/images/epoka_campus.png',
    courses: ['Civil Engineering', 'Architecture', 'Computer Engineering'],
    type: 'Private University',
    founded: '2007',
    location: 'Tirana',
    badge: 'EU Accredited',
    badgeColor: '#003087',
    website: 'https://epoka.edu.al',
    tuition: '€3,000 / year',
    students: '4,500+',
    description: 'EU-accredited university with strong ties to European institutions, offering engineering and architecture programs.',
  },
  {
    id: 3,
    name: 'Mediterranean University of Albania',
    short: 'MUA',
    color: '#006BA6',
    bgColor: '#EBF6FF',
    logo: '',
    coverImage: '/images/mua_campus.png',
    courses: ['Business Management', 'Economics', 'Finance'],
    type: 'Private University',
    founded: '2006',
    location: 'Tirana',
    badge: 'International',
    badgeColor: '#006BA6',
    website: 'https://umed.edu.al',
    tuition: '€2,800 / year',
    students: '2,800+',
    description: 'An internationally oriented university specializing in business, economics, and social sciences.',
  },
  {
    id: 4,
    name: 'Western Balkans University',
    short: 'WBU',
    color: '#1B5E20',
    bgColor: '#EDFBF0',
    logo: '',
    coverImage: '/images/wbu_campus.png',
    courses: ['Technology', 'Innovation Management', 'Digital Business'],
    type: 'Private University',
    founded: '2009',
    location: 'Tirana',
    badge: 'Innovation Hub',
    badgeColor: '#1B5E20',
    website: 'https://wbu.edu.al',
    tuition: '€2,200 / year',
    students: '2,000+',
    description: 'Focused on innovation and digital transformation, preparing graduates for the modern economy.',
  },
  {
    id: 5,
    name: 'Luarasi University',
    short: 'LU',
    color: '#6A1B9A',
    bgColor: '#F5EEFF',
    logo: '',
    coverImage: '/images/luarasi_campus.png',
    courses: ['Law', 'Social Sciences', 'Political Science'],
    type: 'Private University',
    founded: '2010',
    location: 'Tirana',
    badge: 'Law Excellence',
    badgeColor: '#6A1B9A',
    website: 'https://luarasi-univ.edu.al',
    tuition: '€2,000 / year',
    students: '1,800+',
    description: 'Albania\'s premier law and social sciences university with a strong focus on legal education and governance.',
  },
];

export const STORAGE_KEY = 'sia_universities';

export function getUniversities() {
  if (typeof window === 'undefined') return defaultUniversities;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultUniversities;
  } catch {
    return defaultUniversities;
  }
}

export function saveUniversities(data) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
