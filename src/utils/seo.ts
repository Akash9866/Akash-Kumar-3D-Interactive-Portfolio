import { RoutePath } from '../router';
import { projectsData } from '../data/projects';
import { researchData } from '../data/research';

export interface PageMetadata {
  title: string;
  description: string;
}

const DEFAULT_META: PageMetadata = {
  title: 'Akash Kumar — Digital Marketing & Business Strategy',
  description:
    'Explore my portfolio in digital & performance marketing, business strategy, consulting projects, and PGDM Business Design work at WeSchool, Mumbai.',
};

function truncateDescription(text: string, maxLength = 158): string {
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (normalized.length <= maxLength) return normalized;
  const sliced = normalized.slice(0, maxLength - 1);
  const lastSpace = sliced.lastIndexOf(' ');
  return `${(lastSpace > 80 ? sliced.slice(0, lastSpace) : sliced).trim()}…`;
}

export function getRouteMetadata(path: RoutePath): PageMetadata {
  if (path === '/') {
    return DEFAULT_META;
  }

  if (path === '/projects') {
    return {
      title: 'Projects & Case Studies — Akash Kumar',
      description:
        'Explore academic, business design, and startup projects including Nestlé India, Mumbai cleanliness, Artha, DP’s Cafe, and VetCureKart.',
    };
  }

  if (path.startsWith('/projects/')) {
    const slug = path.replace('/projects/', '');
    const project = projectsData.find((p) => p.slug === slug || p.id === slug);
    if (project) {
      return {
        title: `${project.title} — Akash Kumar`,
        description: truncateDescription(
          `${project.tagline} (${project.category}).`
        ),
      };
    }
  }

  if (path === '/education') {
    return {
      title: 'Education & Academic Credentials — Akash Kumar',
      description:
        'PGDM in Business Design at WeSchool, Mumbai (2026–2028, CGPA 8/10) and B.Sc. (Hons.) Agriculture at Quantum University (2021–2025, CGPA 7.84/10).',
    };
  }

  if (path === '/leadership') {
    return {
      title: 'Leadership Experience & Volunteering — Akash Kumar',
      description:
        'Leadership roles as Agriculture Department Club President, University Sports Department core member, Chess Vice-Captain, and educational volunteer.',
    };
  }

  if (path === '/certifications') {
    return {
      title: 'Certifications & Specialized Training — Akash Kumar',
      description:
        'Credentials in Google Digital Marketing & E-commerce, Marketing Analytics, Google DigiPivot 2026, ISAB Noida Agribusiness Workshop, and Beekeeping.',
    };
  }

  if (path === '/internships') {
    return {
      title: 'Internships & Marketing Experience — Akash Kumar',
      description:
        'Market research and performance marketing internships at PCF Agri Tech, Eco Fast Agri Solutions, GPC Agrochemicals, and One India Organic.',
    };
  }

  if (path === '/research') {
    return {
      title: 'Pensieve — Research & Publications | Akash Kumar',
      description:
        'Agricultural science research on Moringa Leaves Extract and Okra (ANOVA) alongside Vertical Farming conference proceedings.',
    };
  }

  if (path.startsWith('/research/')) {
    const slug = path.replace('/research/', '');
    const paper = researchData.find((r) => r.slug === slug || r.id === slug);
    if (paper) {
      return {
        title: `${paper.title} — Akash Kumar`,
        description: truncateDescription(paper.summary),
      };
    }
  }

  if (path === '/about') {
    return {
      title: 'About Me — Akash Kumar | PGDM Business Design',
      description:
        'Learn about my journey from B.Sc. (Hons.) Agriculture to PGDM Business Design at WeSchool, Mumbai, focusing on marketing, analytics, and strategy.',
    };
  }

  if (path === '/tools') {
    return {
      title: 'Tools, Platforms & Analytical Skills — Akash Kumar',
      description:
        'Platforms and methods used across Bloomberg Terminal financial analysis, Meta Ads Manager, SEO visibility, primary user research, and ANOVA.',
    };
  }

  if (path === '/documents') {
    return {
      title: 'Document Vault & Google Picker — Akash Kumar',
      description:
        'Connect and manage live Google Drive documents including resume, internship certificates, certifications, and project reports.',
    };
  }

  if (path === '/contact') {
    return {
      title: 'Contact — Akash Kumar | Internships & Collaborations',
      description:
        'Connect via LinkedIn or email for MBA summer internships, digital and performance marketing roles, business strategy projects, and collaborations.',
    };
  }

  return DEFAULT_META;
}

function upsertMetaTag(
  attribute: 'name' | 'property',
  key: string,
  content: string
): void {
  let tag = document.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`
  );
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.content = content;
}

export function applyDocumentMetadata(path: RoutePath): void {
  const { title, description } = getRouteMetadata(path);
  const resolvedUrl = `${window.location.origin}${window.location.pathname}`;

  document.title = title;

  upsertMetaTag('name', 'description', description);
  upsertMetaTag('property', 'og:title', title);
  upsertMetaTag('property', 'og:description', description);
  upsertMetaTag('property', 'og:url', resolvedUrl);
  upsertMetaTag('name', 'twitter:title', title);
  upsertMetaTag('name', 'twitter:description', description);

  let canonical = document.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]'
  );
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = resolvedUrl;
}
