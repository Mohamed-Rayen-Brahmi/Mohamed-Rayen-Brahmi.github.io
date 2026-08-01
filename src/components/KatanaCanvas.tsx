/**
 * KatanaCanvas — Full-screen React Three Fiber hero canvas.
 *
 * KEY FIX: Auto-normalizes the GLB model to a known Three.js-unit size using
 * Box3 bounding box, then applies a display scale multiplier on top.
 * This ensures it looks right regardless of the model's native export scale.
 */

import { Suspense, useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
  Noise,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

/* ─────────────────────────────────────────────────────────────────────────────
   Constants
───────────────────────────────────────────────────────────────────────────── */

const MODEL_URL = '/katana/katana%20sword%203d%20model.glb';
useGLTF.preload(MODEL_URL);

/** Target longest-axis size in Three.js units after normalization */
const NORMALIZED_SIZE = 1.0;

/** Display size multiplier — how large the normalized model appears on screen */
const DISPLAY_SCALE = 2.6;

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const easeOutBack = (t: number) => {
  const c1 = 1.55;
  return 1 + (c1 + 1) * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

/* ─────────────────────────────────────────────────────────────────────────────
   Model normalization helper
───────────────────────────────────────────────────────────────────────────── */

function normalizeModel(scene: THREE.Group): { scene: THREE.Group; normScale: number } {
  // Compute bounding box in world space
  const box = new THREE.Box3().setFromObject(scene);
  const size = new THREE.Vector3();
  box.getSize(size);

  // Get the longest axis so we normalise to NORMALIZED_SIZE on that axis
  const maxDim = Math.max(size.x, size.y, size.z);
  const normScale = maxDim > 0 ? NORMALIZED_SIZE / maxDim : 1;

  // Center the model at origin
  const center = new THREE.Vector3();
  box.getCenter(center);
  scene.position.sub(center.multiplyScalar(normScale));
  scene.scale.setScalar(normScale);

  return { scene, normScale };
}

/* ─────────────────────────────────────────────────────────────────────────────
   KatanaModel
───────────────────────────────────────────────────────────────────────────── */

interface ModelProps {
  heroScrollPx: React.MutableRefObject<number>;
  sectionTopPx: React.MutableRefObject<number>;
  reduceMotion: boolean;
  isMobile: boolean;
}

function KatanaModel({ heroScrollPx, sectionTopPx, reduceMotion, isMobile }: ModelProps) {
  const gltf = useGLTF(MODEL_URL) as unknown as { scene: THREE.Group };
  const groupRef   = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  // Clone + normalize once
  const normalizedScene = useMemo(() => {
    const clone = gltf.scene.clone(true);

    // Improve material for moody render
    clone.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        mesh.castShadow    = true;
        mesh.receiveShadow = false;
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        mats.forEach((mat) => {
          const m = mat as THREE.MeshStandardMaterial;
          if (m.metalness !== undefined) {
            m.metalness = Math.min((m.metalness ?? 0.5) + 0.2, 1.0);
            m.roughness = Math.max((m.roughness ?? 0.5) - 0.1, 0.02);
          }
          m.needsUpdate = true;
        });
      }
    });

    // Normalize scale + center
    normalizeModel(clone);
    return clone;
  }, [gltf.scene]);

  // Static reduced-motion pose
  if (reduceMotion) {
    return (
      <group scale={DISPLAY_SCALE * 1.1} rotation={[0.1, -0.3, 0.45]}>
        <primitive object={normalizedScene} />
      </group>
    );
  }

  useFrame(({ clock }) => {
    const g = groupRef.current;
    if (!g) return;

    // ── Scroll progress 0–1 ───────────────────────────────────────────────
    const scrollY    = window.scrollY;
    const sectionTop = sectionTopPx.current;
    const totalPx    = heroScrollPx.current;
    const rawP = totalPx > 0 ? (scrollY - sectionTop) / totalPx : 0;
    const p    = Math.max(0, Math.min(1, rawP));
    const t    = clock.elapsedTime;

    // ── Phase 1 (0→0.65): slide right→center, rotate 360°+ ──────────────
    const phase1 = Math.min(p / 0.65, 1);
    const ep1    = easeInOutCubic(phase1);

    // Right offset: ~32% of viewport width → 0
    // Visible in the right column on load, not pushed off-screen.
    const startX  = isMobile ? viewport.width * 0.20 : viewport.width * 0.32;
    const targetX = THREE.MathUtils.lerp(startX, 0, ep1);
    const targetY = THREE.MathUtils.lerp(-0.1, 0.05, ep1);

    // Rotation: start with blade pointing upper-right, spin full 360°+ on Y
    const startRotZ = 0.85;  // ~49° — blade tips upper-right
    const startRotX = 0.10;
    const rotZ = THREE.MathUtils.lerp(startRotZ, 0.0, ep1);
    const rotY = ep1 * Math.PI * 2.2;
    const rotX = THREE.MathUtils.lerp(startRotX, 0.04, ep1);

    // ── Idle bob (only at rest, p < 0.05) ────────────────────────────────
    const idleAmt = Math.max(0, 1 - p * 22);
    const idleY   = Math.sin(t * 0.48) * 0.05 * idleAmt;
    const idleRZ  = Math.cos(t * 0.33) * 0.022 * idleAmt;
    const idleRY  = Math.sin(t * 0.25) * 0.018 * idleAmt;

    // ── Phase 2 (0.65→0.78): hold center, scale up + extra showcase spin ──
    const phase2  = p < 0.65 ? 0 : Math.min((p - 0.65) / 0.13, 1);
    const ep2     = easeOutBack(phase2);
    const baseS   = DISPLAY_SCALE;
    const peakS   = DISPLAY_SCALE * 1.42;
    const sc      = THREE.MathUtils.lerp(baseS, peakS, ep2);
    // Extra Y-spin during text reveal: another full 360° on top of phase1
    const extraSpin = phase2 * Math.PI * 2.0;

    // ── Phase 3 (0.78→0.90): fade out ────────────────────────────────────
    let opacity = 1;
    if (p >= 0.78) {
      opacity = Math.max(0, 1 - (p - 0.78) / 0.12);
    }

    // ── Apply transforms ──────────────────────────────────────────────────
    g.position.set(targetX, targetY + idleY, 0);
    g.rotation.set(rotX, rotY + extraSpin + idleRY, rotZ + idleRZ);
    g.scale.setScalar(sc);
    g.visible = opacity > 0.005;

    // Apply fade
    if (p >= 0.72) {
      g.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;
          const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          mats.forEach((mat) => {
            const m = mat as THREE.MeshStandardMaterial;
            m.transparent = true;
            m.opacity = opacity;
          });
        }
      });
    }
  });

  return (
    <group ref={groupRef} scale={DISPLAY_SCALE} rotation={[0.10, 0, 0.85]}>
      <primitive object={normalizedScene} />
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Lights
───────────────────────────────────────────────────────────────────────────── */

function HeroLights() {
  return (
    <>
      {/*
        ── WHY SO BRIGHT: LinearToneMapping (not ACES) means there's no
           roll-off compression, so colours match Blender's Cycles sRGB
           output 1:1. We can therefore use realistic intensities and
           the model won't look washed out OR too dark.
      */}

      {/* Ambient: neutral white, enough to keep shadow areas readable */}
      <ambientLight color="#ffffff" intensity={0.55} />

      {/* ── KEY LIGHT: soft white from front-slightly-above ─────────────── */}
      {/* Mimics Blender's default area light, keeps material colours accurate */}
      <directionalLight color="#ffffff" intensity={1.6} position={[1.5, 3.0, 4.5]} />

      {/* ── DEEP-RED RIM / BACKLIGHT ──────────────────────────────────── */}
      {/* Behind & below — catches blade edge, guard, knuckles */}
      <pointLight color="#C82020" intensity={6.0} position={[1.2, -1.8, -5.0]} decay={2} distance={24} />
      <pointLight color="#901010" intensity={3.0} position={[-2.0, -0.8, -4.5]} decay={2} distance={20} />

      {/* Top kicker: spine of the blade */}
      <spotLight
        color="#D02020"
        intensity={2.5}
        position={[0.0, 6.0, -1.5]}
        angle={0.5}
        penumbra={0.9}
        decay={2}
        distance={22}
      />

      {/* ── FILL: cool blue-grey, front-left ───────────────────────────── */}
      <directionalLight color="#8aa8cc" intensity={0.55} position={[-5, 2.5, 3.5]} />

      {/* Front-right specular accent — blade glint */}
      <pointLight color="#b0c4d8" intensity={1.2} position={[3.5, 0.5, 2.5]} decay={2} distance={12} />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Post-processing
───────────────────────────────────────────────────────────────────────────── */

function HeroEffects({ isMobile }: { isMobile: boolean }) {
  if (isMobile) {
    return (
      <EffectComposer multisampling={0}>
        <Noise opacity={0.05} blendFunction={BlendFunction.OVERLAY} />
        <Vignette offset={0.18} darkness={0.80} eskil={false} blendFunction={BlendFunction.NORMAL} />
      </EffectComposer>
    );
  }
  return (
    <EffectComposer multisampling={4}>
      <Noise opacity={0.042} blendFunction={BlendFunction.OVERLAY} />
      <Vignette offset={0.15} darkness={0.82} eskil={false} blendFunction={BlendFunction.NORMAL} />
      <Bloom luminanceThreshold={0.60} luminanceSmoothing={0.35} intensity={0.9} radius={0.45} />
      <ChromaticAberration
        offset={new THREE.Vector2(0.0007, 0.0007)}
        blendFunction={BlendFunction.NORMAL}
        radialModulation={true}
        modulationOffset={0.4}
      />
    </EffectComposer>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Export
───────────────────────────────────────────────────────────────────────────── */

export interface KatanaCanvasProps {
  heroScrollPx: React.MutableRefObject<number>;
  sectionTopPx: React.MutableRefObject<number>;
}

export default function KatanaCanvas({ heroScrollPx, sectionTopPx }: KatanaCanvasProps) {
  const reduceMotion = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const isMobile    = useMemo(() => window.matchMedia('(max-width: 767px)').matches, []);
  const [visible, setVisible] = useState(false);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 5,
        pointerEvents: 'none',
        opacity: visible ? 1 : 0,
        transition: 'opacity 1.4s ease',
      }}
    >
      <Canvas
        /**
         * Camera at z=3.5, FOV 55° — gives a good balance between
         * seeing the full model and keeping it feeling large/close.
         * With NORMALIZED_SIZE=1.0 and DISPLAY_SCALE=2.6, the sword
         * should fill roughly 60% of the viewport height at rest.
         */
        camera={{ position: [0, 0, 3.5], fov: 55, near: 0.01, far: 80 }}
        gl={{
          alpha: true,
          antialias: !isMobile,
          // LinearToneMapping preserves Blender's sRGB colours without
          // the heavy shadow crush that ACESFilmic applies at low exposure.
          toneMapping: THREE.LinearToneMapping,
          toneMappingExposure: 1.0,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        style={{ background: 'transparent' }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        onCreated={() => setVisible(true)}
      >
        <HeroLights />
        <Suspense fallback={null}>
          <KatanaModel
            heroScrollPx={heroScrollPx}
            sectionTopPx={sectionTopPx}
            reduceMotion={reduceMotion}
            isMobile={isMobile}
          />
        </Suspense>
        <HeroEffects isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
