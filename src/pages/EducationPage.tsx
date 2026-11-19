import React from 'react';
import { RoutePath } from '../router';
import { educationData } from '../data/education';
import { useDocuments } from '../context/DocumentsContext';
import { GraduationCap, ExternalLink } from 'lucide-react';

interface EducationPageProps {
  onNavigate: (path: RoutePath) => void;
}

export const EducationPage: React.FC<EducationPageProps> = ({ onNavigate }) => {
  const { getDocumentUrl } = useDocuments();
  return (
    <div className="mx-auto space-y-6 md:space-y-8">
      {/* Header aligned consistently with all pages */}
      <div className="space-y-1.5">
        <h1 className="text-[28px] leading-[1.15] sm:text-4xl md:text-5xl font-medium tracking-tight text-zinc-900">
          Education
        </h1>
        <p className="text-[14.5px] sm:text-base text-zinc-600 max-w-2xl leading-relaxed">
          My formal academic credentials—spanning postgraduate business design management at WeSchool, Mumbai and undergraduate agricultural sciences at Quantum University.
        </p>
      </div>

      {/* Aligned Sticky-Date Education Timeline */}
      <div className="relative py-2 sm:py-4">
        {/* Track centered on the icon circle (32px on mobile -> left 15px, 40px on sm+ -> left 19px) */}
        <div className="absolute left-[15px] sm:left-[19px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-neutral-300 to-transparent pointer-events-none" />

        <div className="space-y-9 md:space-y-14">
          {educationData.map((edu) => (
            <div
              key={edu.id}
              className="relative flex items-start gap-3.5 sm:gap-4 md:gap-8"
            >
              {/* Sticky Left Column: Icon + Desktop Duration */}
              <div className="md:sticky md:top-28 z-20 flex items-center gap-3.5 md:w-52 shrink-0">
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center shadow-xs shrink-0">
                  <GraduationCap className="w-4 h-4 text-zinc-700" />
                </div>
                <h3 className="hidden md:block text-sm font-medium text-neutral-500 leading-snug tabular-nums">
                  {edu.duration}
                </h3>
              </div>

              {/* Right Content Column */}
              <div className="flex-1 min-w-0 pt-0.5 sm:pt-1.5">
                <h3 className="md:hidden block text-xs font-medium mb-1 text-neutral-500 tabular-nums">
                  {edu.duration}
                </h3>
                <div className="flex flex-col gap-2 text-sm">
                  <h2 className="text-[17px] sm:text-lg lg:text-xl font-semibold text-zinc-900 leading-snug">
                    {edu.degree}
                  </h2>
                  <p className="text-[13.5px] sm:text-sm font-medium text-zinc-700 leading-snug">
                    {edu.institution}
                  </p>
                  <p className="text-xs text-zinc-600 tabular-nums">
                    {edu.status}
                    {edu.specialization ? ` · ${edu.specialization}` : ''}
                  </p>

                  <ul className="text-gray-700 text-[13.5px] md:text-sm space-y-2 pt-1.5">
                    {edu.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start leading-relaxed">
                        <span className="text-gray-400 mr-2 select-none">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2 flex flex-wrap gap-x-4 gap-y-2 text-[13px] sm:text-xs">
                    {(() => {
                      const docUrl = getDocumentUrl(
                        'education',
                        edu.id,
                        edu.certificatePath
                      );
                      if (!docUrl) return null;
                      return (
                        <a
                          href={docUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-medium text-zinc-900 hover:text-black underline underline-offset-2 py-0.5"
                        >
                          <span>View Transcript / Certificate</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      );
                    })()}
                    <button
                      onClick={() => onNavigate('/projects')}
                      className="font-medium text-zinc-800 hover:text-black underline underline-offset-2 cursor-pointer py-0.5"
                    >
                      Related Academic Projects →
                    </button>
                    <button
                      onClick={() => onNavigate('/certifications')}
                      className="font-medium text-zinc-800 hover:text-black underline underline-offset-2 cursor-pointer py-0.5"
                    >
                      View Certifications →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
