import { motion } from 'framer-motion'
import { useOutletContext, Link } from 'react-router-dom'
import {
  HiUsers, HiCheckCircle, HiClock,
  HiCalendar, HiBell, HiArrowRight
} from 'react-icons/hi'
import { GiBasketballBall } from 'react-icons/gi'
import { PLAYERS, FIXTURES } from '../../constants/teams'

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.38, ease: 'easeOut' } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }

const mockNotifications = [
  { id: 1, type: 'success', message: 'Jean Claude Mugisha has been verified by admin.', time: '2h ago' },
  { id: 2, type: 'info',    message: 'Week 9 fixtures published. BK vs EQUITY — May 18.', time: '5h ago' },
]

export default function DashboardHome() {
  const { session } = useOutletContext()

  const myPlayers  = PLAYERS.filter(p => p.team === session.team)
  const verified   = myPlayers.filter(p => p.status === 'verified')
  const pending    = myPlayers.filter(p => p.status === 'pending')
  const myFixtures = FIXTURES.filter(f => f.home === session.team || f.away === session.team)
  const upcoming   = myFixtures.filter(f => f.status === 'upcoming')

  return (
    <div>
      {/* Page header */}
      <div className="mb-7">
        <div className="text-[10px] font-bold tracking-[3px] uppercase text-amber/50 mb-1">
          Welcome back
        </div>
        <h1 className="font-display text-3xl sm:text-4xl tracking-wide">
          {session.team} DASHBOARD
        </h1>
        <p className="text-white/25 text-sm mt-1">{session.institution} · 2025 Season</p>
      </div>

      {/* KPI row */}
      <motion.div variants={stagger} initial="hidden" animate="show"
        className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-7">
        {[
          { label: 'Total Players',  value: myPlayers.length, icon: HiUsers,       accent: true  },
          { label: 'Verified',       value: verified.length,  icon: HiCheckCircle, accent: true  },
          { label: 'Pending Review', value: pending.length,   icon: HiClock,       accent: false },
          { label: 'Upcoming Games', value: upcoming.length,  icon: HiCalendar,    accent: true  },
        ].map(({ label, value, icon: Icon, accent }) => (
          <motion.div key={label} variants={fadeUp}
            className="bg-card border border-white/8 rounded-2xl p-5">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3
                             ${accent ? 'bg-amber/10 text-amber' : 'bg-white/5 text-white/35'}`}>
              <Icon size={17} />
            </div>
            <div className={`font-display text-4xl leading-none mb-1
                             ${accent ? 'text-amber' : 'text-white/40'}`}>
              {value}
            </div>
            <div className="text-white/30 text-xs font-medium">{label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main grid */}
      <div className="grid xl:grid-cols-3 gap-5">

        {/* Squad overview — takes 2 cols */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="xl:col-span-2 bg-card border border-white/8 rounded-2xl overflow-hidden">

          <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <HiUsers className="text-amber" size={15} />
              <span className="font-display text-lg tracking-wide">SQUAD OVERVIEW</span>
            </div>
            <Link to="/dashboard/players"
              className="flex items-center gap-1 text-xs text-amber/50 hover:text-amber
                         font-semibold transition-colors">
              Manage <HiArrowRight size={11} />
            </Link>
          </div>

          {myPlayers.length === 0 ? (
            <div className="px-5 py-12 text-center text-white/20 text-sm">
              No players yet.{' '}
              <Link to="/dashboard/players" className="text-amber/50 hover:text-amber">
                Add your first player →
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {myPlayers.slice(0, 6).map(player => (
                <div key={player.id}
                  className="flex items-center gap-4 px-5 py-3 hover:bg-white/2 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-amber/10 border border-amber/15
                                  flex items-center justify-center flex-shrink-0">
                    <span className="font-display text-sm text-amber">{player.number}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-white truncate">{player.name}</div>
                    <div className="text-white/25 text-xs">{player.position}</div>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border flex-shrink-0 ${
                    player.status === 'verified'
                      ? 'bg-amber/10 text-amber border-amber/20'
                      : 'bg-white/5 text-white/25 border-white/8'
                  }`}>
                    {player.status === 'verified' ? '✓ Verified' : '⏳ Pending'}
                  </span>
                </div>
              ))}
              {myPlayers.length > 6 && (
                <div className="px-5 py-3 text-center border-t border-white/5">
                  <Link to="/dashboard/players"
                    className="text-xs text-amber/40 hover:text-amber transition-colors">
                    +{myPlayers.length - 6} more players — view all
                  </Link>
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* Right column */}
        <div className="flex flex-col gap-5">

          {/* Next game */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 }}
            className="bg-card border border-white/8 rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <HiCalendar className="text-amber" size={15} />
                <span className="font-display text-lg tracking-wide">NEXT GAMES</span>
              </div>
              <Link to="/dashboard/fixtures"
                className="text-xs text-amber/50 hover:text-amber font-semibold transition-colors">
                All
              </Link>
            </div>
            <div className="p-3 flex flex-col gap-2">
              {upcoming.length === 0 ? (
                <div className="text-center py-5 text-white/20 text-xs">No upcoming games</div>
              ) : upcoming.slice(0, 2).map(fix => {
                const isHome   = fix.home === session.team
                const opponent = isHome ? fix.away : fix.home
                return (
                  <div key={fix.id}
                    className="bg-pitch-light rounded-xl p-3.5 border border-white/5">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        isHome ? 'bg-amber/10 text-amber' : 'bg-white/5 text-white/30'
                      }`}>{isHome ? 'HOME' : 'AWAY'}</span>
                      <span className="text-[9px] font-bold text-amber">Upcoming</span>
                    </div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <GiBasketballBall className="text-amber/40" size={11} />
                      <span className="text-sm font-semibold text-white">vs {opponent}</span>
                    </div>
                    <div className="text-white/20 text-xs">{fix.date} · {fix.time}</div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26 }}
            className="bg-card border border-white/8 rounded-2xl overflow-hidden flex-1">
            <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <HiBell className="text-amber" size={15} />
                <span className="font-display text-lg tracking-wide">ALERTS</span>
              </div>
              <Link to="/dashboard/notifications"
                className="text-xs text-amber/50 hover:text-amber font-semibold transition-colors">
                All
              </Link>
            </div>
            <div className="p-3 flex flex-col gap-2">
              {mockNotifications.map(n => (
                <div key={n.id}
                  className="p-3 rounded-xl bg-pitch-light border border-white/5">
                  <div className="flex items-start gap-2">
                    <span className="text-amber flex-shrink-0 mt-0.5 text-xs">
                      {n.type === 'success' ? '✓' : 'ℹ'}
                    </span>
                    <div>
                      <p className="text-white/50 text-xs leading-relaxed">{n.message}</p>
                      <p className="text-white/20 text-[10px] mt-1">{n.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}