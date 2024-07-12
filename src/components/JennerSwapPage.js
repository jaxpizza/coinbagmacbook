import React, { useState, useEffect } from 'react';
import { SwapWidget } from '@uniswap/widgets';
import '@uniswap/widgets/fonts.css';
import { ethers } from 'ethers';

const JENNER_TOKEN_ADDRESS = '0x482702745260ffd69fc19943f70cffe2cacd70e9';
const INFURA_URL = 'https://mainnet.infura.io/v3/74a98635df5441ecb1c980e3aa9c63bf';

const JennerSwapPage = () => {
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const initProvider = async () => {
      try {
        const newProvider = new ethers.providers.JsonRpcProvider(INFURA_URL);
        await newProvider.ready;
        setProvider(newProvider);
      } catch (error) {
        console.error('Failed to initialize provider:', error);
      }
    };
    initProvider();
  }, []);

  if (!provider) {
    return <div className="text-white text-center">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-semibold text-teal-400 mb-6 text-center">Swap Jenner Token</h2>
        <div id="swap-widget-container">
          <SwapWidget
            provider={provider}
            jsonRpcEndpoint={INFURA_URL}
            tokenList={[JENNER_TOKEN_ADDRESS]}
            defaultInputTokenAddress="NATIVE"
            defaultOutputTokenAddress={JENNER_TOKEN_ADDRESS}
          />
        </div>
      </div>
    </div>
  );
};

export default JennerSwapPage;