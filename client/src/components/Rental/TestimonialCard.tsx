import React from "react";

interface TestimonialCardProps {
  name: string;
  role: string;
  text: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  text,
}) => {
  return (
    <div className="p-4 border rounded shadow-lg bg-white flex flex-col justify-between h-full text-left">
      <div className="flex-grow">
        <p className="text-gray-700 italic mb-4">{text}</p>
      </div>
      <div className="mt-auto">
        <h3 className="font-bold">{name}</h3>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
      <div className="flex items-center justify-between mt-2">
        <p className="text-sm text-gray-500">⭐ ⭐ ⭐ ⭐ ⭐</p>
        <span className="text-sm text-orange-500">Testimonial</span>
      </div>
    </div>
  );
};

export default TestimonialCard;
