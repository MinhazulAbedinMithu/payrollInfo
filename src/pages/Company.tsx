import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CompanyInfo from '../components/company/CompanyInfo';
import CompanyContact from '../components/company/CompanyContact';


const Company: React.FC = () => {
  return (
    <div>
        <div className='flex items-center justify-between border-b py-3 px-2'>
            <div>
                <h5 className='font-medium text-base'>Core company Details</h5>
                <h3 className='text-[22px] font-bold'>Company Information</h3>
                <p><small>*All fields are required for page submission</small></p>
            </div>
            <div>
                <p>Last updated on 08/12/2023 at 3:48 PM</p>
                <p className='pt-3'>Assigned to <span className='p-2 rounded-3xl border'>Andrew Adams(You)</span></p>
            </div>
        </div>
        <div className='p-2 bg-gray-100 w-full min-h-[83vh] h-full py-6'>
        <Routes>
            <Route path="/" element={<div className="p-4">Company Details</div>} />
            <Route path="info" element={<CompanyInfo />} />
            <Route path="contacts" element={<CompanyContact />} />
        </Routes>
        </div>
    </div>
  );
};

export default Company;