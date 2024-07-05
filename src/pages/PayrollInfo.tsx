import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PayrollProvider from '../components/PayrollProviderC';


const PayrollProvider2: React.FC = () => <div className="p-4">Service2 Page</div>;
const PayrollProvider3: React.FC = () => <div className="p-4">Service3 Page</div>;

const PayrollInfo: React.FC = () => {
  return (
    <div>
        <div className='flex items-center justify-between border-b py-3 px-2'>
            <div>
                <h5 className='font-medium text-base'>Payroll Information</h5>
                <h3 className='text-[22px] font-bold'>Payroll Provider</h3>
                <p><small>*All fields are required for page submission</small></p>
            </div>
            <div>
                <p>Last updated on 08/12/2023 at 3:48 PM</p>
                <p className='pt-3'>Assigned to <span className='p-2 rounded-3xl border'>Andrew Adams(You)</span></p>
            </div>
        </div>
        <div className='p-2 bg-gray-100 w-full min-h-[83vh] h-full'>
        <Routes>
            <Route path="/" element={<div className="p-4">Services Page</div>} />
            <Route path="provider" element={<PayrollProvider />} />
            <Route path="provider2" element={<PayrollProvider2 />} />
            <Route path="provider3" element={<PayrollProvider3 />} />
        </Routes>
        </div>
    </div>
  );
};

export default PayrollInfo;