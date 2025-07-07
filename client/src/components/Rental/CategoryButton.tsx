import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface CategoryButtonProps {
  img: string;
  name: string;
  description: string;
  route: string;
}

const CategoryButton = ({ img, name, description, route }: CategoryButtonProps) => {
  return (
    <Link to={route} className="w-full md:w-64">
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow duration-300"
      >
        <div className="h-44 w-full overflow-hidden">
          <img
            src={img}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div className="p-5">
          <h3 className="text-xl font-semibold text-gray-800 mb-1">{name}</h3>
          <p className="text-sm text-gray-600 mb-3">{description}</p>
          <span className="text-sm text-blue-600 font-medium flex items-center hover:underline">
            Explore <span className="ml-1">→</span>
          </span>
        </div>
      </motion.div>
    </Link>
  );
};

export default CategoryButton;
