
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04M12 21a8.966 8.966 0 01-5.917-2.24L4 21l.5-4.5A8.966 8.966 0 013 12c0-2.43.97-4.63 2.54-6.24L4 2.1l4.5.5A8.966 8.966 0 0112 3c2.43 0 4.63.97 6.24 2.54L21.9 4l-.5 4.5a8.966 8.966 0 011.26 4.5c0 2.43-.97 4.63-2.54 6.24L20.5 21l-4.5-.5A8.966 8.966 0 0112 21z" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">VeriSight<span className="text-blue-500">AI</span></span>
            </Link>
          </div>
          <div className="flex space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-blue-400' : 'text-slate-400 hover:text-white'}`}
            >
              Home
            </Link>
            <Link 
              to="/detect" 
              className={`text-sm font-medium transition-colors ${isActive('/detect') ? 'text-blue-400' : 'text-slate-400 hover:text-white'}`}
            >
              Detect
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
