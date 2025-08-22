import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function FavoritePlayersPage() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const ids = JSON.parse(localStorage.getItem("favoritePlayers")) || [];
    if (ids.length > 0) {
      axios.post("/api/features/players/byIds", { ids })
        .then(res => setPlayers(res.data));
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">Favorite Players</h2>
      {players.length === 0 ? (
        <p className="text-gray-500">No favorite players selected.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {players.map(player => (
            <li key={player._id} className="py-4 flex items-center justify-between">
              <Link to={`/players/${player._id}`} className="text-lg font-semibold text-blue-600 hover:underline">
                {player.name}
              </Link>
              <span className="text-sm text-gray-500">{player.position} | #{player.number}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FavoritePlayersPage;
