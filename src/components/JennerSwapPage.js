import React, { useState, useEffect } from 'react';
import { SwapWidget } from '@uniswap/widgets';
import '@uniswap/widgets/fonts.css';
import { ethers } from 'ethers';

const JENNER_TOKEN_ADDRESS = '0x482702745260ffd69fc19943f70cffe2cacd70e9';
const INFURA_URL = 'https://mainnet.infura.io/v3/74a98635df5441ecb1c980e3aa9c63bf'; // Replace with your Infura project ID

const JennerSwapPage = () => {
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const initProvider = async () => {
      try {
        const newProvider = new ethers.providers.JsonRpcProvider(INFURA_URL);
        await newProvider.ready;
        if (isMounted) {
          setProvider(newProvider);
        }
      } catch (error) {
        console.error('Failed to initialize provider:', error);
      }
    };
    initProvider();
    return () => {
      isMounted = false;
    };
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
            provider={provider}
            jsonRpcEndpoint={INFURA_URL}
            tokenList="/api/tokens"
            defaultInputTokenAddress="NATIVE"
            defaultOutputTokenAddress={JENNER_TOKEN_ADDRESS}
            convenienceFee={0}
            convenienceFeeRecipient={JENNER_TOKEN_ADDRESS}
          />
        </div>
      </div>
    </div>
  );
};

export default JennerSwapPage;