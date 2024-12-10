import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieList from './components/MovieList';
import Recommendations from './components/Recommendations';
import Navbar from './components/Navbar';
import TopMovies from './components/TopMovies';
import MovieInfo from './components/MovieInfo';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleBackground = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Router>
      <div className={`min-h-screen p-4 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <Navbar toggleBackground={toggleBackground} />
        <Routes>
          <Route path="/" element={<TopMovies />} />
          <Route path="/movies" element={<MovieList />} />
          <Route path="/help" element={<Recommendations />} />
          <Route path="/movie/:title" element={<MovieInfo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;