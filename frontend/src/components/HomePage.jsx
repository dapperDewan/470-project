import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AuthForm from './AuthForm';

const HomePage = () => {
    const [news, setNews] = useState([]);
    const [featuredPlayers, setFeaturedPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Mock data for demonstration
        const mockNews = [
            {
                id: 1,
                title: "NBA Finals Highlights",
                description: "Check out the best plays from last night's game",
                image: "https://cdn.nba.com/manage/2024/06/nba-finals-2024-game-action.jpg", // NBA Finals game action
                date: "2025-08-05"
            },
            {
                id: 2,
                title: "Rising Stars Showcase",
                description: "Young talents shine in summer league performances",
                image: "https://cdn.nba.com/manage/2024/02/rising-stars-2024-event.jpg", // NBA Rising Stars event
                date: "2025-08-04"
            },
            {
                id: 3,
                title: "Trade Deadline Updates",
                description: "Latest transfers and team updates",
                image: "https://cdn.nba.com/manage/2024/02/nba-trade-deadline-2024.jpg", // NBA Trade Deadline
                date: "2025-08-03"
            }
        ];

        const mockPlayers = [
            {
                id: 1,
                name: "LeBron James",
                team: "Los Angeles Lakers",
                image: "https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png",
                stats: { pointsPerGame: 27.1, assistsPerGame: 7.3, reboundsPerGame: 7.8 }
            },
            {
                id: 2,
                name: "Stephen Curry",
                team: "Golden State Warriors",
                image: "https://cdn.nba.com/headshots/nba/latest/1040x760/201939.png",
                stats: { pointsPerGame: 29.4, assistsPerGame: 6.3, reboundsPerGame: 5.6 }
            },
            {
                id: 3,
                name: "Giannis Antetokounmpo",
                team: "Milwaukee Bucks",
                image: "https://cdn.nba.com/headshots/nba/latest/1040x760/203507.png",
                stats: { pointsPerGame: 31.1, assistsPerGame: 5.7, reboundsPerGame: 11.8 }
            },
            {
                id: 4,
                name: "Kevin Durant",
                team: "Phoenix Suns",
                image: "https://cdn.nba.com/headshots/nba/latest/1040x760/201142.png",
                stats: { pointsPerGame: 27.0, assistsPerGame: 5.3, reboundsPerGame: 7.1 }
            }
        ];

        setNews(mockNews);
        setFeaturedPlayers(mockPlayers);
        setLoading(false);
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-700"></div>
        </div>
    );

    return (
        <div className="space-y-12">
            {/* Auth Section */}
            <section className="py-8">
                {!user ? (
                    <AuthForm onAuth={setUser} />
                ) : (
                    <div className="max-w-sm mx-auto bg-green-100 p-6 rounded shadow text-center">
                        <h2 className="text-xl font-bold mb-2">Welcome, {user.username}!</h2>
                        <button className="mt-4 text-red-600 underline" onClick={() => setUser(null)}>Logout</button>
                    </div>
                )}
            </section>

            {/* Hero Section */}
            <section className="relative h-[500px] -mt-8 mb-12">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative h-full flex items-center justify-center text-center px-4">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            Welcome to Hoop Hub
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 mb-8">
                            Your premier destination for basketball news, stats, and analysis
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link to="/players" className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                                View Players
                            </Link>
                            <Link to="/teams" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                                View Teams
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Latest News Section */}
            <section className="px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8">Latest News & Highlights</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {news.map((item) => (
                            <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                                <div className="h-48 bg-gray-200">
                                    <img 
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                        onError={e => { e.target.onerror = null; e.target.src = 'https://cdn.nba.com/logos/nba/2020/assets/nba-primary-logo.png'; }}
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="font-bold text-xl mb-2 text-gray-800">{item.title}</h3>
                                    <p className="text-gray-600 mb-4">{item.description}</p>
                                    <p className="text-sm text-gray-500">{item.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Players Section */}
            <section className="bg-gray-50 py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8">Featured Players</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {featuredPlayers.map((player) => (
                            <Link key={player.id} to={`/players/${player.id}`}>
                                <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-shadow group">
                                    <div className="flex items-center space-x-8">
                                        <div className="h-28 w-28 rounded-full bg-gray-100 overflow-hidden border-4 border-blue-200 group-hover:border-blue-400 transition">
                                            {player.image ? (
                                                <img 
                                                    src={player.image} 
                                                    alt={player.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400 text-3xl font-bold">?</div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-2xl mb-2 text-blue-700 group-hover:text-blue-900 transition">{player.name}</h3>
                                            <p className="text-gray-600 mb-3 text-lg">{player.team}</p>
                                            <div className="grid grid-cols-3 gap-6 text-center">
                                                <div>
                                                    <p className="font-semibold text-xl text-blue-600">{player.stats.pointsPerGame}</p>
                                                    <p className="text-sm text-gray-400">PPG</p>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-xl text-blue-600">{player.stats.assistsPerGame}</p>
                                                    <p className="text-sm text-gray-400">APG</p>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-xl text-blue-600">{player.stats.reboundsPerGame}</p>
                                                    <p className="text-sm text-gray-400">RPG</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
