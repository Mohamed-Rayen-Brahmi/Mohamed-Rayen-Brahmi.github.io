import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [hidden, setHidden] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(x, springConfig);
  const cursorY = useSpring(y, springConfig);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    setHidden(false);
    document.body.style.cursor = 'none';

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-cursor="hover"], input, textarea')) {
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
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
    };
  }, [x, y]);

  if (hidden) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] flex items-center justify-center"
        style={{ x: cursorX, y: cursorY }}
      >
        <motion.div
          className="rounded-full border"
          animate={{
            width: hovering ? 48 : 28,
            height: hovering ? 48 : 28,
            borderColor: hovering
              ? 'rgba(255, 142, 43, 0.8)'
              : 'rgba(159, 177, 194, 0.5)',
            backgroundColor: hovering
              ? 'rgba(255, 142, 43, 0.08)'
              : 'rgba(159, 177, 194, 0.03)',
            scale: clicking ? 0.85 : 1,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          style={{ translateX: '-50%', translateY: '-50%' }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{ x, y }}
      >
        <motion.div
          className="rounded-full"
          animate={{
            width: hovering ? 6 : 5,
            height: hovering ? 6 : 5,
            backgroundColor: hovering ? '#ff8e2b' : '#9fb1c2',
            scale: clicking ? 1.5 : 1,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 400 }}
          style={{ translateX: '-50%', translateY: '-50%' }}
        />
      </motion.div>
    </>
  );
}
