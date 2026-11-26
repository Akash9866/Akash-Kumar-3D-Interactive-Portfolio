import {
  EducationItem,
  LeadershipItem,
  CertificationItem,
  AchievementItem,
} from '../types';

export const educationData: EducationItem[] = [
  {
    id: 'edu-weschool-pgdm',
    institution:
      "S. P. Mandali's Prin. L. N. Welingkar Institute of Management Development & Research (WeSchool), Mumbai",
    degree: 'PGDM — Business Design',
    specialization: 'Business Design, Marketing, Strategy & Innovation',
    duration: '2026–2028',
    status: 'Currently pursuing · Current CGPA: 8/10',
    highlights: [
      'Trained in structured design thinking, primary stakeholder research, and iterative product prototyping to translate user insights into viable business solutions.',
      'Focused on digital marketing, performance marketing, business strategy, consulting, marketing analytics, and innovation.',
      'Academic project work spans Bloomberg Terminal equity analysis of Nestlé India Limited, urban cleanliness system design (SwachhMumbai), the Artha behavioural fintech concept, and restaurant operations analysis at DP’s Cafe.',
    ],
    certificatePath: null,
    verificationStatus: 'verified',
    displayStatus: 'active',
  },
  {
    id: 'edu-quantum-bsc-agri',
    institution: 'Quantum University — School of Agricultural Studies',
    degree: 'B.Sc. (Hons.) Agriculture',
    specialization: 'Agricultural Sciences, Research & Agribusiness',
    duration: '2021–2025',
    status: 'Completed · CGPA: 7.84/10 (Final Grade: A)',
    highlights: [
      'Built an empirical scientific foundation across agricultural sciences, agribusiness management, field trials, and quantitative statistical evaluation during the four-year honours programme.',
      'Conducted experimental plant research (Moringa Leaves Extract & Okra study using ANOVA), contributed to vertical farming proceedings, and co-developed the agribusiness venture VetCureKart (Genesis Startup Programme grant & IIM Kashipur finalist).',
      'Served as President of the Agriculture Department Club and as a core member of the University Sports Department and Chess Vice-Captain.',
    ],
    certificatePath: null,
    verificationStatus: 'verified',
    displayStatus: 'active',
  },
  {
    id: 'edu-class-12',
    institution: 'Ishan International Public School',
    degree: 'Class 12th — Senior Secondary',
    specialization: 'Science Stream — PCB (Physics, Chemistry, Biology)',
    duration: '2020',
    status: 'Completed · Score: 84.50%',
    highlights: [
      'Completed Senior Secondary education under the Central Board of Secondary Education (CBSE) with Science (Physics, Chemistry, and Biology).',
      'Built strong analytical and biological science fundamentals that directly supported undergraduate agricultural research.',
    ],
    certificatePath: null,
    verificationStatus: 'verified',
    displayStatus: 'active',
  },
  {
    id: 'edu-class-10',
    institution: 'Ishan International Public School',
    degree: 'Class 10th — Secondary',
    specialization: '',
    duration: '2018',
    status: 'Completed · Score: 82.40%',
    highlights: [
      'Completed Secondary Schooling under the Central Board of Secondary Education (CBSE) with a balanced foundation across mathematics, sciences, and languages.',
    ],
    certificatePath: null,
    verificationStatus: 'verified',
    displayStatus: 'active',
  },
];

export const leadershipData: LeadershipItem[] = [
  {
    id: 'lead-agri-club-president',
    organization: 'Agriculture Department Club, Quantum University',
    role: 'President',
    summary:
      'I led departmental student initiatives, academic and awareness events, sustainability activities, and team coordination.',
    contributions: [
      'I coordinated 15–20 micro and macro events over a four-month semester.',
      'I led and coordinated a core student team of 10 members.',
      'Our events averaged 60–70 student participants per event.',
      'I organized agricultural awareness, sustainability, and plantation initiatives.',
      'I participated in volunteering activities associated with Sankalp.',
    ],
  },
  {
    id: 'lead-sports-department',
    organization: 'University Sports Department, Quantum University',
    role: 'Core Member | Indoor Sports Coordinator & Chess Vice-Captain',
    summary:
      'I contributed to university-level indoor sports coordination, tournament management, and competitive chess representation.',
    contributions: [
      'I served as a core member of the University Sports Department.',
      'I served as Indoor Sports Coordinator and Chess Vice-Captain.',
      'I helped coordinate 6–7 university sports events.',
      'I competed in university chess events and achieved tournament wins.',
    ],
  },
  {
    id: 'lead-community-volunteering',
    organization: 'Team Everest & Adore India',
    role: 'Educational Volunteer',
    summary:
      'I participated in community and educational volunteering initiatives supporting underprivileged children.',
    contributions: [
      'I volunteered with Team Everest on student and community learning initiatives.',
      'I volunteered with Adore India supporting educational activities for underprivileged children.',
    ],
  },
];

export const certificationsData: CertificationItem[] = [
  {
    id: 'cert-mckinsey-forward',
    title: 'McKinsey Forward Program',
    issuer: 'McKinsey & Company',
    statusNote:
      'Foundational leadership, problem-solving, digital thinking, and business communication program.',
  },
  {
    id: 'cert-google-dm-ecommerce',
    title: 'Google Digital Marketing & E-commerce Certificate',
    issuer: 'Coursera / Google',
    statusNote:
      'Digital marketing channels, e-commerce fundamentals, customer acquisition, and analytics.',
  },
  {
    id: 'cert-google-analytics',
    title: 'Google Analytics Certification',
    issuer: 'Google',
    statusNote:
      'Campaign performance measurement, attribution modeling, audience insights, and web analytics workflows.',
  },
  {
    id: 'cert-hubspot-inbound',
    title: 'HubSpot Inbound Marketing',
    issuer: 'HubSpot Academy',
    statusNote:
      'Inbound marketing methodology, content strategy, customer journey mapping, and lead nurturing.',
  },
  {
    id: 'cert-google-digipivot',
    title: 'Google DigiPivot 2026',
    issuer: 'Google',
    statusNote:
      'Selected for the Google DigiPivot digital marketing and leadership programme.',
  },
  {
    id: 'cert-isab-noida',
    title: 'ISAB Noida Agribusiness Workshop',
    issuer: 'Imperial School of Agri Business (ISAB), Noida',
    statusNote:
      'Awarded Second Prize in the agribusiness workshop at ISAB Noida.',
  },
  {
    id: 'cert-beekeeping',
    title: 'Beekeeping Training',
    issuer: 'Agricultural Training Programme',
    statusNote:
      'Hands-on practical training in apiculture and sustainable agricultural enterprise.',
  },
];

export const achievementsData: AchievementItem[] = [
  {
    id: 'ach-vetcurekart-grant',
    title: 'Quantum University Genesis Startup Programme — INR 50,000 Grant',
    detail:
      'Awarded a INR 50,000 university startup grant (May 2023) for our animal-medicines accessibility venture VetCureKart.',
    verificationNote: '',
  },
  {
    id: 'ach-iim-kashipur-finalist',
    title: 'IIM Kashipur Startup Competition — Finalist',
    detail:
      'Our venture VetCureKart reached the finalist stage in the startup competition at IIM Kashipur.',
    verificationNote: '',
  },
  {
    id: 'ach-isab-second-prize',
    title: 'ISAB Noida Agribusiness Workshop — Second Prize',
    detail:
      'Awarded second prize at the agribusiness workshop organized at the Imperial School of Agri Business (ISAB), Noida.',
    verificationNote: '',
  },
  {
    id: 'ach-digipivot-2026',
    title: 'Google DigiPivot 2026 — Selection',
    detail:
      'Selected for Google DigiPivot 2026.',
    verificationNote: '',
  },
  {
    id: 'ach-chess-tournaments',
    title: 'University Chess Achievements & Vice-Captaincy',
    detail:
      'Served as Chess Vice-Captain at Quantum University with university tournament wins.',
    verificationNote: '',
  },
];
