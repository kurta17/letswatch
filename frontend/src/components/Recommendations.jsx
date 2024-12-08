import React, { useState } from 'react';

function Recommendations() {
  const [movieId, setMovieId] = useState('');
  const [recommendations, setRecommendations] = useState([]);

  const fetchRecommendations = () => {
    // Mock recommendations data
    const mockRecommendations = [
      { id: 101, title: 'Django Unchained' },
      { id: 102, title: 'The Revenant' },
      { id: 103, title: 'Pulp Fiction' },
    ];
    setRecommendations(mockRecommendations);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Enter Movie ID"
        value={movieId}
        onChange={(e) => setMovieId(e.target.value)}
        className="border p-2 rounded mr-2"
      />
      <button
        onClick={fetchRecommendations}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Get Recommendations
      </button>
      <ul className="mt-4">
        {recommendations.map((rec) => (
          <li key={rec.id} className="bg-gray-100 p-2 rounded mb-2">
            {rec.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Recommendations;
