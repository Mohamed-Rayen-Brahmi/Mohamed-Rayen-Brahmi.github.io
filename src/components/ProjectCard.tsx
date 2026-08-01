import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { ArrowUpRight, Star, GitFork } from 'lucide-react';

export interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  topics: string[];
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

interface ProjectCardProps {
  repo: GithubRepo;
  index: number;
}

// Map some cool Kanji to specific projects or indices
const KANJI_MAP = ['斬', '影', '魂', '流'];

export default function ProjectCard({ repo, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rxSpring = useSpring(rx, { stiffness: 200, damping: 20 });
  const rySpring = useSpring(ry, { stiffness: 200, damping: 20 });
  
  // Spotlight tracking
  const springX = useSpring(mouseX, { stiffness: 400, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 400, damping: 25 });
  const maskImage = useMotionTemplate`radial-gradient(circle 200px at ${springX}px ${springY}px, black 40%, transparent 100%)`;

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    
    // Relative coordinates for the spotlight
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);

    // 3D rotation
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const maxRotate = 6;
    rx.set(((y - centerY) / centerY) * -maxRotate);
    ry.set(((x - centerX) / centerX) * maxRotate);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rx.set(0);
    ry.set(0);
  };

  const accentColor = index % 2 === 0 ? '#B01818' : '#ff8e2b';
  const kanji = KANJI_MAP[index % KANJI_MAP.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      className="perspective-1000"
    >
      <motion.a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX: rxSpring, rotateY: rySpring, transformStyle: 'preserve-3d' }}
        className="group relative flex min-h-[300px] w-full flex-col justify-between overflow-hidden border border-white/10 bg-ink-950 p-8 text-left transition-all duration-300 hover:border-white/20 cursor-crosshair"
        data-cursor="reveal"
      >
        {/* Animated Corner Brackets for that Samurai UI feel */}
        <div className="absolute left-0 top-0 z-20 h-4 w-4 border-l-2 border-t-2 border-white/20 transition-all duration-300 group-hover:border-[#B01818]" />
        <div className="absolute right-0 top-0 z-20 h-4 w-4 border-r-2 border-t-2 border-white/20 transition-all duration-300 group-hover:border-[#B01818]" />
        <div className="absolute bottom-0 left-0 z-20 h-4 w-4 border-b-2 border-l-2 border-white/20 transition-all duration-300 group-hover:border-[#B01818]" />
        <div className="absolute bottom-0 right-0 z-20 h-4 w-4 border-b-2 border-r-2 border-white/20 transition-all duration-300 group-hover:border-[#B01818]" />

        {/* Hidden Reveal Layer (Kanji) */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden bg-ink-900"
          style={{
            WebkitMaskImage: maskImage,
            maskImage: maskImage,
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        >
           <span className="text-[14rem] font-black leading-none text-[#B01818]/20 select-none transform rotate-12 scale-150">
             {kanji}
           </span>
           {/* Soft glow inside the mask */}
           <div className="absolute inset-0 bg-[#B01818]/10 mix-blend-overlay" />
        </motion.div>

        {/* Top Content */}
        <div style={{ transform: 'translateZ(30px)' }} className="relative z-10 pointer-events-none">
          <div className="mb-4 flex items-center justify-between">
            <span style={{ color: accentColor }} className="text-xs font-bold uppercase tracking-[0.2em]">
              Repository
            </span>
            <div className="flex gap-3 text-ink-300">
              <span className="flex items-center gap-1 text-xs">
                <Star className="h-3 w-3" /> {repo.stargazers_count}
              </span>
              <span className="flex items-center gap-1 text-xs">
                <GitFork className="h-3 w-3" /> {repo.forks_count}
              </span>
            </div>
          </div>
          
          <h3 className="mb-4 text-3xl font-black uppercase tracking-tight text-white transition-colors duration-300 group-hover:text-[#B01818]">
            {repo.name.replace(/-/g, ' ')}
          </h3>
          
          <p className="line-clamp-3 text-sm leading-relaxed text-ink-200">
            {repo.description || 'No description provided for this repository.'}
          </p>
        </div>

        {/* Bottom Content */}
        <div style={{ transform: 'translateZ(20px)' }} className="relative z-10 mt-8 flex items-end justify-between pointer-events-none">
          <div className="flex flex-wrap gap-2">
            {repo.language && (
              <span className="border border-white/10 bg-white/5 px-2 py-1 text-xs text-white">
                {repo.language}
              </span>
            )}
            {repo.topics?.slice(0, 3).map((topic) => (
              <span key={topic} className="border border-white/5 bg-transparent px-2 py-1 text-xs text-ink-300">
                {topic}
              </span>
            ))}
          </div>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-ink-900 transition-all duration-300 group-hover:scale-110 group-hover:border-[#B01818] group-hover:bg-[#B01818]">
            <ArrowUpRight className="h-5 w-5 text-white" />
          </div>
        </div>
      </motion.a>
    </motion.div>
  );
}
