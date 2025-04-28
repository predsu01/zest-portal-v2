import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      if (data.user.user_metadata.role === 'admin') {
        router.push('/admin-dashboard');
      } else if (data.user.user_metadata.role === 'manager') {
        router.push('/manager-dashboard');
      } else {
        router.push('/available-orders');
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Zest Portal Login</h1>

        {error && <p className="text-red-400 mb-4">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-6 p-2 rounded bg-gray-700 text-white"
        />
        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
