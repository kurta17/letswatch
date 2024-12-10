import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    fetch("http://127.0.0.1:5000/movies")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch movie data");
        }
        return response.json();
      })
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  const handleClick = (title) => {
    navigate(`/movie/${title}`);
  };

  return (
    <div className="p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {movies.map((movie, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
          onClick={() => handleClick(movie.title)}
        >
          <img
            src={movie.poster || "https://via.placeholder.com/300"}
            alt={`${movie.title} Poster`}
            className="w-full h-auto rounded-md mb-4"
          />
          <h3 className="font-bold text-lg">{movie.title}</h3>
          <p className="text-gray-600">{movie.genres}</p>
          <p className="text-gray-600">Release Date: {movie.release_date}</p>
          <p className="text-gray-600">Rating: {movie.vote_average}</p>
          <p className="text-gray-600">Votes: {movie.vote_count}</p>
        </div>
      ))}
    </div>
  );
}

export default MovieList;
