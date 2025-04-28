// components/CoverCard.js
export default function CoverCard({ shift, date, onClaim }) {
  return (
    <div className="bg-gray-800 p-4 rounded shadow-md w-full max-w-xl mb-4">
      <p><strong>Shift:</strong> {shift}</p>
      <p><strong>Date:</strong> {date}</p>
      <button
        onClick={onClaim}
        className="mt-4 bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded"
      >
        Claim Cover
      </button>
    </div>
  );
}
