import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { GiBasketballBall } from 'react-icons/gi'
import { HiArrowRight, HiGlobe, HiHeart } from 'react-icons/hi'
import { BsTrophyFill, BsPeopleFill } from 'react-icons/bs'
import { COMPANY_INFO, TEAMS } from '../../constants/teams'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }

const champions = [
  { year: '2024', champion: 'BK BBC',  runnerUp: 'Equity Bank', third: 'DGIE', detail: 'BK defeated Equity in the final' },
  { year: '2025', champion: 'BK BBC',  runnerUp: 'REG BBC',     third: 'DGIE', detail: 'BK defeated REG in the final'    },
]

export default function AboutPage() {
  return (
    <div className="pt-16 min-h-screen">

      {/* ── Hero ── */}
      <section className="relative py-24 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-amber/6 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-amber/4 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={stagger} initial="hidden" animate="show">

            <motion.div variants={fadeUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                               bg-amber/10 border border-amber/30 text-amber text-xs
                               font-bold tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
                About Game On Rwanda
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp}
              className="font-display text-5xl sm:text-7xl tracking-wide leading-none mb-4">
              PURPOSE-LED<br />
              <span className="text-amber">SPORTS MANAGEMENT</span>
            </motion.h1>

            <motion.div variants={fadeUp}
              className="font-display text-xl tracking-[5px] text-amber/40 mb-6 uppercase">
              Loyal To The Soil
            </motion.div>

            <motion.p variants={fadeUp}
              className="text-white/45 text-lg leading-relaxed max-w-2xl">
              {COMPANY_INFO.about}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="py-20 border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="mb-12 text-center">
            <div className="text-xs font-bold tracking-[3px] uppercase text-amber mb-3">
              Our Purpose
            </div>
            <h2 className="font-display text-4xl sm:text-5xl tracking-wide">
              MISSION & VISION
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { num:'01', title:'Our Mission', text: COMPANY_INFO.mission, icon: HiHeart      },
              { num:'02', title:'Our Vision',  text: COMPANY_INFO.vision,  icon: HiGlobe      },
            ].map(({ num, title, text, icon: Icon }) => (
              <motion.div key={num}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card border border-white/8 rounded-2xl p-8 relative overflow-hidden
                           hover:border-amber/20 transition-all group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-amber/4 rounded-full
                                blur-3xl pointer-events-none group-hover:bg-amber/8 transition-all" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-amber flex items-center
                                    justify-center text-pitch font-display text-base">
                      {num}
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-amber/10 flex items-center
                                    justify-center text-amber">
                      <Icon size={16} />
                    </div>
                  </div>
                  <h3 className="font-display text-2xl tracking-wide mb-4 text-amber">
                    {title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">{text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sport Saves Lives ── */}
      <section className="py-20 bg-pitch-mid border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                            bg-amber/10 border border-amber/20 text-amber text-xs
                            font-bold tracking-widest uppercase mb-4">
              🏀 Flagship Initiative
            </div>
            <h2 className="font-display text-4xl sm:text-5xl tracking-wide mb-4">
              SPORT SAVES LIVES
            </h2>
            <p className="text-white/40 text-base leading-relaxed max-w-2xl mx-auto">
              Our flagship initiative brings together leading corporate institutions — banks,
              telecoms, energy providers, and government agencies — into a dynamic sporting
              environment that blends competition, wellness advocacy, and teamwork.
            </p>
          </motion.div>

          <motion.div
            variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {COMPANY_INFO.pillars.map(pillar => (
              <motion.div key={pillar.num} variants={fadeUp}
                className="bg-card border border-white/8 rounded-2xl p-6
                           hover:border-amber/20 transition-all">
                <div className="w-10 h-10 rounded-xl bg-amber flex items-center justify-center
                                font-display text-base text-pitch mb-4">
                  {pillar.num}
                </div>
                <h4 className="font-display text-lg tracking-wide mb-3 text-amber">
                  {pillar.title}
                </h4>
                <p className="text-white/40 text-sm leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── RCL Champions History ── */}
      <section className="py-20 border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="mb-10">
            <div className="text-xs font-bold tracking-[3px] uppercase text-amber mb-3">
              Rwanda Corporate League
            </div>
            <h2 className="font-display text-4xl sm:text-5xl tracking-wide">
              CHAMPIONS HISTORY
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5 mb-12">
            {champions.map((c, i) => (
              <motion.div key={c.year}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.1 * i }}
                className="bg-card border border-amber/20 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber/8 rounded-full
                                blur-2xl pointer-events-none" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <BsTrophyFill className="text-amber" size={20} />
                    <span className="font-display text-2xl text-amber tracking-wide">
                      RCL {c.year}
                    </span>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      { pos: '🥇 Champion',   name: c.champion,  style: 'text-amber font-bold'   },
                      { pos: '🥈 Runner-Up',  name: c.runnerUp,  style: 'text-white/60'           },
                      { pos: '🥉 3rd Place',  name: c.third,     style: 'text-white/40'           },
                    ].map(({ pos, name, style }) => (
                      <div key={pos} className="flex items-center justify-between">
                        <span className="text-white/30 text-xs">{pos}</span>
                        <span className={`text-sm font-semibold ${style}`}>{name}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-white/25 text-xs mt-3 pt-3 border-t border-white/5">
                    {c.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Team achievements quick list */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-white/8 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/5">
              <span className="font-display text-xl tracking-wide">STRATEGIC PARTNERS</span>
            </div>
            <div className="divide-y divide-white/5">
              {TEAMS.map(team => (
                <div key={team.id}
                  className="flex items-center justify-between px-6 py-4
                             hover:bg-white/2 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber/10 border border-amber/15
                                    flex items-center justify-center">
                      <span className="font-display text-base text-amber">
                        {team.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{team.name}</div>
                      <div className="text-white/30 text-xs">{team.institution}</div>
                    </div>
                  </div>
                  <span className="text-xs text-amber/60 font-medium text-right max-w-[200px]">
                    {team.achievement}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Real Impact Numbers ── */}
      <section className="py-20 bg-pitch-mid border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-center mb-12">
            <div className="text-xs font-bold tracking-[3px] uppercase text-amber mb-3">
              Community Impact
            </div>
            <h2 className="font-display text-4xl sm:text-5xl tracking-wide mb-4">
              OUR IMPACT
            </h2>
            <p className="text-white/35 text-base max-w-xl mx-auto">
              Beyond basketball — we are aiming to make more impact as we improve our
              collaborations across Rwanda and the continent.
            </p>
          </motion.div>

          <motion.div
            variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {COMPANY_INFO.impact.map((item, i) => (
              <motion.div key={i} variants={fadeUp}
                className="bg-card border border-white/8 rounded-2xl p-6 text-center
                           hover:border-amber/20 transition-all group">
                <div className="font-display text-5xl text-amber mb-2 group-hover:scale-105
                                transition-transform">{item.stat}</div>
                <div className="font-semibold text-white text-sm mb-3">{item.label}</div>
                <p className="text-white/35 text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Expansion Plans ── */}
      <section className="py-20 border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="mb-12">
            <div className="text-xs font-bold tracking-[3px] uppercase text-amber mb-3">
              The Future
            </div>
            <h2 className="font-display text-4xl sm:text-5xl tracking-wide mb-4">
              EXPANSION PLAN
            </h2>
            <p className="text-white/35 text-base max-w-xl">
              Game On Rwanda is built to grow — from Rwanda to East Africa and beyond.
            </p>
          </motion.div>

          <motion.div
            variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="flex flex-col gap-4">
            {COMPANY_INFO.expansionPlans.map((plan, i) => (
              <motion.div key={plan.num} variants={fadeUp}
                className="flex items-start gap-5 bg-card border border-white/8 rounded-2xl
                           p-6 hover:border-amber/20 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-amber flex items-center justify-center
                                font-display text-base text-pitch flex-shrink-0
                                group-hover:scale-105 transition-transform">
                  {plan.num}
                </div>
                <div>
                  <h4 className="font-display text-xl tracking-wide mb-2 text-amber">
                    {plan.title}
                  </h4>
                  <p className="text-white/45 text-sm leading-relaxed">{plan.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>
            <GiBasketballBall className="text-amber/30 mx-auto mb-6" size={48} />
            <h2 className="font-display text-4xl sm:text-5xl tracking-wide mb-4">
              JOIN THE MOVEMENT
            </h2>
            <div className="font-display text-sm tracking-[4px] text-amber/40 uppercase mb-6">
              Loyal To The Soil
            </div>
            <p className="text-white/40 text-base leading-relaxed mb-8 max-w-xl mx-auto">
              Bring your institution into Rwanda's premier corporate basketball league.
              Together we build healthier workplaces and stronger communities.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/login"
                className="flex items-center gap-2 px-8 py-4 rounded-xl bg-amber text-pitch
                           font-bold hover:bg-amber-dark transition-all shadow-lg shadow-amber/30
                           hover:-translate-y-0.5 text-sm">
                Register Your Team <HiArrowRight />
              </Link>
              <Link to="/teams"
                className="flex items-center gap-2 px-8 py-4 rounded-xl border border-white/15
                           text-white/60 font-semibold hover:border-amber/40 hover:text-white
                           transition-all hover:-translate-y-0.5 text-sm">
                <BsPeopleFill size={14} /> View All Teams
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}