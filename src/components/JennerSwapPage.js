import React, { useState, useEffect } from 'react';
import { SwapWidget } from '@uniswap/widgets';
import '@uniswap/widgets/fonts.css';
import { ethers } from 'ethers';

const JENNER_TOKEN_ADDRESS = '0x482702745260ffd69fc19943f70cffe2cacd70e9';

const JennerSwapPage = () => {
  const [error, setError] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const initProvider = async () => {
      try {
        const newProvider = new ethers.providers.JsonRpcProvider('https://cloudflare-eth.com');
        await newProvider.ready;
        setProvider(newProvider);
      } catch (err) {
        console.error('Failed to initialize provider:', err);
        setError('Failed to connect to Ethereum network. Please try again later.');
      }
    };

    initProvider();
  }, []);

  const theme = {
    primary: '#1FC7D4',
    secondary: '#7645D9',
    interactive: '#31D0AA',
    container: '#383241',
    module: '#27262C',
    accent: '#9A6AFF',
    outline: '#4D4D5A',
    dialog: '#27262C',
    fontFamily: '"Kanit", sans-serif',
    borderRadius: 0.5,
  };

  const handleError = (error) => {
    console.error('Swap widget error:', error);
    setError('An error occurred while loading the swap widget. Please try again later.');
  };

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!provider) {
    return <div className="text-white text-center">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-semibold text-teal-400 mb-6 text-center">Swap Jenner Token</h2>
        <div id="swap-widget-container">
          <SwapWidget
            theme={theme}
            width="100%"
            tokenList={[
              {
                address: JENNER_TOKEN_ADDRESS,
                chainId: 1,
                name: 'Jenner',
                symbol: 'JENNER',
                decimals: 18,
                logoURI: 'https://example.com/jenner-logo.png'
              }
            ]}
            defaultOutputTokenAddress={JENNER_TOKEN_ADDRESS}
            onError={handleError}
            provider={provider}
            locale="en-US"
          />
        </div>
      </div>
    </div>
  );
};

export default JennerSwapPage;
