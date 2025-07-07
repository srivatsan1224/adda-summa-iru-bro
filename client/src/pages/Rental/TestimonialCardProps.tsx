import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  role: string;
  text: string;
}

const TestimonialCard = ({ name, role, text }: TestimonialCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-xl shadow-md"
    >
      <Quote className="w-8 h-8 text-blue-500 mb-4" />
      <p className="text-gray-600 mb-4 italic">{text}</p>
      <div className="border-t pt-4">
        <h4 className="font-semibold text-gray-800">{name}</h4>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;