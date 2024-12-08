import React from 'react';

function Navbar() {
  return (
    <nav className="bg-blue-500 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-xl font-bold hover:text-gray-200">
          Let's Watch
        </a>
        <div className="flex space-x-4">
          <a
            href="/"
            className="hover:text-gray-200 transition-colors"
          >
            Home
          </a>
          <a
            href="/movies"
            className="hover:text-gray-200 transition-colors"
          >
            Movies
          </a>
          <a
            href="/help"
            className="hover:text-gray-200 transition-colors"
          >
            Help
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
