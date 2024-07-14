import React, { useState, useEffect, useCallback } from 'react';
import { SwapWidget } from '@uniswap/widgets';
import '@uniswap/widgets/fonts.css';
import { JsonRpcProvider } from '@ethersproject/providers';

const ALCHEMY_URL = process.env.REACT_APP_ALCHEMY_URL;

const JennerSwapPage = () => {
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const initProvider = async () => {
      if (ALCHEMY_URL) {
        try {
          const newProvider = new JsonRpcProvider(ALCHEMY_URL);
          await newProvider.ready;
          setProvider(newProvider);
        } catch (error) {
          console.error('Error initializing provider:', error);
        }
      } else {
        console.error('Alchemy URL is not set');
      }
    };
    initProvider();
  }, []);

  const handleError = useCallback((error) => {
    console.error('Swap Widget Error:', error);
  }, []);

  if (!provider) {
    return <div className="text-white text-center">Loading Swap Widget...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-semibold text-teal-400 mb-6 text-center">Swap Tokens</h2>
        <div id="swap-widget-container">
          <SwapWidget
            provider={provider}
            jsonRpcEndpoint={ALCHEMY_URL}
            width="100%"
            onError={handleError}
          />
        </div>
      </div>
    </div>
  );
};

export default JennerSwapPage;