import React from 'react';

const topMovies = [
  { id: 1, title: 'Movie 1', image: 'path/to/image1.jpg' },
  { id: 2, title: 'Movie 2', image: 'path/to/image2.jpg' },
  { id: 3, title: 'Movie 3', image: 'path/to/image3.jpg' },
  { id: 4, title: 'Movie 4', image: 'path/to/image4.jpg' },
  { id: 5, title: 'Movie 5', image: 'path/to/image5.jpg' },
  { id: 6, title: 'Movie 6', image: 'path/to/image6.jpg' },
  { id: 7, title: 'Movie 7', image: 'path/to/image7.jpg' },
  { id: 8, title: 'Movie 8', image: 'path/to/image8.jpg' },
  { id: 9, title: 'Movie 9', image: 'path/to/image9.jpg' },
  { id: 10, title: 'Movie 10', image: 'path/to/image10.jpg' },
  { id: 11, title: 'Movie 11', image: 'path/to/image11.jpg' },
  { id: 12, title: 'Movie 12', image: 'path/to/image12.jpg' },
  { id: 13, title: 'Movie 13', image: 'path/to/image13.jpg' },
  { id: 14, title: 'Movie 14', image: 'path/to/image14.jpg' },
  { id: 15, title: 'Movie 15', image: 'path/to/image15.jpg' },
  { id: 16, title: 'Movie 16', image: 'path/to/image16.jpg' },
  { id: 17, title: 'Movie 17', image: 'path/to/image17.jpg' },
  { id: 18, title: 'Movie 18', image: 'path/to/image18.jpg' },
  { id: 19, title: 'Movie 19', image: 'path/to/image19.jpg' },
  { id: 20, title: 'Movie 20', image: 'path/to/image20.jpg' },
];

function TopMovies() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-4xl font-extrabold text-center mb-20 text-indigo-600">Top 20 Movies</h1>
      <div className="flex overflow-x-auto space-x-4 pb-4">
        {topMovies.map(movie => (
          <div key={movie.id} className="min-w-[250px] bg-white p-4 rounded-lg shadow-lg transform transition-transform hover:scale-105">
            <img src={movie.image} alt={movie.title} className="w-full h-60 object-cover rounded-lg mb-4" />
            <h2 className="text-xl font-semibold text-gray-800">{movie.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopMovies;
