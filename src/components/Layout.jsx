import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import CursorEffect from './CursorEffect';
import Navbar from './Navbar';
import Footer from './Footer';
import SignalEngineScene from './three/SignalEngineScene';
import { SignalEngineProvider } from '../context/SignalEngineContext';

export default function Layout() {
  const location = useLocation();
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    setOpacity(0);
    const t = setTimeout(() => setOpacity(1), 60);
    return () => clearTimeout(t);
  }, [location.pathname]);

  return (
    <SignalEngineProvider>
      <div className="relative min-h-screen bg-void text-text-secondary selection:bg-cyan/20 selection:text-white">
        {/* Persistent 3D WebGL Signal Engine Scene */}
        <SignalEngineScene />

        {/* Custom Precision Cursor */}
        <CursorEffect />

        {/* Global Navigation */}
        <Navbar />

        {/* Main Content Layer (Rendered in front of 3D Scene) */}
        <main
          className="relative z-10 min-h-screen pt-20"
          style={{
            opacity,
            transition: 'opacity 240ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <Outlet />
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </SignalEngineProvider>
  );
}
