import React, { useState, useEffect, useCallback } from 'react';
import { SwapWidget } from '@uniswap/widgets';
import '@uniswap/widgets/fonts.css';
import { ethers } from 'ethers';

const JENNER_TOKEN_ADDRESS = '0x482702745260ffd69fc19943f70cffe2cacd70e9';
const INFURA_URL = 'https://mainnet.infura.io/v3/74a98635df5441ecb1c980e3aa9c63bf';

const JennerSwapPage = () => {
  const [provider, setProvider] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const initProvider = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const newProvider = new ethers.providers.JsonRpcProvider(INFURA_URL);
      await newProvider.ready;
      setProvider(newProvider);
    } catch (error) {
      console.error('Failed to initialize provider:', error);
      setError('Failed to connect to Ethereum network. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    initProvider();
  }, [initProvider]);

  const handleError = useCallback((error) => {
    console.error('Swap Widget Error:', error);
    setError('An error occurred while processing the swap. Please try again.');
  }, []);

  if (isLoading) {
    return <div className="text-white text-center">Loading Swap Widget...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        {error}
        <button 
          onClick={initProvider} 
          className="mt-4 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-semibold text-teal-400 mb-6 text-center">Swap Jenner Token</h2>
        <div id="swap-widget-container">
          <SwapWidget
            provider={provider}
            jsonRpcEndpoint={INFURA_URL}
            width="100%"
            tokenList={[JENNER_TOKEN_ADDRESS]}
            defaultInputTokenAddress="NATIVE"
            defaultOutputTokenAddress={JENNER_TOKEN_ADDRESS}
            onError={handleError}
          />
        </div>
      </div>
    </div>
  );
};

export default JennerSwapPage;