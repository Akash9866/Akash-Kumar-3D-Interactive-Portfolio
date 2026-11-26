import React, { useEffect } from 'react';
import { X, Printer, FileText } from 'lucide-react';

interface SwachhMumbaiFullStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const StudyTable: React.FC<{
  headers: string[];
  rows: (string | React.ReactNode)[][];
}> = ({ headers, rows }) => (
  <div className="overflow-x-auto rounded-lg border border-zinc-200 my-4 bg-white">
    <table className="w-full text-left border-collapse text-xs sm:text-sm">
      <thead>
        <tr className="bg-zinc-900 text-white">
          {headers.map((h, i) => (
            <th
              key={i}
              className="px-2.5 py-2 sm:px-3.5 sm:py-2.5 font-semibold tracking-wide whitespace-nowrap text-left"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-zinc-200">
        {rows.map((row, rIdx) => (
          <tr
            key={rIdx}
            className={rIdx % 2 === 0 ? 'bg-white' : 'bg-zinc-50/70'}
          >
            {row.map((cell, cIdx) => (
              <td
                key={cIdx}
                className={`px-2.5 py-2 sm:px-3.5 sm:py-2.5 text-zinc-700 align-top ${
                  cIdx === 0 ? 'font-medium text-zinc-900' : ''
                }`}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const EmeraldCallout: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="my-4 rounded-lg border border-emerald-200 bg-emerald-50/70 p-4 text-[13.5px] sm:text-sm text-zinc-800 leading-relaxed">
    <p className="font-semibold uppercase text-xs tracking-wider text-emerald-800 mb-1">
      {title}
    </p>
    <p className="text-zinc-700">{children}</p>
  </div>
);

const BlueCallout: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="my-4 rounded-lg border border-blue-200 bg-blue-50/60 p-4 text-[13.5px] sm:text-sm text-zinc-800 leading-relaxed">
    <p className="font-semibold uppercase text-xs tracking-wider text-blue-800 mb-1">
      {title}
    </p>
    <p className="text-zinc-700">{children}</p>
  </div>
);

export const SwachhMumbaiFullStudyModal: React.FC<SwachhMumbaiFullStudyModalProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-[2px] animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="swachh-mumbai-study-title"
    >
      <div
        className="relative w-full max-w-4xl bg-white sm:border sm:border-zinc-300 rounded-none sm:rounded-xl shadow-2xl text-zinc-900 h-[100dvh] sm:h-auto sm:max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Top Document Bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-2 sm:gap-3 px-4 sm:px-7 py-3 sm:py-3.5 bg-zinc-50 border-b border-zinc-200 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-md bg-emerald-950 text-emerald-300 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-zinc-500 truncate">
                CIVIC INNOVATION • DESIGN THINKING • PRODUCT PROTOTYPING
              </p>
              <p className="text-xs sm:text-sm font-semibold text-zinc-900 truncate">
                SwachhMumbai — Full Detailed Study
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 min-h-[36px] sm:min-h-0 rounded-md border border-zinc-300 bg-white hover:bg-zinc-100 text-xs font-medium text-zinc-800 transition-colors cursor-pointer"
              aria-label="Print or Save PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="sm:hidden">PDF</span>
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex items-center justify-center w-9 h-9 text-zinc-600 hover:text-zinc-900 rounded-lg hover:bg-zinc-200/70 transition-colors cursor-pointer"
              aria-label="Close full detailed study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Body */}
        <div className="overflow-y-auto px-4 sm:px-8 md:px-10 py-6 sm:py-8 space-y-8 text-[14.5px] sm:text-[15px] leading-[1.7] text-zinc-800">
          {/* Document Cover Header */}
          <header className="space-y-3 border-b-2 border-emerald-600 pb-6">
            <p className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-semibold">
              CIVIC INNOVATION • DESIGN THINKING • PRODUCT PROTOTYPING
            </p>
            <h1
              id="swachh-mumbai-study-title"
              className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-900"
            >
              SWACHH MUMBAI
            </h1>
            <p className="text-base sm:text-xl font-bold text-blue-800">
              Integrated Cleanliness Response System
            </p>
            <p className="text-base sm:text-lg font-semibold text-zinc-900">
              “How may we make Mumbai the cleanest city in India?”
            </p>
            <p className="text-sm text-zinc-600">
              A group-developed civic-sanitation concept that connects citizen reporting, municipal prioritisation, field response and evidence-backed resolution through one continuous cleanliness loop.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3">
              <div className="rounded-lg bg-zinc-50 border border-zinc-200 p-3">
                <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                  PROJECT
                </p>
                <p className="text-xs sm:text-[13px] font-semibold text-zinc-900 mt-0.5">
                  SwachhMumbai – Integrated Cleanliness Response System
                </p>
              </div>
              <div className="rounded-lg bg-zinc-50 border border-zinc-200 p-3">
                <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                  PROJECT TYPE
                </p>
                <p className="text-xs sm:text-[13px] font-semibold text-zinc-900 mt-0.5">
                  Group academic project | Design thinking and prototype development
                </p>
              </div>
              <div className="rounded-lg bg-zinc-50 border border-zinc-200 p-3">
                <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                  INSTITUTION
                </p>
                <p className="text-xs sm:text-[13px] font-semibold text-zinc-900 mt-0.5">
                  WeSchool, Mumbai | PGDM Business Design
                </p>
              </div>
              <div className="rounded-lg bg-zinc-50 border border-zinc-200 p-3">
                <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                  CONTRIBUTOR
                </p>
                <p className="text-xs sm:text-[13px] font-semibold text-zinc-900 mt-0.5">
                  Akash Kumar | BD03
                </p>
              </div>
            </div>

            <EmeraldCallout title="The Central Idea">
              SwachhMumbai is not designed as just another complaint app. It is a proposed connected system in which a cleanliness issue can be discovered, reported, prioritised, assigned, resolved, evidenced, verified and used to improve locality-level understanding.
            </EmeraldCallout>

            <p className="text-xs text-zinc-500 italic">
              Portfolio case study | Prepared from the project research presentation, final prototype brief and three-iteration prototype-testing report.
            </p>
          </header>

          {/* 01 Executive Summary */}
          <section className="space-y-3">
            <p className="text-[11px] font-mono uppercase tracking-wider text-emerald-700 font-semibold">
              01 | PROJECT OVERVIEW
            </p>
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900">
              Executive Summary
            </h2>
            <p className="text-sm text-zinc-600 italic">
              A city-level cleanliness problem reframed as a connected service and operating-system challenge.
            </p>
            <p>
              SwachhMumbai emerged from the question, “How may we make Mumbai the cleanest city in India?” The project began by examining waste segregation and household disposal behaviour, but research and feedback showed that the challenge was wider than any single point in the waste chain. Recurring litter, inconvenient disposal infrastructure, mixed waste, peak-hour waste spikes, route delays and inconsistent monitoring appeared as connected issues involving citizens, sanitation workers, waste collectors and municipal operations.
            </p>
            <p>
              The project therefore evolved from a household-level segregation idea into a city-level cleanliness response system. Its final concept connects three primary user groups: citizens who identify and report issues, field workers who act on assigned tasks, and BMC or municipal personnel who monitor patterns and coordinate responses.
            </p>
            <p>
              The solution was developed through three prototype iterations. The first version tested the basic report–prioritise–respond–verify workflow. The second expanded the experience into a connected civic platform with a social feed, locality map, nearby facilities and citizen rewards. The third introduced locality intelligence, hotspot-risk indicators, explanatory score views, meaningful participation missions, evidence-backed verification and clearer field-worker and municipal operations views.
            </p>

            <EmeraldCallout title="Project in One Sentence">
              A proposed civic-sanitation ecosystem that connects people, places, evidence and municipal action so that cleanliness issues can be seen earlier, prioritised more clearly, resolved with accountability and used to inform ongoing improvement.
            </EmeraldCallout>

            <StudyTable
              headers={['Project at a glance', 'Details']}
              rows={[
                [
                  'Core problem',
                  'Cleanliness outcomes are affected by gaps across segregation, disposal convenience, collection response, monitoring and accountability.',
                ],
                [
                  'Primary users',
                  'BMC / municipal operations and contract cleaning or waste-collection teams.',
                ],
                [
                  'Secondary users',
                  'Citizens, market vendors, restaurants and other local waste generators.',
                ],
                [
                  'Prototype form',
                  'Three connected artefacts: a Smart Disposal Station concept, a clickable citizen application and a BMC / cleaning-team dashboard.',
                ],
                [
                  'Development',
                  'Three iterative versions: Clean 360, Mumbai Mitra and final SwachhMumbai.',
                ],
                [
                  'Testing record',
                  '36 participants across three in-person prototype-testing rounds.',
                ],
              ]}
            />
            <p className="text-xs text-zinc-500 italic">
              The work is an academic prototype; city-wide deployment and operational impact have not been established.
            </p>
          </section>

          {/* 02 Project Identity and Naming */}
          <section className="space-y-3">
            <p className="text-[11px] font-mono uppercase tracking-wider text-emerald-700 font-semibold">
              02 | PROJECT IDENTITY
            </p>
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 border-b border-zinc-200 pb-2">
              Project Identity and Naming
            </h2>
            <p className="text-sm text-zinc-600 italic">
              One project with evolving working names and prototype labels.
            </p>
            <p>
              SwachhMumbai is the final project name and the final name of the prototype application. Earlier working names included CleanLoop and SwachhSetu. Both referred to the same underlying initiative rather than separate projects: CleanLoop conveyed the idea of a continuous cleanliness cycle, while SwachhSetu conveyed the bridge between citizens, sanitation teams and municipal authorities. The final name SwachhMumbai makes the city-level ambition explicit.
            </p>
            <p>
              During prototype development, the product also passed through three version labels: Clean 360, Mumbai Mitra and SwachhMumbai. These labels describe the stages of one evolving solution, not separate applications.
            </p>
            <StudyTable
              headers={['Name / label', 'Meaning in the project journey']}
              rows={[
                [
                  'CleanLoop',
                  'An early working name emphasising the connected cycle from reporting and response through verification.',
                ],
                [
                  'SwachhSetu',
                  'An early working name emphasising a bridge between citizens, field workers and municipal bodies.',
                ],
                [
                  'Clean 360 / Clean Mumbai 360',
                  'First prototype iteration, focused on establishing the basic functional workflow.',
                ],
                [
                  'Mumbai Mitra',
                  'Second iteration, expanding the product into a connected civic platform for discovery, locality visibility and participation.',
                ],
                [
                  'SwachhMumbai',
                  'Final project identity and final prototype app name; an integrated cleanliness response system for Mumbai.',
                ],
              ]}
            />
          </section>

          {/* 03 Context and Diagnosis */}
          <section className="space-y-3">
            <p className="text-[11px] font-mono uppercase tracking-wider text-emerald-700 font-semibold">
              03 | CONTEXT AND DIAGNOSIS
            </p>
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 border-b border-zinc-200 pb-2">
              The Problem: Collection Is Not the Whole System
            </h2>
            <p className="text-sm text-zinc-600 italic">
              The project looked beyond visible street cleaning to the full journey of waste and cleanliness management.
            </p>
            <p>
              The secondary research framed Mumbai’s challenge as a gap between the scale of municipal effort and the cleanliness outcomes achieved. The research materials described established collection and cleaning operations while identifying weaknesses further downstream in source segregation, scientific processing and legacy-waste remediation.
            </p>
            <p>
              The team used the waste journey to understand where pressure could accumulate: households and businesses generate waste; collection and transport move it through the system; segregation determines how well materials can be separated; processing and recovery determine what can be reused or treated; and residual waste contributes to landfill and legacy-waste burdens.
            </p>
            <StudyTable
              headers={['Research indicator in the team material', 'Figure reported', 'Context / qualification']}
              rows={[
                [
                  'Mumbai Swachh Survekshan position',
                  '33rd of 40; score 7,419 / 12,500',
                  'As stated in the Group 4 empathy presentation for Swachh Survekshan 2024–25.',
                ],
                [
                  'Garbage-Free City rating',
                  '0 stars',
                  'As stated in the Group 4 empathy presentation.',
                ],
                [
                  'Municipal solid waste generated',
                  'Approximately 6,300 MT per day',
                  'Rounded estimate in the Group 4 presentation; later secondary research material gives a range of approximately 6,330–7,000 MT/day.',
                ],
                [
                  'Wet waste share',
                  '72.60%',
                  'Figure shown in the Group 4 presentation.',
                ],
                [
                  'Door-to-door collection',
                  '97%',
                  'Attributed in the presentation to Swachh Survekshan 2023.',
                ],
                [
                  'Source segregation',
                  '65%',
                  'Attributed in the presentation to Swachh Survekshan 2023.',
                ],
                [
                  'Waste processed',
                  '49%',
                  'Attributed in the presentation to Swachh Survekshan 2023.',
                ],
              ]}
            />
            <p className="text-xs text-zinc-500 italic">
              A later secondary-research compilation also compared Mumbai with Navi Mumbai and Indore, and presented additional indicators on cleanliness of residential and market areas, water bodies, public toilets, legacy dumpsite remediation and municipal spending. These figures were drawn from different cited reports and periods; they should not be treated as a single contemporaneous dataset.
            </p>

            <h3 className="text-base font-semibold text-blue-800 pt-1">
              The diagnostic insight
            </h3>
            <p>
              The core insight was that high collection coverage does not by itself guarantee source segregation, scientific processing or sustained cleanliness. The system needed to connect front-end behaviour and disposal with downstream response, monitoring and accountability.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-700">
              <li><strong className="text-zinc-900">Recurring litter:</strong> areas could become dirty again within a short period after cleaning.</li>
              <li><strong className="text-zinc-900">Disposal convenience:</strong> citizens reported that bins were not always available or conveniently located.</li>
              <li><strong className="text-zinc-900">Mixed waste:</strong> collectors described sorting difficulties when waste arrived mixed; recyclers noted the lower recovery value of contaminated material.</li>
              <li><strong className="text-zinc-900">Peak-hour pressure:</strong> markets and restaurants could experience time-specific waste spikes that fixed collection schedules might not fully address.</li>
              <li><strong className="text-zinc-900">Operational consistency:</strong> route delays and inconsistent monitoring made timely and repeatable response difficult.</li>
            </ul>

            <BlueCallout title="What the Project Changed">
              The project did not conclude that Mumbai simply needed more cleaning. It explored how existing cleanliness and waste-management capacity could be better connected through visibility, prioritisation, response and verification.
            </BlueCallout>
          </section>

          {/* 04 Research and Discovery */}
          <section className="space-y-3">
            <p className="text-[11px] font-mono uppercase tracking-wider text-emerald-700 font-semibold">
              04 | RESEARCH AND DISCOVERY
            </p>
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 border-b border-zinc-200 pb-2">
              Stakeholder Research and Field Insights
            </h2>
            <p className="text-sm text-zinc-600 italic">
              The team mapped the ecosystem before deciding where the intervention should sit.
            </p>
            <p>
              The empathy phase mapped 20 stakeholder categories across government and operations, people and communities, commercial and industrial actors, material recovery and the environment. This helped the team understand cleanliness as an ecosystem involving people who generate waste, people who handle it, institutions that manage it and groups affected by the condition of public spaces.
            </p>
            <StudyTable
              headers={['Stakeholder cluster', 'Categories represented in the mapping']}
              rows={[
                [
                  'Government and operations',
                  'Municipality; cleanliness workers; waste-management systems; independent collectors; transport.',
                ],
                [
                  'People and community',
                  'Citizens; schools; college clubs; religious places; NGOs; media.',
                ],
                [
                  'Commercial and industry',
                  'Markets; local vendors; restaurants; hospitals; factories; construction.',
                ],
                ['Recovery', 'Recyclers.'],
                ['Environment', 'Stray animals; climate.'],
              ]}
            />

            <h3 className="text-base font-semibold text-blue-800 pt-1">
              Primary research
            </h3>
            <p>
              The Group 4 empathy presentation reports 137 stakeholder interviews. Its visible category chart lists citizens and societies (64), market and local vendors (21), restaurants and food trucks (19), cleanliness workers (16), and recyclers (13). These displayed category counts total 133; the presentation does not allocate the remaining four interviews in the visible chart, so no additional category is inferred here.
            </p>
            <StudyTable
              headers={['Category displayed in presentation', 'Count shown']}
              rows={[
                ['Citizens and societies', '64'],
                ['Market and local vendors', '21'],
                ['Restaurants and food trucks', '19'],
                ['Cleanliness workers', '16'],
                ['Recyclers', '13'],
                ['Total displayed categories', '133'],
                ['Headline interview count reported by presentation', '137'],
              ]}
            />

            <h3 className="text-base font-semibold text-blue-800 pt-1">
              What the team heard
            </h3>
            <StudyTable
              headers={[
                'Stakeholder perspective',
                'Research statement recorded in the presentation',
                'What it highlighted',
              ]}
              rows={[
                [
                  'Cleaning worker',
                  '“We clean the area but it becomes dirty again within a few hours.”',
                  'Recurring litter and the limits of one-time cleaning.',
                ],
                [
                  'Citizen',
                  '“There isn’t always a bin nearby.”',
                  'Disposal convenience and infrastructure location.',
                ],
                [
                  'Waste collector',
                  '“Mixed waste makes sorting difficult.”',
                  'Segregation gaps affecting collection and sorting.',
                ],
                [
                  'Recycler',
                  '“Contaminated material has lower recovery value.”',
                  'The effect of contamination on material recovery.',
                ],
                [
                  'NGO',
                  '“Awareness doesn’t always change behaviour.”',
                  'The gap between awareness and sustained action.',
                ],
                [
                  'BMC',
                  '“Maintaining consistency across all areas is difficult.”',
                  'Operational consistency across locations.',
                ],
              ]}
            />

            <h3 className="text-base font-semibold text-blue-800 pt-1">
              Additional field observations and BMC interaction
            </h3>
            <p>
              The team’s secondary and primary research material records a discussion at a BMC office concerning wet and dry waste. The presentation summarises the discussion as approximately 73% wet and 27% dry waste and separately refers to 65% source segregation. The notes also record irregular vehicle access in some slum areas and no financial reward reported for good segregation. These are field-research notes and should not be interpreted as universal conditions across Mumbai.
            </p>
            <p>
              The team also noted that rules, collection infrastructure and penalties already existed, and that MyBMC MARG provided a grievance-reporting and tracking route. This raised a further design question: what value could the proposed system add beyond complaint submission and status tracking?
            </p>
          </section>

          {/* 05 Reframing the Challenge */}
          <section className="space-y-3">
            <p className="text-[11px] font-mono uppercase tracking-wider text-emerald-700 font-semibold">
              05 | REFRAMING THE CHALLENGE
            </p>
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 border-b border-zinc-200 pb-2">
              From Household Segregation to a City-Level System
            </h2>
            <p className="text-sm text-zinc-600 italic">
              A key design decision was to change the problem framing when evidence showed that the initial solution was too narrow.
            </p>
            <p>
              The project initially focused on household-level waste segregation. The working logic was that poor segregation at source contributed to mixed waste and downstream waste-management difficulties. The first solution direction therefore considered how to make wet and dry segregation easier for households.
            </p>
            <p>
              Primary research exposed constraints that made a household-only solution insufficient. The team heard that household disposal could be handled by domestic workers in a rush; residents were unsure how to classify items such as pizza boxes and foil packets; waste that had been separated could be mixed again later; and narrow lanes in some areas created access difficulties for collection vehicles.
            </p>

            <EmeraldCallout title="The Turning-Point Question">
              “Are we trying to clean people’s homes or clean Mumbai?”
            </EmeraldCallout>

            <p>
              The team reframed the challenge from an individual household behaviour problem to a city-level operating-system problem: where waste accumulates, how quickly a response is triggered, how teams are assigned and how resolution is confirmed.
            </p>

            <h3 className="text-base font-semibold text-blue-800 pt-1">
              Final design challenge
            </h3>
            <BlueCallout title="How Might We…">
              Connect citizens, field workers and BMC into one continuous cleanliness loop — where problems are visible early, action is faster, and resolution is verified?
            </BlueCallout>

            <h3 className="text-base font-semibold text-blue-800 pt-1">
              Primary users and their needs
            </h3>
            <StudyTable
              headers={['User group', 'Role in the system', 'Need addressed by the concept']}
              rows={[
                [
                  'Citizens',
                  'Report, track, participate and verify.',
                  'A simple way to report issues, see nearby conditions, track progress and confirm whether action has worked.',
                ],
                [
                  'Field workers / sanitation teams',
                  'Receive tasks, respond and provide proof.',
                  'Clear task details, location, priority, work status and a way to submit resolution evidence.',
                ],
                [
                  'BMC / municipal personnel',
                  'Monitor, prioritise, assign and improve.',
                  'Visibility of reports and hotspots, priority queues, operational context and response status.',
                ],
              ]}
            />

            <h3 className="text-base font-semibold text-blue-800 pt-1">
              Design principles
            </h3>
            <StudyTable
              headers={['Principle', 'Meaning in the project']}
              rows={[
                ['SEE', 'Make cleanliness problems and recurring hotspots visible.'],
                ['PREDICT', 'Identify repeat or emerging hotspots before they worsen.'],
                ['ACT', 'Connect the appropriate BMC team and field worker to the problem.'],
                ['VERIFY', 'Make resolution transparent and citizen-verifiable.'],
                ['PARTICIPATE', 'Give citizens meaningful reasons to contribute beyond submitting complaints.'],
              ]}
            />
          </section>

          {/* 06 Proposed Solution */}
          <section className="space-y-3">
            <p className="text-[11px] font-mono uppercase tracking-wider text-emerald-700 font-semibold">
              06 | PROPOSED SOLUTION
            </p>
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 border-b border-zinc-200 pb-2">
              SwachhMumbai: The Integrated Cleanliness Response System
            </h2>
            <p className="text-sm text-zinc-600 italic">
              A medium-fidelity concept connecting a physical touchpoint, a citizen application and a municipal operating view.
            </p>
            <p>
              The final concept combines digital and physical elements. The purpose is to make it easier to dispose of waste correctly, surface cleanliness issues, identify recurring or time-sensitive hotspots and connect reports to a municipal or field response.
            </p>

            <h3 className="text-base font-semibold text-blue-800 pt-1">
              1. Smart Disposal Station
            </h3>
            <p>
              The physical concept is a three-compartment disposal station with Wet, Dry and Special waste guidance. It was designed as a street-level disposal and reporting touchpoint, with a QR code for overflow reporting and a proposed connection to monitoring signals such as fill level and location.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-700">
              <li>Three clearly identified compartments: Wet, Dry and Special.</li>
              <li>QR-based reporting for overflow or disposal-point issues.</li>
              <li>Proposed fill-level signals and location identification to inform a municipal dashboard.</li>
              <li>Intended flow: bin or station signal → dashboard visibility → priority alert → cleaning-team response.</li>
            </ul>

            <h3 className="text-base font-semibold text-blue-800 pt-2">
              2. SwachhMumbai Citizen Application
            </h3>
            <p>
              The citizen application is the main user-facing digital component. Its early navigation includes Home, Reports, a central reporting action, Map and Profile. It is designed to support both one-time issue reporting and ongoing awareness of local cleanliness conditions.
            </p>
            <StudyTable
              headers={['Citizen feature', 'Purpose']}
              rows={[
                [
                  'Report a Cleanliness Issue / Report Now',
                  'Submit an issue with category, photograph and location details.',
                ],
                ['Track Your Report', 'Follow the progress of an issue after submission.'],
                ['View Nearby Issues', 'See cleanliness issues and activity in the surrounding area.'],
                ['Cleanliness Map / CleanMap', 'Explore locality-level conditions, scores and hotspots.'],
                [
                  'Activity Feed / SwachhFeed',
                  'View citizen reports, field response and before-and-after resolution updates.',
                ],
                [
                  'Nearby',
                  'Discover waste-segregation hubs, recycling points, public toilets, community facilities and ward-related resources.',
                ],
                [
                  'Clean Missions',
                  'Participate in activities such as verification, local improvement and community cleanliness actions.',
                ],
                [
                  'Adopt-a-Spot',
                  'Allow an individual or community to take ongoing ownership of a chosen location.',
                ],
                [
                  'Civic Impact',
                  'Show contributions and verified participation rather than activity alone.',
                ],
              ]}
            />

            <h3 className="text-base font-semibold text-blue-800 pt-2">
              3. BMC and Field-Worker Operations
            </h3>
            <p>
              The municipal and field-worker components provide the operating side of the proposed system. They are intended to turn citizen reports and local signals into an actionable task and visible resolution.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-700">
              <li><strong className="text-zinc-900">BMC view:</strong> active reports, priority hotspots, locality patterns, task queues and operational status.</li>
              <li><strong className="text-zinc-900">Field-worker view:</strong> assigned tasks, issue location, priority context, task acceptance, progress and completion.</li>
              <li><strong className="text-zinc-900">Resolution evidence:</strong> before-and-after photographs or other proof attached to the task.</li>
              <li><strong className="text-zinc-900">Verification:</strong> citizen confirmation or a “Still a Problem” response that can reopen the issue.</li>
            </ul>

            <EmeraldCallout title="The Core Value Proposition">
              SwachhMumbai links citizen observation to municipal action and field evidence. It is designed to make the full response visible, not simply to collect complaints.
            </EmeraldCallout>
          </section>

          {/* 07 Prototype Evolution */}
          <section className="space-y-4">
            <p className="text-[11px] font-mono uppercase tracking-wider text-emerald-700 font-semibold">
              07 | PROTOTYPE EVOLUTION
            </p>
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 border-b border-zinc-200 pb-2">
              Three Iterations, One Continuous Product
            </h2>
            <p className="text-sm text-zinc-600 italic">
              Each version retained the core cleanliness workflow and added a new layer of visibility, connection or intelligence.
            </p>

            {/* Iteration 1 */}
            <div className="space-y-2">
              <h3 className="text-base font-bold text-blue-800">
                Iteration 1 — Clean 360 / Clean Mumbai 360
              </h3>
              <p className="text-sm font-semibold text-emerald-700">
                Focus: establish the basic functional loop.
              </p>
              <p>
                The first prototype tested whether a cleanliness issue could move from observation to municipal action and back to citizen confirmation. It was structured around four stages: Dispose / Report → Detect &amp; Prioritise → Respond → Verify.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-zinc-700">
                <li><strong className="text-zinc-900">Citizen reporting:</strong> issue selection, location detection, photograph attachment, submission and status tracking.</li>
                <li><strong className="text-zinc-900">Resolution verification:</strong> a dedicated screen with “Yes, Resolved” and “Still a Problem” choices; the prototype included logic to reopen an issue when the citizen disagreed with the resolution.</li>
                <li><strong className="text-zinc-900">Smart disposal:</strong> a Wet / Dry / Special station concept with fill-level signals, QR overflow reporting and location identification.</li>
                <li><strong className="text-zinc-900">BMC dashboard:</strong> priority hotspots, active reports, demand signals and recommended actions.</li>
                <li><strong className="text-zinc-900">Cleaning response:</strong> field teams received location, issue and urgency context, then accepted and resolved the task.</li>
              </ul>
              <StudyTable
                headers={['What worked', 'What remained limited']}
                rows={[
                  ['Clear end-to-end operational flow.', 'No public social or community layer.'],
                  ['Visible BMC and field-worker logic.', 'No locality-level cleanliness score.'],
                  ['Physical and digital intervention considered together.', 'Limited discovery beyond reporting.'],
                  ['Citizen verification included in the workflow.', 'Engagement was functional, with little reason to return after one report.'],
                ]}
              />
              <BlueCallout title="Iteration 1 Learning">
                The core report–prioritise–respond–verify mechanism was clear. The next need was to make the platform more connected and useful between individual complaints.
              </BlueCallout>
            </div>

            {/* Iteration 2 */}
            <div className="space-y-2 pt-2">
              <h3 className="text-base font-bold text-blue-800">
                Iteration 2 — Mumbai Mitra
              </h3>
              <p className="text-sm font-semibold text-emerald-700">
                Focus: expand the product into a connected civic platform.
              </p>
              <p>
                The second iteration retained the original operating loop but introduced a more citizen-facing experience. The central question shifted from “Can the system process a complaint?” to “Can people understand what is happening around them, participate and see the condition of their neighbourhood?”
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-zinc-700">
                <li><strong className="text-zinc-900">SwachhFeed:</strong> a visual feed for citizen issues, field-worker resolutions and community activity, including before-and-after posts.</li>
                <li><strong className="text-zinc-900">CleanMap:</strong> a map-oriented view of localities, hotspots and cleanliness performance.</li>
                <li><strong className="text-zinc-900">SwachhScore:</strong> a locality-level score intended to make area performance visible.</li>
                <li><strong className="text-zinc-900">Nearby:</strong> discovery of waste facilities, recycling points, public toilets, community centres, ward offices and vehicle activity as shown in the prototype concept.</li>
                <li><strong className="text-zinc-900">Clean Points and rewards:</strong> an early engagement layer recognising citizen contributions.</li>
                <li><strong className="text-zinc-900">Role-based navigation:</strong> clearer citizen, worker and BMC experiences.</li>
              </ul>
              <p>
                This iteration made the product more useful beyond the moment of submitting a complaint. Users could move between reporting, viewing community activity, exploring locality conditions and discovering nearby civic facilities.
              </p>
              <BlueCallout title="Iteration 2 Learning">
                The platform showed what had happened but did not yet explain why an area was under pressure or anticipate where problems might recur. The rewards model could recognise activity without proving that the activity improved cleanliness.
              </BlueCallout>
            </div>

            {/* Iteration 3 */}
            <div className="space-y-2 pt-2">
              <h3 className="text-base font-bold text-blue-800">
                Iteration 3 — SwachhMumbai
              </h3>
              <p className="text-sm font-semibold text-emerald-700">
                Focus: add locality intelligence, evidence and meaningful participation.
              </p>
              <p>
                The third iteration strengthened the connected platform by making locality conditions more explainable, adding proactive hotspot indicators and improving the operating views for field workers and municipal users.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-zinc-700">
                <li><strong className="text-zinc-900">Mumbai Cleanliness Pulse:</strong> a city-level summary of cleanliness performance and trend.</li>
                <li><strong className="text-zinc-900">Hotspot Risk and Predictive Alerts:</strong> risk indicators in Home, Nearby and the BMC environment.</li>
                <li><strong className="text-zinc-900">Why This Score? / What Changed? / Root Cause:</strong> explanatory locality views rather than a single score alone.</li>
                <li><strong className="text-zinc-900">Clean Missions:</strong> meaningful actions such as verification, community participation and local improvement tasks.</li>
                <li><strong className="text-zinc-900">Adopt-a-Spot:</strong> ongoing ownership of a selected location by individuals or communities.</li>
                <li><strong className="text-zinc-900">Civic Impact:</strong> a view of verified contributions and participation.</li>
                <li><strong className="text-zinc-900">Improved Field Worker mode:</strong> dedicated task queue, dispatch context and worker profile.</li>
                <li><strong className="text-zinc-900">Improved BMC Operations:</strong> priority-ranked report queue, hotspot risk, fleet or compactor context and ward benchmarking.</li>
                <li><strong className="text-zinc-900">Evidence-backed verification:</strong> visible resolution proof before the citizen confirms or reopens an issue.</li>
              </ul>
              <EmeraldCallout title="Iteration 3 Learning">
                The final prototype connects community participation, evidence-backed resolution, locality intelligence and municipal operations. The design direction moves from reactive complaint handling toward a more proactive, visible and participatory cleanliness system.
              </EmeraldCallout>
            </div>
          </section>

          {/* 08 System Workflow */}
          <section className="space-y-3">
            <p className="text-[11px] font-mono uppercase tracking-wider text-emerald-700 font-semibold">
              08 | SYSTEM WORKFLOW
            </p>
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 border-b border-zinc-200 pb-2">
              How the Final SwachhMumbai Loop Works
            </h2>
            <p className="text-sm text-zinc-600 italic">
              A shared case journey connects citizen observation, municipal coordination, field action and public visibility.
            </p>
            <StudyTable
              headers={['Stage', 'What happens', 'Main interface / feature']}
              rows={[
                ['1. Discover', 'A user sees a cleanliness issue, nearby alert or hotspot.', 'Home / Nearby / CleanMap'],
                ['2. Report', 'The user provides issue details, location and a photograph.', 'Report'],
                ['3. Understand', 'The proposed system supports category identification, duplicate detection and priority assessment.', 'Smart detection / Hotspot Risk'],
                ['4. Assign', 'The municipal authority routes the case to an appropriate team.', 'BMC Operations'],
                ['5. Respond', 'A field worker receives the task, navigates to the location and acts.', 'Field Worker'],
                ['6. Prove', 'The response is documented with before-and-after evidence.', 'Resolution / Proof'],
                ['7. Verify', 'The citizen confirms the outcome or reports that the problem remains.', 'Verification'],
                ['8. Publish', 'The resolution becomes visible to the community.', 'SwachhFeed'],
                ['9. Measure', 'Locality and city-level indicators are updated in the concept.', 'SwachhScore / Mumbai Cleanliness Pulse'],
                ['10. Improve', 'Mission, hotspot and root-cause logic informs future action.', 'Clean Missions / Root Cause / Forecast'],
              ]}
            />

            <h3 className="text-base font-semibold text-blue-800 pt-1">
              The role of evidence
            </h3>
            <p>
              Evidence is central to the final response loop. A municipal task being marked “resolved” is not treated as the only signal of success. The prototype makes the field response visible through proof, then gives the citizen an opportunity to confirm the outcome or indicate that the issue remains. This builds on the verification feature already present in the first iteration and makes it more visible in the final user experience.
            </p>

            <h3 className="text-base font-semibold text-blue-800 pt-1">
              Why the three roles need different views
            </h3>
            <StudyTable
              headers={['Citizen view', 'Field-worker view', 'BMC / municipal view']}
              rows={[
                [
                  'Report an issue; see nearby activity; check locality conditions; track and verify.',
                  'Receive an assigned task; understand location and priority; update progress; submit resolution proof.',
                  'Monitor reports and hotspots; prioritise and assign cases; view queue and operational context; review resolution status.',
                ],
              ]}
            />
          </section>

          {/* 09 Prototype Testing */}
          <section className="space-y-3">
            <p className="text-[11px] font-mono uppercase tracking-wider text-emerald-700 font-semibold">
              09 | PROTOTYPE TESTING
            </p>
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 border-b border-zinc-200 pb-2">
              Testing the Three Versions
            </h2>
            <p className="text-sm text-zinc-600 italic">
              The clickable versions were tried in person on a phone with participants from the relevant user groups.
            </p>
            <p>
              The testing record describes three separate rounds, one for each prototype version. The participant counts below relate to prototype testing and are separate from the 137 stakeholder interviews reported in the earlier empathy research.
            </p>
            <StudyTable
              headers={['Prototype version', 'Participant group', 'Participants', 'Testing focus']}
              rows={[
                [
                  'V1 — Clean 360',
                  'Citizens and field workers',
                  '7',
                  'Can a user report an issue and follow it through to verification, and can the response side act on it?',
                ],
                [
                  'V2 — Mumbai Mitra',
                  'Field workers, recyclers and citizens',
                  '18',
                  'Can users understand their area through the feed, map, score and nearby facilities? Does the rewards layer feel useful?',
                ],
                [
                  'V3 — SwachhMumbai',
                  'BMC personnel and field workers',
                  '11',
                  'Can users understand hotspot risk and score explanations, participate in missions, and act on priorities?',
                ],
                [
                  'Total',
                  'Across three versions',
                  '36',
                  'Iterative prototype review and feedback.',
                ],
              ]}
            />

            <h3 className="text-base font-semibold text-blue-800 pt-1">
              Three representative tasks
            </h3>
            <StudyTable
              headers={['Task', 'User', 'Expected journey']}
              rows={[
                [
                  'Report a cleanliness issue',
                  'Citizen',
                  'Choose the issue type, confirm the location, add a photograph and submit; receive a report ID without assistance.',
                ],
                [
                  'Check an area and verify a resolution',
                  'Citizen',
                  'Find the locality score and hotspot on CleanMap, review the resolution and confirm or reject the field-worker response.',
                ],
                [
                  'Act on the highest-priority job',
                  'Field worker / BMC',
                  'Find the highest-priority task or hotspot in the queue or dashboard and move the case through the resolution workflow.',
                ],
              ]}
            />

            <h3 className="text-base font-semibold text-blue-800 pt-1">
              What the testing showed
            </h3>
            <StudyTable
              headers={['Version', 'Qualitative feedback recorded', 'Design response']}
              rows={[
                [
                  'V1 — Clean 360',
                  'No public view of problems or responses; no area score; little reason to return after one report.',
                  'Added a public feed for issues, resolution and community posts; added CleanMap and locality SwachhScore; added Nearby and an engagement layer.',
                ],
                [
                  'V2 — Mumbai Mitra',
                  'The platform showed what had happened but could not explain or predict. Points rewarded activity, not impact.',
                  'Added hotspot risk, predictive signals, “Why this score?” and Cleanliness Pulse; added Clean Missions, Adopt-a-Spot and Civic Impact.',
                ],
                [
                  'V3 — SwachhMumbai',
                  'BMC personnel and field workers asked for a more concrete operating view. Not all suggestions could be built and tested within available time and resources.',
                  'Added a field-worker dispatch queue and a BMC Operations priority queue; retained the core closed-loop response mechanism.',
                ],
              ]}
            />

            <h3 className="text-base font-semibold text-blue-800 pt-1">
              What was not measured
            </h3>
            <p>
              The supplied testing record provides participant counts, the aspects tested, task goals and qualitative observations. It does not provide task-by-task completion rates, error counts, time taken, assistance required or physical-performance measurements. These figures are therefore not reported.
            </p>
          </section>

          {/* 10 Outcomes and Learning */}
          <section className="space-y-3">
            <p className="text-[11px] font-mono uppercase tracking-wider text-emerald-700 font-semibold">
              10 | OUTCOMES AND LEARNING
            </p>
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 border-b border-zinc-200 pb-2">
              What the Project Demonstrated
            </h2>
            <p className="text-sm text-zinc-600 italic">
              The strongest result is the evolution of the problem framing and the prototype logic, not an unmeasured city-level outcome.
            </p>
            <p>
              SwachhMumbai demonstrates how a design-thinking project can move from a narrow initial hypothesis to a broader service-system concept through research, stakeholder perspectives, prototyping and feedback. The project’s strongest contribution is the design of a continuous link between citizen observation, municipal prioritisation, field-level action, resolution evidence and citizen verification.
            </p>

            <h3 className="text-base font-semibold text-blue-800 pt-1">
              Key project learnings
            </h3>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-700">
              <li>Reporting alone is not enough. Citizens need to see what happens after a report is submitted.</li>
              <li>Cleanliness is a system problem. Behaviour, infrastructure, collection, operations and monitoring are connected.</li>
              <li>A map or score is more useful when it explains local conditions and recurring causes.</li>
              <li>Participation should be connected to meaningful, verifiable civic contribution rather than points for activity alone.</li>
              <li>Different stakeholders need different interfaces, but their work should connect to a shared case lifecycle.</li>
              <li>Iterative prototyping made the solution progressively more connected, transparent and participatory.</li>
            </ul>

            <h3 className="text-base font-semibold text-blue-800 pt-1">
              Design decisions retained across iterations
            </h3>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-700">
              <li>Retain the report → prioritise → respond → verify loop as the operational backbone.</li>
              <li>Keep the citizen, field-worker and BMC roles connected while giving each a distinct interface.</li>
              <li>Make resolution evidence visible and preserve the ability to reopen an issue when it is not resolved.</li>
            </ul>
          </section>

          {/* 11 Scope and Feasibility */}
          <section className="space-y-3">
            <p className="text-[11px] font-mono uppercase tracking-wider text-emerald-700 font-semibold">
              11 | SCOPE AND FEASIBILITY
            </p>
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 border-b border-zinc-200 pb-2">
              Prototype Boundaries and What Remains to Be Validated
            </h2>
            <p className="text-sm text-zinc-600 italic">
              The prototype tests the concept and user workflow. It does not establish live municipal performance or city-wide impact.
            </p>
            <p>
              The project was developed as a medium-fidelity prototype. The user flow, labels, screens, prioritisation logic and role-played response workflow were made realistic enough to review with users. Sample and mock data were used to focus on whether the idea and workflow made sense.
            </p>

            <h3 className="text-base font-semibold text-blue-800 pt-1">
              What the prototype included
            </h3>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-700">
              <li>A cardboard Smart Disposal Station concept with Wet / Dry / Special guidance and QR reporting.</li>
              <li>A clickable citizen application for disposal, reporting and resolution tracking.</li>
              <li>A BMC / cleaning-team dashboard concept showing hotspots, peak times, priority and action status.</li>
              <li>Role-specific citizen, field-worker and municipal interfaces across iterations.</li>
              <li>A role-played report-to-resolution workflow and evidence-backed verification concept.</li>
            </ul>

            <h3 className="text-base font-semibold text-blue-800 pt-1">
              What was not built or proven
            </h3>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-700">
              <li>Working fill-level sensors or connected physical station hardware.</li>
              <li>Live GPS / RFID integration.</li>
              <li>A live municipal backend or integration with BMC systems.</li>
              <li>Automated routing or actual deployment of collection hardware.</li>
              <li>Validated predictive hotspot accuracy using real, authorised ward-level operational data.</li>
              <li>A demonstrated improvement in Mumbai’s cleanliness score, litter levels, collection costs or processing volumes.</li>
            </ul>
            <p>
              The prototype documentation explicitly states that it cannot prove a city-wide improvement in cleanliness, actual reductions in litter or cost, sensor accuracy, procurement feasibility, municipal integration or long-term behaviour change. Those questions require a pilot, operational data and longer-term testing.
            </p>

            <h3 className="text-base font-semibold text-blue-800 pt-1">
              Priorities for a future validation round
            </h3>
            <StudyTable
              headers={['Priority', 'What should be tested next', 'Evidence to capture']}
              rows={[
                [
                  'Mobile usability',
                  'Test narrow-screen layouts and check text, icons, map controls and locality panels for overlap or confusion.',
                  'Unaided task completion, time, errors, assistance and participant comments.',
                ],
                [
                  'Hotspot and score validity',
                  'Compare locality scores, hotspot indicators and forecasts with real, authorised ward data.',
                  'Data definitions, baseline values, forecast accuracy and false-alert rates.',
                ],
                [
                  'Sensor and station feasibility',
                  'Conduct a controlled station and sensor pilot before assuming operational reliability.',
                  'Sensor accuracy, maintenance needs, connectivity and operational ownership.',
                ],
                [
                  'Participation quality',
                  'Test whether Clean Missions and Adopt-a-Spot lead to meaningful repeat participation.',
                  'Verified actions, repeat engagement and evidence of on-ground contribution.',
                ],
                [
                  'Municipal workflow fit',
                  'Review priority queues and field-worker tasks with operational teams.',
                  'Assignment clarity, response ownership, status completeness and proof of closure.',
                ],
              ]}
            />
          </section>

          {/* 12 Closing Perspective */}
          <section className="space-y-3">
            <p className="text-[11px] font-mono uppercase tracking-wider text-emerald-700 font-semibold">
              12 | CLOSING PERSPECTIVE
            </p>
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 border-b border-zinc-200 pb-2">
              The SwachhMumbai Proposition
            </h2>
            <p className="text-sm text-zinc-600 italic">
              A connected cleanliness response concept built around visibility, accountability and continuous improvement.
            </p>
            <p>
              SwachhMumbai evolved from an initial focus on household segregation into a city-level civic-sanitation system. The research highlighted that cleanliness outcomes depend on more than collection or periodic cleaning. They also depend on convenient disposal, source segregation, the ability to identify recurring problem areas, the speed and clarity of municipal response, and whether citizens can see and verify the outcome.
            </p>
            <p>
              The final prototype brings these elements together through a citizen application, a Smart Disposal Station concept and municipal / field-worker operating views. Its three iterations show a deliberate progression: first validate the response loop, then connect users and locality information, and finally add explanatory intelligence and meaningful participation.
            </p>

            <EmeraldCallout title="Final Project Takeaway">
              SwachhMumbai is a proposed connected cleanliness ecosystem that helps make problems visible, supports prioritised action, records proof of response and gives citizens a role in verifying and improving local outcomes.
            </EmeraldCallout>

            <div className="space-y-2 rounded-lg bg-zinc-50 border border-zinc-200 p-4 sm:p-5">
              <h3 className="text-sm font-bold text-blue-800">
                Project material used for this report
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-xs sm:text-[13.5px] text-zinc-700">
                <li>Group 4 Swachh Mumbai empathy and design-thinking presentation.</li>
                <li>Mumbai cleanliness secondary-research presentation and the version incorporating primary research.</li>
                <li>SwachhMumbai Final Prototype Brief – Integrated Cleanliness Response System.</li>
                <li>Swachh Mumbai Prototype Iteration &amp; User Testing Report.</li>
                <li>Prototype iteration screenshots and user-testing summary.</li>
              </ul>
              <p className="text-xs text-zinc-500 italic pt-1">
                Content note: This report distinguishes research findings, prototype features, illustrative interface data and future validation needs. All rankings and municipal performance figures are reproduced as historical figures from the team’s research materials and should be read with their stated source period, not as live city statistics.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
