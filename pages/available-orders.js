import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useRouter } from 'next/router';

export default function AvailableOrders() {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserAndOrders = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || user.user_metadata.role !== 'chatter') {
        router.push('/login');
      } else {
        setUser(user);
        const { data } = await supabase.from('cover_requests').select('*').eq('status', 'approved').is('claimed_by', null);
        setOrders(data);
      }
    };
    fetchUserAndOrders();
  }, []);

  const handleClaim = async (id) => {
    const { data: { user } } = await supabase.auth.getUser();
    await supabase
      .from('cover_requests')
      .update({ claimed_by: user.id })
      .eq('id', id);
    setOrders(orders.filter((order) => order.id !== id));
    router.push(`/claimed-order/${id}`);
  };

  if (!user) {
    return <div className="h-screen bg-gray-900 flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-6">Available Cover Orders</h1>

      {orders.length === 0 ? (
        <p>No available cover requests right now.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="bg-gray-800 p-4 rounded shadow-md w-full max-w-xl mb-4">
            <p><strong>Shift:</strong> {order.shift}</p>
            <p><strong>Date:</strong> {order.date}</p>
            <button
              onClick={() => handleClaim(order.id)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded"
            >
              Claim Cover
            </button>
          </div>
        ))
      )}
    </div>
  );
}
