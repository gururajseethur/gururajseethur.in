import { useEffect, useRef, useState } from 'react';

export default function CursorEffect() {
  const dotRef   = useRef(null);
  const ringRef  = useRef(null);
  const posRef   = useRef({ x: -100, y: -100 });
  const ringPos  = useRef({ x: -100, y: -100 });
  const rafRef   = useRef(null);
  const [hoverType, setHoverType] = useState(null); // null | 'default' | 'red' | 'cyan'

  useEffect(() => {
    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };

      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (!el) return;
      const isInteractive = el.closest('a, button, [data-cursor], input, textarea, select, label');
      const isRed  = el.closest('.cursor-red');
      const isCyan = el.closest('.cursor-cyan');

      if (isRed)        setHoverType('red');
      else if (isCyan)  setHoverType('cyan');
      else if (isInteractive) setHoverType('default');
      else              setHoverType(null);
    };

    const loop = () => {
      const { x, y } = posRef.current;
      const rx = ringPos.current.x;
      const ry = ringPos.current.y;
      const lerpFactor = 0.12;
      ringPos.current.x = rx + (x - rx) * lerpFactor;
      ringPos.current.y = ry + (y - ry) * lerpFactor;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove);
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* ── Derived styles from hover type ── */
  const isHover   = hoverType !== null;
  const isRed     = hoverType === 'red';
  const isCyan    = hoverType === 'cyan';

  const dotStyle = {
    position: 'fixed',
    top: 0, left: 0,
    pointerEvents: 'none',
    zIndex: 99999,
    willChange: 'transform',
    marginLeft: isHover ? '-3px' : '-4px',
    marginTop:  isHover ? '-3px' : '-4px',
  };

  const ringStyle = {
    position: 'fixed',
    top: 0, left: 0,
    pointerEvents: 'none',
    zIndex: 99998,
    willChange: 'transform',
    transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease',
    borderRadius: '50%',
    border: isRed
      ? '1px solid #FF3B3B'
      : isCyan
      ? '1px solid #00D9FF'
      : isHover
      ? '1px solid transparent'
      : '1px solid rgba(255,255,255,0.3)',
    width:  isHover ? '56px' : '32px',
    height: isHover ? '56px' : '32px',
    marginLeft: isHover ? '-28px' : '-16px',
    marginTop:  isHover ? '-28px' : '-16px',
    background: isRed
      ? 'rgba(255,59,59,0.05)'
      : isCyan
      ? 'rgba(0,217,255,0.05)'
      : isHover
      ? 'conic-gradient(from 0deg, #FF3B3B 0deg 180deg, #00D9FF 180deg 360deg) border-box'
      : 'transparent',
    boxShadow: isRed
      ? '0 0 12px rgba(255,59,59,0.4)'
      : isCyan
      ? '0 0 12px rgba(0,217,255,0.4)'
      : 'none',
  };

  if (isHover && !isRed && !isCyan) {
    ringStyle.background = 'transparent';
    ringStyle.border = '1px solid transparent';
    ringStyle.backgroundImage =
      'conic-gradient(from 0deg, #FF3B3B 0deg 180deg, #00D9FF 180deg 360deg)';
    ringStyle.backgroundClip = 'border-box';
    ringStyle.WebkitMask =
      'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)';
    ringStyle.WebkitMaskComposite = 'xor';
    ringStyle.maskComposite = 'exclude';
    ringStyle.padding = '1px';
  }

  return (
    <>
      {/* Inner dot — splits on hover */}
      <div ref={dotRef} style={dotStyle}>
        {isHover ? (
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <div style={{
              width: 6, height: 6, borderRadius: '50%',
              background: isRed ? '#FF3B3B' : '#FF3B3B',
              boxShadow: '0 0 6px #FF3B3B',
            }} />
            <div style={{
              width: 6, height: 6, borderRadius: '50%',
              background: isCyan ? '#00D9FF' : '#00D9FF',
              boxShadow: '0 0 6px #00D9FF',
            }} />
          </div>
        ) : (
          <div style={{
            width: 8, height: 8, borderRadius: '50%',
            background: isRed ? '#FF3B3B' : isCyan ? '#00D9FF' : '#FFFFFF',
            boxShadow: isRed
              ? '0 0 8px #FF3B3B'
              : isCyan
              ? '0 0 8px #00D9FF'
              : 'none',
          }} />
        )}
      </div>

      {/* Outer ring */}
      <div ref={ringRef} style={ringStyle} />
    </>
  );
}
