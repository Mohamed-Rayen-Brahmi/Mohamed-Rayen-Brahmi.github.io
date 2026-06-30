import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../data/projects';
import { usePortfolio } from '../context/PortfolioContext';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { openProject } = usePortfolio();
  const cardRef = useRef<HTMLButtonElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rxSpring = useSpring(rx, { stiffness: 200, damping: 20 });
  const rySpring = useSpring(ry, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const maxRotate = 8;
    rx.set(((y - centerY) / centerY) * -maxRotate);
    ry.set(((x - centerX) / centerX) * maxRotate);
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  const accentColor = project.accent === 'ember' ? '#ff8e2b' : '#6f8aa3';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      className="perspective-1000"
    >
      <motion.button
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => openProject(index)}
        style={{ rotateX: rxSpring, rotateY: rySpring, transformStyle: 'preserve-3d' }}
        className="group relative w-full overflow-hidden rounded-2xl border border-white/5 bg-ink-800/40 p-5 text-left backdrop-blur-sm transition-all duration-300 hover:border-white/10 hover:shadow-glow-lg"
        data-cursor="hover"
      >
        {/* Moving light reflection */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle 200px at ${mousePos.x}px ${mousePos.y}px, ${accentColor}15, transparent 60%)`,
          }}
        />

        {/* Thumbnail */}
        <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-xl">
          <img
            src={project.thumbnail}
            alt={project.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
          {/* Accent glow on hover */}
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ boxShadow: `inset 0 0 30px ${accentColor}30` }}
          />
          {/* Arrow icon */}
          <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-ink-950/60 backdrop-blur-sm transition-all duration-300 group-hover:bg-ink-950/80 group-hover:scale-110">
            <ArrowUpRight className="h-4 w-4 text-white" />
          </div>
        </div>

        {/* Content */}
        <div style={{ transform: 'translateZ(40px)' }}>
          <p
            className="mb-1 text-xs font-medium uppercase tracking-wider"
            style={{ color: accentColor }}
          >
            {project.tagline}
          </p>
          <h3 className="mb-2 text-xl font-bold text-white transition-colors group-hover:text-white">
            {project.name}
          </h3>
          <p className="mb-3 text-sm leading-relaxed text-ink-200 line-clamp-2">
            {project.shortDescription}
          </p>

          {/* Tech chips */}
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-white/5 bg-white/5 px-2 py-0.5 text-xs text-ink-200"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="rounded-md border border-white/5 bg-white/5 px-2 py-0.5 text-xs text-ink-300">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
}
