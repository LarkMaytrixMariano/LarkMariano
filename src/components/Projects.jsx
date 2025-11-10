import React, { useState, useRef, useEffect } from 'react';
import { PROJECTS, projectTechIcons } from '../constants';
import { motion } from 'framer-motion';

const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);
  const [offset, setOffset] = useState(0);

  const scrollSpeed = 0.5; // pixels per frame

  // Infinite scroll loop
  useEffect(() => {
    let animationFrame;

    const animate = () => {
      if (!isPaused && carouselRef.current) {
        const scrollWidth = carouselRef.current.scrollWidth / 2;
        let newOffset = offset + scrollSpeed;
        if (newOffset >= scrollWidth) {
          newOffset = 0;
        }
        setOffset(newOffset);
      }
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [offset, isPaused]);

  // Duplicate projects for seamless loop
  const displayedProjects = [...PROJECTS, ...PROJECTS];

  return (
    <div className="pb-20 relative">
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5 }}
        className="my-20 text-center text-4xl font-bold"
      >
        Projects
      </motion.h2>

      <div className="overflow-hidden relative">
        <motion.div
          ref={carouselRef}
          className="flex gap-8 select-none"
          style={{ transform: `translateX(-${offset}px)` }}
        >
          {displayedProjects.map((project, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[300px] lg:w-[350px] cursor-pointer"
              onMouseEnter={() => { setHoveredIndex(index); setIsPaused(true); }}
              onMouseLeave={() => { setHoveredIndex(null); setIsPaused(false); }}
              onClick={() => window.open(project.url, '_blank')} // <-- open project link
            >
              <div className="relative">
                <img
                  src={project.image}
                  width={350}
                  height={200}
                  alt={project.title}
                  className={`rounded-lg transition duration-300 ${hoveredIndex === index ? 'filter blur-sm' : ''}`}
                  style={{ objectFit: 'cover', width: '100%', height: '200px' }}
                />
                {hoveredIndex === index && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-lg rounded-lg">
                    <p>View Website</p>
                  </div>
                )}
              </div>

              <div className="mt-4 flex flex-col justify-between h-[220px]">
                <div>
                  <h3 className="font-semibold text-xl">{project.title}</h3>
                  <p className="text-stone-400 text-sm mt-1">{project.description}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.technologies.map((tech, techIndex) => {
                    const techIcon = projectTechIcons.find(
                      (icon) => icon.label === tech || icon.label === tech.replace('.js', '')
                    );
                    return (
                      <span
                        key={techIndex}
                        className="flex items-center gap-1 rounded bg-stone-900 px-2 py-1 text-sm text-stone-300"
                      >
                        {techIcon ? <techIcon.icon className={techIcon.className} /> : null}
                        <span>{tech}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.p
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5 }}
        className="mt-12 text-center"
      >
        <a
          href="https://vercel.com/larkmaytrixmarianos-projects"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full text-sm p-4 text-white underline hover:opacity-70 text-[28px]"
        >
          View More Projects on my Vercel {"->"}
        </a>
      </motion.p>
    </div>
  );
};

export default Projects;
