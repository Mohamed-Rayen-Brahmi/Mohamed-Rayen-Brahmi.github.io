import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Sword, Zap, Type, Crosshair } from 'lucide-react';

export default function CustomCursor() {
  const [hidden, setHidden] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [writing, setWriting] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [inRevealZone, setInRevealZone] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(x, springConfig);
  const cursorY = useSpring(y, springConfig);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    setHidden(false);

    // Force hide native cursor everywhere
    const style = document.createElement('style');
    style.innerHTML = '* { cursor: none !important; }';
    document.head.appendChild(style);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Reveal Zone (Hide global cursor)
      if (target.closest('[data-cursor="reveal"]')) {
        setInRevealZone(true);
        setHovering(false);
        setWriting(false);
        return;
      } else {
        setInRevealZone(false);
      }

      // Writing (Inputs)
      if (target.closest('input, textarea')) {
        setWriting(true);
        setHovering(false);
        return;
      } else {
        setWriting(false);
      }

      // Hovering (Buttons/Links)
      if (target.closest('a, button, [data-cursor="hover"]')) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };

    const down = () => setClicking(true);
    const up = () => setClicking(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);

    return () => {
      document.head.removeChild(style);
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
    };
  }, [x, y]);

  if (hidden) return null;

  return (
    <>
      {/* Main Cursor Element */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[10000] flex items-center justify-center"
        style={{ 
          x, 
          y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: inRevealZone ? 0 : 1,
          scale: clicking ? 1.3 : 1,
        }}
        transition={{ type: 'spring', damping: 15, stiffness: 400 }}
      >
        <AnimatePresence mode="wait">
          {clicking ? (
            <motion.div
              key="click"
              initial={{ scale: 0.5, rotate: -45, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              <Zap className="h-7 w-7 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] fill-white" />
            </motion.div>
          ) : writing ? (
            <motion.div
              key="write"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Type className="h-5 w-5 text-ember-400" />
            </motion.div>
          ) : hovering ? (
            <motion.div
              key="hover"
              initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Crosshair className="h-6 w-6 text-[#ff8e2b]" />
            </motion.div>
          ) : (
            <motion.div
              key="sword"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, rotate: 45 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.15 }}
              // Offset the sword so the tip is at the mouse point
              className="relative -top-[10px] -left-[10px]"
            >
              <Sword 
                className="h-6 w-6 text-[#B01818]" 
                strokeWidth={2.5} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
