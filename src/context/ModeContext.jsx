import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const ModeContext = createContext(null);

/**
 * Mode Provider — Dual-layer experience toggle.
 *
 * Recruiter Mode (default): Clean, professional, content-first.
 * Operator Mode (toggle):   Cinematic 3D backgrounds, HUD overlays, particle systems.
 *
 * Mobile devices default to Recruiter Mode.
 * Preference persisted in localStorage.
 */
export function ModeProvider({ children }) {
  const [isOperatorMode, setIsOperatorMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('command-core-mode');
    if (saved === 'operator') return true;
    return false;
  });

  // Persist preference
  useEffect(() => {
    localStorage.setItem('command-core-mode', isOperatorMode ? 'operator' : 'recruiter');
  }, [isOperatorMode]);

  const toggleMode = useCallback(() => {
    setIsOperatorMode((prev) => !prev);
  }, []);

  const enableOperator = useCallback(() => setIsOperatorMode(true), []);
  const enableRecruiter = useCallback(() => setIsOperatorMode(false), []);

  return (
    <ModeContext.Provider
      value={{
        isOperatorMode,
        toggleMode,
        enableOperator,
        enableRecruiter,
      }}
    >
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error('useMode must be used within ModeProvider');
  return ctx;
}
