import React from "react";
import { motion } from "framer-motion";

export interface LatestProductCardProps {
  id: string;
  name: string;
  img: string;
  price: number;
  category: string;
  originalPrice?: number;
}

const LatestProductCard: React.FC<LatestProductCardProps> = ({

  name,
  img,
  price,
  category,
  originalPrice,
}) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
      className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full w-full transition-shadow duration-300 group" // Added "group" for hover effects on children
    >
       <div className="relative w-full overflow-hidden bg-gray-200 h-[180px] sm:h-[200px] md:h-[220px] lg:h-[240px]">
  <img
    src={img}
    alt={name}
    className="w-full h-full object-cover"
  />
  <div className="absolute top-2 right-2 bg-blue-600 text-white px-2.5 py-1 rounded-md text-xs font-semibold capitalize shadow-sm">
    {category}
  </div>
</div>



      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        <h3 className="text-md sm:text-lg font-semibold text-gray-800 mb-1 truncate" title={name}>{name}</h3>
        
        <div className="mt-auto pt-2">
          <div className="flex items-baseline space-x-1 mb-3">
            <span className="text-blue-600 font-bold text-lg sm:text-xl">
              ₹{price.toFixed(2)}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="text-gray-400 line-through text-xs sm:text-sm">
                ₹{originalPrice.toFixed(2)}
              </span>
            )}
             <span className="text-xs sm:text-sm font-normal text-gray-500">/ month</span>
          </div>
          <button
            className="w-full bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default LatestProductCard;