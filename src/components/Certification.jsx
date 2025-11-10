import React from 'react'
import { motion } from 'framer-motion'
import { CERTIFICATIONS } from '../constants'

const Certification = () => {
  return (
    <div className='pb-4'>
      <motion.h2  
        whileInView={{opacity: 1, y:0}} 
        initial={{opacity: 0, y: -100}} 
        transition={{duration: 0.5}}         
        className='my-20 text-center text-4xl'>
        Certifications
      </motion.h2>
      
      <div className='mx-auto max-w-7xl px-4 mb-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr'>
          {CERTIFICATIONS.map((cert, index) => (
            <motion.div
              key={index}
              whileInView={{opacity: 1, y: 0}}
              initial={{opacity: 0, y: 50}}
              transition={{duration: 0.5, delay: index * 0.1}}
              className={`group relative overflow-hidden rounded-2xl bg-neutral-900 p-6 hover:bg-neutral-800 transition-all duration-300 ${
                index === 0 ? 'md:col-span-2 lg:col-span-2' : ''
              } ${
                index === 3 ? 'lg:col-span-2' : ''
              }`}
            >
              {/* Certificate Image */}
              <div className='mb-4 overflow-hidden rounded-lg'>
                <img 
                  src={cert.image} 
                  alt={cert.title}
                  className='w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300'
                />
              </div>
              
              {/* Content */}
              <div className='flex flex-col justify-between h-auto'>
                <div>
                  <h3 className='text-2xl font-semibold mb-2 text-white'>
                    {cert.title}
                  </h3>
                  <p className='text-neutral-400 mb-3'>
                    {cert.issuer}
                  </p>
                  <p className='text-sm text-neutral-500 mb-4'>
                    {cert.date}
                  </p>
                  {cert.description && (
                    <p className='text-neutral-300 text-sm mb-4'>
                      {cert.description}
                    </p>
                  )}
                </div>
                
                {/* Skills/Technologies */}
                <div className='flex flex-wrap gap-2 mb-4'>
                  {cert.skills.map((skill, idx) => (
                    <span 
                      key={idx}
                      className='px-3 py-1 text-sm bg-neutral-800 text-blue-400 rounded-full'
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                
                {/* View Certificate Button */}
                {cert.url && (
                  <a 
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className='inline-flex items-center text-blue-400 hover:text-purple-300 transition-colors'
                  >
                    View Certificate
                    <svg 
                      className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform' 
                      fill='none' 
                      stroke='currentColor' 
                      viewBox='0 0 24 24'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                    </svg>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Certification