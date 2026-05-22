import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiSearch, HiArrowRight } from 'react-icons/hi'
import { BsPeopleFill, BsTrophyFill } from 'react-icons/bs'
import { GiBasketballBall } from 'react-icons/gi'
import { TEAMS, SPORTS } from '../../constants/teams'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }

export default function TeamsPage() {
  const [search, setSearch] = useState('')
  const [sport,  setSport]  = useState('Basketball')

  const filtered = TEAMS.filter(t => {
    const matchSport  = t.sport === sport
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
                        t.institution.toLowerCase().includes(search.toLowerCase())
    return matchSport && matchSearch
  })

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="text-xs font-bold tracking-[3px] uppercase text-amber mb-3">
            2025 Season
          </div>
          <h1 className="font-display text-5xl sm:text-6xl tracking-wide mb-4">COMPETING TEAMS</h1>
          <p className="text-white/40 text-base max-w-xl">
            All institutions registered in the Game On Rwanda Corporate League for the 2025 season.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Registered Teams', value: TEAMS.length,                            icon: BsTrophyFill   },
            { label: 'Total Players',    value: TEAMS.reduce((a,t) => a + t.players, 0), icon: BsPeopleFill   },
            { label: 'Active Sport',     value: 'Basketball',                            icon: GiBasketballBall },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-card border border-white/8 rounded-xl p-4
                                        flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber/10 flex items-center justify-center
                              text-amber flex-shrink-0">
                <Icon size={18} />
              </div>
              <div>
                <div className="font-display text-2xl text-amber leading-none">{value}</div>
                <div className="text-white/35 text-xs mt-0.5">{label}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Sport tabs + search */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
          className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="flex flex-wrap gap-2 flex-1">
            {SPORTS.map(s => (
              <button key={s} onClick={() => setSport(s)}
                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all border ${
                  sport === s
                    ? 'bg-amber text-pitch border-amber shadow-amber/20 shadow-lg'
                    : 'bg-white/5 text-white/50 border-white/8 hover:border-amber/30 hover:text-white'
                }`}>
                {s}
                {s !== 'Basketball' && (
                  <span className="ml-1.5 text-[9px] opacity-50">Soon</span>
                )}
              </button>
            ))}
          </div>
          <div className="relative sm:w-60">
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" size={15} />
            <input type="text" placeholder="Search teams..."
              value={search} onChange={e => setSearch(e.target.value)}
              className="w-full bg-card border border-white/8 rounded-xl pl-9 pr-4 py-2.5
                         text-sm text-white placeholder-white/20 outline-none
                         focus:border-amber/40 transition-colors" />
          </div>
        </motion.div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-white/20 font-display text-2xl tracking-wide">
            NO TEAMS FOUND
          </div>
        ) : (
          <motion.div variants={stagger} initial="hidden" animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map(team => (
              <motion.div key={team.id} variants={fadeUp}
                className="group bg-card border border-white/8 rounded-2xl p-6
                           hover:border-amber/25 transition-all hover:-translate-y-1
                           cursor-pointer relative overflow-hidden flex flex-col">

                <div className="absolute top-0 right-0 w-28 h-28 bg-amber/5 rounded-full
                                blur-2xl pointer-events-none group-hover:bg-amber/10 transition-all" />

                {/* Avatar + sport badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-amber/15 border border-amber/20
                                  flex items-center justify-center">
                    <span className="font-display text-2xl text-amber">
                      {team.name.charAt(0)}
                    </span>
                  </div>
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg
                                   bg-amber/8 border border-amber/15 text-amber text-[10px] font-bold">
                    <GiBasketballBall size={11} />
                    {team.sport}
                  </span>
                </div>

                <div className="font-display text-xl tracking-wide mb-0.5
                                group-hover:text-amber transition-colors">{team.name}</div>
                <div className="text-white/40 text-xs mb-1">{team.institution}</div>
                <div className="text-white/20 text-xs mb-4">Est. {team.founded}</div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-5 mt-auto">
                  {[
                    { label: 'Players', value: team.players },
                    { label: 'Wins',    value: team.wins    },
                    { label: 'Losses',  value: team.losses  },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-pitch-light rounded-lg p-2 text-center">
                      <div className="font-display text-base text-amber leading-none">{value}</div>
                      <div className="text-white/25 text-[10px] mt-0.5">{label}</div>
                    </div>
                  ))}
                </div>

                <Link to={`/teams/${team.slug}`}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl
                             border border-amber/20 text-amber text-xs font-bold
                             hover:bg-amber hover:text-pitch transition-all">
                  View Roster <HiArrowRight size={12} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}