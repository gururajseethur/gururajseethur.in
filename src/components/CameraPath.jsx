import { useRef, useEffect, useMemo } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Governed Camera Path
 *
 * CatmullRomCurve3 spiral descent.
 * ScrollTrigger maps scroll progress → curve.getPointAt(progress)
 *
 * Rules:
 *  - No lerp smoothing
 *  - No inertia
 *  - No cinematic drift
 *  - Scroll stops → camera stops instantly
 */
export default function CameraPath({ isMobile = false }) {
  const { camera } = useThree();
  const progressRef = useRef({ value: 0 });

  // Build spiral descent path
  const { curve, lookTargets } = useMemo(() => {
    if (isMobile) return { curve: null, lookTargets: null };

    const points = [];
    const targets = [];
    const segments = 60;
    const totalRevolutions = 1.5;
    const startRadius = 8;
    const endRadius = 3;
    const startY = 6;
    const endY = -4;

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const angle = t * Math.PI * 2 * totalRevolutions;
      const radius = startRadius + (endRadius - startRadius) * t;
      const y = startY + (endY - startY) * t;

      points.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius
      ));

      // Look target follows center with slight offset
      targets.push(new THREE.Vector3(0, y * 0.3, 0));
    }

    return {
      curve: new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.5),
      lookTargets: targets,
    };
  }, [isMobile]);

  // Setup ScrollTrigger
  useEffect(() => {
    if (isMobile || !curve) return;

    // Set initial camera position
    const startPoint = curve.getPointAt(0);
    camera.position.copy(startPoint);
    camera.lookAt(0, 0, 0);

    const triggerEl = document.getElementById('scroll-container');
    if (!triggerEl) return;

    const st = ScrollTrigger.create({
      trigger: triggerEl,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0, // 0 means instant — no smoothing, no inertia
      onUpdate: (self) => {
        progressRef.current.value = self.progress;
      },
    });

    return () => st.kill();
  }, [camera, curve, isMobile]);

  // Update camera position each frame — deterministic, no lerp
  useFrame(() => {
    if (isMobile || !curve) return;

    const progress = Math.min(Math.max(progressRef.current.value, 0), 1);
    const point = curve.getPointAt(progress);

    // Direct assignment — no interpolation
    camera.position.set(point.x, point.y, point.z);

    // Look at center with slight vertical bias from progress
    const lookY = point.y * 0.3;
    camera.lookAt(0, lookY, 0);
  });

  return null;
}
