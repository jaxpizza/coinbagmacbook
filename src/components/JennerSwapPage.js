import React, { useState, useEffect, useCallback } from 'react';
import { SwapWidget, Theme } from '@uniswap/widgets';
import '@uniswap/widgets/fonts.css';
import { JsonRpcProvider } from '@ethersproject/providers';
import { AlphaRouter } from '@uniswap/smart-order-router';
import { Token, ChainId } from '@uniswap/sdk-core';

const JENNER_TOKEN_ADDRESS = '0x482702745260ffd69fc19943f70cffe2cacd70e9';
const WETH_ADDRESS = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
const ALCHEMY_URL = process.env.REACT_APP_ALCHEMY_URL;

console.log('ALCHEMY_URL:', ALCHEMY_URL);

const JennerSwapPage = () => {
  const [provider, setProvider] = useState(null);
  const [router, setRouter] = useState(null);

  useEffect(() => {
    const initProvider = async () => {
      if (ALCHEMY_URL) {
        console.log('Initializing provider with URL:', ALCHEMY_URL);
        try {
          const newProvider = new JsonRpcProvider(ALCHEMY_URL);
          await newProvider.ready;
          setProvider(newProvider);

          // Initialize AlphaRouter
          const alphaRouter = new AlphaRouter({ chainId: ChainId.MAINNET, provider: newProvider });
          setRouter(alphaRouter);
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

  if (!provider || !router) {
    return <div className="text-white text-center">Loading Swap Widget...</div>;
  }

  const jennerToken = new Token(
    ChainId.MAINNET,
    JENNER_TOKEN_ADDRESS,
    18,
    'JENNER',
    'Jenner Token'
  );

  const wethToken = new Token(
    ChainId.MAINNET,
    WETH_ADDRESS,
    18,
    'WETH',
    'Wrapped Ether'
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-semibold text-teal-400 mb-6 text-center">Swap Jenner Token</h2>
        <div id="swap-widget-container">
          <SwapWidget
            provider={provider}
            jsonRpcEndpoint={ALCHEMY_URL}
            tokenList={[jennerToken, wethToken]}
            defaultInputTokenAddress={WETH_ADDRESS}
            defaultOutputTokenAddress={JENNER_TOKEN_ADDRESS}
            onError={handleError}
            routerUrl={ALCHEMY_URL} // This enables auto-routing
            router={router} // Pass the AlphaRouter instance
            locale="en-US"
            theme={Theme.DARK}
          />
        </div>
      </div>
    </div>
  );
};

export default JennerSwapPage;