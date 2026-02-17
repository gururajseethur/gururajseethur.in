import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import CustomCursor from './CustomCursor';

export default function Layout() {
  const location = useLocation();

  return (
    <>
      <CustomCursor />

      {/* Animated background */}
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />
      <div className="noise-overlay" />

      <Navbar />

      <main className="relative z-10 min-h-screen pt-16 md:pt-20">
        <Outlet key={location.pathname} />
      </main>

      <footer className="relative z-10 py-12 text-center border-t border-white/5">
        <div className="space-y-2">
          <p className="font-sans text-sm text-white/30">
            Designed & Built by <span className="gradient-text font-medium">Gururaj Seethur</span>
          </p>
          <p className="font-sans text-xs text-white/15">
            © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </>
  );
}
