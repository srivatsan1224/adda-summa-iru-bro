import React, { useEffect, useState, useCallback } from "react";
import { Search, SlidersHorizontal, Loader2 } from "lucide-react";
import SearchFilter from "../../components/Rental/SearchFilter"; // Assuming path is correct
import Card from "../../components/Rental/Card";                 // Assuming path is correct
import apiService from "../../services/apiService";             // Your API service
import { RentalItem } from "../../types";                       // Shared types

const CATEGORY_NAME = "Fitness"; // Define category name for this page

const FitnessHome: React.FC = () => {
  const [items, setItems] = useState<RentalItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<any>({}); // Store applied filters + search
  const [searchQueryInput, setSearchQueryInput] = useState(""); // For the input field value

  const fetchItems = useCallback(async (filtersToApply: any) => {
    setIsLoading(true);
    try {
      // Construct query parameters
      const queryParams: any = {};
      if (filtersToApply.search) queryParams.search = filtersToApply.search;
      if (filtersToApply.minPrice) queryParams.minPrice = filtersToApply.minPrice;
      if (filtersToApply.maxPrice) queryParams.maxPrice = filtersToApply.maxPrice;
      if (filtersToApply.rentalType) queryParams.rentalType = filtersToApply.rentalType;
      if (filtersToApply.ratings) queryParams.ratings = filtersToApply.ratings;
      // Handle 'availability' filter mapping if SearchFilter uses different values
      // Example: if (filtersToApply.availability === 'in-stock') queryParams.availability = 'available';

      const response = await apiService.get<RentalItem[]>(`/items/filter/${CATEGORY_NAME}`, {
        params: queryParams,
      });
      setItems(response.data);
    } catch (error) {
      console.error(`Error fetching ${CATEGORY_NAME} items:`, error);
      setItems([]); // Clear items on error
    } finally {
      setIsLoading(false);
    }
  }, [searchQueryInput]); // searchQueryInput removed from deps, handled by handleSearchQuery/handleFilterSearch

  useEffect(() => {
    // Initial fetch without specific filters (only category based)
    // Pass currentFilters which might include a default search from searchQueryInput if desired
    fetchItems({ search: searchQueryInput, ...currentFilters });
  }, []); // Fetch on initial mount

  // Called when filters from SearchFilter component are applied
  const handleFilterSearch = (filtersFromSearchComponent: any) => {
    const newFilters = { ...filtersFromSearchComponent, search: searchQueryInput };
    setCurrentFilters(newFilters);
    fetchItems(newFilters);
    setIsFilterVisible(false); // Optionally close filter panel after search
  };

  // Called when the main search bar's button is clicked
  const handleSearchQuerySubmit = () => {
    const newFilters = { ...currentFilters, search: searchQueryInput };
    setCurrentFilters(newFilters);
    fetchItems(newFilters);
  };
  
  // Helper to determine availability text and color for the Card component
  const getCardAvailability = (availabilityValue: RentalItem['availability']) => {
    if (availabilityValue === true || availabilityValue === "available") {
      return { text: "In Stock", isAvailable: true };
    }
    if (availabilityValue === "rented") {
      return { text: "Rented Out", isAvailable: false };
    }
    if (availabilityValue === "maintenance") {
      return { text: "Maintenance", isAvailable: false };
    }
    return { text: "Out of Stock", isAvailable: false }; // Default for false or other
  };


  return (
    <div className="min-h-screen bg-gray-50 font-custom">
      {/* Hero Section - Specific to Electronics */}
      <div className="bg-gradient-to-r from-blue-500/10 via-blue-500/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              Fitness Equipment on Rent
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Achieve your fitness goals with top-notch equipment. Rent today
              and get in shape without breaking the bank.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls Bar */}
        <div className="flex flex-wrap justify-between items-center space-y-4 sm:space-y-0 mb-6">
          <button
            onClick={() => setIsFilterVisible(!isFilterVisible)}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
          </button>

          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Search ${CATEGORY_NAME.toLowerCase()}...`}
              value={searchQueryInput}
              onChange={(e) => setSearchQueryInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearchQuerySubmit()}
              className="pl-10 pr-4 py-2 w-full sm:w-64 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleSearchQuerySubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition"
            >
              Search
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {isFilterVisible && (
          <div className="bg-white rounded-md shadow-sm p-4 mb-6">
            <SearchFilter onSearch={handleFilterSearch} /> {/* onSearch prop handles filter submission */}
          </div>
        )}

        {/* Products Grid */}
        <div className="flex-1">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
          ) : items.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {items.map((item: RentalItem) => {
                const cardAvailability = getCardAvailability(item.availability);
                return (
                    <Card
                        key={item.id}
                        id={item.id}
                        category={item.category} // Pass the actual category from the item
                        imageUrl={item.imageUrl || "https://via.placeholder.com/300"} // Fallback image
                        name={item.name}
                        price={item.price}
                        originalPrice={item.originalPrice}
                        discount={item.discount}
                        ratings={item.ratings}
                        availability={cardAvailability.text} // Pass the display text
                        // Pass a boolean for styling if Card component uses it:
                        // isAvailable={cardAvailability.isAvailable}
                    />
                );
            })}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <div className="max-w-sm mx-auto">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No {CATEGORY_NAME.toLowerCase()} found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FitnessHome;