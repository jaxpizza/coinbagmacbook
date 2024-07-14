import React from 'react';
import { SwapWidget } from '@uniswap/widgets';
import '@uniswap/widgets/fonts.css';

const ALCHEMY_URL = process.env.REACT_APP_ALCHEMY_URL;

const TOKEN_LIST = [
  {
    name: 'Ethereum',
    address: 'NATIVE',
    symbol: 'ETH',
    decimals: 18,
    chainId: 1,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png'
  },
  {
    name: 'USD Coin',
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    symbol: 'USDC',
    decimals: 6,
    chainId: 1,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png'
  },
  {
    name: 'Jenner Token',
    address: '0x482702745260ffd69fc19943f70cffe2cacd70e9',
    symbol: 'JENNER',
    decimals: 18,
    chainId: 1,
    logoURI: 'https://example.com/jenner-logo.png' // Replace with actual logo URL if available
  }
];

const JennerSwapPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-semibold text-teal-400 mb-6 text-center">Swap Tokens</h2>
        <div id="swap-widget-container">
          <SwapWidget
            jsonRpcEndpoint={ALCHEMY_URL}
            tokenList={TOKEN_LIST}
            width="100%"
            defaultInputTokenAddress="NATIVE"
            defaultOutputTokenAddress="0x482702745260ffd69fc19943f70cffe2cacd70e9" // Jenner Token address
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