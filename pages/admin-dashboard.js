import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useRouter } from 'next/router';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || user.user_metadata.role !== 'admin') {
        router.push('/login');
      } else {
        setUser(user);
      }
    };
    fetchUser();
  }, []);

  if (!user) {
    return <div className="h-screen bg-gray-900 flex items-center justify-center text-white">Loading...</div>;
  }

  const goToSubmitCover = () => {
    router.push('/submit-cover');
  };

  const goToPendingCovers = () => {
    router.push('/pending-covers');
  };

  const goToAddChatter = () => {
    router.push('/add-chatter');
  };

  const goToAddManager = () => {
    router.push('/add-manager');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center space-y-6">
      <h1 className="text-3xl font-bold">Welcome to Zest Admin Dashboard</h1>

      <button onClick={goToSubmitCover} className="bg-green-600 hover:bg-green-700 py-2 px-6 rounded">
        Submit Cover Request
      </button>

      <button onClick={goToPendingCovers} className="bg-blue-600 hover:bg-blue-700 py-2 px-6 rounded">
        Review Pending Covers
      </button>

      <button onClick={goToAddChatter} className="bg-yellow-600 hover:bg-yellow-700 py-2 px-6 rounded">
        Add Chatter
      </button>

      <button onClick={goToAddManager} className="bg-purple-600 hover:bg-purple-700 py-2 px-6 rounded">
        Add Manager
      </button>
    </div>
  );
}
