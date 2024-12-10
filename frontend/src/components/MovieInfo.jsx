import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function MovieInfo() {
  const { title } = useParams();  // Extract the movie title from the URL
  const [movieInfo, setMovieInfo] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovieInfo = async () => {
      setError('');
      try {
        const response = await fetch(`http://localhost:5000/movie/${title}`);
        if (!response.ok) {
          throw new Error('Movie not found');
        }
        const data = await response.json();
        setMovieInfo(data);
      } catch (err) {
        setError(err.message);
        setMovieInfo(null);
      }
    };

    fetchMovieInfo();
  }, [title]);  // Re-fetch when the title changes

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-5xl font-extrabold text-center mb-6 text-blue-400">Movie Info</h1>
      
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {movieInfo && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-lg flex">
          <div className="flex-1">
            <h2 className="text-3xl font-semibold text-gray-800">{movieInfo.title}</h2>
            <p><strong>Release Date:</strong> {movieInfo.release_date}</p>
            <p><strong>Genres:</strong> {movieInfo.genres}</p>
            <p><strong>Overview:</strong> {movieInfo.overview}</p>
            <p><strong>Budget:</strong> {movieInfo.budget}</p>
            <p><strong>Revenue:</strong> {movieInfo.revenue}</p>
            <p><strong>Vote Average:</strong> {movieInfo.vote_average}</p>
          </div>
          <div className="flex-shrink-0 ml-4">
            <img src={movieInfo.poster} alt={movieInfo.title} className="w-64 h-auto object-cover rounded-lg" />
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieInfo;