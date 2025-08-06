import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
    const [news, setNews] = useState([]);
    const [featuredPlayers, setFeaturedPlayers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock data for demonstration
        const mockNews = [
            {
                id: 1,
                title: "NBA Finals Highlights",
                description: "Check out the best plays from last night's game",
                image: "https://example.com/nba-finals.jpg",
                date: "2025-08-05"
            },
            {
                id: 2,
                title: "Rising Stars Showcase",
                description: "Young talents shine in summer league performances",
                image: "https://example.com/rising-stars.jpg",
                date: "2025-08-04"
            },
            {
                id: 3,
                title: "Trade Deadline Updates",
                description: "Latest transfers and team updates",
                image: "https://example.com/trades.jpg",
                date: "2025-08-03"
            }
        ];

        const mockPlayers = [
            {
                id: 1,
                name: "LeBron James",
                team: "Los Angeles Lakers",
                image: "https://example.com/lebron.jpg",
                stats: { pointsPerGame: 27.1, assistsPerGame: 7.3, reboundsPerGame: 7.8 }
            },
            {
                id: 2,
                name: "Stephen Curry",
                team: "Golden State Warriors",
                image: "https://example.com/curry.jpg",
                stats: { pointsPerGame: 29.4, assistsPerGame: 6.3, reboundsPerGame: 5.6 }
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
            {/* Hero Section */}
            <section className="relative h-[500px] -mt-8 mb-12">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative h-full flex items-center justify-center text-center px-4">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            Welcome to Basketball Central
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
                                    {item.image && (
                                        <img 
                                            src={item.image} 
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                    )}
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
                                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                                    <div className="flex items-center space-x-6">
                                        <div className="h-24 w-24 rounded-full bg-gray-200 overflow-hidden">
                                            {player.image && (
                                                <img 
                                                    src={player.image} 
                                                    alt={player.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-xl mb-1">{player.name}</h3>
                                            <p className="text-gray-600 mb-3">{player.team}</p>
                                            <div className="grid grid-cols-3 gap-4 text-center">
                                                <div>
                                                    <p className="font-semibold text-lg">{player.stats.pointsPerGame}</p>
                                                    <p className="text-sm text-gray-500">PPG</p>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-lg">{player.stats.assistsPerGame}</p>
                                                    <p className="text-sm text-gray-500">APG</p>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-lg">{player.stats.reboundsPerGame}</p>
                                                    <p className="text-sm text-gray-500">RPG</p>
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
