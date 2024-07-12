import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { en } from 'make-plural/plurals';
import Header from './components/Header';
import TokenSelection from './components/TokenSelection';
import JennerPage from './components/JennerPage';
import JennerSwapPage from './components/JennerSwapPage';

// Initialize i18n
i18n.loadLocaleData('en', { plurals: en });
i18n.activate('en');

function App() {
  return (
    <I18nProvider i18n={i18n}>
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
    </I18nProvider>
  );
}

export default App;