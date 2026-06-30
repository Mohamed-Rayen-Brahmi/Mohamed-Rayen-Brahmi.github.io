import { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Mail, MapPin, Phone, Send, Github, Linkedin, Check, AlertCircle } from 'lucide-react';

/**
 * EmailJS configuration
 * ----------------------
 * 1. Create a free account at https://www.emailjs.com
 * 2. Email Services tab -> Add New Service (connect your Hotmail/Gmail) -> copy the Service ID below
 * 3. Email Templates tab -> Create New Template using variables {{from_name}}, {{from_email}}, {{message}}
 *    -> copy the Template ID below
 * 4. Account -> General -> copy your Public Key below
 * These three values are meant to be public/client-side, that's how EmailJS is designed to work.
 */
const EMAILJS_SERVICE_ID = 'service_atgzwba';
const EMAILJS_TEMPLATE_ID = 'template_2kevojq';
const EMAILJS_PUBLIC_KEY = '8XeV0sz26KT_gGJvO';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

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
          className="mb-16 text-center"
        >
          <span className="section-label">Let's connect</span>
          <h2 className="section-title mt-3">Contact</h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-200">
            Have a project in mind or just want to say hello? I'm always open to discussing new
            opportunities.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Left - info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-ink-800/50">
                  <Mail className="h-5 w-5 text-ember-400" />
                </div>
                <div>
                  <p className="text-sm text-ink-300">Email</p>
                  <a
                    href="mailto:brahmi.mouhamedrayen@hotmail.com"
                    className="text-base font-medium text-white transition-colors hover:text-ember-400"
                  >
                    brahmi.mouhamedrayen@hotmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-ink-800/50">
                  <Phone className="h-5 w-5 text-ember-400" />
                </div>
                <div>
                  <p className="text-sm text-ink-300">Phone</p>
                  <a
                    href="tel:+21694729469"
                    className="text-base font-medium text-white transition-colors hover:text-ember-400"
                  >
                    +216 94 729 469
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-ink-800/50">
                  <MapPin className="h-5 w-5 text-ember-400" />
                </div>
                <div>
                  <p className="text-sm text-ink-300">Location</p>
                  <p className="text-base font-medium text-white">Bizerte, Tunisia</p>
                </div>
              </div>

              {/* Socials */}
              <div className="pt-4">
                <p className="mb-3 text-sm text-ink-300">Follow me</p>
                <div className="flex gap-3">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-ink-800/50 text-ink-100 transition-all hover:border-ember-400/40 hover:text-ember-400 hover:shadow-glow"
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-5 rounded-2xl border border-white/5 bg-ink-800/40 p-6 backdrop-blur-sm md:p-8"
            >
              <div>
                <label className="mb-2 block text-sm font-medium text-ink-100">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full rounded-xl border border-white/10 bg-ink-900/50 px-4 py-3 text-sm text-white placeholder-ink-300 outline-none transition-all focus:border-ember-400/50 focus:bg-ink-900/80 focus:shadow-glow"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-ink-100">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full rounded-xl border border-white/10 bg-ink-900/50 px-4 py-3 text-sm text-white placeholder-ink-300 outline-none transition-all focus:border-ember-400/50 focus:bg-ink-900/80 focus:shadow-glow"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-ink-100">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about your project..."
                  rows={5}
                  className="w-full resize-none rounded-xl border border-white/10 bg-ink-900/50 px-4 py-3 text-sm text-white placeholder-ink-300 outline-none transition-all focus:border-ember-400/50 focus:bg-ink-900/80 focus:shadow-glow"
                />
              </div>
              <button
                type="submit"
                disabled={status !== 'idle'}
                className="btn-primary w-full justify-center disabled:opacity-70"
              >
                {status === 'idle' && (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
                {status === 'sending' && (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Sending...
                  </>
                )}
                {status === 'sent' && (
                  <>
                    <Check className="h-4 w-4" />
                    Message Sent!
                  </>
                )}
                {status === 'error' && (
                  <>
                    <AlertCircle className="h-4 w-4" />
                    Failed — try again
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
