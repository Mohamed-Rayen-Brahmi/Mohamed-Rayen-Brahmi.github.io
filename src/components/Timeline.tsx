import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GraduationCap, Rocket, Award, Code } from 'lucide-react';

const milestones = [
  {
    year: '2023',
    title: 'Began Information Systems Development',
    description:
      'Started my Diploma at the Higher Institute of Technological Studies of Mahdia, diving into Java, JavaScript, and full-stack fundamentals. Graduated in 2026.',
    icon: Code,
  },
  {
    year: 'Jan 2024',
    title: 'First Industry Exposure',
    description:
      'IT & QA observation internship at Eleonetech, shadowing bug tracking and software testing workflows across the development lifecycle.',
    icon: Rocket,
  },
  {
    year: 'Jun 2025',
    title: 'AI-Powered Recruitment Platform',
    description:
      'Built Resume Scanner at MehdiSkills, combining Spring Boot, React, and NLP for automated resume-to-job matching.',
    icon: GraduationCap,
  },
  {
    year: 'Jan 2026',
    title: 'CIS ISET Bizerte Webmaster',
    description:
      "Took on the volunteer Webmaster role, redesigning the club's website and managing its digital presence.",
    icon: Award,
  },
  {
    year: 'Jun 2026',
    title: 'CloudVM & Graduation',
    description:
      'Delivered CloudVM — a self-hosted IaaS platform — as my final-year capstone at ReaddlyTech, and graduated with a Diploma in Information Systems Development from ISET Mahdia.',
    icon: GraduationCap,
  },
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 60%', 'end 40%'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="section-label">The road so far</span>
          <h2 className="section-title mt-3">Timeline</h2>
        </motion.div>

        <div ref={containerRef} className="relative">
          {/* Track */}
          <div className="absolute left-4 top-0 h-full w-px bg-ink-600 md:left-1/2 md:-translate-x-1/2" />

          {/* Progress line */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-4 top-0 w-px bg-gradient-to-b from-ember-400 to-ember-600 md:left-1/2 md:-translate-x-1/2"
          >
            <div
              className="absolute inset-0"
              style={{ boxShadow: '0 0 12px rgba(255,142,43,0.6)' }}
            />
          </motion.div>

          {/* Milestones */}
          <div className="space-y-12">
            {milestones.map((milestone, i) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
                className={`relative flex items-start gap-6 md:items-center ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Node */}
                <div className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-ember-400 bg-ink-950 md:absolute md:left-1/2 md:-translate-x-1/2">
                  <div className="h-2 w-2 rounded-full bg-ember-400" style={{ boxShadow: '0 0 8px rgba(255,142,43,0.8)' }} />
                </div>

                {/* Content card */}
                <div className={`flex-1 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                  <div className="rounded-2xl border border-white/5 bg-ink-800/40 p-5 backdrop-blur-sm transition-colors hover:border-white/10">
                    <div className={`mb-2 flex items-center gap-2 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <milestone.icon className="h-4 w-4 text-ember-400" />
                      <span className="text-sm font-bold text-ember-400">{milestone.year}</span>
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-white">{milestone.title}</h3>
                    <p className="text-sm leading-relaxed text-ink-200">{milestone.description}</p>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden flex-1 md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
