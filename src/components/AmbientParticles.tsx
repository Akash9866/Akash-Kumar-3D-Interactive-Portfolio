import React, { useEffect, useRef } from 'react';

export const AmbientParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const nodes = Array.from({ length: 38 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.6 + 0.8,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const scrollY = window.scrollY * 0.15;

      ctx.fillStyle = 'rgba(24, 24, 27, 0.22)';
      ctx.strokeStyle = 'rgba(24, 24, 27, 0.06)';
      ctx.lineWidth = 1;

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

        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const mDrawY = (m.y - (scrollY % height) + height) % height;
          const dx = n.x - m.x;
          const dy = drawY - mDrawY;
          const dist = Math.hypot(dx, dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(n.x, drawY);
            ctx.lineTo(m.x, mDrawY);
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{
        maskImage:
          'radial-gradient(ellipse at 50% 36%, black 18%, transparent 72%)',
        WebkitMaskImage:
          'radial-gradient(ellipse at 50% 36%, black 18%, transparent 72%)',
      }}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
};
