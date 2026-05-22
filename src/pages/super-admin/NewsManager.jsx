import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiPlus, HiPencil, HiTrash, HiX, HiEye } from 'react-icons/hi'

const INITIAL_NEWS = [
  { id:1, title:'BK Team Dominate RSSB FC in Season Opener',     category:'Match Reports',  is_published: true,  date:'May 14, 2025' },
  { id:2, title:'Season 2025 Registration Open for All Institutions', category:'Announcements', is_published: true,  date:'May 12, 2025' },
  { id:3, title:'MTN United Strengthen Squad Ahead of New Season', category:'Transfers',    is_published: false, date:'May 10, 2025' },
  { id:4, title:'Corporate Sports Gala Night — End of Season',    category:'Events',        is_published: true,  date:'May 8, 2025'  },
]

const CATEGORIES = ['Match Reports', 'Announcements', 'Transfers', 'Events']

const emptyForm = { title: '', category: 'Announcements', body: '', is_published: false }

export default function NewsManager() {
  const [articles, setArticles] = useState(INITIAL_NEWS)
  const [modal,    setModal]    = useState(null) // 'create' | 'edit'
  const [selected, setSelected] = useState(null)
  const [form,     setForm]     = useState(emptyForm)
  const [saving,   setSaving]   = useState(false)
  const [errors,   setErrors]   = useState({})

  const validate = () => {
    const errs = {}
    if (!form.title.trim()) errs.title = 'Title required'
    if (!form.body.trim())  errs.body  = 'Content required'
    return errs
  }

  const handleSave = async () => {
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSaving(true)
    await new Promise(r => setTimeout(r, 700))
    const today = new Date().toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' })
    if (modal === 'create') {
      setArticles(prev => [{ id: Date.now(), ...form, date: today }, ...prev])
    } else {
      setArticles(prev => prev.map(a => a.id === selected.id ? { ...a, ...form } : a))
    }
    setSaving(false)
    setModal(null)
    setErrors({})
  }

  const togglePublish = async (article) => {
    setArticles(prev => prev.map(a =>
      a.id === article.id ? { ...a, is_published: !a.is_published } : a
    ))
  }

  const handleDelete = async (id) => {
    setArticles(prev => prev.filter(a => a.id !== id))
  }

  const openCreate = () => {
    setForm(emptyForm)
    setErrors({})
    setModal('create')
  }

  const openEdit = (article) => {
    setSelected(article)
    setForm({ title: article.title, category: article.category,
              body: article.body ?? '', is_published: article.is_published })
    setErrors({})
    setModal('edit')
  }

  const catColors = {
    'Match Reports':  'bg-amber/15 text-amber',
    'Transfers':      'bg-white/8 text-white/50',
    'Announcements':  'bg-amber/10 text-amber/70',
    'Events':         'bg-white/5 text-white/40',
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
        <div>
          <div className="text-[10px] font-bold tracking-[3px] uppercase text-amber/50 mb-1">
            Content
          </div>
          <h1 className="font-display text-3xl sm:text-4xl tracking-wide">NEWS MANAGER</h1>
          <p className="text-white/25 text-sm mt-1">Write, publish, and manage league news.</p>
        </div>
        <button onClick={openCreate}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber text-pitch
                     font-bold text-sm hover:bg-amber-dark transition-all shadow-amber/20
                     shadow-lg flex-shrink-0">
          <HiPlus size={16} /> Write Article
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: 'Total',     value: articles.length                              },
          { label: 'Published', value: articles.filter(a => a.is_published).length  },
          { label: 'Drafts',    value: articles.filter(a => !a.is_published).length },
        ].map(({ label, value }) => (
          <div key={label} className="bg-card border border-white/8 rounded-xl p-4 text-center">
            <div className="font-display text-3xl text-amber mb-0.5">{value}</div>
            <div className="text-white/25 text-xs font-medium">{label}</div>
          </div>
        ))}
      </div>

      {/* Articles list */}
      <div className="bg-card border border-white/8 rounded-2xl overflow-hidden">
        <div className="divide-y divide-white/5">
          {articles.map((article, i) => (
            <motion.div key={article.id}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.04 * i }}
              className="flex items-center gap-4 px-5 py-4 hover:bg-white/2 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded
                                    ${catColors[article.category] ?? 'bg-white/5 text-white/35'}`}>
                    {article.category}
                  </span>
                  {!article.is_published && (
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded
                                     bg-white/5 text-white/25">DRAFT</span>
                  )}
                </div>
                <div className="font-semibold text-sm text-white truncate pr-4">
                  {article.title}
                </div>
                <div className="text-white/25 text-xs mt-0.5">{article.date}</div>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button onClick={() => togglePublish(article)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border
                              transition-all ${
                    article.is_published
                      ? 'bg-amber/10 text-amber border-amber/20 hover:bg-white/5 hover:text-white/40 hover:border-white/10'
                      : 'bg-white/5 text-white/35 border-white/8 hover:bg-amber/10 hover:text-amber hover:border-amber/20'
                  }`}>
                  {article.is_published ? 'Published' : 'Publish'}
                </button>
                <button onClick={() => openEdit(article)}
                  className="w-7 h-7 rounded-lg bg-white/5 hover:bg-amber/15
                             text-white/40 hover:text-amber flex items-center
                             justify-center transition-all">
                  <HiPencil size={12} />
                </button>
                <button onClick={() => handleDelete(article.id)}
                  className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10
                             text-white/40 hover:text-white/70 flex items-center
                             justify-center transition-all">
                  <HiTrash size={12} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {(modal === 'create' || modal === 'edit') && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-pitch/90 backdrop-blur-sm flex items-center
                       justify-center p-4">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-card border border-white/10 rounded-2xl w-full max-w-xl
                         shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/8 flex-shrink-0">
                <h3 className="font-display text-xl tracking-wide">
                  {modal === 'create' ? 'WRITE ARTICLE' : 'EDIT ARTICLE'}
                </h3>
                <button onClick={() => setModal(null)}
                  className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center
                             text-white/40 hover:text-white hover:bg-white/10 transition-all">
                  <HiX size={14} />
                </button>
              </div>

              <div className="overflow-y-auto flex-1 px-6 py-5 flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold tracking-wider uppercase text-white/30">
                    Title *
                  </label>
                  <input value={form.title}
                    onChange={e => { setForm(p => ({ ...p, title: e.target.value })); setErrors(p => ({ ...p, title: '' })) }}
                    placeholder="Article headline..."
                    className={`bg-pitch-light border rounded-xl px-4 py-2.5 text-sm
                                text-white placeholder-white/15 outline-none
                                focus:border-amber/40 transition-colors ${
                      errors.title ? 'border-red-500/40' : 'border-white/8'
                    }`} />
                  {errors.title && <span className="text-[10px] text-red-400">{errors.title}</span>}
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex flex-col gap-1.5 flex-1">
                    <label className="text-[10px] font-bold tracking-wider uppercase text-white/30">
                      Category
                    </label>
                    <select value={form.category}
                      onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                      className="bg-pitch-light border border-white/8 rounded-xl px-4 py-2.5
                                 text-sm text-white outline-none focus:border-amber/40
                                 transition-colors cursor-pointer">
                      {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold tracking-wider uppercase text-white/30">
                      Status
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer px-4 py-2.5
                                      bg-pitch-light border border-white/8 rounded-xl">
                      <input type="checkbox" checked={form.is_published}
                        onChange={e => setForm(p => ({ ...p, is_published: e.target.checked }))}
                        className="accent-amber w-4 h-4" />
                      <span className="text-sm text-white/60">Publish</span>
                    </label>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold tracking-wider uppercase text-white/30">
                    Content *
                  </label>
                  <textarea value={form.body}
                    onChange={e => { setForm(p => ({ ...p, body: e.target.value })); setErrors(p => ({ ...p, body: '' })) }}
                    placeholder="Write article content here..."
                    rows={8}
                    className={`bg-pitch-light border rounded-xl px-4 py-3 text-sm
                                text-white placeholder-white/15 outline-none
                                focus:border-amber/40 transition-colors resize-none ${
                      errors.body ? 'border-red-500/40' : 'border-white/8'
                    }`} />
                  {errors.body && <span className="text-[10px] text-red-400">{errors.body}</span>}
                  <p className="text-[10px] text-white/20">
                    Rich text editor (TipTap) will be integrated in Phase 2.
                  </p>
                </div>
              </div>

              <div className="px-6 pb-5 flex gap-3 flex-shrink-0 border-t border-white/5 pt-4">
                <button onClick={() => setModal(null)}
                  className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/40
                             text-sm font-semibold hover:text-white hover:border-white/20 transition-all">
                  Cancel
                </button>
                <button onClick={handleSave} disabled={saving}
                  className="flex-1 py-2.5 rounded-xl bg-amber text-pitch text-sm font-bold
                             hover:bg-amber-dark transition-all shadow-amber/20 shadow-lg
                             disabled:opacity-50 flex items-center justify-center gap-2">
                  {saving ? 'Saving...' : form.is_published ? 'Publish Article' : 'Save Draft'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}