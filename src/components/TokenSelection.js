import React from 'react';
import { Link } from 'react-router-dom';

const TokenSelection = () => {
  const tokens = [
    { symbol: 'JENNER', name: 'Jenner', blockchain: 'Ethereum' },
    // Add more tokens here as needed
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-teal-400 mb-6">Select a Token</h2>
      <div className="mb-6">
        <Link
          to="/swap"
          className="block w-full bg-teal-500 text-white py-3 px-4 rounded-lg text-center font-semibold hover:bg-teal-600 transition-colors"
        >
          Swap Tokens
        </Link>
      </div>
      <div className="grid gap-4">
        {tokens.map((token) => (
          <Link
            key={token.symbol}
            to={`/${token.symbol.toLowerCase()}`}
            className="bg-gray-800 p-4 rounded-lg text-left hover:bg-gray-700 transition-colors"
          >
            <h3 className="text-xl font-semibold text-teal-400">{token.symbol}</h3>
            <p className="text-sm text-gray-400">{token.name}</p>
            <p className="text-xs text-gray-500">{token.blockchain}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TokenSelection;