import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import TokenSelection from './components/TokenSelection';
import JennerPage from './components/JennerPage';
import JennerSwapPage from './components/JennerSwapPage';

function App() {
  return (
    <Router>
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
