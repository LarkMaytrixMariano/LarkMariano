import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { COMPANY_PROJECTS } from '../constants';
import { projectTechIcons } from '../constants';

/* ─── Icons ─────────────────────────────────────────────── */
const ArrowIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M4 16L16 4M16 4H8M16 4V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const LockIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect x="4" y="9" width="12" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 9V6a3 3 0 0 1 6 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const PlayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M6 4.5l10 5.5-10 5.5V4.5z" fill="currentColor" />
  </svg>
);
const SpinnerIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"
    className="animate-spin" style={{ animationDuration: '1.2s' }}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.25" />
    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

/* ─── Status badge config ───────────────────────────────── */
const STATUS_CONFIG = {
  ongoing: {
    label: 'Ongoing',
    dot: 'bg-amber-400',
    dotPulse: true,
    color: 'rgba(251,191,36,0.85)',
    border: 'rgba(251,191,36,0.3)',
    bg: 'rgba(251,191,36,0.07)',
  },
  production: {
    label: 'Production',
    dot: 'bg-green-400',
    dotPulse: true,
    color: 'rgba(34,197,94,0.85)',
    border: 'rgba(34,197,94,0.3)',
    bg: 'rgba(34,197,94,0.07)',
  },
  completed: {
    label: 'Completed',
    dot: 'bg-blue-400',
    dotPulse: false,
    color: 'rgba(96,165,250,0.85)',
    border: 'rgba(96,165,250,0.3)',
    bg: 'rgba(96,165,250,0.07)',
  },
};

const getStatusConfig = (statusString = '') => {
  const s = statusString.toLowerCase();
  if (s.includes('ongoing')) return STATUS_CONFIG.ongoing;
  if (s.includes('production')) return STATUS_CONFIG.production;
  return STATUS_CONFIG.completed;
};

/* ─── Tech Badge ────────────────────────────────────────── */
const TechBadge = ({ tech }) => {
  const techIcon = projectTechIcons?.find(
    (icon) => icon.label === tech || icon.label === tech.replace('.js', '')
  );
  return (
    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
      style={{ border: '1px solid rgba(128,128,128,0.2)', color: 'rgba(128,128,128,0.85)', background: 'rgba(128,128,128,0.05)' }}>
      {techIcon ? <techIcon.icon className={techIcon.className} style={{ fontSize: 13 }} /> : null}
      {tech}
    </span>
  );
};

/* ─── Video Player ──────────────────────────────────────── */
const VideoPlayer = ({ project }) => {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    playing ? videoRef.current.pause() : videoRef.current.play();
  };

  if (project.videoEmbed) {
    return (
      <div className="relative w-full overflow-hidden rounded-2xl"
        style={{ paddingBottom: '56.25%', background: 'rgba(0,0,0,0.4)' }}>
        <iframe src={project.videoEmbed} title={project.title}
          allow="autoplay; fullscreen" allowFullScreen
          className="absolute inset-0 w-full h-full rounded-2xl" style={{ border: 'none' }} />
      </div>
    );
  }

  if (project.videoUrl) {
    return (
      <div className="relative w-full overflow-hidden rounded-2xl cursor-pointer"
        style={{ background: 'rgba(0,0,0,0.5)' }} onClick={togglePlay}>
        <video ref={videoRef} src={project.videoUrl} poster={project.thumbnail}
          className="w-full rounded-2xl" style={{ display: 'block' }}
          onEnded={() => setPlaying(false)} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
        <AnimatePresence>
          {!playing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center rounded-2xl"
              style={{ background: 'rgba(0,0,0,0.45)' }}>
              <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.95)', color: '#0a0a0a', paddingLeft: 3 }}>
                <PlayIcon />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  /* ── Ongoing / no video placeholder ── */
  const isOngoing = project.status?.toLowerCase().includes('ongoing');
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 rounded-2xl py-20 px-6 text-center"
      style={{ border: `1px dashed ${isOngoing ? 'rgba(251,191,36,0.3)' : 'rgba(128,128,128,0.2)'}`, background: isOngoing ? 'rgba(251,191,36,0.03)' : 'rgba(128,128,128,0.03)' }}>
      {isOngoing ? (
        <>
          <div className="flex items-center gap-2" style={{ color: 'rgba(251,191,36,0.7)' }}>
            <SpinnerIcon />
            <span className="text-sm font-semibold tracking-wider uppercase">In Development</span>
          </div>
          <p className="text-sm max-w-xs" style={{ color: 'rgba(128,128,128,0.5)' }}>
            This project is currently being built. A demo video will be added once a stable version is ready.
          </p>
        </>
      ) : (
        <>
          <LockIcon size={24} />
          <p className="text-sm font-medium" style={{ color: 'rgba(128,128,128,0.5)' }}>Demo video coming soon</p>
        </>
      )}
    </div>
  );
};

/* ─── Ongoing progress bar ──────────────────────────────── */
const ProgressBar = ({ percent = 0, label }) => (
  <div className="mb-8">
    <div className="flex items-center justify-between mb-2">
      <p className="text-[10px] tracking-[0.28em] uppercase font-semibold" style={{ color: 'rgba(128,128,128,0.45)' }}>
        {label || 'Progress'}
      </p>
      <span className="text-xs font-bold tabular-nums" style={{ color: 'rgba(251,191,36,0.8)' }}>
        {percent}%
      </span>
    </div>
    <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(128,128,128,0.12)' }}>
      <motion.div
        className="h-full rounded-full"
        style={{ background: 'linear-gradient(90deg, rgba(251,191,36,0.6), rgba(251,191,36,1))' }}
        initial={{ width: 0 }}
        animate={{ width: `${percent}%` }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  </div>
);

/* ─── Main page ─────────────────────────────────────────── */
const CompanyProjectDetail = ({ darkMode }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = COMPANY_PROJECTS.find((p) => p.id === id);

  useEffect(() => { window.scrollTo({ top: 0 }); }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6">
        <p className="text-xl font-bold">Project not found</p>
        <Link to="/" className="text-sm underline" style={{ color: 'rgba(128,128,128,0.6)' }}>← Back home</Link>
      </div>
    );
  }

  const isOngoing   = project.status?.toLowerCase().includes('ongoing');
  const statusCfg   = getStatusConfig(project.status);
  const containerV  = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };
  const itemV       = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };

  return (
    <div className="min-h-screen">
      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 py-8">

        {/* ── Top nav ── */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-between mb-12 md:mb-16">
          <button onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-sm font-medium"
            style={{ color: 'rgba(128,128,128,0.6)' }}>
            <motion.span whileHover={{ x: -3 }} transition={{ duration: 0.2 }} className="inline-flex rotate-180">
              <ArrowIcon size={14} />
            </motion.span>
            <span className="relative">
              Back to Projects
              <span className="absolute -bottom-px left-0 h-px w-full origin-right scale-x-0 group-hover:scale-x-100 group-hover:origin-left transition-transform duration-500"
                style={{ background: 'currentColor' }} />
            </span>
          </button>

          <div className="flex items-center gap-2">
            {/* Ongoing / Internal badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold"
              style={{ border: `1px solid ${statusCfg.border}`, color: statusCfg.color, background: statusCfg.bg }}>
              {isOngoing ? (
                <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot} animate-pulse inline-block`} />
              ) : (
                <LockIcon size={11} />
              )}
              {isOngoing ? 'Ongoing' : 'Internal System'}
            </div>
          </div>
        </motion.div>

        {/* ── Header ── */}
        <motion.div variants={containerV} initial="hidden" animate="visible" className="mb-10 md:mb-14">
          <motion.p variants={itemV} className="text-[10px] sm:text-xs tracking-[0.28em] uppercase mb-3 font-semibold"
            style={{ color: 'rgba(128,128,128,0.5)' }}>
            {project.company} · {project.year}
          </motion.p>

          <div className="flex flex-wrap items-start gap-4 mb-3">
            <motion.h1 variants={itemV} className="font-black tracking-tighter leading-none"
              style={{ fontSize: 'clamp(36px, 6vw, 80px)' }}>
              {project.title}
            </motion.h1>
            {/* Ongoing banner inline with title on desktop */}
            {isOngoing && (
              <motion.div variants={itemV}
                className="self-center flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)', color: 'rgba(251,191,36,0.9)' }}>
                <SpinnerIcon /> In Development
              </motion.div>
            )}
          </div>

          <motion.p variants={itemV} className="text-base sm:text-lg font-medium mb-6"
            style={{ color: 'rgba(128,128,128,0.55)' }}>
            {project.fullTitle}
          </motion.p>

          {/* Meta row */}
          <motion.div variants={itemV} className="flex flex-wrap items-center gap-3 sm:gap-4 pt-5"
            style={{ borderTop: '1px solid rgba(128,128,128,0.14)' }}>
            {[
              { label: 'Role',   value: project.role   },
              { label: 'Year',   value: project.year   },
              { label: 'Status', value: project.status },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center gap-2">
                <span className="text-[10px] tracking-widest uppercase font-semibold"
                  style={{ color: 'rgba(128,128,128,0.4)' }}>{label}</span>
                <span className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{
                    background: label === 'Status' ? statusCfg.bg    : 'rgba(128,128,128,0.07)',
                    color:      label === 'Status' ? statusCfg.color : 'rgba(128,128,128,0.8)',
                    border:     `1px solid ${label === 'Status' ? statusCfg.border : 'rgba(128,128,128,0.15)'}`,
                  }}>
                  {value}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Progress bar (ongoing only) ── */}
        {isOngoing && project.progress !== undefined && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 md:mb-12">
            <ProgressBar percent={project.progress} label="Development Progress" />
          </motion.div>
        )}

        {/* ── Video / placeholder ── */}
        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16">
          <VideoPlayer project={project} />
        </motion.div>

        {/* ── Ongoing notice banner ── */}
        {isOngoing && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mb-10 flex items-start gap-3 p-4 rounded-xl text-sm"
            style={{ background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.2)', color: 'rgba(251,191,36,0.8)' }}>
            <SpinnerIcon />
            <p className="leading-relaxed">
              This project is currently under active development. Details, features, and the demo video will be updated as development progresses.
              {project.expectedCompletion && (
                <> <strong>Expected completion:</strong> {project.expectedCompletion}.</>
              )}
            </p>
          </motion.div>
        )}

        {/* ── Purpose + Highlights ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <p className="text-[10px] tracking-[0.28em] uppercase mb-4 font-semibold"
              style={{ color: 'rgba(128,128,128,0.45)' }}>Purpose</p>
            <p className="text-base leading-relaxed" style={{ color: 'rgba(128,128,128,0.75)' }}>
              {project.purpose}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
            <p className="text-[10px] tracking-[0.28em] uppercase mb-4 font-semibold"
              style={{ color: 'rgba(128,128,128,0.45)' }}>
              {isOngoing ? 'Planned Highlights' : 'Key Highlights'}
            </p>
            <ul className="space-y-3">
              {project.highlights?.map((h, i) => (
                <motion.li key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.4 }}
                  className="flex items-start gap-3 text-sm leading-relaxed"
                  style={{ color: 'rgba(128,128,128,0.72)' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-1.5"
                    style={{ background: isOngoing ? 'rgba(251,191,36,0.5)' : 'rgba(128,128,128,0.35)' }} />
                  {h}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ── Tech Stack ── */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="pb-16" style={{ borderTop: '1px solid rgba(128,128,128,0.13)', paddingTop: '2rem' }}>
          <p className="text-[10px] tracking-[0.28em] uppercase mb-5 font-semibold"
            style={{ color: 'rgba(128,128,128,0.45)' }}>Tech Stack</p>
          <div className="flex flex-wrap gap-2.5">
            {project.technologies?.map((tech, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.04, duration: 0.35 }}>
                <TechBadge tech={tech} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Footer nav ── */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(128,128,128,0.13)' }}>
          <p className="text-xs" style={{ color: 'rgba(128,128,128,0.4)' }}>
            {isOngoing ? 'Active development · Not yet in production' : 'Internal system · Not publicly accessible'}
          </p>
          <Link to="/#projects" className="group flex items-center gap-2 text-sm font-semibold" style={{ color: 'inherit' }}>
            <span className="relative">
              View All Projects
              <span className="absolute -bottom-px left-0 h-px w-full origin-right scale-x-0 group-hover:scale-x-100 group-hover:origin-left transition-transform duration-500"
                style={{ background: 'currentColor' }} />
            </span>
            <motion.span whileHover={{ x: 2, y: -2 }} transition={{ duration: 0.2 }} className="inline-flex">
              <ArrowIcon size={14} />
            </motion.span>
          </Link>
        </motion.div>

      </div>
    </div>
  );
};

export default CompanyProjectDetail;