import { HERO_CONTENT } from '../constants';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import Profile from '../assets/rick_profile.webp';
import CurvedLoop from '../utils/CurvedLoop';
import { useEffect, useRef, useState } from 'react';

/* ── Stagger config ───────────────────────────────── */
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Magnetic tilt on photo ───────────────────────── */
const useTilt = () => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });

  const handleMouse = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const reset = () => { x.set(0); y.set(0); };

  return { ref, rotateX, rotateY, handleMouse, reset };
};

/* ── Component ────────────────────────────────────── */
const Hero = ({ darkMode }) => {
  const { ref, rotateX, rotateY, handleMouse, reset } = useTilt();
  const [loaded, setLoaded] = useState(false);

  return (
    <section className="relative min-h-screen flex flex-col pb-0">

      {/* ── Top rule ── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-px origin-left"
        style={{ background: 'rgba(128,128,128,0.18)', marginBottom: 0 }}
      />

      {/* ── Main grid ── */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-0">

        {/* ── LEFT — Text column ── */}
        <div className="flex flex-col justify-between px-6 sm:px-10 lg:px-16 pt-14 pb-10 lg:pt-20 lg:pb-16 order-2 lg:order-1">
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            {/* Label */}
            <motion.p
              variants={item}
              className="text-[10px] sm:text-xs tracking-[0.3em] uppercase font-semibold mb-6 sm:mb-8"
              style={{ color: 'rgba(128,128,128,0.5)' }}
            >
              Portfolio · Full Stack Developer
            </motion.p>

            {/* Name — split by word for stagger */}
            <div className="overflow-hidden mb-3">
              <motion.h1
                variants={item}
                className="font-black leading-[0.9] tracking-tighter"
                style={{ fontSize: 'clamp(52px, 8vw, 110px)' }}
              >
                Lark
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-6 sm:mb-8">
              <motion.h1
                variants={item}
                className="font-black leading-[0.9] tracking-tighter"
                style={{ fontSize: 'clamp(52px, 8vw, 110px)' }}
              >
                Mariano
              </motion.h1>
            </div>

            {/* Role badge */}
            <motion.div variants={item} className="mb-6 sm:mb-8">
              <span
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium"
                style={{
                  border: '1px solid rgba(128,128,128,0.22)',
                  color: 'rgba(128,128,128,0.8)',
                  background: 'rgba(128,128,128,0.05)',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: '#22c55e' }}
                />
                Full Stack Java Developer
              </span>
            </motion.div>

            {/* Bio */}
            <motion.p
              variants={item}
              className="text-sm sm:text-base leading-relaxed max-w-md mb-8 sm:mb-10"
              style={{ color: 'rgba(128,128,128,0.7)' }}
            >
              {HERO_CONTENT}
            </motion.p>

            {/* CTA row */}
            <motion.div variants={item} className="flex flex-wrap items-center gap-4">
              <motion.a
                href="/LARK_MARIANO_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download
                className="group relative overflow-hidden flex items-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-semibold transition-colors duration-300"
                style={{ background: 'currentColor' }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span
                  className="absolute inset-0 rounded-full"
                  style={{ background: darkMode ? '#fff' : '#0a0a0a' }}
                />
                <span
                  className="relative flex items-center gap-2"
                  style={{ color: darkMode ? '#0a0a0a' : '#fff' }}
                >
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M10 3v10m0 0l-3-3m3 3l3-3M4 17h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Download Resume
                </span>
              </motion.a>

              <motion.button
                onClick={() =>
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
                className="group flex items-center gap-1.5 text-sm font-medium relative bg-transparent border-0 cursor-pointer"
                style={{ color: 'rgba(128,128,128,0.7)' }}
                whileHover={{ color: 'rgba(128,128,128,1)' }}
              >
                View Work
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
              </motion.button>

              <Link
                to="/about"
                className="group flex items-center gap-1.5 text-sm font-medium relative"
                style={{ color: 'rgba(128,128,128,0.7)' }}
              >
                <span className="relative">
                  About Me
                  <span
                    className="absolute -bottom-px left-0 h-px w-full origin-right scale-x-0 group-hover:scale-x-100 group-hover:origin-left transition-transform duration-500"
                    style={{ background: 'currentColor' }}
                  />
                </span>
                <motion.span
                  whileHover={{ x: 2, y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex"
                >
                  <svg width="13" height="13" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M4 16L16 4M16 4H8M16 4V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Bottom stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex items-end gap-8 mt-16 pt-8"
            style={{ borderTop: '1px solid rgba(128,128,128,0.12)' }}
          >
            {[
              { num: '5+', label: 'Years Experience' },
              { num: '10+', label: 'Projects Shipped' },
              { num: 'PH', label: 'Based in Philippines' },
            ].map(({ num, label }) => (
              <div key={label}>
                <p className="text-2xl font-bold tracking-tight">{num}</p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(128,128,128,0.5)' }}>{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT — Photo column ── */}
        <div
          className="relative flex items-center justify-center order-1 lg:order-2 pt-10 lg:pt-0"
          style={{ borderLeft: '1px solid rgba(128,128,128,0.1)' }}
        >
          {/* Corner label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="absolute top-6 right-6 text-[10px] tracking-[0.2em] uppercase hidden lg:block"
            style={{ color: 'rgba(128,128,128,0.35)' }}
          >
            @larkmariano
          </motion.p>

          {/* Tilt photo */}
          <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-[240px] h-[300px] sm:w-[300px] sm:h-[380px] lg:w-[380px] lg:h-[480px] xl:w-[420px] xl:h-[540px]"
          >
            {/* Decorative border offset */}
            <div
              className="absolute inset-0 rounded-2xl translate-x-3 translate-y-3"
              style={{ border: '1px solid rgba(128,128,128,0.2)' }}
            />
            {/* Main image */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <img
                src={Profile}
                alt="Lark Mariano"
                className="w-full h-full object-cover object-top"
                onLoad={() => setLoaded(true)}
              />
              {/* Subtle gradient overlay */}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.18) 0%, transparent 60%)' }}
              />
            </div>

            {/* Floating tag */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold"
              style={{
                background: darkMode ? 'rgba(20,20,20,0.95)' : 'rgba(255,255,255,0.95)',
                border: '1px solid rgba(128,128,128,0.15)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Open to work
            </motion.div>
          </motion.div>

          {/* Mobile stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="lg:hidden absolute bottom-4 left-0 right-0 flex justify-center gap-8"
          >
            {[{ num: '5+', label: 'Years' }, { num: '10+', label: 'Projects' }].map(({ num, label }) => (
              <div key={label} className="text-center">
                <p className="text-xl font-bold">{num}</p>
                <p className="text-[10px]" style={{ color: 'rgba(128,128,128,0.5)' }}>{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Bottom rule ── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-px origin-left"
        style={{ background: 'rgba(128,128,128,0.18)' }}
      />

      {/* ── CurvedLoop — preserved exactly ── */}
      <div className={`${darkMode ? 'text-white' : 'text-black'}`}>
        <CurvedLoop
          marqueeText="Code ✦ Build ✦ Deploy ✦ Innovate ✦ Java ✦ React ✦ Spring Boot ✦ Problem Solving ✦"
          speed={3}
          curveAmount={500}
          direction="right"
          interactive={true}
          className="custom-text-style"
        />
      </div>
    </section>
  );
};

export default Hero;