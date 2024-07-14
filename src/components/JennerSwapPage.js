import React, { useState, useEffect, useCallback } from 'react';
import { SwapWidget } from '@uniswap/widgets';
import '@uniswap/widgets/fonts.css';
import { JsonRpcProvider } from '@ethersproject/providers';
import { Token } from '@uniswap/sdk-core';

const JENNER_TOKEN_ADDRESS = '0x482702745260ffd69fc19943f70cffe2cacd70e9';
const WETH_ADDRESS = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
const ALCHEMY_URL = process.env.REACT_APP_ALCHEMY_URL;

const JennerSwapPage = () => {
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const initProvider = async () => {
      const newProvider = new JsonRpcProvider(ALCHEMY_URL);
      await newProvider.ready;
      setProvider(newProvider);
    };
    initProvider();
  }, []);

  const jennerToken = new Token(1, JENNER_TOKEN_ADDRESS, 18, 'JENNER', 'Jenner Token');

  const handleError = useCallback((error) => {
    console.error('Swap Widget Error:', error);
  }, []);

  if (!provider) {
    return <div className="text-white text-center">Loading Swap Widget...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-semibold text-teal-400 mb-6 text-center">Swap Jenner Token</h2>
        <div id="swap-widget-container">
          <SwapWidget
            provider={provider}
            jsonRpcEndpoint={ALCHEMY_URL}
            tokenList={[jennerToken]}
            defaultInputTokenAddress="NATIVE"
            defaultOutputTokenAddress={JENNER_TOKEN_ADDRESS}
            onError={handleError}
            theme={{
              primary: '#FFF',
              secondary: '#A9A9A9',
              interactive: '#000',
              container: '#4E4E5A',
              module: '#222633',
              accent: '#71FF98',
              outline: '#CC1',
              dialog: '#000',
              fontFamily: 'Inter, sans-serif',
              borderRadius: 0.5,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default JennerSwapPage;