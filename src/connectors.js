import { initializeConnector } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { WalletConnect } from '@web3-react/walletconnect';

const metaMask = initializeConnector((actions) => new MetaMask(actions));
const walletConnect = initializeConnector(
  (actions) =>
    new WalletConnect(actions, {
      rpc: { 1: 'https://cloudflare-eth.com' },
    })
);

export const connectors = [metaMask, walletConnect];

export function useActiveProvider() {
  const [, hooks] = metaMask;
  const { useProvider } = hooks;
  return useProvider();
}