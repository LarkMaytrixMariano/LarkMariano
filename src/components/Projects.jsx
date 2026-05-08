import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { PROJECTS, projectTechIcons } from '../constants';

/* ─── Arrow Icon ─────────────────────────────────────── */
const ArrowIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M4 16L16 4M16 4H8M16 4V12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ─── Tech Badge ─────────────────────────────────────── */
const TechBadge = ({ tech, active }) => {
  const techIcon = projectTechIcons?.find(
    (icon) => icon.label === tech || icon.label === tech.replace('.js', '')
  );
  return (
    <span
      className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium transition-all duration-300"
      style={{
        border: '1px solid rgba(128,128,128,0.22)',
        color: 'rgba(128,128,128,0.85)',
        background: active ? 'rgba(128,128,128,0.09)' : 'transparent',
        whiteSpace: 'nowrap',
      }}
    >
      {techIcon ? <techIcon.icon className={techIcon.className} style={{ fontSize: 11 }} /> : null}
      {tech}
    </span>
  );
};

/* ─── Mobile Card ────────────────────────────────────── */
const MobileCard = ({ project, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 32 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
      }}
      className="rounded-2xl overflow-hidden"
      style={{ border: '1px solid rgba(128,128,128,0.14)', background: 'rgba(128,128,128,0.03)' }}
    >
      {/* Thumbnail */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: 180 }}
        onClick={() => window.open(project.url, '_blank')}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 active:scale-105"
          draggable="false"
        />
        {/* Index badge */}
        <div
          className="absolute top-3 left-3 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold"
          style={{ background: 'rgba(0,0,0,0.6)', color: '#fff', letterSpacing: '0.05em' }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>
        {/* View badge */}
        <div
          className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium"
          style={{ background: 'rgba(0,0,0,0.55)', color: '#fff' }}
        >
          View <ArrowIcon size={11} />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div
          className="flex items-start justify-between gap-3 cursor-pointer"
          onClick={() => setOpen((v) => !v)}
        >
          <h3 className="font-bold text-lg leading-tight">{project.title}</h3>
          <motion.div
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0 mt-0.5"
            style={{ opacity: 0.5 }}
          >
            <ArrowIcon size={16} />
          </motion.div>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="desc"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p
                className="text-sm leading-relaxed mt-2 mb-3"
                style={{ color: 'rgba(128,128,128,0.7)' }}
              >
                {project.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.technologies?.map((tech, i) => (
            <TechBadge key={i} tech={tech} active={false} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Desktop Row ────────────────────────────────────── */
const DesktopRow = ({ project, index, activeIndex, setActiveIndex, setCursorVisible }) => {
  const isActive = activeIndex === index;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
      }}
      className="group relative"
      style={{ borderBottom: '1px solid rgba(128,128,128,0.13)' }}
      onMouseEnter={() => { setActiveIndex(index); setCursorVisible(true); }}
      onMouseLeave={() => { setActiveIndex(null); setCursorVisible(false); }}
      onClick={() => window.open(project.url, '_blank')}
    >
      {/* Hover fill */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-xl"
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: isActive ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ background: 'linear-gradient(90deg, rgba(128,128,128,0.05) 0%, transparent 80%)' }}
      />

      <div className="relative flex items-center gap-8 xl:gap-12 py-6 xl:py-8 cursor-none overflow-hidden px-2">
        {/* Number */}
        <div className="flex-shrink-0 w-10 xl:w-14">
          <motion.span
            className="font-semibold tabular-nums select-none"
            style={{
              fontSize: 'clamp(11px, 1vw, 13px)',
              color: isActive ? 'rgba(128,128,128,0.9)' : 'rgba(128,128,128,0.3)',
              letterSpacing: '0.05em',
            }}
            animate={{ y: isActive ? -2 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {String(index + 1).padStart(2, '0')}
          </motion.span>
        </div>

        {/* Thumbnail */}
        <motion.div
          className="flex-shrink-0 overflow-hidden rounded-xl"
          animate={{
            width: isActive ? 130 : 70,
            height: isActive ? 86 : 50,
            opacity: isActive ? 1 : 0.72,
          }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{ minWidth: 70 }}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            draggable="false"
          />
        </motion.div>

        {/* Title + Description */}
        <div className="flex-1 min-w-0">
          <motion.h3
            className="font-bold leading-tight"
            style={{ fontSize: 'clamp(17px, 2vw, 26px)' }}
            animate={{ x: isActive ? 5 : 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {project.title}
          </motion.h3>
          <motion.p
            className="text-sm leading-relaxed mt-1"
            style={{
              color: 'rgba(128,128,128,0.62)',
              maxWidth: 460,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 7 }}
            transition={{ duration: 0.3 }}
          >
            {project.description}
          </motion.p>
        </div>

        {/* Tech Badges */}
        <motion.div
          className="flex-shrink-0 flex flex-wrap gap-2 justify-end"
          style={{ maxWidth: 300 }}
          animate={{ opacity: isActive ? 1 : 0.35 }}
          transition={{ duration: 0.3 }}
        >
          {project.technologies?.slice(0, 4).map((tech, i) => (
            <TechBadge key={i} tech={tech} active={isActive} />
          ))}
          {project.technologies?.length > 4 && (
            <span
              className="text-xs px-2 py-0.5"
              style={{ color: 'rgba(128,128,128,0.45)' }}
            >
              +{project.technologies.length - 4}
            </span>
          )}
        </motion.div>

        {/* Arrow */}
        <motion.div
          className="flex-shrink-0 ml-1"
          animate={{
            x: isActive ? 0 : -10,
            opacity: isActive ? 1 : 0,
            rotate: isActive ? -45 : 0,
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <ArrowIcon size={18} />
        </motion.div>
      </div>
    </motion.div>
  );
};

/* ─── Main Export ────────────────────────────────────── */
const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 420, damping: 30 });
  const springY = useSpring(cursorY, { stiffness: 420, damping: 30 });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const move = (e) => {
      cursorX.set(e.clientX - 40);
      cursorY.set(e.clientY - 40);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [isMobile]);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
  };

  return (
    <section id="projects" className="relative pb-24 pt-8 scroll-mt-8">

      {/* ── Custom cursor (desktop only) ── */}
      {!isMobile && (
        <motion.div
          style={{ left: springX, top: springY, position: 'fixed', zIndex: 9999 }}
          animate={{ opacity: cursorVisible ? 1 : 0, scale: cursorVisible ? 1 : 0.3 }}
          transition={{ duration: 0.18 }}
          className="w-20 h-20 rounded-full pointer-events-none flex items-center justify-center"
          aria-hidden="true"
        >
          <div
            className="w-full h-full rounded-full flex items-center justify-center"
            style={{
              background: 'rgba(10,10,10,0.88)',
              color: '#fff',
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            View
          </div>
        </motion.div>
      )}

      {/* ── Section Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10 md:mb-14 px-5 sm:px-8 lg:px-16 flex items-end justify-between pb-5 md:pb-6"
        style={{ borderBottom: '1px solid rgba(128,128,128,0.18)' }}
      >
        <div>
          <p
            className="text-[10px] sm:text-xs tracking-[0.28em] uppercase mb-2 sm:mb-3 font-semibold"
            style={{ color: 'rgba(128,128,128,0.55)' }}
          >
            Selected Work
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-none">
            Projects
          </h2>
        </div>
        <span
          className="text-xs sm:text-sm"
          style={{ color: 'rgba(128,128,128,0.4)' }}
        >
          {PROJECTS.length} works
        </span>
      </motion.div>

      {/* ── Mobile Grid (< md) ── */}
      <motion.div
        className="md:hidden px-5 sm:px-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        {PROJECTS.map((project, index) => (
          <MobileCard key={index} project={project} index={index} />
        ))}
      </motion.div>

      {/* ── Desktop List (≥ md) ── */}
      <motion.div
        className="hidden md:block px-6 lg:px-14"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {PROJECTS.map((project, index) => (
          <DesktopRow
            key={index}
            project={project}
            index={index}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            setCursorVisible={setCursorVisible}
          />
        ))}
      </motion.div>

      {/* ── Footer CTA ── */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="mt-12 md:mt-16 px-5 sm:px-8 lg:px-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <p className="text-xs sm:text-sm" style={{ color: 'rgba(128,128,128,0.4)' }}>
          More projects available on Vercel
        </p>
        <a
          href="https://vercel.com/larkmaytrixmarianos-projects"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 text-sm font-semibold relative"
          style={{ color: 'inherit' }}
        >
          <span className="relative">
            View All Projects
            <span
              className="absolute -bottom-px left-0 h-px w-full origin-right scale-x-0 group-hover:scale-x-100 group-hover:origin-left transition-transform duration-500"
              style={{ background: 'currentColor' }}
            />
          </span>
          <motion.span
            whileHover={{ x: 3, y: -3 }}
            transition={{ duration: 0.25 }}
            className="inline-flex"
          >
            <ArrowIcon size={15} />
          </motion.span>
        </a>
      </motion.div>
    </section>
  );
};

export default Projects;