import { HERO_CONTENT } from '../constants'
import { motion } from 'framer-motion'
import Profile from "../assets/profile_pic.jpg";
import CurvedLoop from '../utils/CurvedLoop';


const containerVariants = {
    hidden: {opacity:0, x: -100 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.5,
            staggerChildren: 0.5,
        }
    }
}

const childVariants = {
    hidden: { opacity: 0 , x: -100 },
    visible: { opacity: 1 , x:0 , transition: {duration: 0.5 }}
}


const Hero = ({ darkMode }) => {
  return (
    <div className='pb-4 lg:mb-36 '>
        <div className='flex flex-wrap lg:flex-row-reverse'>
            <div className='w-full lg:w-1/2'>
                <div className='flex justify-center lg:p-8'>
                    <motion.img src={Profile} 
                    alt="Lark Mariano" 
                    className='border border-stone-900 rounded-3xl' 
                    width={450}
                    height={450}
                    initial={{ x:100, opacity: 0 }}
                    animate={{ x:0, opacity: 1}}
                    transition={{ duration: 1 , delay: 1.5 }}
                    />
                </div>
            </div>
            <div className='w-full lg:w-1/2 lg:pl-20'>
                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className='flex flex-col items-center lg:items-start mt-10'>
                    <motion.h2 
                    variants={childVariants}
                    className='pb-2 text-4xl tracking-tighter lg:text-8xl font-extrabold'>Lark Mariano</motion.h2>
                    <motion.span 
                    variants={childVariants}
                    className='bg-gradient-to-r from-stone-300 to-stone-600 bg-clip-text text-3xl tracking-tight text-transparent'>Full Stack Java Developer</motion.span>
                    <motion.p 
                    variants={childVariants}
                    className='my-2 max-w-lg py-6 text-xl leading-relaxed tracking-tighter text-center lg:text-start'>
                        {HERO_CONTENT}
                    </motion.p>
                    <motion.a href="/Mariano_CV.pdf"
                        target='_blank'
                        rel="noopener noreferrer"
                        download
                        className='bg-stone-900 text-white rounded-full text-sm p-4  mb-10'
                        variants={childVariants}
                    >
                        Download Resume
                    </motion.a>
                </motion.div>
            </div>
        </div>
        <div className={`${darkMode ? 'text-white' : 'text-black'}`}>
        <CurvedLoop 
            marqueeText="Code ✦ Build ✦ Deploy ✦ Innovate ✦ Java ✦ React ✦ Spring Boot ✦ Problem Solving ✦"
            speed={3}
            curveAmount={500}
            direction="right"
            interactive={true}
            className="custom-text-style"
        />
        </div>
    </div>
  )
}

export default Hero