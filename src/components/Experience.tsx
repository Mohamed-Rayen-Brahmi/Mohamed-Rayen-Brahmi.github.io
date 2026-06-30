import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const experiences = [
  {
    role: 'Software Development Intern — Final Year Project',
    company: 'ReaddlyTech · Tunisia',
    period: 'Feb 2026 — Jun 2026',
    description:
      'Designed and built a Cloud VM Management Platform enabling provisioning, monitoring, and lifecycle control of virtual machines via a web interface.',
    achievements: [
      'Implemented backend services with Spring Boot and REST APIs to interface with cloud infrastructure, handling VM creation, start/stop, and resource tracking',
      'Developed a responsive React dashboard for real-time VM status, metrics visualization, and admin controls',
      'Integrated authentication and role-based access control (RBAC) for secure multi-user environments',
      'Delivered a fully functional platform as the capstone of the Information Systems Development program',
    ],
  },
  {
    role: 'Webmaster (Volunteer)',
    company: 'CIS ISET Bizerte · Tunisia',
    period: 'Jan 2026 — Present',
    description:
      'Managing and maintaining the official CIS ISET Bizerte website, ensuring an up-to-date and professional online presence.',
    achievements: [
      "Redesigned and enhanced the website's visual identity, improving UI/UX and overall aesthetics",
      'Handle all social media accounts, creating and publishing engaging content to grow community reach',
      "Coordinate digital communications between the club and its student audience across multiple platforms",
    ],
  },
  {
    role: 'Software Development Intern',
    company: 'MehdiSkills · Tunisia',
    period: 'Jun 2025',
    description:
      'Built Resume Scanner, an AI-powered recruitment platform for automated resume–job description matching.',
    achievements: [
      'Integrated NLP-based skill extraction and cosine similarity scoring using Python (Flask microservice)',
      'Connected a Spring Boot backend with a React frontend for real-time AI-driven candidate ranking',
      'Reduced manual screening effort significantly by automating keyword extraction and similarity analysis',
    ],
  },
  {
    role: 'IT & QA Intern (Observation)',
    company: 'Eleonetech · Tunisia',
    period: 'Jan 2024',
    description:
      'Shadowed bug tracking and software testing workflows, gaining exposure to the full software development lifecycle.',
    achievements: [
      'Participated in QA sessions covering test case writing, defect reporting, and issue triage',
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
          className="mb-16 text-center"
        >
          <span className="section-label">Career journey</span>
          <h2 className="section-title mt-3">Experience</h2>
        </motion.div>

        <div className="space-y-6">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.role}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative rounded-2xl border border-white/5 bg-ink-800/40 p-6 backdrop-blur-sm transition-all hover:border-white/10 hover:bg-ink-800/60 md:p-8"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-ink-700/50">
                      <Briefcase className="h-5 w-5 text-ember-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                      <p className="text-sm text-steel-300">{exp.company}</p>
                    </div>
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-ink-200">{exp.description}</p>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, ai) => (
                      <li key={ai} className="flex items-start gap-2 text-sm text-ink-100">
                        <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-ember-400" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
                <span className="flex-shrink-0 rounded-full border border-white/10 bg-ink-700/50 px-4 py-1.5 text-xs font-medium text-steel-200">
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
