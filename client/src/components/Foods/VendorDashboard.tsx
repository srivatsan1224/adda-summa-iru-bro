import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define types for restaurant and food item
interface Restaurant {
  id: string; // Ensure `id` is required for mapping and selection
  name: string;
  address: string;
  phone: string;
  rating: number;
  image: string;
}

interface FoodItem {
  name: string;
  ingredients: string;
  cost: number;
  rating: number;
  image: string;
}

const VendorDashboard: React.FC = () => {
  const [restaurant, setRestaurant] = useState<Omit<Restaurant, 'id'>>({
    name: '',
    address: '',
    phone: '',
    rating: 0,
    image: '',
  });
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
  const [foodItem, setFoodItem] = useState<FoodItem>({
    name: '',
    ingredients: '',
    cost: 0,
    rating: 0,
    image: '',
  });

  // Fetch restaurants when the component mounts
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get<Restaurant[]>('https://bachelors-food-backend.onrender.com/api/restaurants');
        setRestaurants(response.data);
      } catch (error) {
        console.error('Failed to fetch restaurants:', error);
      }
    };

    fetchRestaurants();
  }, []);

  // Handle restaurant submission
  const handleAddRestaurant = async () => {
    try {
      const response = await axios.post<Restaurant>('https://bachelors-food-backend.onrender.com/api/restaurants', restaurant);
      setRestaurants((prev) => [...prev, response.data]); // Append new restaurant
      setRestaurant({ name: '', address: '', phone: '', rating: 0, image: '' });
      alert(`Restaurant "${response.data.name}" added successfully!`);
    } catch (error) {
      console.error('Failed to add restaurant:', error);
      alert('Failed to add restaurant.');
    }
  };

  // Handle food item submission
  const handleAddFoodItem = async () => {
    if (!selectedRestaurant) {
      alert('Please select a restaurant first!');
      return;
    }

    try {
      const response = await axios.post<FoodItem>(
        `https://bachelors-food-backend.onrender.com/api/restaurants/${selectedRestaurant}/food`,
        foodItem
      );
      alert(`Food item "${response.data.name}" added successfully!`);
      setFoodItem({ name: '', ingredients: '', cost: 0, rating: 0, image: '' });
    } catch (error) {
      console.error('Failed to add food item:', error);
      alert('Failed to add food item.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Vendor Dashboard</h1>

      {/* Add Restaurant */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Add Restaurant</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Restaurant Name"
            value={restaurant.name}
            onChange={(e) => setRestaurant({ ...restaurant, name: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Address"
            value={restaurant.address}
            onChange={(e) => setRestaurant({ ...restaurant, address: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Phone"
            value={restaurant.phone}
            onChange={(e) => setRestaurant({ ...restaurant, phone: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Rating (out of 5)"
            value={restaurant.rating}
            onChange={(e) => setRestaurant({ ...restaurant, rating: Number(e.target.value) })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={restaurant.image}
            onChange={(e) => setRestaurant({ ...restaurant, image: e.target.value })}
            className="border p-2 rounded"
          />
        </div>
        <button
          onClick={handleAddRestaurant}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Restaurant
        </button>
      </div>

      {/* Add Food Items */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Add Food Items</h2>
        <div className="mb-4">
          <label htmlFor="restaurant-select" className="block font-bold mb-2">
            Select Restaurant
          </label>
          <select
            id="restaurant-select"
            value={selectedRestaurant || ''}
            onChange={(e) => setSelectedRestaurant(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">-- Select a Restaurant --</option>
            {restaurants.map((res) => (
              <option key={res.id} value={res.id}>
                {res.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Food Name"
            value={foodItem.name}
            onChange={(e) => setFoodItem({ ...foodItem, name: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Ingredients"
            value={foodItem.ingredients}
            onChange={(e) => setFoodItem({ ...foodItem, ingredients: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Cost"
            value={foodItem.cost}
            onChange={(e) => setFoodItem({ ...foodItem, cost: Number(e.target.value) })}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Rating (out of 5)"
            value={foodItem.rating}
            onChange={(e) => setFoodItem({ ...foodItem, rating: Number(e.target.value) })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={foodItem.image}
            onChange={(e) => setFoodItem({ ...foodItem, image: e.target.value })}
            className="border p-2 rounded"
          />
        </div>
        <button
          onClick={handleAddFoodItem}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Food Item
        </button>
      </div>
    </div>
  );
};

export default VendorDashboard;