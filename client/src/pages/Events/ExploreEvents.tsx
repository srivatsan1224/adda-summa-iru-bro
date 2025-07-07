import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, MapPin } from "lucide-react";
import HeroSection from "../../components/EventsComp/HeroSection";
import EventCard from "../../components/EventsComp/EventCard";
import CategoryCard from "../../components/EventsComp/CategoryCard";
import NewsletterSection from "../../components/EventsComp/NewsletterSection";
import { categories } from "../../data/eventData";

// Define Event type with id as string (to match EventProps in EventCard)
interface Event {
  id: string; // id is string here
  title: string;
  location: string;
  price: string;
  rating: number;
  image: string;
  date: string;
  reviews: number;
  tag: string;
}

const ExploreEvents: React.FC = () => {
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [locationQuery, setLocationQuery] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [showFilters, setShowFilters] = useState<boolean>(false); // State to toggle filter visibility

  useEffect(() => {
    // Fetch all events from the backend on initial load
    const fetchEvents = async () => {
      const response = await fetch("http://localhost:3000/events");
      const data: Event[] = await response.json(); // Type the response data as Event[]
      setAllEvents(data);
      setFilteredEvents(data);
    };

    fetchEvents();
  }, []);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle location input change
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocationQuery(e.target.value);
  };

  // Handle event card click to navigate to event details page
  const handleEventClick = (eventId: string) => {
    navigate(`/events/${eventId}`); // Use eventId as string
  };

  // Filter events based on search query, location query, price, and rating
  useEffect(() => {
    let filtered = allEvents;

    // Apply search query filter
    if (searchQuery) {
      filtered = filtered.filter((event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply location query filter
    if (locationQuery) {
      filtered = filtered.filter((event) =>
        event.location.toLowerCase().includes(locationQuery.toLowerCase())
      );
    }

    // Apply price range filter
    filtered = filtered.filter((event) => {
      const price = parseFloat(event.price.replace('$', ''));
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Apply rating filter
    if (ratingFilter > 0) {
      filtered = filtered.filter((event) => event.rating >= ratingFilter);
    }

    setFilteredEvents(filtered);
  }, [searchQuery, locationQuery, priceRange, ratingFilter, allEvents]);

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 mb-12 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Location"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={locationQuery}
                onChange={handleLocationChange}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-gray-100 px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </button>
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl hover:bg-indigo-700 transition-colors">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Filter Section (conditionally rendered) */}
      {showFilters && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="bg-white rounded-xl shadow-xl p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Filters</h3>

            {/* Price Range Filter */}
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-2">Price Range</label>
              <input
                type="range"
                min="0"
                max="200"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                className="w-full"
              />
              <input
                type="range"
                min="0"
                max="200"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
              <div className="flex justify-between">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            {/* Rating Filter */}
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-2">Rating</label>
              <input
                type="number"
                value={ratingFilter}
                onChange={(e) => setRatingFilter(Math.max(0, parseInt(e.target.value)))}
                min="0"
                max="5"
                className="w-full border border-gray-200 rounded-xl p-2"
              />
            </div>
          </div>
        </div>
      )}

      {/* Featured Events Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Events</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onClick={() => handleEventClick(event.id)}
            />
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-gray-100 rounded-3xl mb-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore by Category</h2>
          <p className="text-xl text-gray-600">Find the perfect event that matches your interests</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              category={category}
            />
          ))}
        </div>
      </div>

      <NewsletterSection />
    </div>
  );
};

export default ExploreEvents;
