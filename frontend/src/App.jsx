import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import AuthForms from './components/AuthForms';
import PlayersPage from './components/PlayersPage';
import TeamsPage from './components/TeamsPage';
import PlayerProfile from './components/PlayerProfile';
import TeamProfile from './components/TeamProfile';
import FavoritePlayersPage from './components/FavoritePlayersPage';
import DreamTeamPage from './components/DreamTeamPage';
import FavoriteTeamsPage from './components/FavoriteTeamsPage';
import AdminDashboard from './components/AdminDashboard';
import ViewDreamTeam from './components/ViewDreamTeam';
import FixturesPage from './components/FixturesPage';
import FunFacts from './components/FunFacts';
import MerchandisePage from './components/MerchandisePage';

function App() {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <nav className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link to="/" className="flex items-center space-x-3">
                <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-10.5l3 3 .5-.5-3-3 3-3-.5-.5-3 3-3-3-.5.5 3 3-3 3 .5.5z"/>
                </svg>
                <span className="text-2xl font-bold tracking-tight">Hoop Hub</span>
              </Link>
              <div className="flex space-x-8">
                <Link to="/" className="text-white hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-blue-500">Home</Link>
                <Link to="/players" className="text-white hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-blue-500">Players</Link>
                <Link to="/teams" className="text-white hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-blue-500">Teams</Link>
                <Link to="/favorites" className="text-white hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-yellow-400">Favorites</Link>
                <Link to="/favorite-teams" className="text-white hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-yellow-400">Favorite Teams</Link>
                <Link to="/dream-team" className="text-white hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-green-500">Dream Team</Link>
                <Link to="/view-dreamteam" className="text-white hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-indigo-500">View Dream Team</Link>
                <Link to="/fixtures" className="text-white hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-blue-500">Fixtures</Link>
                <Link to="/merchandise" className="text-white hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-red-500">Merchandise</Link>
                <Link to="/fun-facts" className="text-white hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-pink-500">Fun Facts</Link>
                {isAdmin && <Link to="/admin" className="text-white hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-gray-700">Admin Panel</Link>}
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/players" element={<PlayersPage />} />
              <Route path="/players/:id" element={<PlayerProfile />} />
              <Route path="/teams" element={<TeamsPage />} />
              <Route path="/teams/:id" element={<TeamProfile />} />
              <Route path="/favorites" element={<FavoritePlayersPage />} />
              <Route path="/favorite-teams" element={<FavoriteTeamsPage />} />
              <Route path="/dream-team" element={<DreamTeamPage />} />
              <Route path="/view-dreamteam" element={<ViewDreamTeam />} />
              <Route path="/fixtures" element={<FixturesPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/merchandise" element={<MerchandisePage />} />
              <Route path="/fun-facts" element={<FunFacts />} />
            <Route path="/login" element={<AuthForms />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  )
}

export default App;
