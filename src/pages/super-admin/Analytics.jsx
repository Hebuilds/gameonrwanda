import { motion } from 'framer-motion'
import { TEAMS, PLAYERS, FIXTURES, STANDINGS } from '../../constants/teams'
import { GiBasketballBall } from 'react-icons/gi'
import { BsPeopleFill, BsTrophyFill } from 'react-icons/bs'
import { HiTrendingUp } from 'react-icons/hi'

export default function Analytics() {
  const wins = STANDINGS.reduce((a, s) => a + s.won, 0)
  const avgPPG = (STANDINGS.reduce((a, s) => a + s.pf, 0) / STANDINGS.length / 8).toFixed(1)

  return (
    <div>
      <div className="mb-7">
        <div className="text-[10px] font-bold tracking-[3px] uppercase text-amber/50 mb-1">Reports</div>
        <h1 className="font-display text-3xl sm:text-4xl tracking-wide">ANALYTICS</h1>
        <p className="text-white/25 text-sm mt-1">League performance data and participation insights.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {[
          { label: 'Total Teams',    value: TEAMS.length,       icon: BsTrophyFill     },
          { label: 'Total Players',  value: PLAYERS.length,     icon: BsPeopleFill     },
          { label: 'Games Played',   value: FIXTURES.filter(f=>f.status==='completed').length, icon: GiBasketballBall },
          { label: 'Avg PPG',        value: avgPPG,             icon: HiTrendingUp     },
        ].map(({ label, value, icon: Icon }) => (
          <motion.div key={label}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-white/8 rounded-2xl p-5">
            <div className="w-9 h-9 rounded-xl bg-amber/10 text-amber flex items-center
                            justify-center mb-3">
              <Icon size={17} />
            </div>
            <div className="font-display text-4xl text-amber leading-none mb-1">{value}</div>
            <div className="text-white/30 text-xs font-medium">{label}</div>
          </motion.div>
        ))}
      </div>

      {/* Team performance table */}
      <div className="bg-card border border-white/8 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/5">
          <span className="font-display text-lg tracking-wide">TEAM PERFORMANCE</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[500px]">
            <thead>
              <tr className="border-b border-white/8 bg-pitch-light">
                {['Team', 'W', 'L', 'WIN%', 'PF', 'PA', '+/-'].map(h => (
                  <th key={h}
                    className={`py-3.5 text-[10px] font-bold tracking-[2px] uppercase
                                text-white/25 ${h === 'Team' ? 'text-left px-5' : 'text-center px-3'}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {STANDINGS.map((row, i) => (
                <motion.tr key={row.team}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 0.04 * i }}
                  className="border-b border-white/5 hover:bg-white/2 transition-colors">
                  <td className="px-5 py-3 font-semibold text-white">{row.team}</td>
                  <td className="text-center px-3 py-3 text-amber font-bold">{row.won}</td>
                  <td className="text-center px-3 py-3 text-white/40">{row.lost}</td>
                  <td className="text-center px-3 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-1.5 bg-pitch-light rounded-full w-16 overflow-hidden">
                        <div className="h-full bg-amber rounded-full"
                          style={{ width: `${row.pct * 100}%` }} />
                      </div>
                      <span className="text-amber text-xs font-bold">
                        {(row.pct * 100).toFixed(0)}%
                      </span>
                    </div>
                  </td>
                  <td className="text-center px-3 py-3 text-white/40">{row.pf}</td>
                  <td className="text-center px-3 py-3 text-white/40">{row.pa}</td>
                  <td className={`text-center px-3 py-3 font-bold ${
                    row.diff > 0 ? 'text-amber' : 'text-white/30'
                  }`}>{row.diff > 0 ? `+${row.diff}` : row.diff}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}