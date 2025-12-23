
import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetectPage from './pages/DetectPage';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/detect" element={<DetectPage />} />
          </Routes>
        </main>
        <footer className="border-t border-slate-800 py-8 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-500 text-sm">
            <p>© 2024 VeriSight AI. This tool is for educational and verification purposes only.</p>
            <p className="mt-2">Powered by Advanced Neural Forensics.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
