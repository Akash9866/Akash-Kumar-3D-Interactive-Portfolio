import React, { useState, useEffect } from 'react';
import { RoutePath } from '../router';
import { projectsData } from '../data/projects';
import { useDocuments } from '../context/DocumentsContext';
import { ProjectCoverBanner } from '../components/ProjectCard';
import { PerformanceMetricsChart } from '../components/PerformanceMetricsChart';
import { PrototypeViewer } from '../components/PrototypeViewer';
import { Download, ArrowLeft, ExternalLink, Play } from 'lucide-react';

interface ProjectDetailPageProps {
  slug: string;
  onNavigate: (path: RoutePath) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  slug,
  onNavigate,
}) => {
  const { getDocumentUrl } = useDocuments();
  const project =
    projectsData.find((p) => p.slug === slug || p.id === slug) ||
    projectsData[0];

  const [showMarketingTemplate, setShowMarketingTemplate] = useState(
    !project.metricsChart
  );

  useEffect(() => {
    setShowMarketingTemplate(!project.metricsChart);
  }, [project.id, project.metricsChart]);

  return (
    <div className="mx-auto space-y-4 py-2">
      <button
        onClick={() => onNavigate('/projects')}
        className="hover:tracking-wide hover:underline transition-all mb-4 inline-flex items-center gap-1.5 text-sm text-zinc-700 hover:text-zinc-900 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>All Projects</span>
      </button>

      <div className="mx-auto space-y-4">
        <h1 className="text-zinc-900 text-[24px] leading-[1.2] sm:text-3xl font-bold tracking-tight">
          {project.title}
        </h1>

        <h2 className="text-[15px] sm:text-lg text-zinc-700 font-medium leading-snug">
          {project.tagline}
        </h2>

        <p className="text-xs text-zinc-500">
          By Akash Kumar • {project.date} • {project.category}
        </p>

        {/* Unboxed metadata row */}
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[13px] sm:text-xs text-zinc-600 pt-1">
          {project.projectType && (
            <span>
              <strong className="text-zinc-900">Type:</strong> {project.projectType}
            </span>
          )}
          {project.companyOrContext && (
            <span>
              <strong className="text-zinc-900">Context:</strong> {project.companyOrContext}
            </span>
          )}
          {project.keyTool && (
            <span>
              <strong className="text-zinc-900">Key Tool:</strong> {project.keyTool}
            </span>
          )}
        </div>

        {/* Hero Visual Banner */}
        <div className="py-2">
          <ProjectCoverBanner project={project} size="hero" />
        </div>

        {/* Prose Case Study Content */}
        <div className="space-y-6 py-3 sm:py-4 text-zinc-800 text-[15px] sm:text-base leading-[1.65]">
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-bold text-zinc-900">
              Project Summary
            </h3>
            <p className="text-zinc-700">{project.summary}</p>
          </div>

          {project.areasToDocument && project.areasToDocument.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-base sm:text-lg font-semibold text-zinc-900">
                Key Focus & Case Study Scope
              </h4>
              <ul className="list-disc pl-5 space-y-2 text-zinc-700">
                {project.areasToDocument.map((area, idx) => (
                  <li key={idx}>{area}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Interactive Live Prototype Section */}
          {project.prototypeUrl && (
            <div className="space-y-3 pt-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-zinc-900 flex items-center gap-2">
                    <span>Interactive Prototype Simulation</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
                      Live App
                    </span>
                  </h4>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Interact directly with the prototype below, or switch between desktop and mobile viewport.
                  </p>
                </div>
                <a
                  href={project.prototypeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition-colors shadow-xs"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Launch External Window</span>
                </a>
              </div>

              <PrototypeViewer
                prototypeUrl={project.prototypeUrl}
                prototypeTitle={project.prototypeTitle || project.title}
                prototypeType={project.prototypeType}
                defaultView={project.prototypeDefaultView || 'desktop'}
              />
            </div>
          )}

          {/* Reusable Performance & Analytics Chart */}
          <div className="space-y-3 pt-1">
            {project.metricsChart && (
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-medium text-zinc-600">
                  Visualization View
                </span>
                <div className="inline-flex items-center p-1 bg-zinc-200/80 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setShowMarketingTemplate(false)}
                    className={`px-3 py-1.5 sm:px-2.5 sm:py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                      !showMarketingTemplate
                        ? 'bg-white text-zinc-900 shadow-xs'
                        : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    Project Benchmarks
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowMarketingTemplate(true)}
                    className={`px-3 py-1.5 sm:px-2.5 sm:py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                      showMarketingTemplate
                        ? 'bg-white text-zinc-900 shadow-xs'
                        : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    CTR & ROI Model
                  </button>
                </div>
              </div>
            )}

            {project.metricsChart && !showMarketingTemplate ? (
              <PerformanceMetricsChart
                title={project.metricsChart.title}
                subtitle={project.metricsChart.subtitle}
                dataStatus={project.metricsChart.dataStatus}
                dataStatusNote={project.metricsChart.dataStatusNote}
                primarySeries={project.metricsChart.primarySeries}
                secondarySeries={project.metricsChart.secondarySeries}
                data={project.metricsChart.data}
              />
            ) : (
              <PerformanceMetricsChart />
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="text-xs text-zinc-600 pt-1">
          Tags: {project.tags.join(' · ')}
        </div>

        {/* Bottom Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-3">
          {project.prototypeUrl && (
            <a
              href={project.prototypeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-blue-600 shadow-xs min-h-[42px] px-4 py-2 text-white bg-blue-600 hover:bg-blue-700"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Launch Live Prototype App</span>
            </a>
          )}

          {(() => {
            const reportUrl = getDocumentUrl(
              'project',
              project.slug,
              project.documentPath
            );
            if (!reportUrl) return null;
            return (
              <a
                href={reportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-gray-600 shadow-xs min-h-[42px] px-4 py-2 text-white bg-zinc-900 hover:bg-zinc-800"
              >
                <Download className="w-4 h-4" />
                <span>View / Download Report (PDF)</span>
              </a>
            );
          })()}

          <button
            onClick={() => onNavigate('/contact')}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-gray-600 shadow-xs min-h-[42px] px-4 py-2 text-zinc-900 bg-white hover:bg-gray-100 cursor-pointer"
          >
            Discuss this Project
          </button>
        </div>
      </div>
    </div>
  );
};
