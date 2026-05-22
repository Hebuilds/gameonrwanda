import { useState } from 'react'
import { motion } from 'framer-motion'
import { GiBasketballBall } from 'react-icons/gi'
import { HiTrendingUp, HiTrendingDown, HiMinus } from 'react-icons/hi'
import { STANDINGS } from '../../constants/teams'

const competitions = ['Corporate League 2025', 'Cup Competition']

const formColors = {
  W: 'bg-amber/20 text-amber',
  L: 'bg-white/8 text-white/35',
}

const streakColor = (s) => s.startsWith('W') ? 'text-amber' : 'text-white/35'

export default function StandingsPage() {
  const [activeComp, setActiveComp] = useState(competitions[0])

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="text-xs font-bold tracking-[3px] uppercase text-amber mb-3">
            Live Table
          </div>
          <h1 className="font-display text-5xl sm:text-6xl tracking-wide mb-2">STANDINGS</h1>
          <div className="flex items-center gap-2 text-white/35 text-sm">
            <GiBasketballBall size={14} className="text-amber" />
            Corporate Basketball League — 2025 Season
          </div>
        </motion.div>

        {/* Competition tabs */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-6">
          {competitions.map(comp => (
            <button key={comp} onClick={() => setActiveComp(comp)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all border ${
                activeComp === comp
                  ? 'bg-amber text-pitch border-amber shadow-amber/20 shadow-lg'
                  : 'bg-white/5 text-white/50 border-white/8 hover:border-amber/30 hover:text-white'
              }`}>{comp}</button>
          ))}
        </motion.div>

        {/* Legend */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
          className="flex flex-wrap items-center gap-5 mb-4 text-xs text-white/25 font-medium">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-amber/25" /> Top 4 — Playoff Qualification
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-white/8" /> Bottom 2 — Review Zone
          </span>
        </motion.div>

        {/* Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-white/8 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[780px]">
              <thead>
                <tr className="border-b border-white/8 bg-pitch-light">
                  {['#', 'Team', 'GP', 'W', 'L', 'WIN%', 'PF', 'PA', 'DIFF', 'STK', 'Form'].map(h => (
                    <th key={h}
                      className={`py-4 text-xs font-bold tracking-[2px] uppercase text-white/25
                                  ${h === 'Team' ? 'text-left px-4' :
                                    h === '#' ? 'text-left px-5' : 'text-center px-3'}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {STANDINGS.map((row, i) => {
                  const isPlayoff = row.pos <= 4
                  const isBottom  = row.pos >= STANDINGS.length - 1
                  return (
                    <motion.tr key={row.team}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * i }}
                      className={`border-b border-white/5 hover:bg-white/2 group
                                  cursor-pointer transition-colors
                                  ${isBottom ? 'bg-white/1' : ''}`}>

                      {/* Pos */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5">
                          <span className={`font-display text-lg leading-none ${
                            row.pos === 1 ? 'text-amber' :
                            row.pos === 2 ? 'text-white/50' :
                            row.pos === 3 ? 'text-amber/55' : 'text-white/25'
                          }`}>{row.pos}</span>
                          {isPlayoff
                            ? <HiTrendingUp className="text-amber" size={12} />
                            : isBottom
                            ? <HiTrendingDown className="text-white/25" size={12} />
                            : <HiMinus className="text-white/10" size={12} />}
                        </div>
                      </td>

                      {/* Team */}
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-amber/15 border border-amber/20
                                          flex items-center justify-center flex-shrink-0">
                            <GiBasketballBall className="text-amber" size={14} />
                          </div>
                          <span className="font-bold text-white group-hover:text-amber
                                           transition-colors text-sm">{row.team}</span>
                        </div>
                      </td>

                      {/* GP W L */}
                      {[row.played, row.won, row.lost].map((v, j) => (
                        <td key={j} className="text-center px-3 py-4 text-white/40 text-sm">{v}</td>
                      ))}

                      {/* WIN% */}
                      <td className="text-center px-3 py-4">
                        <span className={`font-bold text-sm ${
                          row.pct >= 0.5 ? 'text-amber' : 'text-white/40'
                        }`}>{(row.pct * 100).toFixed(1)}%</span>
                      </td>

                      {/* PF PA */}
                      {[row.pf, row.pa].map((v, j) => (
                        <td key={j} className="text-center px-3 py-4 text-white/40 text-sm">{v}</td>
                      ))}

                      {/* DIFF */}
                      <td className={`text-center px-3 py-4 text-sm font-bold ${
                        row.diff > 0 ? 'text-amber' : row.diff < 0 ? 'text-white/30' : 'text-white/40'
                      }`}>{row.diff > 0 ? `+${row.diff}` : row.diff}</td>

                      {/* Streak */}
                      <td className={`text-center px-3 py-4 text-sm font-bold ${streakColor(row.streak)}`}>
                        {row.streak}
                      </td>

                      {/* Form */}
                      <td className="text-center px-4 py-4">
                        <div className="flex items-center justify-center gap-1">
                          {row.form.map((f, j) => (
                            <span key={j}
                              className={`w-6 h-6 rounded text-[10px] font-bold flex
                                          items-center justify-center ${formColors[f]}`}>
                              {f}
                            </span>
                          ))}
                        </div>
                      </td>
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Key */}
        <div className="mt-4 flex flex-wrap gap-4 text-xs text-white/20">
          {['GP = Games Played', 'W = Wins', 'L = Losses', 'WIN% = Win Percentage',
            'PF = Points For', 'PA = Points Against', 'DIFF = Point Differential', 'STK = Streak'].map(k => (
            <span key={k}>{k}</span>
          ))}
        </div>

      </div>
    </div>
  )
}