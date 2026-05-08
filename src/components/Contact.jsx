import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CONTACT } from '../constants';

/* ── Arrow Icon ──────────────────────────────────────── */
const ArrowIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M4 16L16 4M16 4H8M16 4V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ── Social link ─────────────────────────────────────── */
const SocialLink = ({ href, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center gap-1.5 text-sm font-medium relative"
    style={{ color: 'rgba(128,128,128,0.6)' }}
  >
    <span className="relative">
      {label}
      <span
        className="absolute -bottom-px left-0 h-px w-full origin-right scale-x-0 group-hover:scale-x-100 group-hover:origin-left transition-transform duration-500"
        style={{ background: 'currentColor' }}
      />
    </span>
    <motion.span
      whileHover={{ x: 2, y: -2 }}
      transition={{ duration: 0.2 }}
      className="inline-flex opacity-0 group-hover:opacity-100 transition-opacity"
    >
      <ArrowIcon size={12} />
    </motion.span>
  </a>
);

/* ── Main Component ──────────────────────────────────── */
const Contact = () => {
  const [emailHovered, setEmailHovered] = useState(false);

  return (
    <section
      className="relative pt-8 pb-0"
      style={{ borderTop: '1px solid rgba(128,128,128,0.18)' }}
    >
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
            style={{ color: 'rgba(128,128,128,0.5)' }}
          >
            Say Hello
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-none">
            Get in Touch
          </h2>
        </div>
        <span className="text-xs sm:text-sm hidden sm:block" style={{ color: 'rgba(128,128,128,0.4)' }}>
          Open to work
        </span>
      </motion.div>

      {/* ── Big email CTA ── */}
      <div className="px-5 sm:px-8 lg:px-16 py-10 md:py-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-sm sm:text-base max-w-lg mb-8 md:mb-12 leading-relaxed"
          style={{ color: 'rgba(128,128,128,0.65)' }}
        >
          Have a project in mind, want to collaborate, or just want to say hi?
          My inbox is always open — I'll get back to you as soon as possible.
        </motion.p>

        {/* Giant email */}
        <motion.a
          href="https://mail.google.com/mail/u/0/#inbox?compose=DmwnWrRlRZNLRlqPkCnzpwXJZcvPrRLljbGSqVSlpNfjKSQXhxVGnthcFZqvPCCNTrqNmJqfDSrl"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={() => setEmailHovered(true)}
          onMouseLeave={() => setEmailHovered(false)}
          className="group relative inline-flex items-center gap-4"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <span
            className="font-black tracking-tighter leading-none relative"
            style={{ fontSize: 'clamp(28px, 5vw, 72px)' }}
          >
            {CONTACT.email}
            {/* Animated underline */}
            <motion.span
              className="absolute -bottom-1 left-0 h-0.5 origin-left"
              animate={{ scaleX: emailHovered ? 1 : 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ width: '100%', background: 'currentColor' }}
            />
          </span>
          <motion.span
            animate={{ x: emailHovered ? 4 : 0, y: emailHovered ? -4 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0"
            style={{ color: 'rgba(128,128,128,0.5)' }}
          >
            <ArrowIcon size={32} />
          </motion.span>
        </motion.a>

        {/* Contact details row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 md:mt-14 flex flex-col sm:flex-row gap-6 sm:gap-10 items-start sm:items-center"
        >
          {/* Phone */}
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase mb-1 font-semibold" style={{ color: 'rgba(128,128,128,0.4)' }}>
              Phone
            </p>
            <p className="text-sm font-medium" style={{ color: 'rgba(128,128,128,0.75)' }}>
              {CONTACT.phoneNo}
            </p>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-8" style={{ background: 'rgba(128,128,128,0.15)' }} />

          {/* Location */}
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase mb-1 font-semibold" style={{ color: 'rgba(128,128,128,0.4)' }}>
              Location
            </p>
            <p className="text-sm font-medium" style={{ color: 'rgba(128,128,128,0.75)' }}>
              {CONTACT.address}
            </p>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-8" style={{ background: 'rgba(128,128,128,0.15)' }} />

          {/* Status */}
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase mb-1 font-semibold" style={{ color: 'rgba(128,128,128,0.4)' }}>
              Status
            </p>
            <p className="text-sm font-medium flex items-center gap-1.5" style={{ color: 'rgba(34,197,94,0.85)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
              Open to opportunities
            </p>
          </div>
        </motion.div>
      </div>

      {/* ── Footer ── */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="px-5 sm:px-8 lg:px-16 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{ borderTop: '1px solid rgba(128,128,128,0.12)' }}
      >
        {/* Copyright */}
        <p className="text-xs" style={{ color: 'rgba(128,128,128,0.4)' }}>
          © {new Date().getFullYear()} Lark Mariano — All rights reserved
        </p>

        {/* Social links */}
        <div className="flex items-center gap-5">
          <SocialLink
            href="https://github.com/LarkMaytrixMariano"
            label="GitHub"
          />
          <SocialLink
            href="https://www.linkedin.com/in/lark-mariano-077a21263"
            label="LinkedIn"
          />
          <SocialLink
            href="https://vercel.com/larkmaytrixmarianos-projects"
            label="Vercel"
          />
        </div>
      </motion.footer>
    </section>
  );
};

export default Contact;