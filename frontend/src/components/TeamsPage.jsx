import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TeamsPage = () => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        name: '',
        city: '',
        conference: '',
        division: '',
        championships: '',
        establishedYear: '',
        logo: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axios.get('/api/teams');
                setTeams(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching teams:', error);
                setLoading(false);
            }
        };
        fetchTeams();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const newTeam = {
                name: form.name,
                city: form.city,
                conference: form.conference,
                division: form.division,
                championships: Number(form.championships),
                establishedYear: Number(form.establishedYear),
                logo: form.logo
            };
            const response = await axios.post('/api/teams', newTeam);
            setTeams([...teams, response.data]);
            setShowModal(false);
            setForm({ name: '', city: '', conference: '', division: '', championships: '', establishedYear: '', logo: '' });
        } catch (err) {
            setError('Failed to add team. Please check your input.');
        }
    };

    // Favorite teams logic (per-user backend)
    const [favoriteTeams, setFavoriteTeams] = useState([]);
    const username = localStorage.getItem('username');
    useEffect(() => {
        if (!username) return;
        const token = localStorage.getItem('token');
        async function fetchFavoriteTeams() {
            try {
                const res = await axios.get('/api/favorites/teams', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setFavoriteTeams(res.data.map(t => t._id));
            } catch (err) {
                setFavoriteTeams([]);
            }
        }
        fetchFavoriteTeams();
    }, [username]);

    const handleFavorite = async (id) => {
        if (!username) return;
        const token = localStorage.getItem('token');
        const strId = String(id);
        let updated;
        if (favoriteTeams.includes(strId)) {
            updated = favoriteTeams.filter(tid => tid !== strId);
        } else {
            updated = [...favoriteTeams, strId];
        }
        setFavoriteTeams(updated);
        try {
            await axios.put('/api/favorites/teams', { favoriteTeams: updated }, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (err) {
            // Optionally show error
        }
    };

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
                <h1 className="text-3xl font-bold text-gray-900">Teams</h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors" onClick={() => setShowModal(true)}>
                    Add New Team
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teams.map((team) => (
                    <div key={team._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="p-6">
                            {team.logo && (
                                <div className="mb-4 flex justify-center">
                                    <img src={team.logo} alt={team.name} className="h-24 w-24 object-cover rounded-full border" />
                                </div>
                            )}
                            <h2 className="text-xl font-semibold text-gray-900">{team.name}</h2>
                            <p className="text-gray-600">{team.city}</p>
                            <p className="text-gray-500">{team.conference} Conference</p>
                            <p className="text-gray-500">{team.division} Division</p>
                            <div className="mt-4">
                                <p className="text-sm text-gray-600">
                                    {team.championships} Championships
                                </p>
                                <p className="text-sm text-gray-600">
                                    Est. {team.establishedYear}
                                </p>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <button
                                    className={`px-3 py-1 rounded ${favoriteTeams.includes(String(team._id)) ? 'bg-yellow-400 text-white' : 'bg-gray-200 text-gray-700'} transition-colors`}
                                    onClick={() => handleFavorite(team._id)}
                                >
                                    {favoriteTeams.includes(String(team._id)) ? 'Favorited' : 'Add to Favorites'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Add New Team</h2>
                        {error && <p className="text-red-500 mb-2">{error}</p>}
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <input name="name" value={form.name} onChange={handleInputChange} placeholder="Team Name" className="w-full border px-3 py-2 rounded" required />
                            <input name="city" value={form.city} onChange={handleInputChange} placeholder="City" className="w-full border px-3 py-2 rounded" required />
                            <input name="conference" value={form.conference} onChange={handleInputChange} placeholder="Conference" className="w-full border px-3 py-2 rounded" required />
                            <input name="division" value={form.division} onChange={handleInputChange} placeholder="Division" className="w-full border px-3 py-2 rounded" required />
                            <input name="championships" value={form.championships} onChange={handleInputChange} placeholder="Championships" type="number" className="w-full border px-3 py-2 rounded" />
                            <input name="establishedYear" value={form.establishedYear} onChange={handleInputChange} placeholder="Established Year" type="number" className="w-full border px-3 py-2 rounded" />
                            <input name="logo" value={form.logo} onChange={handleInputChange} placeholder="Logo URL (optional)" className="w-full border px-3 py-2 rounded" />
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

export default TeamsPage;
