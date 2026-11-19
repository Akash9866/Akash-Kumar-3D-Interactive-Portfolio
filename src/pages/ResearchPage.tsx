import React, { useState, useMemo } from 'react';
import { RoutePath } from '../router';
import { researchData } from '../data/research';
import { useDocuments } from '../context/DocumentsContext';
import { ResearchItem } from '../types';
import { Search, ArrowLeft, BookOpen, ExternalLink } from 'lucide-react';

interface ResearchPageProps {
  slug?: string | null;
  onNavigate: (path: RoutePath) => void;
}

export const ResearchPage: React.FC<ResearchPageProps> = ({
  slug,
  onNavigate,
}) => {
  const { getDocumentUrl } = useDocuments();
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const selectedPaper: ResearchItem | null = slug
    ? researchData.find((r) => r.slug === slug || r.id === slug) || null
    : null;

  const topics = [
    'All',
    'Agricultural Sciences',
    'Plant Science',
    'ANOVA Statistical Analysis',
    'Vertical Farming',
    'Agritech',
  ];

  const filteredResearch = useMemo(() => {
    return researchData.filter((item) => {
      const matchesTopic =
        selectedTopic === 'All' ||
        item.topics.includes(selectedTopic) ||
        item.researchArea.toLowerCase().includes(selectedTopic.toLowerCase());
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.researchArea.toLowerCase().includes(q) ||
        item.topics.some((t) => t.toLowerCase().includes(q));
      return matchesTopic && matchesSearch;
    });
  }, [selectedTopic, searchQuery]);

  if (selectedPaper) {
    return (
      <div className="mx-auto space-y-5 py-2">
        <button
          onClick={() => onNavigate('/research')}
          className="hover:tracking-wide hover:underline transition-all inline-flex items-center gap-1.5 text-sm text-zinc-700 hover:text-zinc-900 cursor-pointer py-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Research & Pensieve</span>
        </button>

        <div className="space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-600 font-semibold">
            {selectedPaper.publicationStatus} • {selectedPaper.date}
          </span>
          <h1 className="text-[24px] leading-[1.2] sm:text-3xl font-bold tracking-tight text-zinc-900">
            {selectedPaper.title}
          </h1>
          <p className="text-[13.5px] sm:text-sm text-zinc-700 font-medium">
            Research Area: {selectedPaper.researchArea}
          </p>
          <p className="text-[13px] sm:text-xs text-zinc-600">
            {selectedPaper.venueOrContext} • By Akash Kumar
          </p>
        </div>

        {/* Visual Header */}
        <div className="w-full min-h-[11rem] sm:h-52 rounded-xl bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155] p-5 sm:p-6 flex flex-col justify-between gap-4 text-white">
          <div className="flex items-center justify-between gap-2 text-[11px] sm:text-xs font-mono text-sky-300">
            <span className="truncate">RESEARCH & CONFERENCE PROCEEDINGS</span>
            <BookOpen className="w-4 h-4 shrink-0" />
          </div>
          <div>
            <p className="text-sm sm:text-base font-semibold leading-snug">
              {selectedPaper.title}
            </p>
            <p className="text-xs text-slate-300 mt-1">
              {selectedPaper.topics.join(' · ')}
            </p>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4 text-[15px] sm:text-base text-zinc-800 leading-[1.65] pt-2">
          <h3 className="text-lg font-semibold text-zinc-900">Research Summary</h3>
          <p className="text-zinc-700">{selectedPaper.summary}</p>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          {(() => {
            const paperUrl = getDocumentUrl(
              'research',
              selectedPaper.slug,
              selectedPaper.documentPath || selectedPaper.doiOrLink
            );
            if (!paperUrl) return null;
            return (
              <a
                href={paperUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[42px] text-sm sm:text-xs font-medium text-white bg-zinc-900 hover:bg-zinc-800 rounded-md transition-colors"
              >
                <span>View Paper / Document</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            );
          })()}

          <button
            onClick={() => onNavigate('/contact')}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[42px] text-sm sm:text-xs font-medium text-zinc-900 bg-white border border-zinc-300 hover:bg-zinc-100 rounded-md transition-colors cursor-pointer"
          >
            <span>Inquire About This Research</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 mx-auto space-y-4 md:space-y-5">
      {/* Header */}
      <div className="space-y-1.5">
        <h1 className="text-[28px] leading-[1.15] sm:text-4xl md:text-5xl font-medium tracking-tight text-zinc-900">
          Pensieve — Research & Publications
        </h1>
        <p className="text-[14.5px] sm:text-base text-zinc-600 leading-relaxed max-w-2xl">
          Experimental agricultural research, ANOVA statistical evaluation, and vertical farming conference proceedings.
        </p>
      </div>

      {/* Filter Pills + Search Input Row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0">
          {topics.map((topic) => {
            const active = selectedTopic === topic;
            return (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`rounded-full border px-3.5 py-2 text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  active
                    ? 'bg-zinc-800 border-zinc-800 text-white'
                    : 'border-zinc-300 text-zinc-700 hover:border-zinc-500 bg-white/40'
                }`}
              >
                {topic}
              </button>
            );
          })}
        </div>

        <div className="relative w-full sm:w-56 sm:shrink-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
          <input
            type="search"
            placeholder="Search research"
            aria-label="Search research"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-zinc-300 bg-white/50 sm:bg-transparent py-2.5 sm:py-2 pl-9 pr-3 text-base sm:text-xs text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-500"
          />
        </div>
      </div>

      {/* 2-Column Research Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 min-w-full gap-4 md:gap-6">
        {filteredResearch.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => onNavigate(`/research/${item.slug}`)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onNavigate(`/research/${item.slug}`);
              }
            }}
            className="w-full h-full cursor-pointer group"
          >
            <div className="rounded-xl border shadow-sm bg-neutral-200/90 border-transparent text-gray-800 hover:border-zinc-800 min-w-full h-full flex flex-col transition-all duration-200">
              {/* Top Cover Banner */}
              <div className="p-2.5">
                <div
                  className={`rounded-md w-full aspect-video p-4 flex flex-col justify-between text-white bg-gradient-to-br ${
                    idx % 2 === 0
                      ? 'from-[#0F172A] via-[#1E293B] to-[#334155]'
                      : 'from-[#091526] via-[#162C4E] to-[#1E3A66]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-[10px] font-mono text-sky-300 uppercase tracking-wider">
                    <span className="truncate">{item.researchArea.split('|')[0].trim()}</span>
                    <BookOpen className="w-3.5 h-3.5 text-white/70 shrink-0" />
                  </div>
                  <div>
                    <p className="text-[13px] sm:text-sm font-display font-bold leading-snug line-clamp-2">
                      {item.title}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="px-4 sm:px-5 pt-1 flex flex-col gap-1.5 flex-1 pb-4">
                <div className="flex-1 space-y-1">
                  <h2 className="text-zinc-900 font-semibold text-[15px] sm:text-base line-clamp-2 group-hover:text-black leading-snug">
                    {item.title}
                  </h2>
                  <h3 className="text-zinc-600 text-[13px] sm:text-xs line-clamp-1">
                    {item.venueOrContext}
                  </h3>
                  <h4 className="text-[13px] sm:text-xs text-zinc-600 line-clamp-2 leading-relaxed pt-0.5">
                    {item.summary}
                  </h4>
                </div>

                <div className="flex gap-2 items-center justify-between text-xs text-zinc-700 mt-auto pt-3">
                  <span className="text-zinc-500 font-medium text-xs sm:text-[11px]">
                    {item.publicationStatus}
                  </span>
                  <span className="bg-zinc-800 text-white rounded-md px-2.5 py-1 text-xs sm:text-[11px] shrink-0">
                    Details →
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
