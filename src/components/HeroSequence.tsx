import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/**
 * HeroSequence — cinematic katana scroll animation.
 *
 * IMAGE LAYOUT (both PNGs are 1536×1024, pre-aligned):
 *   blade.png  : tip on LEFT (col 81, thinnest), guard at col ~481 (widest), handle on RIGHT (cols 481–1458)
 *   sheath.png : spans cols 138–1403, covers the blade when stacked at same position
 *
 * ANIMATION PLAN:
 *   Initial  → Blade stacked on sheath at same coords, handle visible to right of sheath
 *   Phase 1  → Blade slides LEFT (-x) AND rotates so tip faces UP (pivot at handle grip ~85% from left)
 *   Phase 2  → Fully drawn: sword pointing upward, blade glows
 *   Phase 3  → SLASH: ONLY BLADE sweeps diagonally down-right (sheath stays static)
 *              Rotation: -80deg → +25deg = full sword swing arc
 *   Phase 4  → Screen splits, projects revealed
 */

export default function HeroSequence() {
  const sectionRef   = useRef<HTMLDivElement>(null);
  const pinRef       = useRef<HTMLDivElement>(null);
  const shakeRef     = useRef<HTMLDivElement>(null);
  const heroTextRef  = useRef<HTMLDivElement>(null);

  // Sword parts — blade animates, sheath is static
  const bladeWrapRef  = useRef<HTMLDivElement>(null);   // wrapper that GSAP animates
  const bladeGlowRef  = useRef<HTMLDivElement>(null);

  // Slash effects
  const slashGroupRef = useRef<HTMLDivElement>(null);
  const flashRef      = useRef<HTMLDivElement>(null);
  const slashBlurRef  = useRef<HTMLDivElement>(null);
  const slashTrailRef = useRef<HTMLDivElement>(null);
  const slashLineRef  = useRef<HTMLDivElement>(null);
  const sparksRef     = useRef<HTMLDivElement>(null);

  // Split reveal
  const splitLineRef        = useRef<HTMLDivElement>(null);
  const projectsOverlayRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pin     = pinRef.current;
    if (!section || !pin) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile     = window.matchMedia('(max-width: 767px)').matches;

    // How far the blade slides LEFT to unsheath.
    // Guard is at ~31% from left of image (col 481/1536).
    // Sheath left edge is at ~9% (col 138/1536).
    // We slide until guard clears the sheath opening (left end of sheath).
    // So blade needs to travel roughly 22% of its own width = ~22% of container.
    // But we also want it to sweep far for cinematic effect, so we overshoot.
    const bladeTravel = isMobile ? '-38vw' : '-52vw';

    // Pivot point for the rotation during drawing — at the handle grip (right side of image)
    // Guard is at col 481/1536 ≈ 31%. Handle grip center ≈ 75-85% from left.
    // We pivot at 80% so the grip stays roughly in place while tip rotates upward.
    const PIVOT = '80% 50%';

    // ── Initial states ──────────────────────────────────────────
    gsap.set(bladeWrapRef.current, {
      x: 0,
      y: 0,
      rotation: 0,
      opacity: 1,
      transformOrigin: PIVOT,
    });
    gsap.set(bladeGlowRef.current,   { opacity: 0 });
    gsap.set(slashGroupRef.current,  { opacity: 0 });
    gsap.set(flashRef.current,       { opacity: 0 });
    gsap.set(slashBlurRef.current,   { scaleX: 0, opacity: 0 });
    gsap.set(slashTrailRef.current,  { scaleX: 0, opacity: 0 });
    gsap.set(slashLineRef.current,   { scaleX: 0, opacity: 0 });
    gsap.set(splitLineRef.current,   { scaleY: 0, opacity: 0 });
    gsap.set(projectsOverlayRef.current, { opacity: 0 });

    if (reduceMotion) {
      gsap.set(bladeWrapRef.current, { x: bladeTravel, rotation: -80 });
      gsap.set(bladeGlowRef.current, { opacity: 0.4 });
      gsap.set(splitLineRef.current, { scaleY: 1, opacity: 0.6 });
      gsap.set(projectsOverlayRef.current, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=220%',
          pin: pin,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // ════════════════════════════════════════════════════════════
      // PHASE 1 — UNSHEATHING (0 → 0.60)
      // Blade slides LEFT and ROTATES so tip faces upward.
      // Pivot is at the handle grip (80% from left), so the grip
      // stays roughly in place while tip swings up and left.
      // ════════════════════════════════════════════════════════════

      // Micro-creep anticipation
      tl.to(bladeWrapRef.current, {
        x: '-1.5vw',
        rotation: -2,
        ease: 'power1.out',
        duration: 0.05,
      }, 0);

      // Slow start
      tl.to(bladeWrapRef.current, {
        x: '-14vw',
        rotation: -25,
        ease: 'power2.out',
        duration: 0.20,
      }, 0.05);

      // Accelerates
      tl.to(bladeWrapRef.current, {
        x: '-34vw',
        rotation: -58,
        ease: 'power2.inOut',
        duration: 0.20,
      }, 0.25);

      // Decelerates to stop — fully drawn, tip pointing upward
      tl.to(bladeWrapRef.current, {
        x: bladeTravel,
        rotation: -82,          // tip now faces UP-LEFT (sharp side up)
        ease: 'power3.out',
        duration: 0.15,
      }, 0.45);

      // Blade edge glow builds as it emerges
      tl.to(bladeGlowRef.current, {
        opacity: 0.55,
        ease: 'power1.inOut',
        duration: 0.55,
      }, 0.20);

      // Hero text fades
      tl.to(heroTextRef.current, {
        opacity: 0.06,
        y: '-40px',
        ease: 'power2.inOut',
        duration: 0.50,
      }, 0);

      // Scroll hint removed from layout

      // ════════════════════════════════════════════════════════════
      // PHASE 2 — FULLY DRAWN / PRE-SLASH (0.60 → 0.75)
      // Sword points up, glow peaks, camera trembles.
      // ════════════════════════════════════════════════════════════

      tl.to(bladeGlowRef.current, {
        opacity: 0.85,
        ease: 'power2.out',
        duration: 0.08,
      }, 0.65);

      // Camera micro-tremor before slash
      tl.to(shakeRef.current, {
        x: '+=4px',
        y: '+=3px',
        duration: 0.02,
        repeat: 5,
        yoyo: true,
        ease: 'none',
      }, 0.70);

      // ════════════════════════════════════════════════════════════
      // PHASE 3 — SLASH (0.75 → 0.90)
      // ONLY the blade sweeps diagonally down-right — sheath stays.
      // Rotation: -82deg → +25deg = 107deg arc (full sword swing).
      // Matches the diagonal yellow line direction.
      // ════════════════════════════════════════════════════════════

      tl.to(bladeWrapRef.current, {
        x: isMobile ? `${parseFloat(bladeTravel) + 28}vw` : `${parseFloat(bladeTravel) + 38}vw`,
        y: isMobile ? '32vh' : '42vh',
        rotation: 25,           // tip swings from UP to DOWN-RIGHT
        ease: 'power4.inOut',
        duration: 0.15,
      }, 0.75);

      // Blade fades at end of swing
      tl.to(bladeWrapRef.current, {
        opacity: 0,
        duration: 0.05,
        ease: 'power2.in',
      }, 0.84);

      // Glow fades with blade
      tl.to(bladeGlowRef.current, {
        opacity: 0,
        duration: 0.05,
      }, 0.84);

      // ── Slash effects ──
      tl.to(slashGroupRef.current, { opacity: 1, duration: 0.005 }, 0.75);

      tl.fromTo(slashBlurRef.current,
        { scaleX: 0, opacity: 0.45 },
        { scaleX: 1, opacity: 0.45, ease: 'power4.out', duration: 0.12, transformOrigin: 'left center' },
        0.75,
      );
      tl.to(slashBlurRef.current, { opacity: 0, duration: 0.08 }, 0.87);

      tl.fromTo(slashTrailRef.current,
        { scaleX: 0, opacity: 0.70 },
        { scaleX: 1, opacity: 0.70, ease: 'power4.out', duration: 0.10, transformOrigin: 'left center' },
        0.76,
      );
      tl.to(slashTrailRef.current, { opacity: 0, duration: 0.07 }, 0.87);

      tl.fromTo(slashLineRef.current,
        { scaleX: 0, opacity: 1 },
        { scaleX: 1, opacity: 1, ease: 'expo.out', duration: 0.09, transformOrigin: 'left center' },
        0.77,
      );
      tl.to(slashLineRef.current, { opacity: 0.6, duration: 0.10 }, 0.87);

      tl.to(flashRef.current, { opacity: 0.85, duration: 0.015 }, 0.81);
      tl.to(flashRef.current, { opacity: 0, duration: 0.10 }, 0.825);

      tl.to(shakeRef.current, {
        x: '+=10px',
        y: '+=7px',
        duration: 0.025,
        repeat: 7,
        yoyo: true,
        ease: 'none',
      }, 0.80);

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
      }, undefined, 0.80);

      // ════════════════════════════════════════════════════════════
      // PHASE 4 — SCREEN SPLIT (0.90 → 1.0)
      // ════════════════════════════════════════════════════════════

      tl.to(slashLineRef.current, { opacity: 0, duration: 0.02 }, 0.90);

      tl.to(splitLineRef.current, {
        scaleY: 1,
        opacity: 0.9,
        ease: 'power3.out',
        duration: 0.08,
        transformOrigin: 'top center',
      }, 0.90);

      tl.to(projectsOverlayRef.current, {
        opacity: 1,
        ease: 'power2.out',
        duration: 0.10,
      }, 0.92);
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  // Shared style for all katana image layers:
  // All layers are absolute, top:0 left:0 100%×100% to preserve pre-alignment.
  const layerStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0, left: 0,
    width: '100%', height: '100%',
    objectFit: 'contain',
    userSelect: 'none',
    pointerEvents: 'none',
  };

  return (
    <div ref={sectionRef} id="home" className="relative" style={{ height: '320vh' }}>
      <div ref={pinRef} className="sticky top-0 h-screen w-full overflow-hidden">
        <div ref={shakeRef} className="absolute inset-0" style={{ willChange: 'transform' }}>

          {/* ──────────────── HERO TEXT ──────────────── */}
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto grid w-full max-w-7xl items-center px-6 lg:grid-cols-2 lg:px-10">

              {/* Left column: text */}
              <div
                ref={heroTextRef}
                className="order-2 z-10 lg:order-1"
                style={{ willChange: 'transform, opacity' }}
              >
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55, duration: 0.8 }}
                  className="text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
                >
                  Mohamed Rayen
                  <br />
                  <span className="bg-gradient-to-r from-ember-300 via-ember-400 to-ember-500 bg-clip-text text-transparent">
                    Brahmi
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75, duration: 0.6 }}
                  className="mt-4 text-lg font-medium tracking-wide text-steel-200 sm:text-xl"
                >
                  Full Stack Developer
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  className="mt-5 max-w-md text-base leading-relaxed text-ink-200"
                >
                  I build scalable web applications, AI-powered platforms, and cloud
                  infrastructure — from Spring Boot APIs to React dashboards. I enjoy taking
                  ideas from architecture all the way through deployment.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.6 }}
                  className="mt-8 flex flex-wrap items-center gap-4"
                >
                  <button onClick={() => scrollTo('projects')} className="btn-primary group">
                    View Projects
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                  <button onClick={() => scrollTo('contact')} className="btn-ghost">
                    <Mail className="h-4 w-4" />
                    Contact Me
                  </button>
                </motion.div>
              </div>

              {/* Right column: katana */}
              <div className="order-1 lg:order-2 relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="h-48 w-[500px] rounded-full bg-steel-400/8 blur-[80px]" />
                </div>

                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative w-full"
                  /*
                    Shift the whole sword LEFT so handle lines up at sheath edge.
                    marginLeft: '-22%' pushes it into the left column a bit.
                    This is the KEY fix for "sword more on the left".
                  */
                  style={{ marginLeft: '-22%', width: '120%' }}
                >
                  {/*
                    KATANA OUTER WRAPPER — sets size, tilt, and clip.
                    Both layers (sheath + blade) sit inside here at 0,0 100%×100%.
                    Slight -8deg rotation for cinematic "ready stance" look.
                  */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '1536 / 1024',
                      transform: 'rotate(-8deg)',
                      overflow: 'visible',
                    }}
                  >

                    {/*
                      ── LAYER 1: SHEATH ──────────────────────────────────────
                      zIndex 3 — sits ABOVE the blade so the blade appears
                      hidden inside it when undrawn.
                      NEVER moves. Static for the entire animation.
                    */}
                    <img
                      src="/katana/sheath.webp"
                      alt=""
                      aria-hidden
                      style={{
                        ...layerStyle,
                        filter: 'drop-shadow(0 8px 28px rgba(0,0,0,0.75))',
                        zIndex: 1,
                      }}
                    />

                    {/*
                      ── LAYER 2: BLADE + HANDLE ───────────────────────────────
                      This wrapper (bladeWrapRef) is what GSAP animates.
                      zIndex 2 — below sheath so it looks like it's inside.
                      During unsheathing: slides LEFT (x) + rotates (rotation)
                        so the tip ends up pointing upward (sharp side up).
                      During slash: sweeps diagonally right-down — ONLY this
                        wrapper moves. Sheath (layer 1) stays completely static.
                      transformOrigin is set to ~80% from left (handle grip area)
                        so the pivot point is at the grip, not the image center.
                    */}
                    <div
                      ref={bladeWrapRef}
                      style={{
                        position: 'absolute',
                        top: 0, left: '3.7%',
                        width: '100%', height: '100%',
                        zIndex: 2,
                        willChange: 'transform, opacity',
                        // transformOrigin set via gsap.set in useEffect
                      }}
                    >
                      <img
                        src="/katana/blade.webp"
                        alt="katana sword"
                        aria-hidden
                        style={{
                          ...layerStyle,
                          filter: 'drop-shadow(0 4px 18px rgba(180,210,240,0.2))',
                        }}
                      />

                      {/* Edge glow — child of blade so it moves with it */}
                      <div
                        ref={bladeGlowRef}
                        style={{
                          ...layerStyle,
                          background:
                            'linear-gradient(180deg, transparent 30%, rgba(180,220,255,0.22) 47%, rgba(255,255,255,0.14) 52%, transparent 70%)',
                          filter: 'blur(7px)',
                          opacity: 0,
                          willChange: 'opacity',
                        }}
                      />
                    </div>

                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* ──────────────── SLASH EFFECTS ──────────────── */}
          <div
            ref={slashGroupRef}
            className="pointer-events-none absolute inset-0 z-40"
            style={{ opacity: 0 }}
          >
            {/* Full-screen flash */}
            <div ref={flashRef} className="absolute inset-0 bg-white" style={{ opacity: 0 }} />

            {/* Diagonal slash — angle matches the sword swing direction (~-20deg) */}
            <div
              ref={slashBlurRef}
              className="absolute left-0 top-1/2 h-[100px] w-full origin-left"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(255,160,60,0.12) 20%, rgba(255,220,140,0.3) 45%, rgba(255,255,255,0.42) 50%, rgba(255,220,140,0.3) 55%, rgba(255,160,60,0.12) 80%, transparent)',
                filter: 'blur(22px)',
                transform: 'translateY(-50%) rotate(-20deg)',
              }}
            />
            <div
              ref={slashTrailRef}
              className="absolute left-0 top-1/2 h-[28px] w-full origin-left"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(255,142,43,0.28) 20%, rgba(255,200,120,0.6) 45%, rgba(255,255,255,0.8) 50%, rgba(255,200,120,0.6) 55%, rgba(255,142,43,0.28) 80%, transparent)',
                filter: 'blur(5px)',
                transform: 'translateY(-50%) rotate(-20deg)',
              }}
            />
            <div
              ref={slashLineRef}
              className="absolute left-0 top-1/2 h-[3px] w-full origin-left"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(255,142,43,0.9) 12%, #fff 50%, rgba(255,142,43,0.9) 88%, transparent)',
                boxShadow:
                  '0 0 18px rgba(255,142,43,0.9), 0 0 40px rgba(255,200,100,0.5), 0 0 70px rgba(255,255,255,0.25)',
                transform: 'translateY(-50%) rotate(-20deg)',
              }}
            />

            {/* Sparks */}
            <div ref={sparksRef} className="absolute left-1/2 top-1/2">
              {Array.from({ length: 28 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width:  i % 5 === 0 ? '3px' : '2px',
                    height: i % 5 === 0 ? '3px' : '2px',
                    background: i % 3 === 0 ? '#fff' : i % 3 === 1 ? '#ff8e2b' : '#ffd59a',
                    boxShadow: `0 0 ${i % 3 === 0 ? 8 : 5}px ${i % 3 === 0 ? '#fff' : '#ff8e2b'}`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* ──────────────── SPLIT LINE ──────────────── */}
          <div
            ref={splitLineRef}
            className="pointer-events-none absolute left-1/2 top-0 z-30 h-full w-[2px] -translate-x-1/2"
            style={{
              background:
                'linear-gradient(180deg, transparent, rgba(255,142,43,0.6) 15%, rgba(255,255,255,0.95) 50%, rgba(255,142,43,0.6) 85%, transparent)',
              boxShadow: '0 0 16px rgba(255,142,43,0.7), 0 0 40px rgba(255,200,100,0.35)',
              transformOrigin: 'top center',
              willChange: 'transform, opacity',
            }}
          />

          {/* ──────────────── PROJECTS REVEAL ──────────────── */}
          <div
            ref={projectsOverlayRef}
            className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
            style={{ opacity: 0 }}
          >
            <div className="text-center px-4">
              <span className="section-label">Selected Work</span>
              <h2 className="section-title mt-3">Projects</h2>
              <p className="mt-4 text-ink-200">Continue scrolling to explore</p>
            </div>
          </div>

        </div>{/* shakeRef */}
      </div>{/* pinRef */}
    </div>
  );
}
