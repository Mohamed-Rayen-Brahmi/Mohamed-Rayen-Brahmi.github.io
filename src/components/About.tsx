import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { useRef, useState } from 'react';

export default function About() {
  // Reveal Logic
  const imageRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Smooth out the mouse following
  const springX = useSpring(x, { stiffness: 400, damping: 25 });
  const springY = useSpring(y, { stiffness: 400, damping: 25 });
  const maskImage = useMotionTemplate`radial-gradient(circle 160px at ${springX}px ${springY}px, black 40%, transparent 100%)`;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <section id="about" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <span className="mb-4 block text-xs font-bold tracking-[0.3em] text-[#B01818]">
            一 · ABOUT
          </span>
          <h2 className="text-5xl font-black uppercase tracking-tighter text-white sm:text-6xl lg:text-7xl">
            The Architect
          </h2>
        </motion.div>

        <div className="grid items-start gap-16 lg:grid-cols-2">
          {/* Left - portrait/visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div 
              ref={imageRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              data-cursor="reveal"
              className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden bg-ink-950 cursor-crosshair group"
            >
              {/* Corner brackets */}
              <div className="absolute left-0 top-0 z-20 h-6 w-6 border-l-2 border-t-2 border-[#B01818]" />
              <div className="absolute bottom-0 right-0 z-20 h-6 w-6 border-b-2 border-r-2 border-[#B01818]" />
              
              {/* Base Image: Normal Photo (Removed grayscale to make you look alive!) */}
              <img
                src="https://res.cloudinary.com/dsjglgcnu/image/upload/v1782819555/a4940a18-5702-42b1-bb2a-3eb11ae677e4_jwjvhs.jpg"
                alt="Mohamed Rayen Brahmi"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent z-10" />

              {/* Reveal Layer: Cyberpunk Samurai Mask */}
              <motion.div
                className="pointer-events-none absolute inset-0 z-10 bg-ink-950"
                style={{
                  WebkitMaskImage: maskImage,
                  maskImage: maskImage,
                  opacity: isHovered ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src="/samurai_mask_reveal.jpg" 
                  alt="Alter Ego"
                  className="h-full w-full object-cover"
                />
                {/* Intense red overlay for the vibe */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#B01818]/20 to-[#B01818]/60 mix-blend-overlay" />
              </motion.div>
            </div>
            
            {/* Background typographic accent */}
            <div className="pointer-events-none absolute -left-12 -top-12 -z-10 select-none text-[12rem] font-black leading-none text-white/5 mix-blend-overlay">
              M.R.B
            </div>
          </motion.div>

          {/* Right - text content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="pt-8"
          >
            <h3 className="mb-8 text-3xl font-black uppercase tracking-tight text-white">
              Forging <span className="text-[#B01818]">Scalable</span> Systems
            </h3>
            
            <div className="space-y-6 text-base leading-relaxed text-ink-300">
              <p>
                I'm a Full-Stack Developer who treats code like a blade—it must be sharp, 
                efficient, and meticulously crafted. My expertise lies in building scalable web applications, 
                AI-powered platforms, and complex cloud infrastructure.
              </p>
              <p>
                Operating across the stack with Java (Spring Boot), React, Next.js, Python, and cloud VM orchestration. 
                I don't just write code; I architect systems that solve real problems.
              </p>
              <p>
                I hold a degree in Information Systems Development from ISET Mahdia (2026), and currently serve as 
                Webmaster for CIS ISET Bizerte.
              </p>
            </div>

            {/* Aesthetic Stats block without generic progress bars */}
            <div className="mt-12 grid grid-cols-2 gap-8 border-t border-white/10 pt-12">
              <div>
                <div className="text-4xl font-black text-white">04<span className="text-[#B01818]">+</span></div>
                <div className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-ink-400">Professional Roles</div>
              </div>
              <div>
                <div className="text-4xl font-black text-white">12<span className="text-[#B01818]">+</span></div>
                <div className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-ink-400">Core Technologies</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
