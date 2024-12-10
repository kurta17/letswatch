import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TopMovies() {
  const [topMovies, setTopMovies] = useState([]);  // State to store the movie data
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the top 20 movies from your backend or API
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/movies'); // Replace with actual API endpoint
        const data = await response.json();
        setTopMovies(data.slice(0, 20));  // Get top 20 movies
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    fetchMovies();
  }, []);  // Empty dependency array to fetch data on component mount

  const handleClick = (title) => {
    navigate(`/movie/${title}`);
  };

  return (
    <div style={{'width': '80rem'}} className="mx-auto p-4">
      <h1 className="text-5xl font-extrabold text-center mb-20 text-blue-400">Top 20 Movies</h1>
      <div className="flex overflow-x-auto space-x-4 pb-4">
        {topMovies.map((movie, index) => (
          <div
            key={index}
            className="min-w-[250px] bg-white p-4 rounded-lg shadow-lg transform transition-transform hover:scale-105"
            onClick={() => handleClick(movie.title)} // Click handler for redirection
          >
            <img
              src={movie.poster || "https://via.placeholder.com/300x450?text=No+Poster"}
              alt={movie.title}
              className="w-full h-60 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800">{movie.title}</h2>
            <p className="text-sm text-gray-500">{movie.release_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopMovies;
