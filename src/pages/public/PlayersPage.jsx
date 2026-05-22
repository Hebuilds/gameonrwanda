import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiSearch } from 'react-icons/hi'
import { GiBasketballBall } from 'react-icons/gi'
import { PLAYERS, BASKETBALL_POSITIONS, TEAMS } from '../../constants/teams'

const teamFilter = ['All Teams', ...TEAMS.map(t => t.name)]

const positionColors = {
  'Point Guard':    'bg-amber/15 text-amber border-amber/25',
  'Shooting Guard': 'bg-white/8 text-white/55 border-white/10',
  'Small Forward':  'bg-white/8 text-white/55 border-white/10',
  'Power Forward':  'bg-amber/10 text-amber/75 border-amber/15',
  'Center':         'bg-amber/20 text-amber border-amber/30',
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.04 } } }

export default function PlayersPage() {
  const [search,   setSearch]   = useState('')
  const [position, setPosition] = useState('All Positions')
  const [team,     setTeam]     = useState('All Teams')

  const filtered = PLAYERS.filter(p => {
    const matchPos    = position === 'All Positions' || p.position === position
    const matchTeam   = team === 'All Teams' || p.team === team
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                        p.team.toLowerCase().includes(search.toLowerCase())
    return matchPos && matchTeam && matchSearch
  })

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="text-xs font-bold tracking-[3px] uppercase text-amber mb-3">Player Registry</div>
          <h1 className="font-display text-5xl sm:text-6xl tracking-wide mb-4">PLAYERS</h1>
          <p className="text-white/40 text-base max-w-xl">
            All registered players across the Game On Rwanda Corporate Basketball League — 2025 season.
          </p>
        </motion.div>

        {/* Summary chips */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-10">
          {[
            { label: 'Total Players',  value: PLAYERS.length },
            { label: 'Verified',       value: PLAYERS.filter(p => p.status === 'verified').length },
            { label: 'Pending Review', value: PLAYERS.filter(p => p.status === 'pending').length  },
          ].map(({ label, value }) => (
            <div key={label}
              className="bg-card border border-white/8 rounded-xl px-5 py-3
                         flex items-center gap-3">
              <span className="font-display text-2xl text-amber">{value}</span>
              <span className="text-white/35 text-xs font-medium">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* Filters */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
          className="flex flex-col lg:flex-row gap-3 mb-8">
          <div className="relative lg:w-60">
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" size={15} />
            <input type="text" placeholder="Search players..."
              value={search} onChange={e => setSearch(e.target.value)}
              className="w-full bg-card border border-white/8 rounded-xl pl-9 pr-4 py-2.5
                         text-sm text-white placeholder-white/20 outline-none
                         focus:border-amber/40 transition-colors" />
          </div>
          <div className="flex flex-wrap gap-2 flex-1">
            {BASKETBALL_POSITIONS.map(p => (
              <button key={p} onClick={() => setPosition(p)}
                className={`px-3 py-2 rounded-xl text-xs font-bold tracking-wide transition-all border ${
                  position === p
                    ? 'bg-amber text-pitch border-amber shadow-amber/20 shadow-lg'
                    : 'bg-white/5 text-white/50 border-white/8 hover:border-amber/30 hover:text-white'
                }`}>{p}</button>
            ))}
          </div>
          <select value={team} onChange={e => setTeam(e.target.value)}
            className="bg-card border border-white/8 rounded-xl px-4 py-2.5 text-sm
                       text-white/60 outline-none focus:border-amber/40 transition-colors cursor-pointer">
            {teamFilter.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </motion.div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-white/20 font-display text-2xl tracking-wide">
            NO PLAYERS FOUND
          </div>
        ) : (
          <motion.div variants={stagger} initial="hidden" animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map(player => (
              <motion.div key={player.id} variants={fadeUp}
                className="group bg-card border border-white/8 rounded-2xl p-5
                           hover:border-amber/25 transition-all hover:-translate-y-1
                           cursor-pointer relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-amber/4 rounded-full
                                blur-xl pointer-events-none group-hover:bg-amber/8 transition-all" />

                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-amber/10 border border-amber/15
                                  flex items-center justify-center">
                    <span className="font-display text-2xl text-amber leading-none">
                      {player.number}
                    </span>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${
                    player.status === 'verified'
                      ? 'bg-amber/10 text-amber border-amber/20'
                      : 'bg-white/5 text-white/30 border-white/8'
                  }`}>
                    {player.status === 'verified' ? '✓ Verified' : '⏳ Pending'}
                  </span>
                </div>

                <div className="font-semibold text-base text-white mb-0.5 leading-tight
                                group-hover:text-amber transition-colors">{player.name}</div>
                <div className="text-white/30 text-xs mb-3">{player.institution}</div>

                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border
                                    ${positionColors[player.position] ?? 'bg-white/5 text-white/40 border-white/8'}`}>
                    {player.position}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <GiBasketballBall className="text-white/15 text-xs" size={12} />
                    <span className="text-white/25 text-xs">{player.team}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}