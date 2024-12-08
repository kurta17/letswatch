import React, { useEffect, useState } from 'react';

function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Mock movie data
    const mockMovies = [
      { id: 1, title: 'Inception', genre: 'Sci-Fi' },
      { id: 2, title: 'The Dark Knight', genre: 'Action' },
      { id: 3, title: 'Interstellar', genre: 'Sci-Fi' },
      { id: 4, title: 'The Matrix', genre: 'Sci-Fi' },
    ];
    setMovies(mockMovies);
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
        >
          <h3 className="font-bold text-lg">{movie.title}</h3>
          <p className="text-gray-600">{movie.genre}</p>
        </div>
      ))}
    </div>
  );
}

export default MovieList;
