import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  Search, Filter, Star, Tag, ChevronDown, ShoppingBag, Smartphone, Shirt, Watch, Home, 
  Sparkles, Headphones, MoreHorizontal, Heart, ShoppingCart 
} from "lucide-react";

const SearchPage: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    isFree: false,
    isExclusive: false,
    priceRange: "",
    rating: "",
    discount: "",
  });
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/products/search", {
        params: {
          search: searchQuery,
          category: selectedCategory,
          isFree: filters.isFree ? "true" : "false",
          isExclusive: filters.isExclusive ? "true" : "false",
          discount: filters.discount || undefined,
          minPrice: filters.priceRange ? filters.priceRange.split("-")[0] : undefined,
          maxPrice: filters.priceRange ? filters.priceRange.split("-")[1] : undefined,
          rating: filters.rating || undefined,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchQuery, selectedCategory, filters]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryClick = (category: string) => {
    if (category === 'More'){
      setSelectedCategory(null);
    } else {
      setSelectedCategory(selectedCategory === category ? null : category);
    }
  };

  const toggleFilter = (filterKey: keyof typeof filters) => {
    setFilters((prev) => ({
      ...prev,
      [filterKey]: !prev[filterKey],
    }));
  };

  const updateDropdownFilter = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

  const handleProductClick = (product: any) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="space-y-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Discover Amazing Deals
          </h1>
          
          {/* Search Bar and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center max-w-4xl mx-auto">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white shadow-sm text-base"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            
            <div className="flex gap-3 flex-wrap justify-center">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <Filter className="h-5 w-5" />
                <span className="text-sm">Filters</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${dropdownVisible ? 'rotate-180' : ''}`} />
              </button>
              
              <button
                onClick={() => toggleFilter("isFree")}
                className={`px-4 py-3 rounded-xl border transition-all duration-200 shadow-sm hover:shadow-md ${
                  filters.isFree
                    ? "bg-blue-100 border-blue-300 text-blue-700"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
              >
                <Tag className="h-5 w-5" />
                <span className="ml-2 text-sm">Free</span>
              </button>
              
              <button
                onClick={() => toggleFilter("isExclusive")}
                className={`px-4 py-3 rounded-xl border transition-all duration-200 shadow-sm hover:shadow-md ${
                  filters.isExclusive
                    ? "bg-blue-100 border-blue-300 text-blue-700"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
              >
                <Star className="h-5 w-5" />
                <span className="ml-2 text-sm">Exclusive</span>
              </button>
            </div>
          </div>
        </div>

        {/* Advanced Filters Dropdown */}
        {dropdownVisible && (
          <div className="mt-4 p-4 sm:p-6 bg-white rounded-2xl border border-gray-200 shadow-lg max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <select
                  className="w-full rounded-xl border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 py-2"
                  value={filters.priceRange}
                  onChange={(e) => updateDropdownFilter("priceRange", e.target.value)}
                >
                  <option value="">All Prices</option>
                  <option value="0-5000">₹0 - ₹5,000</option>
                  <option value="5000-10000">₹5,000 - ₹10,000</option>
                  <option value="10000-20000">₹10,000 - ₹20,000</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <select
                  className="w-full rounded-xl border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 py-2"
                  value={filters.rating}
                  onChange={(e) => updateDropdownFilter("rating", e.target.value)}
                >
                  <option value="">All Ratings</option>
                  <option value="3">3★ & Above</option>
                  <option value="4">4★ & Above</option>
                  <option value="5">5★ Only</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount
                </label>
                <select
                  className="w-full rounded-xl border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 py-2"
                  value={filters.discount}
                  onChange={(e) => updateDropdownFilter("discount", e.target.value)}
                >
                  <option value="">All Discounts</option>
                  <option value="10">10% & Above</option>
                  <option value="20">20% & Above</option>
                  <option value="30">30% & Above</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Categories */}
        <div className="mt-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {[
              { name: "Grocery", icon: ShoppingBag, color: "blue" },
              { name: "Mobile", icon: Smartphone, color: "purple" },
              { name: "Fashion", icon: Shirt, color: "pink" },
              { name: "Watch", icon: Watch, color: "amber" },
              { name: "Home", icon: Home, color: "emerald" },
              { name: "Beauty", icon: Sparkles, color: "rose" },
              { name: "Electronics", icon: Headphones, color: "indigo" },
              { name: "More", icon: MoreHorizontal, color: "gray" },
            ].map(({ name, icon: Icon, color }) => (
              <div
                key={name}
                onClick={() => handleCategoryClick(name)}
                className="relative group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-50 rounded-2xl transform rotate-6 group-hover:rotate-0 transition-transform duration-300"></div>
                <div className={`relative bg-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                  selectedCategory === name ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                }`}>
                  <div className={`w-12 h-12 mx-auto bg-${color}-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-2`}>
                    <Icon className={`h-6 w-6 text-${color}-600`} />
                  </div>
                  <p className="font-medium text-gray-700 text-center group-hover:text-gray-900 transition-colors text-sm">
                    {name}
                  </p>
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="mt-12">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              {loading ? "Searching..." : selectedCategory ? `${selectedCategory} Products` : "Today's Best Deals"}
            </h2>
            <button className="mt-2 sm:mt-0 text-blue-600 hover:text-blue-700 font-medium text-sm">
              View All
            </button>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {products.length > 0 ? (
                products.map((product: any) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group cursor-pointer"
                  >
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-40 sm:h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50">
                          <Heart className="h-5 w-5 text-gray-600" />
                        </button>
                      </div>
                      <div className="absolute top-2 left-2">
                        <span className="bg-red-500 text-white px-2 py-1 text-xs sm:text-sm rounded-full">
                          {product.discount}% OFF
                        </span>
                      </div>
                    </div>
                    <div className="p-3 sm:p-4">
                      <h3 className="font-medium text-gray-900 mb-1 truncate text-sm sm:text-base">{product.name}</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm sm:text-lg font-bold text-blue-600">
                            ₹{product.price.toLocaleString()}
                          </span>
                          <span className="ml-1 text-xs sm:text-sm text-gray-400 line-through">
                            ₹{product.oldPrice.toLocaleString()}
                          </span>
                        </div>
                        <button className="bg-blue-50 p-2 rounded-full hover:bg-blue-100 transition-colors">
                          <ShoppingCart className="h-5 w-5 text-blue-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-500">No products found.</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Try adjusting your search or filters
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
