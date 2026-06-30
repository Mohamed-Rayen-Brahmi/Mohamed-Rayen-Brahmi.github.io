import { motion } from 'framer-motion';
import { Code2, Gamepad2, Workflow, Monitor } from 'lucide-react';

const stats = [
  { value: 4, suffix: '+', label: 'Internships & Roles' },
  { value: 6, suffix: '+', label: 'Projects Built' },
  { value: 12, suffix: '+', label: 'Technologies' },
  { value: 100, suffix: '%', label: 'Dedication' },
];

const focusAreas = [
  { icon: Code2, label: 'Full-Stack Web Apps' },
  { icon: Gamepad2, label: 'Game Dev' },
  { icon: Workflow, label: 'Automation' },
  { icon: Monitor, label: 'Desktop & Mobile' },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="section-label">Get to know me</span>
          <h2 className="section-title mt-3">About Me</h2>
        </motion.div>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left - portrait/visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative mx-auto aspect-square max-w-md overflow-hidden rounded-3xl border border-white/10">
              <img
                src="https://res.cloudinary.com/dsjglgcnu/image/upload/v1782819555/a4940a18-5702-42b1-bb2a-3eb11ae677e4_jwjvhs.jpg"
                alt="Mohamed Rayen Brahmi"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-ember-500/10 to-steel-500/10 mix-blend-overlay" />
            </div>
          </motion.div>

          {/* Right - text + stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="mb-4 text-2xl font-bold text-white">
              Building scalable platforms, end to end
            </h3>
            <p className="mb-6 text-base leading-relaxed text-ink-200">
              I'm a results-driven Full-Stack Developer with hands-on experience building
              scalable web applications, AI-powered platforms, and cloud infrastructure. I work
              across Java (Spring Boot), React, Python, and cloud VM orchestration, and I enjoy
              owning a project from architecture all the way through deployment.
            </p>
            <p className="mb-8 text-base leading-relaxed text-ink-200">
              I'm currently finishing a Diploma in Information Systems Development at the Higher
              Institute of Technological Studies of Mahdia, alongside volunteering as webmaster
              for CIS ISET Bizerte. When I'm not shipping features, I'm exploring new
              technologies and looking for the next problem worth solving.
            </p>

            {/* Focus areas */}
            <div className="mb-8 grid grid-cols-2 gap-3">
              {focusAreas.map((area, i) => (
                <motion.div
                  key={area.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex items-center gap-3 rounded-xl border border-white/5 bg-ink-800/40 px-4 py-3 backdrop-blur-sm transition-colors hover:border-white/10"
                >
                  <area.icon className="h-5 w-5 text-ember-400" />
                  <span className="text-sm font-medium text-ink-100">{area.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-white">
                    {stat.value}
                    <span className="text-ember-400">{stat.suffix}</span>
                  </div>
                  <div className="mt-1 text-xs text-ink-300">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
