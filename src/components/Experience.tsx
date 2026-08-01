import { motion } from 'framer-motion';

const experiences = [
  {
    role: 'Software Development Intern — Final Year Project',
    company: 'ReaddlyTech · Tunisia',
    period: 'Feb 2026 — Jun 2026',
    description:
      'Designed and built a Cloud VM Management Platform enabling provisioning, monitoring, and lifecycle control of virtual machines via a web interface.',
    achievements: [
      'Implemented backend services with Spring Boot and REST APIs to interface with cloud infrastructure',
      'Developed a responsive React dashboard for real-time VM status and admin controls',
      'Integrated authentication and role-based access control (RBAC)',
    ],
  },
  {
    role: 'Webmaster (Volunteer)',
    company: 'CIS ISET Bizerte · Tunisia',
    period: 'Jan 2026 — Present',
    description:
      'Managing and maintaining the official CIS ISET Bizerte website, ensuring an up-to-date and professional online presence.',
    achievements: [
      "Redesigned and enhanced the website's visual identity, improving UI/UX",
      'Coordinate digital communications between the club and its student audience',
    ],
  },
  {
    role: 'Software Development Intern',
    company: 'MehdiSkills · Tunisia',
    period: 'Jun 2025',
    description:
      'Built Resume Scanner, an AI-powered recruitment platform for automated resume–job description matching.',
    achievements: [
      'Integrated NLP-based skill extraction and cosine similarity scoring using Python',
      'Connected a Spring Boot backend with a React frontend for real-time candidate ranking',
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
