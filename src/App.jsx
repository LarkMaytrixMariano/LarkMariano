import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Technologies from './components/Technologies';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import React, { useEffect, useRef, useState } from 'react'; // Add useState here


const App = () => {
  const cursorDotRef = useRef(null);
  const cursorOutlineRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if the device is a touch device
    const checkTouchDevice = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    
    checkTouchDevice();

    const cursorDot = cursorDotRef.current;
    const cursorOutline = cursorOutlineRef.current;

    if (!cursorDot || !cursorOutline || isTouchDevice) {
      return; // Exit if elements are not available or it's a touch device
    }

    const updateCursorPosition = (e) => {
      const posX = e.clientX;
      const posY = e.clientY;

      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;

      // Update position of cursor outline with transition
      cursorOutline.style.transform = `translate(${posX - 15}px, ${posY - 15}px)`; // Center the outline
    };

    window.addEventListener("mousemove", updateCursorPosition);
    window.addEventListener("click", updateCursorPosition);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
      window.removeEventListener("click", updateCursorPosition);
    };
  }, [isTouchDevice]);
  return (
  <div className='overflow-x-hidden text-stone-300 antialiased'>
    <div className='fixed inset-0 -z-10'>
      <div class="relative h-full w-full bg-black">
        <div class="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        </div>
        <div class="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]">
          </div>
      </div>
    </div>

    <div className='container mx-auto px-8'>
    <div className='cursor-dot ' data-cursor-dot ref={cursorDotRef}></div>
    <div className='cursor-outline' data-cursor-outline ref={cursorOutlineRef}></div>
      <Navbar/>
      <Hero />
      <Technologies />
      <Projects />
      <Experience />
      <Contact />
    </div>
  </div>
  )
}

export default App