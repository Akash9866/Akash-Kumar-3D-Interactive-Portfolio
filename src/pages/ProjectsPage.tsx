import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
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

interface ProjectsPageProps {
  onNavigate: (path: RoutePath) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);
  const [fullStudyOpen, setFullStudyOpen] = useState<boolean>(false);
  const [isDesktopGrid, setIsDesktopGrid] = useState<boolean>(false);

  const gridRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)');
    setIsDesktopGrid(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsDesktopGrid(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ['start start', 'end start'],
  });

  // Subtle opposing vertical scroll parallax on multi-column viewports only
  const disableParallax = Boolean(shouldReduceMotion) || !isDesktopGrid;
  const leftColumnY = useTransform(
    scrollYProgress,
    [0, 1],
    disableParallax ? [0, 0] : [0, -12]
  );
  const rightColumnY = useTransform(
    scrollYProgress,
    [0, 1],
    disableParallax ? [0, 0] : [0, 10]
  );

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
      {/* Header matching amankumar.ai/projects */}
      <div className="space-y-1.5">
        <h1 className="text-[28px] leading-[1.15] sm:text-4xl md:text-5xl font-medium tracking-tight text-zinc-900">
          Projects
        </h1>
        <p className="text-[14.5px] sm:text-base text-zinc-600 leading-relaxed max-w-2xl">
          Structured case studies spanning corporate financial evaluation on Bloomberg Terminal, civic technology, behavioural fintech with live interactive prototypes, operations benchmarking, and venture entrepreneurship.
        </p>
      </div>

      {/* Filter Tabs + Search Input matching amankumar.ai/projects */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
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
                {cat}
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

      {/* 2-Column Project Cards Grid with subtle scroll-linked column parallax + interactive 3D card tilt */}
      <div
        ref={gridRef}
        className="min-w-full grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 pt-1 pb-4"
      >
        {filteredProjects.map((project, idx) => {
          const isRightColumn = idx % 2 === 1;
          return (
            <motion.div
              key={project.id}
              style={{
                y: isRightColumn ? rightColumnY : leftColumnY,
              }}
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, y: 14 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: idx * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="h-full"
            >
              <ProjectCard
                project={project}
                enableParallax
                onOpenDetails={(p) => setActiveModalProject(p)}
                onOpenPage={(p) => onNavigate(`/projects/${p.slug}`)}
                onOpenFullStudy={() => setFullStudyOpen(true)}
              />
            </motion.div>
          );
        })}
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
        onOpenFullStudy={() => setFullStudyOpen(true)}
      />

      {/* Full Detailed Study Modal */}
      {fullStudyOpen && (
        <React.Suspense fallback={null}>
          <NestleFullStudyModal
            isOpen={fullStudyOpen}
            onClose={() => setFullStudyOpen(false)}
          />
        </React.Suspense>
      )}
    </div>
  );
};
