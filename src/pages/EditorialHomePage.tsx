import React from 'react';
import { RoutePath } from '../router';
import { profileData } from '../data/profile';
import { projectsData } from '../data/projects';
import { contactData } from '../data/contact';
import { ProjectCoverBanner } from '../components/ProjectCard';
import {
  ArrowRight,
  Linkedin,
  Download,
  GraduationCap,
  Mail,
  ExternalLink,
} from 'lucide-react';

interface EditorialHomePageProps {
  onNavigate: (path: RoutePath) => void;
  onOpenResume: () => void;
}

export const EditorialHomePage: React.FC<EditorialHomePageProps> = ({
  onNavigate,
  onOpenResume,
}) => {
  const featuredProject = projectsData[0];

  const directoryRows: {
    title: string;
    badge?: string;
    description: string;
    path: RoutePath;
  }[] = [
    {
      title: 'Nestlé India Analysis',
      badge: 'Bloomberg Terminal · Equity Analysis',
      description:
        'Corporate valuation and financial ratio evaluation of Nestlé India Limited conducted via Bloomberg Terminal at WeSchool.',
      path: '/projects/nestle-india-financial-business-analysis',
    },
    {
      title: 'Mumbai Cleanliness',
      badge: 'Live Interactive App Prototype',
      description:
        'Civic innovation & waste management strategy (“How may we make Mumbai the cleanest city in India?”) with live embedded prototype.',
      path: '/projects/mumbai-cleanliness-waste-management',
    },
    {
      title: 'Artha — Savings App',
      badge: 'Live Simulator · ~200 Surveyed',
      description:
        'Behavioural savings fintech concept grounded in primary customer research and interactive simulator.',
      path: '/projects/artha-financial-behaviour-savings-app',
    },
    {
      title: 'DP’s Cafe Operations',
      badge: 'Field Benchmarks · Process Design',
      description:
        'Structured turnaround observation benchmarks (4–5 min idli-vada, 7–8 min dosa) and peak-hour workflow optimization.',
      path: '/projects/dps-cafe-operations-observation',
    },
    {
      title: 'VetCureKart (Venture)',
      badge: 'Genesis Startup Finalist',
      description:
        'Agribusiness accessibility venture and IIM Kashipur competition finalist addressing veterinary medicine distribution.',
      path: '/projects/vetcurekart-animal-healthcare-venture',
    },
    {
      title: 'All Projects',
      badge: '5 Flagship Studies',
      description:
        'Academic, business design & startup projects including Nestlé India, Mumbai cleanliness, Artha, DP’s Cafe & VetCureKart.',
      path: '/projects',
    },
    {
      title: 'Pensieve (Research)',
      badge: 'ANOVA Statistics · 2 Papers',
      description:
        'Moringa Leaves Extract & Okra research (ANOVA) and Vertical Farming Conference Proceedings.',
      path: '/research',
    },
    {
      title: 'Education',
      description:
        'PGDM — Business Design at WeSchool (2026–2028 · CGPA: 8/10) & B.Sc. (Hons.) Agriculture at Quantum University (July 2021 – July 2025 · CGPA: 7.84/10).',
      path: '/education',
    },
    {
      title: 'Internships',
      badge: '3 Marketing Roles',
      description:
        'Eco Fast Agri Solutions, GPC Agrochemicals, and One India Organic digital and performance marketing roles.',
      path: '/internships',
    },
    {
      title: 'Leadership Experience',
      description:
        'President of the Agriculture Department Club, Sports Department & Chess Vice-Captain, and volunteering.',
      path: '/leadership',
    },
    {
      title: 'Certifications',
      description:
        'Google Digital Marketing & E-commerce, Marketing Analytics, DigiPivot 2026, ISAB Noida & Beekeeping Training.',
      path: '/certifications',
    },
    {
      title: 'Tools & Stack',
      description:
        'Bloomberg Terminal, Meta Ads Manager, SEO visibility tools, Google Forms, Reddit & Quora outreach, and ANOVA.',
      path: '/tools',
    },
  ];

  return (
    <div className="pb-2 mx-auto space-y-7 md:space-y-11">
      {/* Hero & Editorial Lead matching amankumar.ai + Section 01 of Master Document */}
      <div className="space-y-4 md:space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:py-1 rounded-full bg-neutral-200/90 border border-zinc-300 text-xs font-medium text-zinc-800 max-w-full">
          <GraduationCap className="w-3.5 h-3.5 text-zinc-700 shrink-0" />
          <span className="truncate">
            {profileData.currentProgramme} · {profileData.institution}
          </span>
        </div>

        <h1 className="text-[26px] leading-[1.18] sm:text-3xl md:text-4xl font-medium tracking-tight text-zinc-900 max-w-3xl text-balance">
          {profileData.name} — {profileData.headline}
        </h1>

        <p className="text-[15px] sm:text-base text-gray-700 max-w-2xl leading-[1.65]">
          {profileData.homepageIntro}
        </p>

        <div className="text-[15px] sm:text-base text-zinc-800 leading-[1.65] space-y-3.5 md:space-y-4 max-w-2xl">
          <p>
            My experience spans digital campaign support, lead generation,
            audience research, SEO-related activities, marketing performance
            analysis, startup initiatives, and academic business projects across{' '}
            <button
              onClick={() => onNavigate('/internships')}
              className="underline underline-offset-2 hover:bg-gray-200 hover:text-gray-900 rounded px-0.5 transition-colors cursor-pointer font-medium"
            >
              Eco Fast Agri Solutions
            </button>
            ,{' '}
            <button
              onClick={() => onNavigate('/internships')}
              className="underline underline-offset-2 hover:bg-gray-200 hover:text-gray-900 rounded px-0.5 transition-colors cursor-pointer font-medium"
            >
              GPC Agrochemicals
            </button>
            , and{' '}
            <button
              onClick={() => onNavigate('/internships')}
              className="underline underline-offset-2 hover:bg-gray-200 hover:text-gray-900 rounded px-0.5 transition-colors cursor-pointer font-medium"
            >
              One India Organic
            </button>
            .
          </p>
          <p>
            I am particularly interested in combining marketing insights,
            data-driven decision-making, and strategic problem-solving to address
            business challenges and identify growth opportunities—from corporate
            financial evaluation in{' '}
            <button
              onClick={() =>
                onNavigate('/projects/nestle-india-financial-business-analysis')
              }
              className="underline underline-offset-2 hover:bg-gray-200 hover:text-gray-900 rounded px-0.5 cursor-pointer font-medium"
            >
              Nestlé India Limited
            </button>{' '}
            to consumer research in{' '}
            <button
              onClick={() =>
                onNavigate('/projects/artha-financial-behaviour-savings-app')
              }
              className="underline underline-offset-2 hover:bg-gray-200 hover:text-gray-900 rounded px-0.5 cursor-pointer font-medium"
            >
              Artha
            </button>
            .
          </p>
        </div>

        {/* Recruiter & Executive Highlights Grid */}
        {profileData.recruiterHighlights && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 pt-2">
            {profileData.recruiterHighlights.map((item, idx) => (
              <div
                key={idx}
                className="p-3 sm:p-3.5 rounded-xl bg-neutral-200/80 border border-zinc-300/80 hover:border-zinc-700 transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-zinc-500 block truncate">
                    {item.label}
                  </span>
                  <span className="text-sm sm:text-[15px] font-bold text-zinc-900 mt-0.5 block leading-snug">
                    {item.metric}
                  </span>
                </div>
                <p className="text-xs text-zinc-600 mt-1.5 leading-snug">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* 1-Click Fast Actions for Recruiters & Hiring Managers */}
        <div className="flex flex-wrap items-center gap-2.5 pt-1">
          <button
            onClick={onOpenResume}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 rounded-md transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 shrink-0" />
            <span>Resume & Profile</span>
          </button>

          <button
            onClick={() => onNavigate('/projects')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] text-xs font-semibold text-zinc-900 bg-white border border-zinc-300 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
          >
            <span>Explore Case Studies</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </button>

          <a
            href={`mailto:${contactData.email}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] text-xs font-semibold text-zinc-900 bg-white border border-zinc-300 hover:bg-gray-100 rounded-md transition-colors"
          >
            <Mail className="w-3.5 h-3.5 shrink-0" />
            <span>Email</span>
          </a>

          {contactData.linkedin && (
            <a
              href={contactData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[40px] text-xs font-medium text-zinc-700 bg-white/80 border border-zinc-300 hover:text-black hover:bg-white rounded-md transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5 shrink-0" />
              <span>LinkedIn</span>
              <ExternalLink className="w-3 h-3 text-zinc-400 shrink-0" />
            </a>
          )}
        </div>
      </div>

      {/* Directory List matching amankumar.ai home list */}
      <section className="space-y-2">
        <div className="flex items-center justify-between pb-1">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Selected Work & Credentials
          </h2>
          <span className="text-xs text-zinc-400">
            {directoryRows.length} Items
          </span>
        </div>
        <ul className="divide-y divide-zinc-300/70">
          {directoryRows.map((row) => (
            <li key={row.title}>
              <button
                onClick={() => onNavigate(row.path)}
                className="w-full text-left flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 py-3.5 sm:py-3 -mx-2 px-2 rounded text-[15px] sm:text-sm hover:bg-gray-200/70 active:bg-gray-200 transition-colors cursor-pointer group"
              >
                <div className="sm:w-56 sm:flex-shrink-0">
                  <span className="font-semibold text-zinc-900 group-hover:underline block leading-snug">
                    {row.title}
                  </span>
                  {row.badge && (
                    <span className="inline-block mt-0.5 text-[10.5px] font-medium text-zinc-700 bg-zinc-200/90 border border-zinc-300/70 px-1.5 py-0.5 rounded">
                      {row.badge}
                    </span>
                  )}
                </div>
                <span className="text-[13.5px] sm:text-sm text-gray-600 leading-relaxed group-hover:text-zinc-900 transition-colors">
                  {row.description}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA Row matching amankumar.ai */}
      <section className="space-y-3.5">
        <p className="text-[15px] sm:text-base text-zinc-800 leading-relaxed">
          If you’re recruiting for MBA internship opportunities, digital and
          performance marketing roles, business strategy projects, or academic
          collaborations, I’d love to connect.
        </p>
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2.5 sm:gap-3 text-sm">
          <button
            onClick={() => onNavigate('/projects')}
            className="col-span-2 sm:col-span-1 px-4 py-2.5 min-h-[42px] rounded-md bg-zinc-900 text-white hover:opacity-90 transition-opacity font-medium cursor-pointer text-center"
          >
            Explore My Work
          </button>

          <button
            onClick={() => onNavigate('/contact')}
            className="px-3.5 py-2.5 min-h-[42px] rounded-md border border-gray-300 bg-white/80 hover:bg-gray-100 text-zinc-900 transition-colors font-medium cursor-pointer text-center"
          >
            Get in Touch
          </button>

          <button
            onClick={onOpenResume}
            className="px-3.5 py-2.5 min-h-[42px] rounded-md border border-gray-300 bg-white/80 hover:bg-gray-100 text-zinc-900 transition-colors font-medium inline-flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Resume & Profile</span>
          </button>

          <a
            href={`mailto:${contactData.email}`}
            className="px-3.5 py-2.5 min-h-[42px] rounded-md border border-gray-300 bg-white/80 hover:bg-gray-100 text-zinc-900 transition-colors font-medium inline-flex items-center justify-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5 shrink-0" />
            <span>Email</span>
          </a>
        </div>
      </section>

      {/* LinkedIn Profile Card */}
      <div className="pt-2">
        <a
          href={contactData.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="group block p-4 sm:p-5 rounded-xl bg-neutral-200/80 border border-zinc-300/80 hover:border-zinc-700 transition-all hover:shadow-xs"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-[#0A66C2] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Linkedin className="w-5 h-5 fill-current" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm sm:text-[15px] font-semibold text-zinc-900 group-hover:text-blue-700 transition-colors flex items-center gap-1.5">
                  <span>Akash Kumar on LinkedIn</span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-blue-600 transition-colors" />
                </h3>
                <p className="text-xs text-zinc-600 mt-0.5 leading-relaxed">
                  Open to MBA Summer Internships, Digital & Performance Marketing, and Business Strategy opportunities.
                </p>
              </div>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-zinc-700 group-hover:text-zinc-900 shrink-0">
              <span>View Profile</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </a>
      </div>

      {/* Featured Highlight Card matching amankumar.ai bottom "Check this out" card */}
      <div className="mt-6 md:mt-8">
        <div
          onClick={() => onNavigate(`/projects/${featuredProject.slug}`)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onNavigate(`/projects/${featuredProject.slug}`);
            }
          }}
          className="cursor-pointer group active:scale-[0.99] transition-transform"
        >
          <div className="rounded-xl bg-neutral-200 border border-zinc-300 hover:border-zinc-600 transition-colors overflow-hidden shadow-sm hover:shadow-md">
            <div className="flex flex-col sm:flex-row">
              <div className="relative w-full sm:w-48 sm:h-auto flex-shrink-0 p-2 sm:p-2.5 flex items-center">
                <ProjectCoverBanner project={featuredProject} size="card" />
              </div>
              <div className="flex-1 p-3.5 sm:p-4 md:p-5 flex flex-col justify-between min-h-0 sm:min-h-[140px]">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] sm:text-[10px] font-semibold text-zinc-600 uppercase tracking-wider">
                      Featured Academic Project · {featuredProject.keyTool}
                    </span>
                  </div>
                  <h2 className="text-[17px] sm:text-lg md:text-xl font-bold text-zinc-900 line-clamp-2 group-hover:text-black transition-colors leading-tight">
                    {featuredProject.title}
                  </h2>
                  <p className="text-[13.5px] sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
                    {featuredProject.summary}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs sm:text-sm text-zinc-700 mt-3 group-hover:text-zinc-900 transition-colors pt-2.5 border-t border-zinc-300 sm:border-0 sm:pt-0 font-medium sm:font-normal">
                  <span>View project details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
