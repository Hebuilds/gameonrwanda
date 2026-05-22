import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiPlus, HiUpload, HiPhotograph } from 'react-icons/hi'
import { MdSportsSoccer } from 'react-icons/md'

const ALBUMS = [
  { id:1, name:'Week 8 Match Photos',       photos: 12, date:'May 11, 2025', published: true  },
  { id:2, name:'Season 2025 Opening Day',   photos: 24, date:'Jan 15, 2025', published: true  },
  { id:3, name:'Pre-Season Training',       photos: 8,  date:'Jan 5, 2025',  published: false },
]

export default function GalleryManager() {
  const [albums, setAlbums] = useState(ALBUMS)

  const togglePublish = id => {
    setAlbums(prev => prev.map(a => a.id === id ? { ...a, published: !a.published } : a))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <div>
          <div className="text-[10px] font-bold tracking-[3px] uppercase text-amber/50 mb-1">Content</div>
          <h1 className="font-display text-3xl sm:text-4xl tracking-wide">GALLERY MANAGER</h1>
          <p className="text-white/25 text-sm mt-1">Upload and manage league photo albums.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber text-pitch
                           font-bold text-sm hover:bg-amber-dark transition-all shadow-amber/20 shadow-lg">
          <HiPlus size={16} /> New Album
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {albums.map((album, i) => (
          <motion.div key={album.id}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.07 * i }}
            className="bg-card border border-white/8 rounded-2xl overflow-hidden
                       hover:border-amber/20 transition-all">
            <div className="aspect-video bg-pitch-light flex items-center justify-center
                            relative group cursor-pointer">
              <MdSportsSoccer className="text-amber/15 group-hover:text-amber/25 transition-colors" size={48} />
              <div className="absolute inset-0 bg-pitch/0 group-hover:bg-pitch/50
                              flex items-center justify-center transition-all">
                <label className="opacity-0 group-hover:opacity-100 transition-opacity
                                  flex items-center gap-2 px-4 py-2 rounded-xl bg-amber
                                  text-pitch text-xs font-bold cursor-pointer">
                  <HiUpload size={13} /> Upload Photos
                  <input type="file" multiple accept="image/*" className="hidden" />
                </label>
              </div>
            </div>
            <div className="p-4">
              <div className="font-semibold text-sm text-white mb-1">{album.name}</div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-white/25 text-xs">
                  <HiPhotograph size={11} />
                  <span>{album.photos} photos · {album.date}</span>
                </div>
                <button onClick={() => togglePublish(album.id)}
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border
                              transition-all ${
                    album.published
                      ? 'bg-amber/10 text-amber border-amber/20'
                      : 'bg-white/5 text-white/30 border-white/8 hover:border-amber/20 hover:text-amber'
                  }`}>
                  {album.published ? 'Published' : 'Publish'}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}