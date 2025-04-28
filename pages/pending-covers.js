import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useRouter } from 'next/router';

export default function PendingCovers() {
  const [covers, setCovers] = useState([]);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserAndCovers = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || (user.user_metadata.role !== 'admin' && user.user_metadata.role !== 'manager')) {
        router.push('/login');
      } else {
        setUser(user);
        const { data } = await supabase.from('cover_requests').select('*').eq('status', 'pending');
        setCovers(data);
      }
    };
    fetchUserAndCovers();
  }, []);

  const handleApprove = async (id) => {
    await supabase
      .from('cover_requests')
      .update({ status: 'approved' })
      .eq('id', id);
    setCovers(covers.filter((cover) => cover.id !== id));
  };

  if (!user) {
    return <div className="h-screen bg-gray-900 flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-6">Pending Cover Requests</h1>

      {covers.length === 0 ? (
        <p>No pending cover requests.</p>
      ) : (
        covers.map((cover) => (
          <div key={cover.id} className="bg-gray-800 p-4 rounded shadow-md w-full max-w-xl mb-4">
            <p><strong>Name:</strong> {cover.name}</p>
            <p><strong>Model:</strong> {cover.modelName}</p>
            <p><strong>Shift:</strong> {cover.shift}</p>
            <p><strong>Reason:</strong> {cover.reason}</p>
            <p><strong>Date:</strong> {cover.date}</p>
            <button
              onClick={() => handleApprove(cover.id)}
              className="mt-4 bg-green-600 hover:bg-green-700 py-2 px-4 rounded"
            >
              Approve Cover
            </button>
          </div>
        ))
      )}
    </div>
  );
}
