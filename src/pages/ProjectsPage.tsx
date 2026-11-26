import React, { useState, useMemo } from 'react';
import { RoutePath } from '../router';
import { projectsData } from '../data/projects';
import { ProjectItem } from '../types';
import { ProjectCard } from '../components/ProjectCard';
import { CaseStudyModal } from '../components/CaseStudyModal';
import { Search } from 'lucide-react';

const NestleFullStudyModal = React.lazy(() =>
  import('../components/NestleFullStudyModal').then((m) => ({
    default: m.NestleFullStudyModal,
  }))
);

const DpsCafeDetailedStudyModal = React.lazy(() =>
  import('../components/DpsCafeDetailedStudyModal').then((m) => ({
    default: m.DpsCafeDetailedStudyModal,
  }))
);

interface ProjectsPageProps {
  onNavigate: (path: RoutePath) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);
  const [fullStudySlug, setFullStudySlug] = useState<string | null>(null);

  const categories = [
    'All',
    'Financial Analysis',
    'Social Innovation',
    'Product Innovation',
    'Business Operations',
    'Entrepreneurship',
  ];

  const filteredProjects = useMemo(() => {
    return projectsData.filter((p) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        p.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase() === selectedCategory.toLowerCase());
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="mx-auto space-y-4 md:space-y-6">
      {/* Page Header */}
      <div className="space-y-1.5">
        <h1 className="text-[28px] leading-[1.15] sm:text-4xl md:text-5xl font-medium tracking-tight text-zinc-900">
          Projects
        </h1>
        <p className="text-[14.5px] sm:text-base text-zinc-600 leading-relaxed max-w-2xl">
          Structured case studies spanning corporate financial evaluation on Bloomberg Terminal, civic technology, behavioural fintech with live interactive prototypes, operations benchmarking, and venture entrepreneurship.
        </p>
      </div>

      {/* Filter Tabs + Search Input */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="-mx-4 px-4 sm:mx-0 sm:px-0 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            const count =
              cat === 'All'
                ? projectsData.length
                : projectsData.filter(
                    (p) =>
                      p.category.toLowerCase().includes(cat.toLowerCase()) ||
                      p.tags.some((t) => t.toLowerCase() === cat.toLowerCase())
                  ).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full border px-3.5 py-2 text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-zinc-800 border-zinc-800 text-white'
                    : 'border-zinc-300 text-zinc-700 hover:border-zinc-500 hover:text-zinc-900 bg-white/40'
                }`}
              >
                {cat}{' '}
                <span className={isActive ? 'text-zinc-300' : 'text-zinc-400'}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative w-full sm:w-56 sm:shrink-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
          <input
            type="search"
            placeholder="Search projects"
            aria-label="Search projects"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-zinc-300 bg-white/50 sm:bg-transparent py-2.5 sm:py-2 pl-9 pr-3 text-base sm:text-xs text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-500"
          />
        </div>
      </div>

      {/* 2-Column Project Cards Grid */}
      <div
        className="min-w-full grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 pt-1 pb-4"
      >
        {filteredProjects.map((project) => (
          <div key={project.id} className="h-full">
            <ProjectCard
              project={project}
              onOpenDetails={(p) => setActiveModalProject(p)}
              onOpenPage={(p) => onNavigate(`/projects/${p.slug}`)}
              onOpenFullStudy={(p) => setFullStudySlug(p.slug)}
            />
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="p-10 text-center bg-neutral-200/70 border border-zinc-300 rounded-xl">
          <p className="text-sm text-zinc-600">
            No projects matched your search or filter criteria.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="mt-3 px-3 py-1.5 text-xs font-medium text-white bg-zinc-900 rounded-md cursor-pointer"
          >
            Reset filters
          </button>
        </div>
      )}

      {/* Quick Summary Modal */}
      <CaseStudyModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
        onOpenFullPage={(p) => onNavigate(`/projects/${p.slug}`)}
        onOpenFullStudy={(p) => setFullStudySlug(p.slug)}
      />

      {/* Full Detailed Study Modals (Lazy-loaded on demand) */}
      {fullStudySlug === 'nestle-india-financial-business-analysis' && (
        <React.Suspense fallback={null}>
          <NestleFullStudyModal
            isOpen={true}
            onClose={() => setFullStudySlug(null)}
          />
        </React.Suspense>
      )}
      {fullStudySlug === 'dps-cafe-operations-observation' && (
        <React.Suspense fallback={null}>
          <DpsCafeDetailedStudyModal
            isOpen={true}
            onClose={() => setFullStudySlug(null)}
          />
        </React.Suspense>
      )}
    </div>
  );
};
