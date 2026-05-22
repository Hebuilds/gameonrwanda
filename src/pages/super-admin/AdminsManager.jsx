import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiPlus, HiPencil, HiLockClosed, HiX,
  HiEye, HiEyeOff, HiCheckCircle, HiSearch
} from 'react-icons/hi'
import { BsShieldFill } from 'react-icons/bs'
import { TEAMS } from '../../constants/teams'

const INITIAL_ADMINS = TEAMS.map((t, i) => ({
  id: t.id,
  name: `${t.name} Admin`,
  email: `admin@${t.slug}.rw`,
  team: t.name,
  institution: t.institution,
  is_active: true,
  created: '2025-01-15',
  lastLogin: i < 3 ? '2 days ago' : i < 5 ? '1 week ago' : 'Never',
}))

const emptyForm = { name: '', email: '', team: '', tempPassword: '', institution: '' }

export default function AdminsManager() {
  const [admins,    setAdmins]    = useState(INITIAL_ADMINS)
  const [search,    setSearch]    = useState('')
  const [modal,     setModal]     = useState(null) // 'create' | 'edit' | 'reset'
  const [selected,  setSelected]  = useState(null)
  const [form,      setForm]      = useState(emptyForm)
  const [showPass,  setShowPass]  = useState(false)
  const [saving,    setSaving]    = useState(false)
  const [errors,    setErrors]    = useState({})
  const [success,   setSuccess]   = useState('')

  const filtered = admins.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.team.toLowerCase().includes(search.toLowerCase()) ||
    a.email.toLowerCase().includes(search.toLowerCase())
  )

  const validate = () => {
    const errs = {}
    if (!form.name.trim())  errs.name  = 'Name required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Valid email required'
    if (!form.team)         errs.team  = 'Assign a team'
    if (modal === 'create' && form.tempPassword.length < 8) errs.tempPassword = 'Min 8 characters'
    return errs
  }

  const handleSave = async () => {
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSaving(true)
    await new Promise(r => setTimeout(r, 800))
    if (modal === 'create') {
      const team = TEAMS.find(t => t.name === form.team)
      setAdmins(prev => [...prev, {
        id: Date.now(), ...form,
        institution: team?.institution ?? '',
        is_active: true, created: new Date().toISOString().split('T')[0],
        lastLogin: 'Never',
      }])
      setSuccess('Team Admin created successfully.')
    } else {
      setAdmins(prev => prev.map(a =>
        a.id === selected.id ? { ...a, ...form } : a
      ))
      setSuccess('Admin updated.')
    }
    setSaving(false)
    setTimeout(() => { setModal(null); setSuccess(''); setErrors({}) }, 1200)
  }

  const toggleSuspend = async (admin) => {
    setSaving(true)
    await new Promise(r => setTimeout(r, 400))
    setAdmins(prev => prev.map(a =>
      a.id === admin.id ? { ...a, is_active: !a.is_active } : a
    ))
    setSaving(false)
  }

  const openCreate = () => {
    setForm(emptyForm)
    setErrors({})
    setSuccess('')
    setShowPass(false)
    setModal('create')
  }

  const openEdit = (admin) => {
    setSelected(admin)
    setForm({ name: admin.name, email: admin.email, team: admin.team,
              institution: admin.institution, tempPassword: '' })
    setErrors({})
    setSuccess('')
    setModal('edit')
  }

  const handleChange = e => {
    const { name, value } = e.target
    setForm(p => ({ ...p, [name]: value }))
    setErrors(p => ({ ...p, [name]: '' }))
    if (name === 'team') {
      const team = TEAMS.find(t => t.name === value)
      setForm(p => ({ ...p, team: value, institution: team?.institution ?? '' }))
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
        <div>
          <div className="text-[10px] font-bold tracking-[3px] uppercase text-amber/50 mb-1">
            Access Control
          </div>
          <h1 className="font-display text-3xl sm:text-4xl tracking-wide">TEAM ADMINS</h1>
          <p className="text-white/25 text-sm mt-1">
            Create and manage team admin accounts. Only you can create admins.
          </p>
        </div>
        <button onClick={openCreate}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber text-pitch
                     font-bold text-sm hover:bg-amber-dark transition-all shadow-amber/20
                     shadow-lg flex-shrink-0">
          <HiPlus size={16} /> Create Admin
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: 'Total Admins',  value: admins.length                         },
          { label: 'Active',        value: admins.filter(a => a.is_active).length },
          { label: 'Suspended',     value: admins.filter(a => !a.is_active).length },
        ].map(({ label, value }) => (
          <div key={label} className="bg-card border border-white/8 rounded-xl p-4 text-center">
            <div className="font-display text-3xl text-amber mb-0.5">{value}</div>
            <div className="text-white/25 text-xs font-medium">{label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-5 sm:w-72">
        <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" size={14} />
        <input type="text" placeholder="Search admins..."
          value={search} onChange={e => setSearch(e.target.value)}
          className="w-full bg-card border border-white/8 rounded-xl pl-9 pr-4 py-2.5
                     text-sm text-white placeholder-white/15 outline-none
                     focus:border-amber/40 transition-colors" />
      </div>

      {/* Table */}
      <div className="bg-card border border-white/8 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="border-b border-white/8 bg-pitch-light">
                {['Admin', 'Team', 'Last Login', 'Status', 'Actions'].map(h => (
                  <th key={h}
                    className={`py-3.5 text-[10px] font-bold tracking-[2px] uppercase
                                text-white/25 ${
                      h === 'Admin' || h === 'Team' ? 'text-left px-4' : 'text-center px-3'}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((admin, i) => (
                <motion.tr key={admin.id}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 0.03 * i }}
                  className="border-b border-white/5 hover:bg-white/2 transition-colors">

                  <td className="px-4 py-3.5">
                    <div className="font-semibold text-white text-sm">{admin.name}</div>
                    <div className="text-white/25 text-xs">{admin.email}</div>
                  </td>

                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-amber/15 flex items-center
                                      justify-center text-amber font-display text-xs">
                        {admin.team.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{admin.team}</div>
                        <div className="text-white/25 text-xs truncate max-w-[100px]">
                          {admin.institution}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="text-center px-3 py-3.5 text-white/30 text-xs">
                    {admin.lastLogin}
                  </td>

                  <td className="text-center px-3 py-3.5">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${
                      admin.is_active
                        ? 'bg-amber/10 text-amber border-amber/20'
                        : 'bg-white/5 text-white/25 border-white/8'
                    }`}>
                      {admin.is_active ? 'Active' : 'Suspended'}
                    </span>
                  </td>

                  <td className="text-center px-3 py-3.5">
                    <div className="flex items-center justify-center gap-1.5">
                      <button onClick={() => openEdit(admin)}
                        className="w-7 h-7 rounded-lg bg-white/5 hover:bg-amber/15
                                   text-white/40 hover:text-amber flex items-center
                                   justify-center transition-all">
                        <HiPencil size={12} />
                      </button>
                      <button onClick={() => toggleSuspend(admin)} disabled={saving}
                        className={`w-7 h-7 rounded-lg flex items-center justify-center
                                    transition-all disabled:opacity-40 ${
                          admin.is_active
                            ? 'bg-white/5 hover:bg-white/10 text-white/40 hover:text-white'
                            : 'bg-amber/10 hover:bg-amber text-amber hover:text-pitch'
                        }`}>
                        <HiLockClosed size={11} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal */}
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
                  {modal === 'create' ? 'CREATE TEAM ADMIN' : 'EDIT ADMIN'}
                </h3>
                <button onClick={() => setModal(null)}
                  className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center
                             text-white/40 hover:text-white hover:bg-white/10 transition-all">
                  <HiX size={14} />
                </button>
              </div>

              <div className="px-6 py-5 flex flex-col gap-4">
                {success && (
                  <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl bg-amber/10
                               border border-amber/20 text-amber text-sm">
                    <HiCheckCircle size={15} /> {success}
                  </motion.div>
                )}

                {[
                  { name: 'name',  label: 'Full Name *',     type: 'text',  placeholder: 'e.g. BK Team Manager' },
                  { name: 'email', label: 'Email Address *', type: 'email', placeholder: 'admin@institution.rw' },
                ].map(field => (
                  <div key={field.name} className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold tracking-wider uppercase text-white/30">
                      {field.label}
                    </label>
                    <input type={field.type} name={field.name} value={form[field.name]}
                      onChange={handleChange} placeholder={field.placeholder}
                      className={`bg-pitch-light border rounded-xl px-4 py-2.5 text-sm
                                  text-white placeholder-white/15 outline-none
                                  focus:border-amber/40 transition-colors ${
                        errors[field.name] ? 'border-red-500/40' : 'border-white/8'
                      }`} />
                    {errors[field.name] && (
                      <span className="text-[10px] text-red-400">{errors[field.name]}</span>
                    )}
                  </div>
                ))}

                {/* Team assignment */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold tracking-wider uppercase text-white/30">
                    Assign Team *
                  </label>
                  <select name="team" value={form.team} onChange={handleChange}
                    className={`bg-pitch-light border rounded-xl px-4 py-2.5 text-sm
                                text-white outline-none focus:border-amber/40
                                transition-colors cursor-pointer ${
                      errors.team ? 'border-red-500/40' : 'border-white/8'
                    }`}>
                    <option value="">Select team...</option>
                    {TEAMS.map(t => <option key={t.id} value={t.name}>{t.name} — {t.institution}</option>)}
                  </select>
                  {errors.team && (
                    <span className="text-[10px] text-red-400">{errors.team}</span>
                  )}
                </div>

                {/* Temp password — create only */}
                {modal === 'create' && (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold tracking-wider uppercase text-white/30">
                      Temporary Password *
                    </label>
                    <div className="relative">
                      <input type={showPass ? 'text' : 'password'}
                        name="tempPassword" value={form.tempPassword}
                        onChange={handleChange} placeholder="Min 8 characters"
                        className={`w-full bg-pitch-light border rounded-xl pl-4 pr-10 py-2.5
                                    text-sm text-white placeholder-white/15 outline-none
                                    focus:border-amber/40 transition-colors ${
                          errors.tempPassword ? 'border-red-500/40' : 'border-white/8'
                        }`} />
                      <button type="button" onClick={() => setShowPass(!showPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2
                                   text-white/25 hover:text-white/50 transition-colors">
                        {showPass ? <HiEyeOff size={14} /> : <HiEye size={14} />}
                      </button>
                    </div>
                    {errors.tempPassword && (
                      <span className="text-[10px] text-red-400">{errors.tempPassword}</span>
                    )}
                    <p className="text-[10px] text-white/20">
                      Share this password securely with the admin. They cannot change it — only you can reset it.
                    </p>
                  </div>
                )}

                <div className="flex items-start gap-2 bg-amber/5 border border-amber/10
                                rounded-xl p-3">
                  <BsShieldFill className="text-amber/40 flex-shrink-0 mt-0.5" size={11} />
                  <p className="text-white/30 text-xs leading-relaxed">
                    This admin will only have access to manage their assigned team.
                    They cannot see other teams' data.
                  </p>
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
                  {saving ? 'Saving...' : modal === 'create' ? 'Create Admin' : 'Save Changes'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}