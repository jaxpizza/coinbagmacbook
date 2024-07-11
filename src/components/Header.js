import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Header = () => {
  const location = useLocation();

  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-teal-400">
        Coinbag <span className="text-xl font-normal text-gray-500">[Terminal]</span>
      </h1>
      {location.pathname !== '/' && (
        <Link to="/" className="text-teal-400">
          <ArrowLeft size={24} />
        </Link>
      )}
    </header>
  );
};

export default Header;
