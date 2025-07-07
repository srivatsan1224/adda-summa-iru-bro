// src/components/RestaurantDetails.tsx

import React from "react";
import { useParams } from "react-router-dom";
import { sampleRestaurants, Restaurant } from "./data";

const RestaurantDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const restaurant = sampleRestaurants.find(
    (rest) => rest.id === Number(id)
  ) as Restaurant;

  if (!restaurant) {
    return <p>Restaurant not found!</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{restaurant.name}</h1>
      <p className="mt-2">{restaurant.description}</p>

      {/* Menu Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {restaurant.items.map((item) => (
          <div key={item.id} className="bg-white p-4 shadow-md rounded-md">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-32 object-cover rounded-md"
            />
            <h3 className="mt-4 font-bold">{item.name}</h3>
            <p className="mt-2 text-sm">₹{item.price}</p>
            <p className="mt-2 text-sm">⭐ {item.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantDetails;