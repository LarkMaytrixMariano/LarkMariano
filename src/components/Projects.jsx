import React, { useState, useRef } from 'react';
import { PROJECTS, projectTechIcons } from '../constants';
import { motion, useMotionValue, useAnimationFrame, useTransform } from 'framer-motion';

const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);
  
  // High-performance motion value for the X position
  const x = useMotionValue(0);

  // Auto-scroll speed (negative moves it to the left)
  const scrollSpeed = -0.6;

  useAnimationFrame(() => {
    if (!isPaused && carouselRef.current) {
      const contentWidth = carouselRef.current.scrollWidth;
      const halfWidth = contentWidth / 2;
      
      let newX = x.get() + scrollSpeed;

      // Infinite loop: If we scroll past the first half, reset to 0
      if (newX <= -halfWidth) {
        newX = 0;
      } else if (newX > 0) {
        // If user drags it too far right, snap to the middle point
        newX = -halfWidth;
      }
      
      x.set(newX);
    }
  });

  // Handle snapping back if the user drags it way out of bounds
  const handleDragEnd = (_, info) => {
    setIsPaused(false);
    const contentWidth = carouselRef.current.scrollWidth;
    const halfWidth = contentWidth / 2;
    const currentX = x.get();

    if (currentX <= -halfWidth) {
      x.set(currentX + halfWidth);
    } else if (currentX > 0) {
      x.set(currentX - halfWidth);
    }
  };

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

      <div className="overflow-hidden relative px-4">
        <motion.div
          ref={carouselRef}
          drag="x"
          style={{ x }}
          // dragConstraints allows movement, but dragElastic allows "pulling" past the edge
          dragConstraints={{ left: -5000, right: 5000 }} 
          dragElastic={0.05}
          // dragTransition enables the "flick" momentum effect
          dragTransition={{ bounceStiffness: 600, bounceDukping: 20 }}
          onDragStart={() => setIsPaused(true)}
          onDragEnd={handleDragEnd}
          className="flex gap-8 select-none cursor-grab active:cursor-grabbing"
        >
          {displayedProjects.map((project, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[300px] lg:w-[350px]"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div 
                className="relative cursor-pointer group" 
                onClick={() => window.open(project.url, '_blank')}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className={`rounded-lg transition duration-300 pointer-events-none ${
                    hoveredIndex === index ? 'filter blur-sm scale-105' : ''
                  }`}
                  style={{ objectFit: 'cover', width: '100%', height: '200px' }}
                  draggable="false"
                />
                {hoveredIndex === index && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-lg rounded-lg transition-opacity">
                    <p className="font-medium">View Website</p>
                  </div>
                )}
              </div>

              <div className="mt-4 flex flex-col justify-between h-[220px]">
                <div>
                  <h3 className="font-semibold text-xl">{project.title}</h3>
                  <p className="text-stone-400 text-sm mt-1 line-clamp-3">{project.description}</p>
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
          className="rounded-full text-sm p-4 text-white underline hover:text-stone-400 transition-colors text-[24px] lg:text-[28px]"
        >
          View More Projects on my Vercel {"->"}
        </a>
      </motion.p>
    </div>
  );
};

export default Projects;