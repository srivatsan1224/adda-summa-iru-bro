import React, { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { CheckCircle,  ShoppingBag, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Order, OrderItem } from '../../types'; // Ensure OrderItem is also imported if used directly

// Helper to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
};

// Helper to format date
const formatDate = (isoString: string) => {
  if (!isoString) return 'N/A';
  return new Date(isoString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const OrderConfirmationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Safely access order state and type it
  const order = (location.state as { order?: Order })?.order;

  useEffect(() => {
    // If no order data, perhaps the user refreshed or navigated directly.
    // Redirecting them prevents showing an empty/error state for a page that requires context.
    if (!order) {
      console.warn("OrderConfirmationPage: No order data found in location state. Redirecting to home.");
      navigate('/'); // Redirect to homepage
    }
    // Optional: Clear cart or perform other cleanup if this page signifies end of transaction
    // This is usually handled by the backend (cart clearing after order)
  }, [order, navigate]);

  // If redirecting, this content might only flash or not be seen.
  // An alternative to immediate redirect is to show the error message and let user click a button.
  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center font-custom">
        <AlertCircle className="w-16 h-16 text-yellow-500 mb-4" />
        <h1 className="text-2xl font-semibold text-gray-700 mb-2">Order Information Unavailable</h1>
        <p className="text-gray-500 mb-6">
          This page is intended to be viewed after a successful checkout.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-150"
        >
          Go to Homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 p-4 sm:p-6 font-custom">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl max-w-2xl w-full text-center"
      >
        <motion.div
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 180, damping: 12, delay: 0.2 }}
            className="mb-5 sm:mb-6"
        >
            <CheckCircle className="w-20 h-20 sm:w-24 sm:h-24 text-green-500 mx-auto" />
        </motion.div>
        
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 sm:mb-3">Thank You!</h1>
        <p className="text-md sm:text-lg text-gray-600 mb-6 sm:mb-8">Your rental order has been placed successfully.</p>

        <div className="bg-gray-50 p-4 sm:p-6 rounded-xl text-left space-y-3 mb-6 sm:mb-8 border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Order ID:</span>
            <span className="font-semibold text-gray-700 text-sm break-all">{order.id}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Order Date:</span>
            <span className="font-semibold text-gray-700 text-sm">{formatDate(order.orderDate)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Total Amount:</span>
            <span className="font-semibold text-blue-600 text-lg">{formatCurrency(order.totalAmount)}</span>
          </div>
           <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Payment Status:</span>
            <span className="font-semibold text-green-600 capitalize text-sm">{order.paymentStatus.replace('_', ' ')}</span>
          </div>
        </div>

        <div className="mb-6 sm:mb-8 text-left">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3 sm:mb-4">Items Ordered:</h3>
            <div className="max-h-60 overflow-y-auto pr-2 space-y-3 rounded-lg border border-gray-200 p-1 sm:p-2 bg-gray-50">
                {order.items.map((item: OrderItem, index: number) => ( // Explicitly type item and index
                    <div key={index} className="flex items-center p-3 bg-white border rounded-lg text-sm shadow-sm hover:shadow-md transition-shadow">
                        <img src={item.imageUrl || 'https://via.placeholder.com/60x60'} alt={item.name} className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md mr-3 sm:mr-4 border"/>
                        <div className="flex-grow min-w-0">
                            <p className="font-medium text-gray-800 truncate" title={item.name}>{item.name}</p>
                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                            <p className="text-xs text-gray-500">Price/item: {formatCurrency(item.price)}</p>
                        </div>
                        <p className="font-semibold text-gray-800 ml-2 sm:ml-3 shrink-0">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                ))}
            </div>
        </div>

        <p className="text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8">
          You will receive an email confirmation shortly (mock functionality).
          If you have any questions, please contact support.
        </p>

        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <Link
            to="/" // Main homepage or rental homepage
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 flex items-center justify-center text-sm sm:text-base"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Continue Shopping
          </Link>
          {/* <Link
            to="/my-orders" // Path to user's order history page (future feature)
            className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition duration-150 flex items-center justify-center text-sm sm:text-base"
          >
            <Package className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            View My Orders
          </Link> */}
        </div>
      </motion.div>
    </div>
  );
};

export default OrderConfirmationPage;