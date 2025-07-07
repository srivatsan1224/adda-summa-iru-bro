import React from 'react';
import {
  Star,
  Share2,
  Award,
  Percent,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  MapPin,
  Truck,
  RotateCcw,
  Shield,
  CreditCard,
} from 'lucide-react';

interface ProductInfoProps {
  product: any;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
  pincode: string;
  onQuantityChange: (amount: number) => void;
  onColorSelect: (color: string) => void;
  onSizeSelect: (size: string) => void;
  onPincodeChange: (value: string) => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  quantity,
  selectedColor,
  selectedSize,
  pincode,
  onQuantityChange,
  onColorSelect,
  onSizeSelect,
  onPincodeChange,
}) => {
  const bankOffers = [
    "10% instant discount on HDFC Bank Credit Cards",
    "5% unlimited cashback on Flipkart Axis Bank Credit Card",
    "Get GST invoice and save up to 28% on business purchases",
  ];

  return (
    <div className="w-full md:w-3/5 space-y-6 p-4">
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{product.name}</h1>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center px-3 py-1 bg-green-600 text-white rounded-md">
            <span className="font-medium">{product.rating}</span>
            <Star className="w-4 h-4 ml-1 fill-current" />
          </div>
          <span className="text-sm text-gray-500">
            ({product.reviews || "150"} Ratings & Reviews)
          </span>
          <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
        {product.assured && (
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-medium">Premium Quality Assured</span>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <div className="flex flex-wrap items-baseline gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            ₹{product.price.toLocaleString()}
          </h2>
          {product.oldPrice && (
            <>
              <span className="text-lg text-gray-500 line-through">
                ₹{product.oldPrice.toLocaleString()}
              </span>
              <span className="text-green-600 font-semibold">
                {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% off
              </span>
            </>
          )}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {product.isInStock ? "In Stock" : "Out of Stock"}
          </span>
          {product.fastDelivery && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Fast Delivery
            </span>
          )}
        </div>
      </div>

      {/* Bank Offers */}
      <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Percent className="w-5 h-5 text-green-600" />
          Available offers
        </h3>
        <ul className="space-y-2">
          {bankOffers.map((offer, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
              <span>{offer}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Color Selection */}
      {product.colors && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-900">Color</h3>
          <div className="flex gap-3 flex-wrap">
            {product.colors.map((color: string) => (
              <button
                key={color}
                onClick={() => onColorSelect(color)}
                className={`w-9 h-9 rounded-full flex items-center justify-center ${
                  selectedColor === color
                    ? 'ring-2 ring-offset-2 ring-indigo-500'
                    : 'ring-1 ring-gray-200'
                }`}
              >
                <span
                  className="w-7 h-7 rounded-full"
                  style={{ backgroundColor: color }}
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size Selection */}
      {product.sizes && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-gray-900">Select Size</h3>
            <button className="text-sm text-indigo-600 hover:text-indigo-800">Size Chart</button>
          </div>
          <div className="flex flex-wrap gap-3">
            {product.sizes.map((size: string) => (
              <button
                key={size}
                onClick={() => onSizeSelect(size)}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  selectedSize === size
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-900 ring-1 ring-gray-200 hover:bg-gray-50'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onQuantityChange(-1)}
            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <button
            onClick={() => onQuantityChange(1)}
            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Delivery Check */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-900">Delivery Options</h3>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={pincode}
              onChange={(e) => onPincodeChange(e.target.value)}
              placeholder="Enter delivery pincode"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          <button className="px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50">
            Check
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <Truck className="w-5 h-5 text-gray-400" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900">Free Delivery</h4>
            <p className="text-sm text-gray-500">
              Delivered by{' '}
              {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <RotateCcw className="w-5 h-5 text-gray-400" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900">30 Days Return</h4>
            <p className="text-sm text-gray-500">Easy returns within 30 days</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <Shield className="w-5 h-5 text-gray-400" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900">Secure Payment</h4>
            <p className="text-sm text-gray-500">100% secure payment</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <CreditCard className="w-5 h-5 text-gray-400" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900">Payment Options</h4>
            <p className="text-sm text-gray-500">COD, UPI, Cards accepted</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
