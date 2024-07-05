import React, { useEffect, useState } from "react";
import { SiTicktick } from "react-icons/si";
import { FaEdit } from "react-icons/fa";
import Checkbox from "./utils/CheckBox";
import { BsLightbulb } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import TextWithDots from "./utils/TextWithDots";
import EditIcon from "./utils/EditIcon";

interface payrollForInHouse {
  payrollType: string;
  payrollSoftware: string;
}

interface PayrollInfo {
  payrollType?: string;
  payrollSoftware?: string;
  payrollCompanyName?: string;
  verified?: Boolean;
  payrollCompanyContact?: string;
  payrollCompanyEmail?: string;
  payrollCompanyPhone?: string;
  payrollCompanyInformation?: string;
}

const payrollInfoData = {
  payrollType: {
    title: "Payroll Type",
    options: [
      {
        id: "1",
        title: "In-House",
        value: "in-house",
        subQuestions: [
          {
            id: "payrollSoftware",
            title: "Payroll Software",
            type: "input",
          },
        ],
      },
      {
        id: "2",
        title: "Payroll Company",
        value: "payroll company",
        subQuestions: [
          {
            id: "companyName",
            title: "payroll company",
            type: "input",
          },
        ],
      },
    ],
  },
};

const PayrollProvider: React.FC = () => {
  const [payrollType, setPayrollType] = useState("");
  const [payrollValue, setPayrollValue] = useState("");
  const [payrollStep, setPayrollStep] = useState(0);
  const [payrollInfo, setPayrollInfo] = useState<PayrollInfo>({});
  const [verified, setVerified] = useState(false);
  const [companyContact, setCompanyContact] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const [isFormOpen, setIsFormOpen] = useState(false);

  let payrollCompanyContent;

  useEffect(() => {
    let payroll = localStorage.getItem("payroll");
    if (payroll) {
      let checkPayrollType = JSON.parse(payroll);
      if (checkPayrollType.payrollType === "in-house") {
        if (checkPayrollType.verified) {
          setPayrollInfo(checkPayrollType);
          setPayrollStep(2);
        } else {
          setPayrollInfo(checkPayrollType);
          setPayrollStep(1);
        }
      } else {
        if (checkPayrollType.verified) {
          setPayrollInfo(checkPayrollType);
          setPayrollStep(2);
        } else {
          setPayrollInfo(checkPayrollType);
          setPayrollStep(1);
        }
      }
    }
  }, []);

  const handleCheckBox = () => {
    setVerified(!verified);
  };

  const validationSchemaInHouse = Yup.object().shape({
    payrollValue: Yup.string().required("This field is required"),
  });

  const validationSchemaPayrollCompany = Yup.object().shape({
    payrollValue: Yup.string().required("This field is required"),
    contact: Yup.string().required("Payroll Company Contact is required"),
    phone: Yup.string().required("Payroll Company Phone is required"),
    email: Yup.string().required("Payroll Company Email is required"),
    payrollInformation: Yup.string().required(
      "Payroll Information is required"
    ),
  });

  const handleSubmittion = () => {
    setPayrollInfo({ ...payrollInfo, verified });
    setPayrollStep(2);
    localStorage.setItem(
      "payroll",
      JSON.stringify({ ...payrollInfo, verified })
    );
  };

  const handleSubmits = () => {
    if (payrollType === "in-house") {
      const payroll: payrollForInHouse = {
        payrollType,
        payrollSoftware: payrollValue,
      };
      setPayrollInfo(payroll);
      setPayrollStep(1);
      console.log({ payroll });
      //   localStorage.setItem("payroll", JSON.stringify(payroll));
    } else {
      const payroll: PayrollInfo = {
        payrollType,
        payrollCompanyName: payrollValue,
        payrollCompanyContact: companyContact,
        payrollCompanyEmail: companyPhone,
        payrollCompanyPhone: companyEmail,

      };

      setPayrollInfo(payroll);
      setPayrollStep(1);
      console.log({ payroll });

      //   localStorage.setItem("payroll", JSON.stringify(payroll));
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(
      payrollType === "in-house"
        ? validationSchemaInHouse
        : validationSchemaPayrollCompany
    ),
  });

  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
  };
  const onSubmit = (data: any) => {
    console.log({ data });
    if (payrollType === "in-house") {
      const payroll: payrollForInHouse = {
        payrollType,
        payrollSoftware: payrollValue,
      };
      setPayrollInfo(payroll);
      setPayrollStep(1);
      localStorage.setItem("payroll", JSON.stringify(payroll));
    } else {
      const payroll: PayrollInfo = {
        payrollType,
        payrollCompanyName: payrollValue,
        payrollCompanyContact: companyContact,
        payrollCompanyEmail: companyPhone,
        payrollCompanyPhone: companyEmail,
        payrollCompanyInformation: selectedOption
      };

      setPayrollInfo(payroll);
      setPayrollStep(1);
      localStorage.setItem("payroll", JSON.stringify(payroll));
    }
  };

  let payrollContentOnSteps;
  let headingContentWithSteps;
  let radioButton;
  let popup;

  if (payrollType === "payroll company") {
    payrollCompanyContent = (
      <>
        <div className=" w-full flex flex-col my-4 md:flex-row items-start justify-start gap-3 md:gap-14">
          <div className="my-4 min-w-[225px]">
            <h4 className="text-blue-600 font-semibold">
              {payrollInfoData.payrollType.title}
            </h4>
            <p className="text-gray-500">Tell us more about your payroll</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              <div className="pt-2">
                <h4 className=" font-medium">Payroll Company Contact </h4>
                <div className="gap-6 py-4">
                  <input
                    className={`${
                      errors.contact ? "border-red-500" : ""
                    } border px-3 py-2 rounded-xl bg-transparent`}
                    {...register("contact")}
                    placeholder="Payroll Company Contact"
                    onChange={(e: any) => setCompanyContact(e.target.value)}
                  />
                  {errors.contact && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.contact.message as string}{" "}
                    </p>
                  )}
                </div>
              </div>
              <div className="pt-2">
                <h4 className=" font-medium">Payroll Company Phone </h4>
                <div className=" gap-6 py-4">
                  <input
                    className={`${
                      errors.phone ? "border-red-500" : ""
                    } border px-3 py-2 rounded-xl bg-transparent`}
                    {...register("phone")}
                    type="number"
                    placeholder="Payroll Company Phone"
                    onChange={(e: any) => setCompanyPhone(e.target.value)}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phone.message as string}{" "}
                    </p>
                  )}
                </div>
              </div>
              <div className="pt-2">
                <h4 className=" font-medium">Payroll Company Email </h4>

                <div className="gap-6 py-4">
                  <input
                    className={`${
                      errors.email ? "border-red-500" : ""
                    } border px-3 py-2 rounded-xl bg-transparent`}
                    {...register("email")}
                    placeholder="Payroll Company Email"
                    onChange={(e: any) => setCompanyEmail(e.target.value)}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message as string}{" "}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="">
              <h4 className="font-medium">
                Payroll Information <sup>*</sup>
              </h4>
              <div className="flex items-center justify-start gap-6 pt-4">
                <div
                  className={`${
                    errors.payrollInformation ? "border-red-500" : ""
                  } border px-3 py-2 rounded-xl gap-4`}
                >
                  <input
                    type="radio"
                    id="payrollInformationYes"
                    {...register("payrollInformation")}
                    value="Yes"
                    onChange={handleOptionChange}
                  />
                  <label htmlFor="payrollInformationYes"> Yes</label>
                </div>
                <div
                  className={`${
                    errors.payrollInformation ? "border-red-500" : ""
                  } border px-3 py-2 rounded-xl gap-4`}
                >
                  <input
                    type="radio"
                    id="payrollInformationNo"
                    {...register("payrollInformation")}
                    value="No"
                    onChange={handleOptionChange}
                  />
                  <label htmlFor="payrollInformationNo">No</label>
                </div>
              </div>
              {errors.payrollInformation && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.payrollInformation.message as string}
                </p>
              )}
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-1 mt-4"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </>
    );
  } else {
    payrollCompanyContent = "";
  }

  if (payrollStep === 0) {
    popup = "";
    radioButton = "";
    headingContentWithSteps = (
      <>
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center ">
            <h2 className="text-xl font-bold ">Payroll Information </h2>
          </div>
        </div>
      </>
    );
    payrollContentOnSteps = (
      <>
        <div className="min-w-[225px]">
          <h4 className="text-blue-600 font-semibold">
            {payrollInfoData.payrollType.title}
          </h4>
          <p className="text-gray-500">Tell us more about your payroll</p>
        </div>
        {
          !isFormOpen ? 
          <div className="flex items-center justify-start gap-5 flex-col md:flex-row">
            <div className="border border-dashed border-[#140DDA] w-14 h-14 flex items-center justify-center rounded-full cursor-pointer" onClick={() => setIsFormOpen(true)}>
              <EditIcon/>
            </div>
            <div>
              <p><button className="text-[#140DDA]" onClick={() => setIsFormOpen(true)}>Open</button> the form and tell us more.</p>
              <p>We want to hear about your company!</p>
            </div>
          </div>: 
          <div>
          <div className="">
            <h4 className=" font-medium">
              {payrollInfoData.payrollType.title} <sup>*</sup>
            </h4>
            <div className="flex items-center justify-start gap-6 py-4">
              {payrollInfoData.payrollType.options.map((rootOp) => (
                <div
                  key={rootOp.id}
                  className="border px-3 py-2 rounded-xl gap-4"
                >
                  <label htmlFor={rootOp.id}>
                    <input
                      type="radio"
                      name={"payrollType"}
                      id={rootOp.id}
                      value={rootOp.value}
                      onClick={() => setPayrollType(rootOp.value)}
                    />{" "}
                    {rootOp.title}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {payrollType === "in-house" ? (
              <div>
                <input
                  className={`${
                    errors.payrollValue ? "border-red-500" : ""
                  } border px-3 py-2 rounded-xl bg-transparent`}
                  {...register("payrollValue")}
                  placeholder="Software ABC"
                  onChange={(e: any) => setPayrollValue(e.target.value)}
                />
                {errors.payrollValue && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.payrollValue.message as string}{" "}
                  </p>
                )}
              </div>
            ) : payrollType === "payroll company" ? (
              <div>
                <input
                  className={`${
                    errors.payrollValue ? "border-red-500" : ""
                  } border px-3 py-2 rounded-xl bg-transparent`}
                  {...register("payrollValue")}
                  placeholder="Payroll Excellence"
                  onChange={(e: any) => setPayrollValue(e.target.value)}
                />
                {errors.payrollValue && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.payrollValue.message as string}{" "}
                  </p>
                )}
              </div>
            ) : null}
            {payrollType !== "payroll company" && (
              <button
                className="bg-blue-500 text-white px-4 py-1 mt-4"
                type="submit"
              >
                Submit
              </button>
            )}
          </form>
        </div>
        }
      </>
    );
  } else if (payrollStep === 1) {
    popup = "";
    payrollCompanyContent = (
      <>
        {payrollInfo?.payrollType !== "in-house" && (
          <div className="flex flex-col my-4 md:flex-row items-start justify-start gap-3 md:gap-14 w-full">
            <div className="my-4 min-w-[225px]">
              <h4 className="text-blue-600 font-semibold">
                {payrollInfoData.payrollType.title}
              </h4>
              <p className="text-gray-500">Tell us more about your payroll</p>
            </div>
            <div className="w-full">
            <TextWithDots leftText="Payroll Company Name" rightText={payrollInfo?.payrollCompanyContact as string} />
              <TextWithDots leftText="Payroll Company Email" rightText={payrollInfo?.payrollCompanyEmail as string} />
              <TextWithDots leftText="Payroll Company Phone" rightText={payrollInfo?.payrollCompanyPhone as string} />
              <TextWithDots leftText="Payroll Information" rightText={payrollInfo?.payrollCompanyInformation as string} />
            </div>
          </div>
        )}
      </>
    );
    headingContentWithSteps = (
      <>
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center ">
            <h2 className="text-xl font-bold ">Payroll Information </h2>
            <div className="px-4 flex items-center">
              <SiTicktick size={15} color="green" />
              <span className="px-4 text-green-700">Completed</span>
            </div>
          </div>
          <div className="flex">
            <FaEdit size={20} color="blue" />
            <span className="px-2 cursor-pointer text-blue-700">Edit</span>
          </div>
        </div>
      </>
    );
    radioButton = (
      <>
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
      </>
    );
    payrollContentOnSteps = (
      <>
        <div className="flex flex-col my-4 md:flex-row items-start justify-start gap-3 md:gap-14 w-full">
          <div className="my-4 min-w-[225px]">
            <h4 className="text-blue-600 font-semibold">
              {payrollInfoData.payrollType.title}
            </h4>
            <p className="text-gray-500">Tell us more about your payroll</p>
          </div>
          <div className="w-full">
            {payrollInfo?.payrollType === "in-house" ? (
              <div className="flex flex-col w-full">
                
                <TextWithDots leftText="Payroll Type" rightText={payrollInfo?.payrollType as string} />
                <TextWithDots leftText="Payroll Software" rightText={payrollInfo?.payrollSoftware as string} />

              </div>
            ) : (
              <div className="w-full">
                
                <TextWithDots leftText="Payroll Type" rightText={payrollInfo?.payrollType as string} />
                <TextWithDots leftText="Payroll Company Name" rightText={payrollInfo?.payrollCompanyName as string} />
              </div>
            )}
          </div>
        </div>
      </>
    );
  } else if (payrollStep === 2) {
    radioButton = "";
    payrollCompanyContent = (
      <>
        {payrollInfo?.payrollType !== "in-house" && (
          <div className="flex flex-col my-4 md:flex-row items-start justify-start gap-3 md:gap-14 w-full">
            <div className="my-4 min-w-[225px]">
              <h4 className="text-blue-600 font-semibold">
                {payrollInfoData.payrollType.title}
              </h4>
              <p className="text-gray-500">Tell us more about your payroll</p>
            </div>
            <div className="w-full">
              <TextWithDots leftText="Payroll Company Name" rightText={payrollInfo?.payrollCompanyContact as string} />
              <TextWithDots leftText="Payroll Company Email" rightText={payrollInfo?.payrollCompanyEmail as string} />
              <TextWithDots leftText="Payroll Company Phone" rightText={payrollInfo?.payrollCompanyPhone as string} />
              <TextWithDots leftText="Payroll Information" rightText={payrollInfo?.payrollCompanyInformation as string} />
              
            </div>
          </div>
        )}
      </>
    );
    popup = (
      <>
        <div className="flex ml-[4.5rem] justify-between my-4 px-4 bg-green-700 py-2">
          <div className="flex">
            <BsLightbulb size={30} color="gray" />
            <h2 className=" text-white text-xl px-4"> Popup text here</h2>
          </div>
          <div>
            <h2 className=" text-white text-xl px-4"> Some New Ideas here</h2>
          </div>
        </div>
      </>
    );
    headingContentWithSteps = (
      <>
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center ">
            <h2 className="text-xl font-bold ">Payroll Information </h2>
            <div className="px-4 flex items-center">
              <SiTicktick size={15} color="green" />
              <span className="px-4 text-green-700">Completed</span>
            </div>
          </div>
          <div className="flex">
            <FaEdit size={20} color="blue" />
            <span className="px-2 cursor-pointer text-blue-700">Edit</span>
          </div>
        </div>
      </>
    );
    payrollContentOnSteps = (
      <>
        <div className="w-full flex flex-col my-4 md:flex-row items-start justify-start gap-3 md:gap-14">
          <div className="my-4 min-w-[225px]">
            <h4 className="text-blue-600 font-semibold">
              {payrollInfoData.payrollType.title}
            </h4>
            <p className="text-gray-500">Tell us more about your payroll</p>
          </div>
          <div className="w-full">
            {payrollInfo?.payrollType === "in-house" ? (
              <div className="flex flex-col w-full">
                <TextWithDots leftText="Payroll Type" rightText={payrollInfo?.payrollType} />
                <TextWithDots leftText="Payroll Software" rightText={payrollInfo?.payrollSoftware as string} />
              </div>
            ) : (
              <div className="w-full">
                <TextWithDots leftText="Payroll Type" rightText={payrollInfo?.payrollType as string} />
                <TextWithDots leftText="Payroll Company Name" rightText={payrollInfo?.payrollCompanyName as string} />
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="bg-gray-100 h-full py-5">
      {popup}
      <div className="max-w-[850px] w-full mx-auto border rounded-xl shadow-lg drop-shadow-md p-4">
        {headingContentWithSteps}
        <div className="flex flex-col md:flex-row items-start justify-start gap-3 md:gap-14 w-full">
          {payrollContentOnSteps}
        </div>
        {payrollCompanyContent}
      </div>
      {radioButton}
    </div>
  );
};

export default PayrollProvider;
