import React from 'react';
import { connectors } from '../connectors';

const Web3Connectors = () => {
  return (
    <div className="flex space-x-4">
      {connectors.map(([connector, hooks], index) => {
        const isActive = hooks.useIsActive();
        return (
          <button
            key={index}
            onClick={() => connector.activate()}
            className={`px-4 py-2 rounded-md ${
              isActive ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            {connector.constructor.name}
          </button>
        );
      })}
    </div>
  );
};

export default Web3Connectors;
