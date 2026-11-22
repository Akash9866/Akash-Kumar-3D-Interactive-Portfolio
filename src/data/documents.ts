/**
 * Centralized Document Registry & Cache-Busting Resolver
 *
 * Update links in this single file whenever you upload a new PDF into `/public/docs/`
 * or attach a live cloud link (e.g., Google Drive / Dropbox).
 *
 * Tip for Zero-Redeploy Updates with Google Drive:
 * Use Google Drive "Manage versions -> Upload new version" on the same Drive file
 * so the share URL stays identical while visitors always receive your latest PDF.
 */

export const DOCUMENT_CACHE_VERSION = '2026-11-13';

export interface DocumentEntry {
  url: string | null;
  lastUpdated?: string;
}

export const documentsRegistry = {
  resume: {
    url: null as string | null,
    lastUpdated: '',
  },
  internships: {
    'int-eco-fast-agri': null as string | null,
    'int-gpc-agrochemicals': null as string | null,
    'int-one-india-organic': null as string | null,
  } as Record<string, string | null>,
  projects: {
    'nestle-india-financial-business-analysis': null as string | null,
    'mumbai-cleanliness-waste-management': null as string | null,
    'artha-financial-behaviour-savings-app': null as string | null,
    'dps-cafe-operations-observation': null as string | null,
    'vetcurekart-animal-healthcare-venture': null as string | null,
  } as Record<string, string | null>,
  certifications: {
    'cert-google-dm-ecommerce': null as string | null,
    'cert-google-dm-analytics': null as string | null,
    'cert-google-digipivot': null as string | null,
    'cert-isab-noida': null as string | null,
    'cert-beekeeping': null as string | null,
  } as Record<string, string | null>,
  research: {
    'moringa-leaves-extract-okra-research': null as string | null,
    'vertical-farming-conference-proceedings': null as string | null,
  } as Record<string, string | null>,
  education: {
    'edu-weschool-pgdm': null as string | null,
    'edu-quantum-bsc-agri': null as string | null,
  } as Record<string, string | null>,
};

/**
 * Appends a cache-busting query string for locally hosted static files (e.g., `/docs/resume.pdf`)
 * so browsers always fetch the newest file after an update. Leaves external URLs untouched.
 */
export function resolveDocumentUrl(
  rawUrl?: string | null,
  version: string = DOCUMENT_CACHE_VERSION
): string | null {
  if (!rawUrl) return null;
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  const separator = trimmed.includes('?') ? '&' : '?';
  return `${trimmed}${separator}v=${encodeURIComponent(version)}`;
}

/**
 * Direct synchronous document resolver without pulling in Firebase or React Context.
 */
export function getDocumentUrl(
  category: 'resume' | 'internship' | 'project' | 'certification' | 'research' | 'education' | string,
  targetId: string,
  itemFallbackUrl?: string | null
): string | null {
  if (category === 'resume') {
    return resolveDocumentUrl(documentsRegistry.resume.url || itemFallbackUrl);
  }
  const categoryMap: Record<string, Record<string, string | null>> = {
    internship: documentsRegistry.internships,
    project: documentsRegistry.projects,
    certification: documentsRegistry.certifications,
    research: documentsRegistry.research,
    education: documentsRegistry.education,
  };
  const table = categoryMap[category];
  const configured = table ? table[targetId] : null;
  return resolveDocumentUrl(configured || itemFallbackUrl);
}

export function getDownloadUrl(
  category: 'resume' | 'internship' | 'project' | 'certification' | 'research' | 'education' | string,
  targetId: string,
  itemFallbackUrl?: string | null
): string | null {
  return getDocumentUrl(category, targetId, itemFallbackUrl);
}
