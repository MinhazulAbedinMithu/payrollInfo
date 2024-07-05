import React from 'react';

interface TextWithDotsProps {
  leftText: string;
  rightText: string;
}

const TextWithDots: React.FC<TextWithDotsProps> = ({ leftText, rightText }) => {
  return (
    <div className="flex justify-between items-center w-full font-medium py-1">
      <span>{leftText}</span>
      <span className="flex-grow mx-2 border-t border-dotted border-gray-400"></span>
      <span>{rightText}</span>
    </div>
  );
};

export default TextWithDots;
