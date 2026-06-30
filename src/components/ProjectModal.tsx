import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import {
  X,
  Github,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Check,
  AlertCircle,
  Play,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function ProjectModal() {
  const { activeProject, activeIndex, closeProject, nextProject, prevProject } = usePortfolio();
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  const isOpen = activeProject !== null;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setGalleryIndex(0);
      setShowVideo(false);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, activeIndex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') closeProject();
      if (e.key === 'ArrowRight') nextProject();
      if (e.key === 'ArrowLeft') prevProject();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, closeProject, nextProject, prevProject]);

  if (typeof document === 'undefined') return null;

  const isDirectVideo = (url: string) => /\.(mp4|webm|mov)(\?|$)/i.test(url);

  return createPortal(
    <AnimatePresence>
      {isOpen && activeProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          onClick={closeProject}
        >
          {/* Backdrop blur */}
          <div className="absolute inset-0 bg-ink-950/70 backdrop-blur-xl" />

          {/* Modal panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl border border-white/10 bg-ink-800/60 backdrop-blur-2xl"
            style={{ boxShadow: '0 0 60px rgba(255,142,43,0.15)' }}
          >
            {/* Close button */}
            <button
              onClick={closeProject}
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-ink-950/60 text-ink-100 backdrop-blur-sm transition-all hover:bg-ink-950/80 hover:text-white"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Prev / Next */}
            <button
              onClick={prevProject}
              className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-ink-950/60 text-ink-100 backdrop-blur-sm transition-all hover:bg-ink-950/80 hover:text-white"
              aria-label="Previous project"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextProject}
              className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-ink-950/60 text-ink-100 backdrop-blur-sm transition-all hover:bg-ink-950/80 hover:text-white"
              aria-label="Next project"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="p-6 md:p-10">
              {/* Title section */}
              <div className="mb-6">
                <p
                  className="mb-2 text-sm font-medium uppercase tracking-wider"
                  style={{
                    color: activeProject.accent === 'ember' ? '#ff8e2b' : '#6f8aa3',
                  }}
                >
                  {activeProject.tagline}
                </p>
                <h2 className="text-3xl font-bold text-white md:text-4xl">
                  {activeProject.name}
                </h2>
              </div>

              {/* Media area - gallery or video */}
              <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-2xl border border-white/5">
                {showVideo && activeProject.videoUrl ? (
                  isDirectVideo(activeProject.videoUrl) ? (
                    <video
                      src={activeProject.videoUrl}
                      className="h-full w-full object-cover"
                      controls
                      autoPlay
                    />
                  ) : (
                    <iframe
                      src={activeProject.videoUrl}
                      title={`${activeProject.name} video`}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )
                ) : (
                  <>
                    <img
                      src={activeProject.gallery[galleryIndex]}
                      alt={`${activeProject.name} screenshot ${galleryIndex + 1}`}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent" />
                    {/* Play video button - only shown if this project has a video */}
                    {activeProject.videoUrl && (
                      <button
                        onClick={() => setShowVideo(true)}
                        className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-white/10 bg-ink-950/60 px-4 py-2 text-sm text-white backdrop-blur-sm transition-all hover:bg-ink-950/80"
                      >
                        <Play className="h-4 w-4" />
                        Watch Demo
                      </button>
                    )}
                  </>
                )}
              </div>

              {/* Gallery thumbnails - only shown when there's more than one image */}
              {activeProject.gallery.length > 1 && (
                <div className="mb-6 flex gap-3">
                  {activeProject.gallery.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setGalleryIndex(i);
                        setShowVideo(false);
                      }}
                      className={`relative h-16 w-28 overflow-hidden rounded-lg border-2 transition-all ${
                        galleryIndex === i && !showVideo
                          ? 'border-ember-400 opacity-100'
                          : 'border-white/5 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Description */}
              <p className="mb-8 text-base leading-relaxed text-ink-100">
                {activeProject.description}
              </p>

              {/* Two column: features + challenges */}
              <div className="mb-8 grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-steel-200">
                    <Check className="h-4 w-4 text-ember-400" />
                    Features
                  </h3>
                  <ul className="space-y-2">
                    {activeProject.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-ink-100">
                        <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-ember-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-steel-200">
                    <AlertCircle className="h-4 w-4 text-steel-400" />
                    Challenges
                  </h3>
                  <ul className="space-y-2">
                    {activeProject.challenges.map((challenge, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-ink-100">
                        <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-steel-400" />
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Technologies */}
              <div className="mb-8">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-steel-200">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {activeProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-ink-100"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-4">
                {activeProject.githubUrl && (
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost group"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                )}
                {activeProject.liveUrl && (
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary group"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
