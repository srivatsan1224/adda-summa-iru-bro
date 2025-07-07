import React, { useState, useEffect } from "react";
import { Search, MapPin, ChevronRight, Star, Menu, X } from "lucide-react";
import DownloadSection from "../../components/HomePage/DownloadSection";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const [location, setLocation] = useState<string>("");
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [userLocation, setUserLocation] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate(); // Hook to navigate between routes

  const initialCards = [
    { location: "T. Nagar", places: "387 places" },
    { location: "Nungambakkam", places: "338 places" },
    { location: "Velachery", places: "535 places" },
    { location: "Adyar", places: "233 places" },
    { location: "Anna Nagar East", places: "392 places" },
    { location: "Thuraipakkam", places: "285 places" },
    { location: "Mylapore", places: "186 places" },
    { location: "Alwarpet", places: "153 places" },
  ];

  const moreCards = [
    { location: "Tambaram", places: "289 places" },
    { location: "Perambur", places: "210 places" },
    { location: "Kodambakkam", places: "332 places" },
    { location: "Guindy", places: "254 places" },
    { location: "Egmore", places: "196 places" },
    { location: "Saidapet", places: "142 places" },
    { location: "Vadapalani", places: "310 places" },
    { location: "Porur", places: "278 places" },
  ];

  const [visibleCards, setVisibleCards] = useState(initialCards);

  const predefinedLocations = [
    "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli",
    "Salem", "Tirunelveli", "Vellore", "Thoothukudi",
    "Erode", "Tiruppur", "Dindigul", "Kanchipuram",
    "Thanjavur", "Cuddalore", "Nagercoil",
  ];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation(`${latitude}, ${longitude}`); // Set user's location
        },
        () => {
          setUserLocation(null); // If geolocation fails
        }
      );
    }
  }, []);

  const handleSeeMore = () => {
    if (!showMore) {
      setVisibleCards([...visibleCards, ...moreCards]);
    } else {
      setVisibleCards(initialCards);
    }
    setShowMore(!showMore);
  };

  const handleSearch = () => {
    if (location.trim() === "") {
      alert("Please enter or select a location.");
    } else {
      alert(`Searching for meals in ${location}`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Hero Section with Images */}
      <section className="relative pt-24 pb-16 bg-gradient-to-br from-orange-500 to-orange-600 overflow-hidden">
        {/* Mobile Menu Toggle */}
        <div className="absolute top-4 left-4 z-20 lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <X className="text-white" size={24} />
            ) : (
              <Menu className="text-white" size={24} />
            )}
          </button>
        </div>

        {/* Left floating image */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 hidden lg:block">
          <img
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800"
            alt="Delicious Pizza"
            className="w-72 h-96 object-cover rounded-r-3xl shadow-2xl opacity-90"
          />
        </div>

        {/* Right floating image */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 hidden lg:block">
          <img
            src="https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800"
            alt="Fresh Food"
            className="w-72 h-96 object-cover rounded-l-3xl shadow-2xl opacity-90"
          />
        </div>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-white">
              Delicious Food,{" "}
              <span className="relative">
                Delivered
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 358 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9C118.957 4.47226 274.104 2.86548 355 3.00001" stroke="white" strokeWidth="6" strokeLinecap="round"/>
                </svg>
              </span>{" "}
              to Your Door
            </h1>
            <p className="text-xl mb-8 text-orange-100">
              Fresh, tasty meals crafted for busy professionals. Quick delivery, amazing taste.
            </p>

            <div className="relative max-w-2xl mx-auto">
              <div className="flex items-center bg-white rounded-lg shadow-lg">
                <MapPin className="text-gray-400 ml-4" size={24} />
                <input
                  type="text"
                  placeholder="Enter your delivery location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onFocus={() => setDropdownVisible(true)}
                  className="flex-1 px-4 py-3 text-gray-700 focus:outline-none rounded-l-lg"
                />
                <button
                  onClick={handleSearch}
                  className="bg-orange-500 text-white px-8 py-3 rounded-r-lg hover:bg-orange-600 transition-colors flex items-center"
                >
                  <Search size={20} className="mr-2" />
                  Find Food
                </button>
              </div>

              {dropdownVisible && (
                <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg z-10">
                  {predefinedLocations.map((loc) => (
                    <div
                      key={loc}
                      onClick={() => {
                        setLocation(loc);
                        setDropdownVisible(false);
                      }}
                      className="px-4 py-2 hover:bg-orange-50 cursor-pointer text-gray-700 flex items-center"
                    >
                      <MapPin size={16} className="mr-2 text-orange-500" />
                      {loc}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Display User Location */}
            {userLocation && (
              <div className="mt-4 text-white text-lg">
                <p>Your current location: {userLocation}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[ 
              { title: "Home Foods", image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800", desc: "Authentic Home Cooking" },
              { title: "Restaurants", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800", desc: "Top Local Restaurants" },
              { title: "Dine-In", image: "https://images.unsplash.com/photo-1592861956120-e524fc739696?w=800", desc: "Premium Dining Experience" },
              { title: "Party Orders", image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800", desc: "Perfect for Celebrations" }
            ].map((category, index) => (
              <div key={index} className="group cursor-pointer" onClick={() => navigate("/restaurant")}>
                <div className="relative rounded-xl overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                    <h3 className="text-white font-bold text-xl">{category.title}</h3>
                    <p className="text-white/80 text-sm">{category.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Dishes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Spinach Pasta", image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800", rating: 4.9, price: "₹299" },
              { title: "Glazed Donuts", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800", rating: 4.8, price: "₹199" },
              { title: "Breakfast Burger", image: "https://images.unsplash.com/photo-1586816001966-79b736744398?w=800", rating: 4.7, price: "₹249" }
            ].map((dish, index) => (
              <div key={index} className="group cursor-pointer" onClick={() => navigate("/restaurant")}>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transform group-hover:-translate-y-1 transition-all duration-300">
                  <div className="relative">
                    <img
                      src={dish.image}
                      alt={dish.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-semibold text-orange-500">
                      {dish.price}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      <Star className="text-yellow-400 fill-current" size={16} />
                      <span className="ml-1 text-sm font-medium">{dish.rating}</span>
                    </div>
                    <h3 className="font-bold text-lg mb-1">{dish.title}</h3>
                    <button className="mt-2 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors">
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DownloadSection />

      {/* Localities Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Popular Areas in <span className="text-orange-500">Chennai</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleCards.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg">{item.location}</h3>
                    <p className="text-gray-500 text-sm mt-1">{item.places}</p>
                  </div>
                  <ChevronRight className="text-orange-500" size={20} />
                </div>
              </div>
            ))}
            <button
              onClick={handleSeeMore}
              className="bg-orange-500 text-white p-6 rounded-xl hover:bg-orange-600 transition-colors flex items-center justify-center"
            >
              <span className="font-semibold">{showMore ? "Show Less" : "See More"}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
