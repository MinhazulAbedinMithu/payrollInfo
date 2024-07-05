import React from 'react';
import { Routes, Route } from 'react-router-dom';

const Cat1: React.FC = () => <div className="p-4">Cat1 Page</div>;
const Cat2: React.FC = () => <div className="p-4">Cat2 Page</div>;
const Cat3: React.FC = () => <div className="p-4">Cat3 Page</div>;

const Categories: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<div className="p-4">Categories Page</div>} />
      <Route path="cat1" element={<Cat1 />} />
      <Route path="cat2" element={<Cat2 />} />
      <Route path="cat3" element={<Cat3 />} />
    </Routes>
  );
};

export default Categories;