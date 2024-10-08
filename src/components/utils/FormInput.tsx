import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type FormInputProps = {
    title?:string;
  className?: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
  error?: any;
  name?: any;
  type?:any;
  register?: UseFormRegisterReturn;
};

const FormInput: React.FC<FormInputProps> = ({
    title,
  className = '',
  placeholder = '',
  onChange,
  value,
  error,
  register,
  name,
  type="string",
  ...rest
}) => {
  return (
    <>
    {title ? <div className="pt-2">
        {title && <h4 className=" font-medium">{title} <sup className='text-red-700'>*</sup> </h4>}
        <div className={`gap-6 py-4`}>
        <input
            className={`${
            error ? "border-red-500" : ""
            } border px-3 py-2 rounded-xl bg-transparent w-full`}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            type={type}
            name={name}
            {...register} // Registering the input with react-hook-form
            {...rest}
        />
        {error && (
            <p className="text-red-500 text-sm mt-1">
            {error?.message}
            </p>
        )}
        </div>
    </div> : <div>
                <input
                  className={`${
                    error ? "border-red-500" : ""
                  } border px-3 py-2 rounded-xl bg-transparent`}
                  {...register}
                  placeholder={placeholder}
                  onChange={onChange}
                  {...rest}
                />
                {error && (
                    <p className="text-red-500 text-sm mt-1">
                    {error?.message}
                    </p>
                )}
              </div>}
    </>
  );
};

export default FormInput;
