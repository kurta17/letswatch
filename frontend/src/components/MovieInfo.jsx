import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function MovieInfo() {
  const { title } = useParams(); // Extract the movie title from the URL
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
  }, [title]); // Re-fetch when the title changes

  useEffect(() => {
    if (movieInfo?.trailer) {
      console.log(`Trailer URL: ${movieInfo.trailer}`);
    }
  }, [movieInfo]);

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-5xl font-extrabold text-center mb-6 text-indigo-600">Movie Info</h1>
      
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {movieInfo && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row">
          <div className="flex-1 mb-6 md:mb-0">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">{movieInfo.title}</h2>
            <p><strong>Release Date:</strong> {movieInfo.release_date}</p>
            <p><strong>Genres:</strong> {movieInfo.genres}</p>
            <p><strong>Overview:</strong> {movieInfo.overview}</p>
            <p><strong>Budget:</strong> {movieInfo.budget}</p>
            <p><strong>Revenue:</strong> {movieInfo.revenue}</p>
            <p><strong>Vote Average:</strong> {movieInfo.vote_average}</p>
          </div>
          <div className="flex-shrink-0 md:ml-6">
            <img src={movieInfo.poster} alt={movieInfo.title} className="w-full md:w-64 h-auto object-cover rounded-lg shadow-md" />
          </div>
        </div>
      )}

      {/* Trailer Section */}
      {movieInfo?.trailer && movieInfo.trailer !== "Trailer not available" && (
        <div className="mt-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Trailer</h3>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={movieInfo.trailer}
              title="Movie Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg shadow-md"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieInfo;