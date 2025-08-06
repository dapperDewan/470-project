import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PlayersPage = () => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await axios.get('/api/players');
                setPlayers(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching players:', error);
                setLoading(false);
            }
        };

        fetchPlayers();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Players</h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    Add New Player
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {players.map((player) => (
                    <Link 
                        key={player._id} 
                        to={`/players/${player._id}`}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-gray-900">{player.name}</h2>
                            <p className="text-gray-600">{player.team}</p>
                            <p className="text-gray-500">{player.position} | #{player.number}</p>
                            
                            {player.stats && (
                                <div className="mt-4 grid grid-cols-3 gap-4 text-center text-sm">
                                    <div>
                                        <p className="font-semibold text-gray-900">{player.stats.pointsPerGame}</p>
                                        <p className="text-gray-500">PPG</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{player.stats.assistsPerGame}</p>
                                        <p className="text-gray-500">APG</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{player.stats.reboundsPerGame}</p>
                                        <p className="text-gray-500">RPG</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default PlayersPage;
