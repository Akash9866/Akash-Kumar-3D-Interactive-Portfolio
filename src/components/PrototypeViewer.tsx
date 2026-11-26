import React, { useState, useEffect } from 'react';
import {
  ExternalLink,
  Smartphone,
  Monitor,
  Maximize2,
  Minimize2,
  RotateCw,
  Sparkles,
} from 'lucide-react';

export interface PrototypeViewerProps {
  prototypeUrl: string;
  prototypeTitle?: string;
  prototypeType?: 'web_app' | 'figma' | 'demo' | null;
  defaultView?: 'desktop' | 'mobile';
  className?: string;
}

export const PrototypeViewer: React.FC<PrototypeViewerProps> = ({
  prototypeUrl,
  prototypeTitle = 'Interactive Application Prototype',
  prototypeType = 'web_app',
  defaultView = 'desktop',
  className = '',
}) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>(defaultView);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [timedOut, setTimedOut] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (!isLoading) return;
    const t = setTimeout(() => {
      setTimedOut(true);
      setIsLoading(false);
    }, 6000);
    return () => clearTimeout(t);
  }, [isLoading, key]);

  useEffect(() => {
    if (!isFullscreen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFullscreen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isFullscreen]);

  const handleReload = () => {
    setTimedOut(false);
    setIsLoading(true);
    setKey((prev) => prev + 1);
  };

  return (
    <div
      className={`rounded-xl border border-zinc-300/80 bg-zinc-900 shadow-xl overflow-hidden transition-all duration-300 ${
        isFullscreen
          ? 'fixed inset-4 z-50 flex flex-col bg-zinc-950 border-zinc-700'
          : `relative w-full ${className}`
      }`}
    >
      {/* Top Device & Control Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-zinc-900/95 border-b border-zinc-800 text-zinc-300 select-none">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
          </div>
          <div className="hidden sm:flex items-center gap-1.5 ml-2 text-xs font-mono text-zinc-400">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span className="truncate max-w-[200px] text-zinc-200 font-medium">
              {prototypeTitle}
            </span>
            <span className="text-zinc-600">|</span>
            <span className="text-[11px] text-zinc-400 truncate max-w-[220px]">
              {prototypeUrl}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Mobile vs Desktop View Toggle */}
          <div className="inline-flex items-center rounded-lg bg-zinc-800/80 p-0.5 border border-zinc-700/60 text-xs">
            <button
              type="button"
              onClick={() => setViewMode('desktop')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                viewMode === 'desktop'
                  ? 'bg-zinc-700 text-white font-medium shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
              title="Desktop Browser View"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Desktop</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('mobile')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                viewMode === 'mobile'
                  ? 'bg-zinc-700 text-white font-medium shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
              title="Mobile Device View"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mobile</span>
            </button>
          </div>

          {/* Reload Iframe */}
          <button
            type="button"
            onClick={handleReload}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors cursor-pointer"
            title="Reload Prototype"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Expand Fullscreen'}
          >
            {isFullscreen ? (
              <Minimize2 className="w-3.5 h-3.5" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Launch In New Tab Button */}
          <a
            href={prototypeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-colors shadow-xs"
          >
            <span>Open App</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Embedded Iframe Viewport */}
      <div
        className={`relative flex items-center justify-center bg-zinc-950 p-2 sm:p-4 overflow-hidden ${
          isFullscreen ? 'flex-1' : 'h-[500px] sm:h-[620px]'
        }`}
      >
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-zinc-950/80 backdrop-blur-xs text-zinc-400 gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
            <span className="text-xs font-mono">Loading interactive prototype...</span>
          </div>
        )}

        {/* Viewport Frame */}
        <div
          className={`h-full transition-all duration-300 relative ${
            viewMode === 'mobile'
              ? 'w-[375px] max-w-full rounded-[36px] border-[10px] border-zinc-800 shadow-2xl overflow-hidden bg-black'
              : 'w-full rounded-lg border border-zinc-800/80 shadow-md overflow-hidden bg-white'
          }`}
        >
          {/* Mobile Speaker Notch */}
          {viewMode === 'mobile' && (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-zinc-800 rounded-full z-30 pointer-events-none" />
          )}

          <iframe
            key={key}
            src={prototypeUrl}
            title={prototypeTitle}
            loading="lazy"
            className="w-full h-full border-0 bg-white"
            onLoad={() => {
              setTimedOut(false);
              setIsLoading(false);
            }}
            allow="accelerometer; autoplay; camera; encrypted-media; geolocation; gyroscope; microphone; fullscreen"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-presentation"
          />
          {timedOut && (
            <div className="absolute bottom-3 left-3 right-3 sm:left-auto sm:right-3 z-30 flex items-center justify-between gap-3 rounded-lg bg-zinc-900/95 border border-zinc-700 px-3.5 py-2 text-xs text-zinc-200 shadow-lg">
              <span>Preview slow or blocked? Open externally.</span>
              <a
                href={prototypeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-medium shrink-0"
              >
                Launch
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Frame Status Footer */}
      <div className="px-4 py-2 bg-zinc-900 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Interactive Live Prototype Ready</span>
        </span>
        <span className="hidden sm:inline text-zinc-500">
          Click and scroll inside the frame to interact with the application
        </span>
      </div>
    </div>
  );
};
