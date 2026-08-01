import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: 'Languages',
    skills: ['Java', 'TypeScript', 'JavaScript', 'Python', 'Kotlin', 'C#'],
  },
  {
    title: 'Frontend',
    skills: ['React', 'Next.js', 'Angular', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    title: 'Backend',
    skills: ['Spring Boot', 'NestJS', 'Node.js', 'Flask', 'NATS JetStream'],
  },
  {
    title: 'Infra & DB',
    skills: ['Docker', 'PostgreSQL', 'MySQL', 'Redis', 'OpenNebula/KVM'],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <span className="mb-4 block text-xs font-bold tracking-[0.3em] text-[#B01818]">
            三 · CAPABILITIES
          </span>
          <h2 className="text-5xl font-black uppercase tracking-tighter text-white sm:text-6xl lg:text-7xl">
            The Armory
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((category, ci) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: ci * 0.1 }}
              className="group relative border border-white/10 bg-ink-950 p-8 transition-colors hover:border-white/20"
            >
              {/* Corner brackets */}
              <div className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-white/20 transition-colors group-hover:border-[#B01818]" />
              
              <h3 className="mb-8 text-sm font-bold uppercase tracking-[0.2em] text-[#B01818]">
                {category.title}
              </h3>
              
              <div className="flex flex-col space-y-4">
                {category.skills.map((skill) => (
                  <div 
                    key={skill}
                    className="flex items-center justify-between border-b border-white/5 pb-2 text-white transition-colors group-hover:border-white/10"
                  >
                    <span className="font-medium tracking-wide">{skill}</span>
                    <span className="text-xs text-ink-500">◆</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
