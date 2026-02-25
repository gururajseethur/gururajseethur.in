import React from 'react';
import { useMode } from '../context/ModeContext';

/**
 * Mode Toggle — switch between Recruiter and Operator modes.
 * Recruiter: clean pill button.
 * Operator: console-style button.
 */
export default function ModeToggle() {
  const { isOperatorMode, toggleMode } = useMode();

  return (
    <button
      onClick={toggleMode}
      data-interactive
      className={`
        relative overflow-hidden font-mono text-micro tracking-wider
        px-4 py-2 transition-all duration-300 select-none rounded-lg
        ${isOperatorMode
          ? 'border border-accent text-accent hover:bg-accent hover:text-base'
          : 'bg-accent/[0.08] border border-accent/20 text-accent hover:border-accent/40'
        }
      `}
      title={isOperatorMode ? 'Switch to Recruiter Mode' : 'Enter Operator Mode'}
    >
      <span className="relative z-10 flex items-center gap-2">
        <span className={`inline-block w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
          isOperatorMode ? 'bg-accent animate-pulse' : 'bg-accent/60'
        }`} />
        {isOperatorMode ? 'EXIT OPERATOR' : 'OPERATOR MODE'}
      </span>
    </button>
  );
}
