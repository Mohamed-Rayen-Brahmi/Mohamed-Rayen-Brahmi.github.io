import { motion } from 'framer-motion';
import ProjectCard, { type GithubRepo } from './ProjectCard';

// Hardcoded curated projects requested by the user
const CURATED_PROJECTS: GithubRepo[] = [
  {
    id: 5,
    name: 'Mission Carthage',
    status: 'Live',
    image: '/projects/mission-carthage.webp',
    description: 'Coding platform I co-founded and built for Tunisian high-school students: nearly 500 accounts and 8,600 visits last month. A course, 152 game missions, an online compiler and corrected exams, with Python, C, PHP and MySQL running in the browser.',
    html_url: 'https://missioncarthage.tn',
    homepage: 'https://missioncarthage.tn',
    topics: ['React', 'Pyodide', 'Cloudflare D1', 'PWA'],
    language: 'TypeScript',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: new Date().toISOString(),
  },
  {
    id: 1,
    name: 'CloudVM',
    status: 'Internship project',
    image: 'https://res.cloudinary.com/dsjglgcnu/image/upload/c_fill,w_960,h_540,g_north,f_auto,q_auto/v1782813359/Capture_d_%C3%A9cran_2026-06-16_112745_h5zn6v.png',
    description: 'Final-year project at ReaddlyTech: a cloud platform to create, monitor and manage virtual machines from a web interface. Microservices on Docker, PostgreSQL and Redis, JWT / MFA / OAuth2 auth with RBAC, and Stripe billing.',
    html_url: 'https://github.com/Mohamed-Rayen-Brahmi',
    homepage: '',
    topics: ['NestJS', 'Next.js', 'Python', 'Docker', 'Redis'],
    language: 'TypeScript',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: new Date().toISOString(),
  },
  {
    id: 6,
    name: 'Teach2Reach',
    status: 'Live',
    image: '/projects/teach2reach.webp',
    description: 'Official website for Teach2Reach, the AI for education hackathon at ISET Bizerte, organized by IEEE CIS, IEEE WIE and SOS ISET Bizerte. A date-aware one-pager with countdown, teaser video and strict security headers, deployed on Cloudflare Pages.',
    html_url: 'https://teach2reach.pages.dev',
    homepage: 'https://teach2reach.pages.dev',
    topics: ['HTML/CSS', 'Cloudflare Pages', 'Event Site'],
    language: 'JavaScript',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Golazio',
    status: 'Live',
    image: '/projects/golazio.webp',
    description: 'Real-time multiplayer football quiz (formerly FUTIQ). Players join game rooms and play live against each other, with a daily challenge to come back for.',
    html_url: 'https://golazio.me/',
    homepage: 'https://golazio.me/',
    topics: ['Next.js', 'WebSockets', 'Real-time'],
    language: 'TypeScript',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: new Date().toISOString(),
  },
  {
    id: 7,
    name: 'Sticky Summit',
    status: 'In development',
    image: '/projects/sticky-summit.webp',
    description: 'Slime rage-climber for web game portals, in development in Godot 4. Fling a sticky slime up a 150 m tower through five zones of butter ice, jelly pads, conveyor belts, fans and spikes. Built for CrazyGames.',
    html_url: 'https://github.com/Mohamed-Rayen-Brahmi',
    homepage: '',
    topics: ['Godot 4', 'HTML5 Game', 'Game Design'],
    language: 'GDScript',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: new Date().toISOString(),
  },
  {
    id: 8,
    name: 'Afterhours',
    status: 'In development',
    image: '/projects/afterhours.webp',
    description: 'Co-op horror-comedy for Android, in development in Unity 6. One to six recovery workers grab, carry and throw physics-driven loot out of abandoned facilities while dodging monsters, with online multiplayer and solo play.',
    html_url: 'https://github.com/Mohamed-Rayen-Brahmi',
    homepage: '',
    topics: ['Unity 6', 'Netcode', 'Android'],
    language: 'C#',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: new Date().toISOString(),
  },
  {
    id: 9,
    name: 'CivicBot',
    status: 'Project',
    image: '/projects/civicbot.webp',
    description: 'Software for a semi-autonomous, multilingual robot. It spots incidents on camera with YOLOv8 and answers people by voice in several languages, using Whisper and a local Phi-3 model through Ollama.',
    html_url: 'https://github.com/Mohamed-Rayen-Brahmi',
    homepage: '',
    topics: ['YOLOv8', 'Whisper', 'Ollama', 'IoT'],
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: new Date().toISOString(),
  },
  {
    id: 10,
    name: 'MedTun',
    status: 'Project',
    image: 'https://res.cloudinary.com/dsjglgcnu/image/upload/c_fill,w_960,h_540,g_north,f_auto,q_auto/v1782813200/image_original_qx0wgx.png',
    description: 'Medical appointment booking platform: a Spring Boot REST API with JWT authentication and role-based access for patients, doctors and admins, and a React interface.',
    html_url: 'https://github.com/Mohamed-Rayen-Brahmi',
    homepage: '',
    topics: ['Spring Boot', 'React', 'MySQL', 'JWT'],
    language: 'Java',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: new Date().toISOString(),
  },
];

export default function Projects() {
  // Alternate cards between the two columns so the list reads in order, left then right
  const leftProjects = CURATED_PROJECTS.filter((_, i) => i % 2 === 0);
  const rightProjects = CURATED_PROJECTS.filter((_, i) => i % 2 === 1);

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
          From ed-tech used by real students and cloud infrastructure to applied AI and games in the making.
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
              <ProjectCard key={repo.id} repo={repo} index={i * 2} />
            ))}
          </div>

          {/* Right panel */}
          <div className="space-y-8 lg:mt-24">
            {rightProjects.map((repo, i) => (
              <ProjectCard key={repo.id} repo={repo} index={i * 2 + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
