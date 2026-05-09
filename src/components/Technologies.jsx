import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimationFrame, useMotionValue, AnimatePresence } from 'framer-motion';
import { techIcons } from '../constants';

/* ─── Single icon cell (desktop hover interaction) ──── */
const TechCell = ({ tech }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = tech.icon;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col items-center justify-center cursor-default flex-shrink-0"
      style={{ width: 88, height: 88 }}
    >
      {/* Hover bg */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.85 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        style={{ background: 'rgba(128,128,128,0.07)', border: '1px solid rgba(128,128,128,0.15)' }}
      />
      {/* Icon */}
      <motion.div
        animate={{ y: hovered ? -4 : 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex items-center justify-center"
      >
        <Icon className={tech.className} />
      </motion.div>
      {/* Label tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.18 }}
            className="absolute -bottom-7 text-[10px] font-semibold tracking-wider uppercase whitespace-nowrap pointer-events-none"
            style={{ color: 'rgba(128,128,128,0.7)' }}
          >
            {tech.label}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─── Mobile icon pill ───────────────────────────────── */
const MobileCell = ({ tech }) => {
  const Icon = tech.icon;
  return (
    <div className="flex flex-col items-center gap-2 flex-shrink-0" style={{ width: 72 }}>
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center"
        style={{ background: 'rgba(128,128,128,0.06)', border: '1px solid rgba(128,128,128,0.12)' }}
      >
        <Icon className={tech.className} />
      </div>
      <span
        className="text-[9px] font-semibold tracking-wider uppercase text-center leading-tight"
        style={{ color: 'rgba(128,128,128,0.55)' }}
      >
        {tech.label}
      </span>
    </div>
  );
};

/* ─── Infinite Marquee ───────────────────────────────────
   Pure CSS-class approach:
   - Duplicates the icon list 3× so the loop is seamless
   - useAnimationFrame drives a motion value for buttery 60fps
   - Pauses on hover (desktop)
   - speed prop controls px/frame
───────────────────────────────────────────────────────── */
const InfiniteMarquee = ({ items, speed = 0.5, direction = 'left', renderItem, gap = 16 }) => {
  const [paused, setPaused] = useState(false);
  const [totalWidth, setTotalWidth] = useState(0);
  const trackRef = useRef(null);
  const x = useMotionValue(0);

  // Measure the width of ONE set of items (before duplication)
  useEffect(() => {
    if (!trackRef.current) return;
    // The track has 3 copies; one copy = 1/3 of scrollWidth
    const measure = () => setTotalWidth(trackRef.current.scrollWidth / 3);
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [items]);

  useAnimationFrame(() => {
    if (paused || totalWidth === 0) return;

    const delta = direction === 'left' ? -speed : speed;
    let next = x.get() + delta;

    // Seamless loop: when we've scrolled one full copy, reset to 0
    if (direction === 'left' && next <= -totalWidth) next = 0;
    if (direction === 'right' && next >= 0) next = -totalWidth;

    x.set(next);
  });

  // Triple the items for seamless infinite loop
  const tripled = [...items, ...items, ...items];

  return (
    <div
      className="overflow-hidden w-full relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Left fade mask */}
      <div
        className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
        style={{
          width: 80,
          background: 'linear-gradient(to right, var(--mask-color, rgba(0,0,0,0)) 0%, transparent 100%)',
        }}
      />
      {/* Right fade mask */}
      <div
        className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
        style={{
          width: 80,
          background: 'linear-gradient(to left, var(--mask-color, rgba(0,0,0,0)) 0%, transparent 100%)',
        }}
      />

      <motion.div
        ref={trackRef}
        style={{ x, display: 'flex', gap, willChange: 'transform' }}
        className="w-max py-4"
      >
        {tripled.map((item, i) => (
          <div key={i} className="flex-shrink-0">
            {renderItem(item, i)}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

/* ─── Main Component ─────────────────────────────────── */
const Technologies = () => {
  return (
    <section className="relative pb-24 lg:pt-36 overflow-visible">

      {/* ── Section Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12 md:mb-16 px-5 sm:px-8 lg:px-16 flex items-end justify-between pb-5 md:pb-6"
        style={{ borderBottom: '1px solid rgba(128,128,128,0.18)' }}
      >
        <div>
          <p
            className="text-[10px] sm:text-xs tracking-[0.28em] uppercase mb-2 sm:mb-3 font-semibold"
            style={{ color: 'rgba(128,128,128,0.5)' }}
          >
            Stack
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-none">
            Technologies
          </h2>
        </div>
        <span className="text-xs sm:text-sm" style={{ color: 'rgba(128,128,128,0.4)' }}>
          {techIcons.length} tools
        </span>
      </motion.div>

      {/* ── Marquee — Desktop (row 1 → left, row 2 → right) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="hidden sm:block mb-6"
      >
        {/* Row 1 — scrolls left */}
        <InfiniteMarquee
          items={techIcons}
          speed={0.45}
          direction="left"
          gap={12}
          renderItem={(tech) => <TechCell tech={tech} />}
        />
        {/* Row 2 — scrolls right (offset start for visual variety) */}
        <InfiniteMarquee
          items={[...techIcons].reverse()}
          speed={0.38}
          direction="right"
          gap={12}
          renderItem={(tech) => <TechCell tech={tech} />}
        />
      </motion.div>

      {/* ── Marquee — Mobile (single row, slightly faster) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="sm:hidden mb-4"
      >
        <InfiniteMarquee
          items={techIcons}
          speed={0.6}
          direction="left"
          gap={10}
          renderItem={(tech) => <MobileCell tech={tech} />}
        />
      </motion.div>

      {/* ── Pause hint ── */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="hidden sm:block text-center text-[10px] tracking-widest uppercase mb-10"
        style={{ color: 'rgba(128,128,128,0.3)' }}
      >
        Hover to pause
      </motion.p>

      {/* ── Bottom count strip ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-6 px-5 sm:px-8 lg:px-16 flex items-center gap-6"
        style={{ borderTop: '1px solid rgba(128,128,128,0.12)', paddingTop: '1.5rem' }}
      >
        <p className="text-xs" style={{ color: 'rgba(128,128,128,0.4)' }}>
          Technologies I actively work with
        </p>
        <div className="flex-1 h-px" style={{ background: 'rgba(128,128,128,0.1)' }} />
        <p className="text-xs font-semibold tabular-nums" style={{ color: 'rgba(128,128,128,0.35)' }}>
          {techIcons.length}
        </p>
      </motion.div>
    </section>
  );
};

export default Technologies;