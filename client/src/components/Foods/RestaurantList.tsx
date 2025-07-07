import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaStar, FaMapMarkerAlt, FaHeart, FaSearch } from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";
import axios from "axios";
import FoodLoader from './FoodLoader';

interface Restaurant {
  id: string;
  name: string;
  address: string;
  rating: number;
  image: string;
  cuisine?: string;
  deliveryTime?: string;
  priceRange?: string;
}

// Cache expiration time (in milliseconds) - 1 hour
const CACHE_EXPIRATION = 60 * 60 * 1000;

const RestaurantList: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [favoriteRestaurants, setFavoriteRestaurants] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('restaurantFavorites');
    if (savedFavorites) {
      setFavoriteRestaurants(new Set(JSON.parse(savedFavorites)));
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (favoriteRestaurants.size > 0) {
      localStorage.setItem('restaurantFavorites', JSON.stringify([...favoriteRestaurants]));
    }
  }, [favoriteRestaurants]);

  const toggleFavorite = (e: React.MouseEvent, restaurantId: string) => {
    e.stopPropagation(); // Prevent navigation when clicking the heart icon
    
    const newFavorites = new Set(favoriteRestaurants);
    if (favoriteRestaurants.has(restaurantId)) {
      newFavorites.delete(restaurantId);
    } else {
      newFavorites.add(restaurantId);
    }
    setFavoriteRestaurants(newFavorites);
  };

  const fetchRestaurants = useCallback(async () => {
    setIsLoading(true);
    
    try {
      // Check if we have cached data
      const cachedData = localStorage.getItem('restaurants');
      const cacheTimestamp = localStorage.getItem('restaurantsCache_timestamp');
      
      const now = new Date().getTime();
      const isCacheValid = cacheTimestamp && (now - parseInt(cacheTimestamp)) < CACHE_EXPIRATION;
      
      if (cachedData && isCacheValid) {
        // Use cached data
        setRestaurants(JSON.parse(cachedData));
        setIsLoading(false);
        return;
      }
      
      // Fetch fresh data
      const response = await axios.get<Restaurant[]>("https://bachelors-food-backend.onrender.com/api/restaurants");
      
      // Adding some mock data for demonstration
      const enhancedData = response.data.map(restaurant => ({
        ...restaurant,
        cuisine: ["Italian", "Japanese", "Indian", "Mexican"][Math.floor(Math.random() * 4)],
        deliveryTime: `${15 + Math.floor(Math.random() * 30)} mins`,
        priceRange: ["$", "$$", "$$$"][Math.floor(Math.random() * 3)]
      }));
      
      // Update state
      setRestaurants(enhancedData);
      
      // Cache the data
      localStorage.setItem('restaurants', JSON.stringify(enhancedData));
      localStorage.setItem('restaurantsCache_timestamp', now.toString());
    } catch (error) {
      console.error("Failed to fetch restaurants:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.cuisine?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCuisine = selectedCuisine === "all" || restaurant.cuisine === selectedCuisine;
    return matchesSearch && matchesCuisine;
  });

  const cuisines = ["all", ...new Set(restaurants.map(r => r.cuisine || ""))];

  // Function to refresh data manually
  const handleRefresh = () => {
    // Clear the cache timestamps to force a fresh fetch
    localStorage.removeItem('restaurantsCache_timestamp');
    fetchRestaurants();
  };

  if (isLoading) {
    return <FoodLoader />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Discover Amazing Restaurants
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          Find and explore the best restaurants in your area
        </p>
        <button 
          onClick={handleRefresh}
          className="text-sm text-orange-500 hover:text-orange-600 flex items-center mx-auto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh restaurant list
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        <div className="relative max-w-xl mx-auto">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search restaurants or cuisines..."
            className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {cuisines.map((cuisine) => (
            <button
              key={cuisine}
              onClick={() => setSelectedCuisine(cuisine)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCuisine === cuisine
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cuisine.charAt(0).toUpperCase() + cuisine.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Restaurant Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRestaurants.map((restaurant) => (
          <motion.div
            key={restaurant.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group"
            onClick={() => navigate(`/restaurant/${restaurant.id}`)}
          >
            <div className="relative">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                loading="lazy" // Add lazy loading for images
              />
              <button 
                className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                onClick={(e) => toggleFavorite(e, restaurant.id)}
              >
                <FaHeart className={`transition-colors ${
                  favoriteRestaurants.has(restaurant.id) ? "text-red-500" : "text-gray-600 hover:text-red-500"
                }`} />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <div className="flex items-center space-x-1">
                  <span className="px-2 py-1 rounded-full bg-orange-500 text-white text-xs font-medium">
                    {restaurant.priceRange}
                  </span>
                  <span className="px-2 py-1 rounded-full bg-green-500 text-white text-xs font-medium">
                    {restaurant.cuisine}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{restaurant.name}</h3>
              
              <div className="flex items-center text-gray-600 mb-2">
                <FaMapMarkerAlt className="text-gray-400 mr-2" />
                <p className="text-sm truncate">{restaurant.address}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span className="font-medium">{restaurant.rating}</span>
                  <span className="text-gray-500 text-sm ml-1">(200+ reviews)</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <MdDeliveryDining className="text-green-500 mr-1" />
                  <span className="text-sm">{restaurant.deliveryTime}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredRestaurants.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No restaurants found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default RestaurantList;