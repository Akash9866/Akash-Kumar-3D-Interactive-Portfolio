import React, { useState } from 'react';
import { RoutePath } from '../router';
import { profileData } from '../data/profile';
import { projectsData } from '../data/projects';
import { researchData } from '../data/research';
import { ResumeModal } from '../components/ResumeModal';
import { ResponsiveAvatar } from '../components/ResponsiveAvatar';

interface AboutPageProps {
  onNavigate: (path: RoutePath) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  return (
    <div className="mx-auto relative">
      <div className="relative z-10 space-y-6 md:space-y-8 text-zinc-900">
        {/* Top Header + Reserved Profile Photograph Slot (per Section 15) */}
        <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 border-b border-zinc-300/80 pb-6">
          <div className="space-y-2">
            <h1 className="text-[28px] leading-[1.15] sm:text-4xl md:text-5xl font-medium tracking-tight text-zinc-900">
              {profileData.name}
            </h1>
            <p className="text-sm font-medium text-zinc-700">
              {profileData.headline}
            </p>
            <p className="text-[13px] sm:text-xs text-zinc-600 leading-relaxed">
              {profileData.currentProgramme} · {profileData.institutionFull} ({profileData.batch} · Current CGPA: 8/10)
            </p>
            <p className="text-[13px] sm:text-xs text-zinc-500">
              {profileData.previousQualification} · {profileData.undergraduateInstitution} (July 2021 – July 2025 · CGPA: 7.84/10)
            </p>
          </div>

          {/* Profile Monogram / Portrait */}
          <ResponsiveAvatar
            size="md"
            priority={true}
            className="rounded-xl shadow-xs"
          />
        </div>

        {/* Academic and Professional Journey (Section 02) */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-semibold text-zinc-900">
            My Academic & Professional Journey
          </h2>
          <div className="space-y-3.5 text-[15px] sm:text-base text-zinc-800 leading-[1.65]">
            {profileData.bio.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </section>

        {/* Now Section */}
        <section className="space-y-1.5">
          <h2 className="text-lg sm:text-xl font-semibold text-zinc-900">
            Now
            <span className="ml-2 text-xs font-normal text-gray-500">
              {profileData.nowSummary.date}
            </span>
          </h2>
          <p className="text-[15px] sm:text-base text-zinc-700 leading-[1.65]">
            {profileData.nowSummary.content}
          </p>
        </section>

        {/* Professional Interests (Section 02 — 5 Pillars) */}
        <section className="space-y-3 pt-1">
          <h2 className="text-lg sm:text-xl font-semibold text-zinc-900">
            What I Focus On
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {profileData.keyCompetencies.map((comp) => (
              <div
                key={comp.title}
                className="p-4 rounded-xl bg-neutral-200/80 border border-zinc-300/90 space-y-1.5"
              >
                <h3 className="text-[15px] sm:text-sm font-semibold text-zinc-900">
                  {comp.title}
                </h3>
                <p className="text-[13.5px] sm:text-xs text-zinc-600 leading-relaxed">
                  {comp.description}
                </p>
                <p className="text-xs sm:text-[11px] text-zinc-500 pt-1">
                  {comp.skills.join(' · ')}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills & Exposure Categories (Section 11) */}
        <section className="space-y-3 pt-1">
          <h2 className="text-lg sm:text-xl font-semibold text-zinc-900">
            My Skills & Practical Exposure
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {profileData.skillsExposure.map((group) => (
              <div
                key={group.category}
                className="p-4 rounded-xl bg-white/80 border border-zinc-300 space-y-2.5"
              >
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-800">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs sm:text-[11px] bg-neutral-200/90 text-zinc-800 px-2.5 py-1 sm:px-2 sm:py-0.5 rounded border border-zinc-300/80"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Academic Projects Section */}
        <section className="space-y-2.5">
          <h2 className="text-lg sm:text-xl font-semibold text-zinc-900">
            Projects I’ve Worked On
          </h2>
          <div className="text-[15px] sm:text-base text-zinc-700 leading-[1.65] space-y-3">
            {projectsData.map((proj) => (
              <p key={proj.id}>
                <button
                  onClick={() => onNavigate(`/projects/${proj.slug}`)}
                  className="font-medium text-zinc-900 underline underline-offset-2 hover:bg-gray-200 rounded px-0.5 cursor-pointer text-left"
                >
                  {proj.title}
                </button>{' '}
                — {proj.tagline}
              </p>
            ))}

            <p className="pt-1 leading-loose">
              Explore more:{' '}
              <button
                onClick={() => onNavigate('/education')}
                className="underline underline-offset-2 text-zinc-900 hover:bg-gray-200 rounded px-0.5 cursor-pointer"
              >
                Education
              </button>{' '}
              ·{' '}
              <button
                onClick={() => onNavigate('/leadership')}
                className="underline underline-offset-2 text-zinc-900 hover:bg-gray-200 rounded px-0.5 cursor-pointer"
              >
                Leadership Experience
              </button>{' '}
              ·{' '}
              <button
                onClick={() => onNavigate('/certifications')}
                className="underline underline-offset-2 text-zinc-900 hover:bg-gray-200 rounded px-0.5 cursor-pointer"
              >
                Certifications
              </button>{' '}
              ·{' '}
              <button
                onClick={() => onNavigate('/projects')}
                className="underline underline-offset-2 text-zinc-900 hover:bg-gray-200 rounded px-0.5 cursor-pointer"
              >
                All Projects
              </button>{' '}
              ·{' '}
              <button
                onClick={() => onNavigate('/internships')}
                className="underline underline-offset-2 text-zinc-900 hover:bg-gray-200 rounded px-0.5 cursor-pointer"
              >
                Internships
              </button>{' '}
              ·{' '}
              <button
                onClick={() => onNavigate('/projects/vetcurekart-animal-healthcare-venture')}
                className="underline underline-offset-2 text-zinc-900 hover:bg-gray-200 rounded px-0.5 cursor-pointer"
              >
                VetCureKart
              </button>
            </p>
          </div>
        </section>

        {/* Research & Publications */}
        <section className="space-y-1.5">
          <h2 className="text-lg sm:text-xl font-semibold text-zinc-900">
            My Research & Conference Proceedings
          </h2>
          <p className="text-[15px] sm:text-base text-zinc-700 leading-[1.65]">
            My agricultural and experimental research contributions include:{' '}
            {researchData.map((res, idx) => (
              <React.Fragment key={res.id}>
                <button
                  onClick={() => onNavigate('/research')}
                  className="underline underline-offset-2 text-zinc-900 hover:bg-gray-200 rounded px-0.5 cursor-pointer"
                >
                  {res.title}
                </button>
                {idx < researchData.length - 1 ? ', and ' : '. '}
              </React.Fragment>
            ))}
            <button
              onClick={() => onNavigate('/research')}
              className="underline underline-offset-2 text-zinc-900 hover:bg-gray-200 rounded px-0.5 cursor-pointer"
            >
              View in Pensieve →
            </button>
          </p>
        </section>

        {/* Leadership & Community Engagement */}
        <section className="space-y-1.5">
          <h2 className="text-lg sm:text-xl font-semibold text-zinc-900">
            Leadership, Sports & Volunteering
          </h2>
          <p className="text-[15px] sm:text-base text-zinc-700 leading-[1.65]">
            {profileData.offScreen}
          </p>
        </section>

        {/* Contact Action Row */}
        <section className="space-y-3 pt-2">
          <p className="text-[15px] sm:text-base text-zinc-800 leading-relaxed">
            I am always open to conversations about MBA internships, digital and
            performance marketing roles, business strategy projects, and
            research collaborations.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('/contact')}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-zinc-900 text-white hover:bg-zinc-800 min-h-[42px] px-4 py-2 cursor-pointer"
            >
              Get in touch
            </button>
            <a
              href="/assets/documents/Akash_Kumar_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-zinc-300 bg-white hover:bg-gray-100 text-zinc-900 min-h-[42px] px-4 py-2 cursor-pointer"
            >
              Resume (PDF)
            </a>
          </div>
        </section>
      </div>

      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </div>
  );
};
