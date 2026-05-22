import { motion } from 'framer-motion'
import { HiCog } from 'react-icons/hi'
import { BsShieldFill } from 'react-icons/bs'

export default function SuperSettings() {
  return (
    <div>
      <div className="mb-7">
        <div className="text-[10px] font-bold tracking-[3px] uppercase text-amber/50 mb-1">System</div>
        <h1 className="font-display text-3xl sm:text-4xl tracking-wide">SETTINGS</h1>
        <p className="text-white/25 text-sm mt-1">Platform configuration and branding.</p>
      </div>

      <div className="max-w-xl">
        <div className="bg-card border border-white/8 rounded-2xl p-6">
          <div className="flex items-center gap-2.5 mb-5">
            <BsShieldFill className="text-amber" size={14} />
            <span className="font-display text-lg tracking-wide">PLATFORM INFO</span>
          </div>
          <div className="divide-y divide-white/5">
            {[
              { label: 'Platform Name',   value: 'Game On Rwanda'             },
              { label: 'Season',          value: '2025'                        },
              { label: 'Active Sport',    value: 'Basketball'                  },
              { label: 'Registered Teams',value: '7'                           },
              { label: 'Environment',     value: 'Development — Phase 1'       },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between py-3">
                <span className="text-white/30 text-xs font-medium">{label}</span>
                <span className="text-white text-sm font-semibold">{value}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 px-4 py-3 bg-amber/5 border border-amber/10 rounded-xl">
            <p className="text-white/25 text-xs">
              Advanced settings (branding, custom domains, email templates) will be configurable in Phase 2 after Supabase integration.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}