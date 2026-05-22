import { motion } from 'framer-motion'
import { useOutletContext } from 'react-router-dom'
import { HiLocationMarker, HiCalendar, HiClock } from 'react-icons/hi'
import { GiBasketballBall } from 'react-icons/gi'
import { FIXTURES } from '../../constants/teams'

export default function FixturesView() {
  const { session }  = useOutletContext()
  const myFixtures   = FIXTURES.filter(f => f.home === session.team || f.away === session.team)
  const upcoming     = myFixtures.filter(f => f.status === 'upcoming')
  const completed    = myFixtures.filter(f => f.status === 'completed')

  return (
    <div>
      <div className="mb-7">
        <div className="text-[10px] font-bold tracking-[3px] uppercase text-amber/50 mb-1">
          {session.team}
        </div>
        <h1 className="font-display text-3xl sm:text-4xl tracking-wide">MY FIXTURES</h1>
        <p className="text-white/25 text-sm mt-1">
          Your team's match schedule — read-only view.
        </p>
      </div>

      {/* Season snapshot */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
        {[
          { label: 'Total',     value: myFixtures.length },
          { label: 'Upcoming',  value: upcoming.length   },
          { label: 'Completed', value: completed.length  },
          { label: 'Home',      value: myFixtures.filter(f => f.home === session.team).length },
        ].map(({ label, value }) => (
          <div key={label} className="bg-card border border-white/8 rounded-xl p-4 text-center">
            <div className="font-display text-3xl text-amber mb-0.5">{value}</div>
            <div className="text-white/25 text-xs font-medium">{label}</div>
          </div>
        ))}
      </div>

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-amber animate-pulse" />
            <h2 className="font-display text-xl tracking-wide text-amber">UPCOMING GAMES</h2>
          </div>
          <div className="flex flex-col gap-3 max-w-2xl">
            {upcoming.map((fix, i) => {
              const isHome   = fix.home === session.team
              const opponent = isHome ? fix.away : fix.home
              return (
                <motion.div key={fix.id}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="bg-card border border-white/8 rounded-2xl p-5
                             hover:border-amber/20 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-white/20 tracking-wider">
                      {fix.round}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        isHome ? 'bg-amber/10 text-amber' : 'bg-white/5 text-white/30'
                      }`}>{isHome ? 'HOME' : 'AWAY'}</span>
                      <span className="flex items-center gap-1 text-[10px] font-bold text-amber">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
                        Upcoming
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4 mb-4">
                    <div className={`text-right font-display text-xl tracking-wide ${
                      isHome ? 'text-amber' : 'text-white/55'
                    }`}>{fix.home}</div>
                    <div className="flex flex-col items-center gap-0.5">
                      <GiBasketballBall className="text-amber/35" size={18} />
                      <span className="font-display text-xs tracking-widest text-amber/50">VS</span>
                    </div>
                    <div className={`text-left font-display text-xl tracking-wide ${
                      !isHome ? 'text-amber' : 'text-white/55'
                    }`}>{fix.away}</div>
                  </div>
                  <div className="flex flex-wrap justify-center gap-5 text-white/20 text-xs">
                    <span className="flex items-center gap-1.5">
                      <HiCalendar size={11} /> {fix.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <HiClock size={11} /> {fix.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <HiLocationMarker size={11} /> {fix.venue}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      )}

      {/* Completed */}
      {completed.length > 0 && (
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-white/15" />
            <h2 className="font-display text-xl tracking-wide text-white/30">RESULTS</h2>
          </div>
          <div className="flex flex-col gap-3 max-w-2xl">
            {completed.map((fix, i) => {
              const isHome   = fix.home === session.team
              const myScore  = isHome ? fix.homeScore : fix.awayScore
              const oppScore = isHome ? fix.awayScore : fix.homeScore
              const won      = myScore > oppScore
              const opponent = isHome ? fix.away : fix.home
              return (
                <motion.div key={fix.id}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="bg-card border border-white/5 rounded-2xl p-5
                             hover:border-white/10 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-white/15 tracking-wider">
                      {fix.round}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        isHome ? 'bg-amber/8 text-amber/50' : 'bg-white/5 text-white/20'
                      }`}>{isHome ? 'HOME' : 'AWAY'}</span>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${
                        won
                          ? 'bg-amber/10 text-amber border-amber/20'
                          : 'bg-white/5 text-white/25 border-white/8'
                      }`}>{won ? 'WIN' : 'LOSS'}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4 mb-3">
                    <div className={`text-right font-display text-xl tracking-wide ${
                      won ? 'text-amber' : 'text-white/35'
                    }`}>{session.team}</div>
                    <div className="flex items-center justify-center gap-3">
                      <span className={`font-display text-4xl ${
                        won ? 'text-amber' : 'text-white/45'
                      }`}>{myScore}</span>
                      <span className="text-white/12 font-display text-2xl">—</span>
                      <span className={`font-display text-4xl ${
                        !won ? 'text-white/45' : 'text-white/25'
                      }`}>{oppScore}</span>
                    </div>
                    <div className="text-left font-display text-xl tracking-wide text-white/35">
                      {opponent}
                    </div>
                  </div>
                  <div className="flex justify-center gap-5 text-white/18 text-xs">
                    <span className="flex items-center gap-1">
                      <HiCalendar size={11} /> {fix.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <HiLocationMarker size={11} /> {fix.venue}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      )}

      {myFixtures.length === 0 && (
        <div className="text-center py-20 text-white/15 font-display text-xl tracking-wide">
          NO FIXTURES SCHEDULED YET
        </div>
      )}
    </div>
  )
}