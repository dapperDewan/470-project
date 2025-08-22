import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ViewDreamTeam = () => {
  const [userId, setUserId] = useState('');
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const nbaImages = {
    'LeBron James': 'https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png',
    'Stephen Curry': 'https://cdn.nba.com/headshots/nba/latest/1040x760/201939.png',
    'Giannis Antetokounmpo': 'https://cdn.nba.com/headshots/nba/latest/1040x760/203507.png',
    'Kevin Durant': 'https://cdn.nba.com/headshots/nba/latest/1040x760/201142.png',
    'Luka Doncic': 'https://cdn.nba.com/headshots/nba/latest/1040x760/1629029.png',
    'Tyrese Haliburton': 'https://cdn.nba.com/headshots/nba/latest/1040x760/1630169.png',
    'Tyrese Hali': 'https://cdn.nba.com/headshots/nba/latest/1040x760/1630169.png',
  };
  function getPlayerImage(player) {
    const normalized = player.name.trim().toLowerCase();
    for (const key in nbaImages) {
      if (key.trim().toLowerCase() === normalized) {
        return nbaImages[key];
      }
    }
    if (player.image) return player.image;
    return 'https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png';
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTeam(null);
    // Basic ObjectId format validation (24 hex chars)
    if (!/^[a-fA-F0-9]{24}$/.test(userId)) {
      setError('Please enter a valid User ID (24 characters, hexadecimal).');
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get(`/api/dreamteam/user/${userId}`);
      setTeam(res.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('Dream team not found for this user.');
      } else {
        setError('Error fetching dream team.');
      }
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-extrabold text-indigo-700 mb-6 tracking-tight drop-shadow text-center">View Another User's Dream Team</h2>
      <form onSubmit={handleSearch} className="flex items-center justify-center mb-8 gap-4">
        <input
          type="text"
          value={userId}
          onChange={e => setUserId(e.target.value)}
          placeholder="Enter User ID"
          className="border px-3 py-2 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-64"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">Search</button>
      </form>
      {loading && <div className="text-center py-8 text-blue-500">Loading...</div>}
      {error && <div className="text-center py-8 text-red-500">{error}</div>}
      {team && team.players && team.players.length > 0 && (
        <div className="space-y-8">
          <h3 className="text-2xl font-bold mb-4 text-green-700 tracking-wide text-center">Dream Team: {team.name || 'Unnamed'}</h3>
          <div className="grid grid-cols-1 gap-4 mb-8">
            {team.players.slice(0, 5).map(player => (
              <div key={player._id} className="flex items-center justify-between bg-white rounded-xl shadow hover:shadow-lg p-4 transition group">
                <div className="flex items-center gap-4">
                  <img src={getPlayerImage(player)} alt={player.name} className="h-14 w-14 object-cover rounded-full border-2 border-blue-300 group-hover:border-blue-500" />
                  <div>
                    <Link to={`/players/${player._id}`} className="text-lg font-semibold text-blue-700 hover:underline group-hover:text-blue-900 transition">
                      {player.name}
                    </Link>
                    <div className="text-sm text-gray-500 mt-1">{player.position} | #{player.number}</div>
                  </div>
                </div>
                <div className="flex gap-6 text-center">
                  <div>
                    <div className="font-bold text-blue-600">{player.stats?.pointsPerGame ?? '-'}</div>
                    <div className="text-xs text-gray-400">PPG</div>
                  </div>
                  <div>
                    <div className="font-bold text-blue-600">{player.stats?.assistsPerGame ?? '-'}</div>
                    <div className="text-xs text-gray-400">APG</div>
                  </div>
                  <div>
                    <div className="font-bold text-blue-600">{player.stats?.reboundsPerGame ?? '-'}</div>
                    <div className="text-xs text-gray-400">RPG</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <h3 className="text-2xl font-bold mb-4 text-yellow-700 tracking-wide text-center">Substitutes</h3>
          <div className="grid grid-cols-1 gap-4">
            {team.players.slice(5, 10).map(player => (
              <div key={player._id} className="flex items-center justify-between bg-white rounded-xl shadow hover:shadow-lg p-4 transition group">
                <div className="flex items-center gap-4">
                  <img src={getPlayerImage(player)} alt={player.name} className="h-14 w-14 object-cover rounded-full border-2 border-yellow-300 group-hover:border-yellow-500" />
                  <div>
                    <Link to={`/players/${player._id}`} className="text-lg font-semibold text-blue-700 hover:underline group-hover:text-blue-900 transition">
                      {player.name}
                    </Link>
                    <div className="text-sm text-gray-500 mt-1">{player.position} | #{player.number}</div>
                  </div>
                </div>
                <div className="flex gap-6 text-center">
                  <div>
                    <div className="font-bold text-yellow-700">{player.stats?.pointsPerGame ?? '-'}</div>
                    <div className="text-xs text-gray-400">PPG</div>
                  </div>
                  <div>
                    <div className="font-bold text-yellow-700">{player.stats?.assistsPerGame ?? '-'}</div>
                    <div className="text-xs text-gray-400">APG</div>
                  </div>
                  <div>
                    <div className="font-bold text-yellow-700">{player.stats?.reboundsPerGame ?? '-'}</div>
                    <div className="text-xs text-gray-400">RPG</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {team && (!team.players || team.players.length === 0) && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No players in this dream team yet.</p>
        </div>
      )}
    </div>
  );
};

export default ViewDreamTeam;
