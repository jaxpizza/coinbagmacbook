import React, { useState, useEffect, useCallback } from 'react';
import { SwapWidget, Theme } from '@uniswap/widgets';
import '@uniswap/widgets/fonts.css';
import { ethers } from 'ethers';

const JENNER_TOKEN_ADDRESS = '0x482702745260ffd69fc19943f70cffe2cacd70e9';
const INFURA_URL = 'https://mainnet.infura.io/v3/74a98635df5441ecb1c980e3aa9c63bf';

const JennerSwapPage = () => {
  const [provider, setProvider] = useState(null);
  const [lastFetchTime, setLastFetchTime] = useState(0);

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

  const theme: Theme = {
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

  const tokenList = [
    {
      name: 'Jenner',
      address: JENNER_TOKEN_ADDRESS,
      symbol: 'JENNER',
      decimals: 18,
      chainId: 1,
      logoURI: 'https://example.com/jenner-logo.png'
    },
    {
      name: 'Wrapped Ether',
      address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      symbol: 'WETH',
      decimals: 18,
      chainId: 1,
      logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png'
    },
    {
      name: 'USD Coin',
      address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      symbol: 'USDC',
      decimals: 6,
      chainId: 1,
      logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png'
    }
  ];

  const debouncedFetcher = useCallback(async (url, options) => {
    const now = Date.now();
    if (now - lastFetchTime < 10000) {
      console.log('Throttled request');
      return null;
    }
    setLastFetchTime(now);
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }, [lastFetchTime]);

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
            tokenList={tokenList}
            defaultInputTokenAddress="NATIVE"
            defaultOutputTokenAddress={JENNER_TOKEN_ADDRESS}
            convenienceFee={0}
            convenienceFeeRecipient={JENNER_TOKEN_ADDRESS}
            locale="en-US"
            routerUrl="https://api.uniswap.org/v1/"
            fetcher={debouncedFetcher}
          />
        </div>
      </div>
    </div>
  );
};

export default JennerSwapPage;