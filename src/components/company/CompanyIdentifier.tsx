import React, { useState } from 'react'
import SideHeading from '../SideHeading'
import EditIcon from '../utils/EditIcon';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import FormInput from '../utils/FormInput';
import TextWithDots from '../utils/TextWithDots';
import { SiTicktick } from 'react-icons/si';
import { FaEdit } from 'react-icons/fa';



const validationSchemaCompanyIdentifier = Yup.object().shape({
    legalName: Yup.string().required("Legal name is required"),
    commonName: Yup.string().required("Common name is required"),
    ein: Yup.number().required("EIN is required"),
    taxId: Yup.string().required("Tax ID is required"),
  });
  interface ICompanyIdentifierProp {
    onSubmitProp?: (data: { legalName: string; commonName: string; ein: number; taxId: string }) => void;
    identifyInfo?:any;
    setIdentifyInfo?: any
  }
const CompanyIdentifier:React.FC<ICompanyIdentifierProp> = ({ onSubmitProp,identifyInfo, setIdentifyInfo } ) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    // const [formInfo, setFormInfo] = useState<ICompanyIdentifier>({});
    const [formCompleted, setFormCompleted] = useState(false);


    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<any>({
        resolver: yupResolver(
          validationSchemaCompanyIdentifier
        ),
      });

      const onSubmit = (data:any) => {
        setIdentifyInfo(data);
        setFormCompleted(true);
        setIsFormOpen(false);
        onSubmitProp && onSubmitProp(data)
      }

    
    const OpenLayout = () => {
        return (
            <div className="flex flex-col md:flex-row items-center justify-start gap-3 md:gap-14 w-full">
            <div className='h-full flex flex-col justify-between'>
                <SideHeading title="Company Name" subTitle="What is the name of your company?"/>
                <SideHeading title="Tax ID" subTitle="What is the tax information of your company?"/>
            </div>
            <div className="flex items-center justify-start gap-5 flex-col md:flex-row">
                <div className="border border-dashed border-[#140DDA] w-14 h-14 flex items-center justify-center rounded-full cursor-pointer" onClick={() => setIsFormOpen(true)}>
                <EditIcon/>
                </div>
                <div>
                <p><button className="text-[#140DDA]" onClick={() => setIsFormOpen(true)}>Open</button> the form and tell us more.</p>
                <p>We want to hear about your company!</p>
                </div>
            </div>
        </div>
        )
    }

    const FormLayout = () => {
        return (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-start gap-3 md:gap-5 w-full">
                <div className='flex flex-col md:flex-row items-start justify-between w-full gap-3'>
                    <SideHeading title="Company Name" subTitle="What is the name of your company?"/>
                    <div>
                        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-2">
                        <FormInput 
                            title="Legal Name"
                            register={{...register("legalName")}}
                            placeholder="Atlas Global Logistics, LLC"
                            name="legalName"
                            data-testid="legalName"
                            error={errors.legalName}
                            />
                            
                        
                        <FormInput 
                            title="Common Name"
                            register={{...register("commonName")}}
                            placeholder="Atlas Global Logistics"
                            name="commonName"
                            data-testid="commonName"
                            error={errors.commonName}
                            />
                        </div>
                        <div className="w-full md:w-1/2">
                        <FormInput 
                        title="EIN"
                        register={{...register("ein")}}
                        placeholder="0000000"
                        name="ein"
                        type="number"
                        data-testid="ein"
                        error={errors.ein}
                        />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row items-start justify-between w-full gap-3'>
                <SideHeading title="Tax ID" subTitle="What is the tax information of your company?"/>
                    <div className='w-full px-2'>
                        <div className='w-full md:w-1/2'>
                        <FormInput 
                        title="Tax ID"
                        register={{...register("taxId")}}
                        placeholder="000"
                        name="taxId"
                        data-testid="taxId"
                        error={errors.taxId}
                        />
                        </div>
                        <button
                        className="bg-blue-800 text-white px-4 py-1 mt-4"
                        type="submit"
                        data-testid="identifySubmit"
                        >
                            Submit
                        </button>
                    </div>
                </div>
                
          </form>
        )
    }

    const CompletedLayout = () => {
        return (
            <div className="flex flex-col items-center justify-start gap-3 md:gap-5 w-full">
                <div className='flex flex-col md:flex-row items-start justify-between w-full gap-3'>
                    <SideHeading title="Company Name"/>
                    <div className='w-full pt-2'>
                    <TextWithDots leftText="Legal Name" rightText={identifyInfo?.legalName as string} />
                    <TextWithDots leftText="Common Name" rightText={identifyInfo?.commonName as string} />
                    <TextWithDots leftText="EIN" rightText={identifyInfo?.ein?.toString() as string} />
                    </div>
                </div>
                <div className='flex flex-col md:flex-row items-start justify-between w-full gap-3'>
                    <SideHeading title="Tax ID" />
                    <div className='w-full pt-2'>
                    <TextWithDots leftText="Tax ID" rightText={identifyInfo?.taxId as string} />
                    </div>
                </div>
                
          </div>
        )
    }
  return (
    <div className="max-w-[870px] w-full mx-auto border rounded-xl shadow-lg drop-shadow-md p-4">
        
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center ">
            <h2 className="text-xl font-bold ">Company Identifier </h2>
            {formCompleted && <div className="px-4 flex items-center">
              <SiTicktick size={15} color="green" />
              <span className="px-4 text-green-700">Completed</span>
            </div>}
          </div>
          {formCompleted && <div className="flex cursor-pointer" onClick={() => {setFormCompleted(false); setIsFormOpen(true)}}>
            <FaEdit size={20} color="blue" />
            <span className="px-2 cursor-pointer text-blue-700">Edit</span>
          </div>}
        </div>
        {
            isFormOpen ? <FormLayout/> : formCompleted ? <CompletedLayout/> : <OpenLayout/>
        }
    </div>
  )
}

export default CompanyIdentifier