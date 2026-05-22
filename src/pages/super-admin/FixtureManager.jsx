import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiPlus, HiPencil, HiX, HiCheckCircle, HiLocationMarker, HiCalendar } from 'react-icons/hi'
import { GiBasketballBall } from 'react-icons/gi'
import { FIXTURES as INIT_FIXTURES, TEAMS } from '../../constants/teams'

const VENUES = [
  'Kigali Arena', 'Remera Gymnasium', 'Amahoro Sports Complex',
  'Gisozi Sports Hall', 'Nyamirambo Stadium'
]

const emptyForm = {
  home: '', away: '', date: '', time: '', venue: '', round: 'Week 9',
}

export default function FixtureManager() {
  const [fixtures, setFixtures] = useState(INIT_FIXTURES.map(f => ({ ...f })))
  const [modal,    setModal]    = useState(null) // 'create' | 'edit' | 'result'
  const [selected, setSelected] = useState(null)
  const [form,     setForm]     = useState(emptyForm)
  const [score,    setScore]    = useState({ home: '', away: '' })
  const [saving,   setSaving]   = useState(false)
  const [errors,   setErrors]   = useState({})

  const upcoming  = fixtures.filter(f => f.status === 'upcoming')
  const completed = fixtures.filter(f => f.status === 'completed')

  const validate = () => {
    const errs = {}
    if (!form.home)  errs.home  = 'Select home team'
    if (!form.away)  errs.away  = 'Select away team'
    if (form.home === form.away && form.home) errs.away = 'Teams must be different'
    if (!form.date)  errs.date  = 'Date required'
    if (!form.time)  errs.time  = 'Time required'
    if (!form.venue) errs.venue = 'Venue required'
    return errs
  }

  const handleSave = async () => {
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSaving(true)
    await new Promise(r => setTimeout(r, 700))
    if (modal === 'create') {
      setFixtures(prev => [...prev, {
        id: Date.now(), ...form, status: 'upcoming'
      }])
    } else {
      setFixtures(prev => prev.map(f =>
        f.id === selected.id ? { ...f, ...form } : f
      ))
    }
    setSaving(false)
    setModal(null)
    setErrors({})
  }

  const handleResult = async () => {
    const h = parseInt(score.home), a = parseInt(score.away)
    if (isNaN(h) || isNaN(a)) return
    setSaving(true)
    await new Promise(r => setTimeout(r, 700))
    setFixtures(prev => prev.map(f =>
      f.id === selected.id
        ? { ...f, status: 'completed', homeScore: h, awayScore: a }
        : f
    ))
    setSaving(false)
    setModal(null)
    setScore({ home: '', away: '' })
  }

  const openCreate = () => {
    setForm(emptyForm)
    setErrors({})
    setModal('create')
  }

  const openEdit = (fix) => {
    setSelected(fix)
    setForm({ home: fix.home, away: fix.away, date: fix.date,
              time: fix.time, venue: fix.venue, round: fix.round })
    setErrors({})
    setModal('edit')
  }

  const openResult = (fix) => {
    setSelected(fix)
    setScore({ home: fix.homeScore ?? '', away: fix.awayScore ?? '' })
    setModal('result')
  }

  const teamNames = TEAMS.map(t => t.name)

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
        <div>
          <div className="text-[10px] font-bold tracking-[3px] uppercase text-amber/50 mb-1">
            Competition
          </div>
          <h1 className="font-display text-3xl sm:text-4xl tracking-wide">FIXTURE MANAGER</h1>
          <p className="text-white/25 text-sm mt-1">Schedule games and record results.</p>
        </div>
        <button onClick={openCreate}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber text-pitch
                     font-bold text-sm hover:bg-amber-dark transition-all shadow-amber/20
                     shadow-lg flex-shrink-0">
          <HiPlus size={16} /> Create Fixture
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-7">
        {[
          { label: 'Total',     value: fixtures.length  },
          { label: 'Upcoming',  value: upcoming.length  },
          { label: 'Completed', value: completed.length },
        ].map(({ label, value }) => (
          <div key={label} className="bg-card border border-white/8 rounded-xl p-4 text-center">
            <div className="font-display text-3xl text-amber mb-0.5">{value}</div>
            <div className="text-white/25 text-xs font-medium">{label}</div>
          </div>
        ))}
      </div>

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-amber animate-pulse" />
            <h2 className="font-display text-xl tracking-wide text-amber">UPCOMING</h2>
          </div>
          <div className="flex flex-col gap-3 max-w-3xl">
            {upcoming.map((fix, i) => (
              <motion.div key={fix.id}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 * i }}
                className="bg-card border border-white/8 rounded-2xl p-5
                           hover:border-amber/20 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-white/20 tracking-wider">
                    {fix.round}
                  </span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEdit(fix)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                                 bg-white/5 hover:bg-amber/15 text-white/40 hover:text-amber
                                 text-[10px] font-bold transition-all">
                      <HiPencil size={10} /> Edit
                    </button>
                    <button onClick={() => openResult(fix)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                                 bg-amber/10 hover:bg-amber text-amber hover:text-pitch
                                 text-[10px] font-bold border border-amber/20 transition-all">
                      Record Result
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-3 mb-3">
                  <div className="text-right font-display text-xl tracking-wide text-white">
                    {fix.home}
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <GiBasketballBall className="text-amber/35" size={16} />
                    <span className="font-display text-xs tracking-widest text-amber/50">VS</span>
                  </div>
                  <div className="text-left font-display text-xl tracking-wide text-white/70">
                    {fix.away}
                  </div>
                </div>
                <div className="flex flex-wrap justify-center gap-4 text-white/25 text-xs">
                  <span className="flex items-center gap-1">
                    <HiCalendar size={11} /> {fix.date} · {fix.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <HiLocationMarker size={11} /> {fix.venue}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {completed.length > 0 && (
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-white/15" />
            <h2 className="font-display text-xl tracking-wide text-white/30">RESULTS</h2>
          </div>
          <div className="bg-card border border-white/8 rounded-2xl overflow-hidden max-w-3xl">
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[480px]">
                <thead>
                  <tr className="border-b border-white/8 bg-pitch-light">
                    {['Round', 'Home', 'Score', 'Away', 'Actions'].map(h => (
                      <th key={h}
                        className={`py-3 text-[10px] font-bold tracking-[2px] uppercase
                                    text-white/25 ${
                          h === 'Home' || h === 'Away' ? 'text-left px-4' :
                                                          'text-center px-3'}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {completed.map((fix, i) => (
                    <tr key={fix.id}
                      className="border-b border-white/5 hover:bg-white/2 transition-colors">
                      <td className="text-center px-3 py-3 text-white/25 text-xs">{fix.round}</td>
                      <td className="px-4 py-3 font-semibold text-sm text-white">{fix.home}</td>
                      <td className="text-center px-3 py-3">
                        <span className="font-display text-lg text-amber">
                          {fix.homeScore} – {fix.awayScore}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-white/50">{fix.away}</td>
                      <td className="text-center px-3 py-3">
                        <button onClick={() => openResult(fix)}
                          className="text-[10px] font-bold px-2.5 py-1 rounded-lg
                                     bg-white/5 hover:bg-amber/10 text-white/35
                                     hover:text-amber border border-white/8
                                     hover:border-amber/20 transition-all">
                          Edit Score
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── Modals ── */}
      <AnimatePresence>
        {(modal === 'create' || modal === 'edit') && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-pitch/90 backdrop-blur-sm flex items-center
                       justify-center p-4">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-card border border-white/10 rounded-2xl w-full max-w-md
                         shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
                <h3 className="font-display text-xl tracking-wide">
                  {modal === 'create' ? 'CREATE FIXTURE' : 'EDIT FIXTURE'}
                </h3>
                <button onClick={() => setModal(null)}
                  className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center
                             text-white/40 hover:text-white hover:bg-white/10 transition-all">
                  <HiX size={14} />
                </button>
              </div>

              <div className="px-6 py-5 flex flex-col gap-4">
                {/* Round */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold tracking-wider uppercase text-white/30">Round</label>
                  <input value={form.round}
                    onChange={e => setForm(p => ({ ...p, round: e.target.value }))}
                    placeholder="e.g. Week 9"
                    className="bg-pitch-light border border-white/8 rounded-xl px-4 py-2.5
                               text-sm text-white outline-none focus:border-amber/40 transition-colors" />
                </div>

                {/* Teams */}
                <div className="grid grid-cols-2 gap-3">
                  {[['home', 'Home Team'], ['away', 'Away Team']].map(([field, label]) => (
                    <div key={field} className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold tracking-wider uppercase text-white/30">
                        {label} *
                      </label>
                      <select value={form[field]}
                        onChange={e => { setForm(p => ({ ...p, [field]: e.target.value })); setErrors(p => ({ ...p, [field]: '' })) }}
                        className={`bg-pitch-light border rounded-xl px-3 py-2.5 text-sm
                                    text-white outline-none focus:border-amber/40
                                    transition-colors cursor-pointer ${
                          errors[field] ? 'border-red-500/40' : 'border-white/8'
                        }`}>
                        <option value="">Select...</option>
                        {teamNames.map(t => <option key={t}>{t}</option>)}
                      </select>
                      {errors[field] && (
                        <span className="text-[10px] text-red-400">{errors[field]}</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Date + Time */}
                <div className="grid grid-cols-2 gap-3">
                  {[['date', 'Date', 'date'], ['time', 'Time', 'time']].map(([field, label, type]) => (
                    <div key={field} className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold tracking-wider uppercase text-white/30">
                        {label} *
                      </label>
                      <input type={type} value={form[field]}
                        onChange={e => { setForm(p => ({ ...p, [field]: e.target.value })); setErrors(p => ({ ...p, [field]: '' })) }}
                        className={`bg-pitch-light border rounded-xl px-3 py-2.5 text-sm
                                    text-white outline-none focus:border-amber/40
                                    transition-colors ${
                          errors[field] ? 'border-red-500/40' : 'border-white/8'
                        }`} />
                      {errors[field] && (
                        <span className="text-[10px] text-red-400">{errors[field]}</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Venue */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold tracking-wider uppercase text-white/30">
                    Venue *
                  </label>
                  <select value={form.venue}
                    onChange={e => { setForm(p => ({ ...p, venue: e.target.value })); setErrors(p => ({ ...p, venue: '' })) }}
                    className={`bg-pitch-light border rounded-xl px-4 py-2.5 text-sm
                                text-white outline-none focus:border-amber/40
                                transition-colors cursor-pointer ${
                      errors.venue ? 'border-red-500/40' : 'border-white/8'
                    }`}>
                    <option value="">Select venue...</option>
                    {VENUES.map(v => <option key={v}>{v}</option>)}
                  </select>
                  {errors.venue && (
                    <span className="text-[10px] text-red-400">{errors.venue}</span>
                  )}
                </div>
              </div>

              <div className="px-6 pb-5 flex gap-3">
                <button onClick={() => setModal(null)}
                  className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/40
                             text-sm font-semibold hover:text-white hover:border-white/20 transition-all">
                  Cancel
                </button>
                <button onClick={handleSave} disabled={saving}
                  className="flex-1 py-2.5 rounded-xl bg-amber text-pitch text-sm font-bold
                             hover:bg-amber-dark transition-all shadow-amber/20 shadow-lg
                             disabled:opacity-50 flex items-center justify-center gap-2">
                  {saving ? 'Saving...' : modal === 'create' ? 'Create Fixture' : 'Save Changes'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result modal */}
      <AnimatePresence>
        {modal === 'result' && selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-pitch/90 backdrop-blur-sm flex items-center
                       justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-card border border-white/10 rounded-2xl w-full max-w-sm
                         shadow-2xl p-6">
              <h3 className="font-display text-xl tracking-wide mb-5">RECORD RESULT</h3>
              <div className="grid grid-cols-3 items-center gap-3 mb-5">
                <div className="text-right">
                  <div className="font-display text-lg text-white mb-2">{selected.home}</div>
                  <input type="number" min="0" value={score.home}
                    onChange={e => setScore(p => ({ ...p, home: e.target.value }))}
                    placeholder="0"
                    className="w-full bg-pitch-light border border-white/8 rounded-xl
                               px-3 py-2.5 text-center font-display text-2xl text-amber
                               outline-none focus:border-amber/50 transition-colors" />
                </div>
                <div className="text-center">
                  <div className="font-display text-xl text-white/20 mb-2">vs</div>
                  <div className="font-display text-2xl text-white/20">—</div>
                </div>
                <div className="text-left">
                  <div className="font-display text-lg text-white mb-2">{selected.away}</div>
                  <input type="number" min="0" value={score.away}
                    onChange={e => setScore(p => ({ ...p, away: e.target.value }))}
                    placeholder="0"
                    className="w-full bg-pitch-light border border-white/8 rounded-xl
                               px-3 py-2.5 text-center font-display text-2xl text-amber
                               outline-none focus:border-amber/50 transition-colors" />
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setModal(null)}
                  className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/40
                             text-sm font-semibold hover:text-white hover:border-white/20 transition-all">
                  Cancel
                </button>
                <button onClick={handleResult} disabled={saving || !score.home || !score.away}
                  className="flex-1 py-2.5 rounded-xl bg-amber text-pitch text-sm font-bold
                             hover:bg-amber-dark transition-all disabled:opacity-40
                             flex items-center justify-center gap-2">
                  {saving ? 'Saving...' : <><HiCheckCircle size={14} /> Save Result</>}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}