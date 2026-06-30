import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';

export default function Projects() {
  const leftProjects = [projects[0], projects[1]];
  const rightProjects = [projects[2], projects[3]];

  return (
    <section id="projects" className="relative min-h-screen py-24 lg:py-32">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mx-auto mb-16 max-w-7xl px-6 text-center lg:px-10"
      >
        <h2 className="section-title mt-3">Projects</h2>
        
      </motion.div>

      {/* Split panels with glowing divider */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Glowing split line (persistent from slash) */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 lg:block"
          style={{
            background:
              'linear-gradient(180deg, transparent, rgba(255,142,43,0.4) 15%, rgba(255,255,255,0.6) 50%, rgba(255,142,43,0.4) 85%, transparent)',
            boxShadow: '0 0 12px rgba(255,142,43,0.4)',
          }}
        />

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Left panel */}
          <div className="space-y-8">
            {leftProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>

          {/* Right panel */}
          <div className="space-y-8">
            {rightProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i + 2} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
