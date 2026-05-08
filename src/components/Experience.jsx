import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EXPERIENCES, projectTechIcons } from '../constants';

/* ── Helpers ────────────────────────────────────────── */
const ArrowIcon = ({ size = 14, rotate = 0 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
    style={{ transform: `rotate(${rotate}deg)`, transition: 'transform 0.35s ease' }}
  >
    <path
      d="M4 16L16 4M16 4H8M16 4V12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TechPill = ({ tech }) => {
  const techIcon = projectTechIcons?.find(
    (icon) => icon.label === tech || icon.label === tech.replace('.js', '')
  );
  return (
    <span
      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium"
      style={{
        border: '1px solid rgba(128,128,128,0.2)',
        color: 'rgba(128,128,128,0.85)',
        background: 'rgba(128,128,128,0.05)',
        whiteSpace: 'nowrap',
      }}
    >
      {techIcon ? (
        <techIcon.icon className={techIcon.className} style={{ fontSize: 12 }} />
      ) : null}
      {tech}
    </span>
  );
};

/* ── Single Experience Row ────────────────────────── */
const ExperienceRow = ({ experience, index, isLast }) => {
  const [expanded, setExpanded] = useState(index === 0); // first open by default
  const isActive = index === 0; // most recent

  /* Bullet descriptions split by '*' */
  const bullets = experience.description
    ? experience.description
        .split('*')
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="relative grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-0"
      style={{
        borderBottom: isLast ? 'none' : '1px solid rgba(128,128,128,0.12)',
      }}
    >
      {/* ── Left — Year + line ── */}
      <div
        className="flex lg:flex-col items-center lg:items-start gap-3 lg:gap-0 pt-6 lg:pt-8 pb-3 lg:pb-8 pr-0 lg:pr-10"
        style={{ borderRight: '0px' }}
      >
        {/* Timeline dot */}
        <div className="hidden lg:flex flex-col items-center mr-6 absolute left-0 top-0 bottom-0" style={{ width: 1 }}>
          {/* invisible — handled by border-left on parent row */}
        </div>

        {/* Year badge */}
        <span
          className="text-xs font-semibold tabular-nums tracking-wider px-2.5 py-1 rounded-full"
          style={{
            color: isActive ? 'rgba(34,197,94,0.9)' : 'rgba(128,128,128,0.55)',
            border: `1px solid ${isActive ? 'rgba(34,197,94,0.3)' : 'rgba(128,128,128,0.18)'}`,
            background: isActive ? 'rgba(34,197,94,0.07)' : 'transparent',
          }}
        >
          {experience.year}
        </span>

        {isActive && (
          <span
            className="flex items-center gap-1 text-[10px] font-medium mt-2 lg:mt-2"
            style={{ color: 'rgba(34,197,94,0.8)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
            Current
          </span>
        )}
      </div>

      {/* ── Right — Content ── */}
      <div className="py-6 lg:py-8 lg:pl-12" style={{ borderLeft: '1px solid rgba(128,128,128,0.12)' }}>

        {/* Header row — clickable to expand */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="w-full flex items-start justify-between gap-4 text-left group"
          aria-expanded={expanded}
        >
          <div className="flex-1 min-w-0">
            <h3
              className="font-bold leading-tight mb-1"
              style={{ fontSize: 'clamp(16px, 2vw, 22px)' }}
            >
              {experience.role}
            </h3>
            <p
              className="text-sm font-medium"
              style={{ color: 'rgba(128,128,128,0.6)' }}
            >
              {experience.company}
            </p>
          </div>
          <motion.span
            animate={{ rotate: expanded ? 90 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0 mt-1"
            style={{ color: 'rgba(128,128,128,0.45)' }}
          >
            <ArrowIcon size={16} />
          </motion.span>
        </button>

        {/* Expandable body */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              {/* Bullet list */}
              {bullets.length > 0 ? (
                <ul className="mt-5 space-y-2.5">
                  {bullets.map((b, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.35 }}
                      className="flex items-start gap-3 text-sm leading-relaxed"
                      style={{ color: 'rgba(128,128,128,0.72)' }}
                    >
                      <span
                        className="flex-shrink-0 w-1 h-1 rounded-full mt-2"
                        style={{ background: 'rgba(128,128,128,0.4)' }}
                      />
                      {b}
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <p
                  className="mt-4 text-sm leading-relaxed"
                  style={{ color: 'rgba(128,128,128,0.7)', maxWidth: 600 }}
                >
                  {experience.description}
                </p>
              )}

              {/* Tech pills */}
              {experience.technologies?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {experience.technologies.map((tech, i) => (
                    <TechPill key={i} tech={tech} />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

/* ── Main Component ───────────────────────────────── */
const Experience = () => {
  return (
    <section className="relative pb-24 pt-8">

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
            Career
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-none">
            Experience
          </h2>
        </div>
        <span
          className="text-xs sm:text-sm"
          style={{ color: 'rgba(128,128,128,0.4)' }}
        >
          {EXPERIENCES.length} roles
        </span>
      </motion.div>

      {/* ── Timeline rows ── */}
      <div className="px-5 sm:px-8 lg:px-16">
        {EXPERIENCES.map((experience, index) => (
          <ExperienceRow
            key={index}
            experience={experience}
            index={index}
            isLast={index === EXPERIENCES.length - 1}
          />
        ))}
      </div>

      {/* ── Footer hint ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-12 px-5 sm:px-8 lg:px-16 flex justify-end"
      >
        <a
          href="/LARK_MARIANO_CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          download
          className="group flex items-center gap-2 text-sm font-medium relative"
          style={{ color: 'rgba(128,128,128,0.6)' }}
        >
          <span className="relative">
            Full CV
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
            <ArrowIcon size={13} />
          </motion.span>
        </a>
      </motion.div>
    </section>
  );
};

export default Experience;