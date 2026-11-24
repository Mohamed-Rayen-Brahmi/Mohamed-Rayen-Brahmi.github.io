import { motion } from 'framer-motion';

const experiences = [
  {
    role: 'Developer',
    company: 'Mission Carthage · missioncarthage.tn',
    period: 'Oct 2026 — Present',
    description:
      'A coding platform for Tunisian high-school students, from 2ème année to the bac: a course, 152 game missions, an online compiler and corrected exam papers. Nearly 500 accounts and 8,600 visits in the last month.',
    achievements: [
      'Built the whole app: React, TypeScript, Vite and Tailwind CSS on the client, a REST API on Cloudflare Pages Functions with D1 (SQLite) and R2, Google and Microsoft OAuth, payments and an admin panel',
      'Student code runs in the browser with no server: Python through Pyodide, plus a compiler for the school "Algo" notation, a C interpreter, a PHP interpreter and a MySQL engine I wrote myself',
      'More than 1,400 automated tests (Vitest): every exercise correction is executed before each release',
      'November 2026: launched a second, paid space for university students (fac.missioncarthage.tn)',
    ],
  },
  {
    role: 'Software Development Intern — Final Year Project',
    company: 'ReaddlyTech · Tunisia',
    period: 'Feb 2026 — Jun 2026',
    description:
      'A cloud platform for managing virtual machines (NestJS, Next.js, Python): creating, monitoring and controlling the VM lifecycle from a web interface.',
    achievements: [
      'Microservices architecture with Docker, PostgreSQL and Redis',
      'JWT, MFA and OAuth2 authentication with role-based access control (RBAC)',
      'Subscription billing with Stripe',
    ],
  },
  {
    role: 'Freelance Full-Stack Developer',
    company: 'Remote · International clients',
    period: '2023 — Present',
    description:
      'React and Node.js development for clients abroad.',
    achievements: [
      'Wrote end-to-end Playwright tests for an online auction site (GunAuction)',
    ],
  },
  {
    role: 'Webmaster (Volunteer)',
    company: 'CIS ISET Bizerte · Tunisia',
    period: 'Jan 2026 — Present',
    description:
      "Maintaining and redesigning the club's website.",
    achievements: [
      "Redesigned the club website's visual identity and UI",
      'Built teach2reach.pages.dev, the website for Teach2Reach, the AI for education hackathon run by IEEE CIS, IEEE WIE and SOS ISET Bizerte',
    ],
  },
  {
    role: 'Software Development Intern',
    company: 'MehdiSkills · Tunisia',
    period: 'Jun 2025',
    description:
      'Built Resume Scanner (Spring Boot, React, Python / Flask), which reads the skills out of a CV and ranks candidates against a job offer.',
    achievements: [
      'NLP skill extraction from resumes in Python / Flask',
      'Candidate ranking by cosine similarity with the job offer, shown in a React interface backed by Spring Boot',
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <span className="mb-4 block text-xs font-bold tracking-[0.3em] text-[#B01818]">
            四 · JOURNEY
          </span>
          <h2 className="text-5xl font-black uppercase tracking-tighter text-white sm:text-6xl lg:text-7xl">
            Experience
          </h2>
        </motion.div>

        <div className="space-y-6">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.role}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative border border-white/10 bg-ink-950 p-8 transition-colors hover:border-white/20"
            >
              {/* Corner brackets */}
              <div className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-white/10 transition-colors group-hover:border-[#B01818]" />
              <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-white/10 transition-colors group-hover:border-[#B01818]" />

              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <div className="mb-4">
                    <h3 className="text-2xl font-black uppercase tracking-tight text-white transition-colors group-hover:text-[#B01818]">
                      {exp.role}
                    </h3>
                    <p className="mt-1 text-sm font-bold uppercase tracking-wider text-ink-400">
                      {exp.company}
                    </p>
                  </div>
                  
                  <p className="mb-6 text-sm leading-relaxed text-ink-300">
                    {exp.description}
                  </p>
                  
                  <ul className="space-y-3">
                    {exp.achievements.map((achievement, ai) => (
                      <li key={ai} className="flex items-start gap-3 text-sm text-ink-200">
                        <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rotate-45 bg-[#B01818]" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <span className="flex-shrink-0 border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white">
                  {exp.period}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
