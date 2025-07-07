// src/components/FiltersPage.tsx

import React, { useState } from "react";
import { sampleRestaurants, Restaurant } from "./data";

const FiltersPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredRestaurants = selectedCategory
    ? sampleRestaurants.filter(
        (restaurant) => restaurant.category === selectedCategory
      )
    : sampleRestaurants;

  return (
    <div className="p-6">
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {["Healthy", "Home style"].map((category) => (
          <button
            key={category}
            className={`px-4 py-2 border rounded ${
              selectedCategory === category
                ? "bg-blue-500 text-white"
                : "bg-gray-100"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
        <button
          className="px-4 py-2 border rounded bg-gray-100"
          onClick={() => setSelectedCategory(null)}
        >
          Clear Filters
        </button>
      </div>

      {/* Restaurant List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRestaurants.map((restaurant: Restaurant) => (
          <div
            key={restaurant.id}
            className="bg-white p-4 shadow-md rounded-md"
          >
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="mt-4 text-xl font-bold">{restaurant.name}</h3>
            <p className="mt-2 text-sm">{restaurant.description}</p>
            <button
              className="mt-4 text-blue-500"
              onClick={() =>
                (window.location.href = `/restaurant1/${restaurant.id}`)
              }
            >
              View Details →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FiltersPage;
