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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return { currentPath, navigate };
}
