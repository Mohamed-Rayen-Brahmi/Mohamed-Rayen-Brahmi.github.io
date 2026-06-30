import { motion } from 'framer-motion';
import { Swords, ArrowUp, Github, Linkedin } from 'lucide-react';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

const socials = [
  { icon: Github, href: 'https://github.com/Mohamed-Rayen-Brahmi', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/mouhamed-rayen-brahmi', label: 'LinkedIn' },
];

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative border-t border-white/5 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <Swords className="h-5 w-5 text-ember-400" />
            <span className="text-sm font-semibold tracking-widest text-ink-100 uppercase">
              Mohamed Rayen Brahmi
            </span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-sm text-ink-200 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-ink-200 transition-all hover:border-ember-400/40 hover:text-ember-400"
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <p className="text-xs text-ink-300">
            © {new Date().getFullYear()} Mohamed Rayen Brahmi. All rights reserved.
          </p>
          <p className="text-xs text-ink-300">
            Crafted with precision, inspired by the way of the blade.
          </p>
          <motion.button
            onClick={scrollTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-ink-100 transition-all hover:border-ember-400/40 hover:text-ember-400"
          >
            Back to top
            <ArrowUp className="h-3 w-3" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
