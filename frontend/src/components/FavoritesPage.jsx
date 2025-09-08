import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function FavoritesPage() {
  const [favoritePlayers, setFavoritePlayers] = useState([]);
  const [favoriteTeams, setFavoriteTeams] = useState([]);
  const [error, setError] = useState('');
  const [debug, setDebug] = useState('');
  const username = localStorage.getItem('username');

  useEffect(() => {
    if (!username) {
      setFavoritePlayers([]);
      setFavoriteTeams([]);
      setError('Please log in to view your favorites.');
      return;
    }
    const token = localStorage.getItem('token');
    async function fetchFavorites() {
      try {
        // Get favorite player IDs or objects
        const playersRes = await axios.get('/api/favorites/players', {
          headers: { Authorization: `Bearer ${token}` }
        });
        let playerIds = [];
        if (Array.isArray(playersRes.data)) {
          playerIds = playersRes.data.map(p => p && p.toString ? p.toString() : String(p));
        }
        setDebug('Favorite player IDs: ' + JSON.stringify(playerIds));
        let fullPlayers = [];
        if (playerIds.length > 0) {
          const fullRes = await axios.post('/api/features/players/byIds', { ids: playerIds });
          fullPlayers = fullRes.data;
          setDebug(prev => prev + '\nFetched player objects: ' + JSON.stringify(fullPlayers));
        }
        setFavoritePlayers(fullPlayers);
        // Get favorite team IDs or objects
        const teamsRes = await axios.get('/api/favorites/teams', {
          headers: { Authorization: `Bearer ${token}` }
        });
        let teamIds = [];
        if (Array.isArray(teamsRes.data)) {
          if (teamsRes.data.length > 0 && typeof teamsRes.data[0] === 'string') {
            teamIds = teamsRes.data;
          } else if (teamsRes.data.length > 0 && teamsRes.data[0]._id) {
            teamIds = teamsRes.data.map(t => t._id);
          } else if (teamsRes.data.length > 0 && typeof teamsRes.data[0] === 'object') {
            teamIds = teamsRes.data.map(t => t._id || t);
          }
        }
        let fullTeams = [];
        if (teamIds.length > 0) {
          const fullTeamRes = await axios.post('/api/features/teams/byIds', { ids: teamIds });
          fullTeams = fullTeamRes.data;
        }
        setFavoriteTeams(fullTeams);
        setError('');
      } catch (err) {
        setFavoritePlayers([]);
        setFavoriteTeams([]);
        setError('Failed to fetch favorites: ' + err.message);
        setDebug('Error: ' + err.message);
      }
    }
    fetchFavorites();
  }, [username]);

  // Remove player from favorites
  const handleRemovePlayer = async (id) => {
    const token = localStorage.getItem('token');
    try {
      // Get current favorite player IDs
      const idsRes = await axios.get('/api/favorites/players', {
        headers: { Authorization: `Bearer ${token}` }
      });
      let playerIds = [];
      if (Array.isArray(idsRes.data)) {
        if (idsRes.data.length > 0 && typeof idsRes.data[0] === 'string') {
          playerIds = idsRes.data;
        } else if (idsRes.data.length > 0 && idsRes.data[0]._id) {
          playerIds = idsRes.data.map(p => p._id);
        }
      }
      const updated = playerIds.filter(pid => pid !== String(id));
      await axios.put('/api/favorites/players', { favorites: updated }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Refetch full player objects
      let fullPlayers = [];
      if (updated.length > 0) {
        const fullRes = await axios.post('/api/features/players/byIds', { ids: updated });
        fullPlayers = fullRes.data;
      }
      setFavoritePlayers(fullPlayers);
    } catch (err) {
      setError('Failed to update favorite players.');
    }
  };

  // Remove team from favorites
  const handleRemoveTeam = async (id) => {
    const token = localStorage.getItem('token');
    const updated = favoriteTeams.filter(t => t._id !== id);
    setFavoriteTeams(updated);
    try {
      await axios.put('/api/favorites/teams', { favoriteTeams: updated.map(t => t._id) }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      setError('Failed to update favorite teams.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-white to-yellow-50 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-extrabold text-yellow-700 mb-6 tracking-tight drop-shadow">My Favorites</h2>
  {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
  {debug && <pre className="mb-4 text-xs text-gray-400 bg-gray-100 p-2 rounded">{debug}</pre>}
      {!username && (
        <div className="mb-4 text-blue-600 text-center font-semibold">Log in to view your favorites!</div>
      )}
      {username && (
        <>
          <h3 className="text-2xl font-bold mb-4 text-blue-700 tracking-wide">Favorite Players</h3>
          {favoritePlayers.length === 0 ? (
            <div className="text-center py-6 text-gray-400">No favorite players yet.</div>
          ) : (
            <div className="grid grid-cols-1 gap-4 mb-8">
              {favoritePlayers.map(player => (
                <div key={player._id} className="flex items-center justify-between bg-white rounded-xl shadow hover:shadow-lg p-4 transition group">
                  <div className="flex items-center gap-4">
                    <img src={player.image || 'https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png'} alt={player.name} className="h-14 w-14 object-cover rounded-full border-2 border-yellow-300 group-hover:border-yellow-500" />
                    <div>
                      <Link to={`/players/${player._id}`} className="text-lg font-semibold text-blue-700 hover:underline group-hover:text-blue-900 transition">
                        {player.name}
                      </Link>
                      <div className="text-sm text-gray-500 mt-1">{player.position} | #{player.number}</div>
                    </div>
                  </div>
                  <button
                    className="px-3 py-1 rounded bg-red-400 text-white transition-colors"
                    onClick={() => handleRemovePlayer(player._id)}
                  >Remove</button>
                </div>
              ))}
            </div>
          )}
          <h3 className="text-2xl font-bold mb-4 text-green-700 tracking-wide">Favorite Teams</h3>
          {favoriteTeams.length === 0 ? (
            <div className="text-center py-6 text-gray-400">No favorite teams yet.</div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {favoriteTeams.map(team => (
                <div key={team._id} className="flex items-center justify-between bg-white rounded-xl shadow hover:shadow-lg p-4 transition group">
                  <div className="flex items-center gap-4">
                    <img src={team.logo || 'https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg'} alt={team.name} className="h-14 w-14 object-cover rounded-full border-2 border-green-300 group-hover:border-green-500" />
                    <div>
                      <Link to={`/teams/${team._id}`} className="text-lg font-semibold text-green-700 hover:underline group-hover:text-green-900 transition">
                        {team.name}
                      </Link>
                      <div className="text-sm text-gray-500 mt-1">{team.city} | {team.conference} | {team.division}</div>
                    </div>
                  </div>
                  <button
                    className="px-3 py-1 rounded bg-red-400 text-white transition-colors"
                    onClick={() => handleRemoveTeam(team._id)}
                  >Remove</button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default FavoritesPage;
