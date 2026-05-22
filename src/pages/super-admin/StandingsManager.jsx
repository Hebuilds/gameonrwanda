import StandingsPage from '../public/StandingsPage'

// Super Admin reads the same standings — future: add edit capability
export default function StandingsManager() {
  return (
    <div>
      <div className="mb-5">
        <div className="text-[10px] font-bold tracking-[3px] uppercase text-amber/50 mb-1">
          Competition
        </div>
        <h1 className="font-display text-3xl tracking-wide">STANDINGS MANAGER</h1>
        <p className="text-white/25 text-sm mt-1">
          Live league table. Standings auto-update when results are recorded.
        </p>
      </div>
      <StandingsPage embedded />
    </div>
  )
}