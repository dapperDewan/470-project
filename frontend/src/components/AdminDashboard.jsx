import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [usersRes, playersRes, teamsRes] = await Promise.all([
          axios.get('/api/admin/users?admin=true'),
          axios.get('/api/players'),
          axios.get('/api/teams'),
        ]);
        setUsers(usersRes.data);
        setPlayers(playersRes.data);
        setTeams(teamsRes.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch admin data.');
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Users</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Username</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td className="p-2 border-t">{u.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Players</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Name</th>
              <th className="p-2">Team</th>
              <th className="p-2">Position</th>
            </tr>
          </thead>
          <tbody>
            {players.map(p => (
              <tr key={p._id}>
                <td className="p-2 border-t">{p.name}</td>
                <td className="p-2 border-t">{p.team}</td>
                <td className="p-2 border-t">{p.position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Teams</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Name</th>
            </tr>
          </thead>
          <tbody>
            {teams.map(t => (
              <tr key={t._id}>
                <td className="p-2 border-t">{t.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-4">Dream Team Creation (by users)</h2>
        <p className="text-gray-600">Feature coming soon: View and manage users' dream teams.</p>
      </section>
    </div>
  );
};

export default AdminDashboard;
