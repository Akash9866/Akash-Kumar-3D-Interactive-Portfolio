import React from 'react';
import { RoutePath } from '../router';
import { certificationsData } from '../data/education';
import { getDocumentUrl } from '../data/documents';
import { BadgeCheck, ExternalLink } from 'lucide-react';

interface CertificationsPageProps {
  onNavigate: (path: RoutePath) => void;
}

export const CertificationsPage: React.FC<CertificationsPageProps> = ({
  onNavigate,
}) => {
  return (
    <div className="mx-auto space-y-6 md:space-y-8">
      {/* Header */}
      <div className="space-y-1.5">
        <h1 className="text-[28px] leading-[1.15] sm:text-4xl md:text-5xl font-medium tracking-tight text-zinc-900">
          Certifications
        </h1>
        <p className="text-[14.5px] sm:text-base text-zinc-600 max-w-2xl leading-relaxed">
          My certifications, specialized programmes, and practical training across digital marketing, marketing analytics, agribusiness workshops, and agricultural skills.
        </p>
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
        {certificationsData.map((cert) => (
          <div
            key={cert.id}
            className="p-4 sm:p-5 rounded-xl bg-neutral-200/85 border border-zinc-300 flex flex-col justify-between space-y-3"
          >
            <div className="space-y-1.5">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-zinc-600">
                    {cert.issuer}
                  </p>
                  <h2 className="text-[15.5px] sm:text-base font-semibold text-zinc-900 leading-snug">
                    {cert.title}
                  </h2>
                </div>
                <BadgeCheck className="w-5 h-5 text-zinc-700 shrink-0 mt-0.5" />
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-300/80 flex flex-col gap-2.5 text-[13px] sm:text-xs text-zinc-600 leading-relaxed">
              <span>{cert.statusNote}</span>
              {(() => {
                const certUrl = getDocumentUrl(
                  'certification',
                  cert.id,
                  cert.certificateUrl
                );
                if (!certUrl) return null;
                return (
                  <a
                    href={certUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-medium text-zinc-900 hover:underline self-start py-0.5"
                  >
                    <span>View Certificate</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                );
              })()}
            </div>
          </div>
        ))}
      </div>

      {/* Cross-navigation */}
      <div className="pt-2 flex flex-wrap gap-x-5 gap-y-2 text-[13px] sm:text-xs">
        <button
          onClick={() => onNavigate('/education')}
          className="font-medium text-zinc-800 hover:text-black underline underline-offset-2 cursor-pointer py-0.5"
        >
          View Education →
        </button>
        <button
          onClick={() => onNavigate('/tools')}
          className="font-medium text-zinc-800 hover:text-black underline underline-offset-2 cursor-pointer py-0.5"
        >
          View Tools & Skills →
        </button>
      </div>
    </div>
  );
};
