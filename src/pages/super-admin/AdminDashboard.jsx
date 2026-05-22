import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  HiUsers, HiCheckCircle, HiClock,
  HiCalendar, HiArrowRight, HiEye
} from 'react-icons/hi'
import { BsShieldFill, BsTrophyFill } from 'react-icons/bs'
import { GiBasketballBall } from 'react-icons/gi'
import { TEAMS, PLAYERS, FIXTURES, STANDINGS } from '../../constants/teams'

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.38, ease: 'easeOut' } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }

const recentActivity = [
  { id:1, action:'Player verified',   detail:'Jean Claude Mugisha — BK',            time:'2m ago',  type:'success' },
  { id:2, action:'Fixture created',   detail:'BK vs EQUITY — Week 9',               time:'1h ago',  type:'info'    },
  { id:3, action:'Player rejected',   detail:'Frank Ntwali — RWANDAIR (doc issue)',  time:'3h ago',  type:'warning' },
  { id:4, action:'Admin created',     detail:'New admin for CCI Rwanda',             time:'5h ago',  type:'info'    },
  { id:5, action:'Result recorded',   detail:'BK 82 – 71 GASABO 3D',                time:'1d ago',  type:'success' },
]

const typeColors = {
  success: 'text-amber bg-amber/10',
  info:    'text-white/50 bg-white/5',
  warning: 'text-white/40 bg-white/5',
}

export default function AdminDashboard() {
  const pendingPlayers = PLAYERS.filter(p => p.status === 'pending')
  const upcomingGames  = FIXTURES.filter(f => f.status === 'upcoming')

  return (
    <div>
      <div className="mb-7">
        <div className="text-[10px] font-bold tracking-[3px] uppercase text-amber/50 mb-1">
          Control Center
        </div>
        <h1 className="font-display text-3xl sm:text-4xl tracking-wide">
          LEAGUE OVERVIEW
        </h1>
        <p className="text-white/25 text-sm mt-1">
          Game On Rwanda Corporate Basketball League — 2025 Season
        </p>
      </div>

      {/* KPI row */}
      <motion.div variants={stagger} initial="hidden" animate="show"
        className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-7">
        {[
          { label: 'Registered Teams',  value: TEAMS.length,           icon: BsTrophyFill,   link: '/admin/teams'   },
          { label: 'Total Players',     value: PLAYERS.length,         icon: HiUsers,        link: '/admin/players' },
          { label: 'Pending Verify',    value: pendingPlayers.length,  icon: HiClock,        link: '/admin/players', urgent: pendingPlayers.length > 0 },
          { label: 'Upcoming Games',    value: upcomingGames.length,   icon: HiCalendar,     link: '/admin/fixtures' },
        ].map(({ label, value, icon: Icon, link, urgent }) => (
          <motion.div key={label} variants={fadeUp}>
            <Link to={link}
              className={`block bg-card border rounded-2xl p-5 hover:-translate-y-0.5
                          transition-all group ${
                urgent ? 'border-amber/30' : 'border-white/8 hover:border-amber/20'
              }`}>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${
                urgent ? 'bg-amber text-pitch' : 'bg-amber/10 text-amber'
              }`}>
                <Icon size={17} />
              </div>
              <div className="font-display text-4xl text-amber leading-none mb-1">{value}</div>
              <div className="text-white/30 text-xs font-medium flex items-center justify-between">
                {label}
                <HiArrowRight size={11} className="opacity-0 group-hover:opacity-100
                                                    transition-opacity" />
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Main grid */}
      <div className="grid xl:grid-cols-3 gap-5">

        {/* Pending verification */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="xl:col-span-2 bg-card border border-white/8 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <HiClock className="text-amber" size={15} />
              <span className="font-display text-lg tracking-wide">PENDING VERIFICATION</span>
              {pendingPlayers.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber text-pitch text-[10px]
                                 font-bold flex items-center justify-center">
                  {pendingPlayers.length}
                </span>
              )}
            </div>
            <Link to="/admin/players"
              className="flex items-center gap-1 text-xs text-amber/50 hover:text-amber
                         font-semibold transition-colors">
              Manage All <HiArrowRight size={11} />
            </Link>
          </div>

          {pendingPlayers.length === 0 ? (
            <div className="px-5 py-10 text-center text-white/20 text-sm">
              <HiCheckCircle className="mx-auto mb-2 text-amber/30" size={28} />
              All players verified — no pending reviews
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {pendingPlayers.map(player => (
                <div key={player.id}
                  className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/2 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-amber/10 border border-amber/15
                                  flex items-center justify-center flex-shrink-0">
                    <span className="font-display text-sm text-amber">{player.number}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-white truncate">{player.name}</div>
                    <div className="text-white/25 text-xs">{player.team} · {player.position}</div>
                  </div>
                  <Link to="/admin/players"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                               bg-amber/10 border border-amber/20 text-amber text-[10px]
                               font-bold hover:bg-amber hover:text-pitch transition-all">
                    <HiEye size={11} /> Review
                  </Link>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Right column */}
        <div className="flex flex-col gap-5">

          {/* League standings snapshot */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 }}
            className="bg-card border border-white/8 rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <GiBasketballBall className="text-amber" size={14} />
                <span className="font-display text-lg tracking-wide">TOP 4</span>
              </div>
              <Link to="/admin/standings"
                className="text-xs text-amber/50 hover:text-amber font-semibold transition-colors">
                Full Table
              </Link>
            </div>
            <div className="p-3 flex flex-col gap-1.5">
              {STANDINGS.slice(0, 4).map((row, i) => (
                <div key={row.team}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl
                             bg-pitch-light border border-white/5">
                  <span className={`font-display text-base w-4 leading-none ${
                    i === 0 ? 'text-amber' : i === 1 ? 'text-white/50' : 'text-white/30'
                  }`}>{row.pos}</span>
                  <span className="flex-1 text-sm font-semibold text-white truncate">
                    {row.team}
                  </span>
                  <span className="font-display text-base text-amber">{row.won}-{row.lost}</span>
                  <span className="text-xs text-white/25">
                    {(row.pct * 100).toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Activity feed */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 }}
            className="bg-card border border-white/8 rounded-2xl overflow-hidden flex-1">
            <div className="px-5 py-4 border-b border-white/5 flex items-center gap-2.5">
              <BsShieldFill className="text-amber" size={12} />
              <span className="font-display text-lg tracking-wide">RECENT ACTIVITY</span>
            </div>
            <div className="divide-y divide-white/5">
              {recentActivity.map(item => (
                <div key={item.id}
                  className="flex items-start gap-3 px-4 py-3 hover:bg-white/2 transition-colors">
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center
                                   flex-shrink-0 mt-0.5 text-[10px] ${typeColors[item.type]}`}>
                    {item.type === 'success' ? '✓' : item.type === 'warning' ? '!' : 'i'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-white">{item.action}</div>
                    <div className="text-white/30 text-xs truncate mt-0.5">{item.detail}</div>
                  </div>
                  <span className="text-white/20 text-[10px] flex-shrink-0">{item.time}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}