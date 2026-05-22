import { useEffect, useState } from 'react'
import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { GiBasketballBall } from 'react-icons/gi'
import {
  HiHome, HiUsers, HiCalendar, HiBell, HiCog,
  HiMenuAlt2, HiX, HiLogout, HiChevronDown
} from 'react-icons/hi'
import { BsShieldFill } from 'react-icons/bs'

const navItems = [
  { label: 'Overview',   path: '/dashboard',          icon: HiHome     },
  { label: 'My Players', path: '/dashboard/players',  icon: HiUsers    },
  { label: 'Fixtures',   path: '/dashboard/fixtures', icon: HiCalendar },
  { label: 'Notifications', path: '/dashboard/notifications', icon: HiBell },
  { label: 'Settings',   path: '/dashboard/settings', icon: HiCog      },
]

// Mock session — Phase 2: replace with Supabase auth context
const MOCK_SESSION = {
  name: 'BK Team Admin',
  email: 'admin@bk.rw',
  team: 'BK',
  institution: 'Bank of Kigali',
  role: 'team_admin',
  notifications: 2,
}

export default function DashboardLayout() {
  const getDesktop = () =>
    typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches

  const [isDesktop, setIsDesktop] = useState(getDesktop)
  const [sidebarOpen, setSidebarOpen] = useState(getDesktop)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)')
    const handleResize = event => {
      setIsDesktop(event.matches)
      setSidebarOpen(event.matches)
    }

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleResize)
    } else {
      mediaQuery.addListener(handleResize)
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleResize)
      } else {
        mediaQuery.removeListener(handleResize)
      }
    }
  }, [])

  const closeSidebar = () => {
    if (!isDesktop) setSidebarOpen(false)
  }

  const handleLogout = () => {
    // TODO Phase 2: supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-pitch flex">

      {/* ── Mobile overlay ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-pitch/80 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)} />
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════ */}
      {/* SIDEBAR                                        */}
      {/* ══════════════════════════════════════════════ */}
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen || isDesktop ? 0 : '-100%' }}
        transition={{ type: 'tween', duration: 0.25 }}
        className="fixed left-0 top-0 bottom-0 w-64 bg-pitch-mid border-r border-white/5
                   z-40 flex flex-col lg:translate-x-0 lg:static lg:flex"
      >
        {/* Logo */}
        <div className="px-5 py-5 border-b border-white/5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-amber rounded-xl flex items-center justify-center
                            shadow-lg shadow-amber/30">
              <GiBasketballBall className="text-pitch text-lg" />
            </div>
            <div>
              <div className="font-display text-sm tracking-widest text-amber leading-none">
                GAME ON
              </div>
              <div className="font-display text-[9px] tracking-[2px] text-white/25 leading-none mt-0.5">
                RWANDA LEAGUE
              </div>
            </div>
          </Link>
          <button onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white/30 hover:text-white transition-colors">
            <HiX size={18} />
          </button>
        </div>

        {/* Team badge */}
        <div className="mx-4 mt-4 mb-2 p-3 bg-amber/8 border border-amber/15 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber/20 border border-amber/25
                            flex items-center justify-center flex-shrink-0">
              <span className="font-display text-xl text-amber">
                {MOCK_SESSION.team.charAt(0)}
              </span>
            </div>
            <div className="min-w-0">
              <div className="font-display text-base tracking-wide text-amber leading-none">
                {MOCK_SESSION.team}
              </div>
              <div className="text-white/35 text-[10px] mt-0.5 truncate">
                {MOCK_SESSION.institution}
              </div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-3 flex flex-col gap-0.5 overflow-y-auto">
          <div className="text-[9px] font-bold tracking-[2.5px] uppercase text-white/20
                          px-3 py-2 mt-1">Management</div>
          {navItems.map(item => {
            const Icon = item.icon
            return (
              <NavLink key={item.path} to={item.path} end={item.path === '/dashboard'}
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                   transition-all relative ${
                    isActive
                      ? 'bg-amber/12 text-amber border border-amber/20'
                      : 'text-white/45 hover:text-white hover:bg-white/4 border border-transparent'
                  }`
                }>
                {({ isActive }) => (
                  <>
                    <Icon size={16} className={isActive ? 'text-amber' : ''} />
                    {item.label}
                    {item.label === 'Notifications' && MOCK_SESSION.notifications > 0 && (
                      <span className="ml-auto w-5 h-5 rounded-full bg-amber text-pitch
                                       text-[10px] font-bold flex items-center justify-center">
                        {MOCK_SESSION.notifications}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            )
          })}
        </nav>

        {/* Role badge + logout */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-2 mb-3 px-1">
            <BsShieldFill className="text-amber/40" size={12} />
            <span className="text-[10px] font-bold tracking-wider uppercase text-white/25">
              Team Admin
            </span>
          </div>
          <button onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl
                       text-white/35 hover:text-white hover:bg-white/4 transition-all text-sm">
            <HiLogout size={15} />
            Sign Out
          </button>
        </div>
      </motion.aside>

      {/* ══════════════════════════════════════════════ */}
      {/* MAIN AREA                                      */}
      {/* ══════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <header className="h-14 bg-pitch-mid/80 backdrop-blur border-b border-white/5
                           flex items-center justify-between px-4 sm:px-6 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-1.5 rounded-lg text-white/40 hover:text-white
                         hover:bg-white/5 transition-colors">
              <HiMenuAlt2 size={20} />
            </button>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-white/25">
              <span>Dashboard</span>
            </div>
          </div>

          {/* User menu */}
          <div className="relative">
            <button onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl
                         hover:bg-white/5 transition-colors">
              <div className="w-7 h-7 rounded-lg bg-amber/20 border border-amber/25
                              flex items-center justify-center">
                <span className="font-display text-sm text-amber">
                  {MOCK_SESSION.name.charAt(0)}
                </span>
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-semibold text-white leading-none">
                  {MOCK_SESSION.name}
                </div>
                <div className="text-[10px] text-white/30 mt-0.5">{MOCK_SESSION.team}</div>
              </div>
              <HiChevronDown size={14} className={`text-white/30 transition-transform
                ${userMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {userMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-52 bg-card border border-white/10
                             rounded-xl shadow-2xl overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-white/5">
                    <div className="text-xs font-semibold text-white">{MOCK_SESSION.name}</div>
                    <div className="text-[10px] text-white/30 mt-0.5">{MOCK_SESSION.email}</div>
                  </div>
                  <div className="p-1.5">
                    <Link to="/dashboard/settings"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm
                                 text-white/50 hover:text-white hover:bg-white/5 transition-colors">
                      <HiCog size={14} /> Settings
                    </Link>
                    <button onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm
                                 text-white/50 hover:text-white hover:bg-white/5 transition-colors">
                      <HiLogout size={14} /> Sign Out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          <Outlet context={{ session: MOCK_SESSION }} />
        </main>
      </div>
    </div>
  )
}