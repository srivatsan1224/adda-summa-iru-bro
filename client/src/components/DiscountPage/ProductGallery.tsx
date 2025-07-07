import React from 'react';
import { Heart } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  name: string;
  discount?: number;
  selectedImage: string;
  isWishlist: boolean;
  onImageSelect: (image: string) => void;
  onWishlistToggle: () => void;
  onAddToCart: () => void;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  name,
  discount,
  selectedImage,
  isWishlist,
  onImageSelect,
  onWishlistToggle,
  onAddToCart,
}) => {
  return (
    <div className="w-full lg:w-2/5 space-y-3 md:space-y-4 px-4 md:px-0">
      <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
        <img
          src={selectedImage}
          alt={name}
          className="w-full h-full object-cover"
        />
        <button 
          onClick={onWishlistToggle}
          className="absolute top-3 md:top-4 right-3 md:right-4 p-1.5 md:p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
        >
          <Heart className={`w-4 h-4 md:w-5 md:h-5 ${isWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </button>
        {discount && (
          <div className="absolute top-3 md:top-4 left-3 md:left-4 bg-red-500 text-white px-2 py-1 rounded-md text-xs md:text-sm font-medium">
            {discount}% OFF
          </div>
        )}
      </div>
      <div className="flex gap-2 md:gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
        {images?.map((image: string, index: number) => (
          <button
            key={index}
            onClick={() => onImageSelect(image)}
            className={`relative flex-shrink-0 w-16 md:w-20 h-16 md:h-20 rounded-lg overflow-hidden snap-start ${
              selectedImage === image ? 'ring-2 ring-indigo-500' : 'ring-1 ring-gray-200'
            }`}
          >
            <img
              src={image}
              alt={`Product ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
      <div className="flex gap-2 md:gap-4">
        <button
          onClick={onAddToCart}
          className="flex-1 px-4 md:px-6 py-2.5 md:py-3 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          Add to Cart
        </button>
        <button 
          className="flex-1 px-4 md:px-6 py-2.5 md:py-3 text-sm font-semibold text-indigo-600 bg-white border border-indigo-600 rounded-lg hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductGallery;