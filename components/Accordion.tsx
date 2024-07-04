import React, { useState } from 'react';

interface AccordionProps {
  items: { title: string; description: string }[];
  width?: string;
}

const Accordion: React.FC<AccordionProps> = ({ items, width = 'full' }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`mb-4 ${width}`}>
      {items.map((item, index) => (
        <div key={index}>
          <div
            className={`flex justify-between items-center cursor-pointer p-4 transition duration-300 ease-in-out ${
              index === items.length - 1 ? '' : 'border-b border-gray-100'
            }`}
            onClick={() => toggleAccordion(index)}
          >
            <h2 className="text-md">{item.title}</h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 ${openIndex === index ? 'transform rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          {openIndex === index && (
            <div className="p-4 border-b border-gray-100">{item.description}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
