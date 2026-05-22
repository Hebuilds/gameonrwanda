import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiArrowRight } from 'react-icons/hi'
import { GiBasketballBall } from 'react-icons/gi'
import { TEAMS, PLAYERS, STANDINGS } from '../../constants/teams'

export default function TeamsOverview() {
  return (
    <div>
      <div className="mb-7">
        <div className="text-[10px] font-bold tracking-[3px] uppercase text-amber/50 mb-1">
          Registry
        </div>
        <h1 className="font-display text-3xl sm:text-4xl tracking-wide">ALL TEAMS</h1>
        <p className="text-white/25 text-sm mt-1">All registered institutions in the 2025 season.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {TEAMS.map((team, i) => {
          const standing = STANDINGS.find(s => s.team === team.name)
          const playerCount = PLAYERS.filter(p => p.team === team.name).length
          const verified = PLAYERS.filter(p => p.team === team.name && p.status === 'verified').length

          return (
            <motion.div key={team.id}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 * i }}
              className="group bg-card border border-white/8 rounded-2xl p-5
                         hover:border-amber/20 transition-all hover:-translate-y-0.5">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber/15 border border-amber/20
                                flex items-center justify-center">
                  <span className="font-display text-2xl text-amber">{team.name.charAt(0)}</span>
                </div>
                <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5
                                 rounded bg-amber/8 text-amber/60">
                  <GiBasketballBall size={10} /> {team.sport}
                </span>
              </div>
              <div className="font-display text-xl tracking-wide mb-0.5
                              group-hover:text-amber transition-colors">{team.name}</div>
              <div className="text-white/30 text-xs mb-4">{team.institution}</div>

              <div className="grid grid-cols-3 gap-1.5 mb-4">
                {[
                  { label: 'Players', value: playerCount },
                  { label: 'Verified', value: verified   },
                  { label: standing ? `${standing.won}W` : '0W', value: standing?.lost ?? 0, label2: 'L' },
                ].map(({ label, value, label2 }, j) => (
                  <div key={j} className="bg-pitch-light rounded-lg p-2 text-center">
                    <div className="font-display text-base text-amber leading-none">
                      {label2 ? `${value}${label2}` : value}
                    </div>
                    <div className="text-white/20 text-[9px] mt-0.5">
                      {label2 ? 'Losses' : label}
                    </div>
                  </div>
                ))}
              </div>

              <Link to={`/teams/${team.slug}`} target="_blank"
                className="flex items-center justify-center gap-1.5 w-full py-2 rounded-xl
                           border border-amber/15 text-amber text-xs font-bold
                           hover:bg-amber hover:text-pitch transition-all">
                Public Page <HiArrowRight size={11} />
              </Link>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}