/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useRouter } from './router';
import { applyDocumentMetadata } from './utils/seo';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { AmbientParticles } from './components/AmbientParticles';
import { EditorialHomePage } from './pages/EditorialHomePage';

import { AboutPage } from './pages/AboutPage';
import { InternshipsPage } from './pages/InternshipsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ResearchPage } from './pages/ResearchPage';
import { EducationPage } from './pages/EducationPage';
import { LeadershipPage } from './pages/LeadershipPage';
import { CertificationsPage } from './pages/CertificationsPage';
import { ToolsPage } from './pages/ToolsPage';
import { ContactPage } from './pages/ContactPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';

// Lazy-load truly heavy standalone subviews to keep initial bundle lean
const DocumentsPage = lazy(() =>
  import('./pages/DocumentsPage').then((m) => ({ default: m.DocumentsPage }))
);

/**
 * Lightweight, zero-layout-shift route skeleton placeholder
 */
const RouteLoadingSkeleton: React.FC = () => (
  <div className="w-full space-y-6 animate-pulse py-8" role="status" aria-label="Loading page content">
    <div className="h-9 bg-zinc-200/80 rounded-md w-2/3 max-w-sm"></div>
    <div className="h-5 bg-zinc-200/60 rounded-md w-full max-w-lg"></div>
    <div className="space-y-4 pt-4">
      <div className="h-28 bg-white/70 border border-zinc-200/60 rounded-xl w-full"></div>
      <div className="h-28 bg-white/70 border border-zinc-200/60 rounded-xl w-full"></div>
    </div>
  </div>
);

export default function App() {
  const { currentPath, navigate } = useRouter();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    applyDocumentMetadata(currentPath);
  }, [currentPath]);

  const projectSlug = currentPath.startsWith('/projects/')
    ? currentPath.replace('/projects/', '')
    : null;

  const researchSlug = currentPath.startsWith('/research/')
    ? currentPath.replace('/research/', '')
    : null;

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gradient-to-r from-white to-gray-200 text-zinc-900 selection:bg-zinc-900 selection:text-white">
        {/* Collapsible Left Sidebar */}
        <Navigation
          currentPath={currentPath}
          onNavigate={navigate}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
        />

        {/* Main Content Area offset by Sidebar width */}
        <div
          className={`portfolio-shell flex max-w-screen flex-1 flex-col justify-between transition-[margin] duration-200 pt-14 md:pt-0 ${
            sidebarCollapsed ? 'md:ml-[68px]' : 'md:ml-[236px]'
          }`}
        >
          <AmbientParticles />

          <main className="grow px-4 pt-5 pb-8 sm:p-6 lg:px-12 md:py-24 w-full max-w-4xl mx-auto relative z-10">
            {/* Immediate 0ms synchronous render for all core pages */}
            {currentPath === '/' && (
              <EditorialHomePage onNavigate={navigate} />
            )}
            {currentPath === '/projects' && (
              <ProjectsPage onNavigate={navigate} />
            )}
            {currentPath === '/internships' && (
              <InternshipsPage onNavigate={navigate} />
            )}
            {currentPath === '/about' && <AboutPage onNavigate={navigate} />}
            {currentPath === '/education' && (
              <EducationPage onNavigate={navigate} />
            )}
            {currentPath === '/leadership' && (
              <LeadershipPage onNavigate={navigate} />
            )}
            {currentPath === '/certifications' && (
              <CertificationsPage onNavigate={navigate} />
            )}
            {currentPath.startsWith('/research') && (
              <ResearchPage slug={researchSlug} onNavigate={navigate} />
            )}
            {currentPath === '/tools' && <ToolsPage onNavigate={navigate} />}
            {currentPath === '/contact' && (
              <ContactPage onNavigate={navigate} />
            )}
            {projectSlug && (
              <ProjectDetailPage slug={projectSlug} onNavigate={navigate} />
            )}

            {/* Standalone heavy views loaded on demand */}
            <Suspense fallback={<RouteLoadingSkeleton />}>
              {currentPath === '/documents' && (
                <DocumentsPage onNavigate={navigate} />
              )}
            </Suspense>
          </main>

          <Footer onNavigate={navigate} />
        </div>
      </div>
  );
}
