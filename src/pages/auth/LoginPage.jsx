import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMail, HiLockClosed, HiEye, HiEyeOff } from 'react-icons/hi'
import { GiBasketballBall } from 'react-icons/gi'
import { BsShieldFill, BsPeopleFill } from 'react-icons/bs'

const ROLES = [
  { key: 'team',  label: 'Team Admin',  icon: BsPeopleFill,  desc: 'Manage your institution\'s team & players' },
  { key: 'super', label: 'Super Admin', icon: BsShieldFill,  desc: 'Full platform control & oversight' },
]

export default function LoginPage() {
  const [role,     setRole]     = useState('team')
  const [form,     setForm]     = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const validate = () => {
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) return 'Enter a valid email address'
    if (!form.password || form.password.length < 6)       return 'Password must be at least 6 characters'
    return ''
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const err = validate()
    if (err) { setError(err); return }
    setError('')
    setLoading(true)
    // TODO Phase 2: supabase.auth.signInWithPassword({ email, password })
    // then fetch users.role and validate it matches selected role
    await new Promise(r => setTimeout(r, 1400))
    setLoading(false)
    setError('Backend not connected yet — coming in Phase 2.')
  }

  return (
    <div className="min-h-screen bg-pitch flex items-center justify-center px-4 py-16">

      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px]
                        bg-amber/5 rounded-full blur-3xl" />
      </div>

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex flex-col items-center gap-3 group">
            <div className="w-14 h-14 bg-amber rounded-2xl flex items-center justify-center
                            shadow-xl shadow-amber/30 group-hover:scale-105 transition-transform">
              <GiBasketballBall className="text-pitch text-3xl" />
            </div>
            <div>
              <div className="font-display text-2xl tracking-widest text-amber leading-none">
                GAME ON RWANDA
              </div>
              <div className="text-white/25 text-xs tracking-[3px] mt-1 uppercase">Admin Portal</div>
            </div>
          </Link>
        </div>

        {/* Role Selector */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          {ROLES.map(r => {
            const Icon = r.icon
            return (
              <button key={r.key} onClick={() => { setRole(r.key); setError('') }}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border
                            transition-all text-left ${
                  role === r.key
                    ? 'bg-amber/10 border-amber/40 shadow-lg shadow-amber/10'
                    : 'bg-card border-white/8 hover:border-amber/20'
                }`}>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  role === r.key ? 'bg-amber text-pitch' : 'bg-white/5 text-white/40'
                }`}>
                  <Icon size={16} />
                </div>
                <div>
                  <div className={`text-xs font-bold ${role === r.key ? 'text-amber' : 'text-white/60'}`}>
                    {r.label}
                  </div>
                  <div className="text-white/25 text-[10px] leading-tight mt-0.5">{r.desc}</div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Card */}
        <div className="bg-card border border-white/8 rounded-2xl p-8 shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div key={role}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
              <h2 className="font-display text-2xl tracking-wide mb-1">
                {role === 'super' ? 'SUPER ADMIN' : 'TEAM ADMIN'} LOGIN
              </h2>
              <p className="text-white/30 text-sm mb-7">
                {role === 'super'
                  ? 'Access the full league management control panel.'
                  : 'Access your institution\'s team management dashboard.'}
              </p>
            </motion.div>
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold tracking-wider uppercase text-white/35">
                Email Address
              </label>
              <div className="relative">
                <HiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" size={16} />
                <input type="email" name="email" value={form.email}
                  onChange={handleChange}
                  placeholder={role === 'super' ? 'superadmin@gorleague.rw' : 'admin@institution.rw'}
                  className="w-full bg-pitch-light border border-white/8 rounded-xl pl-10 pr-4
                             py-3 text-sm text-white placeholder-white/15 outline-none
                             focus:border-amber/50 transition-colors" />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold tracking-wider uppercase text-white/35">
                  Password
                </label>
                <Link to="/forgot-password"
                  className="text-xs text-amber/60 hover:text-amber transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <HiLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2
                                         text-white/25" size={16} />
                <input type={showPass ? 'text' : 'password'}
                  name="password" value={form.password}
                  onChange={handleChange} placeholder="Enter your password"
                  className="w-full bg-pitch-light border border-white/8 rounded-xl pl-10 pr-11
                             py-3 text-sm text-white placeholder-white/15 outline-none
                             focus:border-amber/50 transition-colors" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2
                             text-white/25 hover:text-white/60 transition-colors">
                  {showPass ? <HiEyeOff size={16} /> : <HiEye size={16} />}
                </button>
              </div>
            </div>

            {/* Role indicator */}
            <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs
                             font-medium ${
              role === 'super'
                ? 'bg-amber/8 border-amber/20 text-amber/70'
                : 'bg-white/4 border-white/8 text-white/35'
            }`}>
              {role === 'super' ? <BsShieldFill size={12} /> : <BsPeopleFill size={12} />}
              Signing in as: <span className="font-bold">
                {role === 'super' ? 'Super Admin' : 'Team Admin'}
              </span>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/4
                             border border-white/8 text-white/45 text-sm">
                  <span className="text-amber flex-shrink-0">⚠</span> {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <button type="submit" disabled={loading}
              className="w-full py-3.5 rounded-xl bg-amber text-pitch font-bold text-sm
                         hover:bg-amber-dark transition-all shadow-lg shadow-amber/25
                         disabled:opacity-50 disabled:cursor-not-allowed
                         flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10"
                      stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  Signing In...
                </>
              ) : `Sign In as ${role === 'super' ? 'Super Admin' : 'Team Admin'}`}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-white/5 text-center">
            <p className="text-white/20 text-xs">
              No access yet?{' '}
              <Link to="/contact" className="text-amber/60 hover:text-amber transition-colors">
                Contact the League Administrator
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center mt-5">
          <Link to="/" className="text-white/20 text-xs hover:text-amber/50 transition-colors">
            ← Return to public site
          </Link>
        </div>
      </motion.div>
    </div>
  )
}