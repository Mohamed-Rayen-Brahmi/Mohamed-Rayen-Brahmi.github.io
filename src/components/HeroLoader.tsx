/**
 * HeroLoader — Suspense fallback rendered while the GLB loads.
 * Matches the right-column canvas dimensions and blends with the dark hero background.
 */
export default function HeroLoader() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
      }}
    >
      {/* Pulsing glow orb */}
      <div
        style={{
          width: 120,
          height: 120,
          borderRadius: '50%',
          background:
            'radial-gradient(circle at center, rgba(176,24,24,0.35) 0%, rgba(176,24,24,0.08) 60%, transparent 100%)',
          animation: 'heroLoaderPulse 2s ease-in-out infinite',
          boxShadow: '0 0 60px rgba(176,24,24,0.2), 0 0 120px rgba(176,24,24,0.08)',
        }}
      />
      <style>{`
        @keyframes heroLoaderPulse {
          0%, 100% { transform: scale(1);   opacity: 0.5; }
          50%       { transform: scale(1.2); opacity: 1;   }
        }
      `}</style>
    </div>
  );
}
