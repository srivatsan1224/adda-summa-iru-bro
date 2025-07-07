import React from "react";
import { useNavigate } from "react-router-dom";

interface CardProps {
  id: string; // ID of the item
  category: string; // Category of the item (e.g., furniture, appliances, etc.)
  imageUrl: string; // URL of the product image
  name: string; // Name of the item
  price: number; // Current price/rent of the item
  originalPrice?: number; // Original price (optional)
  discount?: number; // Discount percentage (optional)
  ratings?: number; // Ratings (optional)
  availability?: string; // Availability status (optional)
}

const Card: React.FC<CardProps> = ({
  id,
  category,
  imageUrl,
  name,
  price,
  originalPrice,
  discount,
  ratings,
  availability,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/rental/${category}/${id}`);
    console.log(`Navigating to: /home/rental/${category}/${id}`);
  };

  return (
    <div
      className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={handleClick}
    >
      {/* Product Image */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={imageUrl || "https://via.placeholder.com/300"}
          alt={name}
          className="object-cover h-full w-full"
        />
      </div>
      {/* Product Details */}
      <div className="p-4">
        {/* Item Name */}
        <h2 className="font-semibold text-lg text-gray-800">{name}</h2>

        {/* Rent/Price */}
        <div className="flex items-center mt-2">
          <span className="text-xl font-bold text-gray-900">
            ₹{price} / month
          </span>
          {discount && discount > 0 && (
            <span className="ml-3 text-sm text-yellow-500">-{discount}%</span>
          )}
        </div>
        {originalPrice && originalPrice > price && (
          <p className="text-sm text-gray-400 line-through mt-1">
            ₹{originalPrice}
          </p>
        )}

        {/* Ratings */}
        {ratings && (
          <div className="flex items-center mt-2">
            <span className="text-sm text-gray-500">{ratings} ★</span>
          </div>
        )}

        {/* Availability */}
        {availability && (
          <p
            className={`text-sm mt-2 ${
              availability === "In Stock" ? "text-green-500" : "text-red-500"
            }`}
          >
            {availability}
          </p>
        )}
      </div>
    </div>
  );
};

export default Card;
