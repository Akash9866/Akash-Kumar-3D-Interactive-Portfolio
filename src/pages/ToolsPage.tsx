import React from 'react';
import { RoutePath } from '../router';
import { profileData } from '../data/profile';
import {
  BarChart3,
  Megaphone,
  Search,
  ClipboardList,
  MessageSquare,
  FlaskConical,
  Wrench,
} from 'lucide-react';

interface ToolsPageProps {
  onNavigate: (path: RoutePath) => void;
}

const getToolIcon = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes('bloomberg')) return <BarChart3 className="w-5 h-5" />;
  if (lower.includes('meta ads')) return <Megaphone className="w-5 h-5" />;
  if (lower.includes('seo')) return <Search className="w-5 h-5" />;
  if (lower.includes('google forms')) return <ClipboardList className="w-5 h-5" />;
  if (lower.includes('reddit')) return <MessageSquare className="w-5 h-5" />;
  if (lower.includes('anova')) return <FlaskConical className="w-5 h-5" />;
  return <Wrench className="w-5 h-5" />;
};

export const ToolsPage: React.FC<ToolsPageProps> = () => {
  return (
    <div className="mx-auto space-y-5 md:space-y-7">
      <div className="space-y-1.5">
        <h1 className="text-[28px] leading-[1.15] sm:text-4xl md:text-5xl font-medium tracking-tight text-zinc-900">
          Tools & Stack
        </h1>
        <p className="text-[14.5px] sm:text-base text-zinc-600 max-w-2xl leading-relaxed">
          Platforms, analytical suites, and research methods I use across digital marketing, performance campaigns, financial analysis, and business design.
        </p>
      </div>

      {/* Tools Grid with pure-CSS GPU hover transitions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 md:gap-5 pt-1 sm:pt-2">
        {profileData.toolsStack.map((tool) => (
          <div
            key={tool.name}
            className="w-full"
          >
            <div className="relative rounded-xl transition-all duration-200 ease-out h-full hover:-translate-y-0.5 hover:shadow-md shadow-xs">
              <div className="flex flex-row items-start justify-start p-4 rounded-xl gap-3.5 border border-gray-300 bg-white/80 hover:border-zinc-500 hover:bg-gray-50 transition-colors h-full">
                {/* Tool Icon */}
                <div
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center text-white shrink-0 shadow-xs"
                  style={{ backgroundColor: tool.accentColor }}
                >
                  {getToolIcon(tool.name)}
                </div>

                <div className="space-y-1 min-w-0">
                  <h2 className="text-[15px] sm:text-base font-semibold text-zinc-900 leading-snug">
                    {tool.name}
                  </h2>
                  <p className="text-xs font-medium text-zinc-600">
                    <span>{tool.category}</span>
                    <span aria-hidden="true"> · </span>
                    <span className="text-zinc-500 font-normal">{tool.badge}</span>
                  </p>
                  <p className="text-[13.5px] sm:text-xs text-zinc-600 leading-relaxed pt-0.5">
                    {tool.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
