import React from "react";

interface CheckboxProps {
  name: string;
  onClick: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ name, onClick }) => {
  return (
    <>
      <input type="checkbox" name="" id="" onClick={onClick} />
      <label className="px-4">{name}</label>
    </>
  );
};

export default Checkbox;
