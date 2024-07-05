import React from "react";

interface InputProps {
  title: string;
  isRequired?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  type?: string;
  placeholder?: string;
  errors?: { message?: string };
}

const Input: React.FC<InputProps> = ({
  title,
  isRequired = true,
  value,
  onChange,
  name,
  type = "text",
  placeholder = "",
  errors,
}) => {
  console.log({ errors });
  return (
    <div className="pt-2">
      <h4 className=" font-medium">
        {title} {isRequired && <sup>*</sup>}
      </h4>
      <div className="flex items-center justify-start gap-6 py-4">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="border px-3 py-2 rounded-xl bg-transparent"
        />
      </div>
      {errors && <p className="text-red-500">{errors.message}</p>}
    </div>
  );
};

export default Input;
