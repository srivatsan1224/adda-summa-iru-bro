import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useCart } from './context/CartContext';

const CartButton: React.FC = () => {
  const { state } = useCart();
  const navigate = useNavigate();

  if (state.items.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/cart1')}
        className="fixed bottom-6 right-6 bg-orange-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-2 z-50 hover:bg-orange-600 transition-colors"
      >
        <div className="relative">
          <FaShoppingCart className="text-xl" />
          <span className="absolute -top-2 -right-2 bg-white text-orange-500 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
            {state.items.reduce((acc, item) => acc + item.quantity, 0)}
          </span>
        </div>
        <span className="font-semibold">₹{state.total}</span>
      </motion.button>
    </AnimatePresence>
  );
};

export default CartButton;