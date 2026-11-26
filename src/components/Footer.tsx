import React, { useState, useEffect } from 'react';
import { RoutePath } from '../router';
import { profileData } from '../data/profile';

interface FooterProps {
  onNavigate: (path: RoutePath) => void;
}

const LiveClock: React.FC = React.memo(() => {
  const [timeStr, setTimeStr] = useState<string>(() =>
    new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
  );

  useEffect(() => {
    const updateClock = () => {
      if (document.hidden) return;
      setTimeStr(
        new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    };
    const id = setInterval(updateClock, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="text-xs sm:text-sm text-zinc-800 font-mono tabular-nums text-right">
      {timeStr}
    </div>
  );
});

export const Footer: React.FC<FooterProps> = React.memo(({ onNavigate }) => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 w-full border-t-[0.5px] border-gray-400/70 text-gray-700 text-xs sm:text-sm">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 py-4 sm:py-5 flex flex-col gap-2.5">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 sm:grid sm:grid-cols-3">
          <div className="flex items-center gap-2.5 sm:gap-3 sm:justify-self-start">
            <button
              onClick={() => onNavigate('/contact')}
              className="text-gray-700 hover:text-black hover:underline transition-colors duration-300 ease-in-out cursor-pointer py-0.5"
            >
              Reach out →
            </button>
          </div>

          <div className="space-x-1 sm:justify-self-center whitespace-nowrap order-3 sm:order-none w-full sm:w-auto text-center">
            <span>Akash Kumar |</span>
            <span>© {year}</span>
          </div>

          <div className="flex items-center gap-3 sm:justify-self-end">
            <LiveClock />
          </div>
        </div>

        <div className="text-center text-[11px] sm:text-xs text-gray-500 leading-snug">
          <span>{profileData.headline}</span>
        </div>
      </div>
    </footer>
  );
});
