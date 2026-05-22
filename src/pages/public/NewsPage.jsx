import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiArrowRight, HiSearch, HiClock, HiTag } from 'react-icons/hi'

const categories = ['All', 'Match Reports', 'Transfers', 'Announcements', 'Events']

const news = [
  { id: 1, category: 'Match Reports',  featured: true,
    title: 'BK Team Dominate RSSB FC in Season Opener with Commanding 3-0 Victory',
    excerpt: 'Bank of Kigali\'s corporate squad put on an impressive display at Amahoro Stadium, with three second-half goals securing a dominant win in the opening round of 2024.',
    date: 'May 14, 2024', readTime: '4 min', tag: 'Match Reports' },
  { id: 2, category: 'Announcements', featured: false,
    title: 'Season 2024 Registration Now Open for All Corporate Institutions',
    excerpt: 'Super Admin has officially opened registration for the 2024 corporate league season. Institutions have until June 1st to submit full squad rosters for eligibility verification.',
    date: 'May 12, 2024', readTime: '2 min', tag: 'Announcements' },
  { id: 3, category: 'Transfers', featured: false,
    title: 'MTN United Strengthen Squad with Five New Employee Additions',
    excerpt: 'MTN Rwanda\'s sports team has confirmed the registration of five new employees ahead of the upcoming season, bolstering their midfield and defensive options.',
    date: 'May 10, 2024', readTime: '3 min', tag: 'Transfers' },
  { id: 4, category: 'Events', featured: false,
    title: 'Corporate Sports Gala Night Set for End of Season Celebrations',
    excerpt: 'The Game On Rwanda League will host its annual Corporate Sports Gala at Kigali Convention Centre, recognizing outstanding teams, players and institutions of 2024.',
    date: 'May 8, 2024', readTime: '3 min', tag: 'Events' },
  { id: 5, category: 'Match Reports', featured: false,
    title: 'RwandAir XI Hold Equity Lions to Thrilling 2-2 Draw at Kigali Stadium',
    excerpt: 'An entertaining encounter saw RwandAir XI and Equity Bank Lions share the points after a dramatic late equalizer in the 89th minute.',
    date: 'May 6, 2024', readTime: '4 min', tag: 'Match Reports' },
  { id: 6, category: 'Announcements', featured: false,
    title: 'New Player Verification System Launched for 2024 Season',
    excerpt: 'The league introduces a stricter digital verification process for all player registrations, ensuring only verified institution employees compete in official fixtures.',
    date: 'May 4, 2024', readTime: '2 min', tag: 'Announcements' },
]

const tagColors = {
  'Match Reports':  'bg-amber/10 text-amber border-amber/25',
  'Transfers':      'bg-white/8 text-white/50 border-white/10',
  'Announcements':  'bg-amber/15 text-amber-light border-amber/20',
  'Events':         'bg-white/5 text-white/40 border-white/8',
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  const featured = news.find(n => n.featured)
  const filtered = news.filter(n => {
    const matchCat    = activeCategory === 'All' || n.category === activeCategory
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch && !n.featured
  })

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="text-xs font-bold tracking-[3px] uppercase text-amber mb-3">
            Latest Updates
          </div>
          <h1 className="font-display text-5xl sm:text-6xl tracking-wide mb-4">LEAGUE NEWS</h1>
          <p className="text-white/40 text-base max-w-xl">
            Match reports, transfer news, announcements and events from the Game On Rwanda Corporate League.
          </p>
        </motion.div>

        {/* Featured */}
        {featured && activeCategory === 'All' && !search && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="group bg-card border border-white/8 rounded-2xl p-8 mb-10
                       hover:border-amber/25 transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-72 h-72 bg-amber/5 rounded-full
                            blur-3xl pointer-events-none group-hover:bg-amber/8 transition-all" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold border
                                 bg-amber/15 text-amber border-amber/30">⭐ Featured</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border
                                  ${tagColors[featured.tag]}`}>
                  {featured.tag}
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl tracking-wide mb-4
                             group-hover:text-amber transition-colors max-w-3xl">
                {featured.title}
              </h2>
              <p className="text-white/45 text-sm leading-relaxed mb-6 max-w-2xl">
                {featured.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-white/25 text-xs">
                  <span className="flex items-center gap-1"><HiClock size={12} /> {featured.date}</span>
                  <span className="flex items-center gap-1"><HiTag size={12} /> {featured.readTime} read</span>
                </div>
                <span className="flex items-center gap-1 text-amber text-sm font-semibold
                                 group-hover:gap-2 transition-all">
                  Read Article <HiArrowRight />
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <div className="flex flex-wrap gap-2 flex-1">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide
                            transition-all border ${
                  activeCategory === cat
                    ? 'bg-amber text-pitch border-amber shadow-lg shadow-amber/20'
                    : 'bg-white/5 text-white/50 border-white/8 hover:border-amber/30 hover:text-white'
                }`}>
                {cat}
              </button>
            ))}
          </div>
          <div className="relative sm:w-64">
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" size={15} />
            <input type="text" placeholder="Search news..." value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-card border border-white/8 rounded-xl pl-9 pr-4 py-2.5
                         text-sm text-white placeholder-white/20 outline-none
                         focus:border-amber/40 transition-colors" />
          </div>
        </motion.div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-white/20 font-display text-2xl tracking-wide">
            NO ARTICLES FOUND
          </div>
        ) : (
          <motion.div variants={stagger} initial="hidden" animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(article => (
              <motion.article key={article.id} variants={fadeUp}
                className="group bg-card border border-white/8 rounded-2xl p-6
                           hover:border-amber/20 transition-all hover:-translate-y-1
                           cursor-pointer flex flex-col">
                <div className="mb-4">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border
                                    ${tagColors[article.tag] ?? 'bg-white/5 text-white/40 border-white/10'}`}>
                    {article.tag}
                  </span>
                </div>
                <h3 className="font-semibold text-base leading-snug mb-3
                               group-hover:text-amber transition-colors flex-1">
                  {article.title}
                </h3>
                <p className="text-white/35 text-sm leading-relaxed mb-5 line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                  <div className="flex items-center gap-3 text-white/20 text-xs">
                    <span className="flex items-center gap-1">
                      <HiClock size={11} /> {article.date}
                    </span>
                    <span>{article.readTime} read</span>
                  </div>
                  <HiArrowRight className="text-white/20 group-hover:text-amber
                                           group-hover:translate-x-1 transition-all" />
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}