import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Web3ReactProvider } from '@web3-react/core';
import Header from './components/Header';
import TokenSelection from './components/TokenSelection';
import JennerPage from './components/JennerPage';
import SwapPage from './components/SwapPage';
import { connectors } from './connectors';

function App() {
  return (
    <Web3ReactProvider connectors={connectors}>
      <Router>
        <div className="App bg-gray-900 min-h-screen text-white">
          <Header />
          <Routes>
            <Route path="/" element={<TokenSelection />} />
            <Route path="/jenner" element={<JennerPage />} />
            <Route path="/swap" element={<SwapPage />} />
          </Routes>
        </div>
      </Router>
    </Web3ReactProvider>
  );
}

export default App;
