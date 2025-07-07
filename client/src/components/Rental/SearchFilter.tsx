import React, { useState } from "react";

interface SearchFilterProps {
  onSearch: (filters: any) => void; // Callback to pass filter data to the parent
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch }) => {
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState([500, 50000]);
  const [rentalType, setRentalType] = useState("");
  const [availability, setAvailability] = useState("");
  const [ratings, setRatings] = useState("");

  const handleSearchClick = () => {
    const filters = {
      search,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      rentalType,
      availability,
      ratings,
    };
    onSearch(filters); // Send filters to the parent component
  };

  return (
    <div className="max-w-[1200px] mx-auto p-4 bg-white rounded-md shadow-md">
      {/* First Row: Search Input, Price Range, and Search Button */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
        {/* Search Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Search
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Enter to search"
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price Range
          </label>
          <div className="flex items-center">
            <input
              type="range"
              min="100"
              max="50000"
              step="100"
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([Number(e.target.value), priceRange[1]])
              }
              className="mt-1 mr-2 flex-1"
            />
            <input
              type="range"
              min="100"
              max="50000"
              step="100"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
              className="mt-1 flex-1"
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">
            ₹{priceRange[0]} - ₹{priceRange[1]}
          </p>
        </div>

        {/* Search Button */}
        <div className="flex justify-center md:justify-start">
          <button
            onClick={handleSearchClick}
            className="w-full md:w-auto px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Search
          </button>
        </div>
      </div>

      {/* Second Row: Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {/* Rental Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Rental Type
          </label>
          <select
            value={rentalType}
            onChange={(e) => setRentalType(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Rental Type</option>
            <option value="short-term">Short Term</option>
            <option value="long-term">Long Term</option>
          </select>
        </div>

        {/* Availability */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Availability
          </label>
          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Availability</option>
            <option value="in-stock">In Stock</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
        </div>

        {/* Ratings */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ratings
          </label>
          <select
            value={ratings}
            onChange={(e) => setRatings(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Ratings</option>
            <option value="1">1+ Stars</option>
            <option value="2">2+ Stars</option>
            <option value="3">3+ Stars</option>
            <option value="4">4+ Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
