import { useState, useEffect, useCallback } from "react";
import h1 from "../../assets/HousingHome/H1.jpg";
import h2 from "../../assets/HousingHome/H2.jpg";
import h3 from "../../assets/HousingHome/H3.jpg";
import { Search, MapPin, Calendar, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Property {
  id: string;
  email: string;
  rentalDetails: {
    expectedRent: string;
    expectedDeposit: string;
    rentNegotiable: boolean;
    furnishing: string;
    preferredTenants: string[];
  };
  localityDetails: {
    city: string;
    locality: string;
  };
  gallery: {
    photos: string[];
  };
  propertyDetails: {
    apartmentType: string;
    bhkType: string;
  };
}

const PAGE_SIZE = 12; // Adjust number of items per page

const PropertyListComp = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [availability, setAvailability] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [furnishing, setFurnishing] = useState("");
  const [preferredTenants, setPreferredTenants] = useState("");
  const [rentRange, setRentRange] = useState<number>(50000);
  const navigate = useNavigate();

  const placeholders = [h1, h2, h3];

  const buildQueryParams = (pageNumber = 1) => {
    const filters: Record<string, string> = {};
    if (searchText) filters.searchText = searchText;
    if (availability) filters.availability = availability;
    if (propertyType) filters.propertyType = propertyType;
    if (furnishing) filters.furnishing = furnishing;
    if (preferredTenants) filters.preferredTenants = preferredTenants;
    if (rentRange) filters.rentRange = rentRange.toString();
    // Add pagination params
    filters.limit = PAGE_SIZE.toString();
    filters.page = pageNumber.toString();

    return new URLSearchParams(filters).toString();
  };

  const fetchProperties = useCallback(async (pageNumber = 1, append = false) => {
    try {
      setLoading(true);
      const queryParams = buildQueryParams(pageNumber);
      const response = await fetch(
        `http://localhost:3000/api/properties?${queryParams}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch properties: ${response.statusText}`);
      }
      const data = await response.json();
      const fetchedProperties = data.properties || [];
      setProperties((prev) =>
        append ? [...prev, ...fetchedProperties] : fetchedProperties
      );
      // Check if more properties exist (if fewer than PAGE_SIZE returned, assume no more)
      setHasMore(fetchedProperties.length === PAGE_SIZE);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }, [searchText, availability, propertyType, furnishing, preferredTenants, rentRange]);

  useEffect(() => {
    // When filters change, reset to page 1 and fetch new data
    setPage(1);
    fetchProperties(1, false);
  }, [fetchProperties]);

  const applyFilters = () => {
    // Reset to page 1 when filters are applied
    setPage(1);
    fetchProperties(1, false);
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchProperties(nextPage, true);
    }
  };

  const handlePropertyClick = (propertyId: string) => {
    navigate(`/housingitem/${propertyId}`);
  };

  const handleContactOwner = (email: string) => {
    alert(`Contacting owner at ${email}`);
  };

  if (loading && page === 1) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 text-red-500 p-6 rounded-lg shadow-lg animate-fade-in">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Search Bar & Filters */}
      <div className="bg-white shadow-lg sticky top-0 z-50 transition-all duration-300">
        <div className="container mx-auto py-6 px-4">
          <div className="flex flex-wrap items-center gap-4 max-w-full mx-auto">
            <div className="relative flex-grow group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-emerald-500 transition-colors"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by location, property type, or features..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full px-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300"
              />
            </div>
            <button
              onClick={applyFilters}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              Search
            </button>

            <div className="flex items-center gap-4">
              <select
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
              >
                <option value="">Availability</option>
                <option value="available">Available</option>
                <option value="not-available">Not Available</option>
              </select>
              <select
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                <option value="">Property Type</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
              </select>
              <select
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring"
                value={preferredTenants}
                onChange={(e) => setPreferredTenants(e.target.value)}
              >
                <option value="">Preferred Tenants</option>
                <option value="bachelors">Bachelors</option>
                <option value="family">Family</option>
              </select>
              <select
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring"
                value={furnishing}
                onChange={(e) => setFurnishing(e.target.value)}
              >
                <option value="">Furnishing</option>
                <option value="semi">Semi-Furnished</option>
                <option value="fully">Fully-Furnished</option>
              </select>

              <div className="flex items-center">
                <label htmlFor="rentRange" className="text-gray-500 mr-2">
                  Rent: ₹{rentRange}
                </label>
                <input
                  id="rentRange"
                  type="range"
                  min="0"
                  max="50000"
                  value={rentRange}
                  onChange={(e) => setRentRange(Number(e.target.value))}
                  className="ml-2"
                  step="500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-8 px-4">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b border-gray-200 pb-4">
          Available Properties
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {properties.map((property, index) => (
            <div
              key={property.id}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img
                  src={
                    property?.gallery?.photos?.[0] ||
                    placeholders[index % placeholders.length]
                  }
                  alt={property?.propertyDetails?.apartmentType || "Property"}
                  loading="lazy"
                  className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-emerald-500" />
                  <p className="text-sm text-gray-600">
                    {property?.localityDetails?.locality},{" "}
                    {property?.localityDetails?.city}
                  </p>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-emerald-500 transition-colors">
                  {property?.propertyDetails?.apartmentType || "Luxury Apartment"}
                </h3>

                {/* Pricing Section */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Monthly Rent</span>
                    <span className="text-lg font-bold text-gray-800">
                      ₹{property?.rentalDetails?.expectedRent || "10,000"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Security Deposit</span>
                    <span className="text-lg font-bold text-gray-800">
                      ₹{property?.rentalDetails?.expectedDeposit || "50,000"}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                    onClick={() => handlePropertyClick(property.id)}
                  >
                    Details
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    className="flex-1 px-4 py-2 border border-emerald-500 text-emerald-500 rounded-lg hover:bg-emerald-50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                    onClick={() => handleContactOwner(property.email)}
                  >
                    <Calendar className="w-4 h-4" />
                    Contact Owner
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMore}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyListComp;
