import React from 'react';
import { connectors } from '../connectors';

const Web3Connectors = () => {
  return (
    <div className="flex space-x-4">
      {connectors.map(([connector, hooks], index) => {
        const isActive = hooks.useIsActive();
        const isActivating = hooks.useIsActivating();
        const error = hooks.useError();

        return (
          <button
            key={index}
            onClick={() => {
              if (isActive) {
                connector.deactivate();
              } else if (!isActivating) {
                connector.activate();
              }
            }}
            disabled={isActivating}
            className={`px-4 py-2 rounded-md ${
              isActive ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-800'
            } ${isActivating ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {connector.constructor.name === 'WalletConnect' ? 'WalletConnect' : 'MetaMask'}
            {isActivating && ' (connecting...)'}
            {error && ` (${error.name})`}
          </button>
        );
      })}
    </div>
  );
};

export default Web3Connectors;
