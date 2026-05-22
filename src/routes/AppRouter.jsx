import { Routes, Route } from 'react-router-dom'
import PublicLayout        from '../layouts/PublicLayout'
import DashboardLayout     from '../layouts/DashboardLayout'
import SuperAdminLayout    from '../layouts/SuperAdminLayout'

// Public pages
import HomePage            from '../pages/public/HomePage'
import NewsPage            from '../pages/public/NewsPage'
import StandingsPage       from '../pages/public/StandingsPage'
import FixturesPage        from '../pages/public/FixturesPage'
import TeamsPage           from '../pages/public/TeamsPage'
import TeamProfilePage     from '../pages/public/TeamProfilePage'
import PlayersPage         from '../pages/public/PlayersPage'
import GalleryPage         from '../pages/public/GalleryPage'
import AboutPage from '../pages/public/AboutPage'

// Auth
import LoginPage           from '../pages/auth/LoginPage'
import ForgotPasswordPage  from '../pages/auth/ForgotPasswordPage'

// Team Admin
import DashboardHome       from '../pages/team-admin/DashboardHome'
import PlayersManagement   from '../pages/team-admin/PlayersManagement'
import FixturesView        from '../pages/team-admin/FixturesView'
import NotificationsPage   from '../pages/team-admin/NotificationsPage'
import SettingsPage        from '../pages/team-admin/SettingsPage'

// Super Admin
import AdminDashboard      from '../pages/super-admin/AdminDashboard'
import PlayerVerification  from '../pages/super-admin/PlayerVerification'
import FixtureManager      from '../pages/super-admin/FixtureManager'
import AdminsManager       from '../pages/super-admin/AdminsManager'
import NewsManager         from '../pages/super-admin/NewsManager'
import AuditLogs           from '../pages/super-admin/AuditLogs'
import Analytics           from '../pages/super-admin/Analytics'
import GalleryManager      from '../pages/super-admin/GalleryManager'
import TeamsOverview       from '../pages/super-admin/TeamsOverview'
import StandingsManager    from '../pages/super-admin/StandingsManager'
import SuperSettings       from '../pages/super-admin/SuperSettings'
import ChampionsManager from '../pages/super-admin/ChampionsManager'
export default function AppRouter() {
  return (
    <Routes>

      {/* ── Public ── */}
      <Route element={<PublicLayout />}>
        <Route path="/"             element={<HomePage />}        />
        <Route path="/news"         element={<NewsPage />}        />
        <Route path="/standings"    element={<StandingsPage />}   />
        <Route path="/fixtures"     element={<FixturesPage />}    />
        <Route path="/teams"        element={<TeamsPage />}       />
        <Route path="/teams/:slug"  element={<TeamProfilePage />} />
        <Route path="/players"      element={<PlayersPage />}     />
        <Route path="/gallery"      element={<GalleryPage />}     />
        <Route path="/about" element={<AboutPage />} />
      </Route>

      {/* ── Auth ── */}
      <Route path="/login"            element={<LoginPage />}          />
      <Route path="/forgot-password"  element={<ForgotPasswordPage />} />

      {/* ── Team Admin Dashboard ── */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index                  element={<DashboardHome />}     />
        <Route path="players"         element={<PlayersManagement />} />
        <Route path="fixtures"        element={<FixturesView />}      />
        <Route path="notifications"   element={<NotificationsPage />} />
        <Route path="settings"        element={<SettingsPage />}      />
      </Route>

      {/* ── Super Admin ── */}
      <Route path="/admin" element={<SuperAdminLayout />}>
        <Route index                  element={<AdminDashboard />}     />
        <Route path="analytics"       element={<Analytics />}          />
        <Route path="fixtures"        element={<FixtureManager />}     />
        <Route path="results"         element={<FixtureManager />}     />
        <Route path="standings"       element={<StandingsManager />}   />
        <Route path="teams"           element={<TeamsOverview />}      />
        <Route path="admins"          element={<AdminsManager />}      />
        <Route path="players"         element={<PlayerVerification />} />
        <Route path="news"            element={<NewsManager />}        />
        <Route path="gallery"         element={<GalleryManager />}     />
        <Route path="audit"           element={<AuditLogs />}          />
        <Route path="settings"        element={<SuperSettings />}      />
        <Route path="champions" element={<ChampionsManager />} />
      </Route>

    </Routes>
  )
}