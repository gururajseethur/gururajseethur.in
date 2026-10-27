import React, { useEffect, useRef, useState } from 'react';

export default function CursorEffect() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const posRef = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);
  const [hoverType, setHoverType] = useState(null); // null | 'interactive' | 'amber' | 'cyan'
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on fine pointer devices (desktop with mouse)
    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasPointer) return;
    setEnabled(true);

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };

      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (!el) return;
      const isAmber = el.closest('.cursor-amber') || el.closest('[data-cursor="amber"]');
      const isCyan = el.closest('.cursor-cyan') || el.closest('[data-cursor="cyan"]');
      const isInteractive = el.closest('a, button, [data-cursor], input, textarea, select, label');

      if (isAmber) setHoverType('amber');
      else if (isCyan) setHoverType('cyan');
      else if (isInteractive) setHoverType('interactive');
      else setHoverType(null);
    };

    const loop = () => {
      const { x, y } = posRef.current;
      const rx = ringPos.current.x;
      const ry = ringPos.current.y;
      const lerpFactor = 0.16;
      ringPos.current.x = rx + (x - rx) * lerpFactor;
      ringPos.current.y = ry + (y - ry) * lerpFactor;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!enabled) return null;

  const getRingColor = () => {
    if (hoverType === 'amber') return 'rgba(255, 182, 92, 0.7)';
    if (hoverType === 'cyan') return 'rgba(89, 225, 255, 0.8)';
    if (hoverType === 'interactive') return 'rgba(82, 118, 255, 0.65)';
    return 'rgba(89, 225, 255, 0.3)';
  };

  const getRingSize = () => {
    if (hoverType) return 40;
    return 24;
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden" aria-hidden="true">
      {/* Central Micro Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'absolute',
          top: -3,
          left: -3,
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: hoverType === 'amber' ? '#FFB65C' : '#59E1FF',
          boxShadow: hoverType === 'amber' ? '0 0 8px #FFB65C' : '0 0 8px #59E1FF',
          transition: 'background-color 0.2s ease',
          willChange: 'transform',
        }}
      />

      {/* Lagging Precision Reticle */}
      <div
        ref={ringRef}
        style={{
          position: 'absolute',
          top: -getRingSize() / 2,
          left: -getRingSize() / 2,
          width: getRingSize(),
          height: getRingSize(),
          borderRadius: '50%',
          border: `1px solid ${getRingColor()}`,
          transition: 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease, top 0.2s ease, left 0.2s ease',
          willChange: 'transform',
        }}
      />
    </div>
  );
}
