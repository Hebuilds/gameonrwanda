import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiPlus, HiPencil, HiTrash, HiX, HiCheckCircle } from 'react-icons/hi'
import { BsTrophyFill } from 'react-icons/bs'
import { GiBasketballBall } from 'react-icons/gi'
import { TEAMS, PLAYERS } from '../../constants/teams'

// ── Initial data from company profile ──────────────────
const INITIAL_HISTORY = [
  {
    id: 1,
    year: '2024',
    season: 'RCL Season 1',
    sport: 'Basketball',
    champion:  { team: 'BK BBC',   institution: 'Bank of Kigali'      },
    runnerUp:  { team: 'EQUITY',   institution: 'Equity Bank Rwanda'   },
    third:     { team: 'DGIE',     institution: 'DGIE Rwanda'          },
    finalScore: 'BK defeated Equity',
    mvp:       { name: 'Shyaka Olivier',   team: 'BK BBC',   note: 'Finals MVP'              },
    topScorer: { name: 'Isezerano Enock',  team: 'REG BBC',  stat: '148 PTS (Season)'        },
    topAssist: { name: 'Jonathan Inkindi', team: 'DGIE',     stat: '21 AST (Season)'         },
    topRebounder: { name: 'Bruno Nyamwasa', team: 'DGIE',    stat: '9 REB (per game)'        },
    notes: 'Inaugural season of the Rwanda Corporate League. BK BBC were dominant throughout.',
  },
  {
    id: 2,
    year: '2025',
    season: 'RCL Season 2',
    sport: 'Basketball',
    champion:  { team: 'BK BBC',   institution: 'Bank of Kigali'       },
    runnerUp:  { team: 'REG BBC',  institution: 'Rwanda Energy Group'  },
    third:     { team: 'DGIE',     institution: 'DGIE Rwanda'          },
    finalScore: 'BK defeated REG',
    mvp:       { name: 'Icyishatse Herve',  team: 'BK BBC',  note: 'Finals MVP — 93 PTS'    },
    topScorer: { name: 'Isezerano Enock',   team: 'REG BBC', stat: '148 PTS (Season)'        },
    topAssist: { name: 'Jonathan Inkindi',  team: 'DGIE',    stat: '21 AST (Season)'         },
    topRebounder: { name: 'Shyaka Olivier', team: 'BK BBC',  stat: '107 PTS / Key performer' },
    notes: 'BK BBC back-to-back champions. REG BBC emerged as the top challenger.',
  },
]

const SPORTS = ['Basketball', 'Football', 'Volleyball']

const emptyAward = { name: '', team: '', stat: '' }

const emptyForm = {
  year: '',
  season: '',
  sport: 'Basketball',
  champion:  { team: '', institution: '' },
  runnerUp:  { team: '', institution: '' },
  third:     { team: '', institution: '' },
  finalScore: '',
  mvp:          { ...emptyAward, note: '' },
  topScorer:    { ...emptyAward },
  topAssist:    { ...emptyAward },
  topRebounder: { ...emptyAward },
  notes: '',
}

const medalStyle = {
  champion: 'text-amber bg-amber/15 border-amber/25',
  runnerUp: 'text-white/60 bg-white/8 border-white/12',
  third:    'text-amber/50 bg-amber/8 border-amber/15',
}

const teamNames   = TEAMS.map(t => t.name)
const playerNames = PLAYERS.map(p => ({ name: p.name, team: p.team }))

// ── Helper: get institution from team name ─────────────
const getInstitution = (teamName) =>
  TEAMS.find(t => t.name === teamName)?.institution ?? ''

// ── Reusable input component ─────────────────────────────
const Input = ({ label, value, onChange, placeholder, error, type = 'text' }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[10px] font-bold tracking-wider uppercase text-white/30">
      {label}
    </label>
    <input type={type} value={value} onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className={`bg-pitch-light border rounded-xl px-4 py-2.5 text-sm text-white
                  placeholder-white/15 outline-none focus:border-amber/50
                  transition-colors ${error ? 'border-red-500/40' : 'border-white/8'}`} />
    {error && <span className="text-[10px] text-red-400">{error}</span>}
  </div>
)

const Select = ({ label, value, onChange, options, error, placeholder = 'Select...' }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[10px] font-bold tracking-wider uppercase text-white/30">
      {label}
    </label>
    <select value={value} onChange={e => onChange(e.target.value)}
      className={`bg-pitch-light border rounded-xl px-4 py-2.5 text-sm text-white
                  outline-none focus:border-amber/50 transition-colors cursor-pointer ${
        error ? 'border-red-500/40' : 'border-white/8'
      }`}>
      <option value="">{placeholder}</option>
      {options.map(o => (
        <option key={typeof o === 'string' ? o : o.value}
                value={typeof o === 'string' ? o : o.value}>
          {typeof o === 'string' ? o : o.label}
        </option>
      ))}
    </select>
    {error && <span className="text-[10px] text-red-400">{error}</span>}
  </div>
)

export default function ChampionsManager() {
  const [history,  setHistory]  = useState(INITIAL_HISTORY)
  const [modal,    setModal]    = useState(null) // 'create' | 'edit' | 'delete'
  const [selected, setSelected] = useState(null)
  const [form,     setForm]     = useState(emptyForm)
  const [saving,   setSaving]   = useState(false)
  const [errors,   setErrors]   = useState({})
  const [success,  setSuccess]  = useState(false)

  // ── Open modals ──────────────────────────────────────
  const openCreate = () => {
    setForm({ ...emptyForm })
    setErrors({})
    setSuccess(false)
    setModal('create')
  }

  const openEdit = (record) => {
    setSelected(record)
    setForm({ ...record })
    setErrors({})
    setSuccess(false)
    setModal('edit')
  }

  const openDelete = (record) => {
    setSelected(record)
    setModal('delete')
  }

  // ── Validation ───────────────────────────────────────
  const validate = () => {
    const errs = {}
    if (!form.year.trim())             errs.year     = 'Season year required'
    if (!form.champion.team)           errs.champion = 'Select champion team'
    if (!form.runnerUp.team)           errs.runnerUp = 'Select runner-up'
    if (!form.third.team)              errs.third    = 'Select 3rd place'
    if (form.champion.team === form.runnerUp.team) errs.runnerUp = 'Must be different teams'
    return errs
  }

  // ── Form field updaters ──────────────────────────────
  const setField = (key, value) => {
    setForm(p => ({ ...p, [key]: value }))
    setErrors(p => ({ ...p, [key]: '' }))
  }

  const setNested = (section, key, value) => {
    setForm(p => ({
      ...p,
      [section]: { ...p[section], [key]: value }
    }))
    if (key === 'team') {
      const inst = getInstitution(value)
      setForm(p => ({
        ...p,
        [section]: { ...p[section], team: value, institution: inst }
      }))
    }
    setErrors(p => ({ ...p, [section]: '' }))
  }

  // ── Save ─────────────────────────────────────────────
  const handleSave = async () => {
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSaving(true)
    await new Promise(r => setTimeout(r, 800))

    if (modal === 'create') {
      setHistory(prev => [
        ...prev,
        { ...form, id: Date.now() }
      ])
    } else {
      setHistory(prev => prev.map(h =>
        h.id === selected.id ? { ...form, id: selected.id } : h
      ))
    }

    setSaving(false)
    setSuccess(true)
    setTimeout(() => { setModal(null); setSuccess(false) }, 1200)
  }

  const handleDelete = async () => {
    setSaving(true)
    await new Promise(r => setTimeout(r, 500))
    setHistory(prev => prev.filter(h => h.id !== selected.id))
    setSaving(false)
    setModal(null)
  }

  // ── Award row sub-form ───────────────────────────────
  const AwardSection = ({ title, emoji, section, statLabel = 'Stat / Points' }) => (
    <div className="bg-pitch-light border border-white/5 rounded-xl p-4">
      <div className="text-xs font-bold tracking-wide text-amber/70 mb-3">
        {emoji} {title}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Player name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold tracking-wider uppercase text-white/25">
            Player Name
          </label>
          <input value={form[section].name}
            onChange={e => setNested(section, 'name', e.target.value)}
            placeholder="e.g. Isezerano Enock"
            className="bg-pitch border border-white/8 rounded-xl px-3 py-2 text-sm
                       text-white placeholder-white/15 outline-none focus:border-amber/40
                       transition-colors" />
        </div>
        {/* Team */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold tracking-wider uppercase text-white/25">
            Team
          </label>
          <select value={form[section].team}
            onChange={e => setNested(section, 'team', e.target.value)}
            className="bg-pitch border border-white/8 rounded-xl px-3 py-2 text-sm
                       text-white outline-none focus:border-amber/40 transition-colors
                       cursor-pointer">
            <option value="">Select team...</option>
            {teamNames.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        {/* Stat */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold tracking-wider uppercase text-white/25">
            {statLabel}
          </label>
          <input value={form[section].stat ?? form[section].note ?? ''}
            onChange={e => setNested(section,
              form[section].stat !== undefined ? 'stat' : 'note',
              e.target.value
            )}
            placeholder="e.g. 148 PTS"
            className="bg-pitch border border-white/8 rounded-xl px-3 py-2 text-sm
                       text-white placeholder-white/15 outline-none focus:border-amber/40
                       transition-colors" />
        </div>
      </div>
    </div>
  )

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
        <div>
          <div className="text-[10px] font-bold tracking-[3px] uppercase text-amber/50 mb-1">
            League History
          </div>
          <h1 className="font-display text-3xl sm:text-4xl tracking-wide">
            CHAMPIONS HISTORY
          </h1>
          <p className="text-white/25 text-sm mt-1">
            Manage RCL season records, champions, and award winners.
          </p>
        </div>
        <button onClick={openCreate}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber text-pitch
                     font-bold text-sm hover:bg-amber-dark transition-all shadow-amber/20
                     shadow-lg flex-shrink-0">
          <HiPlus size={16} /> Add Season
        </button>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-3 mb-7">
        {[
          { label: 'Total Seasons',    value: history.length },
          { label: 'Back-to-Back',     value: history.filter(h => h.champion.team === 'BK BBC').length },
          { label: 'Unique Champions', value: [...new Set(history.map(h => h.champion.team))].length },
        ].map(({ label, value }) => (
          <div key={label} className="bg-card border border-white/8 rounded-xl p-4 text-center">
            <div className="font-display text-3xl text-amber mb-0.5">{value}</div>
            <div className="text-white/25 text-xs font-medium">{label}</div>
          </div>
        ))}
      </div>

      {/* History cards */}
      <div className="flex flex-col gap-5">
        {history.sort((a, b) => Number(b.year) - Number(a.year)).map((record, i) => (
          <motion.div key={record.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * i }}
            className="bg-card border border-white/8 rounded-2xl overflow-hidden
                       hover:border-amber/15 transition-all">

            {/* Card header */}
            <div className="flex items-center justify-between px-6 py-4
                            bg-pitch-light border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber flex items-center
                                justify-center shadow-lg shadow-amber/25">
                  <BsTrophyFill className="text-pitch" size={18} />
                </div>
                <div>
                  <div className="font-display text-xl tracking-wide text-amber leading-none">
                    {record.season}
                  </div>
                  <div className="text-white/30 text-xs mt-0.5">
                    {record.sport} · {record.year}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => openEdit(record)}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-amber/15
                             text-white/40 hover:text-amber flex items-center
                             justify-center transition-all">
                  <HiPencil size={13} />
                </button>
                <button onClick={() => openDelete(record)}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10
                             text-white/40 hover:text-white flex items-center
                             justify-center transition-all">
                  <HiTrash size={13} />
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Podium row */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { label: '🥇 Champion',  data: record.champion, key: 'champion' },
                  { label: '🥈 Runner-Up', data: record.runnerUp, key: 'runnerUp' },
                  { label: '🥉 3rd Place', data: record.third,    key: 'third'    },
                ].map(({ label, data, key }) => (
                  <div key={key}
                    className={`rounded-xl p-4 text-center border ${medalStyle[key]}`}>
                    <div className="text-[10px] font-bold tracking-wider uppercase
                                    opacity-60 mb-2">{label}</div>
                    <div className="font-display text-lg tracking-wide leading-tight mb-0.5">
                      {data.team || '—'}
                    </div>
                    <div className="text-[10px] opacity-50 truncate">{data.institution}</div>
                  </div>
                ))}
              </div>

              {/* Final result */}
              {record.finalScore && (
                <div className="flex items-center gap-2 mb-5 px-4 py-2.5 bg-pitch-light
                                rounded-xl border border-white/5">
                  <GiBasketballBall className="text-amber/50" size={13} />
                  <span className="text-white/35 text-xs">Final: </span>
                  <span className="text-white/70 text-sm font-semibold">{record.finalScore}</span>
                </div>
              )}

              {/* Awards row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                {[
                  { emoji: '🏆', label: 'MVP',          data: record.mvp,          stat: record.mvp?.note ?? record.mvp?.stat          },
                  { emoji: '🎯', label: 'Top Scorer',   data: record.topScorer,    stat: record.topScorer?.stat    },
                  { emoji: '🤝', label: 'Top Assist',   data: record.topAssist,    stat: record.topAssist?.stat    },
                  { emoji: '💪', label: 'Top Rebounder',data: record.topRebounder, stat: record.topRebounder?.stat },
                ].map(({ emoji, label, data, stat }) => (
                  <div key={label}
                    className="bg-pitch-light border border-white/5 rounded-xl p-3">
                    <div className="text-[9px] font-bold tracking-wider uppercase
                                    text-white/20 mb-1.5">{emoji} {label}</div>
                    <div className="font-semibold text-sm text-white leading-tight mb-0.5 truncate">
                      {data?.name || <span className="text-white/20 font-normal">—</span>}
                    </div>
                    {data?.team && (
                      <div className="text-[10px] text-amber/60 truncate mb-0.5">{data.team}</div>
                    )}
                    {stat && (
                      <div className="text-[10px] text-white/25">{stat}</div>
                    )}
                  </div>
                ))}
              </div>

              {/* Notes */}
              {record.notes && (
                <p className="text-white/25 text-xs leading-relaxed bg-pitch-light
                              rounded-xl px-4 py-3 border border-white/5">
                  📝 {record.notes}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* ════════════════════════════════════════════════ */}
      {/* CREATE / EDIT MODAL                              */}
      {/* ════════════════════════════════════════════════ */}
      <AnimatePresence>
        {(modal === 'create' || modal === 'edit') && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-pitch/92 backdrop-blur-sm flex items-end
                       sm:items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 32 }}
              transition={{ duration: 0.25 }}
              className="bg-card border border-white/10 rounded-2xl w-full max-w-2xl
                         shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">

              {/* Modal header */}
              <div className="flex items-center justify-between px-6 py-4
                              border-b border-white/8 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <BsTrophyFill className="text-amber" size={16} />
                  <h3 className="font-display text-xl tracking-wide">
                    {modal === 'create' ? 'ADD SEASON RECORD' : 'EDIT SEASON RECORD'}
                  </h3>
                </div>
                <button onClick={() => setModal(null)}
                  className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center
                             text-white/40 hover:text-white hover:bg-white/10 transition-all">
                  <HiX size={14} />
                </button>
              </div>

              {/* Scrollable body */}
              <div className="overflow-y-auto flex-1 px-6 py-5 flex flex-col gap-5">

                {success && (
                  <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl bg-amber/10
                               border border-amber/20 text-amber text-sm">
                    <HiCheckCircle size={15} /> Season record saved successfully!
                  </motion.div>
                )}

                {/* ── Season info ── */}
                <div>
                  <div className="text-xs font-bold tracking-[2px] uppercase text-white/25
                                  mb-3">Season Info</div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <Input label="Year *" value={form.year}
                      onChange={v => setField('year', v)}
                      placeholder="e.g. 2026"
                      error={errors.year} />
                    <Input label="Season Name" value={form.season}
                      onChange={v => setField('season', v)}
                      placeholder="e.g. RCL Season 3" />
                    <Select label="Sport" value={form.sport}
                      onChange={v => setField('sport', v)}
                      options={SPORTS} />
                  </div>
                </div>

                {/* ── Podium ── */}
                <div>
                  <div className="text-xs font-bold tracking-[2px] uppercase text-white/25
                                  mb-3">🏆 Final Standings</div>
                  <div className="flex flex-col gap-3">

                    {/* Champion */}
                    <div className="bg-amber/8 border border-amber/15 rounded-xl p-4">
                      <div className="text-xs font-bold text-amber mb-2">🥇 Champion *</div>
                      <div className="grid grid-cols-2 gap-3">
                        <Select label="Team" value={form.champion.team}
                          onChange={v => setNested('champion', 'team', v)}
                          options={teamNames} error={errors.champion} />
                        <Input label="Institution" value={form.champion.institution}
                          onChange={v => setNested('champion', 'institution', v)}
                          placeholder="Auto-filled" />
                      </div>
                    </div>

                    {/* Runner Up */}
                    <div className="bg-white/3 border border-white/8 rounded-xl p-4">
                      <div className="text-xs font-bold text-white/50 mb-2">🥈 Runner-Up *</div>
                      <div className="grid grid-cols-2 gap-3">
                        <Select label="Team" value={form.runnerUp.team}
                          onChange={v => setNested('runnerUp', 'team', v)}
                          options={teamNames} error={errors.runnerUp} />
                        <Input label="Institution" value={form.runnerUp.institution}
                          onChange={v => setNested('runnerUp', 'institution', v)}
                          placeholder="Auto-filled" />
                      </div>
                    </div>

                    {/* 3rd Place */}
                    <div className="bg-white/3 border border-white/8 rounded-xl p-4">
                      <div className="text-xs font-bold text-amber/50 mb-2">🥉 3rd Place *</div>
                      <div className="grid grid-cols-2 gap-3">
                        <Select label="Team" value={form.third.team}
                          onChange={v => setNested('third', 'team', v)}
                          options={teamNames} error={errors.third} />
                        <Input label="Institution" value={form.third.institution}
                          onChange={v => setNested('third', 'institution', v)}
                          placeholder="Auto-filled" />
                      </div>
                    </div>

                    {/* Final result note */}
                    <Input label="Final Result Note"
                      value={form.finalScore}
                      onChange={v => setField('finalScore', v)}
                      placeholder="e.g. BK defeated REG 88–76 in the final" />
                  </div>
                </div>

                {/* ── Awards ── */}
                <div>
                  <div className="text-xs font-bold tracking-[2px] uppercase text-white/25 mb-3">
                    Individual Awards
                  </div>
                  <div className="flex flex-col gap-3">
                    <AwardSection
                      title="Season / Finals MVP"
                      emoji="🏆"
                      section="mvp"
                      statLabel="Award Note" />
                    <AwardSection
                      title="Top Scorer"
                      emoji="🎯"
                      section="topScorer"
                      statLabel="Total Points" />
                    <AwardSection
                      title="Top Assists"
                      emoji="🤝"
                      section="topAssist"
                      statLabel="Total Assists" />
                    <AwardSection
                      title="Top Rebounder"
                      emoji="💪"
                      section="topRebounder"
                      statLabel="Total Rebounds" />
                  </div>
                </div>

                {/* ── Notes ── */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold tracking-wider uppercase text-white/30">
                    Season Notes
                  </label>
                  <textarea value={form.notes}
                    onChange={e => setField('notes', e.target.value)}
                    placeholder="Any additional notes about this season..."
                    rows={3}
                    className="bg-pitch-light border border-white/8 rounded-xl px-4 py-3
                               text-sm text-white placeholder-white/15 outline-none
                               focus:border-amber/40 transition-colors resize-none" />
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 pb-5 pt-4 border-t border-white/8 flex gap-3 flex-shrink-0">
                <button onClick={() => setModal(null)}
                  className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/40
                             text-sm font-semibold hover:text-white hover:border-white/20
                             transition-all">
                  Cancel
                </button>
                <button onClick={handleSave} disabled={saving}
                  className="flex-1 py-2.5 rounded-xl bg-amber text-pitch text-sm font-bold
                             hover:bg-amber-dark transition-all shadow-amber/20 shadow-lg
                             disabled:opacity-50 flex items-center justify-center gap-2">
                  {saving ? (
                    <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10"
                        stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"/>
                    </svg> Saving...</>
                  ) : modal === 'create' ? 'Add Season Record' : 'Save Changes'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── DELETE CONFIRM ── */}
      <AnimatePresence>
        {modal === 'delete' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-pitch/92 backdrop-blur-sm flex items-center
                       justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card border border-white/10 rounded-2xl w-full max-w-sm
                         p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <BsTrophyFill className="text-amber/50" size={20} />
                <h3 className="font-display text-xl tracking-wide">DELETE RECORD</h3>
              </div>
              <p className="text-white/40 text-sm leading-relaxed mb-6">
                Are you sure you want to delete the{' '}
                <span className="text-amber font-semibold">{selected?.season}</span>{' '}
                season record? This cannot be undone.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setModal(null)}
                  className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/40
                             text-sm font-semibold hover:text-white hover:border-white/20
                             transition-all">
                  Cancel
                </button>
                <button onClick={handleDelete} disabled={saving}
                  className="flex-1 py-2.5 rounded-xl bg-white/10 text-white/70 text-sm
                             font-bold hover:bg-white/15 transition-all disabled:opacity-40">
                  {saving ? 'Deleting...' : 'Yes, Delete'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}