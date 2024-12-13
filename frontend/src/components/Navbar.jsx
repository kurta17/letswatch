import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Navbar({ toggleBackground }) {
  return (
    <nav className="bg-blue-400 text-white p-4 shadow-md rounded-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold hover:text-gray-200">
          Let's Watch
        </Link>
        <div className="flex space-x-4 items-center">
          <Link to="/" className="hover:text-gray-200 transition-colors">
            Home
          </Link>
          <Link to="/movies" className="hover:text-gray-200 transition-colors">
            Movies
          </Link>
          <Link to="/helpmedicede" className="hover:text-gray-200 transition-colors">
            Help Me Decide
          </Link>
          <button onClick={toggleBackground} className="text-xl hover:text-gray-200 transition-colors">
            <FontAwesomeIcon icon={faMoon} />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;