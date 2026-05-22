import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiSearch, HiFilter } from 'react-icons/hi'
import { BsShieldFill } from 'react-icons/bs'

const LOGS = [
  { id:1,  user:'Super Admin', action:'Player Verified',    table:'players',  detail:'Jean Claude Mugisha — BK',           time:'2025-05-18 14:32',  type:'success' },
  { id:2,  user:'Super Admin', action:'Fixture Created',    table:'fixtures', detail:'BK vs EQUITY — Week 9',              time:'2025-05-18 13:10',  type:'info'    },
  { id:3,  user:'Super Admin', action:'Player Rejected',    table:'players',  detail:'Frank Ntwali — RWANDAIR (doc issue)',time:'2025-05-18 11:45',  type:'warning' },
  { id:4,  user:'Super Admin', action:'Admin Created',      table:'users',    detail:'New admin for CCI Rwanda',           time:'2025-05-18 10:20',  type:'info'    },
  { id:5,  user:'Super Admin', action:'Result Recorded',    table:'fixtures', detail:'BK 82–71 GASABO 3D',                 time:'2025-05-17 18:00',  type:'success' },
  { id:6,  user:'Super Admin', action:'News Published',     table:'news',     detail:'Season 2025 Registration Open',      time:'2025-05-17 09:30',  type:'info'    },
  { id:7,  user:'Super Admin', action:'Admin Suspended',    table:'users',    detail:'REG admin account suspended',         time:'2025-05-16 15:45',  type:'warning' },
  { id:8,  user:'Super Admin', action:'Player Unlocked',    table:'players',  detail:'David Uwimana — BK (resubmit docs)', time:'2025-05-16 11:00',  type:'info'    },
  { id:9,  user:'Super Admin', action:'Fixture Edited',     table:'fixtures', detail:'Week 8: RWANDAIR vs REG rescheduled',time:'2025-05-15 14:20',  type:'info'    },
  { id:10, user:'Super Admin', action:'Gallery Published',  table:'gallery',  detail:'Week 8 match photos uploaded',       time:'2025-05-15 09:00',  type:'success' },
]

const ACTION_TYPES = ['All Actions', 'Player Verified', 'Player Rejected', 'Fixture Created', 'Result Recorded', 'Admin Created', 'News Published']

const typeColors = {
  success: 'bg-amber/10 text-amber border-amber/15',
  info:    'bg-white/5 text-white/40 border-white/8',
  warning: 'bg-white/8 text-white/50 border-white/10',
}

const typeDot = {
  success: 'bg-amber',
  info:    'bg-white/30',
  warning: 'bg-white/40',
}

export default function AuditLogs() {
  const [search,  setSearch]  = useState('')
  const [filter,  setFilter]  = useState('All Actions')

  const filtered = LOGS.filter(log => {
    const matchFilter = filter === 'All Actions' || log.action === filter
    const matchSearch = log.detail.toLowerCase().includes(search.toLowerCase()) ||
                        log.action.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  return (
    <div>
      <div className="mb-7">
        <div className="text-[10px] font-bold tracking-[3px] uppercase text-amber/50 mb-1">
          System
        </div>
        <h1 className="font-display text-3xl sm:text-4xl tracking-wide">AUDIT LOGS</h1>
        <p className="text-white/25 text-sm mt-1">
          Immutable history of all Super Admin actions. Cannot be edited or deleted.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total Actions',   value: LOGS.length },
          { label: 'Player Actions',  value: LOGS.filter(l => l.table === 'players').length  },
          { label: 'Fixture Actions', value: LOGS.filter(l => l.table === 'fixtures').length },
          { label: 'Admin Actions',   value: LOGS.filter(l => l.table === 'users').length    },
        ].map(({ label, value }) => (
          <div key={label} className="bg-card border border-white/8 rounded-xl p-4 text-center">
            <div className="font-display text-3xl text-amber mb-0.5">{value}</div>
            <div className="text-white/25 text-xs font-medium">{label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative sm:w-72">
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" size={14} />
          <input type="text" placeholder="Search logs..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full bg-card border border-white/8 rounded-xl pl-9 pr-4 py-2.5
                       text-sm text-white placeholder-white/15 outline-none
                       focus:border-amber/40 transition-colors" />
        </div>
        <select value={filter} onChange={e => setFilter(e.target.value)}
          className="bg-card border border-white/8 rounded-xl px-4 py-2.5 text-sm
                     text-white/60 outline-none focus:border-amber/40 cursor-pointer">
          {ACTION_TYPES.map(t => <option key={t}>{t}</option>)}
        </select>
        <div className="flex items-center gap-2 text-xs text-white/25 px-1">
          <HiFilter size={12} />
          <span>{filtered.length} log{filtered.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Log table */}
      <div className="bg-card border border-white/8 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="border-b border-white/8 bg-pitch-light">
                {['Time', 'Action', 'Detail', 'Table', 'Type'].map(h => (
                  <th key={h}
                    className={`py-3.5 text-[10px] font-bold tracking-[2px] uppercase
                                text-white/25 ${
                      h === 'Action' || h === 'Detail' ? 'text-left px-4' :
                      h === 'Time'                     ? 'text-left px-5' :
                                                         'text-center px-3'}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="text-center py-12 text-white/20 text-sm">
                  No logs found
                </td></tr>
              )}
              {filtered.map((log, i) => (
                <motion.tr key={log.id}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 0.03 * i }}
                  className="border-b border-white/5 hover:bg-white/2 transition-colors">

                  <td className="px-5 py-3.5 text-white/30 text-xs font-mono whitespace-nowrap">
                    {log.time}
                  </td>

                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${typeDot[log.type]}`} />
                      <span className="font-semibold text-white text-sm">{log.action}</span>
                    </div>
                  </td>

                  <td className="px-4 py-3.5 text-white/40 text-sm max-w-[220px] truncate">
                    {log.detail}
                  </td>

                  <td className="text-center px-3 py-3.5">
                    <span className="text-[10px] font-mono text-white/25 bg-white/5
                                     px-2 py-0.5 rounded">{log.table}</span>
                  </td>

                  <td className="text-center px-3 py-3.5">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border
                                      ${typeColors[log.type]}`}>
                      {log.type}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Immutable notice */}
        <div className="px-5 py-3 border-t border-white/5 flex items-center gap-2">
          <BsShieldFill className="text-amber/30" size={11} />
          <span className="text-[10px] text-white/20">
            Audit logs are immutable — actions are recorded automatically and cannot be modified or deleted.
          </span>
        </div>
      </div>
    </div>
  )
}