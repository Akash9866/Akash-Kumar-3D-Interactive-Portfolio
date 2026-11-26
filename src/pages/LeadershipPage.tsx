import React from 'react';
import { RoutePath } from '../router';
import { leadershipData, achievementsData } from '../data/education';
import { Award, Users } from 'lucide-react';

interface LeadershipPageProps {
  onNavigate: (path: RoutePath) => void;
}

export const LeadershipPage: React.FC<LeadershipPageProps> = ({ onNavigate }) => {
  const leadershipRecognitions = achievementsData.filter(
    (ach) =>
      ach.id !== 'ach-vetcurekart-grant' &&
      ach.id !== 'ach-iim-kashipur-finalist' &&
      ach.id !== 'ach-digipivot-2026'
  );

  return (
    <div className="mx-auto space-y-6 md:space-y-8">
      {/* Header aligned consistently with all pages */}
      <div className="space-y-1.5">
        <h1 className="text-[28px] leading-[1.15] sm:text-4xl md:text-5xl font-medium tracking-tight text-zinc-900">
          Leadership Experience
        </h1>
        <p className="text-[14.5px] sm:text-base text-zinc-600 max-w-2xl leading-relaxed">
          My campus leadership roles, indoor sports coordination, competitive chess representation, and community educational volunteering during my undergraduate years (2021–2025).
        </p>
      </div>

      {/* Aligned Sticky Timeline of Leadership Roles */}
      <div className="relative py-2 sm:py-4">
        {/* Track centered on the icon circle (32px on mobile -> left 15px, 40px on sm+ -> left 19px) */}
        <div className="absolute left-[15px] sm:left-[19px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-neutral-300 to-transparent pointer-events-none" />

        <div className="space-y-9 md:space-y-14">
          {leadershipData.map((lead) => (
            <div
              key={lead.id}
              className="relative flex items-start gap-3.5 sm:gap-4 md:gap-8"
            >
              {/* Sticky Left Column: Icon + Desktop Role */}
              <div className="md:sticky md:top-28 z-20 flex items-start gap-3.5 md:w-56 shrink-0">
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center shadow-xs shrink-0">
                  <Users className="w-4 h-4 text-zinc-700" />
                </div>
                <h3 className="hidden md:block text-sm font-medium text-neutral-500 leading-snug pt-2">
                  {lead.role}
                </h3>
              </div>

              {/* Right Content Column */}
              <div className="flex-1 min-w-0 pt-0.5 sm:pt-1.5">
                <h3 className="md:hidden block text-xs font-medium mb-1 text-neutral-500">
                  {lead.role}
                </h3>
                <div className="flex flex-col gap-2 text-sm">
                  <h2 className="text-[17px] sm:text-lg lg:text-xl font-semibold text-zinc-900 leading-snug">
                    {lead.organization}
                  </h2>
                  <p className="text-[14px] sm:text-sm text-gray-600 leading-relaxed">
                    {lead.summary}
                  </p>

                  <ul className="text-gray-700 text-[13.5px] md:text-sm space-y-2 pt-1">
                    {lead.contributions.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start leading-relaxed">
                        <span className="text-gray-400 mr-2 select-none">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Extracurricular & Competition Recognition */}
      {leadershipRecognitions.length > 0 && (
        <section className="space-y-4 pt-6 border-t border-zinc-300">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-zinc-800 shrink-0" />
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-zinc-900">
              Extracurricular & Competition Recognition
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            {leadershipRecognitions.map((ach) => (
              <div
                key={ach.id}
                className="p-4 rounded-xl bg-neutral-200/85 border border-zinc-300 space-y-1.5"
              >
                <h3 className="text-[15px] sm:text-sm font-semibold text-zinc-900">
                  {ach.title}
                </h3>
                <p className="text-[13.5px] sm:text-xs text-zinc-700 leading-relaxed">
                  {ach.detail}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Cross-navigation */}
      <div className="pt-2 flex flex-wrap gap-x-5 gap-y-2 text-[13px] sm:text-xs">
        <button
          onClick={() => onNavigate('/education')}
          className="font-medium text-zinc-800 hover:text-black underline underline-offset-2 cursor-pointer py-0.5"
        >
          View Education Credentials →
        </button>
        <button
          onClick={() => onNavigate('/internships')}
          className="font-medium text-zinc-800 hover:text-black underline underline-offset-2 cursor-pointer py-0.5"
        >
          View Marketing Internships →
        </button>
      </div>
    </div>
  );
};
