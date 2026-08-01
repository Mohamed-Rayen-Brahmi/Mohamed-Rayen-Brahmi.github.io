import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Github, Linkedin, ArrowRight, Check } from 'lucide-react';

const EMAILJS_SERVICE_ID = 'service_atgzwba';
const EMAILJS_TEMPLATE_ID = 'template_2kevojq';
const EMAILJS_PUBLIC_KEY = '8XeV0sz26KT_gGJvO';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  
  // Reveal Logic for Header
  const headerRef = useRef<HTMLHeadingElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 400, damping: 25 });
  const springY = useSpring(y, { stiffness: 400, damping: 25 });
  const maskImage = useMotionTemplate`radial-gradient(circle 80px at ${springX}px ${springY}px, black 100%, transparent 100%)`;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!headerRef.current) return;
    const rect = headerRef.current.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          to_email: 'brahmi.mouhamedrayen@hotmail.com',
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      );
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const socials = [
    { icon: Github, href: 'https://github.com/Mohamed-Rayen-Brahmi', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/mouhamed-rayen-brahmi', label: 'LinkedIn' },
  ];

  return (
    <section id="contact" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <span className="mb-4 block text-xs font-bold tracking-[0.3em] text-[#B01818]">
            六 · CONTACT
          </span>
          <div className="relative inline-block">
            <h2 
              ref={headerRef}
              onMouseMove={handleMouseMove}
              data-cursor="reveal"
              className="text-5xl font-black uppercase tracking-tighter text-ink-800 sm:text-6xl lg:text-7xl cursor-crosshair relative z-10"
            >
              Signal
            </h2>
            {/* Reveal Layer */}
            <motion.h2 
              className="absolute top-0 left-0 text-5xl font-black uppercase tracking-tighter text-[#B01818] sm:text-6xl lg:text-7xl pointer-events-none z-20"
              style={{
                WebkitMaskImage: maskImage,
                maskImage: maskImage
              }}
            >
              Signal
            </motion.h2>
          </div>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            <h3 className="mb-8 text-2xl font-black uppercase tracking-tight text-white">
              Direct Line
            </h3>
            
            <div className="space-y-8">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#B01818]">Email</p>
                <a
                  href="mailto:brahmi.mouhamedrayen@hotmail.com"
                  className="text-lg font-medium text-white transition-colors hover:text-[#B01818]"
                >
                  brahmi.mouhamedrayen@hotmail.com
                </a>
              </div>

              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#B01818]">Phone</p>
                <a
                  href="tel:+21694729469"
                  className="text-lg font-medium text-white transition-colors hover:text-[#B01818]"
                >
                  +216 94 729 469
                </a>
              </div>

              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#B01818]">Location</p>
                <p className="text-lg font-medium text-white">Bizerte, Tunisia</p>
              </div>

              <div className="pt-8">
                <div className="flex gap-4">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-12 w-12 items-center justify-center border border-white/10 bg-ink-950 text-white transition-all hover:border-[#B01818] hover:bg-[#B01818]"
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="group">
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="NAME"
                  className="w-full border-b border-white/20 bg-transparent px-0 py-4 text-sm font-medium uppercase tracking-wider text-white placeholder-ink-500 outline-none transition-colors focus:border-[#B01818]"
                  required
                />
              </div>
              
              <div className="group">
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="EMAIL"
                  className="w-full border-b border-white/20 bg-transparent px-0 py-4 text-sm font-medium uppercase tracking-wider text-white placeholder-ink-500 outline-none transition-colors focus:border-[#B01818]"
                  required
                />
              </div>
              
              <div className="group">
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="MESSAGE"
                  rows={4}
                  className="w-full resize-none border-b border-white/20 bg-transparent px-0 py-4 text-sm font-medium uppercase tracking-wider text-white placeholder-ink-500 outline-none transition-colors focus:border-[#B01818]"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={status !== 'idle'}
                className="group relative flex w-full items-center justify-between border border-[#B01818] bg-[#B01818]/10 px-8 py-4 text-sm font-bold uppercase tracking-widest text-[#B01818] transition-colors hover:bg-[#B01818] hover:text-white disabled:opacity-50"
              >
                <span>
                  {status === 'idle' ? 'Transmit' : status === 'sending' ? 'Transmitting...' : status === 'sent' ? 'Received' : 'Error'}
                </span>
                {status === 'sent' ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
