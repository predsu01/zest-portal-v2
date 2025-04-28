import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useRouter } from 'next/router';

export default function SubmitCover() {
  const [name, setName] = useState('');
  const [modelName, setModelName] = useState('');
  const [shift, setShift] = useState('');
  const [reason, setReason] = useState('');
  const [date, setDate] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from('cover_requests').insert([
      { name, modelName, shift, reason, date, status: 'pending' },
    ]);

    if (error) {
      console.error('Error submitting cover request:', error);
    } else {
      setSuccess('Cover request submitted!');
      setName('');
      setModelName('');
      setShift('');
      setReason('');
      setDate('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Submit Cover Request</h1>

        {success && <p className="text-green-400 mb-4">{success}</p>}

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
        />

        <input
          type="text"
          placeholder="Model's Account Name"
          value={modelName}
          onChange={(e) => setModelName(e.target.value)}
          required
          className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
        />

        <input
          type="text"
          placeholder="Shift (EST)"
          value={shift}
          onChange={(e) => setShift(e.target.value)}
          required
          className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
        />

        <textarea
          placeholder="Reason for Cover Request"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
          className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
        ></textarea>

        <input
          type="text"
          placeholder="Date (EST)"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full mb-6 p-2 rounded bg-gray-700 text-white"
        />

        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 font-bold py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}
