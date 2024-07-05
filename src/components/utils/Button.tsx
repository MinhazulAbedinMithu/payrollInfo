import React from 'react';

interface ButtonProps {
    name: string;
    className:string,
    onClick: () => void;
    type?: "button" | "submit" | "reset"; // Optional type with possible values
}

const Button: React.FC<ButtonProps> = ({ name, onClick, type = "button",className }) => {
    return (
        <button 
            type={type} 
            className={className}
            onClick={onClick}
        >
            {name}
        </button>
    );
};

export default Button;
