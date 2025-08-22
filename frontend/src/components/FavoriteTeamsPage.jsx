import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function FavoriteTeamsPage() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const ids = JSON.parse(localStorage.getItem("favoriteTeams")) || [];
    if (ids.length > 0) {
      axios.post("/api/features/teams/byIds", { ids })
        .then(res => setTeams(res.data));
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">Favorite Teams</h2>
      {teams.length === 0 ? (
        <p className="text-gray-500">No favorite teams selected.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {teams.map(team => (
            <li key={team._id} className="py-4 flex items-center justify-between">
              <Link to={`/teams/${team._id}`} className="text-lg font-semibold text-blue-600 hover:underline">
                {team.name}
              </Link>
              <span className="text-sm text-gray-500">{team.city} | {team.conference}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FavoriteTeamsPage;
