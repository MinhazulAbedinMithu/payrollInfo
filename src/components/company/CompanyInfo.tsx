import React, { useEffect, useState } from 'react'
import CompanyIdentifier from './CompanyIdentifier'
import CompanyDetails from './CompanyDetails'
import Checkbox from '../utils/CheckBox'

export interface ICompanyIdentifier {
  legalName?: string;
  commonName?: string;
  ein?: number;
  taxId?: string;
}

interface ICompanyDetails {
  fiscalYear?: string;
  noOfEmployee?: number;
  inceptionDate?: string;
  formEntity?: string;
}

const CompanyInfo = () => {
  const [verified, setVerified] = useState(false);
  const [identifyInfo, setIdentifyInfo] = useState<ICompanyIdentifier>({});
  const [detailsInfo, setDetailsInfo] = useState<ICompanyDetails>({});
  const [isSubmitVisible, setIsSubmitVisible] = useState<boolean>(false);

  useEffect(() => {
    let show = false;
    const arr = [identifyInfo, detailsInfo];
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];
      if(Object.values(element).length > 0){
        show = true;
      }else{
        show=false;
        break;
      }
    }
    show === true && setIsSubmitVisible(true);
  }, [identifyInfo, detailsInfo])
  
   

  const handleCheckBox = () => {
    setVerified(!verified);
  };

  const handleSubmittion = () => {
    
  };

  return (
    <div className='flex flex-col gap-10'>
        <CompanyIdentifier identifyInfo={identifyInfo} setIdentifyInfo={setIdentifyInfo}/>
        <CompanyDetails detailsInfo={detailsInfo} setDetailsInfo={setDetailsInfo}/>
        {
          isSubmitVisible && <div>
        
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
        }
    </div>
  )
}

export default CompanyInfo