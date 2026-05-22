import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiArrowRight, HiCalendar, HiLocationMarker } from 'react-icons/hi'
import { MdSportsSoccer, MdEmojiEvents } from 'react-icons/md'
import { BsPeopleFill, BsShieldFill } from 'react-icons/bs'
import { FiTrendingUp } from 'react-icons/fi'

function useCounter(target, duration = 2000) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = 0
    const step = Math.ceil(target / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(start)
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration])
  return count
}

const upcomingFixtures = [
  { id: 1, home: 'BK',      away: 'RSSB FC',     date: 'May 18', time: '15:00', venue: 'Amahoro Stadium'   },
  { id: 2, home: 'RwandAir bbc',  away: 'MTN United',  date: 'May 20', time: '14:00', venue: 'Kigali Stadium'    },
  { id: 3, home: 'Equity bbc', away: 'Airport FC',  date: 'May 22', time: '16:00', venue: 'Nyamirambo Stad'   },
  { id: 4, home: 'Reg',  away: 'BPR Rangers', date: 'May 25', time: '15:30', venue: 'Amahoro Stadium'   },
]

const featuredTeams = [
  { id: 1, name: 'BK Team',      institution: 'Bank of Kigali',       players: 22, color: '#E8A020' },
  { id: 2, name: 'RSSB FC',      institution: 'RSSB',                 players: 20, color: '#C4841A' },
  { id: 3, name: 'RwandAir XI',  institution: 'RwandAir',             players: 21, color: '#F0B535' },
  { id: 4, name: 'MTN United',   institution: 'MTN Rwanda',           players: 23, color: '#E8A020' },
  { id: 5, name: 'Equity Lions', institution: 'Equity Bank',          players: 19, color: '#C4841A' },
  { id: 6, name: 'Airport FC',   institution: 'Kigali Intl Airport',  players: 18, color: '#F0B535' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }

export default function HomePage() {
  const teams   = useCounter(24)
  const players = useCounter(480)
  const matches = useCounter(136)
  const seasons = useCounter(3)

  return (
    <div className="pt-16">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">

        {/* Glow blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber/8 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-amber/5 rounded-full blur-3xl" />
        </div>

        {/* Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(232,160,32,0.6) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(232,160,32,0.6) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <motion.div variants={stagger} initial="hidden" animate="show">

              <motion.div variants={fadeUp} className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                                 bg-amber/10 border border-amber/30 text-amber text-xs
                                 font-bold tracking-widest uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
                  Rwanda Corporate Sports League
                </span>
              </motion.div>

              <motion.h1 variants={fadeUp}
                className="font-display text-6xl sm:text-7xl xl:text-8xl leading-none
                           tracking-wide mb-4">
                WHERE<br />
                <span className="text-amber">INSTITUTIONS</span><br />
                COMPETE
              </motion.h1>

              <motion.p variants={fadeUp}
                className="text-white/50 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
                The official management platform for Rwanda's premier corporate sports league —
                where banks, airlines, telecoms, and government institutions battle for glory.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-12">
                <Link to="/teams"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber text-pitch
                             font-bold text-sm hover:bg-amber-dark transition-all
                             shadow-lg shadow-amber/30 hover:-translate-y-0.5">
                  View All Teams <HiArrowRight />
                </Link>
                <Link to="/fixtures"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/15
                             text-white/70 font-semibold text-sm hover:border-amber/40
                             hover:text-white transition-all hover:-translate-y-0.5">
                  <HiCalendar /> Upcoming Fixtures
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div variants={fadeUp}
                className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/8">
                {[
                  { num: teams,   suffix: '+', label: 'Teams',   icon: BsShieldFill   },
                  { num: players, suffix: '+', label: 'Players', icon: BsPeopleFill   },
                  { num: matches, suffix: '',  label: 'Matches', icon: MdSportsSoccer },
                  { num: seasons, suffix: '',  label: 'Seasons', icon: MdEmojiEvents  },
                ].map(({ num, suffix, label, icon: Icon }) => (
                  <div key={label} className="flex flex-col">
                    <div className="flex items-baseline gap-0.5">
                      <span className="font-display text-4xl text-amber leading-none">{num}</span>
                      <span className="font-display text-2xl text-amber/60">{suffix}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Icon className="text-white/25 text-xs" />
                      <span className="text-white/40 text-xs font-semibold tracking-wider uppercase">
                        {label}
                      </span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — Fixtures card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="bg-card/60 backdrop-blur border border-white/8 rounded-2xl
                              p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <div className="text-xs font-bold tracking-[2px] uppercase text-white/25 mb-0.5">
                      Upcoming
                    </div>
                    <div className="font-display text-xl tracking-wide">FIXTURES</div>
                  </div>
                  <Link to="/fixtures"
                    className="text-xs text-amber font-semibold flex items-center gap-1
                               hover:gap-2 transition-all">
                    View All <HiArrowRight />
                  </Link>
                </div>

                <div className="space-y-3">
                  {upcomingFixtures.map((fix, i) => (
                    <motion.div key={fix.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="bg-pitch-light rounded-xl p-4 border border-white/5
                                 hover:border-amber/20 transition-all group cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="text-sm font-semibold text-white
                                         group-hover:text-amber transition-colors truncate flex-1">
                          {fix.home}
                        </span>
                        <span className="mx-3 px-2.5 py-1 rounded-lg bg-amber/15 text-amber
                                         text-xs font-display tracking-widest flex-shrink-0">
                          VS
                        </span>
                        <span className="text-sm font-semibold text-white/60
                                         truncate flex-1 text-right">
                          {fix.away}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-white/30 text-xs">
                          <HiCalendar size={11} />
                          <span>{fix.date} · {fix.time}</span>
                        </div>
                        <div className="flex items-center gap-1 text-white/30 text-xs">
                          <HiLocationMarker size={11} />
                          <span className="truncate max-w-[120px]">{fix.venue}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber/60 animate-pulse" />
                  <span className="text-xs text-white/25 font-medium">
                    Season 2024 — Group Stage Active
                  </span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── TEAMS SECTION ── */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="flex items-end justify-between mb-10"
          >
            <div>
              <div className="text-xs font-bold tracking-[3px] uppercase text-amber mb-2">
                Registered Institutions
              </div>
              <h2 className="font-display text-4xl sm:text-5xl tracking-wide">
                COMPETING TEAMS
              </h2>
            </div>
            <Link to="/teams"
              className="hidden sm:flex items-center gap-2 text-sm text-white/40
                         hover:text-amber transition-colors font-semibold">
              All Teams <HiArrowRight />
            </Link>
          </motion.div>

          <motion.div
            variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {featuredTeams.map(team => (
              <motion.div key={team.id} variants={fadeUp}
                className="group bg-card border border-white/8 rounded-2xl p-6
                           hover:border-amber/20 transition-all hover:-translate-y-1
                           cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl
                                opacity-10 group-hover:opacity-20 transition-opacity
                                pointer-events-none"
                     style={{ background: team.color }} />
                <div className="w-12 h-12 rounded-xl flex items-center justify-center
                                mb-4 text-pitch font-display text-xl"
                     style={{ background: team.color }}>
                  {team.name.charAt(0)}
                </div>
                <div className="font-display text-xl tracking-wide mb-1
                                group-hover:text-amber transition-colors">
                  {team.name}
                </div>
                <div className="text-white/40 text-sm mb-4">{team.institution}</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <BsPeopleFill className="text-white/25 text-xs" />
                    <span className="text-white/40 text-xs font-semibold">
                      {team.players} Players
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-white/5 text-white/40
                                   text-xs font-semibold">Football</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── STATS BANNER ── */}
      <section className="py-16 bg-pitch-mid border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
          >
            {[
              { icon: BsShieldFill,   value: '24',   label: 'Registered Teams'     },
              { icon: BsPeopleFill,   value: '480+', label: 'Verified Players'      },
              { icon: MdSportsSoccer, value: '136',  label: 'Matches Played'        },
              { icon: FiTrendingUp,   value: '3',    label: 'Active Competitions'   },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber/10 border border-amber/20
                                flex items-center justify-center text-amber">
                  <Icon size={22} />
                </div>
                <div className="font-display text-4xl text-amber">{value}</div>
                <div className="text-white/40 text-sm font-medium">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
<section className="py-24">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <motion.div
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.6 }}>

      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                       bg-amber/10 border border-amber/30 text-amber text-xs
                       font-bold tracking-widest uppercase mb-6">
        🏀 Sport Saves Lives
      </span>

      <h2 className="font-display text-5xl sm:text-6xl tracking-wide mb-4">
        IS YOUR INSTITUTION<br />
        <span className="text-amber">READY TO COMPETE?</span>
      </h2>

      <div className="font-display text-base tracking-[4px] text-amber/40 mb-6 uppercase">
        Loyal To The Soil
      </div>

      <p className="text-white/45 text-base leading-relaxed mb-10 max-w-2xl mx-auto">
        Join Rwanda's leading corporate basketball league. Represent your institution,
        build your squad, and compete in the Rwanda Corporate League — managed 
        entirely through our digital platform.
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <Link to="/login"
          className="flex items-center gap-2 px-8 py-4 rounded-xl bg-amber text-pitch
                     font-bold hover:bg-amber-dark transition-all shadow-lg shadow-amber/30
                     hover:-translate-y-0.5 text-sm">
          Register Your Team <HiArrowRight />
        </Link>
        <Link to="/about"
          className="flex items-center gap-2 px-8 py-4 rounded-xl border border-white/15
                     text-white/60 font-semibold hover:border-amber/40 hover:text-white
                     transition-all hover:-translate-y-0.5 text-sm">
          About Game On Rwanda
        </Link>
      </div>
    </motion.div>
  </div>
</section>

    </div>
  )
}