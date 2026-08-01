import { motion } from 'framer-motion';
import ProjectCard, { type GithubRepo } from './ProjectCard';

// Hardcoded curated projects requested by the user
const CURATED_PROJECTS: GithubRepo[] = [
  {
    id: 1,
    name: 'CloudVM',
    description: 'A self-hosted Infrastructure-as-a-Service (IaaS) platform built for VM provisioning and lifecycle control. Features browser-based SSH/VNC, real-time monitoring, and Stripe billing.',
    html_url: 'https://github.com/Mohamed-Rayen-Brahmi',
    homepage: '',
    topics: ['NestJS', 'Spring Boot', 'React', 'OpenNebula', 'Docker'],
    language: 'TypeScript',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Golazio',
    description: 'Live interactive platform (formerly futIQ). Built for high-performance delivery and sleek user experience.',
    html_url: 'https://golazio.me/',
    homepage: 'https://golazio.me/',
    topics: ['React', 'Next.js', 'Tailwind', 'Framer Motion'],
    language: 'TypeScript',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    name: 'DevQuest',
    description: 'Gamified developer career networking RPG platform concept where developer profiles function as character classes that gain XP through real-world achievements.',
    html_url: 'https://github.com/Mohamed-Rayen-Brahmi',
    homepage: '',
    topics: ['React', 'Node.js', 'Tailwind CSS', 'Gamification'],
    language: 'JavaScript',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: new Date().toISOString(),
  },
  {
    id: 4,
    name: 'CV Generator',
    description: 'Automated platform to instantly generate professional, ATS-friendly CVs. Features dynamic templating and data extraction.',
    html_url: 'https://github.com/Mohamed-Rayen-Brahmi',
    homepage: '',
    topics: ['React', 'PDF Generation', 'Tailwind CSS'],
    language: 'TypeScript',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: new Date().toISOString(),
  },
];

export default function Projects() {
  const leftProjects = CURATED_PROJECTS.slice(0, 2);
  const rightProjects = CURATED_PROJECTS.slice(2, 4);

  return (
    <section id="projects" className="relative min-h-screen py-24 lg:py-32">
      {/* Editorial Chapter Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mx-auto mb-20 max-w-7xl px-6 text-center lg:px-10"
      >
        <span className="mb-4 block text-xs font-bold tracking-[0.3em] text-[#B01818]">
          二 · PROJECTS
        </span>
        <h2 className="text-5xl font-black uppercase tracking-tighter text-white sm:text-6xl lg:text-7xl">
          The Arsenal
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-ink-300">
          Curated projects and live platforms forged with precision. 
          From cloud infrastructure to gamified networking and production-ready applications.
        </p>
      </motion.div>

      {/* Split panels with glowing divider */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Glowing split line (persistent from slash) */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 lg:block"
          style={{
            background:
              'linear-gradient(180deg, transparent, rgba(176,24,24,0.4) 15%, rgba(255,255,255,0.6) 50%, rgba(176,24,24,0.4) 85%, transparent)',
            boxShadow: '0 0 12px rgba(176,24,24,0.4)',
          }}
        />

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Left panel */}
          <div className="space-y-8">
            {leftProjects.map((repo, i) => (
              <ProjectCard key={repo.id} repo={repo} index={i} />
            ))}
          </div>

          {/* Right panel */}
          <div className="space-y-8 lg:mt-24">
            {rightProjects.map((repo, i) => (
              <ProjectCard key={repo.id} repo={repo} index={i + 2} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
