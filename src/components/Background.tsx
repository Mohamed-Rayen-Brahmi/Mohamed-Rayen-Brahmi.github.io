import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  baseOpacity: number;
  twinkle: number;
  twinkleSpeed: number;
  hue: 'steel' | 'ember';
}

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const c = canvas;
    const context = ctx;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = (c.width = window.innerWidth);
    let height = (c.height = window.innerHeight);
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = width * dpr;
      c.height = height * dpr;
      c.style.width = width + 'px';
      c.style.height = height + 'px';
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    const isMobile = width < 768;
    const count = isMobile ? 40 : reduceMotion ? 20 : 90;
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const baseOpacity = Math.random() * 0.4 + 0.1;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15 - 0.05,
        size: Math.random() * 1.8 + 0.4,
        opacity: baseOpacity,
        baseOpacity,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        hue: Math.random() > 0.85 ? 'ember' : 'steel',
      });
    }

    function draw() {
      context.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.twinkle += p.twinkleSpeed;
        p.opacity = p.baseOpacity + Math.sin(p.twinkle) * 0.15;

        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        const color =
          p.hue === 'ember'
            ? `rgba(255, 142, 43, ${Math.max(0, p.opacity)})`
            : `rgba(159, 177, 194, ${Math.max(0, p.opacity)})`;

        context.beginPath();
        context.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        context.fillStyle = color;
        context.fill();

        if (p.size > 1.2) {
          context.beginPath();
          context.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          const glowColor =
            p.hue === 'ember'
              ? `rgba(255, 142, 43, ${Math.max(0, p.opacity * 0.08)})`
              : `rgba(159, 177, 194, ${Math.max(0, p.opacity * 0.06)})`;
          context.fillStyle = glowColor;
          context.fill();
        }
      }
      rafRef.current = requestAnimationFrame(draw);
    }

    if (!reduceMotion) {
      draw();
    } else {
      draw();
      cancelAnimationFrame(rafRef.current);
    }

    let resizeTimer: number;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 200);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-ink-950">
      {/* Deep base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-900 to-ink-950" />

      {/* Moving radial gradients */}
      <div
        className="absolute -top-1/4 left-1/4 h-[60vh] w-[60vh] rounded-full opacity-20 blur-[120px] animate-drift"
        style={{ background: 'radial-gradient(circle, rgba(46,65,86,0.6), transparent 70%)' }}
      />
      <div
        className="absolute top-1/3 -right-1/4 h-[50vh] w-[50vh] rounded-full opacity-15 blur-[100px] animate-drift"
        style={{
          background: 'radial-gradient(circle, rgba(255,142,43,0.4), transparent 70%)',
          animationDelay: '7s',
        }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[40vh] w-[40vh] rounded-full opacity-10 blur-[90px] animate-drift"
        style={{
          background: 'radial-gradient(circle, rgba(111,138,163,0.5), transparent 70%)',
          animationDelay: '13s',
        }}
      />

      {/* Subtle fog layer */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(46,65,86,0.15), transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(255,142,43,0.05), transparent 50%)',
        }}
      />

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(5,5,6,0.6) 100%)',
        }}
      />

      {/* Film grain */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
