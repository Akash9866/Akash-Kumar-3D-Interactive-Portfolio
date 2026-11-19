/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useRouter } from './router';
import { applyDocumentMetadata } from './utils/seo';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { AmbientParticles } from './components/AmbientParticles';
import { ResumeModal } from './components/ResumeModal';
import { EditorialHomePage } from './pages/EditorialHomePage';
import { AboutPage } from './pages/AboutPage';
import { InternshipsPage } from './pages/InternshipsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ResearchPage } from './pages/ResearchPage';
import { EducationPage } from './pages/EducationPage';
import { LeadershipPage } from './pages/LeadershipPage';
import { CertificationsPage } from './pages/CertificationsPage';
import { ToolsPage } from './pages/ToolsPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { ContactPage } from './pages/ContactPage';
import { DocumentsProvider } from './context/DocumentsContext';

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
    <DocumentsProvider>
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
            {currentPath === '/' && (
              <EditorialHomePage
                onNavigate={navigate}
                onOpenResume={() => setResumeModalOpen(true)}
              />
            )}
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
          </main>

          <Footer onNavigate={navigate} />
        </div>

        {/* Global Resume Modal */}
        <ResumeModal
          isOpen={resumeModalOpen}
          onClose={() => setResumeModalOpen(false)}
          onManageDocuments={() => {
            setResumeModalOpen(false);
            navigate('/documents');
          }}
        />
      </div>
    </DocumentsProvider>
  );
}
