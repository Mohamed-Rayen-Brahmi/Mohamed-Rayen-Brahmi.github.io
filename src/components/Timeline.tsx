import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const milestones = [
  {
    year: '2023',
    title: 'Began Information Systems Development',
    description:
      'Started my Diploma at the Higher Institute of Technological Studies of Mahdia, diving into Java, JavaScript, and full-stack fundamentals.',
  },
  {
    year: 'Jan 2024',
    title: 'First Industry Exposure',
    description:
      'IT & QA observation internship at Eleonetech, shadowing bug tracking and software testing workflows across the development lifecycle.',
  },
  {
    year: 'Jun 2025',
    title: 'AI-Powered Recruitment Platform',
    description:
      'Built Resume Scanner at MehdiSkills, combining Spring Boot, React, and NLP for automated resume-to-job matching.',
  },
  {
    year: 'Jan 2026',
    title: 'CIS ISET Bizerte Webmaster',
    description:
      "Took on the volunteer Webmaster role, redesigning the club's website and managing its digital presence.",
  },
  {
    year: 'Jun 2026',
    title: 'CloudVM & Graduation',
    description:
      'Delivered CloudVM — a self-hosted IaaS platform — as my final-year capstone at ReaddlyTech, and graduated with a Diploma in Information Systems Development from ISET Mahdia.',
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
          className="mb-20 text-center"
        >
          <span className="mb-4 block text-xs font-bold tracking-[0.3em] text-[#B01818]">
            五 · TIMELINE
          </span>
          <h2 className="text-5xl font-black uppercase tracking-tighter text-white sm:text-6xl lg:text-7xl">
            The Path
          </h2>
        </motion.div>

        <div ref={containerRef} className="relative mt-24">
          {/* Background Track */}
          <div className="absolute left-4 top-0 h-full w-px bg-white/5 md:left-1/2 md:-translate-x-1/2" />

          {/* Red Progress line */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-4 top-0 w-px bg-[#B01818] md:left-1/2 md:-translate-x-1/2"
          >
            <div
              className="absolute inset-0"
              style={{ boxShadow: '0 0 12px rgba(176,24,24,0.6)' }}
            />
          </motion.div>

          {/* Milestones */}
          <div className="space-y-16">
            {milestones.map((milestone, i) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
                className={`relative flex items-start gap-8 md:items-center ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Node */}
                <div className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center bg-ink-950 md:absolute md:left-1/2 md:-translate-x-1/2">
                  <div className="h-3 w-3 rotate-45 bg-[#B01818]" style={{ boxShadow: '0 0 8px rgba(176,24,24,0.8)' }} />
                </div>

                {/* Content */}
                <div className={`flex-1 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                  <div className="group relative border border-white/5 bg-ink-950 p-6 transition-colors hover:border-white/10">
                    {/* Hover bracket accents */}
                    <div className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-transparent transition-colors group-hover:border-[#B01818]" />
                    <div className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-transparent transition-colors group-hover:border-[#B01818]" />
                    
                    <span className="mb-2 block text-xs font-bold tracking-[0.2em] text-[#B01818]">
                      {milestone.year}
                    </span>
                    <h3 className="mb-3 text-xl font-black uppercase tracking-tight text-white transition-colors group-hover:text-[#B01818]">
                      {milestone.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-ink-300">
                      {milestone.description}
                    </p>
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
