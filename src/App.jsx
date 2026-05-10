import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Technologies from './components/Technologies';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Certification from './components/Certification';
import CompanyProjectDetail from './components/CompanyProjectDetail';
import AboutMe from './components/AboutMe';
import React, { useEffect, useRef, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

/* ─────────────────────────────────────────────────────────
   GridBackground — shared between all routes
───────────────────────────────────────────────────────── */
export const GridBackground = ({ darkMode }) => (
  <div className="fixed inset-0 -z-10">
    {darkMode ? (
      <div className="relative h-full w-full bg-black">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]" />
      </div>
    ) : (
      <div className="relative h-full w-full bg-white">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>
    )}
  </div>
);

/* ─────────────────────────────────────────────────────────
   Portfolio — main page
───────────────────────────────────────────────────────── */
const Portfolio = ({ darkMode }) => (
  <div className={`overflow-x-hidden antialiased ${darkMode ? 'text-white' : 'text-black'}`}>
    <div className="container mx-auto px-8">
      <Navbar />
      <Hero darkMode={darkMode} />
      <Technologies darkMode={darkMode} />
      <Projects darkMode={darkMode} />
      <Experience darkMode={darkMode} />
      <Certification darkMode={darkMode} />
      <Contact darkMode={darkMode} />
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────────
   App — cursor + theme live HERE so they persist on every
   route, including /company-project/:id
───────────────────────────────────────────────────────── */
const App = () => {
  const cursorDotRef     = useRef(null);
  const cursorOutlineRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [darkMode,      setDarkMode]      = useState(true);

  /* ── Detect touch / mobile once on mount ── */
  useEffect(() => {
    const isTouch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;
    setIsTouchDevice(isTouch);
  }, []);

  /* ── Persist dark-mode preference ── */
  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) setDarkMode(saved === 'true');
  }, []);
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  /* ── Custom cursor — only on non-touch devices ── */
  useEffect(() => {
    if (isTouchDevice) return; // never attach on mobile/tablet

    const dot     = cursorDotRef.current;
    const outline = cursorOutlineRef.current;
    if (!dot || !outline) return;

    // Start hidden until the cursor enters the window
    dot.style.opacity     = '0';
    outline.style.opacity = '0';

    const onMove = (e) => {
      dot.style.opacity     = '1';
      outline.style.opacity = '1';
      dot.style.left        = `${e.clientX}px`;
      dot.style.top         = `${e.clientY}px`;
      outline.style.transform = `translate(${e.clientX - 15}px, ${e.clientY - 15}px)`;
    };

    // Hide when mouse leaves the viewport
    const onLeave = () => {
      dot.style.opacity     = '0';
      outline.style.opacity = '0';
    };

    window.addEventListener('mousemove', onMove);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', () => {
      dot.style.opacity     = '1';
      outline.style.opacity = '1';
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [isTouchDevice]);

  const toggleTheme = () => setDarkMode((v) => !v);

  return (
    <BrowserRouter>
      {/* ── Background — fixed, behind everything, all routes ── */}
      <GridBackground darkMode={darkMode} />

      {/* ── Custom cursor elements — rendered ONCE at root ──
          Hidden via CSS on touch devices (display:none safety net) */}
      {!isTouchDevice && (
        <>
          <div
            ref={cursorDotRef}
            className={`cursor-dot ${darkMode ? 'bg-white' : 'bg-black'}`}
            style={{ opacity: 0, transition: 'opacity 0.2s' }}
          />
          <div
            ref={cursorOutlineRef}
            className="cursor-outline"
            style={{
              opacity: 0,
              transition: 'opacity 0.2s',
              borderColor: darkMode
                ? 'hsla(0,0%,100%,0.5)'
                : 'hsla(0,0%,0%,0.5)',
            }}
          />
        </>
      )}

      {/* ── Theme toggle — fixed, visible on all routes ── */}
      <button
        onClick={toggleTheme}
        aria-label="Toggle Theme"
        className={`fixed top-4 right-4 text-2xl z-50 ${
          darkMode ? 'text-white' : 'text-black'
        }`}
      >
        {darkMode ? <FiSun /> : <FiMoon />}
      </button>

      {/* ── Routes ── */}
      <div className={darkMode ? 'text-white' : 'text-black'}>
        <Routes>
          <Route path="/" element={<Portfolio darkMode={darkMode} />} />
          <Route
            path="/company-project/:id"
            element={<CompanyProjectDetail darkMode={darkMode} />}
          />
          <Route
            path="/about"
            element={<AboutMe darkMode={darkMode} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;