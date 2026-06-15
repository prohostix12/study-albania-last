// Default university data — admin can override via localStorage
export const defaultUniversities = [
  {
    id: 2,
    name: 'Epoka University',
    short: 'EU',
    color: '#003087',
    bgColor: '#EEF3FF',
    logo: '',
    coverImage: '/images/epoka_campus.png',
    courses: [
      'Banking and Finance',
      'Business Administration',
      'Economics',
      'International Marketing and Logistics',
      'Business Informatics',
      'Political Science and International Relations',
      'Law (5-year Integrated)',
      'Computer Engineering',
      'Software Engineering',
      'Electronics and Digital Communications',
      'Civil Engineering',
      'Architecture (5-year Integrated)',
    ],
    faculties: [
      {
        name: 'Faculty of Economics & Administrative Sciences',
        programs: [
          { name: 'Banking and Finance',                  level: 'Bachelor',          duration: '3 years', language: 'English', ects: '180 ECTS' },
          { name: 'Business Administration',              level: 'Bachelor',          duration: '3 years', language: 'English', ects: '180 ECTS' },
          { name: 'Economics',                            level: 'Bachelor',          duration: '3 years', language: 'English', ects: '180 ECTS' },
          { name: 'International Marketing and Logistics',level: 'Bachelor',          duration: '3 years', language: 'English', ects: '180 ECTS' },
          { name: 'Business Informatics',                 level: 'Bachelor',          duration: '3 years', language: 'English', ects: '180 ECTS' },
        ],
      },
      {
        name: 'Faculty of Law & Social Sciences',
        programs: [
          { name: 'Political Science and International Relations', level: 'Bachelor',        duration: '3 years', language: 'English', ects: '180 ECTS' },
          { name: 'Law',                                           level: 'Integrated Master', duration: '5 years', language: 'English', ects: '300 ECTS' },
        ],
      },
      {
        name: 'Faculty of Architecture & Engineering',
        programs: [
          { name: 'Computer Engineering',                   level: 'Bachelor',          duration: '3 years', language: 'English', ects: '180 ECTS' },
          { name: 'Software Engineering',                   level: 'Bachelor',          duration: '3 years', language: 'English', ects: '180 ECTS' },
          { name: 'Electronics and Digital Communications', level: 'Bachelor',          duration: '3 years', language: 'English', ects: '180 ECTS' },
          { name: 'Civil Engineering',                      level: 'Bachelor',          duration: '3 years', language: 'English', ects: '180 ECTS' },
          { name: 'Architecture',                           level: 'Integrated Master', duration: '5 years', language: 'English', ects: '300 ECTS' },
        ],
      },
    ],
    facilities: [
      'Modern green campus with welcoming spaces',
      'Smart classrooms and advanced laboratories',
      'Library with extensive resources',
      '200 active student clubs (sports, tech, arts & more)',
      '100+ activities per year: workshops, forums & cultural events',
      'Scholarships for high-achieving students',
    ],
    rankings: [
      { label: 'QS University Rankings 2026 — Albania',        value: '#2'   },
      { label: 'QS University Rankings 2026 — Southern Europe', value: '#165' },
      { label: 'UNIRANKS 2025 — National',                     value: '#2'   },
      { label: 'Webometrics — Albania',                        value: '#2'   },
    ],
    accreditations: [
      'ASCAL — Albanian Quality Assurance Agency',
      'Evalag — European Evaluation Agency (Baden-Württemberg)',
      'ACCA — Association of Chartered Certified Accountants',
    ],
    admission: {
      requirements: [
        'High school diploma or equivalent',
        'Minimum CGPA: 7.00 / 10.00 (or equivalent)',
        'English proficiency: B1 level minimum',
      ],
      scholarships: [
        '750 merit-based scholarships available',
        'Awarded based on high school performance & State Matura exams',
        'SAT exam results considered',
        'Social scholarships for students with financial needs',
      ],
    },
    highlights: [
      { label: 'Employability Rate',     value: '98%'   },
      { label: 'Graduates',             value: '5,991'  },
      { label: 'Alumni Countries',      value: '150+'   },
      { label: 'Company Partners',      value: '340'    },
      { label: 'Career Fair Companies', value: '80+'    },
      { label: 'Annual Internships',    value: '600'    },
    ],
    type: 'Private University',
    founded: '2007',
    location: 'Tirana, Albania',
    badge: '#2 in Albania',
    badgeColor: '#003087',
    website: 'https://epoka.edu.al',
    tuition: '₹2,70,000 / year',
    students: '4,500+',
    description: 'International university in Albania founded in 2007, ranked #2 in Albania (QS 2026) and #165 in Southern Europe. One of the few universities fully taught in English, accredited by ASCAL, Evalag, and ACCA. Graduates have a 98% employability rate with alumni in 150+ countries.',
  },

  {
    id: 3,
    name: 'Mediterranean University of Albania',
    short: 'MUA',
    color: '#1565C0',
    bgColor: '#E3F0FF',
    logo: '',
    coverImage: '/images/mua_campus.png',
    courses: [
      'Bachelor in Business Administration',
      'Bachelor in Informatics Technology',
      'Bachelor in International Relations and Institutions',
      'Bachelor in Nursing',
      'Bachelor in Physiotherapy',
      'Master of Sciences in Business Administration',
      'Master of Science in Artificial Intelligence',
      'PhD in Economic Sciences',
    ],
    faculties: [
      {
        name: 'Faculty of Medical Sciences',
        programs: [
          { name: 'Bachelor in Nursing',        level: 'Bachelor', duration: '3 years', language: 'English', ects: '180 ECTS' },
          { name: 'Bachelor in Physiotherapy',  level: 'Bachelor', duration: '3 years', language: 'English', ects: '180 ECTS' },
        ],
      },
      {
        name: 'Faculty of Informatics',
        programs: [
          { name: 'Bachelor in Informatics Technology',        level: 'Bachelor', duration: '3 years', language: 'English', ects: '180 ECTS' },
          { name: 'Master of Science in Artificial Intelligence', level: 'Master',   duration: '2 years', language: 'English', ects: '120 ECTS' },
        ],
      },
      {
        name: 'Faculty of Economic Sciences',
        programs: [
          { name: 'Bachelor in Business Administration',              level: 'Bachelor', duration: '3 years', language: 'English', ects: '180 ECTS' },
          { name: 'Master of Sciences in Business Administration',    level: 'Master',   duration: '2 years', language: 'English', ects: '120 ECTS' },
          { name: 'PhD in Economic Sciences',                         level: 'Doctoral', duration: '3 years', language: 'English', ects: '' },
        ],
      },
      {
        name: 'Faculty of Law and Human Sciences',
        programs: [
          { name: 'Bachelor in International Relations and Institutions', level: 'Bachelor', duration: '3 years', language: 'English', ects: '180 ECTS' },
        ],
      },
    ],
    facilities: [
      'Two campuses in Tirana (main + Medical Sciences faculty)',
      'Modern lecture halls and smart classrooms',
      'Medical partnerships with hospitals inside and outside Albania',
      'Paid professional internships in EU countries (Medical faculty)',
      'Active Erasmus+ mobility programs — 37 partner universities',
      'Double Degree program with University of Tuscia, Italy',
      'Labor market boards with continuous industry collaboration',
      'Student internship placement with businesses and institutions',
    ],
    rankings: [],
    accreditations: [
      'ASCAL — Albanian Quality Assurance Agency',
      'Erasmus+ Charter for Higher Education — European Commission (Code: AL TIRANA01)',
      'First university in Albania to receive the Erasmus+ Charter certification',
      'Double Degree recognition with University of Tuscia, Italy (Erasmus+ funded)',
    ],
    admission: {
      requirements: [
        'Copy of High School Diploma and Grade list with apostille seal from Embassy/Consulate',
        'Notarized and translated documents in Albanian',
        'Photocopy of valid identification document',
        'Proof of passing national exams equivalent to Republic of Albania standards',
        'For Master programs: Bachelor Diploma recognized by Albanian Educational Services Centre',
        'English proficiency test: TOEFL, Cambridge, IELTS, TOEIC, APTIS, or GEESE',
      ],
      scholarships: [
        'Merit-based scholarship opportunities available',
        'Erasmus+ fully-funded mobility grants for student exchange',
        'Paid professional internships in EU countries (Medical Sciences faculty)',
        'Career placement support through labor market board partnerships',
      ],
    },
    highlights: [
      { label: 'Total Students',      value: '5,059' },
      { label: 'Faculties',           value: '4'     },
      { label: 'Campus Locations',    value: '2'     },
      { label: 'Erasmus+ Partners',   value: '37'    },
      { label: 'Erasmus Charter',     value: '#1 in Albania' },
      { label: 'Study Levels',        value: 'Bachelor to PhD' },
    ],
    type: 'Private University',
    founded: '2010',
    location: 'Tirana, Albania',
    badge: 'Erasmus+ Certified',
    badgeColor: '#1565C0',
    website: 'https://www.umsh.edu.al',
    tuition: 'Contact Admissions',
    students: '5,059',
    description: 'Mediterranean University of Albania (MUA) is a private higher education institution with 4 faculties: Medical Sciences, Informatics, Economic Sciences, and Law & Human Sciences. The first Albanian university to receive the Erasmus+ Charter for Higher Education (code: AL TIRANA01) from the European Commission, with 37 international partner universities. Offers English-taught programs from Bachelor to PhD, including a Double Degree with University of Tuscia, Italy.',
  },

  {
    id: 5,
    name: 'Luarasi University',
    short: 'LU',
    color: '#8B0000',
    bgColor: '#FFF0F0',
    logo: '',
    coverImage: '/images/luarasi_campus.png',
    courses: [
      'Law',
      'Finance and Banking (English)',
      'Business Informatics (English)',
      'Nursing (English)',
      'BSc Finance — University of London / LSE',
      'BSc Business and Management — University of London / LSE',
      'BSc Data Science & Business Analytics — University of London / LSE',
      'Cyber Security Academy',
    ],
    faculties: [
      {
        name: 'Faculty of Law',
        established: '2003',
        programs: [
          { name: 'Law', level: 'Bachelor / Master', duration: '3–5 years', language: 'Albanian', ects: '' },
        ],
      },
      {
        name: 'Faculty of Economics',
        established: '2015',
        programs: [
          { name: 'Finance and Banking', level: 'Bachelor', duration: '3 years', language: 'English', ects: '180 ECTS' },
        ],
      },
      {
        name: 'Faculty of Information Technology & Innovation',
        established: '2018',
        programs: [
          { name: 'Business Informatics',   level: 'Bachelor',     duration: '3 years', language: 'English', ects: '180 ECTS' },
          { name: 'Cyber Security Academy', level: 'Professional', duration: 'Flexible', language: 'English', ects: '' },
        ],
      },
      {
        name: 'Faculty of Medical Sciences',
        established: '2021',
        programs: [
          { name: 'Nursing', level: 'Bachelor', duration: '3 years', language: 'English', ects: '180 ECTS' },
        ],
      },
      {
        name: 'University of London / LSE Programs',
        established: '2025',
        programs: [
          { name: 'BSc Finance',                           level: 'Bachelor', duration: '3 years', language: 'English', ects: '360 Credits (UoL)' },
          { name: 'BSc Business and Management',           level: 'Bachelor', duration: '3 years', language: 'English', ects: '360 Credits (UoL)' },
          { name: 'BSc Data Science & Business Analytics', level: 'Bachelor', duration: '3 years', language: 'English', ects: '360 Credits (UoL)' },
        ],
      },
    ],
    facilities: [
      'Modern campus in central Tirana',
      'Library with extended literature resources',
      'High-speed internet across campus',
      'Bar-lounge and recreational facilities',
      'Parking facilities',
      'Part-time job assistance via HB Group (17 businesses)',
      'Direct career placement support & CV coaching',
      'German language training (DEKRA partnership)',
    ],
    rankings: [],
    accreditations: [
      'ASCAL — Albanian Quality Assurance Agency (re-accredited until 2029)',
      'British Quality Assurance Agency (QAA) — cooperation with ASCAL',
      'University of London — Recognized Teaching Centre (LSE academic direction)',
    ],
    admission: {
      requirements: [
        'High school diploma or equivalent',
        'Minimum academic performance as per Albanian admission standards',
        'English proficiency for English-taught programs',
        'For LSE programs: additional entry requirements per University of London standards',
      ],
      scholarships: [
        'Merit-based scholarships for high-achieving students',
        'Part-time work opportunities through HB Group partnership',
        'Direct placement support for graduates',
      ],
    },
    highlights: [
      { label: 'Total Students',      value: '1,759' },
      { label: 'Full-Time Staff',     value: '104'   },
      { label: 'Years of Experience', value: '21+'   },
      { label: 'Employment Rate',     value: '80%+'  },
      { label: 'Accredited Until',    value: '2029'  },
      { label: 'Partner Businesses',  value: '17'    },
    ],
    type: 'Private University',
    founded: '2003',
    location: 'Tirana, Albania',
    badge: 'LSE Partner',
    badgeColor: '#8B0000',
    website: 'https://luarasi-univ.edu.al',
    tuition: '₹1,80,000 / year',
    students: '1,759',
    description: 'Private higher education institution founded in 2003 with 4 faculties: Law, Economics, IT & Innovation, and Medical Sciences. Recognized Teaching Center for University of London programs under LSE academic direction. Re-accredited until 2029 with over 80% of graduates employed within 6 months.',
  },
];

export async function getUniversities() {
  try {
    const res = await fetch('/api/data/universities');
    if (!res.ok) return defaultUniversities;
    const data = await res.json();
    return data ?? defaultUniversities;
  } catch {
    return defaultUniversities;
  }
}

export async function saveUniversities(data) {
  const res = await fetch('/api/data/universities', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to save universities');
}
