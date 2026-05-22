import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiSearch, HiCheckCircle, HiXCircle, HiEye,
  HiLockClosed, HiX, HiFilter
} from 'react-icons/hi'
import { PLAYERS, TEAMS } from '../../constants/teams'

const STATUS_TABS = ['All', 'Pending', 'Verified', 'Rejected']

export default function PlayerVerification() {
  const [players,    setPlayers]    = useState(PLAYERS.map(p => ({ ...p })))
  const [search,     setSearch]     = useState('')
  const [tab,        setTab]        = useState('Pending')
  const [teamFilter, setTeamFilter] = useState('All Teams')
  const [modal,      setModal]      = useState(null) // { player, action: 'approve'|'reject'|'view' }
  const [rejectNote, setRejectNote] = useState('')
  const [saving,     setSaving]     = useState(false)

  const filtered = players.filter(p => {
    const matchTab    = tab === 'All' ||
      (tab === 'Pending'  && p.status === 'pending')  ||
      (tab === 'Verified' && p.status === 'verified') ||
      (tab === 'Rejected' && p.status === 'rejected')
    const matchTeam   = teamFilter === 'All Teams' || p.team === teamFilter
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                        p.team.toLowerCase().includes(search.toLowerCase())
    return matchTab && matchTeam && matchSearch
  })

  const counts = {
    All:      players.length,
    Pending:  players.filter(p => p.status === 'pending').length,
    Verified: players.filter(p => p.status === 'verified').length,
    Rejected: players.filter(p => p.status === 'rejected').length,
  }

  const handleApprove = async () => {
    setSaving(true)
    await new Promise(r => setTimeout(r, 700))
    setPlayers(prev => prev.map(p =>
      p.id === modal.player.id ? { ...p, status: 'verified', is_verified: true } : p
    ))
    setSaving(false)
    setModal(null)
  }

  const handleReject = async () => {
    if (!rejectNote.trim()) return
    setSaving(true)
    await new Promise(r => setTimeout(r, 700))
    setPlayers(prev => prev.map(p =>
      p.id === modal.player.id ? { ...p, status: 'rejected' } : p
    ))
    setSaving(false)
    setModal(null)
    setRejectNote('')
  }

  const handleUnlock = async (player) => {
    setSaving(true)
    await new Promise(r => setTimeout(r, 500))
    setPlayers(prev => prev.map(p =>
      p.id === player.id ? { ...p, status: 'pending', is_verified: false } : p
    ))
    setSaving(false)
  }

  const positionColors = {
    'Point Guard':    'bg-amber/15 text-amber',
    'Shooting Guard': 'bg-white/8 text-white/50',
    'Small Forward':  'bg-white/8 text-white/50',
    'Power Forward':  'bg-amber/10 text-amber/70',
    'Center':         'bg-amber/20 text-amber',
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
        <div>
          <div className="text-[10px] font-bold tracking-[3px] uppercase text-amber/50 mb-1">
            Player Registry
          </div>
          <h1 className="font-display text-3xl sm:text-4xl tracking-wide">PLAYER MANAGEMENT</h1>
          <p className="text-white/25 text-sm mt-1">
            Verify, approve, reject and manage all league players.
          </p>
        </div>
      </div>

      {/* Status tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        {STATUS_TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border
                        flex items-center gap-1.5 ${
              tab === t
                ? 'bg-amber text-pitch border-amber shadow-amber/20 shadow-lg'
                : 'bg-white/5 text-white/50 border-white/8 hover:border-amber/30 hover:text-white'
            }`}>
            {t}
            <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
              tab === t ? 'bg-pitch/20' : 'bg-white/10'
            }`}>{counts[t]}</span>
          </button>
        ))}
      </div>

      {/* Search + team filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative sm:w-72">
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" size={14} />
          <input type="text" placeholder="Search players..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full bg-card border border-white/8 rounded-xl pl-9 pr-4 py-2.5
                       text-sm text-white placeholder-white/15 outline-none
                       focus:border-amber/40 transition-colors" />
        </div>
        <select value={teamFilter} onChange={e => setTeamFilter(e.target.value)}
          className="bg-card border border-white/8 rounded-xl px-4 py-2.5 text-sm
                     text-white/60 outline-none focus:border-amber/40 cursor-pointer">
          <option>All Teams</option>
          {TEAMS.map(t => <option key={t.id}>{t.name}</option>)}
        </select>
        <div className="flex items-center gap-2 text-xs text-white/25 px-1">
          <HiFilter size={12} />
          <span>{filtered.length} player{filtered.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-white/8 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="border-b border-white/8 bg-pitch-light">
                {['#', 'Player', 'Team', 'Position', 'Status', 'Actions'].map(h => (
                  <th key={h}
                    className={`py-3.5 text-[10px] font-bold tracking-[2px] uppercase
                                text-white/25 ${
                      h === 'Player' || h === 'Team' ? 'text-left px-4' :
                      h === '#'                      ? 'text-left px-5' :
                                                       'text-center px-3'}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={6}
                  className="text-center py-12 text-white/20 text-sm">
                  No players found
                </td></tr>
              )}
              {filtered.map((player, i) => (
                <motion.tr key={player.id}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 0.03 * i }}
                  className="border-b border-white/5 hover:bg-white/2 transition-colors">

                  <td className="px-5 py-3.5">
                    <span className="w-8 h-8 rounded-lg bg-amber/10 border border-amber/15
                                     flex items-center justify-center font-display text-amber text-sm">
                      {player.number}
                    </span>
                  </td>

                  <td className="px-4 py-3.5">
                    <div className="font-semibold text-white text-sm">{player.name}</div>
                    <div className="text-white/25 text-xs">{player.institution}</div>
                  </td>

                  <td className="px-4 py-3.5 text-white/50 text-sm">{player.team}</td>

                  <td className="text-center px-3 py-3.5">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg
                                      ${positionColors[player.position] ?? 'bg-white/5 text-white/35'}`}>
                      {player.position}
                    </span>
                  </td>

                  <td className="text-center px-3 py-3.5">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${
                      player.status === 'verified'
                        ? 'bg-amber/10 text-amber border-amber/20'
                        : player.status === 'rejected'
                        ? 'bg-white/5 text-white/30 border-white/8'
                        : 'bg-white/8 text-white/50 border-white/10'
                    }`}>
                      {player.status === 'verified' ? '✓ Verified' :
                       player.status === 'rejected' ? '✗ Rejected' : '⏳ Pending'}
                    </span>
                  </td>

                  <td className="text-center px-3 py-3.5">
                    <div className="flex items-center justify-center gap-1.5">
                      {/* View */}
                      <button onClick={() => setModal({ player, action: 'view' })}
                        className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10
                                   text-white/40 hover:text-white flex items-center
                                   justify-center transition-all">
                        <HiEye size={12} />
                      </button>

                      {player.status === 'pending' && (
                        <>
                          <button onClick={() => setModal({ player, action: 'approve' })}
                            className="w-7 h-7 rounded-lg bg-amber/10 hover:bg-amber
                                       text-amber hover:text-pitch flex items-center
                                       justify-center transition-all">
                            <HiCheckCircle size={12} />
                          </button>
                          <button onClick={() => setModal({ player, action: 'reject' })}
                            className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10
                                       text-white/40 hover:text-white flex items-center
                                       justify-center transition-all">
                            <HiXCircle size={12} />
                          </button>
                        </>
                      )}

                      {player.status === 'verified' && (
                        <button onClick={() => handleUnlock(player)} disabled={saving}
                          title="Unlock player for editing"
                          className="w-7 h-7 rounded-lg bg-white/5 hover:bg-amber/15
                                     text-white/25 hover:text-amber flex items-center
                                     justify-center transition-all disabled:opacity-40">
                          <HiLockClosed size={11} />
                        </button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Modals ── */}
      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-pitch/90 backdrop-blur-sm flex items-center
                       justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-card border border-white/10 rounded-2xl w-full max-w-md
                         shadow-2xl overflow-hidden">

              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
                <h3 className="font-display text-xl tracking-wide">
                  {modal.action === 'approve' ? 'APPROVE PLAYER' :
                   modal.action === 'reject'  ? 'REJECT PLAYER' : 'PLAYER DETAILS'}
                </h3>
                <button onClick={() => { setModal(null); setRejectNote('') }}
                  className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center
                             text-white/40 hover:text-white hover:bg-white/10 transition-all">
                  <HiX size={14} />
                </button>
              </div>

              <div className="px-6 py-5">
                {/* Player info card */}
                <div className="bg-pitch-light rounded-xl p-4 mb-5 border border-white/5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-amber/15 border border-amber/20
                                    flex items-center justify-center">
                      <span className="font-display text-xl text-amber">
                        {modal.player.number}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-white">{modal.player.name}</div>
                      <div className="text-white/30 text-xs">{modal.player.position}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: 'Team',        value: modal.player.team        },
                      { label: 'Institution', value: modal.player.institution },
                      { label: 'Jersey #',    value: `#${modal.player.number}` },
                      { label: 'Status',      value: modal.player.status      },
                    ].map(({ label, value }) => (
                      <div key={label} className="bg-pitch rounded-lg p-2">
                        <div className="text-white/25 text-[10px] mb-0.5">{label}</div>
                        <div className="text-white text-xs font-semibold capitalize">{value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Doc status */}
                  <div className="mt-3 flex gap-2">
                    {['Photo', 'Employee ID', 'Employment Proof'].map(doc => (
                      <span key={doc}
                        className="text-[9px] font-bold px-2 py-1 rounded bg-white/5
                                   border border-white/8 text-white/25">
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Approve */}
                {modal.action === 'approve' && (
                  <div>
                    <div className="flex items-start gap-2 bg-amber/6 border border-amber/12
                                    rounded-xl p-3 mb-5 text-xs text-white/40 leading-relaxed">
                      <HiCheckCircle className="text-amber/50 flex-shrink-0 mt-0.5" size={13} />
                      Approving this player marks them as <strong className="text-white/60">Verified</strong>.
                      Their record will be locked for the team admin.
                      Only you can unlock it later.
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => setModal(null)}
                        className="flex-1 py-2.5 rounded-xl border border-white/10
                                   text-white/40 text-sm font-semibold hover:text-white
                                   hover:border-white/20 transition-all">
                        Cancel
                      </button>
                      <button onClick={handleApprove} disabled={saving}
                        className="flex-1 py-2.5 rounded-xl bg-amber text-pitch text-sm
                                   font-bold hover:bg-amber-dark transition-all
                                   shadow-amber/20 shadow-lg disabled:opacity-50
                                   flex items-center justify-center gap-2">
                        {saving ? (
                          <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                          </svg> Approving...</>
                        ) : <><HiCheckCircle size={14} /> Approve Player</>}
                      </button>
                    </div>
                  </div>
                )}

                {/* Reject */}
                {modal.action === 'reject' && (
                  <div>
                    <div className="flex flex-col gap-1.5 mb-4">
                      <label className="text-[10px] font-bold tracking-wider uppercase text-white/30">
                        Rejection Reason *
                      </label>
                      <textarea value={rejectNote}
                        onChange={e => setRejectNote(e.target.value)}
                        placeholder="e.g. Employee ID does not match records, photo unclear..."
                        rows={3}
                        className="w-full bg-pitch-light border border-white/8 rounded-xl
                                   px-4 py-3 text-sm text-white placeholder-white/15
                                   outline-none focus:border-amber/40 transition-colors resize-none" />
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => { setModal(null); setRejectNote('') }}
                        className="flex-1 py-2.5 rounded-xl border border-white/10
                                   text-white/40 text-sm font-semibold hover:text-white
                                   hover:border-white/20 transition-all">
                        Cancel
                      </button>
                      <button onClick={handleReject}
                        disabled={saving || !rejectNote.trim()}
                        className="flex-1 py-2.5 rounded-xl bg-white/10 text-white/70
                                   text-sm font-bold hover:bg-white/15 transition-all
                                   disabled:opacity-40 flex items-center justify-center gap-2">
                        {saving ? 'Rejecting...' : <><HiXCircle size={14} /> Reject</>}
                      </button>
                    </div>
                  </div>
                )}

                {/* View only */}
                {modal.action === 'view' && (
                  <button onClick={() => setModal(null)}
                    className="w-full py-2.5 rounded-xl bg-amber text-pitch text-sm
                               font-bold hover:bg-amber-dark transition-all">
                    Close
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}