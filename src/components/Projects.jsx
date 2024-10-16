import React from 'react'
import { PROJECTS } from '../constants'
import { motion } from 'framer-motion'
import { projectTechIcons } from '../constants'
import { useState } from 'react';
import { RxVercelLogo } from 'react-icons/rx';



const Projects = () => {
  return (
    <div className='pb-4 '>
        <motion.h2 
        whileInView={{ opacity: 1, y:0 }}
        initial={{ opacity: 0 , y: -100}}
        transition={{duration: 0.5 }}
        className='my-20 text-center text-4xl'>Projects</motion.h2>
        <div>
        {PROJECTS.map((project, index) => {
        const [isHovered, setIsHovered] = useState(false);

        return (
          <div key={index} className='mb-8 flex flex-wrap lg:justify-center'>
                    <motion.div
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: -100 }}
                    transition={{ duration: 1 }}
                    className='relative w-full lg:w-1/4'
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => window.open(project.url, '_blank')}
                    >
                    <img
                        src={project.image}
                        width={250}
                        height={250}
                        alt={project.title}
                        className={`mb-6 rounded cursor-pointer transition duration-300 ${isHovered ? 'filter blur-sm' : ''}`}
                    />
                    {isHovered && (
                        <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl rounded w-[250px] h-[150px] cursor-pointer'>
                        <p className='text-stone-200'>View Website</p>
                        </div>
                    )}
                    </motion.div>
                    <motion.div 
                    whileInView={{opacity: 1 , x:0 }}
                    initial={{opacity: 0 , x: 100}}
                    transition={{duration: 1}}
                    className='lg:block flex flex-wrap w-full max-w-xl lg:w-3/4 lg:ml-5'>
                        <h3 className='mb-2 font-semibold text-2xl'>{project.title}</h3>
                        <p className='mb-4 text-stone-400'>{project.description}</p>
                        {project.technologies.map((tech, index) => {
                        // Find the icon for the technology
                        const techIcon = projectTechIcons.find(icon => icon.label === tech || icon.label === tech.replace('.js', '')); // Handle "React.js" as "React"
                        return (
                            <span className='mr-2 mt-2 lg:mt-0 rounded bg-stone-900 p-2 text-sm font-medium text-stone-300' key={index}>
                            {techIcon ? <techIcon.icon className={techIcon.className} /> : null}
                            <span className='ml-1'>{tech}</span>
                            </span>
                        );
                        })}
                    </motion.div>
                </div>
                );       
            })}
      </div>
        <motion.p 
        whileInView={{ opacity: 1, y:0 }}
        initial={{ opacity: 0 , y: -100}}
        transition={{duration: 0.5 }}
        className='mt-10 mb-10 text-center'>
        <a 
            href="https://vercel.com/larkmaytrixmarianos-projects"
            target='_blank'
            className='rounded-full text-sm p-4 text-white underline mb-10 hover:opacity-50'
        >
        View More on my Vercel {"->"}
        </a>
        </motion.p>
    </div>
  )
}

export default Projects