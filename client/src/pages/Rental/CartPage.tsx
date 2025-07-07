import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, Trash2, ShoppingBag, AlertCircle, MinusCircle, PlusCircle } from "lucide-react";
import apiService from "../../services/apiService";
import { CartItem } from "../../types"; // Ensure this path is correct

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true); // For initial cart load & checkout
  const [error, setError] = useState<string | null>(null);
  const [updatingItemId, setUpdatingItemId] = useState<string | null>(null); // For item-specific loading
  const [actionMessage, setActionMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const navigate = useNavigate();

  const fetchCartItems = useCallback(async (showLoading = true) => {
    if (showLoading) setIsLoading(true);
    setError(null);
    setActionMessage(null);
    try {
      const response = await apiService.get<CartItem[]>("/cart");
      setCartItems(response.data);
    } catch (err: any) {
      console.error("Error fetching cart items:", err);
      setError(err.response?.data?.message || "Failed to load cart. Please try again.");
      setCartItems([]);
    } finally {
      if (showLoading) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const clearActionMessage = () => {
    setTimeout(() => setActionMessage(null), 3000);
  };

  const handleQuantityChange = async (cartItemId: string, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change;

    if (newQuantity <= 0) { // If new quantity is 0 or less, treat as removal
      await handleRemoveItem(cartItemId, "Item quantity set to zero, removed from cart.");
      return;
    }

    setUpdatingItemId(cartItemId);
    setActionMessage(null);
    try {
      await apiService.put(`/cart/${cartItemId}`, { quantity: newQuantity });
      // Optimistic update example (optional, for snappier UI)
      // setCartItems(prevItems => prevItems.map(item => 
      //   item.id === cartItemId ? { ...item, quantity: newQuantity, updatedAt: new Date().toISOString() } : item
      // ));
      // For consistency, full re-fetch is safer unless you handle all edge cases
      await fetchCartItems(false); // Re-fetch without full page loader
      setActionMessage({ type: 'success', text: 'Quantity updated.'});
    } catch (err: any) {
      console.error(`Error updating quantity for item ${cartItemId}:`, err);
      setActionMessage({ type: 'error', text: err.response?.data?.message || "Failed to update quantity."});
      // Optionally revert optimistic update here if you implemented it
    } finally {
      setUpdatingItemId(null);
      clearActionMessage();
    }
  };

  const handleRemoveItem = async (cartItemId: string, successMessage?: string) => {
    setUpdatingItemId(cartItemId);
    setActionMessage(null);
    try {
      await apiService.delete(`/cart/${cartItemId}`);
      // Optimistic update
      // setCartItems(prevItems => prevItems.filter(item => item.id !== cartItemId));
      await fetchCartItems(false); // Re-fetch without full page loader
      setActionMessage({ type: 'success', text: successMessage || 'Item removed from cart.'});
    } catch (err: any) {
      console.error(`Error removing item ${cartItemId}:`, err);
      setActionMessage({ type: 'error', text: err.response?.data?.message || "Failed to remove item."});
    } finally {
      setUpdatingItemId(null);
      clearActionMessage();
    }
  };

  const handleCheckout = async () => {
    setIsLoading(true); // Use main loader for checkout process
    setError(null);
    setActionMessage(null);
    try {
      const response = await apiService.post("/orders/checkout");
      navigate('/rental/order-confirmation', { state: { order: response.data.order } });
    } catch (err: any) {
      console.error("Error during checkout:", err);
      // Set error for general display, not just actionMessage
      setError(err.response?.data?.message || "Checkout failed. One or more items may no longer be available or an error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (isLoading && cartItems.length === 0 && !error) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        <p className="ml-4 text-lg">Loading your cart...</p>
      </div>
    );
  }

  // General page error (e.g., initial load failed)
  if (error && !isLoading && updatingItemId === null) { // Show if not a specific item update error
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <p className="text-red-600 text-xl mb-4">{error}</p>
        <button
          onClick={() => fetchCartItems()}
          disabled={isLoading}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin inline-block mr-2"/> : null}
          Try Again
        </button>
      </div>
    );
  }
  
  if (cartItems.length === 0 && !isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center min-h-[calc(100vh-200px)] flex flex-col justify-center items-center">
        {actionMessage && actionMessage.type === 'success' && ( // Show success message if cart became empty due to removal
          <div className="mb-4 p-3 w-full max-w-md bg-green-50 text-green-700 rounded-md text-sm">
            {actionMessage.text}
          </div>
        )}
        <ShoppingBag className="w-24 h-24 text-gray-300 mb-6" />
        <h1 className="text-3xl font-semibold text-gray-700 mb-4">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link
          to="/"
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-150"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const totalAmount = calculateTotalAmount();

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 font-custom bg-gray-50 min-h-screen">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 sm:mb-8 text-center sm:text-left">Your Shopping Cart</h1>
      
      {actionMessage && (
        <div className={`mb-4 p-3 rounded-md text-sm ${actionMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {actionMessage.text}
        </div>
      )}
      {/* General error that might occur during checkout, shown above summary */}
      {error && updatingItemId === null && !isLoading && (
          <div className={`mb-4 p-3 rounded-md text-sm bg-red-50 text-red-700`}>
            Error during checkout: {error}
          </div>
        )}


      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="divide-y divide-gray-200">
          {cartItems.map((item) => (
            <div key={item.id} className={`p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 transition-opacity duration-300 ${updatingItemId === item.id ? 'opacity-50 pointer-events-none' : ''}`}>
              <img
                src={item.imageUrl || "https://via.placeholder.com/100"}
                alt={item.name}
                className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-md border border-gray-200 flex-shrink-0"
              />
              <div className="flex-grow min-w-0"> {/* Added min-w-0 for flex item truncation */}
                <h2 className="text-lg font-semibold text-gray-800 truncate" title={item.name}>{item.name}</h2>
                <p className="text-sm text-gray-500">Category: {item.category}</p>
                <p className="text-md font-medium text-blue-600">₹{item.price.toFixed(2)}</p>
              </div>
              <div className="flex flex-col items-start sm:items-end space-y-2 w-full sm:w-auto flex-shrink-0">
                 <div className="flex items-center space-x-1 sm:space-x-2">
                    <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                        disabled={updatingItemId === item.id || item.quantity <= 1} // Disable if quantity is 1 for direct removal
                        className="p-1.5 text-gray-500 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Decrease quantity"
                    >
                        <MinusCircle className="w-5 h-5"/>
                    </button>
                    <span className="w-10 text-center font-medium">{item.quantity}</span>
                    <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                        disabled={updatingItemId === item.id}
                        className="p-1.5 text-gray-500 hover:text-green-600 disabled:opacity-50"
                        aria-label="Increase quantity"
                    >
                        <PlusCircle className="w-5 h-5"/>
                    </button>
                    <button
                        onClick={() => handleRemoveItem(item.id)}
                        disabled={updatingItemId === item.id}
                        className="p-2 text-gray-400 hover:text-red-700 hover:bg-red-50 rounded-md transition ml-2"
                        aria-label="Remove item"
                    >
                        {updatingItemId === item.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                    </button>
                 </div>
                <p className="text-md font-semibold text-gray-800 self-stretch text-right sm:text-right">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {cartItems.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-gray-200 bg-gray-50 rounded-b-lg">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Total</h2>
                <p className="text-2xl font-bold text-blue-600">₹{totalAmount.toFixed(2)}</p>
            </div>
            <button
                onClick={handleCheckout}
                disabled={isLoading || cartItems.length === 0} 
                className={`w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150
                            ${(isLoading || cartItems.length === 0) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {isLoading && updatingItemId === null ? ( 
                    <Loader2 className="w-5 h-5 mx-auto animate-spin" />
                ) : (
                    "Proceed to Checkout"
                )}
            </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;