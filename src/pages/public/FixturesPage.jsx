import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiLocationMarker, HiCalendar, HiClock } from 'react-icons/hi'
import { GiBasketballBall } from 'react-icons/gi'
import { FIXTURES } from '../../constants/teams'

const rounds = ['All Weeks', ...Array.from(new Set(FIXTURES.map(f => f.round)))]

export default function FixturesPage() {
  const [activeRound, setActiveRound] = useState('All Weeks')

  const filtered  = FIXTURES.filter(f => activeRound === 'All Weeks' || f.round === activeRound)
  const upcoming  = filtered.filter(f => f.status === 'upcoming')
  const completed = filtered.filter(f => f.status === 'completed')

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="text-xs font-bold tracking-[3px] uppercase text-amber mb-3">Match Schedule</div>
          <h1 className="font-display text-5xl sm:text-6xl tracking-wide mb-2">FIXTURES</h1>
          <div className="flex items-center gap-2 text-white/35 text-sm">
            <GiBasketballBall size={13} className="text-amber" />
            Corporate Basketball League — 2025 Season
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-10">
          {rounds.map(r => (
            <button key={r} onClick={() => setActiveRound(r)}
              className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all border ${
                activeRound === r
                  ? 'bg-amber text-pitch border-amber shadow-amber/20 shadow-lg'
                  : 'bg-white/5 text-white/50 border-white/8 hover:border-amber/30 hover:text-white'
              }`}>{r}</button>
          ))}
        </motion.div>

        {/* Upcoming */}
        {upcoming.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-amber animate-pulse" />
              <h2 className="font-display text-xl tracking-wide text-amber">UPCOMING GAMES</h2>
            </div>
            <div className="flex flex-col gap-3">
              {upcoming.map((fix, i) => (
                <motion.div key={fix.id}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="group bg-card border border-white/8 rounded-2xl p-5
                             hover:border-amber/25 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-white/20 tracking-wider uppercase">
                      {fix.round}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-bold text-amber">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" /> Upcoming
                    </span>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4 mb-4">
                    <div className="text-right">
                      <div className="font-display text-2xl tracking-wide text-white
                                      group-hover:text-amber transition-colors">{fix.home}</div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <GiBasketballBall className="text-amber/60" size={20} />
                      <div className="font-display text-sm tracking-widest text-amber/80">VS</div>
                    </div>
                    <div className="text-left">
                      <div className="font-display text-2xl tracking-wide text-white/70">{fix.away}</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-4 text-white/25 text-xs">
                    <span className="flex items-center gap-1"><HiCalendar size={12} /> {fix.date}</span>
                    <span className="flex items-center gap-1"><HiClock size={12} /> {fix.time}</span>
                    <span className="flex items-center gap-1"><HiLocationMarker size={12} /> {fix.venue}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Completed */}
        {completed.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-white/15" />
              <h2 className="font-display text-xl tracking-wide text-white/35">RESULTS</h2>
            </div>
            <div className="flex flex-col gap-3">
              {completed.map((fix, i) => (
                <motion.div key={fix.id}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="bg-card border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-white/20 tracking-wider">{fix.round}</span>
                    <span className="text-[10px] font-bold text-white/25 bg-white/5 px-2 py-0.5 rounded">
                      FINAL
                    </span>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4 mb-3">
                    <div className="text-right">
                      <div className={`font-display text-2xl tracking-wide ${
                        fix.homeScore > fix.awayScore ? 'text-amber' : 'text-white/40'
                      }`}>{fix.home}</div>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <span className={`font-display text-4xl ${
                        fix.homeScore > fix.awayScore ? 'text-amber' : 'text-white/50'
                      }`}>{fix.homeScore}</span>
                      <span className="text-white/15 font-display text-2xl">—</span>
                      <span className={`font-display text-4xl ${
                        fix.awayScore > fix.homeScore ? 'text-amber' : 'text-white/50'
                      }`}>{fix.awayScore}</span>
                    </div>
                    <div className="text-left">
                      <div className={`font-display text-2xl tracking-wide ${
                        fix.awayScore > fix.homeScore ? 'text-amber' : 'text-white/40'
                      }`}>{fix.away}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-4 text-white/20 text-xs">
                    <span className="flex items-center gap-1"><HiCalendar size={11} /> {fix.date}</span>
                    <span className="flex items-center gap-1"><HiLocationMarker size={11} /> {fix.venue}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}