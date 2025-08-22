import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function DreamTeamPage() {
  const [players, setPlayers] = useState([]);
  const [teamName, setTeamName] = useState(() => localStorage.getItem('dreamTeamName') || 'My Dream Team');
  const [editing, setEditing] = useState(false);

  // Listen for dreamTeam changes in localStorage
  useEffect(() => {
    let lastDreamTeam = localStorage.getItem("dreamTeam");
    const fetchPlayers = () => {
      const ids = JSON.parse(localStorage.getItem("dreamTeam")) || [];
      console.log("DreamTeam IDs from localStorage:", ids);
      if (ids.length > 0) {
        axios.post("/api/features/players/byIds", { ids })
          .then(res => {
            console.log("Backend response for DreamTeam:", res.data);
            setPlayers(res.data);
          })
          .catch(err => {
            console.error("Error fetching dream team players:", err);
            setPlayers([]);
          });
      } else {
        setPlayers([]);
      }
    };
    fetchPlayers();
    // Listen for localStorage changes from other tabs/windows
    const handleStorage = (e) => {
      if (e.key === "dreamTeam") {
        fetchPlayers();
      }
    };
    window.addEventListener("storage", handleStorage);
    // Poll for changes in localStorage every second (for same tab)
    const interval = setInterval(() => {
      const currentDreamTeam = localStorage.getItem("dreamTeam");
      if (currentDreamTeam !== lastDreamTeam) {
        lastDreamTeam = currentDreamTeam;
        fetchPlayers();
      }
    }, 1000);
    return () => {
      window.removeEventListener("storage", handleStorage);
      clearInterval(interval);
    };
  }, []);

  const handleNameChange = (e) => {
    setTeamName(e.target.value);
  };

  const handleNameSave = () => {
    localStorage.setItem('dreamTeamName', teamName);
    setEditing(false);
  };

  // NBA player image mapping
  const nbaImages = {
    'LeBron James': 'https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png',
    'Stephen Curry': 'https://cdn.nba.com/headshots/nba/latest/1040x760/201939.png',
    'Giannis Antetokounmpo': 'https://cdn.nba.com/headshots/nba/latest/1040x760/203507.png',
    'Kevin Durant': 'https://cdn.nba.com/headshots/nba/latest/1040x760/201142.png',
    'Luka Doncic': 'https://cdn.nba.com/headshots/nba/latest/1040x760/1629029.png',
    'Tyrese Haliburton': 'https://cdn.nba.com/headshots/nba/latest/1040x760/1630169.png',
    'Tyrese Hali': 'https://cdn.nba.com/headshots/nba/latest/1040x760/1630169.png', // fallback for short name
    // Add more as needed
  };
  function getPlayerImage(player) {
    // Normalize name for matching
    const normalized = player.name.trim().toLowerCase();
    for (const key in nbaImages) {
      if (key.trim().toLowerCase() === normalized) {
        return nbaImages[key];
      }
    }
    if (player.image) return player.image;
    return 'https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png';
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl">
      <div className="flex items-center mb-6">
        {editing ? (
          <>
            <input
              type="text"
              value={teamName}
              onChange={handleNameChange}
              className="border px-3 py-2 rounded-lg mr-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button onClick={handleNameSave} className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">Save</button>
            <button onClick={() => setEditing(false)} className="ml-2 text-gray-500 hover:text-gray-700">Cancel</button>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-extrabold text-indigo-700 mr-4 tracking-tight drop-shadow">{teamName}</h2>
            <button onClick={() => setEditing(true)} className="text-blue-600 underline hover:text-blue-800">Edit Name</button>
          </>
        )}
      </div>
      {players.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No players in your dream team yet.</p>
        </div>
      ) : (
        <div className="space-y-8">
          <h3 className="text-2xl font-bold mb-4 text-green-700 tracking-wide">Starting 5</h3>
          <div className="grid grid-cols-1 gap-4 mb-8">
            {players.slice(0, 5).map(player => (
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
          <h3 className="text-2xl font-bold mb-4 text-yellow-700 tracking-wide">Substitutes</h3>
          <div className="grid grid-cols-1 gap-4">
            {players.slice(5, 10).map(player => (
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
    </div>
  );
}

export default DreamTeamPage;
