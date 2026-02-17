import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

const ClockContext = createContext(null);

/**
 * Master Clock Provider
 *
 * Normal Mode:  dt = clock.getDelta()
 * Override Mode: dt = 0  (freeze time, drop GPU usage)
 *
 * Override also signals downstream to:
 *  - renderer.setPixelRatio(1)
 *  - Disable EffectComposer passes
 *  - Disable Raycaster
 *  - Freeze time uniform
 */
export function ClockProvider({ children }) {
  const [override, setOverride] = useState(false);
  const overrideRef = useRef(false);

  const enableOverride = useCallback(() => {
    overrideRef.current = true;
    setOverride(true);
  }, []);

  const disableOverride = useCallback(() => {
    overrideRef.current = false;
    setOverride(false);
  }, []);

  const toggleOverride = useCallback(() => {
    overrideRef.current = !overrideRef.current;
    setOverride(overrideRef.current);
  }, []);

  /** Get dt — returns 0 during override */
  const getDelta = useCallback((clockDelta) => {
    return overrideRef.current ? 0.0 : clockDelta;
  }, []);

  return (
    <ClockContext.Provider
      value={{
        override,
        overrideRef,
        enableOverride,
        disableOverride,
        toggleOverride,
        getDelta,
      }}
    >
      {children}
    </ClockContext.Provider>
  );
}

export function useMasterClock() {
  const ctx = useContext(ClockContext);
  if (!ctx) throw new Error('useMasterClock must be used within ClockProvider');
  return ctx;
}
