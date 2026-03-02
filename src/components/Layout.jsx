import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import CursorEffect from './CursorEffect';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  const location = useLocation();
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    setOpacity(0);
    const t = setTimeout(() => setOpacity(1), 50);
    return () => clearTimeout(t);
  }, [location.pathname]);

  return (
    <>
      <CursorEffect />
      <Navbar />

      <main
        style={{
          opacity,
          transition: 'opacity 200ms ease',
          minHeight: '100vh',
          background: '#070709',
          color: '#B0B0C0',
        }}
      >
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
