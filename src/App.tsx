import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Services from './pages/Services';
import PayrollInfo from './pages/PayrollInfo';
import Categories from './pages/Categories';
import Sidebar from './components/Sidebar';
import Company from './pages/Company';

const App: React.FC = () => {
  const [isSidebarExpanded, setSidebarExpanded] = useState<boolean>(true);

  const toggleSidebar = () => {
    setSidebarExpanded(prevState => !prevState);
  };

  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar isExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} />
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services/*" element={<Services />} />
            <Route path="/company/*" element={<Company />} />
            <Route path="/payroll/*" element={<PayrollInfo />} />
            <Route path="/categories/*" element={<Categories />} />
          </Routes>
        </div>
      </div>
      
    </Router>
  );
};

export default App;