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


interface ICompanyDetailsProp {
    onSubmitProp?: (data: { fiscalYear: string; noOfEmployee: number; inceptionDate: string; formEntity: string }) => void;
    detailsInfo?:any;
    setDetailsInfo?:any;
  }

const validationSchemaCompanyIdentifier = Yup.object().shape({
    fiscalYear: Yup.string().required("Fiscal Year is required"),
    noOfEmployee: Yup.number().required("Number of Employees is required"),
    inceptionDate: Yup.string().required("Inception date required"),
    formEntity: Yup.string().required("Form of Entity is required"),
  });

const CompanyDetails:React.FC<ICompanyDetailsProp> = ({onSubmitProp, detailsInfo, setDetailsInfo}) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    // const [formInfo, setFormInfo] = useState<ICompanyDetails>({});
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
        setDetailsInfo(data);
        setFormCompleted(true);
        setIsFormOpen(false);
        console.log(data);
        
        onSubmitProp && onSubmitProp(data)
      }

    
    const OpenLayout = () => {
        return (
            <div className="flex flex-col md:flex-row items-center justify-start gap-3 md:gap-14 w-full">
            <SideHeading title="Operation info" subTitle="Tell us details about your company as an entity"/>
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
                    <SideHeading title="Operation info" subTitle="Tell us details about your company as an entity"/>
                    <div>
                        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-2">
                        <FormInput 
                            title="Fiscal Year End"
                            register={{...register("fiscalYear")}}
                            placeholder=""
                            name="fiscalYear"
                            data-testid="fiscalYear"
                            error={errors.fiscalYear}
                            />
                            
                        
                        <FormInput 
                            title="Number of Employees"
                            register={{...register("noOfEmployee")}}
                            placeholder=""
                            name="noOfEmployee"
                            type="number"
                            data-testid="noOfEmployee"
                            error={errors.noOfEmployee}
                            />
                            <FormInput 
                        title="Business Inception Date"
                        register={{...register("inceptionDate")}}
                        placeholder=""
                        name="inceptionDate"
                        type="date"
                        data-testid="inceptionDate"
                        error={errors.inceptionDate}
                        />

                        <div className='pt-2'>
                            <h4 className=" font-medium">Form of Entity <sup className='text-red-700'>*</sup> </h4>
                            <select id="formEntity" data-testid="formEntity" {...register("formEntity")} className={`${errors.formEntity ? "border-red-500" : ""} border px-3 py-2 text-xl rounded-xl bg-transparent w-full my-4`}>
                                <option value="sadfsdf">sadfasdf</option>
                                <option value="sadfsdf">sadfasdf</option>
                                <option value="sadfsdf">sadfasdf</option>
                                <option value="sadfsdf">sadfasdf</option>
                            </select>
                            {errors.formEntity && (
                                <p className="text-red-500 text-sm mt-1">
                                {errors?.formEntity?.message as string}
                                </p>
                            )}
                        
                        </div>
                       

                        
                        </div>
                        <button
                        className="bg-blue-800 text-white px-4 py-1 mt-4"
                        type="submit"
                        data-testid="detailsSubmit"
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
                    <TextWithDots leftText="Legal Name" rightText={detailsInfo?.fiscalYear as string} />
                    <TextWithDots leftText="Common Name" rightText={detailsInfo?.noOfEmployee?.toString() as string} />
                    <TextWithDots leftText="EIN" rightText={detailsInfo?.inceptionDate as string} />
                    <TextWithDots leftText="Tax ID" rightText={detailsInfo?.formEntity as string} />
                    </div>
                </div>
                
                
          </div>
        )
    }
  return (
    <div className="max-w-[870px] w-full mx-auto border rounded-xl shadow-lg drop-shadow-md p-4">
        
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center ">
            <h2 className="text-xl font-bold ">Company Details </h2>
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

export default CompanyDetails