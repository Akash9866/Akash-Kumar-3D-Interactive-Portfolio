import React from 'react';
import { RoutePath } from '../router';
import { profileData } from '../data/profile';
import { projectsData } from '../data/projects';
import { contactData } from '../data/contact';
import { ProjectCoverBanner } from '../components/ProjectCard';
import { ArrowRight, Linkedin, Download, GraduationCap } from 'lucide-react';

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
    description: string;
    path: RoutePath;
  }[] = [
    {
      title: 'Nestlé India Analysis',
      description:
        'Group academic financial & business evaluation using Bloomberg Terminal at WeSchool.',
      path: '/projects/nestle-india-financial-business-analysis',
    },
    {
      title: 'Mumbai Cleanliness',
      description:
        'Social innovation & urban waste management research (“How may we make Mumbai the cleanest city in India?”).',
      path: '/projects/mumbai-cleanliness-waste-management',
    },
    {
      title: 'Artha — Savings App',
      description:
        'Fintech concept & behavioural savings research backed by ~200 survey responses and interviews.',
      path: '/projects/artha-financial-behaviour-savings-app',
    },
    {
      title: 'VetCureKart (Venture)',
      description:
        'Animal-medicines accessibility venture (Genesis Startup Programme & IIM Kashipur finalist) inside Projects.',
      path: '/projects/vetcurekart-animal-healthcare-venture',
    },
    {
      title: 'All Projects',
      description:
        'Academic, business design & startup projects including Nestlé India, Mumbai cleanliness, Artha, DP’s Cafe & VetCureKart.',
      path: '/projects',
    },
    {
      title: 'Pensieve (Research)',
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
      description:
        'Eco Fast Agri Solutions, GPC Agrochemicals, and One India Organic digital marketing roles.',
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
      </div>

      {/* Directory List matching amankumar.ai home list */}
      <section>
        <ul className="divide-y divide-zinc-300/70">
          {directoryRows.map((row) => (
            <li key={row.title}>
              <button
                onClick={() => onNavigate(row.path)}
                className="w-full text-left flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 py-3.5 sm:py-3 -mx-2 px-2 rounded text-[15px] sm:text-sm hover:bg-gray-200/70 active:bg-gray-200 transition-colors cursor-pointer"
              >
                <span className="font-medium text-zinc-900 sm:w-48 sm:flex-shrink-0">
                  {row.title}
                </span>
                <span className="text-[13.5px] sm:text-sm text-gray-600 leading-relaxed">
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
        </div>
      </section>

      {/* Connect on LinkedIn Card matching amankumar.ai social card */}
      <div className="my-4">
        {contactData.linkedin ? (
          <a
            href={contactData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer block"
          >
            <div className="flex flex-row items-center gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white shadow-sm hover:shadow-md active:shadow-inner transition-all duration-300 group w-full">
              <div className="flex-shrink-0 p-2.5 sm:p-2 rounded-lg bg-zinc-900 text-white">
                <Linkedin className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 leading-tight">
                  Connect with me on LinkedIn
                </p>
                <p className="text-xs text-zinc-500 mt-1 line-clamp-2 leading-snug">
                  {contactData.availability}
                </p>
              </div>
              <div className="flex-shrink-0">
                <span className="inline-flex items-center px-3 py-1.5 sm:py-1 bg-black text-white rounded-full text-xs font-medium group-hover:scale-105 group-active:scale-95 transition-transform">
                  Connect
                </span>
              </div>
            </div>
          </a>
        ) : (
          <button
            type="button"
            onClick={() => onNavigate('/contact')}
            className="cursor-pointer block w-full text-left"
          >
            <div className="flex flex-row items-center gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white shadow-sm hover:shadow-md active:shadow-inner transition-all duration-300 group w-full">
              <div className="flex-shrink-0 p-2.5 sm:p-2 rounded-lg bg-zinc-900 text-white">
                <Linkedin className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 leading-tight">
                  Connect with me on LinkedIn
                </p>
                <p className="text-xs text-zinc-500 mt-1 line-clamp-2 leading-snug">
                  {contactData.availability}
                </p>
              </div>
              <div className="flex-shrink-0">
                <span className="inline-flex items-center px-3 py-1.5 sm:py-1 bg-black text-white rounded-full text-xs font-medium group-hover:scale-105 group-active:scale-95 transition-transform">
                  Connect
                </span>
              </div>
            </div>
          </button>
        )}
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
