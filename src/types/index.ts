/**
 * Portfolio Data Models & Type Definitions
 * Akash Kumar — Master Portfolio Content Architecture
 */

export type VerificationStatus = 'verified' | 'in_progress' | 'pending_verification' | 'document_attached';
export type DisplayStatus = 'active' | 'draft' | 'archived';

export interface ProfileData {
  name: string;
  shortName: string;
  initials: string;
  currentProgramme: string;
  institution: string;
  institutionFull: string;
  batch: string;
  previousQualification: string;
  undergraduateInstitution: string;
  headline: string;
  heroStatement: string;
  homepageIntro: string;
  focusAreas: string[];
  bio: string[];
  nowSummary: {
    date: string;
    content: string;
  };
  offScreen: string;
  location: string;
  targetRoles: string[];
  avatarUrl: string | null;
  resumeUrl: string | null;
  resumeAvailable: boolean;
  socialLinks: {
    linkedin?: string;
    email?: string;
    whatsapp?: string;
  };
  keyCompetencies: {
    title: string;
    description: string;
    skills: string[];
  }[];
  skillsExposure: {
    category: string;
    items: string[];
  }[];
  toolsStack: {
    name: string;
    category: string;
    description: string;
    badge: string;
    accentColor: string;
  }[];
}

export interface InternshipItem {
  id: string;
  company: string;
  role: string;
  roleNote?: string;
  department: string;
  duration: string;
  location: string;
  summary: string;
  responsibilities: string[];
  reportedOutcomes: string[];
  toConfirmNote: string;
  toolsUsed: string[];
  skillsExposure: string[];
  documentPath?: string | null;
  verificationStatus: VerificationStatus;
  displayStatus: DisplayStatus;
}

export interface PerformanceMetricPoint {
  period: string;
  primary: number;
  secondary: number;
}

export interface MetricSeriesConfig {
  label: string;
  unit: string;
  color: string;
  description?: string;
}

export interface PerformanceChartConfig {
  title: string;
  subtitle: string;
  dataStatus: 'verified' | 'reported' | 'illustrative_template';
  dataStatusNote: string;
  primarySeries: MetricSeriesConfig;
  secondarySeries: MetricSeriesConfig;
  data: PerformanceMetricPoint[];
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: string;
  projectType?: string;
  companyOrContext?: string;
  keyTool?: string;
  tags: string[];
  summary: string; // 80-120 words
  date: string;
  coverImage?: string | null;
  visualTheme: 'blue' | 'emerald' | 'amber' | 'indigo' | 'slate' | 'rose';
  documentPath?: string | null;
  hasFullDocument: boolean;
  featured: boolean;
  areasToDocument: string[];
  supportingAssetsNote: string;
  toConfirmNote: string;
  metricsChart?: PerformanceChartConfig;
  prototypeUrl?: string | null;
  prototypeEmbedUrl?: string | null;
  prototypeType?: 'web_app' | 'figma' | 'demo' | null;
  prototypeTitle?: string | null;
  verificationStatus: VerificationStatus;
  displayStatus: DisplayStatus;
}

export interface ResearchItem {
  id: string;
  slug: string;
  title: string;
  researchArea: string;
  summary: string;
  venueOrContext: string;
  publicationStatus: string;
  date: string;
  topics: string[];
  bibliographicNote: string;
  doiOrLink?: string | null;
  documentPath?: string | null;
  verificationStatus: VerificationStatus;
  displayStatus: DisplayStatus;
}

export interface StartupItem {
  id: string;
  name: string;
  tagline: string;
  role: string;
  domain: string;
  duration: string;
  status: string;
  summary: string;
  reportedMilestones: string[];
  reportedDates: string[];
  supportingAssetsNote: string;
  toConfirmNote: string;
  tags: string[];
  deckPath?: string | null;
  verificationStatus: VerificationStatus;
  displayStatus: DisplayStatus;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  specialization?: string;
  duration: string;
  status: string;
  highlights: string[];
  verificationNote?: string;
  certificatePath?: string | null;
  verificationStatus: VerificationStatus;
  displayStatus: DisplayStatus;
}

export interface LeadershipItem {
  id: string;
  organization: string;
  role: string;
  summary: string;
  contributions: string[];
  communityNote?: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  statusNote: string;
  certificateUrl?: string | null;
}

export interface AchievementItem {
  id: string;
  title: string;
  detail: string;
  verificationNote: string;
}

export interface ContactData {
  email: string;
  phoneDisplay: string;
  phoneWhatsapp: string;
  linkedin: string;
  location: string;
  availability: string;
  customMessagePrompt: string;
}
