import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PlayersPage = () => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        name: '',
        team: '',
        position: '',
        number: '',
        height: '',
        weight: '',
        age: '',
        pointsPerGame: '',
        assistsPerGame: '',
        reboundsPerGame: ''
    });
    const [error, setError] = useState('');

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const newPlayer = {
                name: form.name,
                team: form.team,
                position: form.position,
                number: Number(form.number),
                height: form.height,
                weight: form.weight,
                age: Number(form.age),
                stats: {
                    pointsPerGame: Number(form.pointsPerGame),
                    assistsPerGame: Number(form.assistsPerGame),
                    reboundsPerGame: Number(form.reboundsPerGame)
                }
            };
            const response = await axios.post('/api/players', newPlayer);
            setPlayers([...players, response.data]);
            setShowModal(false);
            setForm({
                name: '', team: '', position: '', number: '', height: '', weight: '', age: '', pointsPerGame: '', assistsPerGame: '', reboundsPerGame: ''
            });
        } catch (err) {
            setError('Failed to add player. Please check your input.');
        }
    };

    // Dream Team logic (backend per-user)
    const [dreamTeam, setDreamTeam] = useState([]);
    const [dreamTeamError, setDreamTeamError] = useState('');
    // Fetch current user's dream team from backend
    useEffect(() => {
        async function fetchDreamTeam() {
            try {
                const res = await axios.get('/api/dreamteam/my');
                setDreamTeam(res.data.players ? res.data.players.map(p => p._id) : []);
            } catch (err) {
                setDreamTeam([]);
            }
        }
        fetchDreamTeam();
    }, []);
    // Update dream team in backend
    const handleDreamTeam = async (id) => {
        const strId = String(id);
        let updated;
        if (dreamTeam.includes(strId)) {
            updated = dreamTeam.filter(pid => pid !== strId);
            setDreamTeamError('');
        } else {
            if (dreamTeam.length >= 10) {
                setDreamTeamError('You can only add up to 10 players in your dream team.');
                return;
            }
            updated = [...dreamTeam, strId];
            setDreamTeamError('');
        }
        setDreamTeam(updated);
        try {
            await axios.put('/api/dreamteam/my', { players: updated });
        } catch (err) {
            setDreamTeamError('Failed to update dream team.');
        }
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
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Players</h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors" onClick={() => setShowModal(true)}>
                    Add New Player
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <>
                {dreamTeamError && (
                    <div className="mb-4 text-red-500 text-center">{dreamTeamError}</div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {players.map((player) => (
                        <div key={player._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="p-6">
                                <div className="mb-4 flex justify-center">
                                    <img src={getPlayerImage(player)} alt={player.name} className="h-24 w-24 object-cover rounded-full border" />
                                </div>
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
                                <div className="mt-4 flex justify-end space-x-2">
                                    <button
                                        className={`px-3 py-1 rounded ${dreamTeam.includes(String(player._id)) ? 'bg-green-400 text-white' : 'bg-gray-200 text-gray-700'} transition-colors`}
                                        onClick={() => handleDreamTeam(player._id)}
                                    >
                                        {dreamTeam.includes(String(player._id)) ? 'In Dream Team' : 'Add to Dream Team'}
                                    </button>
                                    {dreamTeam.includes(String(player._id)) && (
                                        <button
                                            className="px-3 py-1 rounded bg-red-400 text-white transition-colors"
                                            onClick={() => handleDreamTeam(player._id)}
                                        >
                                            Remove from Dream Team
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                </>
            )}

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Add New Player</h2>
                        {error && <p className="text-red-500 mb-2">{error}</p>}
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <input name="name" value={form.name} onChange={handleInputChange} placeholder="Name" className="w-full border px-3 py-2 rounded" required />
                            <input name="team" value={form.team} onChange={handleInputChange} placeholder="Team" className="w-full border px-3 py-2 rounded" required />
                            <input name="position" value={form.position} onChange={handleInputChange} placeholder="Position" className="w-full border px-3 py-2 rounded" required />
                            <input name="number" value={form.number} onChange={handleInputChange} placeholder="Number" type="number" className="w-full border px-3 py-2 rounded" required />
                            <input name="height" value={form.height} onChange={handleInputChange} placeholder="Height" className="w-full border px-3 py-2 rounded" />
                            <input name="weight" value={form.weight} onChange={handleInputChange} placeholder="Weight" className="w-full border px-3 py-2 rounded" />
                            <input name="age" value={form.age} onChange={handleInputChange} placeholder="Age" type="number" className="w-full border px-3 py-2 rounded" />
                            <input name="pointsPerGame" value={form.pointsPerGame} onChange={handleInputChange} placeholder="Points Per Game" type="number" className="w-full border px-3 py-2 rounded" />
                            <input name="assistsPerGame" value={form.assistsPerGame} onChange={handleInputChange} placeholder="Assists Per Game" type="number" className="w-full border px-3 py-2 rounded" />
                            <input name="reboundsPerGame" value={form.reboundsPerGame} onChange={handleInputChange} placeholder="Rebounds Per Game" type="number" className="w-full border px-3 py-2 rounded" />
                            <input name="image" value={form.image} onChange={handleInputChange} placeholder="Image URL (optional)" className="w-full border px-3 py-2 rounded" />
                            <div className="flex justify-end space-x-2 mt-4">
                                <button type="button" className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlayersPage;
