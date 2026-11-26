import React from 'react';
import { profileData } from '../data/profile';
import { resolveDocumentUrl, getDocumentUrl, getDownloadUrl } from '../data/documents';
import { X, FileText, Download, ExternalLink } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onManageDocuments?: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const resolvedResumeUrl = getDocumentUrl('resume', 'resume', profileData.resumeUrl);
  const resolvedDownloadUrl = getDownloadUrl('resume', 'resume', profileData.resumeUrl);
  const portfolioDossierUrl = resolveDocumentUrl(
    '/assets/aistudio/Akash_Kumar_Master_Portfolio_Content_Document_00d53f37.pdf'
  );

  const resumeFileName = 'Akash_Kumar_Resume.pdf';
  const resumeUpdatedText = 'Verified One-Page Resume';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white border border-zinc-300 rounded-xl shadow-2xl p-4 sm:p-8 text-zinc-900 max-h-[92dvh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 p-2 text-zinc-500 hover:text-zinc-900 rounded-lg hover:bg-zinc-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4 pr-9">
          <div className="p-2.5 sm:p-3 bg-zinc-100 border border-zinc-200 text-zinc-900 rounded-lg shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-bold text-zinc-900 leading-snug">
              Akash Kumar — Resume & Portfolio Profile
            </h3>
            <p className="text-xs text-zinc-500 truncate">
              {profileData.currentProgramme} · {profileData.institution}
            </p>
          </div>
        </div>

        {resolvedResumeUrl ? (
          <div className="space-y-4 my-4 sm:my-5">
            <p className="text-sm text-zinc-700">
              My latest resume is available to view or download below.
            </p>
            <div className="p-3.5 sm:p-4 bg-zinc-50 border border-zinc-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-zinc-900 truncate">
                  {resumeFileName}
                </p>
                <p className="text-xs sm:text-[11px] text-zinc-500">
                  {resumeUpdatedText}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={resolvedResumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 min-h-[38px] sm:min-h-0 text-xs font-semibold text-zinc-900 bg-white border border-zinc-300 hover:bg-zinc-100 rounded-md transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View</span>
                </a>
                {resolvedDownloadUrl && (
                  <a
                    href={resolvedDownloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download="Akash_Kumar_Resume.pdf"
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 min-h-[38px] sm:min-h-0 text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 rounded-md transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 my-4 sm:my-5">
            <p className="text-[13.5px] sm:text-sm text-zinc-700 leading-relaxed">
              {profileData.heroStatement}
            </p>

            <div className="p-3.5 sm:p-4 bg-zinc-50 border border-zinc-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-zinc-900">
                  Portfolio Profile Document (PDF)
                </p>
                <p className="text-xs sm:text-[11px] text-zinc-500">
                  Comprehensive academic, internship & project dossier
                </p>
              </div>
              <a
                href={portfolioDossierUrl || '/assets/aistudio/Akash_Kumar_Master_Portfolio_Content_Document_00d53f37.pdf'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 sm:py-1.5 min-h-[38px] sm:min-h-0 text-xs font-semibold text-zinc-900 bg-white border border-zinc-300 hover:bg-zinc-100 rounded-md transition-colors shrink-0 self-start sm:self-auto"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View PDF</span>
              </a>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-3 bg-zinc-100/80 rounded-md border border-zinc-200">
                <span className="text-zinc-500 shrink-0">Current Programme</span>
                <span className="text-zinc-900 font-medium sm:text-right">
                  PGDM - Business Design (WeSchool, 2026–2028 · CGPA: 8/10)
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-3 bg-zinc-100/80 rounded-md border border-zinc-200">
                <span className="text-zinc-500 shrink-0">Previous Qualification</span>
                <span className="text-zinc-900 font-medium sm:text-right">
                  B.Sc. (Hons.) Agriculture (Quantum University, 2021–2025 · CGPA: 7.84/10)
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-zinc-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 sm:py-1.5 min-h-[38px] sm:min-h-0 text-xs font-medium text-zinc-700 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200 rounded-md transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
