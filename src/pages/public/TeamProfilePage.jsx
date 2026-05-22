import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiArrowLeft } from 'react-icons/hi'
import { BsPeopleFill } from 'react-icons/bs'
import { GiBasketballBall } from 'react-icons/gi'
import { MdLocationOn } from 'react-icons/md'
import { TEAMS, PLAYERS, FIXTURES } from '../../constants/teams'

const positionColors = {
  'Point Guard':    'bg-amber/15 text-amber border-amber/25',
  'Shooting Guard': 'bg-white/8 text-white/55 border-white/10',
  'Small Forward':  'bg-white/8 text-white/55 border-white/10',
  'Power Forward':  'bg-amber/10 text-amber/75 border-amber/15',
  'Center':         'bg-amber/20 text-amber border-amber/30',
}

export default function TeamProfilePage() {
  const { slug } = useParams()
  const team = TEAMS.find(t => t.slug === slug)

  if (!team) return (
    <div className="pt-16 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="font-display text-4xl text-white/20 mb-4">TEAM NOT FOUND</div>
        <Link to="/teams" className="text-amber text-sm hover:underline">← Back to Teams</Link>
      </div>
    </div>
  )

  const roster   = PLAYERS.filter(p => p.team === team.name)
  const fixtures = FIXTURES.filter(f => f.home === team.name || f.away === team.name).slice(0, 5)

  const positionGroups = ['Point Guard', 'Shooting Guard', 'Small Forward', 'Power Forward', 'Center']

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <Link to="/teams"
          className="inline-flex items-center gap-2 text-white/35 hover:text-amber
                     transition-colors text-sm font-medium mb-8">
          <HiArrowLeft /> Back to Teams
        </Link>

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-white/8 rounded-2xl p-8 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-amber/4 rounded-full
                          blur-3xl pointer-events-none" />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-amber/15 border border-amber/25
                            flex items-center justify-center flex-shrink-0">
              <span className="font-display text-4xl text-amber">{team.name.charAt(0)}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold tracking-[3px] uppercase text-amber/60">
                  {team.institution}
                </span>
                <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber/10
                                 text-amber text-[10px] font-bold border border-amber/15">
                  <GiBasketballBall size={10} /> {team.sport}
                </span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl tracking-wide mb-2">{team.name}</h1>
              <p className="text-white/35 text-sm leading-relaxed max-w-xl">{team.description}</p>
            </div>
            <div className="text-white/20 text-xs">Est. {team.founded}</div>
          </div>
        </motion.div>

        {/* Season record */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-4 gap-3 mb-8">
          {[
            { label: 'Games Played', value: team.wins + team.losses },
            { label: 'Wins',         value: team.wins               },
            { label: 'Losses',       value: team.losses             },
            { label: 'Win %',        value: `${Math.round((team.wins/(team.wins+team.losses))*100)}%` },
          ].map(({ label, value }) => (
            <div key={label} className="bg-card border border-white/8 rounded-xl p-4 text-center">
              <div className={`font-display text-3xl leading-none mb-1 ${
                label === 'Win %' || label === 'Wins' ? 'text-amber' : 'text-white'
              }`}>{value}</div>
              <div className="text-white/25 text-xs font-medium">{label}</div>
            </div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Roster */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-2 bg-card border border-white/8 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
              <BsPeopleFill className="text-amber" size={15} />
              <span className="font-display text-xl tracking-wide">ROSTER</span>
              <span className="ml-auto text-xs text-white/25">{roster.length} Players</span>
            </div>

            {/* Group by position */}
            {positionGroups.map(pos => {
              const group = roster.filter(p => p.position === pos)
              if (!group.length) return null
              return (
                <div key={pos}>
                  <div className="px-6 py-2 bg-pitch-light/50 border-b border-white/5">
                    <span className="text-[10px] font-bold tracking-[2px] uppercase text-white/30">
                      {pos}
                    </span>
                  </div>
                  {group.map(player => (
                    <div key={player.id}
                      className="flex items-center gap-4 px-6 py-3.5 border-b border-white/5
                                 hover:bg-white/2 transition-colors last:border-0">
                      <span className="w-9 h-9 rounded-xl bg-amber/10 border border-amber/15
                                       flex items-center justify-center font-display text-amber
                                       text-base flex-shrink-0">
                        {player.number}
                      </span>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-white">{player.name}</div>
                        <div className="text-white/30 text-xs mt-0.5">{player.position}</div>
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${
                        player.status === 'verified'
                          ? 'bg-amber/10 text-amber border-amber/20'
                          : 'bg-white/5 text-white/30 border-white/8'
                      }`}>
                        {player.status === 'verified' ? '✓ Verified' : '⏳ Pending'}
                      </span>
                    </div>
                  ))}
                </div>
              )
            })}

            {roster.length === 0 && (
              <div className="px-6 py-8 text-center text-white/20 text-sm">
                No players registered yet
              </div>
            )}
          </motion.div>

          {/* Fixtures sidebar */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-white/8 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
              <GiBasketballBall className="text-amber" size={15} />
              <span className="font-display text-xl tracking-wide">SCHEDULE</span>
            </div>
            <div className="p-4 flex flex-col gap-3">
              {fixtures.length === 0 && (
                <div className="text-center py-6 text-white/20 text-sm">No fixtures yet</div>
              )}
              {fixtures.map(fix => {
                const isHome     = fix.home === team.name
                const opponent   = isHome ? fix.away : fix.home
                const teamScore  = fix.status === 'completed' ? (isHome ? fix.homeScore : fix.awayScore) : null
                const oppScore   = fix.status === 'completed' ? (isHome ? fix.awayScore : fix.homeScore) : null
                const won        = teamScore !== null && teamScore > oppScore
                return (
                  <div key={fix.id}
                    className="bg-pitch-light rounded-xl p-4 border border-white/5">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        isHome ? 'bg-amber/10 text-amber' : 'bg-white/5 text-white/40'
                      }`}>{isHome ? 'HOME' : 'AWAY'}</span>
                      {fix.status === 'completed' ? (
                        <span className={`text-[10px] font-bold ${won ? 'text-amber' : 'text-white/30'}`}>
                          {won ? 'W' : 'L'} {teamScore}–{oppScore}
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-amber animate-pulse">Upcoming</span>
                      )}
                    </div>
                    <div className="font-semibold text-sm text-white mb-1">vs {opponent}</div>
                    <div className="flex items-center gap-1.5 text-white/25 text-xs">
                      <MdLocationOn size={11} />
                      <span className="truncate">{fix.venue}</span>
                    </div>
                    <div className="text-white/20 text-xs mt-0.5">{fix.date} · {fix.time}</div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}