import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CERTIFICATIONS } from '../constants';

/* ── Arrow Icon ──────────────────────────────────────── */
const ArrowIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M4 16L16 4M16 4H8M16 4V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ── Cert Card ───────────────────────────────────────── */
const CertCard = ({ cert, index, featured }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative overflow-hidden rounded-2xl flex flex-col"
      style={{
        border: '1px solid rgba(128,128,128,0.15)',
        background: 'rgba(128,128,128,0.03)',
        cursor: cert.url ? 'pointer' : 'default',
      }}
      onClick={() => cert.url && window.open(cert.url, '_blank')}
    >
      {/* ── Image ── */}
      <div
        className="relative overflow-hidden"
        style={{ height: featured ? 240 : 180 }}
      >
        <motion.img
          src={cert.image}
          alt={cert.title}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.04 : 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Overlay on hover */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ background: 'rgba(0,0,0,0.45)' }}
        >
          {cert.url && (
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(255,255,255,0.95)', color: '#0a0a0a' }}
            >
              View Certificate <ArrowIcon size={12} />
            </div>
          )}
        </motion.div>

        {/* Index badge */}
        <div
          className="absolute top-3 left-3 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold"
          style={{ background: 'rgba(0,0,0,0.6)', color: '#fff' }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Featured badge */}
        {featured && (
          <div
            className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase"
            style={{ background: 'rgba(0,0,0,0.6)', color: 'rgba(255,255,255,0.85)' }}
          >
            Featured
          </div>
        )}
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-1 p-5">
        {/* Issuer + date */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold tracking-wider uppercase" style={{ color: 'rgba(128,128,128,0.55)' }}>
            {cert.issuer}
          </p>
          <p className="text-xs tabular-nums" style={{ color: 'rgba(128,128,128,0.4)' }}>
            {cert.date}
          </p>
        </div>

        {/* Title */}
        <h3 className="font-bold leading-snug mb-2" style={{ fontSize: 'clamp(15px, 1.6vw, 19px)' }}>
          {cert.title}
        </h3>

        {/* Description */}
        {cert.description && (
          <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: 'rgba(128,128,128,0.65)' }}>
            {cert.description}
          </p>
        )}

        {/* Skills */}
        {cert.skills?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-auto pt-4" style={{ borderTop: '1px solid rgba(128,128,128,0.1)' }}>
            {cert.skills.map((skill, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-full text-[11px] font-medium"
                style={{
                  border: '1px solid rgba(128,128,128,0.18)',
                  color: 'rgba(128,128,128,0.8)',
                  background: 'rgba(128,128,128,0.05)',
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

/* ── Main Component ──────────────────────────────────── */
const Certification = () => {
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
            Credentials
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-none">
            Certifications
          </h2>
        </div>
        <span className="text-xs sm:text-sm" style={{ color: 'rgba(128,128,128,0.4)' }}>
          {CERTIFICATIONS.length} certs
        </span>
      </motion.div>

      {/* ── Masonry-style grid ── */}
      <div className="px-5 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {CERTIFICATIONS.map((cert, index) => {
            const featured = index === 0;
            return (
              <div
                key={index}
                className={
                  featured
                    ? 'sm:col-span-2 lg:col-span-2'
                    : index === 3
                    ? 'sm:col-span-2 lg:col-span-1'
                    : ''
                }
              >
                <CertCard cert={cert} index={index} featured={featured} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Certification;