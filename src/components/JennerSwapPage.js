import React, { useState, useEffect, useCallback } from 'react';
import { SwapWidget, Theme } from '@uniswap/widgets';
import '@uniswap/widgets/fonts.css';
import { AlchemyProvider } from '@ethersproject/providers';
import { Pool } from '@uniswap/v3-sdk';
import { Token } from '@uniswap/sdk-core';
import { ethers } from 'ethers';

const JENNER_TOKEN_ADDRESS = '0x482702745260ffd69fc19943f70cffe2cacd70e9';
const JENNER_PAIR_ADDRESS = '0x8588f0c49849c011d5b5e3318bb0d1fb8534266b';
const WETH_ADDRESS = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
const ALCHEMY_API_KEY = process.env.REACT_APP_ALCHEMY_API_KEY;
const ALCHEMY_URL = process.env.REACT_APP_ALCHEMY_URL;

const JennerSwapPage = () => {
  const [provider, setProvider] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pool, setPool] = useState(null);

  const initProvider = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const newProvider = new AlchemyProvider('mainnet', ALCHEMY_API_KEY);
      await newProvider.ready;
      setProvider(newProvider);
    } catch (error) {
      console.error('Failed to initialize provider:', error);
      setError('Failed to connect to Ethereum network. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    initProvider();
  }, [initProvider]);

  useEffect(() => {
    const fetchPoolData = async () => {
      if (provider) {
        try {
          const jennerToken = new Token(1, JENNER_TOKEN_ADDRESS, 18, 'JENNER', 'Jenner Token');
          const wethToken = new Token(1, WETH_ADDRESS, 18, 'WETH', 'Wrapped Ether');

          const poolContract = new ethers.Contract(
            JENNER_PAIR_ADDRESS,
            ['function slot0() external view returns (uint160 sqrtPriceX96, int24 tick, uint16 observationIndex, uint16 observationCardinality, uint16 observationCardinalityNext, uint8 feeProtocol, bool unlocked)'],
            provider
          );

          const [slot0] = await Promise.all([
            poolContract.slot0(),
          ]);

          const newPool = new Pool(
            jennerToken,
            wethToken,
            3000,
            slot0.sqrtPriceX96.toString(),
            '1',
            slot0.tick
          );

          setPool(newPool);
        } catch (error) {
          console.error('Failed to fetch pool data:', error);
          setError('Failed to fetch pool data. Please try again later.');
        }
      }
    };

    fetchPoolData();
  }, [provider]);

  const handleError = useCallback((error) => {
    console.error('Swap Widget Error:', error);
    setError('An error occurred while processing the swap. Please try again.');
  }, []);

  if (isLoading) {
    return <div className="text-white text-center">Loading Swap Widget...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        {error}
        <button 
          onClick={initProvider} 
          className="mt-4 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  const jennerToken = {
    address: JENNER_TOKEN_ADDRESS,
    chainId: 1,
    symbol: 'JENNER',
    decimals: 18,
    name: 'Jenner Token'
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-semibold text-teal-400 mb-6 text-center">Swap Jenner Token</h2>
        <div id="swap-widget-container">
          <SwapWidget
            provider={provider}
            jsonRpcEndpoint={ALCHEMY_URL}
            width="100%"
            tokenList={[jennerToken]}
            defaultInputTokenAddress="NATIVE"
            defaultOutputTokenAddress={JENNER_TOKEN_ADDRESS}
            onError={handleError}
            pools={pool ? [pool] : undefined}
            theme={Theme.DARK}
          />
        </div>
      </div>
    </div>
  );
};

export default JennerSwapPage;