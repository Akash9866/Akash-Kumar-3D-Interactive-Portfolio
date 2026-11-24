import { useState, useEffect, useCallback } from 'react';

export type RoutePath =
  | '/'
  | '/about'
  | '/education'
  | '/leadership'
  | '/certifications'
  | '/internships'
  | '/projects'
  | `/projects/${string}`
  | '/research'
  | `/research/${string}`
  | '/tools'
  | '/documents'
  | '/contact';

function normalizePath(rawPath: string): RoutePath {
  const clean = rawPath.replace(/\/+$/, '') || '/';
  if (clean === '/experience') {
    return '/education';
  }
  if (clean === '/startups') {
    return '/projects/vetcurekart-animal-healthcare-venture';
  }
  const exactPaths = [
    '/',
    '/about',
    '/education',
    '/leadership',
    '/certifications',
    '/internships',
    '/projects',
    '/research',
    '/tools',
    '/documents',
    '/contact',
  ];
  if (exactPaths.includes(clean)) {
    return clean as RoutePath;
  }
  if (clean.startsWith('/projects/') || clean.startsWith('/research/')) {
    return clean as RoutePath;
  }
  return '/';
}

export function useRouter() {
  const [currentPath, setCurrentPath] = useState<RoutePath>(() =>
    normalizePath(window.location.pathname)
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((path: RoutePath) => {
    const target = normalizePath(path);
    if (window.location.pathname !== target) {
      window.history.pushState({}, '', target);
      setCurrentPath(target);
      window.scrollTo(0, 0);
    }
  }, []);

  return { currentPath, navigate };
}

/**
 * Anticipatory Route Prefetcher:
 * Loads JS chunks on link hover or during idle moments so subpage transitions are 0ms instant.
 */
export const prefetchRoute = (path: string) => {
  switch (path) {
    case '/internships':
      import('./pages/InternshipsPage');
      break;
    case '/projects':
      import('./pages/ProjectsPage');
      break;
    case '/about':
      import('./pages/AboutPage');
      break;
    case '/education':
      import('./pages/EducationPage');
      break;
    case '/leadership':
      import('./pages/LeadershipPage');
      break;
    case '/certifications':
      import('./pages/CertificationsPage');
      break;
    case '/tools':
      import('./pages/ToolsPage');
      break;
    case '/contact':
      import('./pages/ContactPage');
      break;
    case '/research':
      import('./pages/ResearchPage');
      break;
  }
};

// Warm up key routes during browser idle time after initial page render
if (typeof window !== 'undefined') {
  const scheduleIdle = window.requestIdleCallback || ((cb: () => void) => setTimeout(cb, 1200));
  scheduleIdle(() => {
    prefetchRoute('/internships');
    prefetchRoute('/projects');
    prefetchRoute('/about');
  });
}
