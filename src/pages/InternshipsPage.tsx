import React from 'react';
import { RoutePath } from '../router';
import { internshipsData } from '../data/internships';
import { getDocumentUrl } from '../data/documents';
import { ArrowRight, ExternalLink } from 'lucide-react';

interface InternshipsPageProps {
  onNavigate: (path: RoutePath) => void;
}

export const InternshipsPage: React.FC<InternshipsPageProps> = ({ onNavigate }) => {
  return (
    <div className="mx-auto space-y-6 md:space-y-8">
      {/* Page Header */}
      <div className="space-y-1.5">
        <h1 className="text-[28px] leading-[1.15] sm:text-4xl md:text-5xl font-medium tracking-tight text-zinc-900">
          Internships
        </h1>
        <p className="text-[14.5px] sm:text-base text-zinc-600 max-w-2xl leading-relaxed">
          Practical exposure across digital marketing, Meta advertising, lead generation, SEO optimization, community outreach, and business opportunity research.
        </p>
      </div>

      {/* Internship Cards */}
      <div className="space-y-5 sm:space-y-6">
        {internshipsData.map((item) => (
          <div
            key={item.id}
            className="bg-neutral-200/90 border border-zinc-300 hover:border-zinc-700 transition-colors rounded-xl p-4 sm:p-7 space-y-4 sm:space-y-5 shadow-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-zinc-300 pb-4">
              <div>
                <h2 className="text-lg sm:text-2xl font-bold text-zinc-900 leading-snug">
                  {item.company}
                </h2>
                <p className="text-sm text-zinc-800 font-medium mt-0.5">
                  {item.role}
                </p>
              </div>

              <span className="text-xs text-zinc-600">
                {item.department}
              </span>
            </div>

            <p className="text-[14.5px] sm:text-sm text-zinc-800 leading-relaxed">
              {item.summary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 text-[13.5px] sm:text-xs">
              <div className="space-y-2">
                <h4 className="font-semibold text-zinc-900 text-xs uppercase tracking-wider">
                  Key Responsibilities & Activities
                </h4>
                <ul className="space-y-1.5 text-zinc-700">
                  {item.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-zinc-400">•</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-zinc-900 text-xs uppercase tracking-wider">
                  Key Outcomes & Impact
                </h4>
                <ul className="space-y-1.5 text-zinc-700">
                  {item.reportedOutcomes.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-zinc-400">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[13px] sm:text-xs text-zinc-700">
              <div className="leading-relaxed">
                <span className="font-semibold text-zinc-900">
                  Skills & Exposure:{' '}
                </span>
                <span>{item.skillsExposure.join(' · ')}</span>
              </div>
              {(() => {
                const certUrl = getDocumentUrl(
                  'internship',
                  item.id,
                  item.documentPath
                );
                if (!certUrl) return null;
                return (
                  <a
                    href={certUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 sm:py-1.5 bg-zinc-900 text-white hover:bg-zinc-800 rounded-md text-xs font-medium transition-colors shrink-0 self-start sm:self-auto min-h-[38px] sm:min-h-0"
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

      {/* Bottom Call to Action */}
      <div className="p-4 sm:p-6 bg-white/80 border border-zinc-300 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-zinc-900">
            Interested in Collaborative Opportunities?
          </h3>
          <p className="text-[13.5px] sm:text-xs text-zinc-600 leading-relaxed">
            I bring hands-on experience across performance marketing, SEO visibility, business research, and strategic problem-solving to organizational challenges.
          </p>
        </div>
        <button
          onClick={() => onNavigate('/contact')}
          className="inline-flex items-center justify-center gap-1.5 w-full sm:w-auto px-4 py-2.5 sm:py-2 min-h-[42px] sm:min-h-0 text-sm sm:text-xs font-medium text-white bg-zinc-900 hover:bg-zinc-800 rounded-md transition-colors shrink-0 cursor-pointer"
        >
          <span>Get in touch</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
