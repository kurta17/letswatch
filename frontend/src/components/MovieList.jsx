import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(`http://localhost:5000/movies?page=${currentPage}`);
      const data = await response.json();
      setMovies(data.movies);
      setTotalPages(data.total_pages);
    };

    fetchMovies();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - 3);
    const endPage = Math.min(totalPages, currentPage + 3);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      pages.push(totalPages);
    }

    return pages.map((pageNumber) => (
      <button
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
        className={`px-4 py-2 mx-1 rounded ${pageNumber === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
      >
        {pageNumber}
      </button>
    ));
  }; 

  const handleClick = (title) => {
    navigate(`/movie/${title}`);
  };

  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const toggleBackground = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="max-w-8xl mx-auto">
      <h1 className="text-5xl font-extrabold text-center mb-6 text-blue-400 mt-6">Movies</h1>
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
            <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}>{movie.title}</h3>            
            <p className="text-gray-600">{movie.genres}</p>
            <p className="text-gray-600">Release Date: {movie.release_date}</p>
            <p className="text-gray-600">Rating: {movie.vote_average}</p>
            <p className="text-gray-600">Votes: {movie.vote_count}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        {renderPagination()}
      </div>
    </div>
  );
}

export default MovieList;