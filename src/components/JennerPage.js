import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { formatNumber, formatPercentage } from '../utils/formatters';

const fetchTokenData = async () => {
  try {
    const response = await axios.get('/.netlify/functions/getTokenData');
    console.log('Fetched data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching token data:', error);
    throw error;
  }
};

const JennerPage = () => {
  const [tokenData, setTokenData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchTokenData();
        console.log('Setting token data:', data);
        setTokenData(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch token data. Please try again later.');
        setLoading(false);
      }
    };

    loadData();
    const interval = setInterval(loadData, 300000); // Refresh every 5 minutes

    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="p-4 text-teal-400">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!tokenData) return null;

  console.log('Rendering with token data:', tokenData);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-teal-400 mb-6">{tokenData.name} ({tokenData.symbol})</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Price</h3>
          <p className="text-2xl text-teal-400">${formatNumber(tokenData.price)}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Market Cap</h3>
          <p className="text-2xl text-teal-400">${formatNumber(tokenData.marketCap)}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">24h Volume</h3>
          <p className="text-2xl text-teal-400">${formatNumber(tokenData.volume24h)}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">1h Change</h3>
          <p className={`text-2xl ${tokenData.percentChange1h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {formatPercentage(tokenData.percentChange1h)}
          </p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">24h Change</h3>
          <p className={`text-2xl ${tokenData.percentChange24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {formatPercentage(tokenData.percentChange24h)}
          </p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">7d Change</h3>
          <p className={`text-2xl ${tokenData.percentChange7d >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {formatPercentage(tokenData.percentChange7d)}
          </p>
        </div>
      </div>
      <div className="mt-6">
        <Link
          to="/jenner/swap"
          className="w-full bg-teal-500 text-white py-3 px-4 rounded-lg text-center font-semibold hover:bg-teal-600 transition-colors"
        >
          Swap Jenner Token
        </Link>
      </div>
    </div>
  );
};

export default JennerPage;