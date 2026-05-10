/**
 * ABOUT ME — Awwwards Nominee Level
 * Concept: "Typewriter Memoir" — a cinematic, film-editorial personal story.
 *
 * Features:
 *  ① Counting Preloader  — numbers race to 100%, line sweeps, then cinematic reveal
 *  ② Magnetic Cursor     — custom cursor morphs shape/text on every hover target
 *  ③ Cinematic Hero      — full-bleed parallax photo, name slams in character-by-character
 *  ④ Horizontal Drag Chapter — "Who I Am" text draggable left/right on desktop, swipeable mobile
 *  ⑤ Scroll-Trigger reveals — clip-path wipes, line-by-line text, counter rolls
 *  ⑥ Timeline with scrub — vertical line draws as you scroll
 *  ⑦ Personality Bento   — grid cards with 3D tilt on hover
 *  ⑧ Hobbies Drag Reel   — draggable film-strip carousel
 *  ⑨ Values Parallax     — dual-speed horizontal scroll lanes
 *  ⑩ Grain + noise overlay throughout
 */

import React, {
  useRef, useEffect, useState, useCallback, useMemo,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  motion, useScroll, useTransform, useSpring,
  useInView, useMotionValue, useVelocity,
  AnimatePresence, useAnimationFrame, animate,
} from 'framer-motion';
import { ABOUT_DATA } from '../constants';
import Profile from '../assets/rick_morty.png';

/* ══════════════════════════════════════════════════
   CONSTANTS
══════════════════════════════════════════════════ */
const E = [0.16, 1, 0.3, 1];   // expo out easing
const E2 = [0.22, 1, 0.36, 1]; // default ease

/* ══════════════════════════════════════════════════
   ① PRELOADER
══════════════════════════════════════════════════ */
const Preloader = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState('count'); // count → sweep → exit

  useEffect(() => {
    // Race count to 100 in ~1.4s
    const ctrl = animate(0, 100, {
      duration: 1.4,
      ease: [0.4, 0, 0.2, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        setTimeout(() => setPhase('sweep'), 80);
        setTimeout(() => setPhase('exit'), 620);
        setTimeout(() => onComplete(), 1050);
      },
    });
    return () => ctrl.stop();
  }, []);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: '#050505' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: E2 }}
        >
          {/* Grain */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.07]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: '180px',
            }} />

          {/* Name top-left */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="absolute top-8 left-8 text-[10px] tracking-[0.35em] uppercase font-semibold"
            style={{ color: 'rgba(255,255,255,0.25)' }}
          >
            {ABOUT_DATA.name}
          </motion.p>

          {/* Role bottom-right */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute bottom-8 right-8 text-[10px] tracking-[0.3em] uppercase"
            style={{ color: 'rgba(255,255,255,0.18)' }}
          >
            {ABOUT_DATA.role}
          </motion.p>

          {/* Giant counter */}
          <div className="relative overflow-hidden">
            <motion.span
              className="block font-black tabular-nums leading-none select-none"
              style={{
                fontSize: 'clamp(80px, 18vw, 200px)',
                color: 'rgba(255,255,255,0.92)',
                letterSpacing: '-0.04em',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {count}
            </motion.span>
          </div>

          {/* Percent sign */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute"
            style={{
              fontSize: 'clamp(14px, 2vw, 22px)',
              color: 'rgba(255,255,255,0.35)',
              bottom: 'calc(50% - clamp(80px,18vw,200px)/2 - 28px)',
              right: '50%',
              transform: 'translateX(50%)',
            }}
          >
            %
          </motion.span>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px]"
            style={{ background: 'rgba(255,255,255,0.06)' }}>
            <motion.div className="h-full"
              style={{
                background: 'rgba(255,255,255,0.55)',
                scaleX: count / 100,
                originX: 0,
                transformOrigin: 'left',
              }} />
          </div>

          {/* Sweep line */}
          <AnimatePresence>
            {(phase === 'sweep' || phase === 'exit') && (
              <motion.div
                className="absolute inset-0"
                style={{ background: '#fff' }}
                initial={{ scaleY: 0, originY: 0 }}
                animate={{ scaleY: 1 }}
                exit={{ scaleY: 0, originY: 1 }}
                transition={{ duration: 0.35, ease: E }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ══════════════════════════════════════════════════
   ② MAGNETIC CURSOR
══════════════════════════════════════════════════ */
const MagneticCursor = ({ darkMode }) => {
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const [label, setLabel] = useState('');
  const [big, setBig] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const springCfg = { stiffness: 520, damping: 32, mass: 0.5 };
  const sx = useSpring(cursorX, springCfg);
  const sy = useSpring(cursorY, springCfg);

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true); return;
    }
    const move = (e) => {
      cursorX.set(e.clientX - (big ? 36 : 10));
      cursorY.set(e.clientY - (big ? 36 : 10));
      if (!visible) setVisible(true);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [big, visible]);

  // Expose setter for child components
  useEffect(() => {
    window.__setCursor = (lbl, isBig) => { setLabel(lbl); setBig(isBig); };
    window.__resetCursor = () => { setLabel(''); setBig(false); };
  }, []);

  if (isTouch) return null;

  return (
    <motion.div
      style={{
        left: sx, top: sy, position: 'fixed', zIndex: 9997, pointerEvents: 'none',
        width: big ? 72 : 20, height: big ? 72 : 20,
        borderRadius: '50%',
        border: `1.5px solid ${darkMode ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)'}`,
        background: big ? (darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)') : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backdropFilter: big ? 'blur(4px)' : 'none',
        mixBlendMode: 'difference',
      }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: big ? 1 : 1,
      }}
      transition={{ width: { duration: 0.25, ease: E2 }, height: { duration: 0.25, ease: E2 } }}
    >
      {big && label && (
        <span style={{
          fontSize: 9, fontWeight: 700, letterSpacing: '0.18em',
          textTransform: 'uppercase', color: darkMode ? '#fff' : '#000', whiteSpace: 'nowrap',
        }}>{label}</span>
      )}
    </motion.div>
  );
};

/* Cursor trigger wrapper */
const CursorTrigger = ({ label, children, className = '' }) => (
  <div className={className}
    onMouseEnter={() => window.__setCursor?.(label, true)}
    onMouseLeave={() => window.__resetCursor?.()}>
    {children}
  </div>
);

/* ══════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════ */
/* Clip-path reveal on scroll */
const ClipReveal = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });
  return (
    <motion.div ref={ref} className={className}
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      animate={inView ? { clipPath: 'inset(0 0% 0 0)' } : {}}
      transition={{ duration: 0.9, delay, ease: E }}>
      {children}
    </motion.div>
  );
};

/* Word-by-word reveal */
const WordReveal = ({ text, className, style, delay = 0, size = 'inherit' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-5%' });
  return (
    <span ref={ref} className={className} style={{ display: 'block', ...style }}>
      {text.split(' ').map((w, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden',
          verticalAlign: 'bottom', marginRight: '0.28em' }}>
          <motion.span style={{ display: 'inline-block' }}
            initial={{ y: '108%', opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: delay + i * 0.055, ease: E }}>
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

/* Char-by-char reveal (for hero display text) */
const CharReveal = ({ text, className, style, delay = 0, stagger = 0.04 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-5%' });
  return (
    <span ref={ref} className={className} style={{ display: 'block', ...style }}>
      {text.split('').map((c, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden',
          verticalAlign: 'bottom', whiteSpace: c === ' ' ? 'pre' : undefined }}>
          <motion.span style={{ display: 'inline-block' }}
            initial={{ y: '115%' }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.65, delay: delay + i * stagger, ease: E }}>
            {c}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

/* Generic fade+slide */
const FadeUp = ({ children, delay = 0, y = 32, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-6%' });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: E2 }}>
      {children}
    </motion.div>
  );
};

/* Thin rule */
const HR = () => <div style={{ height: 1, background: 'rgba(128,128,128,0.12)' }} />;

/* Arrow */
const Arrow = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <path d="M4 16L16 4M16 4H8M16 4V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* Film grain overlay */
const Grain = () => (
  <div className="pointer-events-none fixed inset-0 z-[9996] opacity-[0.032]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
      backgroundSize: '128px 128px',
    }} />
);

/* Section header compound */
const SectionLabel = ({ label, heading, delay = 0 }) => (
  <div className="mb-12 md:mb-16"
    style={{ borderBottom: '1px solid rgba(128,128,128,0.12)', paddingBottom: '1.5rem' }}>
    <FadeUp delay={delay}>
      <p className="text-[9px] tracking-[0.38em] uppercase font-black mb-3"
        style={{ color: 'rgba(128,128,128,0.42)' }}>{label}</p>
    </FadeUp>
    <div className="overflow-hidden">
      <CharReveal text={heading} delay={delay + 0.05} stagger={0.04}
        className="font-black tracking-tighter"
        style={{ fontSize: 'clamp(42px, 7.5vw, 100px)', lineHeight: 0.9 }} />
    </div>
  </div>
);

/* ══════════════════════════════════════════════════
   ③ CINEMATIC HERO
══════════════════════════════════════════════════ */
const HeroSection = ({ darkMode, loaded }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      {/* Parallax photo */}
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
        <img src={Profile} alt="" className="w-full h-full object-cover object-top"
          style={{ filter: 'brightness(0.18) saturate(0.5)' }} />
      </motion.div>

      {/* Vignette */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.35) 55%, transparent 100%)' }} />

      {/* Decorative vertical lines */}
      {[15, 35, 65, 85].map((p) => (
        <motion.div key={p}
          className="absolute top-0 bottom-0 w-px pointer-events-none"
          style={{ left: `${p}%`, background: 'rgba(255,255,255,0.03)' }}
          initial={{ scaleY: 0 }} animate={loaded ? { scaleY: 1 } : {}}
          transition={{ duration: 1.8, delay: 1.1, ease: E }} />
      ))}

      {/* Content */}
      <motion.div style={{ y: contentY, opacity }}
        className="relative z-10 px-6 sm:px-12 lg:px-20 pb-14 md:pb-24">

        {/* Small label */}
        <motion.div initial={{ opacity: 0, x: -20 }}
          animate={loaded ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex items-center gap-3 mb-8">
          <motion.div className="h-px" style={{ background: 'rgba(255,255,255,0.4)' }}
            initial={{ width: 0 }} animate={loaded ? { width: 40 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }} />
          <p className="text-[9px] tracking-[0.4em] uppercase font-bold"
            style={{ color: 'rgba(255,255,255,0.4)' }}>About Me</p>
        </motion.div>

        {/* Name — slams in */}
        <div style={{ color: '#fff' }}>
          {['Lark', 'Mariano'].map((word, wi) => (
            <div key={word} className="overflow-hidden">
              <motion.div
                initial={{ y: '110%', rotate: 2 }}
                animate={loaded ? { y: 0, rotate: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.45 + wi * 0.14, ease: E }}
                className="font-black tracking-tighter leading-none"
                style={{ fontSize: 'clamp(76px, 15vw, 190px)', lineHeight: 0.87 }}>
                {word}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Meta row */}
        <motion.div initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.7, ease: E2 }}
          className="flex flex-wrap items-center gap-3 sm:gap-6 mt-6 sm:mt-8">
          <span className="text-sm sm:text-base font-medium"
            style={{ color: 'rgba(255,255,255,0.55)' }}>{ABOUT_DATA.role}</span>
          <span className="w-1 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }} />
          <span className="text-sm" style={{ color: 'rgba(255,255,255,0.38)' }}>{ABOUT_DATA.location}</span>
          <span className="flex items-center gap-1.5 text-xs"
            style={{ color: 'rgba(34,197,94,0.8)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Open to work
          </span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={loaded ? { opacity: 1 } : {}}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 right-8 z-10 flex flex-col items-center gap-2"
        style={{ color: 'rgba(255,255,255,0.28)' }}>
        <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2 }}
        >
        <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
            <rect
            x=".75"
            y=".75"
            width="12.5"
            height="20.5"
            rx="6.25"
            stroke="currentColor"
            strokeWidth="1.2"
            />

            <motion.circle
            cx="7"
            cy="6"
            r="2"
            fill="currentColor"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.2 }}
            />
        </svg>
        </motion.div>
        <p style={{ fontSize: 8, letterSpacing: '0.25em', textTransform: 'uppercase' }}>Scroll</p>
      </motion.div>
    </section>
  );
};

/* ══════════════════════════════════════════════════
   ④ WHO I AM — Horizontal Drag Chapter
══════════════════════════════════════════════════ */
const WhoIAmSection = () => {
  const trackRef = useRef(null);
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 28 });
  const [isDragging, setIsDragging] = useState(false);
  const [maxDrag, setMaxDrag] = useState(0);
  const [page, setPage] = useState(0);

  const pages = [
    { num: '01', heading: 'The Developer', body: ABOUT_DATA.bio[0] },
    { num: '02', heading: 'The Stack',     body: ABOUT_DATA.bio[1] },
    { num: '03', heading: 'The Work',      body: ABOUT_DATA.bio[2] },
  ];

  useEffect(() => {
    if (trackRef.current) {
      setMaxDrag(-(trackRef.current.scrollWidth - trackRef.current.parentElement.offsetWidth));
    }
  }, []);

  // Update page indicator
  useEffect(() => {
    return x.on('change', (v) => {
      const w = trackRef.current?.parentElement?.offsetWidth || 1;
      setPage(Math.round(Math.abs(v) / w));
    });
  }, [x, maxDrag]);

  const dragSnapPoints = pages.map((_, i) => {
    const w = trackRef.current?.parentElement?.offsetWidth || 0;
    return -i * w;
  });

  return (
    <section className="py-24 sm:py-32 overflow-hidden"
      style={{ borderTop: '1px solid rgba(128,128,128,0.1)' }}>
      <div className="px-6 sm:px-12 lg:px-20 mb-10">
        <SectionLabel label="Who I Am" heading="The Person" />
        <FadeUp delay={0.2}>
          <div className="flex items-center gap-3 text-xs"
            style={{ color: 'rgba(128,128,128,0.4)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="tracking-widest uppercase font-semibold" style={{ fontSize: 9 }}>
              Drag to explore
            </span>
            {/* Page dots */}
            <div className="flex gap-1.5 ml-4">
              {pages.map((_, i) => (
                <motion.div key={i} className="rounded-full"
                  animate={{ width: i === page ? 16 : 6, background: i === page ? 'rgba(128,128,128,0.7)' : 'rgba(128,128,128,0.25)' }}
                  style={{ height: 6 }} transition={{ duration: 0.3 }} />
              ))}
            </div>
          </div>
        </FadeUp>
      </div>

      <CursorTrigger label="Drag">
        <motion.div
          ref={trackRef}
          drag="x"
          dragConstraints={{ left: maxDrag || -9999, right: 0 }}
          dragElastic={0.08}
          dragMomentum={true}
          style={{ x: springX, display: 'flex', cursor: isDragging ? 'grabbing' : 'grab' }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          className="select-none"
        >
          {pages.map((pg, i) => (
            <div key={i} className="flex-shrink-0 px-6 sm:px-12 lg:px-20"
              style={{ width: '100vw' }}>
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-20 items-start
                max-w-6xl">
                {/* Left — big number + heading */}
                <div>
                  <p className="font-black tabular-nums leading-none mb-4"
                    style={{ fontSize: 'clamp(72px, 12vw, 140px)', color: 'rgba(128,128,128,0.08)' }}>
                    {pg.num}
                  </p>
                  <CharReveal text={pg.heading} delay={0} stagger={0.045}
                    className="font-black tracking-tighter"
                    style={{ fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 1.0 }} />
                </div>
                {/* Right — body */}
                <div className="pt-2 lg:pt-4">
                  <WordReveal text={pg.body} delay={0.1}
                    className="leading-relaxed"
                    style={{ fontSize: 'clamp(15px, 1.5vw, 19px)', color: 'rgba(128,128,128,0.72)' }} />
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </CursorTrigger>
    </section>
  );
};

/* ══════════════════════════════════════════════════
   ⑤ STATS COUNTER ROW
══════════════════════════════════════════════════ */
const CounterNum = ({ end, suffix = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(0, end, {
      duration: 1.6, ease: [0.4, 0, 0.2, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => ctrl.stop();
  }, [inView, end]);

  return <span ref={ref}>{val}{suffix}</span>;
};

const StatsSection = () => (
  <section className="px-6 sm:px-12 lg:px-20 py-16 sm:py-24"
    style={{ borderTop: '1px solid rgba(128,128,128,0.1)' }}>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
      {[
        { end: 5, suffix: '+', label: 'Years Experience' },
        { end: 10, suffix: '+', label: 'Projects Shipped' },
        { end: 2, suffix: '', label: 'Gov. Agencies' },
        { end: 3, suffix: '', label: 'Tech Stacks' },
      ].map(({ end, suffix, label }) => (
        <FadeUp key={label} className="text-center sm:text-left">
          <p className="font-black tabular-nums tracking-tighter leading-none mb-2"
            style={{ fontSize: 'clamp(44px, 6vw, 80px)' }}>
            <CounterNum end={end} suffix={suffix} />
          </p>
          <p className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: 'rgba(128,128,128,0.45)' }}>{label}</p>
        </FadeUp>
      ))}
    </div>
  </section>
);

/* ══════════════════════════════════════════════════
   ⑥ TIMELINE — scrubbing line
══════════════════════════════════════════════════ */
const TimelineSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] });
  const lineH = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section ref={ref} className="px-6 sm:px-12 lg:px-20 py-24 sm:py-32"
      style={{ borderTop: '1px solid rgba(128,128,128,0.1)' }}>
      <SectionLabel label="Journey" heading="My Story" />

      <div className="relative">
        {/* Scroll-driven vertical line */}
        <div className="absolute left-0 top-0 bottom-0 w-px"
          style={{ background: 'rgba(128,128,128,0.1)' }}>
          <motion.div className="w-full origin-top"
            style={{ height: lineH, background: 'rgba(128,128,128,0.5)' }} />
        </div>

        <div className="pl-8 sm:pl-12">
          {ABOUT_DATA.timeline.map((item, i) => {
            const isNow = i === ABOUT_DATA.timeline.length - 1;
            return (
              <FadeUp key={i} delay={i * 0.06}>
                <div className="group grid grid-cols-[90px_1fr] sm:grid-cols-[140px_1fr] gap-6 sm:gap-10 py-7 sm:py-9 relative"
                  style={{ borderBottom: '1px solid rgba(128,128,128,0.08)' }}>
                  {/* Timeline dot */}
                  <motion.div className="absolute -left-8 sm:-left-12 top-8"
                    style={{ transform: 'translateX(-50%)' }}
                    whileInView={{ scale: [0, 1.3, 1] }} viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}>
                    <div className="w-3 h-3 rounded-full border-2"
                      style={{
                        borderColor: isNow ? 'rgba(34,197,94,0.9)' : 'rgba(128,128,128,0.4)',
                        background: isNow ? 'rgba(34,197,94,0.2)' : 'transparent',
                      }} />
                  </motion.div>

                  {/* Year */}
                  <span className="text-xs sm:text-sm font-black tabular-nums pt-1"
                    style={{ color: isNow ? 'rgba(34,197,94,0.85)' : 'rgba(128,128,128,0.38)' }}>
                    {item.year}
                  </span>

                  {/* Content */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {isNow && <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />}
                      <h3 className="font-bold" style={{ fontSize: 'clamp(15px, 1.6vw, 20px)' }}>
                        {item.label}
                      </h3>
                    </div>
                    <p className="text-sm" style={{ color: 'rgba(128,128,128,0.55)' }}>{item.detail}</p>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════════════
   ⑦ PERSONALITY — 3D tilt bento
══════════════════════════════════════════════════ */
const TiltCard = ({ children, className = '', style = {} }) => {
  const cardRef = useRef(null);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const sRotX = useSpring(rotX, { stiffness: 260, damping: 22 });
  const sRotY = useSpring(rotY, { stiffness: 260, damping: 22 });

  const onMove = (e) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    rotX.set(-ny * 10);
    rotY.set(nx * 10);
  };
  const onLeave = () => { rotX.set(0); rotY.set(0); };

  return (
    <motion.div ref={cardRef}
      style={{ rotateX: sRotX, rotateY: sRotY, transformStyle: 'preserve-3d',
        perspective: 600, ...style }}
      onMouseMove={onMove} onMouseLeave={onLeave}
      className={className}>
      {children}
    </motion.div>
  );
};

/* ── Floating emoji orb that drifts on mouse proximity ── */
const FloatingOrb = ({ emoji, x: ox, y: oy }) => {
  const orb = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 18 });
  const sy = useSpring(my, { stiffness: 80, damping: 18 });

  useEffect(() => {
    const handle = (e) => {
      const rect = orb.current?.getBoundingClientRect();
      if (!rect) return;
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 180) {
        mx.set((-dx / dist) * 22);
        my.set((-dy / dist) * 22);
      } else {
        mx.set(0); my.set(0);
      }
    };
    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  }, []);

  return (
    <motion.div ref={orb}
      style={{ x: sx, y: sy, left: `${ox}%`, top: `${oy}%`, position: 'absolute' }}
      animate={{ y: [0, -12, 0], rotate: [0, 8, -6, 0] }}
      transition={{ duration: 5 + Math.random() * 3, repeat: Infinity, ease: 'easeInOut' }}
      className="text-3xl sm:text-4xl select-none pointer-events-none"
      aria-hidden="true">
      {emoji}
    </motion.div>
  );
};

const PersonalitySection = () => {
  const [active, setActive] = useState(null);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-10%' });

  // Scattered positions for orbs — decorative layer
  const orbPositions = [
    { emoji: '☕', x: 6,  y: 12 },
    { emoji: '🌙', x: 88, y: 8  },
    { emoji: '🎵', x: 3,  y: 72 },
    { emoji: '🎮', x: 92, y: 68 },
    { emoji: '📚', x: 48, y: 4  },
    { emoji: '🏍️', x: 50, y: 90 },
  ];

  // Stagger grid positions — each card enters from a different angle
  const entrances = [
    { x: -60, y: 30 }, { x: 0,   y: 60 }, { x: 60, y: 30 },
    { x: -60, y: -30 },{ x: 0,   y: -60 },{ x: 60, y: -30 },
  ];

  return (
    <section ref={sectionRef} className="relative px-6 sm:px-12 lg:px-20 py-24 sm:py-32 overflow-hidden"
      style={{ borderTop: '1px solid rgba(128,128,128,0.1)' }}>

      {/* Floating emoji orbs (desktop only decoration) */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block" aria-hidden>
        {orbPositions.map((o, i) => <FloatingOrb key={i} {...o} />)}
      </div>

      <SectionLabel label="Personality" heading="Fun Facts" />

      {/* Big number watermark */}
      <div className="absolute right-6 sm:right-12 top-24 font-black select-none pointer-events-none"
        style={{ fontSize: 'clamp(100px, 18vw, 220px)', color: 'rgba(128,128,128,0.04)', lineHeight: 1, letterSpacing: '-0.04em' }}>
        {ABOUT_DATA.funFacts.length}
      </div>

      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
        {ABOUT_DATA.funFacts.map((fact, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: entrances[i].x, y: entrances[i].y, rotate: (i % 2 === 0 ? -3 : 3) }}
            animate={inView ? { opacity: 1, x: 0, y: 0, rotate: 0 } : {}}
            transition={{ duration: 0.8, delay: i * 0.09, ease: E }}>
            <TiltCard
              className="relative rounded-2xl overflow-hidden cursor-default group"
              style={{
                border: '1px solid rgba(128,128,128,0.13)',
                background: active === i ? 'rgba(128,128,128,0.07)' : 'rgba(128,128,128,0.03)',
                minHeight: 200,
                transition: 'background 0.35s ease',
              }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}>

              {/* Animated glow blob on hover */}
              <motion.div className="absolute pointer-events-none rounded-full"
                animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 0.6 }}
                transition={{ duration: 0.45 }}
                style={{
                  width: 140, height: 140, top: -30, right: -30,
                  background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
                  filter: 'blur(20px)',
                }} />

              <div className="p-7 flex flex-col h-full relative z-10">
                {/* Emoji with bounce on hover */}
                <motion.div
                  animate={{ scale: active === i ? [1, 1.3, 1] : 1, rotate: active === i ? [0, -15, 10, 0] : 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-5xl mb-6 leading-none select-none w-fit">
                  {fact.emoji}
                </motion.div>

                {/* Index + label */}
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-black text-lg leading-tight">{fact.label}</h3>
                  <span className="text-[9px] font-black tabular-nums"
                    style={{ color: 'rgba(128,128,128,0.25)', letterSpacing: '0.08em' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Detail — reveals fully on hover */}
                <motion.p className="text-sm leading-relaxed mt-auto"
                  style={{ color: 'rgba(128,128,128,0.58)' }}
                  animate={{ opacity: active === i ? 1 : 0.65, y: active === i ? 0 : 4 }}
                  transition={{ duration: 0.3 }}>
                  {fact.detail}
                </motion.p>

                {/* Bottom line wipe on hover */}
                <motion.div className="absolute bottom-0 left-0 h-[2px] origin-left"
                  animate={{ scaleX: active === i ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: E }}
                  style={{ width: '100%', background: 'rgba(128,128,128,0.25)', borderRadius: 1 }} />
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════════════
   ⑧ HOBBIES — Rotating wheel selector + expanding detail
══════════════════════════════════════════════════ */
const HobbiesSection = () => {
  const [selected, setSelected] = useState(0);
  const [prevSelected, setPrevSelected] = useState(null);
  const trackRef = useRef(null);
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 160, damping: 25 });
  const velX = useVelocity(x);
  const skew = useTransform(velX, [-1200, 0, 1200], [-7, 0, 7]);
  const [isDragging, setIsDragging] = useState(false);
  const hobbies = ABOUT_DATA.hobbies;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const selectHobby = (i) => {
    setPrevSelected(selected);
    setSelected(i);
  };

  return (
    <section className="py-24 sm:py-32 overflow-hidden"
      style={{ borderTop: '1px solid rgba(128,128,128,0.1)' }}>
      <div className="px-6 sm:px-12 lg:px-20 mb-12">
        <SectionLabel label="Life Outside Code" heading="Hobbies" />
      </div>

      {/* ── Desktop: split panel layout ── */}
      <div className="hidden md:grid grid-cols-[1fr_1.2fr] gap-0 px-6 sm:px-12 lg:px-20">

        {/* Left — selector list */}
        <div className="pr-8 lg:pr-16" style={{ borderRight: '1px solid rgba(128,128,128,0.1)' }}>
          {hobbies.map((h, i) => (
            <motion.button key={i}
              className="w-full flex items-center gap-5 py-5 text-left group relative"
              style={{ borderBottom: '1px solid rgba(128,128,128,0.08)', cursor: 'pointer', background: 'none' }}
              onClick={() => selectHobby(i)}
              onMouseEnter={() => window.__setCursor?.('View', true)}
              onMouseLeave={() => window.__resetCursor?.()}>

              {/* Active indicator line */}
              <motion.div className="absolute left-0 top-0 bottom-0 w-[2px] origin-top"
                animate={{ scaleY: selected === i ? 1 : 0, background: selected === i ? 'rgba(255,255,255,0.6)' : 'transparent' }}
                transition={{ duration: 0.4, ease: E }} />

              {/* Number */}
              <motion.span className="flex-shrink-0 font-black tabular-nums text-sm"
                animate={{ color: selected === i ? 'rgba(128,128,128,0.7)' : 'rgba(128,128,128,0.25)' }}
                transition={{ duration: 0.3 }}>
                {String(i + 1).padStart(2, '0')}
              </motion.span>

              {/* Emoji — slides in on select */}
              <motion.span className="flex-shrink-0 text-2xl select-none"
                animate={{ scale: selected === i ? 1 : 0.7, opacity: selected === i ? 1 : 0.4 }}
                transition={{ duration: 0.35, ease: E }}>
                {h.icon}
              </motion.span>

              {/* Label */}
              <motion.span className="font-black tracking-tighter flex-1"
                animate={{
                  fontSize: selected === i ? 'clamp(22px, 2.8vw, 34px)' : 'clamp(16px, 1.8vw, 22px)',
                  opacity: selected === i ? 1 : 0.45,
                  x: selected === i ? 4 : 0,
                }}
                transition={{ duration: 0.4, ease: E }}>
                {h.label}
              </motion.span>

              {/* Arrow */}
              <motion.div className="flex-shrink-0"
                animate={{ opacity: selected === i ? 1 : 0, x: selected === i ? 0 : -8, rotate: -45 }}
                transition={{ duration: 0.3 }}>
                <Arrow size={14} />
              </motion.div>
            </motion.button>
          ))}
        </div>

        {/* Right — expanded detail panel */}
        <div className="pl-8 lg:pl-16 flex flex-col justify-center min-h-[360px] relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div key={selected}
              initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
              transition={{ duration: 0.55, ease: E }}>

              {/* Giant emoji */}
              <motion.div className="text-7xl sm:text-8xl mb-8 select-none"
                animate={{ rotate: [0, -8, 6, 0] }}
                transition={{ duration: 0.6, ease: E }}>
                {hobbies[selected].icon}
              </motion.div>

              {/* Big label */}
              <h3 className="font-black tracking-tighter mb-4"
                style={{ fontSize: 'clamp(32px, 5vw, 60px)', lineHeight: 0.95 }}>
                {hobbies[selected].label}
              </h3>

              {/* Description */}
              <p className="text-base sm:text-lg leading-relaxed max-w-sm"
                style={{ color: 'rgba(128,128,128,0.65)' }}>
                {hobbies[selected].description}
              </p>

              {/* Counter accent */}
              <div className="absolute bottom-0 right-0 font-black tabular-nums select-none pointer-events-none"
                style={{ fontSize: 'clamp(80px, 12vw, 140px)', color: 'rgba(128,128,128,0.05)', lineHeight: 1 }}>
                {String(selected + 1).padStart(2, '0')}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Mobile: film-strip drag reel ── */}
      <div className="md:hidden">
        {/* Film perforations top */}
        <div className="flex gap-3 mb-3 px-4 overflow-hidden" aria-hidden>
          {Array(30).fill(0).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-5 h-3 rounded-sm"
              style={{ border: '1px solid rgba(128,128,128,0.1)' }} />
          ))}
        </div>

        <CursorTrigger label="Drag">
          <motion.div
            ref={trackRef}
            drag="x"
            dragConstraints={{ left: -(hobbies.length * 200), right: 0 }}
            dragElastic={0.08} dragMomentum={true}
            style={{ x: springX, skewX: skew, display: 'flex', gap: 12,
              paddingLeft: 20, paddingRight: 20, cursor: isDragging ? 'grabbing' : 'grab' }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            className="select-none w-max">
            {hobbies.map((h, i) => (
              <motion.div key={i}
                className="flex-shrink-0 rounded-2xl overflow-hidden flex flex-col"
                style={{ width: 190, border: '1px solid rgba(128,128,128,0.13)', background: 'rgba(128,128,128,0.04)' }}
                whileTap={{ scale: 0.96 }}>
                <div className="flex items-center justify-center py-8"
                  style={{ background: 'rgba(128,128,128,0.04)', borderBottom: '1px solid rgba(128,128,128,0.1)' }}>
                  <span className="text-5xl select-none">{h.icon}</span>
                </div>
                <div className="p-4">
                  <p className="text-[9px] tracking-[0.25em] uppercase font-black mb-2"
                    style={{ color: 'rgba(128,128,128,0.3)' }}>{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="font-black text-sm mb-1">{h.label}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(128,128,128,0.5)' }}>{h.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </CursorTrigger>

        {/* Film perforations bottom */}
        <div className="flex gap-3 mt-3 px-4 overflow-hidden" aria-hidden>
          {Array(30).fill(0).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-5 h-3 rounded-sm"
              style={{ border: '1px solid rgba(128,128,128,0.1)' }} />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════════════
   ⑨ VALUES — dual-speed parallax lanes
══════════════════════════════════════════════════ */
const ValuesSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x1 = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const x2 = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  const Row = ({ xVal, items, opacity = 1 }) => (
    <motion.div style={{ x: xVal, display: 'flex', gap: 16, marginBottom: 16 }} className="w-max">
      {items.map((v, i) => (
        <div key={i} className="flex-shrink-0 rounded-2xl px-7 py-6"
          style={{ width: 300, border: '1px solid rgba(128,128,128,0.12)', background: `rgba(128,128,128,${0.03 * opacity})` }}>
          <p className="text-[9px] tracking-[0.3em] uppercase font-black mb-3"
            style={{ color: 'rgba(128,128,128,0.32)' }}>
            {String(i + 1).padStart(2, '0')}
          </p>
          <h3 className="font-black text-lg mb-3">{v.title}</h3>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(128,128,128,0.6)' }}>{v.body}</p>
        </div>
      ))}
    </motion.div>
  );

  return (
    <section ref={ref} className="py-24 sm:py-32 overflow-hidden"
      style={{ borderTop: '1px solid rgba(128,128,128,0.1)' }}>
      <div className="px-6 sm:px-12 lg:px-20 mb-14">
        <SectionLabel label="How I Work" heading="Values" />
      </div>
      <Row xVal={x1} items={[...ABOUT_DATA.values, ...ABOUT_DATA.values]} opacity={1.4} />
      <Row xVal={x2} items={[...ABOUT_DATA.values].reverse().concat([...ABOUT_DATA.values].reverse())} opacity={0.8} />
    </section>
  );
};

/* ══════════════════════════════════════════════════
   MARQUEE QUOTE
══════════════════════════════════════════════════ */
const MarqueeSection = () => {
  const xMv = useMotionValue(0);
  const reel = useRef(null);
  const text = '✦ Build with Purpose  ✦ Ship with Pride  ✦ Never Stop Growing  ✦ Code Clean  ';

  useAnimationFrame(() => {
    if (!reel.current) return;
    const half = reel.current.scrollWidth / 2;
    let nxt = xMv.get() - 0.65;
    if (nxt <= -half) nxt = 0;
    xMv.set(nxt);
  });

  return (
    <section className="overflow-hidden py-12 sm:py-16"
      style={{ borderTop: '1px solid rgba(128,128,128,0.1)', borderBottom: '1px solid rgba(128,128,128,0.1)' }}>
      <motion.div ref={reel} style={{ x: xMv, display: 'flex', whiteSpace: 'nowrap', willChange: 'transform' }}>
        {[text, text].map((t, k) => (
          <span key={k} className="font-black tracking-tighter"
            style={{ fontSize: 'clamp(40px, 7vw, 80px)', color: 'rgba(128,128,128,0.1)', paddingRight: '2rem' }}>
            {t}
          </span>
        ))}
      </motion.div>
    </section>
  );
};

/* ══════════════════════════════════════════════════
   CURRENTLY PANEL
══════════════════════════════════════════════════ */
const CurrentlySection = () => (
  <section className="px-6 sm:px-12 lg:px-20 py-16 sm:py-20"
    style={{ borderTop: '1px solid rgba(128,128,128,0.1)' }}>
    <FadeUp>
      <div className="rounded-2xl p-7 sm:p-9"
        style={{ border: '1px solid rgba(128,128,128,0.13)', background: 'rgba(128,128,128,0.03)' }}>
        <div className="flex items-center gap-2 mb-7 pb-5"
          style={{ borderBottom: '1px solid rgba(128,128,128,0.09)' }}>
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <p className="text-[9px] tracking-[0.35em] uppercase font-black"
            style={{ color: 'rgba(128,128,128,0.45)' }}>Live Status</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {Object.entries(ABOUT_DATA.currently).map(([k, v]) => (
            <div key={k}>
              <p className="text-[8px] tracking-[0.3em] uppercase font-black mb-2"
                style={{ color: 'rgba(128,128,128,0.35)' }}>{k}</p>
              <p className="text-sm font-medium leading-snug">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </FadeUp>
  </section>
);

/* ══════════════════════════════════════════════════
   GALLERY — Immersive staggered reveal + lightbox
══════════════════════════════════════════════════ */
const GallerySection = () => {
  const [lightbox, setLightbox] = useState(null); // index or null
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });

  // Parallax per-column offsets — columns drift at different speeds
  const col0Y = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);
  const col1Y = useTransform(scrollYProgress, [0, 1], ['-5%', '6%']);
  const col2Y = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  const col3Y = useTransform(scrollYProgress, [0, 1], ['-4%', '5%']);
  const colOffsets = [col0Y, col1Y, col2Y, col3Y];

  const photos = ABOUT_DATA.photos;
  if (!photos?.length) return null;

  // Distribute photos into 2 cols on mobile, 4 on desktop
  const distribute = (cols) => {
    const buckets = Array.from({ length: cols }, () => []);
    photos.forEach((p, i) => buckets[i % cols].push({ ...p, idx: i }));
    return buckets;
  };

  const desktopCols = distribute(4);
  const mobileCols  = distribute(2);

  // Heights alternate tall/short per column
  const heights = [
    [260, 200, 280], [220, 280, 180], [300, 190, 240], [180, 260, 200],
  ];

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 overflow-hidden"
      style={{ borderTop: '1px solid rgba(128,128,128,0.1)' }}>
      <div className="px-6 sm:px-12 lg:px-20 mb-12">
        <SectionLabel label="Moments" heading="Gallery" />
        <FadeUp delay={0.15}>
          <p className="text-sm" style={{ color: 'rgba(128,128,128,0.45)' }}>
            Click any photo to view full screen
          </p>
        </FadeUp>
      </div>

      {/* ── Desktop 4-col staggered masonry ── */}
      <div className="hidden sm:flex gap-3 lg:gap-4 px-6 sm:px-12 lg:px-20 items-start">
        {desktopCols.map((col, ci) => (
          <motion.div key={ci} style={{ y: colOffsets[ci], flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {col.map((photo, pi) => (
              <FadeUp key={pi} delay={ci * 0.08 + pi * 0.06}>
                <CursorTrigger label="Open">
                  <motion.div
                    className="relative overflow-hidden rounded-2xl cursor-pointer group"
                    style={{
                      height: heights[ci % heights.length][pi % 3] || 220,
                      border: '1px solid rgba(128,128,128,0.12)',
                    }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.5, ease: E }}
                    onClick={() => setLightbox(photo.idx)}>
                    {/* Image */}
                    <motion.div className="w-full h-full"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.7, ease: E }}>
                      <img src={photo.src} alt={photo.caption}
                        className="w-full h-full object-cover"
                        style={{ display: 'block' }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentNode.style.background = 'rgba(128,128,128,0.07)';
                          const d = document.createElement('div');
                          d.style.cssText = 'display:flex;align-items:center;justify-content:center;height:100%;color:rgba(128,128,128,0.2);font-size:10px;text-transform:uppercase;letter-spacing:0.2em;';
                          d.textContent = photo.caption;
                          e.target.parentNode.appendChild(d);
                        }} />
                    </motion.div>
                    {/* Hover overlay */}
                    <motion.div className="absolute inset-0 flex items-end p-4"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)' }}>
                      <div className="flex items-center justify-between w-full">
                        <p className="text-white text-xs font-bold tracking-wide">{photo.caption}</p>
                        <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
                            <path d="M3 3h6M3 3v6M17 17h-6M17 17v-6M3 3l14 14" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                          </svg>
                        </div>
                      </div>
                    </motion.div>
                    {/* Number badge */}
                    <div className="absolute top-3 left-3 w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-black"
                      style={{ background: 'rgba(0,0,0,0.5)', color: 'rgba(255,255,255,0.7)' }}>
                      {String(photo.idx + 1).padStart(2, '0')}
                    </div>
                  </motion.div>
                </CursorTrigger>
              </FadeUp>
            ))}
          </motion.div>
        ))}
      </div>

      {/* ── Mobile 2-col masonry ── */}
      <div className="sm:hidden flex gap-3 px-6 items-start">
        {mobileCols.map((col, ci) => (
          <div key={ci} className="flex-1 flex flex-col gap-3">
            {col.map((photo, pi) => (
              <motion.div key={pi}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: ci * 0.1 + pi * 0.07, ease: E }}
                className="relative overflow-hidden rounded-xl cursor-pointer"
                style={{ height: pi % 2 === 0 ? 180 : 240, border: '1px solid rgba(128,128,128,0.12)' }}
                onClick={() => setLightbox(photo.idx)}>
                <img src={photo.src} alt={photo.caption}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentNode.style.background = 'rgba(128,128,128,0.07)';
                    const d = document.createElement('div');
                    d.style.cssText = 'display:flex;align-items:center;justify-content:center;height:100%;color:rgba(128,128,128,0.18);font-size:9px;text-transform:uppercase;';
                    d.textContent = photo.caption;
                    e.target.parentNode.appendChild(d);
                  }} />
                <div className="absolute bottom-0 left-0 right-0 p-2.5"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)' }}>
                  <p className="text-white text-[10px] font-bold">{photo.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
        ))}
      </div>

      {/* ══ LIGHTBOX ══ */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            key="lightbox"
            className="fixed inset-0 z-[9995] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightbox(null)}>

            {/* Backdrop */}
            <motion.div className="absolute inset-0"
              style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(16px)' }} />

            {/* Image */}
            <motion.div
              className="relative z-10 max-w-4xl w-full mx-6"
              initial={{ scale: 0.88, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 16 }}
              transition={{ duration: 0.45, ease: E }}
              onClick={(e) => e.stopPropagation()}>
              <img src={photos[lightbox]?.src} alt={photos[lightbox]?.caption}
                className="w-full rounded-2xl object-contain"
                style={{ maxHeight: '80vh', border: '1px solid rgba(255,255,255,0.08)' }} />
              {/* Caption bar */}
              <div className="flex items-center justify-between mt-4 px-1">
                <p className="text-white/70 text-sm font-medium">{photos[lightbox]?.caption}</p>
                <p className="text-white/30 text-xs tabular-nums">
                  {lightbox + 1} / {photos.length}
                </p>
              </div>
            </motion.div>

            {/* Prev / Next */}
            {lightbox > 0 && (
              <motion.button
                className="absolute left-4 sm:left-8 z-10 w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: 'white' }}
                whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.14)' }}
                onClick={(e) => { e.stopPropagation(); setLightbox(l => l - 1); }}>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.button>
            )}
            {lightbox < photos.length - 1 && (
              <motion.button
                className="absolute right-4 sm:right-8 z-10 w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: 'white' }}
                whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.14)' }}
                onClick={(e) => { e.stopPropagation(); setLightbox(l => l + 1); }}>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.button>
            )}

            {/* Close */}
            <motion.button
              className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: 'white' }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              transition={{ duration: 0.25 }}
              onClick={() => setLightbox(null)}>
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
const CTASection = () => {
  const [hov, setHov] = useState(false);
  return (
    <section className="px-6 sm:px-12 lg:px-20 py-28 sm:py-40"
      style={{ borderTop: '1px solid rgba(128,128,128,0.1)' }}>
      <FadeUp>
        <p className="text-[9px] tracking-[0.38em] uppercase font-black mb-10"
          style={{ color: 'rgba(128,128,128,0.4)' }}>Ready to connect?</p>
      </FadeUp>
      <FadeUp delay={0.1}>
        <CursorTrigger label="Email">
          <motion.a href={`mailto:${ABOUT_DATA.email}`}
            onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            className="group inline-flex items-end gap-4 mb-14"
            style={{ textDecoration: 'none', color: 'inherit' }}>
            <span className="relative font-black tracking-tighter leading-none"
              style={{ fontSize: 'clamp(18px, 3.5vw, 52px)' }}>
              {ABOUT_DATA.email}
              <motion.span className="absolute -bottom-1 left-0 h-[2px] origin-left"
                animate={{ scaleX: hov ? 1 : 0 }}
                transition={{ duration: 0.55, ease: E }}
                style={{ width: '100%', background: 'currentColor' }} />
            </span>
            <motion.span animate={{ x: hov ? 5 : 0, y: hov ? -5 : 0 }}
              transition={{ duration: 0.3 }}
              style={{ color: 'rgba(128,128,128,0.4)', paddingBottom: '0.2em' }}>
              <Arrow size={24} />
            </motion.span>
          </motion.a>
        </CursorTrigger>
      </FadeUp>
      <FadeUp delay={0.2}>
        <Link to="/" className="group inline-flex items-center gap-2.5 text-sm font-bold"
          style={{ color: 'rgba(128,128,128,0.5)' }}>
          <motion.span whileHover={{ x: -3 }} transition={{ duration: 0.2 }}
            className="inline-flex rotate-180"><Arrow size={14} /></motion.span>
          <span className="relative">
            Back to Portfolio
            <span className="absolute -bottom-px left-0 h-px w-full origin-right scale-x-0 group-hover:scale-x-100 group-hover:origin-left transition-transform duration-500"
              style={{ background: 'currentColor' }} />
          </span>
        </Link>
      </FadeUp>
      <FadeUp delay={0.3} className="mt-16 pt-8"
        style={{ borderTop: '1px solid rgba(128,128,128,0.1)' }}>
        <p className="text-xs" style={{ color: 'rgba(128,128,128,0.3)' }}>
          © {new Date().getFullYear()} {ABOUT_DATA.name} — Crafted with precision
        </p>
      </FadeUp>
    </section>
  );
};

/* ══════════════════════════════════════════════════
   FIXED NAVBAR (transparent → frosted on scroll)
══════════════════════════════════════════════════ */
const NavBar = ({ darkMode }) => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => scrollY.on('change', (v) => setScrolled(v > 80)), [scrollY]);

  return (
    <motion.header
      initial={{ y: -80 }} animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: E2, delay: 0.05 }}
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 sm:px-12 py-4 transition-all duration-500"
      style={{
        backdropFilter: scrolled ? 'blur(18px) saturate(180%)' : 'none',
        background: scrolled ? (darkMode ? 'rgba(5,5,5,0.78)' : 'rgba(255,255,255,0.78)') : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(128,128,128,0.1)' : '1px solid transparent',
      }}>
      <button onClick={() => navigate(-1)}
        className="group flex items-center gap-2 text-sm font-bold"
        style={{ color: scrolled ? undefined : 'rgba(255,255,255,0.65)' }}>
        <motion.span whileHover={{ x: -3 }} className="inline-flex rotate-180">
          <Arrow size={14} />
        </motion.span>
        <span className="relative hidden sm:inline">
          Back
          <span className="absolute -bottom-px left-0 h-px w-full origin-right scale-x-0 group-hover:scale-x-100 group-hover:origin-left transition-transform duration-500"
            style={{ background: 'currentColor' }} />
        </span>
      </button>

      <p className="text-[9px] tracking-[0.32em] uppercase font-black"
        style={{ color: scrolled ? 'rgba(128,128,128,0.5)' : 'rgba(255,255,255,0.35)' }}>
        {ABOUT_DATA.name}
      </p>

      <CursorTrigger label="Email">
        <motion.a href={`mailto:${ABOUT_DATA.email}`}
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
          className="hidden sm:flex items-center gap-1.5 text-[10px] font-black tracking-widest uppercase px-4 py-2 rounded-full"
          style={{
            border: scrolled ? '1px solid rgba(128,128,128,0.2)' : '1px solid rgba(255,255,255,0.2)',
            color: scrolled ? undefined : 'rgba(255,255,255,0.65)',
            background: scrolled ? 'rgba(128,128,128,0.06)' : 'rgba(255,255,255,0.05)',
          }}>
          Say Hello
        </motion.a>
      </CursorTrigger>
    </motion.header>
  );
};

/* ══════════════════════════════════════════════════
   PAGE ROOT
══════════════════════════════════════════════════ */
const AboutMe = ({ darkMode }) => {
  const [preloaderDone, setPreloaderDone] = useState(false);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, []);

  return (
    <>
      {/* Preloader */}
      {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}

      {/* Grain texture */}
      <Grain />

      {/* Magnetic cursor */}
      <MagneticCursor darkMode={darkMode} />

      {/* Page */}
      <motion.div
        className="min-h-screen"
        initial={{ opacity: 0 }}
        animate={preloaderDone ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}>
        <NavBar darkMode={darkMode} />
        <HeroSection darkMode={darkMode} loaded={preloaderDone} />
        <WhoIAmSection />
        <StatsSection />
        <MarqueeSection />
        <TimelineSection />
        <PersonalitySection />
        <HobbiesSection />
        <ValuesSection />
        <GallerySection />
        <CurrentlySection />
        <CTASection />
      </motion.div>
    </>
  );
};

export default AboutMe;