import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiMail, HiArrowLeft } from 'react-icons/hi'
import { MdSportsSoccer } from 'react-icons/md'

export default function ForgotPasswordPage() {
  const [email,   setEmail]   = useState('')
  const [loading, setLoading] = useState(false)
  const [sent,    setSent]    = useState(false)
  const [error,   setError]   = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Enter a valid email address'); return
    }
    setError(''); setLoading(true)
    // TODO: supabase.auth.resetPasswordForEmail(email)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false); setSent(true)
  }

  return (
    <div className="min-h-screen bg-pitch flex items-center justify-center px-4">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80
                        bg-amber/5 rounded-full blur-3xl" />
      </div>

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md">

        <div className="text-center mb-8">
          <Link to="/" className="inline-flex flex-col items-center gap-3">
            <div className="w-14 h-14 bg-amber rounded-2xl flex items-center justify-center
                            shadow-xl shadow-amber/30">
              <MdSportsSoccer className="text-pitch text-3xl" />
            </div>
            <div className="font-display text-2xl tracking-widest text-amber">GAME ON RWANDA</div>
          </Link>
        </div>

        <div className="bg-card border border-white/8 rounded-2xl p-8 shadow-2xl">
          {!sent ? (
            <>
              <h2 className="font-display text-2xl tracking-wide mb-1">RESET PASSWORD</h2>
              <p className="text-white/35 text-sm mb-7">
                Enter your admin email and we'll send a reset link.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold tracking-wider uppercase text-white/40">
                    Email Address
                  </label>
                  <div className="relative">
                    <HiMail className="absolute left-3.5 top-1/2 -translate-y-1/2
                                       text-white/25" size={16} />
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                      placeholder="admin@institution.rw"
                      className="w-full bg-pitch-light border border-white/8 rounded-xl
                                 pl-10 pr-4 py-3 text-sm text-white placeholder-white/20
                                 outline-none focus:border-amber/50 transition-colors" />
                  </div>
                </div>
                {error && (
                  <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10
                                  text-white/50 text-sm">
                    <span className="text-amber">⚠</span> {error}
                  </div>
                )}
                <button type="submit" disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-amber text-pitch font-bold text-sm
                             hover:bg-amber-dark transition-all shadow-amber/25 shadow-lg
                             disabled:opacity-50 flex items-center justify-center gap-2">
                  {loading ? (
                    <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                    </svg> Sending...</>
                  ) : 'Send Reset Link'}
                </button>
              </form>
            </>
          ) : (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="text-center py-4">
              <div className="w-14 h-14 rounded-2xl bg-amber/15 border border-amber/25
                              flex items-center justify-center mx-auto mb-4">
                <HiMail className="text-amber" size={26} />
              </div>
              <h3 className="font-display text-xl tracking-wide mb-2">CHECK YOUR EMAIL</h3>
              <p className="text-white/40 text-sm leading-relaxed mb-6">
                A password reset link has been sent to <span className="text-amber">{email}</span>.
                Check your inbox and follow the instructions.
              </p>
              <button onClick={() => setSent(false)}
                className="text-amber/60 hover:text-amber text-sm transition-colors">
                Try a different email
              </button>
            </motion.div>
          )}

          <div className="mt-6 pt-5 border-t border-white/5">
            <Link to="/login"
              className="flex items-center justify-center gap-2 text-white/30
                         hover:text-amber/70 text-sm transition-colors">
              <HiArrowLeft size={14} /> Back to Login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}