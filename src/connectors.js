import { initializeConnector } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { WalletConnect as WalletConnectV2 } from '@web3-react/walletconnect-v2';
import { Web3Provider } from '@ethersproject/providers';

const metaMask = initializeConnector((actions) => new MetaMask({ actions }));

const walletConnect = initializeConnector((actions) => 
  new WalletConnectV2({
    actions,
    options: {
      projectId: 'cbe729cc88579a06d0a541be39043f8b', // Replace with your actual WalletConnect project ID
      chains: [1], // Mainnet
      showQrModal: true,
    },
  })
);

export const connectors = [metaMask, walletConnect];

export function useActiveProvider() {
  const [, metaMaskHooks] = metaMask;
  const [, walletConnectHooks] = walletConnect;
  
  const metaMaskProvider = metaMaskHooks.useProvider();
  const walletConnectProvider = walletConnectHooks.useProvider();

  const activeProvider = metaMaskProvider || walletConnectProvider;

  if (activeProvider) {
    return new Web3Provider(activeProvider);
  }

  return null;
}