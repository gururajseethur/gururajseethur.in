import React, { useState, useRef, useEffect } from 'react';

/**
 * Terminal Easter Egg
 *
 * Not advertised. Only discoverable.
 * Responds to: whoami, ls, help, clear, status
 */

const RESPONSES = {
  whoami: 'operator@command-core',
  ls: `/systems\n/security-log\n/ai-stack\n/field-notes`,
  help: `Available commands:\n  whoami    — identify operator\n  ls        — list directories\n  status    — system status\n  clear     — clear terminal\n  exit      — close terminal`,
  status: `SYSTEM STATUS\n──────────────────────────\nNarrative:       LOCKED\nInterpolation:   C² Continuous\nVector Field:    Divergence-Free\nClock:           Deterministic\nOverride:        Enforced\nAudit:           Clinical\n──────────────────────────\nAll systems nominal.`,
  exit: '__EXIT__',
  clear: '__CLEAR__',
};

export default function TerminalEasterEgg() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState([
    { type: 'system', text: 'COMMAND CORE TERMINAL v1.0.0' },
    { type: 'system', text: 'Type "help" for available commands.' },
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  // Listen for backtick key to toggle
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === '`' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Auto-focus and scroll
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { type: 'input', text: `> ${cmd}` }];

    const response = RESPONSES[cmd];
    if (response === '__EXIT__') {
      setIsOpen(false);
      setInput('');
      return;
    }
    if (response === '__CLEAR__') {
      setHistory([]);
      setInput('');
      return;
    }
    if (response) {
      newHistory.push({ type: 'output', text: response });
    } else {
      newHistory.push({ type: 'error', text: `command not found: ${cmd}` });
    }

    setHistory(newHistory);
    setInput('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-8 left-8 z-[100] w-[420px] max-w-[90vw]">
      <div className="bg-core-black border border-core-border">
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-core-border">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-core-red"></span>
            <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
            <span className="w-2 h-2 rounded-full bg-core-green"></span>
          </div>
          <span className="font-mono text-[0.55rem] text-core-muted">
            command-core://terminal
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="font-mono text-xs text-core-muted hover:text-core-cyan"
          >
            ×
          </button>
        </div>

        {/* Output */}
        <div
          ref={scrollRef}
          className="p-3 h-48 overflow-y-auto font-mono text-xs leading-relaxed"
        >
          {history.map((line, i) => (
            <div
              key={i}
              className={
                line.type === 'input'
                  ? 'text-core-cyan'
                  : line.type === 'error'
                  ? 'text-core-red'
                  : line.type === 'system'
                  ? 'text-core-muted'
                  : 'text-core-text whitespace-pre'
              }
            >
              {line.text}
            </div>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="border-t border-core-border px-3 py-2 flex items-center gap-2">
          <span className="font-mono text-xs text-core-green">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="terminal-input"
            autoComplete="off"
            spellCheck="false"
          />
        </form>
      </div>
    </div>
  );
}
