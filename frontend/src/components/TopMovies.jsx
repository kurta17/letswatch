import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Chatbox from './Chatbox'; // Import the Chatbox component

function TopMovies() {
  const [topMovies, setTopMovies] = useState([]);  // State to store the movie data
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        console.log('Fetching movies...');
        const response = await fetch('http://127.0.0.1:5000/top20movies');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched data:', data);
        setTopMovies(data);  // Set the top 20 movies
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
    <div style={{ 'width': '80rem' }} className="mx-auto p-4">
      <h1 className="text-5xl font-extrabold text-center mb-20 text-blue-400 mt-4">Top 20 Movies</h1>
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
      <Chatbox /> {/* Include the Chatbox component here */}
    </div>
  );
}

export default TopMovies;
