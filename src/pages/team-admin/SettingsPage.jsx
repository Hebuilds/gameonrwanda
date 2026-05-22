import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useOutletContext } from 'react-router-dom'
import { HiLockClosed, HiMail, HiCheckCircle, HiInformationCircle } from 'react-icons/hi'
import { BsShieldFill } from 'react-icons/bs'

export default function SettingsPage() {
  const { session } = useOutletContext()
  const [message,  setMessage]  = useState('')
  const [sending,  setSending]  = useState(false)
  const [sent,     setSent]     = useState(false)

  const handleRequest = async e => {
    e.preventDefault()
    if (!message.trim()) return
    setSending(true)
    // TODO Phase 2: send notification/email to super admin via Supabase
    await new Promise(r => setTimeout(r, 1000))
    setSending(false)
    setSent(true)
    setMessage('')
    setTimeout(() => setSent(false), 5000)
  }

  return (
    <div>
      <div className="mb-7">
        <div className="text-[10px] font-bold tracking-[3px] uppercase text-amber/50 mb-1">
          Account
        </div>
        <h1 className="font-display text-3xl sm:text-4xl tracking-wide">SETTINGS</h1>
        <p className="text-white/25 text-sm mt-1">Your account information and access management.</p>
      </div>

      <div className="max-w-xl flex flex-col gap-5">

        {/* Profile info — read only */}
        <div className="bg-card border border-white/8 rounded-2xl p-6">
          <div className="flex items-center gap-2.5 mb-5">
            <BsShieldFill className="text-amber" size={14} />
            <h3 className="font-display text-lg tracking-wide">ACCOUNT INFO</h3>
          </div>
          <div className="flex flex-col divide-y divide-white/5">
            {[
              { label: 'Full Name',   value: session.name        },
              { label: 'Email',       value: session.email       },
              { label: 'Team',        value: session.team        },
              { label: 'Institution', value: session.institution },
              { label: 'Role',        value: 'Team Admin'        },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between py-3">
                <span className="text-white/30 text-xs font-medium">{label}</span>
                <span className="text-white text-sm font-semibold">{value}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-start gap-2 bg-white/3 rounded-xl p-3
                          border border-white/5">
            <HiInformationCircle className="text-white/25 flex-shrink-0 mt-0.5" size={14} />
            <p className="text-white/25 text-xs leading-relaxed">
              Account details can only be updated by the Super Admin.
              Contact them if any information is incorrect.
            </p>
          </div>
        </div>

        {/* Password request */}
        <div className="bg-card border border-white/8 rounded-2xl p-6">
          <div className="flex items-center gap-2.5 mb-2">
            <HiLockClosed className="text-amber" size={14} />
            <h3 className="font-display text-lg tracking-wide">PASSWORD RESET REQUEST</h3>
          </div>
          <p className="text-white/30 text-xs leading-relaxed mb-5">
            To change your password, send a request to the Super Admin.
            They will reset it and provide you with new credentials.
          </p>

          <AnimatePresence>
            {sent && (
              <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-amber/10
                           border border-amber/20 text-amber text-sm mb-4">
                <HiCheckCircle size={15} />
                Request sent! The Super Admin will contact you shortly.
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleRequest} className="flex flex-col gap-4" noValidate>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold tracking-wider uppercase text-white/30">
                Message to Super Admin (optional)
              </label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="e.g. Please reset my password, I've forgotten it."
                rows={3}
                className="w-full bg-pitch-light border border-white/8 rounded-xl px-4 py-3
                           text-sm text-white placeholder-white/15 outline-none
                           focus:border-amber/40 transition-colors resize-none"
              />
            </div>

            {/* Pre-filled info */}
            <div className="bg-pitch-light border border-white/5 rounded-xl p-3">
              <div className="text-[10px] font-bold tracking-wider uppercase text-white/20 mb-2">
                Request will include
              </div>
              <div className="flex flex-col gap-1">
                {[
                  { label: 'From', value: session.name  },
                  { label: 'Email', value: session.email },
                  { label: 'Team',  value: session.team  },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center gap-2 text-xs">
                    <span className="text-white/25 w-10">{label}:</span>
                    <span className="text-white/50">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" disabled={sending}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl
                         bg-amber text-pitch font-bold text-sm hover:bg-amber-dark
                         transition-all shadow-amber/20 shadow-lg disabled:opacity-50">
              {sending ? (
                <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                </svg> Sending...</>
              ) : (
                <><HiMail size={15} /> Send Reset Request</>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}