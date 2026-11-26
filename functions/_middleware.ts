interface CFRewriterElement {
  setInnerContent(content: string): void;
  setAttribute(name: string, value: string): void;
}

interface CFHTMLRewriterConstructor {
  new (): {
    on(
      selector: string,
      handler: { element(el: CFRewriterElement): void }
    ): CFHTMLRewriterInstance;
  };
}

interface CFHTMLRewriterInstance {
  on(
    selector: string,
    handler: { element(el: CFRewriterElement): void }
  ): CFHTMLRewriterInstance;
  transform(response: Response): Response;
}

declare const HTMLRewriter: CFHTMLRewriterConstructor;

interface PagesContext {
  request: Request;
  next: () => Promise<Response>;
}

interface RouteMeta {
  title: string;
  description: string;
}

const BASE_URL = 'https://akashkumar.pages.dev';

const ROUTE_META: Record<string, RouteMeta> = {
  '/': {
    title: 'Akash Kumar — Digital Marketing & Business Strategy',
    description:
      'Explore my portfolio in digital & performance marketing, business strategy, consulting projects, and PGDM Business Design work at WeSchool, Mumbai.',
  },
  '/projects': {
    title: 'Projects & Case Studies — Akash Kumar',
    description:
      'Explore academic, business design, and startup projects including Nestlé India, Mumbai cleanliness, Artha, DP’s Cafe, and VetCureKart.',
  },
  '/projects/nestle-india-financial-business-analysis': {
    title: 'Financial and Business Analysis of Nestlé India Limited — Akash Kumar',
    description:
      'Group academic project evaluating Nestlé India Limited’s financial performance, DuPont ROE, cash flow, and peer valuation using Bloomberg Terminal.',
  },
  '/projects/mumbai-cleanliness-waste-management': {
    title: 'Mumbai Cleanliness and Waste Management Project — Akash Kumar',
    description:
      'SwachhMumbai civic innovation and urban waste management system addressing “How may we make Mumbai the cleanest city in India?” with live prototype.',
  },
  '/projects/artha-financial-behaviour-savings-app': {
    title: 'Artha — Financial Behaviour and Savings App — Akash Kumar',
    description:
      'Personal finance and behavioural savings application concept informed by ~200 survey responses and in-person user interviews with live prototype.',
  },
  '/projects/dps-cafe-operations-observation': {
    title: 'DP’s Cafe — Operations Observation — Akash Kumar',
    description:
      'Structured three-visit restaurant operations and process analysis examining seating capacity (70 seats), table cycles (20–25 min), and turnaround times.',
  },
  '/projects/vetcurekart-animal-healthcare-venture': {
    title: 'VetCureKart — Animal Healthcare Venture — Akash Kumar',
    description:
      'Animal-medicines accessibility venture, Quantum University Genesis Startup Programme INR 50,000 grant winner, and IIM Kashipur finalist.',
  },
  '/education': {
    title: 'Education & Academic Credentials — Akash Kumar',
    description:
      'PGDM Business Design at WeSchool, Mumbai (2026–2028, CGPA 8/10), B.Sc. (Hons.) Agriculture at Quantum University (2021–2025, CGPA 7.84/10), and CBSE schooling.',
  },
  '/leadership': {
    title: 'Leadership Experience & Volunteering — Akash Kumar',
    description:
      'Leadership roles as Agriculture Department Club President, University Sports Department core member, Chess Vice-Captain, and educational volunteer.',
  },
  '/certifications': {
    title: 'Certifications & Specialized Training — Akash Kumar',
    description:
      'Credentials including McKinsey Forward Program, Google Digital Marketing & E-commerce, Google Analytics, HubSpot Inbound, Google DigiPivot 2026, and ISAB Noida.',
  },
  '/internships': {
    title: 'Internships & Marketing Experience — Akash Kumar',
    description:
      'Digital marketing, AI & marketing automations, and market research internships at GPC Agrochemicals, PCF Agri Tech, Eco Fast Agri Solutions, and One India Organic.',
  },
  '/research': {
    title: 'Pensieve — Research & Publications | Akash Kumar',
    description:
      'Agricultural science research on Moringa Leaves Extract and Okra (ANOVA) alongside Vertical Farming conference proceedings.',
  },
  '/research/moringa-leaves-extract-okra-research': {
    title: 'Moringa Leaves Extract and Okra Research — Akash Kumar',
    description:
      'Experimental agricultural research involving Moringa Leaves Extract (MLE) and okra with ANOVA statistical evaluation (Springer Nature contribution).',
  },
  '/research/vertical-farming-conference-proceedings': {
    title: 'Vertical Farming Conference Proceedings — Akash Kumar',
    description:
      'Conference proceedings contribution focused on vertical farming, agritech, and sustainable agriculture.',
  },
  '/about': {
    title: 'About Me — Akash Kumar | PGDM Business Design',
    description:
      'Learn about my journey from B.Sc. (Hons.) Agriculture to PGDM Business Design at WeSchool, Mumbai, focusing on marketing, analytics, and strategy.',
  },
  '/tools': {
    title: 'Tools, Platforms & Analytical Skills — Akash Kumar',
    description:
      'Platforms and methods used across Bloomberg Terminal, Meta Ads Manager, SEO visibility, Power BI, Google Forms, and ANOVA.',
  },
  '/documents': {
    title: 'Document Vault — Akash Kumar',
    description:
      'Manage verified portfolio documents including resume, internship certificates, certifications, and project reports.',
  },
  '/contact': {
    title: 'Contact — Akash Kumar | Internships & Collaborations',
    description:
      'Connect via LinkedIn or email for MBA summer internships, digital and performance marketing roles, business strategy projects, and collaborations.',
  },
};

function normalizePath(rawPath: string): string {
  const clean = rawPath.replace(/\/+$/, '') || '/';
  if (clean === '/experience') return '/education';
  if (clean === '/startups') return '/projects/vetcurekart-animal-healthcare-venture';
  return clean;
}

class TextRewriter {
  private value: string;
  constructor(value: string) {
    this.value = value;
  }
  element(el: CFRewriterElement) {
    el.setInnerContent(this.value);
  }
}

class AttrRewriter {
  private attr: string;
  private value: string;
  constructor(attr: string, value: string) {
    this.attr = attr;
    this.value = value;
  }
  element(el: CFRewriterElement) {
    el.setAttribute(this.attr, this.value);
  }
}

export async function onRequest(context: PagesContext): Promise<Response> {
  const url = new URL(context.request.url);
  const path = normalizePath(url.pathname);

  // Skip non-HTML asset/file requests
  if (
    path.startsWith('/assets/') ||
    /\.[a-zA-Z0-9]{2,6}$/.test(path)
  ) {
    return context.next();
  }

  const response = await context.next();
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('text/html')) {
    return response;
  }

  const meta = ROUTE_META[path];
  if (!meta) {
    return response;
  }

  const canonicalUrl = `${BASE_URL}${path === '/' ? '/' : path}`;

  return new HTMLRewriter()
    .on('title', new TextRewriter(meta.title))
    .on('meta[name="description"]', new AttrRewriter('content', meta.description))
    .on('link[rel="canonical"]', new AttrRewriter('href', canonicalUrl))
    .on('meta[property="og:url"]', new AttrRewriter('content', canonicalUrl))
    .on('meta[property="og:title"]', new AttrRewriter('content', meta.title))
    .on('meta[property="og:description"]', new AttrRewriter('content', meta.description))
    .on('meta[name="twitter:url"]', new AttrRewriter('content', canonicalUrl))
    .on('meta[name="twitter:title"]', new AttrRewriter('content', meta.title))
    .on('meta[name="twitter:description"]', new AttrRewriter('content', meta.description))
    .transform(response);
};
