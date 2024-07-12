import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TokenSelection from './components/TokenSelection';
import JennerPage from './components/JennerPage';
import SwapPage from './components/SwapPage';
import Header from './components/Header';
import './styles/index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <Header />
        <Routes>
          <Route path="/" element={<TokenSelection />} />
          <Route path="/jenner" element={<JennerPage />} />
          <Route path="/jenner/swap" element={<SwapPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;