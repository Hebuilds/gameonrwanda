import { BsShieldFill, BsTrophyFill } from 'react-icons/bs'
import { useState } from 'react'
import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { GiBasketballBall } from 'react-icons/gi'
import {
  HiHome, HiUsers, HiCalendar, HiNewspaper,
  HiPhotograph, HiChartBar, HiClipboardList,
  HiMenuAlt2, HiX, HiLogout, HiChevronDown,
  HiCog, HiShieldCheck
} from 'react-icons/hi'

const navGroups = [
{
  label: 'Overview',
  items: [
    { label: 'Dashboard',  path: '/admin',             icon: HiHome,       end: true },
    { label: 'Analytics',  path: '/admin/analytics',   icon: HiChartBar              },
    { label: 'Champions',  path: '/admin/champions',   icon: BsTrophyFill            },
  ]
},
  {
    label: 'Competition',
    items: [
      { label: 'Fixtures',   path: '/admin/fixtures',   icon: HiCalendar       },
      { label: 'Results',    path: '/admin/results',    icon: HiClipboardList  },
      { label: 'Standings',  path: '/admin/standings',  icon: HiChartBar       },
    ]
  },
  {
    label: 'Teams & Players',
    items: [
      { label: 'Teams',       path: '/admin/teams',      icon: HiShieldCheck    },
      { label: 'Team Admins', path: '/admin/admins',     icon: HiUsers          },
      { label: 'Players',     path: '/admin/players',    icon: HiUsers          },
    ]
  },
  {
    label: 'Content',
    items: [
      { label: 'News',        path: '/admin/news',       icon: HiNewspaper      },
      { label: 'Gallery',     path: '/admin/gallery',    icon: HiPhotograph     },
    ]
  },
  {
    label: 'System',
    items: [
      { label: 'Audit Logs',  path: '/admin/audit',      icon: HiClipboardList  },
      { label: 'Settings',    path: '/admin/settings',   icon: HiCog            },
    ]
  },
]

const SUPER_SESSION = {
  name: 'League Administrator',
  email: 'admin@gorleague.rw',
  role: 'super_admin',
}

export default function SuperAdminLayout() {
  const [mobileOpen,   setMobileOpen]   = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => navigate('/login')

  return (
    <div className="min-h-screen bg-pitch flex overflow-hidden">

      {/* Mobile backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-pitch/80 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setMobileOpen(false)} />
        )}
      </AnimatePresence>

      {/* ── Sidebar ── */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-56 flex flex-col
        bg-pitch-mid border-r border-white/5
        transition-transform duration-250 ease-in-out
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:flex
      `}>

        {/* Logo */}
        <div className="px-4 py-4 border-b border-white/5 flex items-center justify-between flex-shrink-0">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber rounded-lg flex items-center justify-center
                            shadow-lg shadow-amber/25">
              <GiBasketballBall className="text-pitch text-base" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-sm tracking-widest text-amber leading-none">
                GAME ON
              </div>
              <div className="font-display text-[9px] tracking-[2px] text-white/25 leading-none mt-0.5">
                RWANDA LEAGUE
              </div>
            </div>
          </Link>
          <button onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1 text-white/30 hover:text-white transition-colors">
            <HiX size={16} />
          </button>
        </div>

        {/* Super Admin badge */}
        <div className="mx-3 mt-3 mb-1 p-2.5 bg-amber/10 border border-amber/20
                        rounded-xl flex items-center gap-2.5 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-amber flex items-center justify-center flex-shrink-0">
            <BsShieldFill className="text-pitch" size={14} />
          </div>
          <div className="min-w-0">
            <div className="font-display text-xs tracking-wide text-amber leading-none">
              SUPER ADMIN
            </div>
            <div className="text-white/30 text-[10px] mt-0.5 truncate">Full Access</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-2 flex flex-col gap-0 overflow-y-auto">
          {navGroups.map(group => (
            <div key={group.label}>
              <div className="text-[9px] font-bold tracking-[2.5px] uppercase text-white/18
                              px-3 py-2 mt-1">{group.label}</div>
              {group.items.map(item => {
                const Icon = item.icon
                return (
                  <NavLink key={item.path} to={item.path} end={item.end}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium
                       transition-all border mb-0.5 ${
                        isActive
                          ? 'bg-amber/12 text-amber border-amber/20'
                          : 'text-white/40 hover:text-white hover:bg-white/4 border-transparent'
                      }`
                    }>
                    {({ isActive }) => (
                      <>
                        <Icon size={13} className={isActive ? 'text-amber' : ''} />
                        {item.label}
                      </>
                    )}
                  </NavLink>
                )
              })}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-white/5 flex-shrink-0">
          <button onClick={handleLogout}
            className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl
                       text-white/30 hover:text-white hover:bg-white/5 transition-all text-xs">
            <HiLogout size={13} /> Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Topbar */}
        <header className="h-14 bg-pitch-mid/70 backdrop-blur border-b border-white/5
                           flex items-center justify-between px-4 sm:px-6
                           sticky top-0 z-20 flex-shrink-0">
          <button onClick={() => setMobileOpen(true)}
            className="lg:hidden p-1.5 rounded-lg text-white/40 hover:text-white
                       hover:bg-white/5 transition-colors">
            <HiMenuAlt2 size={20} />
          </button>

          <div className="hidden lg:flex items-center gap-1.5 text-xs text-white/20">
            <BsShieldFill className="text-amber" size={10} />
            <span className="text-amber/60 font-semibold">Super Admin</span>
            <span>/</span>
            <span className="text-white/40">Control Panel</span>
          </div>

          {/* User */}
          <div className="relative ml-auto">
            <button onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl
                         hover:bg-white/5 transition-colors">
              <div className="w-7 h-7 rounded-lg bg-amber flex items-center justify-center">
                <BsShieldFill className="text-pitch" size={12} />
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-semibold text-white leading-none">
                  {SUPER_SESSION.name}
                </div>
                <div className="text-[10px] text-amber/60 mt-0.5">Super Admin</div>
              </div>
              <HiChevronDown size={13}
                className={`text-white/25 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
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
                    <div className="text-xs font-semibold text-white">{SUPER_SESSION.name}</div>
                    <div className="text-[10px] text-white/25 mt-0.5">{SUPER_SESSION.email}</div>
                    <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5
                                    rounded bg-amber/15 border border-amber/25">
                      <BsShieldFill className="text-amber" size={9} />
                      <span className="text-[9px] font-bold text-amber">Super Admin</span>
                    </div>
                  </div>
                  <div className="p-1.5">
                    <button onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm
                                 text-white/40 hover:text-white hover:bg-white/5 transition-colors">
                      <HiLogout size={13} /> Sign Out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* Page */}
        <main className="flex-1 overflow-y-auto p-5 sm:p-7">
          <Outlet context={{ session: SUPER_SESSION }} />
        </main>
      </div>
    </div>
  )
}