/**
 * HeroSequence — Mina-Massoud-style cinematic pinned hero.
 *
 * LAYOUT:
 *  ┌─────────────────────────────────────────────────┐
 *  │  [giant BG name — mix-blend overlay]            │
 *  │                                                 │
 *  │  FULL-SCREEN PINNED VIEWPORT (100vh sticky)     │
 *  │                                                 │
 *  │  Left: hero text (fades on scroll)              │
 *  │  Right: 3D katana (full-screen canvas)          │
 *  │                                                 │
 *  │  [scroll-triggered text lines appear]           │
 *  │  [slash VFX → split line → projects reveal]     │
 *  └─────────────────────────────────────────────────┘
 *
 * The KatanaCanvas spans the full pinned viewport (position:absolute inset-0)
 * so the model has the whole screen to move through. The hero text sits
 * on top via z-index.
 *
 * SCROLL MAP (section height = 320vh):
 *  0%–10%   → initial state, idle bob
 *  10%–65%  → model slides right→center + 360° rotation
 *  65%–78%  → model holds center, scales up, marquee text appears
 *  78%–88%  → model fades, slash VFX
 *  88%–100% → split line + projects reveal
 */

import { useEffect, useRef, Suspense, useState } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Mail } from 'lucide-react';
import KatanaCanvas from './KatanaCanvas';

gsap.registerPlugin(ScrollTrigger);

/* ─── Text lines that appear one by one as the model reaches center ─────── */
const SCROLL_LINES = [
  { text: 'FULL STACK',      delay: 0.00 },
  { text: 'DEVELOPER',       delay: 0.08 },
  { text: '斬 · BUILDER',    delay: 0.16 },
];

export default function HeroSequence() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const pinRef      = useRef<HTMLDivElement>(null);
  const shakeRef    = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);

  // Refs passed to KatanaCanvas so it knows scroll geometry
  const heroScrollPx = useRef<number>(0);
  const sectionTopPx = useRef<number>(0);

  // Scroll-reveal lines
  const linesRef    = useRef<HTMLDivElement>(null);

  // Slash effects
  const slashGroupRef = useRef<HTMLDivElement>(null);
  const flashRef      = useRef<HTMLDivElement>(null);
  const slashBlurRef  = useRef<HTMLDivElement>(null);
  const slashTrailRef = useRef<HTMLDivElement>(null);
  const slashLineRef  = useRef<HTMLDivElement>(null);
  const sparksRef     = useRef<HTMLDivElement>(null);

  // Split reveal
  // Split reveal
  const splitLineRef       = useRef<HTMLDivElement>(null);
  const projectsOverlayRef = useRef<HTMLDivElement>(null);

  // Spotlight Reveal Logic
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 400, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 400, damping: 25 });
  const maskImage = useMotionTemplate`radial-gradient(circle 350px at ${springX}px ${springY}px, black 40%, transparent 100%)`;

  const handleMouseMove = (e: React.MouseEvent) => {
    const pin = pinRef.current;
    if (!pin) return;
    const rect = pin.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  useEffect(() => {
    const section = sectionRef.current;
    const pin     = pinRef.current;
    if (!section || !pin) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ── Compute scroll geometry for KatanaCanvas ─────────────────────────
    const updateGeometry = () => {
      sectionTopPx.current = section.getBoundingClientRect().top + window.scrollY;
      // Total scroll distance = section height minus one viewport
      heroScrollPx.current = section.offsetHeight - window.innerHeight;
    };
    updateGeometry();
    window.addEventListener('resize', updateGeometry, { passive: true });

    // ── Init hidden states ───────────────────────────────────────────────
    gsap.set(slashGroupRef.current,      { opacity: 0 });
    gsap.set(flashRef.current,           { opacity: 0 });
    gsap.set(slashBlurRef.current,       { scaleX: 0, opacity: 0 });
    gsap.set(slashTrailRef.current,      { scaleX: 0, opacity: 0 });
    gsap.set(slashLineRef.current,       { scaleX: 0, opacity: 0 });
    gsap.set(splitLineRef.current,       { scaleY: 0, opacity: 0 });
    gsap.set(projectsOverlayRef.current, { opacity: 0 });

    if (reduceMotion) {
      gsap.set(splitLineRef.current,       { scaleY: 1, opacity: 0.6 });
      gsap.set(projectsOverlayRef.current, { opacity: 1 });
      return () => window.removeEventListener('resize', updateGeometry);
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=220%',
          pin: pin,
          scrub: 1.4,
          anticipatePin: 1,
          onUpdate: () => {
            // Keep geometry fresh on mobile (page reflows)
            sectionTopPx.current = section.getBoundingClientRect().top + window.scrollY;
          },
        },
      });

      // Phase 1 (0→0.65): hero text fades as model moves in
      tl.to(heroTextRef.current, {
        opacity: 0,
        y: '-60px',
        ease: 'power3.inOut',
        duration: 0.45,
      }, 0.05);

      // Phase 2 (0.65→0.78): scroll-reveal lines appear
      tl.to(linesRef.current, {
        opacity: 1,
        ease: 'power2.out',
        duration: 0.08,
      }, 0.65);

      // Phase 2: Pre-slash camera tremor
      tl.to(shakeRef.current, {
        x: '+=5px', y: '+=3px',
        duration: 0.02, repeat: 4, yoyo: true, ease: 'none',
      }, 0.73);

      // Phase 3 (0.78→0.90): lines fade, slash fires
      tl.to(linesRef.current, {
        opacity: 0, duration: 0.04,
      }, 0.78);

      tl.to(slashGroupRef.current, { opacity: 1, duration: 0.005 }, 0.78);

      tl.fromTo(slashBlurRef.current,
        { scaleX: 0, opacity: 0.45 },
        { scaleX: 1, opacity: 0.45, ease: 'power4.out', duration: 0.12, transformOrigin: 'left center' },
        0.78,
      );
      tl.to(slashBlurRef.current, { opacity: 0, duration: 0.08 }, 0.88);

      tl.fromTo(slashTrailRef.current,
        { scaleX: 0, opacity: 0.70 },
        { scaleX: 1, opacity: 0.70, ease: 'power4.out', duration: 0.10, transformOrigin: 'left center' },
        0.79,
      );
      tl.to(slashTrailRef.current, { opacity: 0, duration: 0.07 }, 0.88);

      tl.fromTo(slashLineRef.current,
        { scaleX: 0, opacity: 1 },
        { scaleX: 1, opacity: 1, ease: 'expo.out', duration: 0.09, transformOrigin: 'left center' },
        0.80,
      );
      tl.to(slashLineRef.current, { opacity: 0.6, duration: 0.10 }, 0.88);

      tl.to(flashRef.current, { opacity: 0.88, duration: 0.015 }, 0.83);
      tl.to(flashRef.current, { opacity: 0,    duration: 0.10  }, 0.845);

      tl.to(shakeRef.current, {
        x: '+=12px', y: '+=8px',
        duration: 0.025, repeat: 7, yoyo: true, ease: 'none',
      }, 0.83);

      tl.call(() => {
        const sparks = sparksRef.current?.children;
        if (!sparks) return;
        for (let i = 0; i < sparks.length; i++) {
          const angle = (Math.random() - 0.5) * Math.PI * 1.4;
          const dist  = 80 + Math.random() * 380;
          gsap.fromTo(sparks[i],
            { x: 0, y: 0, opacity: 1, scale: 1 + Math.random() },
            {
              x: Math.cos(angle) * dist,
              y: Math.sin(angle) * dist * 0.55,
              opacity: 0, scale: 0,
              duration: 0.35 + Math.random() * 0.45,
              ease: 'power2.out',
              delay: Math.random() * 0.06,
            },
          );
        }
      }, undefined, 0.83);

      // Phase 4 (0.90→1.0): screen split + projects reveal
      tl.to(slashLineRef.current, { opacity: 0, duration: 0.02 }, 0.92);

      tl.to(splitLineRef.current, {
        scaleY: 1, opacity: 0.9,
        ease: 'power3.out', duration: 0.08, transformOrigin: 'top center',
      }, 0.92);

      tl.to(projectsOverlayRef.current, {
        opacity: 1, ease: 'power2.out', duration: 0.10,
      }, 0.94);
    }, section);

    return () => {
      ctx.revert();
      window.removeEventListener('resize', updateGeometry);
    };
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div ref={sectionRef} id="home" className="relative" style={{ height: '320vh' }}>
      <div 
        ref={pinRef} 
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-cursor="reveal"
        className="sticky top-0 h-screen w-full overflow-hidden cursor-crosshair group" 
        style={{ background: '#050506' }}
      >

        {/* ── GIANT BACKGROUND NAME — behind everything ───────────────── */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            userSelect: 'none',
            overflow: 'hidden',
          }}
        >
          <div style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(7rem, 18vw, 22rem)',
            lineHeight: 0.82,
            letterSpacing: '-0.05em',
            color: '#ffffff',
            opacity: 0.055,
            mixBlendMode: 'overlay',
            textAlign: 'center',
            whiteSpace: 'nowrap',
          }}>
            <div>RAYEN</div>
            <div>BRAHMI</div>
          </div>
        </div>

        {/* ── DRAGON REVEAL LAYER ────────────────────────────────────── */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center bg-ink-950"
          style={{
            WebkitMaskImage: maskImage,
            maskImage: maskImage,
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <img 
            src="/hero_dragon_reveal.jpg" 
            alt="Hero Dragon Reveal" 
            className="h-full w-full object-cover opacity-80" 
          />
          {/* Intense red overlay for the vibe */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-[#B01818]/10 to-transparent mix-blend-overlay" />
        </motion.div>

        {/* ── Atmospheric background glow (right side, red) ───────────── */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 55% 60% at 80% 55%, rgba(176,24,24,0.12) 0%, transparent 70%)',
        }} />

        <div ref={shakeRef} className="absolute inset-0" style={{ willChange: 'transform', zIndex: 2 }}>

          {/* ── FULL-SCREEN 3D CANVAS ──────────────────────────────────── */}
          <Suspense fallback={null}>
            <KatanaCanvas heroScrollPx={heroScrollPx} sectionTopPx={sectionTopPx} />
          </Suspense>

          {/* ── HERO TEXT — left side, z above canvas ──────────────────── */}
          <div
            className="absolute inset-0 flex items-center"
            style={{ zIndex: 20, pointerEvents: 'none' }}
          >
            <div
              ref={heroTextRef}
              style={{
                paddingLeft: 'clamp(1.5rem, 5vw, 5rem)',
                willChange: 'transform, opacity',
                pointerEvents: 'auto',
                maxWidth: '50%',
              }}
            >
              {/* Chapter label — Mina-style top eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1.5rem',
                }}
              >
                <span style={{ width: 32, height: 1, background: '#B01818', display: 'block' }} />
                <span style={{
                  fontFamily: "'Inter', system-ui",
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.3em',
                  color: '#B01818',
                  textTransform: 'uppercase',
                }}>
                  零 · PORTFOLIO · M.26
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
                  fontWeight: 900,
                  lineHeight: 1.0,
                  letterSpacing: '-0.04em',
                  color: '#ffffff',
                  margin: 0,
                }}
              >
                Mohamed
                <br />
                Rayen
                <br />
                <span style={{
                  background: 'linear-gradient(135deg, #ff8e2b 0%, #B01818 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Brahmi
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.7 }}
                style={{
                  fontFamily: "'Inter', system-ui",
                  fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)',
                  fontWeight: 400,
                  color: '#8a8a95',
                  marginTop: '1.25rem',
                  maxWidth: '380px',
                  lineHeight: 1.7,
                  letterSpacing: '0.01em',
                }}
              >
                I build scalable web applications, AI-powered platforms, and cloud
                infrastructure — from Spring Boot APIs to React dashboards.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
                style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
              >
                <button
                  onClick={() => scrollTo('projects')}
                  className="btn-primary group"
                >
                  View Projects
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
                <button onClick={() => scrollTo('contact')} className="btn-ghost">
                  <Mail className="h-4 w-4" />
                  Contact Me
                </button>
              </motion.div>
            </div>
          </div>

          {/* ── SCROLL-REVEAL LINES — center stage, appear at ~65% scroll ─ */}
          <div
            ref={linesRef}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 25,
              opacity: 0,
              pointerEvents: 'none',
              gap: '0.5rem',
            }}
          >
            {SCROLL_LINES.map((line, i) => (
              <div
                key={i}
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(2rem, 7vw, 7.5rem)',
                  lineHeight: 0.9,
                  letterSpacing: '-0.04em',
                  color: i === 2 ? '#B01818' : '#ffffff',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  mixBlendMode: 'difference',
                }}
              >
                {line.text}
              </div>
            ))}
            {/* Tagline under lines */}
            <div style={{
              fontFamily: "'Inter', system-ui",
              fontSize: 'clamp(0.65rem, 1.1vw, 0.9rem)',
              letterSpacing: '0.35em',
              color: '#6f8aa3',
              textTransform: 'uppercase',
              marginTop: '1.5rem',
            }}>
              Code like a samurai · No second try
            </div>
          </div>

          {/* ── SLASH EFFECTS ──────────────────────────────────────────── */}
          <div
            ref={slashGroupRef}
            style={{ position: 'absolute', inset: 0, zIndex: 40, opacity: 0, pointerEvents: 'none' }}
          >
            <div ref={flashRef} style={{ position: 'absolute', inset: 0, background: '#fff', opacity: 0 }} />

            <div
              ref={slashBlurRef}
              style={{
                position: 'absolute', left: 0, top: '50%', height: 100, width: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,160,60,0.12) 20%, rgba(255,220,140,0.3) 45%, rgba(255,255,255,0.42) 50%, rgba(255,220,140,0.3) 55%, rgba(255,160,60,0.12) 80%, transparent)',
                filter: 'blur(22px)',
                transform: 'translateY(-50%) rotate(-20deg)',
                transformOrigin: 'left center',
              }}
            />
            <div
              ref={slashTrailRef}
              style={{
                position: 'absolute', left: 0, top: '50%', height: 28, width: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,142,43,0.28) 20%, rgba(255,200,120,0.6) 45%, rgba(255,255,255,0.8) 50%, rgba(255,200,120,0.6) 55%, rgba(255,142,43,0.28) 80%, transparent)',
                filter: 'blur(5px)',
                transform: 'translateY(-50%) rotate(-20deg)',
                transformOrigin: 'left center',
              }}
            />
            <div
              ref={slashLineRef}
              style={{
                position: 'absolute', left: 0, top: '50%', height: 3, width: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,142,43,0.9) 12%, #fff 50%, rgba(255,142,43,0.9) 88%, transparent)',
                boxShadow: '0 0 18px rgba(255,142,43,0.9), 0 0 40px rgba(255,200,100,0.5)',
                transform: 'translateY(-50%) rotate(-20deg)',
                transformOrigin: 'left center',
              }}
            />

            <div ref={sparksRef} style={{ position: 'absolute', left: '50%', top: '50%' }}>
              {Array.from({ length: 28 }).map((_, i) => (
                <div key={i} style={{
                  position: 'absolute',
                  width:  i % 5 === 0 ? 3 : 2,
                  height: i % 5 === 0 ? 3 : 2,
                  borderRadius: '50%',
                  background: i % 3 === 0 ? '#fff' : i % 3 === 1 ? '#ff8e2b' : '#ffd59a',
                  boxShadow: `0 0 ${i % 3 === 0 ? 8 : 5}px ${i % 3 === 0 ? '#fff' : '#ff8e2b'}`,
                }} />
              ))}
            </div>
          </div>

          {/* ── SPLIT LINE ─────────────────────────────────────────────── */}
          <div
            ref={splitLineRef}
            style={{
              position: 'absolute', left: '50%', top: 0, zIndex: 30, height: '100%', width: 2,
              transform: 'translateX(-50%)',
              background: 'linear-gradient(180deg, transparent, rgba(255,142,43,0.6) 15%, rgba(255,255,255,0.95) 50%, rgba(255,142,43,0.6) 85%, transparent)',
              boxShadow: '0 0 16px rgba(255,142,43,0.7), 0 0 40px rgba(255,200,100,0.35)',
              transformOrigin: 'top center',
              willChange: 'transform, opacity',
              pointerEvents: 'none',
            }}
          />

          {/* ── PROJECTS REVEAL ────────────────────────────────────────── */}
          <div
            ref={projectsOverlayRef}
            style={{
              position: 'absolute', inset: 0, zIndex: 20,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: 0, pointerEvents: 'none',
            }}
          >
            <div style={{ textAlign: 'center', padding: '0 1rem' }}>
              <span className="section-label" />
              <h2 className="section-title mt-3">Projects</h2>
              <p className="mt-4 text-ink-200">Continue scrolling to explore</p>
            </div>
          </div>

        </div>{/* shakeRef */}

        {/* ── SCROLL INDICATOR ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          style={{
            position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
            zIndex: 30, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
            pointerEvents: 'none',
          }}
        >
          <span style={{
            fontFamily: "'Inter', system-ui",
            fontSize: '0.6rem',
            letterSpacing: '0.3em',
            color: '#56565f',
            textTransform: 'uppercase',
          }}>Scroll</span>
          <div style={{
            width: 1, height: 40,
            background: 'linear-gradient(180deg, #B01818, transparent)',
            animation: 'scrollPulse 2s ease-in-out infinite',
          }} />
          <style>{`@keyframes scrollPulse { 0%,100%{opacity:0.3;transform:scaleY(0.6)} 50%{opacity:1;transform:scaleY(1)} }`}</style>
        </motion.div>

      </div>{/* pinRef */}
    </div>
  );
}
