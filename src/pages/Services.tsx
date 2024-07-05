import React from 'react';
import { Routes, Route } from 'react-router-dom';

const Service1: React.FC = () => <div className="p-4">Service1 Page</div>;
const Service2: React.FC = () => <div className="p-4">Service2 Page</div>;
const Service3: React.FC = () => <div className="p-4">Service3 Page</div>;

const Services: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<div className="p-4">Services Page</div>} />
      <Route path="service1" element={<Service1 />} />
      <Route path="service2" element={<Service2 />} />
      <Route path="service3" element={<Service3 />} />
    </Routes>
  );
};

export default Services;