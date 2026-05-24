import React, { useRef } from 'react';
import { useParticleUniverse } from '../hooks/useParticleUniverse';

const ParticleUniverse = React.memo(function ParticleUniverse() {
  const containerRef = useRef(null);

  useParticleUniverse(containerRef);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
    />
  );
});

export default ParticleUniverse;
