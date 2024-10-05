import React from 'react'
import { techIcons } from '../constants'
import { animate, motion } from 'framer-motion'

const Technologies = () => {
  return (
    <div className='pb-24'>
        <motion.h2 
        whileInView={{ opacity: 1, y:0 }}
        initial={{opacity: 0 , y: -100}}
        transition={{ duration: 1.5 }}
        className='my-20 text-center text-4xl'> Technologies 
        </motion.h2>
        <motion.div 
        whileInView={{ opacity: 1 , x:0 }}
        initial={{opacity: 0 , x: -100 }}
        transition={{ duration: 1.5 }}
        className='flex flex-wrap items-center justify-center gap-4'>
            {techIcons.map((tech) => {
                const Icon = tech.icon; // Get the icon component
                return (
                    <motion.div 
                        initial="initial"
                        animate="animate"
                        variants={tech.variants} // Use the unique variants for each icon
                        key={tech.id} 
                        className='p-4'
                    >
                        <Icon className={tech.className} /> {/* Use the unique className */}
                        {/* <span>{tech.label}</span> */}
                    </motion.div>
                );
            })}
        </motion.div>
    </div>
  )
}

export default Technologies