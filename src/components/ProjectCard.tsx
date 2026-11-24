import React, { useState, useRef, useEffect } from 'react';
import { ProjectItem } from '../types';
import { ArrowUpRight, BarChart3, TrendingUp, Layers, Compass, FileText } from 'lucide-react';

interface ProjectCoverBannerProps {
  project: ProjectItem;
  size?: 'card' | 'hero';
  parallaxOffset?: { x: number; y: number; active: boolean };
}

export const ProjectCoverBanner: React.FC<ProjectCoverBannerProps> = ({
  project,
  size = 'card',
  parallaxOffset,
}) => {
  const px = parallaxOffset?.active ? parallaxOffset.x : 0;
  const py = parallaxOffset?.active ? parallaxOffset.y : 0;

  if (project.coverImage) {
    return (
      <div className="overflow-hidden rounded-md">
        <img
          src={project.coverImage}
          alt={project.title}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          style={
            parallaxOffset
              ? {
                  transform: `translate3d(${(-px * 6).toFixed(2)}px, ${(-py * 6).toFixed(2)}px, 0) scale(${parallaxOffset.active ? 1.04 : 1})`,
                  transition: parallaxOffset.active
                    ? 'transform 120ms cubic-bezier(0.16, 1, 0.3, 1)'
                    : 'transform 350ms cubic-bezier(0.16, 1, 0.3, 1)',
                }
              : undefined
          }
          className={`w-full object-cover rounded-md ${
            size === 'hero'
              ? 'h-48 sm:h-64 md:h-80'
              : 'h-36 sm:h-36 md:h-44 group-hover:scale-[1.02] transition-transform duration-300'
          }`}
        />
      </div>
    );
  }

  const themePalettes: Record<
    ProjectItem['visualTheme'],
    { bg: string; accent: string; line: string; badge: string }
  > = {
    blue: {
      bg: 'from-[#091326] via-[#0F2042] to-[#173166]',
      accent: 'text-[#60A5FA]',
      line: '#3B82F6',
      badge: 'BLOOMBERG · FINANCIAL ANALYSIS',
    },
    emerald: {
      bg: 'from-[#071F1B] via-[#0D332B] to-[#134E42]',
      accent: 'text-[#34D399]',
      line: '#10B981',
      badge: 'SOCIAL INNOVATION · SMART CITIES',
    },
    indigo: {
      bg: 'from-[#131129] via-[#1E1B4B] to-[#2E296E]',
      accent: 'text-[#A5B4FC]',
      line: '#6366F1',
      badge: 'FINTECH CONCEPT · USER RESEARCH',
    },
    amber: {
      bg: 'from-[#1F1608] via-[#36240B] to-[#52350F]',
      accent: 'text-[#FBBF24]',
      line: '#F59E0B',
      badge: 'OPERATIONS · SERVICE WORKFLOW',
    },
    slate: {
      bg: 'from-[#0F172A] via-[#1E293B] to-[#334155]',
      accent: 'text-[#94A3B8]',
      line: '#64748B',
      badge: 'STRATEGY · ANALYTICS',
    },
    rose: {
      bg: 'from-[#240B15] via-[#3F1224] to-[#5E1A35]',
      accent: 'text-[#FDA4AF]',
      line: '#F43F5E',
      badge: 'ENTREPRENEURSHIP · AGRITECH',
    },
  };

  const palette = themePalettes[project.visualTheme] || themePalettes.blue;
  const layerTransition = parallaxOffset?.active
    ? 'transform 110ms cubic-bezier(0.16, 1, 0.3, 1)'
    : 'transform 360ms cubic-bezier(0.16, 1, 0.3, 1)';

  return (
    <div
      className={`relative w-full overflow-hidden rounded-md bg-gradient-to-br ${
        palette.bg
      } p-4 flex flex-col justify-between select-none ${
        size === 'hero' ? 'h-52 sm:h-64 md:h-80 p-6 sm:p-8' : 'h-36 sm:h-36 md:h-44'
      }`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Subtle architectural grid overlay (Deep Plane) */}
      <div
        className="absolute -inset-4 opacity-15 pointer-events-none will-change-transform"
        style={{
          backgroundImage: `linear-gradient(to right, ${palette.line} 1px, transparent 1px), linear-gradient(to bottom, ${palette.line} 1px, transparent 1px)`,
          backgroundSize: size === 'hero' ? '32px 32px' : '22px 22px',
          transform: `translate3d(${(px * -8).toFixed(2)}px, ${(py * -8).toFixed(2)}px, 0)`,
          transition: layerTransition,
        }}
      />

      {/* Specialized Responsive Vector SVG Illustration (Resolution-independent across all screens) */}
      <div
        className="absolute right-2 bottom-2 w-36 h-24 sm:w-44 sm:h-28 opacity-30 pointer-events-none will-change-transform"
        style={{
          transform: `translate3d(${(px * -13).toFixed(2)}px, ${(py * -10).toFixed(2)}px, 12px)`,
          transition: layerTransition,
        }}
      >
        {project.visualTheme === 'blue' && (
          // Financial Candlesticks & Bloomberg Terminal Trend Line
          <svg viewBox="0 0 160 100" fill="none" className="w-full h-full">
            <line x1="25" y1="20" x2="25" y2="85" stroke={palette.line} strokeWidth="1" opacity="0.3" />
            <line x1="55" y1="15" x2="55" y2="85" stroke={palette.line} strokeWidth="1" opacity="0.3" />
            <line x1="85" y1="10" x2="85" y2="85" stroke={palette.line} strokeWidth="1" opacity="0.3" />
            <line x1="115" y1="5" x2="115" y2="85" stroke={palette.line} strokeWidth="1" opacity="0.3" />
            <line x1="145" y1="0" x2="145" y2="85" stroke={palette.line} strokeWidth="1" opacity="0.3" />
            <rect x="18" y="55" width="14" height="22" rx="1" fill={palette.line} opacity="0.6" />
            <rect x="48" y="42" width="14" height="28" rx="1" fill={palette.line} opacity="0.75" />
            <rect x="78" y="30" width="14" height="32" rx="1" fill={palette.line} opacity="0.85" />
            <rect x="108" y="18" width="14" height="38" rx="1" fill={palette.line} />
            <path d="M12 75 Q 50 65, 80 45 T 150 12" stroke="#8BD4FF" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="150" cy="12" r="3.5" fill="#8BD4FF" />
          </svg>
        )}
        {project.visualTheme === 'emerald' && (
          // Smart City Circular Economy & Ecological Grid Loops
          <svg viewBox="0 0 160 100" fill="none" className="w-full h-full">
            <circle cx="85" cy="50" r="38" stroke={palette.line} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
            <circle cx="85" cy="50" r="24" stroke={palette.line} strokeWidth="2" opacity="0.7" />
            <path d="M40 78 C 65 92, 110 92, 135 78" stroke={palette.line} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M135 22 C 110 8, 65 8, 40 22" stroke={palette.line} strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="40" cy="78" r="4" fill={palette.line} />
            <circle cx="135" cy="78" r="4" fill={palette.line} />
            <circle cx="85" cy="50" r="6" fill="#34D399" />
          </svg>
        )}
        {project.visualTheme === 'indigo' && (
          // Fintech Growth Arch & Compounding Curve Vector
          <svg viewBox="0 0 160 100" fill="none" className="w-full h-full">
            <path d="M15 88 C 45 88, 70 70, 95 48 C 120 26, 138 18, 152 14" stroke={palette.line} strokeWidth="3" strokeLinecap="round" />
            <path d="M15 88 C 45 88, 70 70, 95 48 C 120 26, 138 18, 152 14 L152 95 L15 95 Z" fill={palette.line} fillOpacity="0.12" />
            <circle cx="95" cy="48" r="4.5" fill="#A5B4FC" />
            <circle cx="152" cy="14" r="5" fill="#8BD4FF" />
            <circle cx="35" cy="35" r="14" stroke={palette.line} strokeWidth="1.5" strokeDasharray="2 2" opacity="0.5" />
          </svg>
        )}
        {project.visualTheme === 'rose' && (
          // Healthcare Logistics & Health Waveform Vector
          <svg viewBox="0 0 160 100" fill="none" className="w-full h-full">
            <path d="M10 50 L40 50 L52 24 L64 78 L76 34 L88 62 L98 50 L150 50" stroke={palette.line} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="52" cy="24" r="3.5" fill="#FDA4AF" />
            <circle cx="64" cy="78" r="3.5" fill={palette.line} />
            <circle cx="76" cy="34" r="3.5" fill="#FDA4AF" />
          </svg>
        )}
        {(project.visualTheme === 'amber' || project.visualTheme === 'slate') && (
          // Strategy Roadmap & Process Funnel Vector
          <svg viewBox="0 0 160 100" fill="none" className="w-full h-full">
            <rect x="15" y="65" width="22" height="25" rx="2" fill={palette.line} opacity="0.4" />
            <rect x="45" y="48" width="22" height="42" rx="2" fill={palette.line} opacity="0.6" />
            <rect x="75" y="32" width="22" height="58" rx="2" fill={palette.line} opacity="0.8" />
            <rect x="105" y="16" width="22" height="74" rx="2" fill={palette.line} />
            <path d="M10 85 L45 62 L85 68 L120 35 L152 15" stroke={palette.line} strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </div>

      {/* Top Row (Foreground Plane) */}
      <div
        className="relative z-10 flex items-center justify-between gap-2 will-change-transform"
        style={{
          transform: `translate3d(${(px * 4).toFixed(2)}px, ${(py * 4).toFixed(2)}px, 18px)`,
          transition: layerTransition,
        }}
      >
        <span className={`text-[10px] font-mono tracking-wider uppercase ${palette.accent}`}>
          {project.keyTool ? project.keyTool.toUpperCase() : palette.badge}
        </span>
        <span className="text-white/60">
          {project.visualTheme === 'blue' && <BarChart3 className="w-4 h-4" />}
          {project.visualTheme === 'emerald' && <TrendingUp className="w-4 h-4" />}
          {project.visualTheme === 'indigo' && <Layers className="w-4 h-4" />}
          {project.visualTheme !== 'blue' &&
            project.visualTheme !== 'emerald' &&
            project.visualTheme !== 'indigo' && <Compass className="w-4 h-4" />}
        </span>
      </div>

      {/* Bottom Title Preview inside Banner (Foreground Plane) */}
      <div
        className="relative z-10 space-y-1 max-w-[88%] will-change-transform"
        style={{
          transform: `translate3d(${(px * 6).toFixed(2)}px, ${(py * 5).toFixed(2)}px, 24px)`,
          transition: layerTransition,
        }}
      >
        <p className="text-[11px] font-mono text-white/65 truncate">
          {project.companyOrContext || project.category}
        </p>
        <p
          className={`font-display font-bold text-white leading-snug line-clamp-2 ${
            size === 'hero' ? 'text-xl sm:text-2xl' : 'text-xs sm:text-sm'
          }`}
        >
          {project.title}
        </p>
      </div>
    </div>
  );
};

interface ProjectCardProps {
  project: ProjectItem;
  onOpenDetails: (project: ProjectItem) => void;
  onOpenPage?: (project: ProjectItem) => void;
  onOpenFullStudy?: (project: ProjectItem) => void;
  enableParallax?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenDetails,
  onOpenPage,
  onOpenFullStudy,
  enableParallax = false,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [pointerState, setPointerState] = useState({
    active: false,
    normX: 0,
    normY: 0,
    glareX: 50,
    glareY: 50,
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const canParallax = enableParallax && !prefersReducedMotion;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canParallax || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width;
    const yRatio = (e.clientY - rect.top) / rect.height;
    const normX = Math.max(-1, Math.min(1, (xRatio - 0.5) * 2));
    const normY = Math.max(-1, Math.min(1, (yRatio - 0.5) * 2));

    setPointerState({
      active: true,
      normX,
      normY,
      glareX: xRatio * 100,
      glareY: yRatio * 100,
    });
  };

  const handleMouseLeave = () => {
    if (!canParallax) return;
    setPointerState((prev) => ({
      ...prev,
      active: false,
      normX: 0,
      normY: 0,
    }));
  };

  const handleCardClick = () => {
    if (onOpenPage) {
      onOpenPage(project);
    } else {
      onOpenDetails(project);
    }
  };

  const rotateX = canParallax && pointerState.active ? (-pointerState.normY * 4.2).toFixed(2) : '0';
  const rotateY = canParallax && pointerState.active ? (pointerState.normX * 4.8).toFixed(2) : '0';
  const translateZ = canParallax && pointerState.active ? '8px' : '0px';

  return (
    <div
      ref={cardRef}
      onClick={handleCardClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
      style={canParallax ? { perspective: '1000px' } : undefined}
      className="group relative w-full h-full cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-800 rounded-xl"
    >
      <div
        className={`relative rounded-xl border shadow-sm bg-neutral-200/90 border-transparent text-gray-800 hover:border-zinc-800 hover:shadow-xl w-full h-full ${
          !canParallax ? 'hover:-translate-y-0.5 transition-[transform,border-color,box-shadow] duration-200' : 'will-change-transform'
        }`}
        style={
          canParallax
            ? {
                transformStyle: 'preserve-3d',
                transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(0, ${
                  pointerState.active ? '-3px' : '0px'
                }, ${translateZ})`,
                transition: pointerState.active
                  ? 'transform 120ms cubic-bezier(0.16, 1, 0.3, 1), border-color 200ms ease, box-shadow 200ms ease'
                  : 'transform 380ms cubic-bezier(0.16, 1, 0.3, 1), border-color 200ms ease, box-shadow 200ms ease',
              }
            : undefined
        }
      >
        {/* Subtle Specular Sheen Overlay for 3D Tilt Feedback */}
        {canParallax && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 rounded-xl transition-opacity duration-200"
            style={{
              opacity: pointerState.active ? 0.38 : 0,
              background: `radial-gradient(circle at ${pointerState.glareX}% ${pointerState.glareY}%, rgba(255, 255, 255, 0.72) 0%, rgba(139, 212, 255, 0.14) 28%, rgba(255, 255, 255, 0) 68%)`,
            }}
          />
        )}

        <div
          className="space-y-2 p-3 sm:p-2.5 flex flex-col h-full justify-between gap-2 relative z-10"
          style={canParallax ? { transformStyle: 'preserve-3d' } : undefined}
        >
          {/* Top Visual + Headings */}
          <div className="space-y-1.5">
            <ProjectCoverBanner
              project={project}
              size="card"
              parallaxOffset={
                canParallax
                  ? {
                      x: pointerState.normX,
                      y: pointerState.normY,
                      active: pointerState.active,
                    }
                  : undefined
              }
            />

            <h2
              className="text-zinc-900 font-semibold text-[15px] sm:text-base leading-snug flex items-start justify-between gap-1.5 pt-1"
              style={
                canParallax
                  ? {
                      transform: pointerState.active
                        ? `translate3d(${(pointerState.normX * 2).toFixed(2)}px, ${(pointerState.normY * 1.5).toFixed(2)}px, 10px)`
                        : 'translate3d(0, 0, 0)',
                      transition: pointerState.active
                        ? 'transform 140ms cubic-bezier(0.16, 1, 0.3, 1)'
                        : 'transform 360ms cubic-bezier(0.16, 1, 0.3, 1)',
                    }
                  : undefined
              }
            >
              <span className="line-clamp-2 sm:truncate">{project.title}</span>
              <ArrowUpRight className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-zinc-500 group-hover:text-zinc-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0 mt-0.5" />
            </h2>

            <h3 className="text-zinc-700 text-[13px] sm:text-xs line-clamp-1 font-medium">
              {project.tagline}
            </h3>

            <h4 className="text-[13px] sm:text-xs text-zinc-600 line-clamp-2 leading-relaxed">
              {project.summary}
            </h4>
          </div>

          {/* Bottom Actions & Metadata */}
          <div className="space-y-2.5 pt-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 sm:gap-1.5">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick();
                  }}
                  className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors border border-gray-600 bg-zinc-900 shadow-xs hover:bg-zinc-800 rounded-md px-3.5 sm:px-3 text-xs text-white h-9 sm:h-7 cursor-pointer"
                >
                  Case Study
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenDetails(project);
                  }}
                  className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors border border-zinc-400 bg-white/80 hover:bg-white rounded-md px-3 sm:px-2.5 text-xs text-zinc-800 h-9 sm:h-7 cursor-pointer"
                >
                  Summary
                </button>
                {project.hasFullStudy && onOpenFullStudy && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenFullStudy(project);
                    }}
                    className="inline-flex items-center justify-center gap-1 whitespace-nowrap font-medium transition-colors border border-blue-700 bg-blue-700 hover:bg-blue-800 rounded-md px-3 sm:px-2.5 text-xs text-white h-9 sm:h-7 cursor-pointer"
                  >
                    <FileText className="w-3 h-3" />
                    <span>Full Detailed Study</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                {project.prototypeUrl && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Live Prototype</span>
                  </span>
                )}
                {project.hasFullDocument ? (
                  <span className="text-xs sm:text-[11px] font-medium text-zinc-500">
                    PDF attached
                  </span>
                ) : project.date ? (
                  <span className="text-xs sm:text-[11px] font-medium text-zinc-500">
                    {project.date}
                  </span>
                ) : null}
              </div>
            </div>

            <div className="text-xs sm:text-[11px] text-zinc-600 truncate">
              {project.tags.join(' · ')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
