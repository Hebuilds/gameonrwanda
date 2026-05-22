import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiCheckCircle, HiInformationCircle, HiExclamation } from 'react-icons/hi'

const INITIAL = [
  { id:1, type:'success', title:'Player Verified',
    message:'Jean Claude Mugisha has been verified by the Super Admin and is now eligible to play.',
    time:'2 hours ago', read: false },
  { id:2, type:'info',    title:'Fixtures Published',
    message:'Week 9 fixtures are live. BK vs EQUITY on May 18 at Kigali Arena at 15:00.',
    time:'5 hours ago', read: false },
  { id:3, type:'info',    title:'Season 2025 Underway',
    message:'The Corporate Basketball League 2025 season is active. Keep your roster updated.',
    time:'2 days ago', read: true },
  { id:4, type:'warning', title:'Pending Players',
    message:'2 players are still awaiting verification. Ensure all documents are uploaded.',
    time:'3 days ago', read: true },
  { id:5, type:'success', title:'Team Registered',
    message:'BK has been officially registered for the 2025 Corporate Basketball League.',
    time:'1 week ago', read: true },
]

const typeStyles = {
  success: { icon: HiCheckCircle,       color: 'text-amber',    bg: 'bg-amber/10', border: 'border-amber/15'  },
  info:    { icon: HiInformationCircle, color: 'text-white/45', bg: 'bg-white/5',  border: 'border-white/8'   },
  warning: { icon: HiExclamation,       color: 'text-amber/65', bg: 'bg-amber/8',  border: 'border-amber/12'  },
}

export default function NotificationsPage() {
  const [items, setItems] = useState(INITIAL)

  const markAllRead = () => setItems(prev => prev.map(n => ({ ...n, read: true })))
  const markRead    = id  => setItems(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  const unread      = items.filter(n => !n.read).length

  return (
    <div>
      <div className="flex items-start justify-between mb-7">
        <div>
          <div className="text-[10px] font-bold tracking-[3px] uppercase text-amber/50 mb-1">
            League Updates
          </div>
          <h1 className="font-display text-3xl sm:text-4xl tracking-wide">NOTIFICATIONS</h1>
          <p className="text-white/25 text-sm mt-1">
            {unread > 0 ? `${unread} unread` : 'All caught up'}
          </p>
        </div>
        {unread > 0 && (
          <button onClick={markAllRead}
            className="text-xs font-semibold text-amber/50 hover:text-amber transition-colors
                       px-4 py-2 rounded-xl border border-amber/15 hover:border-amber/30">
            Mark all read
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3 max-w-2xl">
        {items.map((n, i) => {
          const { icon: Icon, color, bg, border } = typeStyles[n.type]
          return (
            <motion.div key={n.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              onClick={() => markRead(n.id)}
              className={`bg-card border rounded-2xl p-5 cursor-pointer transition-all
                          hover:border-amber/20 ${
                n.read
                  ? 'border-white/5 opacity-55'
                  : `border-white/10 ${border}`
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center
                                 flex-shrink-0 mt-0.5`}>
                  <Icon className={color} size={17} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-semibold text-sm text-white">{n.title}</span>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-amber flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-white/40 text-sm leading-relaxed mb-2">{n.message}</p>
                  <span className="text-white/20 text-xs">{n.time}</span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}