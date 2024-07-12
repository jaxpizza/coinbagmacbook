import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from './components/Header';
import TokenSelection from './components/TokenSelection';
import JennerPage from './components/JennerPage';
import JennerSwapPage from './components/JennerSwapPage';

function App() {
  return (
    <Router>
      <Helmet>
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; connect-src 'self' https://api.coinmarketcap.com https://api.uniswap.org https://*.infura.io wss://relay.walletconnect.com wss://relay.walletconnect.org https://*.alchemyapi.io https://cloudflare-ipfs.com https://*.uniswap.org https://tokens.coingecko.com https://api.coingecko.com https://verify.walletconnect.com https://verify.walletconnect.org https://explorer-api.walletconnect.com https://cloudflare-eth.com https://gateway.ipfs.io; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;" />
      </Helmet>
      <div className="App bg-gray-900 min-h-screen text-white">
        <Header />
        <Routes>
          <Route path="/" element={<TokenSelection />} />
          <Route path="/jenner" element={<JennerPage />} />
          <Route path="/jenner/swap" element={<JennerSwapPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;