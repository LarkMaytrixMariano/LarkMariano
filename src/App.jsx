import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Technologies from './components/Technologies';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import React, { useEffect, useRef, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi'; // Import the icons


const App = () => {
  const cursorDotRef = useRef(null);
  const cursorOutlineRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouchDevice();

    const cursorDot = cursorDotRef.current;
    const cursorOutline = cursorOutlineRef.current;

    if (!cursorDot || !cursorOutline || isTouchDevice) return;

    const updateCursorPosition = (e) => {
      const posX = e.clientX;
      const posY = e.clientY;

      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;
      cursorOutline.style.transform = `translate(${posX - 15}px, ${posY - 15}px)`;
    };

    window.addEventListener('mousemove', updateCursorPosition);
    window.addEventListener('click', updateCursorPosition);

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      window.removeEventListener('click', updateCursorPosition);
    };
  }, [isTouchDevice]);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className={`overflow-x-hidden antialiased ${darkMode ? 'text-white' : 'text-black'}`}>
      <div className='fixed inset-0 -z-10'>
        {darkMode ? (
          <div className='relative h-full w-full bg-black'>
            <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]'></div>
            <div className='absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]'></div>
          </div>
        ) : (
          <div className='relative h-full w-full bg-white'>
            <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]'></div>
          </div>
        )}
      </div>
      <div className='container mx-auto px-8'>
        <div
          className={`cursor-dot ${darkMode ? 'bg-white' : 'bg-black'}`}
          ref={cursorDotRef}
        ></div>
      <div
        className={`cursor-outline`}
        ref={cursorOutlineRef}
        style={{
          borderColor: darkMode ? 'hsla(0, 0%, 100%, 0.5)' : 'hsla(0, 0%, 0%, 0.5)',
        }}
      ></div>
        {/* Toggle button with icons */}
        <button 
          onClick={toggleTheme} 
          aria-label="Toggle Theme" 
          className='absolute top-4 right-4 text-2xl'
        >
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>

        <Navbar />
        <Hero />
        <Technologies />
        <Projects />
        <Experience />
        <Contact />
      </div>
    </div>
  );
};

export default App;
