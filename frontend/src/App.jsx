import React from 'react';
import MovieList from './components/MovieList';
import Recommendations from './components/Recommendations';
import Navbar from './components/Navbar'; 

function App() {
  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <Navbar />
      <h1 className="text-2xl font-bold text-center mb-6">
        Movie Recommendation System
      </h1>
      <MovieList />
      <Recommendations />
    </div>
  );
}

export default App;
