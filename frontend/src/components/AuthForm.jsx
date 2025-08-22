import { useState } from 'react';
import axios from 'axios';

const AuthForm = ({ onAuth }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const endpoint = isLogin ? '/api/login' : '/api/signup';
      const res = await axios.post(endpoint, form);
      onAuth(res.data);
    } catch (err) {
      setError('Invalid credentials or user already exists.');
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">{isLogin ? 'Login' : 'Sign Up'}</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="username" value={form.username} onChange={handleChange} placeholder="Username" className="w-full border px-3 py-2 rounded" required />
        <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" className="w-full border px-3 py-2 rounded" required />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      <button className="mt-4 text-blue-600 underline" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
      </button>
    </div>
  );
};

export default AuthForm;
