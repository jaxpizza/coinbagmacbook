import React from 'react';
import { Link } from 'react-router-dom';
import { SwapWidget } from '@uniswap/widgets';
import '@uniswap/widgets/fonts.css';
import { ArrowLeft } from 'lucide-react';

const MY_TOKEN_LIST = [
  {
    "name": "Ethereum",
    "address": "NATIVE",
    "symbol": "ETH",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png"
  },
  {
    "name": "Jenner Token",
    "address": "0x482702745260ffd69fc19943f70cffe2cacd70e9",
    "symbol": "JENNER",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://example.com/jenner-logo.png" // Replace with actual logo URL if available
  }
];

const JennerSwapPage = () => {
  const handleError = (error) => {
    console.error('Swap Widget Error:', error);
    // You can add more error handling logic here
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 p-4">
      <div className="mb-4">
        <Link to="/jenner" className="text-teal-400 flex items-center">
          <ArrowLeft size={24} className="mr-2" />
          Back to Jenner Token
        </Link>
      </div>
      <div className="flex-grow flex justify-center items-center">
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
          <h2 className="text-2xl font-semibold text-teal-400 mb-6 text-center">Swap Jenner Token</h2>
          <SwapWidget
            jsonRpcEndpoint={process.env.REACT_APP_ALCHEMY_URL}
            tokenList={MY_TOKEN_LIST}
            width="100%"
            defaultInputTokenAddress="NATIVE"
            defaultOutputTokenAddress="0x482702745260ffd69fc19943f70cffe2cacd70e9"
            onError={handleError}
          />
        </div>
      </div>
    </div>
  );
};

export default JennerSwapPage;