import React, { useEffect, useState } from "react";
import axios from "axios";
import { MinusIcon, PlusIcon, ShoppingBagIcon, TrashIcon } from "lucide-react";

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [couponCode, setCouponCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const userJson = localStorage.getItem("user");
        if (!userJson) {
          setError("User data not found. Please log in.");
          setLoading(false);
          return;
        }

        const user = JSON.parse(userJson);
        const userId = user.id;

        const response = await axios.get(
          `http://localhost:3000/user/get?userId=${userId}`
        );

        const cartData = response.data.cart || [];
        setCartItems(cartData);
        setLoading(false);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load cart data. Please try again later.");
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    try {
      const userJson = localStorage.getItem("user");
      if (!userJson) {
        alert("User data not found. Please log in.");
        return;
      }

      const user = JSON.parse(userJson);
      const userId = user.id;

      const response = await axios.put(
        "http://https://bachelors-roshan-backend.onrender.com:3000/user/cart/update",
        {
          userId,
          itemId,
          quantity: newQuantity,
        }
      );

      setCartItems(response.data.updatedCart);
    } catch (err: any) {
      alert("Failed to update cart quantity");
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      const userJson = localStorage.getItem("user");
      if (!userJson) {
        alert("User data not found. Please log in.");
        return;
      }

      const user = JSON.parse(userJson);
      const userId = user.id;

      await axios.delete(
        `http://localhost:3000/user/cart/remove?userId=${userId}&itemId=${itemId}`
      );

      setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    } catch (err: any) {
      alert("Failed to remove item from cart");
    }
  };

  const handleCouponApply = () => {
    if (!couponCode.trim()) {
      alert("Please enter a coupon code");
      return;
    }
    alert(`Coupon "${couponCode}" applied successfully!`);
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h2 className="text-red-500 text-xl font-semibold mb-4">{error}</h2>
          <button
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            onClick={() => window.location.href = '/login'}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-8">
        <ShoppingBagIcon className="h-8 w-8" />
        <h1 className="text-3xl font-bold">Your Shopping Cart</h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <ShoppingBagIcon className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          <p className="text-xl text-gray-600 mb-6">Your cart is empty</p>
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors text-lg"
            onClick={() => window.location.href = '/shop'}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-4 px-6">Product</th>
                    <th className="text-right py-4 px-6">Price</th>
                    <th className="text-center py-4 px-6">Quantity</th>
                    <th className="text-right py-4 px-6">Subtotal</th>
                    <th className="w-[70px] py-4 px-6"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-20 w-20 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium">{item.name}</p>
                            {item.variant && (
                              <p className="text-sm text-gray-500">
                                {item.variant}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="text-right py-4 px-6">₹{item.price}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 hover:bg-gray-50 transition-colors"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          >
                            <MinusIcon className="h-4 w-4" />
                          </button>
                          <span className="w-12 text-center">{item.quantity}</span>
                          <button
                            className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 hover:bg-gray-50 transition-colors"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            <PlusIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                      <td className="text-right py-4 px-6 font-medium">
                        ₹{item.price * item.quantity}
                      </td>
                      <td className="py-4 px-6">
                        <button
                          className="text-red-500 hover:text-red-600 transition-colors"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-white rounded-lg shadow-lg mt-6 p-6">
              <h2 className="text-lg font-semibold mb-4">Have a Coupon?</h2>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleCouponApply}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Apply Coupon
                </button>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold mb-6">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{calculateTotal()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>₹{calculateTotal()}</span>
                  </div>
                </div>
                <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors text-lg">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;