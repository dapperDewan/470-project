import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthForms = ({ onAuth }) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const endpoint = mode === 'signup' ? '/api/signup' : '/api/login';
      const res = await axios.post(endpoint, form);
      if (onAuth) onAuth(res.data.username);
      localStorage.setItem('username', res.data.username);
      if (res.data.isAdmin) {
        localStorage.setItem('isAdmin', 'true');
      } else {
        localStorage.removeItem('isAdmin');
      }
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
      }
      setForm({ username: '', password: '' });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-12 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">{mode === 'signup' ? 'Sign Up' : 'Log In'}</h2>
      {error && <div className="text-red-500 mb-2 text-center">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 transition-colors">
          {mode === 'signup' ? 'Sign Up' : 'Log In'}
        </button>
      </form>
      <div className="mt-4 text-center">
        {mode === 'signup' ? (
          <span>Already have an account? <button className="text-blue-600 underline" onClick={() => setMode('login')}>Log In</button></span>
        ) : (
          <span>Don't have an account? <button className="text-blue-600 underline" onClick={() => setMode('signup')}>Sign Up</button></span>
        )}
      </div>
    </div>
  );
};

export default AuthForms;
