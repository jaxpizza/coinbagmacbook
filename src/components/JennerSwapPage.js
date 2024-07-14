import React, { useState, useEffect, useCallback } from 'react';
import { SwapWidget, Theme } from '@uniswap/widgets';
import '@uniswap/widgets/fonts.css';
import { JsonRpcProvider } from '@ethersproject/providers';
import { Token } from '@uniswap/sdk-core';

const JENNER_TOKEN_ADDRESS = '0x482702745260ffd69fc19943f70cffe2cacd70e9';
const WETH_ADDRESS = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
const ALCHEMY_API_KEY = process.env.REACT_APP_ALCHEMY_API_KEY;
const ALCHEMY_URL = process.env.REACT_APP_ALCHEMY_URL;

const JennerSwapPage = () => {
  const [provider, setProvider] = useState(null);
  const [error, setError] = useState(null);

  const initProvider = useCallback(async () => {
    try {
      const newProvider = new JsonRpcProvider(ALCHEMY_URL);
      await newProvider.getNetwork(); // Test the connection
      setProvider(newProvider);
    } catch (error) {
      console.error('Failed to initialize provider:', error);
      setError('Failed to connect to Ethereum network. Please try again later.');
    }
  }, []);

  useEffect(() => {
    initProvider();
  }, [initProvider]);

  const handleError = useCallback((error) => {
    console.error('Swap Widget Error:', error);
    setError('An error occurred while processing the swap. Please try again.');
  }, []);

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

  const jennerToken = new Token(1, JENNER_TOKEN_ADDRESS, 18, 'JENNER', 'Jenner Token');

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-semibold text-teal-400 mb-6 text-center">Swap Jenner Token</h2>
        <div id="swap-widget-container">
          {provider && (
            <SwapWidget
              provider={provider}
              jsonRpcEndpoint={ALCHEMY_URL}
              width="100%"
              tokenList={[jennerToken]}
              defaultInputTokenAddress="NATIVE"
              defaultOutputTokenAddress={JENNER_TOKEN_ADDRESS}
              onError={handleError}
              theme={Theme.DARK}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default JennerSwapPage;