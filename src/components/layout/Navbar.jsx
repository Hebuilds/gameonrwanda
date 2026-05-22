import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { GiBasketballBall } from 'react-icons/gi'

const navLinks = [
  { label: 'Home',      path: '/'          },
  { label: 'News',      path: '/news'      },
  { label: 'Teams',     path: '/teams'     },
  { label: 'Players',   path: '/players'   },
  { label: 'Standings', path: '/standings' },
  { label: 'Fixtures',  path: '/fixtures'  },
  { label: 'Gallery',   path: '/gallery'   },
  { label: 'About',     path: '/about'     },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-pitch/95 backdrop-blur-md
                    border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-9 h-9 bg-amber rounded-lg flex items-center justify-center
                            shadow-lg shadow-amber/30 group-hover:scale-105 transition-transform">
              <GiBasketballBall className="text-pitch text-xl" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-base tracking-widest text-amber leading-none">
                GAME ON RWANDA
              </div>
              <div className="font-display text-[9px] tracking-[3px] text-white/30 leading-none mt-0.5">
                LOYAL TO THE SOIL
              </div>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden xl:flex items-center gap-0.5">
            {navLinks.map(link => (
              <NavLink key={link.path} to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200
                   tracking-wide ${
                    isActive
                      ? 'text-amber bg-amber/10'
                      : 'text-white/55 hover:text-white hover:bg-white/5'
                  }`
                }>
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden xl:block flex-shrink-0">
            <Link to="/login"
              className="px-5 py-2 rounded-lg bg-amber text-pitch text-xs font-bold
                         hover:bg-amber-dark transition-colors shadow-lg shadow-amber/25
                         tracking-wide">
              Team Login
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setOpen(!open)}
            className="xl:hidden p-2 rounded-lg text-white/60 hover:text-white
                       hover:bg-white/5 transition-colors">
            {open ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="xl:hidden overflow-hidden border-t border-white/5 bg-pitch-mid">
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map(link => (
                <NavLink key={link.path} to={link.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'text-amber bg-amber/10'
                        : 'text-white/55 hover:text-white hover:bg-white/5'
                    }`
                  }>
                  {link.label}
                </NavLink>
              ))}
              <div className="mt-3 pt-3 border-t border-white/5">
                <Link to="/login" onClick={() => setOpen(false)}
                  className="block w-full text-center px-4 py-3 rounded-xl bg-amber
                             text-pitch text-sm font-bold hover:bg-amber-dark transition-colors">
                  Team Login
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}