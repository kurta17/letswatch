import React, { useState } from "react";

function Recommendations() {
  const [movies, setMovies] = useState([]);
  const [movieTitle, setMovieTitle] = useState(""); // State for movie title input
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const fetchMovies = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`http://127.0.0.1:5000/helpmedicede?title=${movieTitle}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setMovies(data);  // Update the movies state with the fetched data
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError("Failed to fetch movie recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (movieTitle.trim() === "") {
      setError("Please enter a movie title to search.");
      return;
    }
    fetchMovies();
  };

  const handleClick = (title) => {
    alert(`You clicked on ${title}`);
  };

  return (
    <div>
      <h1 className="text-5xl font-extrabold text-center mb-6 text-blue-400">Movie Recommendations</h1>
      
      {/* Search Input */}
      <form className="text-center mb-6" onSubmit={handleSearch}>
        <input
          type="text"
          value={movieTitle}
          onChange={(e) => setMovieTitle(e.target.value)}
          placeholder="Search for a movie..."
          className="p-2 border rounded-lg w-2/3 sm:w-1/3"
        />
        <button
          type="submit"
          className="ml-2 p-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500"
        >
          Search
        </button>
      </form>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Loading Indicator */}
      {loading && <p className="text-center text-blue-400">Loading movies...</p>}

      {/* Movies Grid */}
      {!loading && !error && movies.length > 0 && (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
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
            <p className="text-gray-600">Release Date: {movie.release_date}</p>
            <p className="text-gray-600">Rating: {movie.vote_average}</p>
            <p className="text-gray-600">Votes: {movie.vote_count}</p>
          </div>
        ))}
      </div>
      
      )}

      {/* No Movies Found */}
      {!loading && !error && movies.length === 0 && (
        <p className="text-center text-gray-500">No movie recommendations found.</p>
      )}
    </div>
  );
}

export default Recommendations;