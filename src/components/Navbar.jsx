import React from 'react'
import logo from '../assets/raviKumarLogo.webp'
import { socialLinks } from '../constants'

const Navbar = () => {
  return (
    <nav className='flex items-center justify-between py-6 border-red-500'>
        <div className='flex flex-shrink-0 items-center'>
            <a href="/" aria-label='Home'>
                <h1 className='font-bold text-3xl font-serif'>LM</h1>
            </a>
        </div>
        <div className='m-8 flex items-center justify-center gap-4 text-2xl'>
            {socialLinks.map((link) => {
                    const IconComponent = link.icon; // Get the component reference
                    return (
                        <a
                            key={link.label}
                            href={link.href}
                            target='_blank'
                            rel='noopener noreferrer'
                            aria-label={link.label}
                        >
                            <IconComponent />  {/* Render the icon component */}
                        </a>
                    );
                })}
        </div>
    </nav>
  )
}

export default Navbar