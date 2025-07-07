import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface CategoryButtonProps {
  img: string;
  name: string;
  description: string;
  route: string;
}

const CategoryButton = ({ img, name, description, route }: CategoryButtonProps) => {
  return (
    <Link to={route}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
      >
        <div className="relative h-40">
          <img
            src={img}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{name}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </motion.div>
    </Link>
  );
};

export default CategoryButton;