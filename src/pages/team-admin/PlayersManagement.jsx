import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useOutletContext } from 'react-router-dom'
import {
  HiPlus, HiPencil, HiTrash, HiUpload, HiX,
  HiCheckCircle, HiLockClosed, HiSearch
} from 'react-icons/hi'
import { PLAYERS, BASKETBALL_POSITIONS } from '../../constants/teams'

const POSITIONS = BASKETBALL_POSITIONS.filter(p => p !== 'All Positions')

// Mock initial players for the team — Phase 2: fetch from Supabase
function useTeamPlayers(team) {
  const [players, setPlayers] = useState(
    PLAYERS.filter(p => p.team === team).map(p => ({ ...p }))
  )

  const addPlayer = (data) => {
    const newPlayer = {
      ...data,
      id: Date.now(),
      team,
      status: 'pending',
    }
    setPlayers(prev => [...prev, newPlayer])
  }

  const updatePlayer = (id, data) => {
    setPlayers(prev => prev.map(p => p.id === id ? { ...p, ...data } : p))
  }

  const deletePlayer = (id) => {
    setPlayers(prev => prev.filter(p => p.id !== id))
  }

  return { players, addPlayer, updatePlayer, deletePlayer }
}

const emptyForm = {
  name: '', position: 'Point Guard', number: '', age: '',
  institution: '', nationalId: '', employeeId: '', photo: null, document: null,
}

export default function PlayersManagement() {
  const { session } = useOutletContext()
  const { players, addPlayer, updatePlayer, deletePlayer } = useTeamPlayers(session.team)

  const [search,      setSearch]      = useState('')
  const [modal,       setModal]       = useState(null)  // 'add' | 'edit' | 'delete' | 'view'
  const [selected,    setSelected]    = useState(null)
  const [form,        setForm]        = useState(emptyForm)
  const [formErrors,  setFormErrors]  = useState({})
  const [saving,      setSaving]      = useState(false)
  const [submitMsg,   setSubmitMsg]   = useState('')

  const filtered = players.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.position.toLowerCase().includes(search.toLowerCase())
  )

  // ── Validation ──
  const validate = (f) => {
    const errs = {}
    if (!f.name.trim())        errs.name        = 'Full name is required'
    if (!f.number)             errs.number       = 'Jersey number is required'
    if (!f.nationalId.trim())  errs.nationalId   = 'National ID is required'
    if (!f.employeeId.trim())  errs.employeeId   = 'Employee ID is required'
    if (!f.institution.trim()) errs.institution  = 'Institution is required'
    return errs
  }

  // ── Open modals ──
  const openAdd = () => {
    setForm({ ...emptyForm, institution: session.institution })
    setFormErrors({})
    setSubmitMsg('')
    setModal('add')
  }

  const openEdit = (player) => {
    if (player.status === 'verified') return
    setSelected(player)
    setForm({
      name: player.name, position: player.position, number: player.number,
      age: player.age, institution: player.institution,
      nationalId: player.nationalId ?? '', employeeId: player.employeeId ?? '',
      photo: null, document: null,
    })
    setFormErrors({})
    setSubmitMsg('')
    setModal('edit')
  }

  const openDelete = (player) => {
    if (player.status === 'verified') return
    setSelected(player)
    setModal('delete')
  }

  // ── Form actions ──
  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setFormErrors(prev => ({ ...prev, [e.target.name]: '' }))
  }

  const handleFile = (field) => (e) => {
    const file = e.target.files[0]
    if (!file) return
    setForm(prev => ({ ...prev, [field]: file }))
  }

  const handleSave = async () => {
    const errs = validate(form)
    if (Object.keys(errs).length) { setFormErrors(errs); return }
    setSaving(true)
    // TODO Phase 2: upload photo/doc to Supabase Storage, then insert/update player row
    await new Promise(r => setTimeout(r, 1000))
    if (modal === 'add') {
      addPlayer({ ...form, number: Number(form.number), age: Number(form.age) })
      setSubmitMsg('Player added successfully. Pending admin verification.')
    } else {
      updatePlayer(selected.id, { ...form, number: Number(form.number), age: Number(form.age) })
      setSubmitMsg('Player updated successfully.')
    }
    setSaving(false)
    setTimeout(() => { setModal(null); setSubmitMsg('') }, 1200)
  }

  const handleDelete = async () => {
    setSaving(true)
    await new Promise(r => setTimeout(r, 600))
    deletePlayer(selected.id)
    setSaving(false)
    setModal(null)
  }

  const positionColors = {
    'Point Guard':    'bg-amber/15 text-amber border-amber/25',
    'Shooting Guard': 'bg-white/8 text-white/55 border-white/10',
    'Small Forward':  'bg-white/8 text-white/55 border-white/10',
    'Power Forward':  'bg-amber/10 text-amber/75 border-amber/15',
    'Center':         'bg-amber/20 text-amber border-amber/30',
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="text-xs font-bold tracking-[3px] uppercase text-amber/60 mb-1">
            {session.team}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl tracking-wide">PLAYER MANAGEMENT</h1>
          <p className="text-white/30 text-sm mt-1">
            Add, edit and submit players for league verification.
          </p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber text-pitch
                     font-bold text-sm hover:bg-amber-dark transition-all shadow-lg shadow-amber/20
                     flex-shrink-0">
          <HiPlus size={16} /> Add Player
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: 'Total', value: players.length },
          { label: 'Verified', value: players.filter(p => p.status === 'verified').length },
          { label: 'Pending', value: players.filter(p => p.status === 'pending').length },
        ].map(({ label, value }) => (
          <div key={label} className="bg-card border border-white/8 rounded-xl p-4 text-center">
            <div className="font-display text-3xl text-amber mb-0.5">{value}</div>
            <div className="text-white/30 text-xs font-medium">{label}</div>
          </div>
        ))}
      </div>

      {/* Notice */}
      <div className="flex items-start gap-3 bg-amber/5 border border-amber/15 rounded-xl
                      p-4 mb-6">
        <HiLockClosed className="text-amber/60 flex-shrink-0 mt-0.5" size={15} />
        <p className="text-white/40 text-xs leading-relaxed">
          <span className="text-amber/80 font-semibold">Verified players are locked.</span>{' '}
          Once a player is approved by the Super Admin, their record cannot be edited.
          Only the Super Admin can unlock a player for changes after verification.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" size={15} />
        <input type="text" placeholder="Search players by name or position..."
          value={search} onChange={e => setSearch(e.target.value)}
          className="w-full sm:w-72 bg-card border border-white/8 rounded-xl pl-9 pr-4
                     py-2.5 text-sm text-white placeholder-white/20 outline-none
                     focus:border-amber/40 transition-colors" />
      </div>

      {/* Players Table */}
      <div className="bg-card border border-white/8 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="border-b border-white/8 bg-pitch-light">
                {['#', 'Player', 'Position', 'Status', 'Documents', 'Actions'].map(h => (
                  <th key={h}
                    className={`py-3.5 text-[10px] font-bold tracking-[2px] uppercase
                                text-white/25 ${
                      h === 'Player' ? 'text-left px-4' :
                      h === '#'      ? 'text-left px-5' :
                                       'text-center px-3'}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="text-center py-10 text-white/20 text-sm">
                  No players found. <button onClick={openAdd} className="text-amber/60 hover:text-amber">
                    Add your first player →
                  </button>
                </td></tr>
              )}
              {filtered.map((player, i) => {
                const isLocked = player.status === 'verified'
                return (
                  <motion.tr key={player.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 * i }}
                    className="border-b border-white/5 hover:bg-white/2 transition-colors group">

                    {/* Number */}
                    <td className="px-5 py-3.5">
                      <span className="w-8 h-8 rounded-lg bg-amber/10 border border-amber/15
                                       flex items-center justify-center font-display text-amber text-sm">
                        {player.number}
                      </span>
                    </td>

                    {/* Name */}
                    <td className="px-4 py-3.5">
                      <div className="font-semibold text-white text-sm">{player.name}</div>
                      <div className="text-white/25 text-xs mt-0.5">{player.institution}</div>
                    </td>

                    {/* Position */}
                    <td className="text-center px-3 py-3.5">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border
                                        ${positionColors[player.position] ?? 'bg-white/5 text-white/40 border-white/8'}`}>
                        {player.position}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="text-center px-3 py-3.5">
                      <span className={`text-[10px] font-bold px-2.5 py-1.5 rounded-lg border
                                        flex items-center gap-1 justify-center ${
                        isLocked
                          ? 'bg-amber/10 text-amber border-amber/20'
                          : 'bg-white/5 text-white/35 border-white/8'
                      }`}>
                        {isLocked ? <><HiCheckCircle size={11} /> Verified</> : <>⏳ Pending</>}
                      </span>
                    </td>

                    {/* Documents */}
                    <td className="text-center px-3 py-3.5">
                      <div className="flex items-center justify-center gap-1.5">
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${
                          player.photo
                            ? 'bg-amber/10 text-amber border-amber/20'
                            : 'bg-white/3 text-white/20 border-white/5'
                        }`}>Photo</span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${
                          player.document
                            ? 'bg-amber/10 text-amber border-amber/20'
                            : 'bg-white/3 text-white/20 border-white/5'
                        }`}>ID</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="text-center px-3 py-3.5">
                      <div className="flex items-center justify-center gap-2">
                        {isLocked ? (
                          <div className="flex items-center gap-1 text-[10px] text-white/20">
                            <HiLockClosed size={11} /> Locked
                          </div>
                        ) : (
                          <>
                            <button onClick={() => openEdit(player)}
                              className="w-7 h-7 rounded-lg bg-white/5 hover:bg-amber/15
                                         hover:text-amber text-white/40 flex items-center
                                         justify-center transition-all">
                              <HiPencil size={13} />
                            </button>
                            <button onClick={() => openDelete(player)}
                              className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10
                                         text-white/40 hover:text-white/70 flex items-center
                                         justify-center transition-all">
                              <HiTrash size={13} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ══════════════════════════════════════ */}
      {/* ADD / EDIT MODAL                       */}
      {/* ══════════════════════════════════════ */}
      <AnimatePresence>
        {(modal === 'add' || modal === 'edit') && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-pitch/90 backdrop-blur-sm flex items-end
                       sm:items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.25 }}
              className="bg-card border border-white/10 rounded-2xl w-full max-w-lg
                         shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">

              {/* Modal header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
                <h3 className="font-display text-xl tracking-wide">
                  {modal === 'add' ? 'ADD NEW PLAYER' : 'EDIT PLAYER'}
                </h3>
                <button onClick={() => setModal(null)}
                  className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center
                             text-white/40 hover:text-white hover:bg-white/10 transition-all">
                  <HiX size={15} />
                </button>
              </div>

              {/* Modal body */}
              <div className="overflow-y-auto flex-1 px-6 py-5">
                {submitMsg ? (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center gap-3 py-8 text-center">
                    <HiCheckCircle className="text-amber" size={40} />
                    <p className="text-white/70 text-sm">{submitMsg}</p>
                  </motion.div>
                ) : (
                  <div className="flex flex-col gap-4">

                    {/* Name + Number */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="col-span-2 flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold tracking-wider uppercase text-white/35">
                          Full Name *
                        </label>
                        <input name="name" value={form.name} onChange={handleChange}
                          placeholder="e.g. Jean Claude Mugisha"
                          className={`bg-pitch-light border rounded-xl px-3.5 py-2.5 text-sm
                                      text-white placeholder-white/20 outline-none
                                      focus:border-amber/50 transition-colors ${
                            formErrors.name ? 'border-red-500/50' : 'border-white/8'
                          }`} />
                        {formErrors.name && (
                          <span className="text-[10px] text-red-400">{formErrors.name}</span>
                        )}
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold tracking-wider uppercase text-white/35">
                          Jersey # *
                        </label>
                        <input name="number" type="number" value={form.number}
                          onChange={handleChange} placeholder="0"
                          className={`bg-pitch-light border rounded-xl px-3.5 py-2.5 text-sm
                                      text-white placeholder-white/20 outline-none
                                      focus:border-amber/50 transition-colors ${
                            formErrors.number ? 'border-red-500/50' : 'border-white/8'
                          }`} />
                        {formErrors.number && (
                          <span className="text-[10px] text-red-400">{formErrors.number}</span>
                        )}
                      </div>
                    </div>

                    {/* Position + Age */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold tracking-wider uppercase text-white/35">
                          Position *
                        </label>
                        <select name="position" value={form.position} onChange={handleChange}
                          className="bg-pitch-light border border-white/8 rounded-xl px-3.5
                                     py-2.5 text-sm text-white outline-none focus:border-amber/50
                                     transition-colors cursor-pointer">
                          {POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold tracking-wider uppercase text-white/35">
                          Age
                        </label>
                        <input name="age" type="number" value={form.age}
                          onChange={handleChange} placeholder="e.g. 25"
                          className="bg-pitch-light border border-white/8 rounded-xl px-3.5
                                     py-2.5 text-sm text-white placeholder-white/20 outline-none
                                     focus:border-amber/50 transition-colors" />
                      </div>
                    </div>

                    {/* National ID */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold tracking-wider uppercase text-white/35">
                        National ID Number *
                      </label>
                      <input name="nationalId" value={form.nationalId} onChange={handleChange}
                        placeholder="16-digit national ID"
                        className={`bg-pitch-light border rounded-xl px-3.5 py-2.5 text-sm
                                    text-white placeholder-white/20 outline-none
                                    focus:border-amber/50 transition-colors font-mono ${
                          formErrors.nationalId ? 'border-red-500/50' : 'border-white/8'
                        }`} />
                      {formErrors.nationalId && (
                        <span className="text-[10px] text-red-400">{formErrors.nationalId}</span>
                      )}
                    </div>

                    {/* Employee ID */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold tracking-wider uppercase text-white/35">
                        Employee ID *
                      </label>
                      <input name="employeeId" value={form.employeeId} onChange={handleChange}
                        placeholder="Your institution employee ID"
                        className={`bg-pitch-light border rounded-xl px-3.5 py-2.5 text-sm
                                    text-white placeholder-white/20 outline-none
                                    focus:border-amber/50 transition-colors ${
                          formErrors.employeeId ? 'border-red-500/50' : 'border-white/8'
                        }`} />
                      {formErrors.employeeId && (
                        <span className="text-[10px] text-red-400">{formErrors.employeeId}</span>
                      )}
                    </div>

                    {/* Institution */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold tracking-wider uppercase text-white/35">
                        Institution *
                      </label>
                      <input name="institution" value={form.institution} onChange={handleChange}
                        placeholder="e.g. Bank of Kigali"
                        className={`bg-pitch-light border rounded-xl px-3.5 py-2.5 text-sm
                                    text-white placeholder-white/20 outline-none
                                    focus:border-amber/50 transition-colors ${
                          formErrors.institution ? 'border-red-500/50' : 'border-white/8'
                        }`} />
                      {formErrors.institution && (
                        <span className="text-[10px] text-red-400">{formErrors.institution}</span>
                      )}
                    </div>

                    {/* File uploads */}
                    <div className="grid grid-cols-2 gap-3">
                      {/* Photo */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold tracking-wider uppercase text-white/35">
                          Player Photo
                        </label>
                        <label className="flex flex-col items-center gap-2 p-3 bg-pitch-light
                                          border border-dashed border-white/15 rounded-xl
                                          cursor-pointer hover:border-amber/30 transition-colors
                                          group">
                          <HiUpload className="text-white/25 group-hover:text-amber/50
                                               transition-colors" size={18} />
                          <span className="text-[10px] text-white/25 text-center">
                            {form.photo ? form.photo.name : 'Upload photo\nJPEG/PNG max 2MB'}
                          </span>
                          <input type="file" accept="image/*" className="hidden"
                            onChange={handleFile('photo')} />
                        </label>
                      </div>
                      {/* Document */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold tracking-wider uppercase text-white/35">
                          ID / Proof Doc
                        </label>
                        <label className="flex flex-col items-center gap-2 p-3 bg-pitch-light
                                          border border-dashed border-white/15 rounded-xl
                                          cursor-pointer hover:border-amber/30 transition-colors
                                          group">
                          <HiUpload className="text-white/25 group-hover:text-amber/50
                                               transition-colors" size={18} />
                          <span className="text-[10px] text-white/25 text-center">
                            {form.document ? form.document.name : 'Upload PDF\nMax 5MB'}
                          </span>
                          <input type="file" accept=".pdf,image/*" className="hidden"
                            onChange={handleFile('document')} />
                        </label>
                      </div>
                    </div>

                    {/* Notice */}
                    <div className="flex items-start gap-2 bg-amber/5 border border-amber/10
                                    rounded-xl p-3 text-xs text-white/35 leading-relaxed">
                      <HiCheckCircle className="text-amber/40 flex-shrink-0 mt-0.5" size={13} />
                      Player will be submitted as <strong className="text-white/50">Pending</strong>.
                      Super Admin reviews and verifies eligibility before the player is approved.
                    </div>
                  </div>
                )}
              </div>

              {/* Modal footer */}
              {!submitMsg && (
                <div className="px-6 py-4 border-t border-white/8 flex gap-3">
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
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                      </svg> Saving...</>
                    ) : modal === 'add' ? 'Add Player' : 'Save Changes'}
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DELETE CONFIRM MODAL */}
      <AnimatePresence>
        {modal === 'delete' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-pitch/90 backdrop-blur-sm flex items-center
                       justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card border border-white/10 rounded-2xl w-full max-w-sm p-6 shadow-2xl">
              <h3 className="font-display text-xl tracking-wide mb-2">REMOVE PLAYER</h3>
              <p className="text-white/40 text-sm mb-6">
                Are you sure you want to remove{' '}
                <span className="text-white font-semibold">{selected?.name}</span> from your roster?
                This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setModal(null)}
                  className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/40
                             text-sm font-semibold hover:text-white hover:border-white/20 transition-all">
                  Cancel
                </button>
                <button onClick={handleDelete} disabled={saving}
                  className="flex-1 py-2.5 rounded-xl bg-white/10 text-white/70 text-sm font-bold
                             hover:bg-white/15 transition-all disabled:opacity-50
                             flex items-center justify-center gap-2">
                  {saving ? 'Removing...' : 'Yes, Remove'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}