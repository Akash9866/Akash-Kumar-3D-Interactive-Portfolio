import React, { useEffect } from 'react';
import { X, Printer, FileText } from 'lucide-react';

interface DpsCafeDetailedStudyModalProps {
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

const CalloutBox: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="my-4 rounded-lg border border-blue-200 bg-blue-50/60 p-4 text-[13.5px] sm:text-sm text-zinc-800 leading-relaxed">
    <p className="font-semibold text-zinc-900 mb-1 uppercase text-xs tracking-wider text-blue-800">
      {title}
    </p>
    <p className="text-zinc-700">{children}</p>
  </div>
);

export const DpsCafeDetailedStudyModal: React.FC<DpsCafeDetailedStudyModalProps> = ({
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
      aria-labelledby="dps-cafe-study-title"
    >
      <div
        className="relative w-full max-w-4xl bg-white sm:border sm:border-zinc-300 rounded-none sm:rounded-xl shadow-2xl text-zinc-900 h-[100dvh] sm:h-auto sm:max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Top Document Bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-2 sm:gap-3 px-4 sm:px-7 py-3 sm:py-3.5 bg-zinc-50 border-b border-zinc-200 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-md bg-amber-950 text-amber-300 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-zinc-500 truncate">
                OPERATIONS / SERVICE PROCESS / CUSTOMER EXPERIENCE
              </p>
              <p className="text-xs sm:text-sm font-semibold text-zinc-900 truncate">
                DP’s Cafe — Detailed Study
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
              aria-label="Close detailed study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Body */}
        <div className="overflow-y-auto px-4 sm:px-8 md:px-10 py-6 sm:py-8 space-y-8 text-[14.5px] sm:text-[15px] leading-[1.7] text-zinc-800">
          {/* Document Header */}
          <header className="space-y-3 border-b border-zinc-200 pb-6">
            <p className="text-xs font-mono uppercase tracking-widest text-blue-700 font-semibold">
              OPERATIONS / SERVICE PROCESS / CUSTOMER EXPERIENCE
            </p>
            <h1
              id="dps-cafe-study-title"
              className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-900"
            >
              DP’s Cafe
            </h1>
            <p className="text-base sm:text-lg text-blue-700 font-semibold">
              Restaurant Operations &amp; Process Analysis
            </p>
            <p className="text-sm text-zinc-600">
              An observational study of service flow, seating utilisation, table cycles and preparation times.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-3">
              <div className="rounded-lg bg-zinc-50 border border-zinc-200 p-3">
                <p className="text-[10px] font-mono uppercase tracking-wider text-blue-700 font-semibold">
                  PROJECT
                </p>
                <p className="text-xs sm:text-[13px] font-semibold text-zinc-900 mt-0.5">
                  Restaurant Operations &amp; Process Analysis
                </p>
              </div>
              <div className="rounded-lg bg-zinc-50 border border-zinc-200 p-3">
                <p className="text-[10px] font-mono uppercase tracking-wider text-blue-700 font-semibold">
                  PERIOD
                </p>
                <p className="text-xs sm:text-[13px] font-semibold text-zinc-900 mt-0.5">
                  August 2026
                </p>
              </div>
              <div className="rounded-lg bg-zinc-50 border border-zinc-200 p-3">
                <p className="text-[10px] font-mono uppercase tracking-wider text-blue-700 font-semibold">
                  LOCATION
                </p>
                <p className="text-xs sm:text-[13px] font-semibold text-zinc-900 mt-0.5">
                  DP’s Cafe
                </p>
              </div>
              <div className="rounded-lg bg-zinc-50 border border-zinc-200 p-3">
                <p className="text-[10px] font-mono uppercase tracking-wider text-blue-700 font-semibold">
                  OBSERVATION APPROACH
                </p>
                <p className="text-xs sm:text-[13px] font-semibold text-zinc-900 mt-0.5">
                  Three on-site visits
                </p>
              </div>
            </div>
          </header>

          {/* Project overview */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900">
              Project overview
            </h2>
            <p>
              As part of my PGDM coursework, I observed restaurant operations at DP’s Cafe across three visits in August 2026. The study focused on how the outlet managed its service flow, how seating capacity was used, how long table cycles took, and how preparation time varied across selected menu items.
            </p>
            <p>
              The outlet had a reported seating capacity of 70. The observations recorded capacity utilisation in the approximate range of 68–80%, table cycles of around 20–25 minutes, and preparation times of approximately 4–5 minutes for idli-vada and 7–8 minutes for dosa.
            </p>

            <CalloutBox title="What This Project Examined">
              The relationship between demand at the outlet, the time required to prepare selected items, and the use of tables during service. The purpose was to understand the operating process and identify areas that could be examined further for service efficiency.
            </CalloutBox>

            <div className="space-y-2 pt-2">
              <p className="text-sm font-semibold text-blue-700">
                Key observations at a glance
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-xl bg-slate-900 text-white p-4 sm:p-5 text-center">
                <div>
                  <p className="text-xl sm:text-2xl font-bold">70</p>
                  <p className="text-xs text-slate-300 mt-0.5">Seats</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold">68–80%</p>
                  <p className="text-xs text-slate-300 mt-0.5">Observed capacity utilisation</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold">20–25 min</p>
                  <p className="text-xs text-slate-300 mt-0.5">Table cycle</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold">4–8 min</p>
                  <p className="text-xs text-slate-300 mt-0.5">Preparation range across observed items</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 border-b border-zinc-200 pb-2">
              1. Project context and objectives
            </h2>
            <p>
              Restaurant operations depend on multiple activities working together: orders must be received and processed, food must be prepared, tables must remain available for guests, and the overall service experience must be maintained. Observing these activities together gives a more useful picture than looking at preparation time alone.
            </p>
            <p>
              At DP’s Cafe, I focused on the relationship between order processing, food preparation, table turnover and customer experience. The project was an observational analysis of one 70-seat outlet, rather than a full financial or technology audit.
            </p>

            <h3 className="text-base font-semibold text-blue-700 pt-1">
              Objectives
            </h3>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-700">
              <li>Understand the broad flow of restaurant service, from order processing through preparation and table use.</li>
              <li>Observe seating utilisation in relation to the outlet’s 70-seat capacity.</li>
              <li>Record the approximate table-cycle duration noted during the visits.</li>
              <li>Compare preparation times for selected menu items: idli-vada and dosa.</li>
              <li>Consider customer satisfaction as an important dimension of the service process.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 border-b border-zinc-200 pb-2">
              2. Observation approach
            </h2>
            <p>
              I conducted observations during three visits to DP’s Cafe in August 2026. The focus was on visible operating conditions and selected time measures. The observations were used to understand the service process in a practical setting.
            </p>
            <h3 className="text-base font-semibold text-blue-700 pt-1">
              Areas observed
            </h3>
            <StudyTable
              headers={['Area', 'What I examined']}
              rows={[
                [
                  'Outlet capacity',
                  'The stated seating capacity of 70 seats and the approximate share of capacity in use during the observations.',
                ],
                [
                  'Order processing',
                  'The service process around receiving and processing customer orders.',
                ],
                [
                  'Food preparation',
                  'Preparation time for two selected menu items: idli-vada and dosa.',
                ],
                [
                  'Table cycle and turnover',
                  'The approximate time recorded for a table cycle and its relevance to seating availability.',
                ],
                [
                  'Customer experience',
                  'Customer satisfaction was considered as part of the operational review; no quantified satisfaction score is reported in this case study.',
                ],
              ]}
            />
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 border-b border-zinc-200 pb-2">
              3. Observations and operating measures
            </h2>
            <p>
              The following figures summarise the observations recorded for the project. They are approximate observation-level values, not audited operating data.
            </p>
            <StudyTable
              headers={['Measure', 'Observation', 'Operational meaning']}
              rows={[
                [
                  'Seating capacity',
                  '70 seats',
                  'Provides the reference capacity for considering how much of the dining space was in use.',
                ],
                [
                  'Capacity utilisation',
                  'Approximately 68–80%',
                  'Indicates that a substantial share of the available seating was occupied during the observed periods.',
                ],
                [
                  'Table cycle',
                  'Approximately 20–25 minutes',
                  'Provides an indication of the time associated with a table cycle in the observations.',
                ],
                [
                  'Idli-vada preparation',
                  'Approximately 4–5 minutes',
                  'Observed preparation-time range for one selected menu item.',
                ],
                [
                  'Dosa preparation',
                  'Approximately 7–8 minutes',
                  'Observed preparation-time range for another selected menu item.',
                ],
              ]}
            />

            <h3 className="text-base font-semibold text-blue-700 pt-1">
              3.1 Seating capacity and utilisation
            </h3>
            <p>
              The outlet had a seating capacity of 70. Capacity utilisation was recorded at approximately 68–80% during the observations, indicating that a substantial share of the available seating was in use while some capacity remained available.
            </p>
            <p>
              Utilisation provides context for service flow, but the observation record does not include time-stamped demand by visit. It therefore does not establish a peak-versus-off-peak pattern.
            </p>

            <h3 className="text-base font-semibold text-blue-700 pt-1">
              3.2 Table cycle and turnover
            </h3>
            <p>
              The table-cycle duration recorded during the study was approximately 20–25 minutes. This measure is relevant to seating availability and table turnover.
            </p>
            <p>
              The observation notes do not separate the cycle into ordering, dining, billing and table-reset stages. The 20–25 minute figure therefore cannot identify where time was spent or establish a specific delay.
            </p>

            <h3 className="text-base font-semibold text-blue-700 pt-1">
              3.3 Preparation time for selected menu items
            </h3>
            <p>
              Two menu items were used to compare preparation time. Idli-vada was observed at approximately 4–5 minutes, while dosa was observed at approximately 7–8 minutes. The recorded preparation range for dosa was therefore around 2–4 minutes longer than the range recorded for idli-vada.
            </p>
            <p>
              This comparison shows that preparation time differed by menu item in the observations. It does not, by itself, explain the reason for the difference. Factors such as preparation method, order volume, kitchen workload and batching were not separately measured in the available observation record.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 border-b border-zinc-200 pb-2">
              4. Operations analysis
            </h2>
            <h3 className="text-base font-semibold text-blue-700 pt-1">
              4.1 Reading the measures together
            </h3>
            <p>
              The project considered three operational dimensions together: seating utilisation, table-cycle duration and item-level preparation time. Each measure describes a different part of the restaurant operation. They should not be treated as interchangeable.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3">
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-1">
                <p className="text-[11px] font-mono uppercase tracking-wider text-blue-700 font-semibold">
                  CAPACITY
                </p>
                <p className="text-xl font-bold text-zinc-900">68–80%</p>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Shows how much of the 70-seat capacity was in use during the observed periods.
                </p>
              </div>
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-1">
                <p className="text-[11px] font-mono uppercase tracking-wider text-blue-700 font-semibold">
                  TABLE USE
                </p>
                <p className="text-xl font-bold text-zinc-900">20–25 min</p>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Describes the approximate table-cycle duration recorded.
                </p>
              </div>
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-1">
                <p className="text-[11px] font-mono uppercase tracking-wider text-blue-700 font-semibold">
                  PREPARATION
                </p>
                <p className="text-xl font-bold text-zinc-900">4–5 / 7–8 min</p>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Shows different preparation times for idli-vada and dosa.
                </p>
              </div>
            </div>

            <h3 className="text-base font-semibold text-blue-700 pt-1">
              4.2 What the observations indicate
            </h3>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-700">
              <li>Service performance needs to be viewed as a connected process. Preparation time is one component; seating utilisation and table-cycle duration describe other parts of the guest-service operation.</li>
              <li>The two selected menu items had different recorded preparation-time ranges. Item-level variation should therefore be considered when reviewing kitchen timing.</li>
              <li>With approximately 68–80% of a 70-seat capacity in use during the observations, the way tables are occupied and released is relevant to the outlet’s ability to serve customers.</li>
              <li>A single table-cycle figure does not identify the cause of delays. More detailed stage-level timing would be required to determine whether the main constraint occurs before preparation, during cooking, at service, during dining, or when resetting a table.</li>
            </ul>

            <h3 className="text-base font-semibold text-blue-700 pt-1">
              4.3 Distinguishing preparation time from table-cycle time
            </h3>
            <p>
              A key point in interpreting the observation is that food preparation time and table-cycle time measure different things. The 4–8 minute preparation observations relate to selected dishes. The 20–25 minute table-cycle observation relates to the use of a table. One should not be added to or substituted for the other without knowing the exact start and end points used in the original timing method.
            </p>

            <CalloutBox title="Interpretation">
              The project provides a first operational snapshot of DP’s Cafe. It identifies measurable parts of the service process and shows why capacity, table use and kitchen preparation should be examined together. It does not establish a single confirmed bottleneck or quantify a productivity improvement.
            </CalloutBox>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 border-b border-zinc-200 pb-2">
              5. Proposed operational recommendations
            </h2>
            <p>
              The observations provide an initial view of seating utilisation, table-cycle duration and preparation times for two menu items. The recommendations below translate those observations into practical actions that DP’s Cafe could consider. They are proposals for management review; they were not implemented or measured as part of this observation project.
            </p>

            <div className="space-y-2">
              <h3 className="text-base font-semibold text-blue-700">
                5.1 Standardise order capture and kitchen handoff
              </h3>
              <p>
                Use a consistent order-taking and handoff process so that each order reaches the kitchen with the correct item, quantity and customer instructions. A clearly visible order queue or numbered order ticket can help the front-of-house team and kitchen staff share the same order status. Record order placement, kitchen acceptance, preparation start, preparation completion and service as separate timestamps. This would make it easier to distinguish order-processing time from actual food-preparation time.
              </p>
              <p className="text-xs sm:text-[13px] text-zinc-600">
                <strong className="text-blue-700">Monitor:</strong> order-to-kitchen handoff time, order-to-ready time, order accuracy and the number of orders requiring clarification.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-semibold text-blue-700">
                5.2 Review preparation workflows by menu item
              </h3>
              <p>
                Use the observed preparation ranges as a starting point for a more consistent item-level review. Record preparation times for a larger and comparable set of idli-vada and dosa orders across different service periods. If repeated observations show avoidable variation, review station readiness, ingredient availability, task sequence and coordination between staff. Any preparation changes should preserve food quality and hygiene rather than pursue speed alone.
              </p>
              <p className="text-xs sm:text-[13px] text-zinc-600">
                <strong className="text-blue-700">Monitor:</strong> preparation-time range and variation by item, remake or correction frequency, and order accuracy.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-semibold text-blue-700">
                5.3 Manage the full table cycle, not just table turnover
              </h3>
              <p>
                Break the 20–25 minute table-cycle observation into clearly defined stages: table availability, guest seating, order placement, dining, billing, guest departure and table reset. This will show which stages take the most time and whether any delay is within the restaurant’s control. A simple table-reset checklist can help ensure that tables are cleaned and made ready consistently after guests leave. Table turnover should be improved without rushing guests or compromising the dining experience.
              </p>
              <p className="text-xs sm:text-[13px] text-zinc-600">
                <strong className="text-blue-700">Monitor:</strong> time spent in each table-cycle stage, table-reset time, table availability and guest feedback.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-semibold text-blue-700">
                5.4 Align staffing and task allocation with observed demand
              </h3>
              <p>
                Record seating utilisation and order volume at regular intervals across both quieter and busier periods. Once a repeatable demand pattern is visible, review whether front-of-house and kitchen responsibilities are allocated appropriately during those periods. Staff deployment should be adjusted only where the recorded workload indicates a need; the existing 68–80% utilisation range alone does not establish a staffing shortage or a peak-hour bottleneck.
              </p>
              <p className="text-xs sm:text-[13px] text-zinc-600">
                <strong className="text-blue-700">Monitor:</strong> interval-wise seating utilisation, orders received, pending orders and workload by service station.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-semibold text-blue-700">
                5.5 Introduce a simple customer-feedback loop
              </h3>
              <p>
                Collect short, structured feedback after service through a QR code, a brief receipt prompt or a consistent verbal question. Keep the feedback focused on factors directly connected to the service process: waiting time, order accuracy, food quality, staff attentiveness and overall experience. Review feedback periodically and compare it with the operating observations. This would help ensure that efficiency initiatives improve the guest experience rather than only shorten measured times.
              </p>
              <p className="text-xs sm:text-[13px] text-zinc-600">
                <strong className="text-blue-700">Monitor:</strong> response count, recurring feedback themes, reported waiting-time concerns and order-related issues.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-semibold text-blue-700">
                5.6 Review a small set of operating measures regularly
              </h3>
              <p>
                Bring the measures into a simple daily or weekly operating summary. The summary can combine order-to-ready time, preparation-time variation by item, table-cycle stages, seating utilisation, order accuracy and customer feedback. Establish a baseline first, then set realistic improvement targets only after sufficient observations have been collected. This creates a practical way to review whether process changes are helping.
              </p>
              <p className="text-xs sm:text-[13px] text-zinc-600">
                <strong className="text-blue-700">Monitor:</strong> trends over time rather than isolated observations, with definitions and measurement windows kept consistent.
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <h3 className="text-base font-semibold text-blue-700">
                Recommended implementation sequence
              </h3>
              <p>
                A sensible sequence is to establish a reliable baseline first, test one or two process changes on a limited basis, and compare the same measures before and after the change. For example, the cafe could begin by recording order-stage timestamps and table-cycle stages, then review the evidence before changing staffing or kitchen routines. This avoids treating an observed time range as proof of a specific operational problem.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 border-b border-zinc-200 pb-2">
              6. Opportunities for a deeper operational study
            </h2>
            <p>
              The observations point to ways the analysis could be extended. These are proposed next steps for further measurement, not actions or improvements claimed to have been implemented during this project.
            </p>
            <div className="space-y-2.5 text-zinc-700">
              <p>
                <strong className="text-blue-700 font-mono">01</strong>{' '}
                <strong className="text-zinc-900">Capture stage-level timestamps</strong> — Record order placement, order acceptance, preparation start, preparation completion, service, payment and table clearance as separate events.
              </p>
              <p>
                <strong className="text-blue-700 font-mono">02</strong>{' '}
                <strong className="text-zinc-900">Observe more orders per item</strong> — Repeat preparation-time observations across more orders and service periods to understand variation rather than relying on a small number of observations.
              </p>
              <p>
                <strong className="text-blue-700 font-mono">03</strong>{' '}
                <strong className="text-zinc-900">Compare different demand periods</strong> — Record capacity utilisation and service times across quieter and busier periods to see whether operating conditions change.
              </p>
              <p>
                <strong className="text-blue-700 font-mono">04</strong>{' '}
                <strong className="text-zinc-900">Measure table-cycle components</strong> — Define the start and end points of a table cycle and record the time spent in each stage, including table reset.
              </p>
              <p>
                <strong className="text-blue-700 font-mono">05</strong>{' '}
                <strong className="text-zinc-900">Collect structured customer feedback</strong> — Use a short, consistent feedback method to understand waiting time, order accuracy, service attentiveness and overall satisfaction.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 border-b border-zinc-200 pb-2">
              7. Project outcome and learning
            </h2>
            <p>
              The DP’s Cafe observation project gave me a practical opportunity to examine restaurant operations through direct observation rather than relying only on a theoretical process map. Across three visits, I considered how seating capacity, table use and preparation time relate to the flow of service.
            </p>
            <p>
              The most useful outcome was the distinction between different operating measures. The recorded preparation time for idli-vada and dosa provided an item-level view of kitchen activity, while the 20–25 minute table-cycle observation and the 68–80% capacity-utilisation range provided a broader view of seating and service operations.
            </p>
            <p>
              The exercise reinforced the importance of defining what is being measured. A preparation-time observation cannot explain the full customer wait, and a table-cycle duration cannot identify the stage where a delay occurs. A more complete evaluation requires timestamps and consistent definitions across the full service journey.
            </p>

            <h3 className="text-base font-semibold text-blue-700 pt-1">
              Key learning points
            </h3>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-700">
              <li>Observe the service process as a sequence of connected activities, not as one overall waiting-time figure.</li>
              <li>Use item-level preparation observations to understand differences between menu items.</li>
              <li>Interpret seating utilisation together with table-cycle information.</li>
              <li>Define measurement start and end points before drawing conclusions about operational efficiency.</li>
              <li>Use additional observation and structured customer feedback to validate improvement opportunities.</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 border-b border-zinc-200 pb-2">
              8. Study scope and interpretation
            </h2>
            <p>
              This case study describes an observational project conducted at one restaurant across three visits. The measures documented here are a 70-seat capacity, approximately 68–80% capacity utilisation, table cycles of around 20–25 minutes, and preparation times of approximately 4–5 minutes for idli-vada and 7–8 minutes for dosa.
            </p>
            <p>
              The project record does not include transaction-level timestamps, order volumes, exact observation windows, sample counts for each menu item, a quantified customer satisfaction score, or before-and-after performance data. Accordingly, the report does not claim statistical significance, a confirmed root cause, or a measured improvement in service efficiency. The operational recommendations are proposed actions for consideration, not changes implemented or evaluated during the project.
            </p>

            <h3 className="text-base font-semibold text-blue-700 pt-1">
              Project summary
            </h3>
            <CalloutBox title="DP’S CAFE | RESTAURANT OPERATIONS & PROCESS ANALYSIS">
              I observed operations at a 70-seat restaurant across three visits in August 2026. I examined order processing, seating utilisation, table cycles and customer experience, recording approximately 68–80% capacity utilisation and 20–25 minute table cycles. I also compared preparation times for idli-vada (4–5 minutes) and dosa (7–8 minutes). The project helped me understand how kitchen preparation, table availability and service flow need to be assessed together when analysing restaurant operations. The observations also informed proposed recommendations for improving order coordination, reviewing preparation workflows, managing the full table cycle, aligning resources with demand and collecting structured customer feedback.
            </CalloutBox>

            <div className="space-y-1.5 rounded-lg bg-zinc-50 border border-zinc-200 p-4 sm:p-5 text-xs sm:text-[13.5px] text-zinc-700">
              <h3 className="text-sm font-bold text-blue-700 mb-2">
                Project details
              </h3>
              <p>
                <strong className="text-zinc-900">Project:</strong> Restaurant Operations &amp; Process Analysis
              </p>
              <p>
                <strong className="text-zinc-900">Outlet:</strong> DP’s Cafe
              </p>
              <p>
                <strong className="text-zinc-900">Period:</strong> August 2026
              </p>
              <p>
                <strong className="text-zinc-900">Observation coverage:</strong> Three visits
              </p>
              <p>
                <strong className="text-zinc-900">Focus areas:</strong> Order processing, table turnover, seating utilisation and customer experience
              </p>
              <p>
                <strong className="text-zinc-900">Recorded measures:</strong> 70 seats; 68–80% capacity utilisation; 20–25 minute table cycles; 4–5 minute idli-vada preparation; 7–8 minute dosa preparation
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
