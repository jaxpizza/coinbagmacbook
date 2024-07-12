import React, { useState, useEffect } from 'react';
import { SwapWidget } from '@uniswap/widgets';
import '@uniswap/widgets/fonts.css';
import { ethers } from 'ethers';

const JENNER_TOKEN_ADDRESS = '0x482702745260ffd69fc19943f70cffe2cacd70e9';

const JennerSwapPage = () => {
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const initProvider = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
      } else {
        console.error('No Web3 provider detected');
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

  if (!provider) {
    return <div className="text-white text-center">Please connect your wallet to use the swap feature.</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-semibold text-teal-400 mb-6 text-center">Swap Jenner Token</h2>
        <div id="swap-widget-container">
          <SwapWidget
            theme={theme}
            width="100%"
            jsonRpcEndpoint={provider.connection.url}
            tokenList="https://tokens.coingecko.com/uniswap/all.json"
            provider={provider}
            defaultInputTokenAddress="NATIVE"
            defaultOutputTokenAddress={JENNER_TOKEN_ADDRESS}
          />
        </div>
      </div>
    </div>
  );
};

export default JennerSwapPage;