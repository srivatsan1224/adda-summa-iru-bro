import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShoppingCart, Heart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: string;
  oldPrice: string;
  discount: string;
  image: string;
}

const TopDeals: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/products'
        );
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  if (loading) {
    return (
      <div className="w-[90%] mx-auto my-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[90%] mx-auto my-16">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Today's Best Deals
        </h2>
        <button className="mt-4 sm:mt-0 text-blue-600 hover:text-blue-700 font-medium">
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => handleProductClick(product)}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow group cursor-pointer"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-36 sm:h-48 object-cover"
              />
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-white p-1 sm:p-2 rounded-full shadow-md hover:bg-gray-50">
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                </button>
              </div>
              <div className="absolute top-2 left-2">
                <span className="bg-red-500 text-white px-2 py-1 text-xs sm:text-sm rounded-full">
                  {product.discount}
                </span>
              </div>
            </div>
            <div className="p-2 sm:p-4">
              <h3 className="font-medium text-gray-900 mb-1 truncate text-sm sm:text-base">
                {product.name}
              </h3>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm sm:text-lg font-bold text-blue-600">
                    {product.price}
                  </span>
                  <span className="ml-1 text-xs sm:text-sm text-gray-400 line-through">
                    {product.oldPrice}
                  </span>
                </div>
                <button className="bg-blue-50 p-1 sm:p-2 rounded-full hover:bg-blue-100 transition-colors">
                  <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopDeals;
