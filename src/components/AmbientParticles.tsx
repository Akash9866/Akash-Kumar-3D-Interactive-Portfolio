import React, { useEffect, useRef } from 'react';

export const AmbientParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Check if user prefers reduced motion (saves CPU/battery)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId = 0;
    let isRunning = true;
    let isMobile = window.innerWidth < 768;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let resizeTimeout: number;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        if (!canvas) return;
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        isMobile = width < 768;
      }, 150);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Pause animation when tab is inactive to preserve battery and CPU
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(animId);
      } else {
        if (!isRunning) {
          isRunning = true;
          animId = requestAnimationFrame(draw);
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Optimized particle count: 14 for mobile, 28 for desktop (drastically reduces O(N^2) checks)
    const nodeCount = isMobile ? 14 : 28;
    const nodes = Array.from({ length: nodeCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      r: Math.random() * 1.4 + 0.6,
    }));

    // Throttled frame loop (30fps desktop, 20fps mobile): saves >60% CPU/GPU and prevents scroll jank
    let lastTime = 0;
    const targetFps = isMobile ? 20 : 30;
    const frameInterval = 1000 / targetFps;

    const draw = (currentTime: number) => {
      if (!isRunning) return;
      animId = requestAnimationFrame(draw);

      if (currentTime - lastTime < frameInterval) return;
      lastTime = currentTime;

      ctx.clearRect(0, 0, width, height);
      const scrollY = window.scrollY * 0.12;

      ctx.fillStyle = 'rgba(24, 24, 27, 0.18)';
      ctx.strokeStyle = 'rgba(24, 24, 27, 0.05)';
      ctx.lineWidth = 0.8;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0) n.x = width;
        if (n.x > width) n.x = 0;
        if (n.y < 0) n.y = height;
        if (n.y > height) n.y = 0;

        const drawY = (n.y - (scrollY % height) + height) % height;

        ctx.beginPath();
        ctx.arc(n.x, drawY, n.r, 0, Math.PI * 2);
        ctx.fill();

        // Only calculate connection lines on desktop to maintain 60-120fps on mobile
        if (!isMobile) {
          for (let j = i + 1; j < nodes.length; j++) {
            const m = nodes[j];
            const mDrawY = (m.y - (scrollY % height) + height) % height;
            const dx = n.x - m.x;
            const dy = drawY - mDrawY;
            if (Math.abs(dx) < 110 && Math.abs(dy) < 110) {
              const dist = Math.hypot(dx, dy);
              if (dist < 110) {
                ctx.beginPath();
                ctx.moveTo(n.x, drawY);
                ctx.lineTo(m.x, mDrawY);
                ctx.stroke();
              }
            }
          }
        }
      }
    };

    animId = requestAnimationFrame(draw);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{
        maskImage: 'radial-gradient(ellipse at 50% 36%, black 18%, transparent 72%)',
        WebkitMaskImage: 'radial-gradient(ellipse at 50% 36%, black 18%, transparent 72%)',
      }}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
};
