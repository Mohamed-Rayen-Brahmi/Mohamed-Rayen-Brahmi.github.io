import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: 'Languages',
    skills: [
      { name: 'Java', level: 90 },
      { name: 'JavaScript', level: 88 },
      { name: 'Python', level: 85 },
      { name: 'Kotlin', level: 70 },
      { name: 'C#', level: 65 },
    ],
  },
  {
    title: 'Frontend',
    skills: [
      { name: 'React', level: 90 },
      { name: 'Next.js', level: 82 },
      { name: 'Angular', level: 75 },
      { name: 'HTML5 / CSS3', level: 92 },
      { name: 'Bootstrap', level: 85 },
    ],
  },
  {
    title: 'Backend & Databases',
    skills: [
      { name: 'Spring Boot', level: 88 },
      { name: 'NestJS', level: 80 },
      { name: 'Flask', level: 75 },
      { name: 'MySQL', level: 85 },
      { name: 'Firebase Firestore', level: 78 },
    ],
  },
  {
    title: 'Cloud, AI & Tools',
    skills: [
      { name: 'Docker', level: 80 },
      { name: 'REST APIs', level: 90 },
      { name: 'NLP / Cosine Similarity', level: 78 },
      { name: 'Git & GitHub', level: 90 },
      { name: 'Unity', level: 65 },
    ],
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
          className="mb-16 text-center"
        >
          <span className="section-label">Technical expertise</span>
          <h2 className="section-title mt-3">Skills</h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-200">
            A versatile toolkit spanning the full stack, from pixel-perfect interfaces to
            distributed backends.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((category, ci) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: ci * 0.1 }}
              className="rounded-2xl border border-white/5 bg-ink-800/40 p-6 backdrop-blur-sm transition-colors hover:border-white/10"
            >
              <h3 className="mb-6 text-lg font-bold text-white">{category.title}</h3>
              <div className="space-y-4">
                {category.skills.map((skill, si) => (
                  <div key={skill.name}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-sm font-medium text-ink-100">{skill.name}</span>
                      <span className="text-xs text-ink-300">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-600">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: ci * 0.1 + si * 0.05, ease: 'easeOut' }}
                        className="h-full rounded-full bg-gradient-to-r from-ember-500 to-ember-400"
                        style={{ boxShadow: '0 0 8px rgba(255,142,43,0.4)' }}
                      />
                    </div>
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
