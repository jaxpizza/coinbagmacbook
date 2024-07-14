import React from 'react';
import { Link } from 'react-router-dom';

const SwapPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      <h1 className="text-4xl font-bold text-teal-400 mb-4">Swap Feature</h1>
      <p className="text-xl text-white mb-8">Coming Soon!</p>
      <Link
        to="/"
        className="bg-teal-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-teal-600 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default SwapPage;