import React from 'react';
import { HeroUIProvider } from '@heroui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ToastProvider from './components/ui/ToastProvider';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import './index.css';

const App: React.FC = () => {
  return (
    <HeroUIProvider>
      <ToastProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </main>
          </div>
        </Router>
      </ToastProvider>
    </HeroUIProvider>
  );
};

export default App;
