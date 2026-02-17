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
        relative overflow-hidden font-mono text-[0.65rem] tracking-wider
        px-4 py-2 transition-all duration-300 select-none
        ${isOperatorMode
          ? 'border border-core-cyan text-core-cyan hover:bg-core-cyan hover:text-core-black'
          : 'bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 text-cyan-400 hover:border-cyan-400 hover:text-cyan-300'
        }
      `}
      title={isOperatorMode ? 'Switch to Recruiter Mode' : 'Enter Operator Mode'}
    >
      <span className="relative z-10 flex items-center gap-2">
        <span className={`inline-block w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
          isOperatorMode ? 'bg-core-green animate-pulse' : 'bg-cyan-500/60'
        }`} />
        {isOperatorMode ? 'EXIT OPERATOR' : 'OPERATOR MODE'}
      </span>
    </button>
  );
}
