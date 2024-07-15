import React, { useCallback, useRef, useEffect } from 'react';
import { SwapWidget } from '@uniswap/widgets';
import '@uniswap/widgets/fonts.css';
import { useActiveProvider } from '../connectors';
import Web3Connectors from './Web3Connectors';

const JSON_RPC_URL = 'https://cloudflare-eth.com';
const TOKEN_LIST = 'https://gateway.ipfs.io/ipns/tokens.uniswap.org';
const UNI = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984';

const SwapPage = () => {
  const connectors = useRef(null);
  const focusConnectors = useCallback(() => connectors.current?.focus(), []);
  const provider = useActiveProvider();

  useEffect(() => {
    console.log('Provider:', provider);
    console.log('Provider type:', provider ? typeof provider : 'null');
    console.log('Provider methods:', provider ? Object.keys(provider) : 'null');
  }, [provider]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      <h1 className="text-4xl font-bold text-teal-400 mb-4">Swap Tokens</h1>
      <div className="mb-4" ref={connectors} tabIndex={-1}>
        <Web3Connectors />
      </div>
      <div className="bg-white rounded-lg p-4">
        {provider ? (
          <>
            <p className="text-gray-800 mb-4">Provider connected. Attempting to render SwapWidget.</p>
            <SwapWidget
              jsonRpcEndpoint={JSON_RPC_URL}
              tokenList={TOKEN_LIST}
              provider={provider}
              locale="en-US"
              onConnectWallet={focusConnectors}
              defaultInputTokenAddress="NATIVE"
              defaultInputAmount="1"
              defaultOutputTokenAddress={UNI}
              width={360}
              theme={{
                primary: '#1fc7d4',
                secondary: '#666666',
                interactive: '#eeeeee',
                container: '#ffffff',
                module: '#fafafa',
                accent: '#1fc7d4',
                outline: '#cccccc',
                dialog: '#ffffff',
                fontFamily: 'Inter, sans-serif',
              }}
            />
          </>
        ) : (
          <p className="text-gray-800">Please connect your wallet to use the swap widget. Provider: {provider ? 'Available' : 'Not Available'}</p>
        )}
      </div>
    </div>
  );
};

export default SwapPage;