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

// Code-splitting routes: dynamically import subpages to minimize initial page payload
const AboutPage = lazy(() =>
  import('./pages/AboutPage').then((m) => ({ default: m.AboutPage }))
);
const InternshipsPage = lazy(() =>
  import('./pages/InternshipsPage').then((m) => ({ default: m.InternshipsPage }))
);
const ProjectsPage = lazy(() =>
  import('./pages/ProjectsPage').then((m) => ({ default: m.ProjectsPage }))
);
const ProjectDetailPage = lazy(() =>
  import('./pages/ProjectDetailPage').then((m) => ({ default: m.ProjectDetailPage }))
);
const ResearchPage = lazy(() =>
  import('./pages/ResearchPage').then((m) => ({ default: m.ResearchPage }))
);
const EducationPage = lazy(() =>
  import('./pages/EducationPage').then((m) => ({ default: m.EducationPage }))
);
const LeadershipPage = lazy(() =>
  import('./pages/LeadershipPage').then((m) => ({ default: m.LeadershipPage }))
);
const CertificationsPage = lazy(() =>
  import('./pages/CertificationsPage').then((m) => ({ default: m.CertificationsPage }))
);
const ToolsPage = lazy(() =>
  import('./pages/ToolsPage').then((m) => ({ default: m.ToolsPage }))
);
const DocumentsPage = lazy(() =>
  import('./pages/DocumentsPage').then((m) => ({ default: m.DocumentsPage }))
);
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage }))
);
const ResumeModal = lazy(() =>
  import('./components/ResumeModal').then((m) => ({ default: m.ResumeModal }))
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
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

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
          onOpenResume={() => setResumeModalOpen(true)}
        />

        {/* Main Content Area offset by Sidebar width */}
        <div
          className={`flex max-w-screen flex-1 flex-col justify-between transition-all duration-300 pt-14 md:pt-0 ${
            sidebarCollapsed ? 'md:ml-[68px]' : 'md:ml-[236px]'
          }`}
        >
          <AmbientParticles />

          <main className="grow px-4 pt-5 pb-8 sm:p-6 lg:px-12 md:py-24 w-full max-w-4xl mx-auto relative z-10">
            {/* Immediate synchronous render for Homepage */}
            {currentPath === '/' && (
              <EditorialHomePage
                onNavigate={navigate}
                onOpenResume={() => setResumeModalOpen(true)}
              />
            )}

            {/* Code-split asynchronous routes wrapped with Suspense */}
            <Suspense fallback={<RouteLoadingSkeleton />}>
              {currentPath === '/projects' && (
                <ProjectsPage onNavigate={navigate} />
              )}
              {projectSlug && (
                <ProjectDetailPage slug={projectSlug} onNavigate={navigate} />
              )}
              {currentPath === '/internships' && (
                <InternshipsPage onNavigate={navigate} />
              )}
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
              {currentPath === '/about' && <AboutPage onNavigate={navigate} />}
              {currentPath === '/tools' && <ToolsPage onNavigate={navigate} />}
              {currentPath === '/documents' && (
                <DocumentsPage onNavigate={navigate} />
              )}
              {currentPath === '/contact' && (
                <ContactPage onNavigate={navigate} />
              )}
            </Suspense>
          </main>

          <Footer onNavigate={navigate} />
        </div>

        {/* Asynchronously loaded Resume Modal */}
        {resumeModalOpen && (
          <Suspense fallback={null}>
            <ResumeModal
              isOpen={resumeModalOpen}
              onClose={() => setResumeModalOpen(false)}
            />
          </Suspense>
        )}
      </div>
  );
}
