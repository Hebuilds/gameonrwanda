import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiX, HiChevronLeft, HiChevronRight, HiPhotograph } from 'react-icons/hi'
import { MdSportsSoccer } from 'react-icons/md'

const categories = ['All', 'Match Photos', 'Team Photos', 'Highlights', 'Events']

// Using placeholder images (replace with real URLs from storage later)
const gallery = [
  { id:1,  category:'Match Photos',  title:'BK Team vs RSSB FC — Round 4',       cols: 2 },
  { id:2,  category:'Team Photos',   title:'MTN United — Official Squad Photo',   cols: 1 },
  { id:3,  category:'Match Photos',  title:'RwandAir XI Goal Celebration',        cols: 1 },
  { id:4,  category:'Highlights',    title:'Season 2024 Opening Ceremony',        cols: 1 },
  { id:5,  category:'Match Photos',  title:'Equity Lions vs Airport FC',          cols: 1 },
  { id:6,  category:'Team Photos',   title:'RSSB FC Pre-Season Training',         cols: 2 },
  { id:7,  category:'Events',        title:'Corporate Sports Gala 2023',          cols: 1 },
  { id:8,  category:'Match Photos',  title:'Ministry XI Corner Kick',             cols: 1 },
  { id:9,  category:'Highlights',    title:'Top Goals Compilation — Round 3',     cols: 1 },
  { id:10, category:'Events',        title:'Player Verification Day 2024',        cols: 1 },
  { id:11, category:'Team Photos',   title:'BK Team Dressing Room',               cols: 1 },
  { id:12, category:'Match Photos',  title:'BPR Rangers vs Ministry XI',          cols: 2 },
]

// Distinct placeholder colors per item
const placeholderBg = [
  'from-amber/20 to-pitch-light',
  'from-amber/10 to-pitch-mid',
  'from-white/5 to-pitch-light',
  'from-amber/15 to-pitch',
  'from-white/8 to-pitch-mid',
  'from-amber/12 to-pitch-light',
]

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } }

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightbox, setLightbox]             = useState(null) // index in filtered

  const filtered = gallery.filter(
    g => activeCategory === 'All' || g.category === activeCategory
  )

  const openLightbox  = useCallback((idx) => setLightbox(idx), [])
  const closeLightbox = useCallback(() => setLightbox(null), [])
  const prevPhoto     = useCallback(() =>
    setLightbox(i => (i - 1 + filtered.length) % filtered.length), [filtered.length])
  const nextPhoto     = useCallback(() =>
    setLightbox(i => (i + 1) % filtered.length), [filtered.length])

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="text-xs font-bold tracking-[3px] uppercase text-amber mb-3">
            Media Library
          </div>
          <h1 className="font-display text-5xl sm:text-6xl tracking-wide mb-4">GALLERY</h1>
          <p className="text-white/40 text-base max-w-xl">
            Match action, team photos, and event highlights from the Game On Rwanda Corporate League.
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-10">
          {categories.map(cat => (
            <button key={cat} onClick={() => { setActiveCategory(cat); setLightbox(null) }}
              className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all border ${
                activeCategory === cat
                  ? 'bg-amber text-pitch border-amber shadow-amber/20 shadow-lg'
                  : 'bg-white/5 text-white/50 border-white/8 hover:border-amber/30 hover:text-white'
              }`}>
              {cat}
              {activeCategory === cat && filtered.length > 0 &&
                <span className="ml-1.5 opacity-60">({filtered.length})</span>}
            </button>
          ))}
        </motion.div>

        {/* Masonry-style grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-white/20 font-display text-2xl tracking-wide">
            NO PHOTOS YET
          </div>
        ) : (
          <motion.div variants={stagger} initial="hidden" animate="show"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[200px]">
            {filtered.map((item, idx) => (
              <motion.div key={item.id} variants={fadeUp}
                onClick={() => openLightbox(idx)}
                style={{ gridColumn: item.cols === 2 ? 'span 2' : 'span 1' }}
                className="group relative bg-card border border-white/8 rounded-2xl
                           overflow-hidden cursor-pointer hover:border-amber/30 transition-all
                           hover:-translate-y-0.5">

                {/* Placeholder bg (replace with <img> when real photos exist) */}
                <div className={`absolute inset-0 bg-gradient-to-br ${placeholderBg[idx % placeholderBg.length]}`} />

                {/* Icon placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <MdSportsSoccer className="text-amber/15 group-hover:text-amber/25 transition-colors"
                    size={item.cols === 2 ? 64 : 48} />
                </div>

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-pitch/0 group-hover:bg-pitch/60
                                transition-all duration-300 flex items-end">
                  <div className="p-4 translate-y-full group-hover:translate-y-0
                                  transition-transform duration-300 w-full">
                    <div className="text-[10px] font-bold tracking-wider uppercase
                                    text-amber/70 mb-1">{item.category}</div>
                    <div className="text-white text-sm font-semibold leading-snug line-clamp-2">
                      {item.title}
                    </div>
                  </div>
                </div>

                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 rounded-lg bg-pitch/70 backdrop-blur-sm
                                   text-[10px] font-bold text-amber/80 border border-amber/15">
                    {item.category}
                  </span>
                </div>

                {/* Expand icon */}
                <div className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-pitch/70
                                backdrop-blur-sm flex items-center justify-center
                                opacity-0 group-hover:opacity-100 transition-opacity">
                  <HiPhotograph className="text-white/60" size={14} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-pitch/95 backdrop-blur-md flex items-center
                       justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button onClick={closeLightbox}
              className="absolute top-5 right-5 w-10 h-10 rounded-xl bg-white/8
                         flex items-center justify-center text-white/60 hover:text-white
                         hover:bg-white/15 transition-all z-10">
              <HiX size={18} />
            </button>

            {/* Prev */}
            <button onClick={e => { e.stopPropagation(); prevPhoto() }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-xl
                         bg-white/8 flex items-center justify-center text-white/60
                         hover:text-white hover:bg-amber/20 transition-all z-10">
              <HiChevronLeft size={22} />
            </button>

            {/* Next */}
            <button onClick={e => { e.stopPropagation(); nextPhoto() }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-xl
                         bg-white/8 flex items-center justify-center text-white/60
                         hover:text-white hover:bg-amber/20 transition-all z-10">
              <HiChevronRight size={22} />
            </button>

            {/* Content */}
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={e => e.stopPropagation()}
              className="relative max-w-3xl w-full"
            >
              {/* Photo placeholder */}
              <div className={`w-full aspect-video rounded-2xl bg-gradient-to-br
                              ${placeholderBg[lightbox % placeholderBg.length]}
                              flex items-center justify-center mb-4 border border-white/8`}>
                <MdSportsSoccer className="text-amber/20" size={80} />
              </div>

              {/* Caption */}
              <div className="text-center">
                <div className="text-xs font-bold tracking-widest uppercase text-amber/60 mb-1">
                  {filtered[lightbox]?.category}
                </div>
                <div className="font-display text-2xl tracking-wide text-white">
                  {filtered[lightbox]?.title}
                </div>
                <div className="text-white/25 text-xs mt-2">
                  {lightbox + 1} / {filtered.length}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}