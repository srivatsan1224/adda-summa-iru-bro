import React from 'react';
import { motion } from 'framer-motion';

const FoodLoader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <motion.div
        className="w-24 h-24 mb-4 relative"
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="absolute inset-0 rounded-full border-t-4 border-orange-500 border-opacity-30"></div>
        <div className="absolute inset-0 rounded-full border-l-4 border-orange-500"></div>
        <div className="absolute inset-0 rounded-full border-b-4 border-orange-500 border-opacity-70"></div>
      </motion.div>
      
      <motion.div 
        className="flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-medium text-gray-800 mb-2">Loading delicious food</h3>
        <div className="flex space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-orange-500 rounded-full"
              animate={{
                y: [0, -10, 0]
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default FoodLoader;