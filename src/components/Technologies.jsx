import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { techIcons } from '../constants';

/* ── Stagger container ─────────────────────────────── */
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045, delayChildren: 0.1 } },
};
const iconItem = {
  hidden: { opacity: 0, y: 24, scale: 0.88 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Single icon cell ──────────────────────────────── */
const TechCell = ({ tech }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = tech.icon;

  return (
    <motion.div
      variants={iconItem}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col items-center justify-center cursor-default"
      style={{
        width: 'clamp(72px, 10vw, 96px)',
        height: 'clamp(72px, 10vw, 96px)',
      }}
    >
      {/* Background circle on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        animate={{
          opacity: hovered ? 1 : 0,
          scale: hovered ? 1 : 0.85,
        }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        style={{ background: 'rgba(128,128,128,0.07)', border: '1px solid rgba(128,128,128,0.15)' }}
      />

      {/* Icon */}
      <motion.div
        animate={{ y: hovered ? -4 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
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
            transition={{ duration: 0.2 }}
            className="absolute -bottom-6 text-[10px] font-semibold tracking-wider uppercase whitespace-nowrap"
            style={{ color: 'rgba(128,128,128,0.7)' }}
          >
            {tech.label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ── Main Component ────────────────────────────────── */
const Technologies = () => {
  return (
    <section className="relative pb-32 pt-8">

      {/* ── Section Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12 md:mb-16 px-5 sm:px-8 lg:px-16 flex items-end justify-between pb-5 md:pb-6 lg:pt-36"
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

      {/* ── Marquee-style scrolling row on mobile / wrap grid on desktop ── */}
      <div className="px-5 sm:px-8 lg:px-16">

        {/* Desktop: centered wrap grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="hidden sm:flex flex-wrap justify-center gap-x-4 gap-y-10 lg:gap-x-6 lg:gap-y-12"
          style={{ paddingBottom: '1.5rem' }}
        >
          {techIcons.map((tech) => (
            <TechCell key={tech.id} tech={tech} />
          ))}
        </motion.div>

        {/* Mobile: horizontal scroll strip */}
        <div className="sm:hidden overflow-x-auto pb-6" style={{ scrollbarWidth: 'none' }}>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex gap-4 w-max px-1"
          >
            {techIcons.map((tech) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={tech.id}
                  variants={iconItem}
                  className="flex flex-col items-center gap-2 flex-shrink-0"
                  style={{ width: 64 }}
                >
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
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* ── Bottom count strip ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-12 px-5 sm:px-8 lg:px-16 flex items-center gap-6"
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