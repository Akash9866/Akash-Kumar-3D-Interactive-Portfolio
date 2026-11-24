import React, { useEffect } from 'react';
import { X, Printer, FileText } from 'lucide-react';

interface NestleFullStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const StudyTable: React.FC<{
  headers: string[];
  rows: (string | React.ReactNode)[][];
  numericFromCol?: number;
}> = ({ headers, rows, numericFromCol = 1 }) => (
  <div className="overflow-x-auto rounded-lg border border-zinc-200 my-4 bg-white">
    <table className="w-full text-left border-collapse text-[13px] sm:text-sm">
      <thead>
        <tr className="bg-zinc-900 text-white">
          {headers.map((h, i) => (
            <th
              key={i}
              className={`px-3.5 py-2.5 font-semibold tracking-wide whitespace-nowrap ${
                i >= numericFromCol ? 'text-right' : 'text-left'
              }`}
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
                className={`px-3.5 py-2.5 text-zinc-700 align-top ${
                  cIdx === 0 ? 'font-medium text-zinc-900' : ''
                } ${cIdx >= numericFromCol ? 'text-right tabular-nums whitespace-nowrap' : ''}`}
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
    <p className="font-semibold text-zinc-900 mb-1">{title}</p>
    <p className="text-zinc-700">{children}</p>
  </div>
);

export const NestleFullStudyModal: React.FC<NestleFullStudyModalProps> = ({
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
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-[2px] animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="nestle-study-title"
    >
      <div
        className="relative w-full max-w-4xl bg-white border border-zinc-300 rounded-xl shadow-2xl text-zinc-900 max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Top Document Bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 px-4 sm:px-7 py-3.5 bg-zinc-50 border-b border-zinc-200 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-md bg-blue-950 text-blue-300 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-zinc-500 truncate">
                FINANCIAL &amp; BUSINESS ANALYSIS / BLOOMBERG TERMINAL
              </p>
              <p className="text-xs sm:text-sm font-semibold text-zinc-900 truncate">
                Nestlé India Limited — Full Detailed Study
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => window.print()}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-zinc-300 bg-white hover:bg-zinc-100 text-xs font-medium text-zinc-800 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-zinc-500 hover:text-zinc-900 rounded-lg hover:bg-zinc-200/70 transition-colors cursor-pointer"
              aria-label="Close full detailed study"
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
              FINANCIAL &amp; BUSINESS ANALYSIS / BLOOMBERG TERMINAL
            </p>
            <h1
              id="nestle-study-title"
              className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-900"
            >
              NESTLÉ INDIA LIMITED
            </h1>
            <p className="text-base sm:text-lg text-zinc-600 font-medium">
              Company and investment analysis using Bloomberg Terminal
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
              <div className="rounded-lg bg-zinc-50 border border-zinc-200 p-3">
                <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                  PROJECT TYPE
                </p>
                <p className="text-xs sm:text-[13px] font-semibold text-zinc-900 mt-0.5">
                  Group academic project
                </p>
              </div>
              <div className="rounded-lg bg-zinc-50 border border-zinc-200 p-3">
                <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                  COMPANY
                </p>
                <p className="text-xs sm:text-[13px] font-semibold text-zinc-900 mt-0.5">
                  Nestlé India Limited
                </p>
              </div>
              <div className="rounded-lg bg-zinc-50 border border-zinc-200 p-3">
                <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                  PRIMARY TOOL
                </p>
                <p className="text-xs sm:text-[13px] font-semibold text-zinc-900 mt-0.5">
                  Bloomberg Terminal
                </p>
              </div>
              <div className="rounded-lg bg-zinc-50 border border-zinc-200 p-3">
                <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                  ANALYSIS SNAPSHOT
                </p>
                <p className="text-xs sm:text-[13px] font-semibold text-zinc-900 mt-0.5">
                  Market data: 07 October 2026
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
              As part of a group finance assignment, I worked on a financial and business analysis of Nestlé India Limited using Bloomberg Terminal. The project brought together reported financial statements, historical performance, cash flow, financial ratios, peer valuation, earnings estimates and analyst sentiment to assess the company&apos;s financial position and market valuation.
            </p>
            <p>
              Bloomberg Terminal screens and exports were the primary sources for financial inputs. We also calculated selected ratios from reported statements and compared them with Bloomberg&apos;s displayed metrics, keeping reported results separate from consensus forecasts.
            </p>
          </section>

          {/* Executive summary */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900">
              Executive summary
            </h2>
            <StudyTable
              headers={['Dimension', 'What the analysis indicated']}
              numericFromCol={99}
              rows={[
                [
                  'Business profile',
                  'Bloomberg classified Nestlé India under Packaged Food, with business fields spanning four major food categories.',
                ],
                [
                  'Revenue',
                  'FY2026 product revenue was ₹230.71bn, compared with ₹200.78bn in FY2025.',
                ],
                [
                  'Profitability',
                  'FY2026 net income was ₹34.99bn; Bloomberg displayed ROE of 76.3% and ROA of 27.6%.',
                ],
                [
                  'Cash generation',
                  'FY2026 operating cash flow was ₹50.48bn; derived free cash flow was ₹42.18bn.',
                ],
                [
                  'Balance sheet',
                  'Reported borrowings fell to ₹0.24bn, while cash and equivalents increased to ₹13.41bn in FY2026.',
                ],
                [
                  'Valuation',
                  'Bloomberg RV showed P/E of 66.97× and EV/EBITDA of 48.86×, above the selected peer medians.',
                ],
              ]}
            />
          </section>

          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 border-b border-zinc-200 pb-2">
              1. Project scope and analytical approach
            </h2>
            <p>
              I approached the assignment by examining Nestlé India from both a business and financial perspective. The work moved from identifying the company and its market profile to understanding its financial statements, evaluating operating efficiency, comparing valuation with peers and interpreting the available analyst outlook.
            </p>

            <h3 className="text-base font-semibold text-zinc-900 pt-1">
              What the analysis covered
            </h3>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-700">
              <li>Company identity, business classification and market snapshot.</li>
              <li>Historical reported sales, profit before tax and net income across the FY2018–FY2022 series provided in the assignment data.</li>
              <li>Recent FY2025 and FY2026 income-statement performance.</li>
              <li>Balance-sheet structure, cash levels, borrowings and shareholders’ equity.</li>
              <li>Operating cash flow, capital expenditure, derived free cash flow and working-capital indicators.</li>
              <li>Business-category fields and domestic-versus-export revenue.</li>
              <li>Student-calculated ratios compared with Bloomberg-displayed ratios, including a DuPont analysis.</li>
              <li>Peer valuation, earnings consensus estimates and analyst recommendation distribution.</li>
            </ul>

            <h3 className="text-base font-semibold text-zinc-900 pt-2">
              Bloomberg Terminal research workflow
            </h3>
            <StudyTable
              headers={['Bloomberg area / screen', 'How it supported the analysis']}
              numericFromCol={99}
              rows={[
                [
                  'DES / security profile',
                  'Company identity, security classification, exchange and market snapshot.',
                ],
                [
                  'WATC / equity screening',
                  'Screening context and market fields used in the assignment.',
                ],
                [
                  'GP / DES',
                  'Price history, trading snapshot and one-year performance context.',
                ],
                [
                  'FA / Financial Statement Analysis',
                  'Reported income statement, balance sheet, cash flow, financial ratios, working capital and business fields.',
                ],
                [
                  'RV / Relative Valuation',
                  'Market valuation multiples and comparison with the Bloomberg packaged-food peer universe.',
                ],
                [
                  'EEG / GF',
                  'Consensus earnings estimates, estimate revisions and financial chart context.',
                ],
                [
                  'ANR',
                  'Distribution of analyst Buy, Hold and Sell recommendations and the displayed 12-month target.',
                ],
              ]}
            />
            <p>
              The assignment&apos;s data policy was to use Bloomberg exports and screenshots for financial inputs, calculate our own ratios from those reported inputs, and keep consensus forecasts separate from reported financials. Bloomberg&apos;s displayed calculations and our calculations were compared rather than treated as automatically identical.
            </p>

            <h3 className="text-base font-semibold text-zinc-900 pt-2">
              Company and security snapshot
            </h3>
            <StudyTable
              headers={['Item', 'Bloomberg snapshot']}
              numericFromCol={99}
              rows={[
                ['Company', 'Nestlé India Limited'],
                ['Bloomberg ticker', 'NEST IN'],
                ['Security type / exchange', 'Common Stock / XNSE'],
                ['Bloomberg classification', 'Packaged Food'],
                ['Share price snapshot', '₹1,324.00 (07 October 2026)'],
                [
                  'Shares and market capitalisation',
                  '1.928314 billion shares; approximately ₹2.55 trillion',
                ],
              ]}
            />
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 border-b border-zinc-200 pb-2">
              2. Revenue and financial performance
            </h2>
            <p>
              The financial review combined an earlier five-year historical series with a separate, more recent FY2025–FY2026 comparison. The historical series available in the assignment covered FY2018 to FY2022; the recent reported-statement comparison covered FY2025 and FY2026. These are distinct data windows in the presentation, rather than one continuous annual series.
            </p>

            <h3 className="text-base font-semibold text-zinc-900 pt-1">
              Historical performance: FY2018–FY2022
            </h3>
            <p className="text-xs sm:text-[13.5px] text-zinc-600">
              Reported values below are shown in ₹ billion, converted from the Bloomberg export figures stated in ₹ million.
            </p>
            <StudyTable
              headers={['Metric (₹bn)', 'FY2018', 'FY2019', 'FY2020', 'FY2021', 'FY2022']}
              numericFromCol={1}
              rows={[
                ['Sales / product revenue', '112.16', '122.95', '132.90', '146.65', '167.90'],
                ['Profit before tax', '24.29', '26.73', '28.13', '28.57', '32.56'],
                ['Net income', '16.07', '19.68', '20.82', '21.18', '23.91'],
                ['Net margin', '14.3%', '16.0%', '15.7%', '14.4%', '14.2%'],
              ]}
            />
            <StudyTable
              headers={['Growth indicator', 'Assignment analysis']}
              numericFromCol={1}
              rows={[
                ['Sales CAGR, FY2018–FY2022', '10.6%'],
                ['Net-income CAGR, FY2018–FY2022', '10.4%'],
                ['FY2022 sales growth, year on year', '14.5%'],
                ['FY2022 net-income growth, year on year', '12.8%'],
              ]}
            />
            <p>
              The historical series showed an expansion in reported sales and earnings over the period. Sales and net income grew at broadly similar compound annual rates across FY2018–FY2022, indicating that the increase in scale was accompanied by growth in earnings over that window.
            </p>

            <h3 className="text-base font-semibold text-zinc-900 pt-2">
              Recent reported income statement: FY2025 vs FY2026
            </h3>
            <p className="text-xs sm:text-[13.5px] text-zinc-600">
              Values are ₹ billion. The final column shows the percentage change calculated from the displayed FY2025 and FY2026 values.
            </p>
            <StudyTable
              headers={['Metric (₹bn, except EPS)', 'FY2025', 'FY2026', 'Change']}
              numericFromCol={1}
              rows={[
                ['Gross sales / product revenue', '200.78', '230.71', '+14.9%*'],
                ['Other operating income', '1.24', '0.83', '−33.0%'],
                ['Total financial costs', '1.36', '1.58', '+16.4%'],
                ['Profit before tax', '43.16', '45.64', '+5.7%'],
                ['Tax expense', '11.09', '10.65', '−3.9%'],
                ['Net income', '32.08', '34.99', '+9.1%'],
                ['EPS (₹)', '16.63', '18.15', '+9.1%'],
                ['EBITDA', '47.70', '53.06', '+11.3%'],
              ]}
            />
            <p className="text-xs text-zinc-500 italic">
              * The presentation summary states FY2026 sales growth of 14.6%; the displayed revenue values imply approximately 14.9% when calculated directly. The displayed values are retained here, and the percentage difference is flagged.
            </p>
            <p>
              The recent comparison showed that sales, EBITDA and net income all increased in FY2026. Net income growth was slower than the increase in product revenue, which made earnings conversion and margin resilience important parts of the interpretation.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 border-b border-zinc-200 pb-2">
              3. Balance sheet, cash flow and working capital
            </h2>

            <h3 className="text-base font-semibold text-zinc-900 pt-1">
              Balance sheet and capital structure
            </h3>
            <p className="text-xs sm:text-[13.5px] text-zinc-600">
              Selected reported figures are shown in ₹ billion. The table highlights the earlier FY2021 and FY2022 positions alongside FY2025 and FY2026.
            </p>
            <StudyTable
              headers={['Metric (₹bn)', 'FY2021', 'FY2022', 'FY2025', 'FY2026']}
              numericFromCol={1}
              rows={[
                ['Total assets', '82.34', '89.79', '121.93', '131.82'],
                ['Shareholders’ equity', '19.46', '24.59', '40.10', '51.57'],
                ['Current assets', '27.62', '34.90', '37.34', '45.90'],
                ['Current liabilities', '27.65', '30.80', '46.85', '47.61'],
                ['Cash & equivalents', '7.35', '9.46', '0.96', '13.41'],
                ['Inventory', '15.93', '19.29', '28.50', '25.69'],
                ['Borrowings', '0.34', '0.30', '7.53', '0.24'],
              ]}
            />
            <p>
              Between FY2025 and FY2026, shareholders&apos; equity increased by 28.6%, while cash and equivalents rose from approximately ₹0.96 billion to ₹13.41 billion. Reported borrowings declined from approximately ₹7.53 billion to ₹0.24 billion, a reduction of about 96.8%. The assignment interpreted this as a materially less leveraged reported funding structure.
            </p>

            <h3 className="text-base font-semibold text-zinc-900 pt-2">
              Cash flow and free cash flow
            </h3>
            <p className="text-xs sm:text-[13.5px] text-zinc-600">
              Values are ₹ billion. Free cash flow (FCF) below is a student calculation: operating cash flow less capital expenditure.
            </p>
            <StudyTable
              headers={['Metric (₹bn)', 'FY2021', 'FY2022', 'FY2025', 'FY2026']}
              numericFromCol={1}
              rows={[
                ['Operating cash flow', '22.36', '27.37', '29.36', '50.48'],
                ['Capital expenditure', '7.35', '5.50', '20.09', '8.30'],
                ['Derived free cash flow', '15.01', '21.88', '9.28', '42.18'],
                ['Dividends paid', '19.28', '20.25', '24.59', '23.14'],
                ['Net change in cash', '−17.04', '2.23', '−7.23', '12.44'],
              ]}
            />
            <p>
              FY2026 operating cash flow increased to ₹50.48 billion. With capital expenditure of ₹8.30 billion, derived free cash flow was approximately ₹42.18 billion. This was a marked improvement over FY2025, when higher capital expenditure reduced derived free cash flow to approximately ₹9.28 billion.
            </p>

            <h3 className="text-base font-semibold text-zinc-900 pt-2">
              Working-capital efficiency
            </h3>
            <p>
              The Bloomberg FA screen showed that the cash-conversion cycle improved from 20.23 days in FY2025 to 4.31 days in FY2026. FY2026 days sales outstanding was 5.48 days, inventory days were 94.11 days and payable days were 95.28 days. Accounts receivable turnover was 66.62× and inventory turnover was 3.88×. The assignment interpreted the shorter cash-conversion cycle as a marked improvement in working-capital efficiency.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 border-b border-zinc-200 pb-2">
              4. Business mix and ratio analysis
            </h2>

            <h3 className="text-base font-semibold text-zinc-900 pt-1">
              Business categories and geographic revenue
            </h3>
            <p>
              Bloomberg&apos;s Financial Analysis fields identified four product-group categories: Milk Products &amp; Nutrition; Prepared Dishes &amp; Cooking Aids; Powdered &amp; Liquid Beverages; and Confectionery. The supplied workbook did not resolve numeric revenue values for each product group, so the analysis did not infer or allocate product-level revenue.
            </p>
            <StudyTable
              headers={['Regional sales (₹bn)', 'FY2022', 'FY2025', 'FY2026']}
              numericFromCol={1}
              rows={[
                ['Domestic', '160.98', '192.93', '221.19'],
                ['Export', '6.92', '7.85', '9.53'],
                ['Total sales', '167.90', '200.78', '230.71'],
              ]}
            />
            <p>
              Domestic sales represented approximately 95.9% of FY2026 sales, while exports represented approximately 4.1%. The analysis therefore described Nestlé India as having a predominantly domestic revenue base, with exports a smaller but increasing contributor across the periods displayed.
            </p>

            <h3 className="text-base font-semibold text-zinc-900 pt-2">
              Ratio analysis: our calculations and Bloomberg values
            </h3>
            <p className="text-xs sm:text-[13.5px] text-zinc-600">
              Ratios calculated from the Bloomberg-reported statements were compared with the values displayed in Bloomberg FA / DES. Small differences can arise because definitions, adjustments and rounding may differ.
            </p>
            <StudyTable
              headers={['Ratio', 'Our calculation', 'Bloomberg', 'Interpretation']}
              numericFromCol={1}
              rows={[
                ['ROE', '76.4%', '76.3%', <span className="text-left block whitespace-normal">Very high return on shareholders’ equity.</span>],
                ['ROA', '27.6%', '27.6%', <span className="text-left block whitespace-normal">Strong earnings relative to the asset base.</span>],
                ['Net profit margin', '15.2%', '15.2%', <span className="text-left block whitespace-normal">Net income represented about 15.2% of sales.</span>],
                ['Operating margin', '19.5%', '20.0%', <span className="text-left block whitespace-normal">Small difference in calculation basis.</span>],
                ['Current ratio', '0.96×', '1.0×', <span className="text-left block whitespace-normal">Near 1×; liquidity is not especially conservative.</span>],
                ['Quick ratio', '0.42×', '0.4×', <span className="text-left block whitespace-normal">Lower quick liquidity after excluding inventory.</span>],
                ['Debt / equity', '0.47%', '8.6%', <span className="text-left block whitespace-normal">Definitions differ: our calculation uses reported borrowings; Bloomberg uses broader adjusted debt.</span>],
                ['P/E', '66.97×', '66.97×', <span className="text-left block whitespace-normal">Market valuation relative to earnings.</span>],
                ['Dividend yield', '0.91%', '1.06%', <span className="text-left block whitespace-normal">Different dividend-yield basis.</span>],
                ['Asset turnover', '1.82×', '1.8×', <span className="text-left block whitespace-normal">Sales generated relative to average assets.</span>],
                ['Financial leverage', '2.77×', '2.8×', <span className="text-left block whitespace-normal">Near-match after rounding.</span>],
              ]}
            />
            <p>
              Most calculations were close to Bloomberg&apos;s displayed ratios. The most visible differences were debt-to-equity and dividend yield. The debt-to-equity comparison is not like-for-like: our calculation used total reported borrowings, whereas Bloomberg&apos;s displayed ratio used a broader adjusted-debt definition. The dividend-yield difference reflected a different dividend-per-share basis.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 border-b border-zinc-200 pb-2">
              5. DuPont analysis and peer valuation
            </h2>

            <h3 className="text-base font-semibold text-zinc-900 pt-1">
              DuPont analysis of FY2026 ROE
            </h3>
            <p>
              To understand the drivers behind the high return on equity, the analysis used a three-step DuPont framework. It decomposed ROE into net profit margin, asset turnover and the equity multiplier.
            </p>
            <StudyTable
              headers={['DuPont component', 'Formula', 'FY2026 value']}
              numericFromCol={2}
              rows={[
                ['Net profit margin', 'Net income ÷ sales', '15.17%'],
                ['Asset turnover', 'Sales ÷ average assets', '1.82×'],
                ['Equity multiplier', 'Average assets ÷ average equity', '2.77×'],
                ['Result', '15.17% × 1.82 × 2.77', 'Approximately 76.3% ROE'],
              ]}
            />
            <p>
              The calculated DuPont result of approximately 76.3% was close to Bloomberg&apos;s displayed ROE of 76.3%. The interpretation in the assignment was that the high ROE was supported by a strong net margin and asset turnover, alongside an equity multiplier of around 2.77×. This decomposition helped explain the reported return without attributing it solely to high borrowings.
            </p>

            <h3 className="text-base font-semibold text-zinc-900 pt-2">
              Relative valuation against packaged-food peers
            </h3>
            <p>
              The Bloomberg RV relative-valuation screen compared Nestlé India with selected companies in a Bloomberg-curated packaged-food universe. The comparison focused on the price-to-earnings (P/E) and enterprise-value-to-EBITDA (EV/EBITDA) multiples.
            </p>
            <StudyTable
              headers={['Company', 'P/E', 'EV / EBITDA']}
              numericFromCol={1}
              rows={[
                ['Nestlé India', '66.97×', '48.86×'],
                ['Britannia', '44.21×', '32.32×'],
                ['Nissin Foods', '17.28×', '10.85×'],
                ['Calbee', '20.91×', '8.30×'],
                ['Vietnam Dairy', '12.27×', '7.18×'],
                ['Selected peer median', '15.44×', '8.33×'],
              ]}
            />
            <p>
              On this screen, Nestlé India&apos;s P/E was approximately 4.3 times the peer median, while its EV/EBITDA was approximately 5.9 times the peer median. The analysis interpreted this as a substantial valuation premium. The market appeared to be pricing in brand strength, earnings visibility and business defensiveness, but the premium also meant expectations were demanding.
            </p>

            <CalloutBox title="Sector valuation lens">
              A separate Bloomberg Intelligence-curated packaged-food comparison in the supplied capture showed Nestlé India at 59.2× P/E against a 17.3× comparison average (about 3.4×). This is a separate screen from the RV snapshot above; the two displayed multiples are not interchangeable.
            </CalloutBox>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 border-b border-zinc-200 pb-2">
              6. Earnings outlook and analyst sentiment
            </h2>

            <h3 className="text-base font-semibold text-zinc-900 pt-1">
              Bloomberg consensus estimates
            </h3>
            <p>
              The project distinguished reported FY2026 results from consensus estimates for FY2027 and FY2028. These estimates were used to understand the earnings trajectory implied by the analyst consensus, not as actual reported results.
            </p>
            <StudyTable
              headers={['Metric', 'FY2026A', 'FY2027E', 'FY2028E']}
              numericFromCol={1}
              rows={[
                ['EPS (₹)', '18.15', '20.52', '23.22'],
                ['Revenue (₹bn)', '230.7', '261.2', '287.0'],
                ['EBIT (₹bn)', '45.1', '55.6', '62.5'],
                ['EBITDA (₹bn)', '53.1', '62.1', '69.4'],
                ['Net income (₹bn)', '35.0', '39.5', '44.8'],
              ]}
            />
            <p>
              The Bloomberg consensus shown in the assignment projected EPS increasing from ₹18.15 in FY2026 to ₹20.52 in FY2027 and ₹23.22 in FY2028. Revenue, EBIT, EBITDA and net income were also projected to increase across the same periods. These projections helped explain why investors might accept a premium valuation, but they remained forward-looking estimates and were not treated as reported performance.
            </p>

            <h3 className="text-base font-semibold text-zinc-900 pt-2">
              Analyst recommendations
            </h3>
            <StudyTable
              headers={['Bloomberg ANR indicator', 'Value shown in the project capture']}
              numericFromCol={1}
              rows={[
                ['Consensus rating', '3.61'],
                ['12-month target price', '₹1,596.19'],
                ['Buy recommendations', '21 (51.2%)'],
                ['Hold recommendations', '15 (36.6%)'],
                ['Sell recommendations', '5 (12.2%)'],
              ]}
            />
            <p>
              The recommendation distribution was Buy-led but not unanimous: 21 Buy recommendations, 15 Hold recommendations and 5 Sell recommendations were visible in the Bloomberg ANR capture. This supported a constructive but not one-sided analyst picture.
            </p>

            <CalloutBox title="Snapshot and forecast discipline">
              The price and market-cap figures in this case study are historical project snapshots, not current market quotes. Forecasts are labelled FY2027E / FY2028E and are kept separate from reported FY2026A results. The project did not treat analyst targets or consensus estimates as guarantees.
            </CalloutBox>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 border-b border-zinc-200 pb-2">
              7. Investment arguments and overall assessment
            </h2>
            <p>
              The analysis brought together operating performance, financial strength, capital efficiency, valuation and analyst expectations. The resulting view was balanced: the company showed strong business and cash-generation characteristics, while its relative valuation remained the principal counterweight.
            </p>

            <h3 className="text-base font-semibold text-zinc-900 pt-1">
              Eight evidence-based considerations
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-zinc-700">
              <li>
                <strong className="text-zinc-900">Revenue momentum</strong> — FY2026 reported product revenue was ₹230.71 billion, higher than FY2025. The displayed values imply growth of approximately 14.9%.
              </li>
              <li>
                <strong className="text-zinc-900">Earnings resilience</strong> — FY2026 net income reached ₹34.99 billion, approximately 9.1% above FY2025.
              </li>
              <li>
                <strong className="text-zinc-900">High returns</strong> — Bloomberg displayed ROE of 76.3% and ROA of 27.6%; our ROE calculation was close to the Bloomberg value.
              </li>
              <li>
                <strong className="text-zinc-900">Cash generation</strong> — FY2026 operating cash flow was ₹50.48 billion and derived free cash flow was approximately ₹42.18 billion.
              </li>
              <li>
                <strong className="text-zinc-900">Lower reported borrowings</strong> — Reported borrowings declined from ₹7.53 billion in FY2025 to ₹0.24 billion in FY2026.
              </li>
              <li>
                <strong className="text-zinc-900">Working-capital efficiency</strong> — The cash-conversion cycle shown in Bloomberg FA improved from 20.23 days to 4.31 days.
              </li>
              <li>
                <strong className="text-zinc-900">Potential earnings growth</strong> — Bloomberg consensus projected EPS increasing from ₹20.52 in FY2027E to ₹23.22 in FY2028E.
              </li>
              <li>
                <strong className="text-zinc-900">Valuation and sentiment</strong> — The P/E of 66.97× was materially above the peer median of 15.44×; analyst recommendations were positive overall but not unanimous.
              </li>
            </ul>

            <h3 className="text-base font-semibold text-zinc-900 pt-2">
              Overall conclusion
            </h3>
            <p>
              Our group concluded that Nestlé India demonstrated a strong business profile in the supplied data: revenue and earnings were growing, returns were high, operating cash flow was substantial, reported borrowings were very low in FY2026 and the cash-conversion cycle had improved. The company also had a predominantly domestic revenue base and exposure across multiple packaged-food categories.
            </p>
            <p>
              The main concern was valuation. At 66.97× P/E and 48.86× EV/EBITDA, Nestlé India traded at a sizeable premium to the selected peer medians of 15.44× and 8.33×. That premium meant that continued growth, earnings delivery and margin resilience mattered: any shortfall could leave less room for the valuation to be supported.
            </p>

            <CalloutBox title="Balanced project view">
              The assignment’s concluding position was a HOLD-style / watch-the-entry-price view: recognise the strength of the business, but remain disciplined about the valuation paid. This was our academic interpretation of the supplied Bloomberg evidence, not a Bloomberg recommendation or investment advice.
            </CalloutBox>
          </section>

          {/* Data notes */}
          <section className="space-y-2 rounded-lg bg-zinc-50 border border-zinc-200 p-4 sm:p-5">
            <h2 className="text-base font-bold text-zinc-900">
              Data notes and interpretation boundaries
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-[13.5px] text-zinc-600">
              <li>
                Financial inputs came from Bloomberg Terminal exports and screenshots; our calculated ratios used those reported inputs. Consensus estimates were kept separate from reported results.
              </li>
              <li>
                The FY2018–FY2022 historical series and FY2025–FY2026 comparison are separate windows in the assignment, not a continuous annual dataset.
              </li>
              <li>
                Product-group revenue values and peer-profitability values were not available in the supplied exports, so no missing figures were inferred.
              </li>
              <li>
                Some ratios use different definitions across Bloomberg and our calculations. The 07 October 2026 market snapshot is historical, not a current quote.
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};
