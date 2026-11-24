import React from 'react';
import { ProjectItem } from '../types';
import { X, Download, ArrowRight, ExternalLink } from 'lucide-react';
import { ProjectCoverBanner } from './ProjectCard';

interface CaseStudyModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onOpenFullPage?: (project: ProjectItem) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onOpenFullPage,
}) => {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white border border-zinc-300 rounded-xl shadow-2xl p-4 sm:p-8 text-zinc-900 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 p-2 text-zinc-500 hover:text-zinc-900 rounded-lg hover:bg-zinc-100 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Category & Type */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 mb-2 pr-9">
          <span className="font-semibold text-zinc-900">{project.category}</span>
          {project.projectType && (
            <>
              <span aria-hidden="true">·</span>
              <span>{project.projectType}</span>
            </>
          )}
          {project.date && (
            <>
              <span aria-hidden="true">·</span>
              <span>{project.date}</span>
            </>
          )}
        </div>

        {/* Title */}
        <h2 className="text-[19px] sm:text-2xl font-bold text-zinc-900 mb-1 leading-snug pr-8 sm:pr-0">
          {project.title}
        </h2>
        <p className="text-[13.5px] sm:text-sm text-zinc-600 mb-4">{project.tagline}</p>

        {/* Banner Preview */}
        <div className="mb-5">
          <ProjectCoverBanner project={project} size="card" />
        </div>

        {/* Detailed Summary */}
        <div className="bg-zinc-100 p-4 sm:p-5 rounded-lg border border-zinc-200 mb-5 space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-700">
            Project Summary
          </h4>
          <p className="text-[13.5px] sm:text-sm leading-relaxed text-zinc-700">
            {project.summary}
          </p>
        </div>

        {/* Areas Documented */}
        {project.areasToDocument && project.areasToDocument.length > 0 && (
          <div className="mb-5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2.5">
              Scope & Areas Covered
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {project.areasToDocument.map((area, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 text-[13px] sm:text-xs bg-zinc-50 p-2.5 rounded-md border border-zinc-200 leading-relaxed"
                >
                  <span className="text-zinc-900 font-semibold">{idx + 1}.</span>
                  <span className="text-zinc-700">{area}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="border-t border-zinc-200 pt-4 sm:pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="text-xs text-zinc-500">
            {project.companyOrContext || project.category}
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto sm:justify-end">
            {onOpenFullPage && (
              <button
                onClick={() => {
                  onOpenFullPage(project);
                  onClose();
                }}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 sm:py-2 min-h-[38px] sm:min-h-0 text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 rounded-md transition-colors cursor-pointer"
              >
                <span>Open Case Study Page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {project.prototypeUrl && (
              <a
                href={project.prototypeUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 sm:py-2 min-h-[38px] sm:min-h-0 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Launch Prototype</span>
              </a>
            )}

            {project.hasFullDocument && project.documentPath && (
              <a
                href={project.documentPath}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 sm:py-2 min-h-[38px] sm:min-h-0 text-xs font-medium text-zinc-900 border border-zinc-300 hover:bg-zinc-100 rounded-md transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </a>
            )}

            <button
              onClick={onClose}
              className="px-3.5 py-2.5 sm:py-2 min-h-[38px] sm:min-h-0 text-xs font-medium text-zinc-700 hover:bg-zinc-100 rounded-md transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
