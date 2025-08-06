import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import PlayersPage from './components/PlayersPage';
import TeamsPage from './components/TeamsPage';
import PlayerProfile from './components/PlayerProfile';
import TeamProfile from './components/TeamProfile';

function App() {
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
                <span className="text-2xl font-bold tracking-tight">Basketball Central</span>
              </Link>
              <div className="flex space-x-8">
                <Link to="/" className="text-gray-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-blue-500">Home</Link>
                <Link to="/players" className="text-gray-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-blue-500">Players</Link>
                <Link to="/teams" className="text-gray-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-blue-500">Teams</Link>
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
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  )
}

export default App;
