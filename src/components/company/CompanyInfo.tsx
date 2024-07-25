import React, { useState } from 'react'
import CompanyIdentifier from './CompanyIdentifier'
import CompanyDetails from './CompanyDetails'
import Checkbox from '../utils/CheckBox'

const CompanyInfo = () => {
  const [verified, setVerified] = useState(false);
   

  const handleCheckBox = () => {
    setVerified(!verified);
  };

  const handleSubmittion = () => {
    
  };

  return (
    <div className='flex flex-col gap-10'>
        <CompanyIdentifier/>
        <CompanyDetails/>
        <div>
        <div className="max-w-[850px] w-full mx-auto pl-2 my-4 ">
          <Checkbox
            name="By Checking and Verify Identity"
            onClick={handleCheckBox}
          />
        </div>
        <button
          className={`${
            verified ? "bg-blue-500 " : "bg-gray-500 cursor-not-allowed"
          } text-white px-4 py-1 ml-[5rem] `}
          onClick={handleSubmittion}
          disabled={!verified}
        >
          Submit
        </button>
        </div>
    </div>
  )
}

export default CompanyInfo