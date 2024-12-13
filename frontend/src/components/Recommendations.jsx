import React, { useState } from "react";

function Recommendations() {
  const [movies, setMovies] = useState([]);
  const [movieTitle, setMovieTitle] = useState(""); // State for movie title input
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [suggestions, setSuggestions] = useState([]); // Suggestions state

  const fetchMovies = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`http://127.0.0.1:5000/helpmedicede?title=${movieTitle}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setMovies(data);  // Update the movies state with the fetched data

      // Extract suggested titles from the response (e.g., first title suggestions)
      if (Array.isArray(data) && data.length > 0) {
        const suggestedTitles = data[0]?.title || [];
        setSuggestions(suggestedTitles);
      }
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

      {/* Suggestions */}
      {!loading && !error && suggestions.length > 0 && (
        <div className="flex flex-col items-center p-4">
          <h3 className="font-bold text-lg mb-4 text-indigo-600">Suggested Titles</h3>
          <ul className="flex flex-wrap justify-center space-x-4 list-none p-0">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => setMovieTitle(suggestion)}
                className="cursor-pointer text-blue-500 hover:underline p-2 mb-2 rounded-lg border border-indigo-300 shadow-md bg-indigo-100 transition-transform hover:scale-105"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Movies Grid */}
      {!loading && !error && movies.length > 0 && (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {movies.map((movie, index) => (
            index > 0 && (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
                onClick={() => handleClick(movie.title)}
              >
                <img
                  src={movie.poster || "https://via.placeholder.com/300"}
                  alt={`${movie.title} Poster`}
                  className="w-full h-60 object-cover rounded-md mb-4"
                />
                <h3 className="font-bold text-lg text-indigo-600">{movie.title}</h3>
                <p className="text-gray-600">Release Date: {movie.release_date}</p>
                <p className="text-gray-600">Rating: {movie.vote_average}</p>
                <p className="text-gray-600">Votes: {movie.vote_count}</p>
              </div>
)
          ))}
        </div>
      )}
    </div>
  );
}

export default Recommendations;