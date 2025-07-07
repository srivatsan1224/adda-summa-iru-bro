import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Star,
  ShoppingCart,
  Heart,
  // CreditCard, // Removed as "Buy Now" might be complex for now
} from "lucide-react";
import { RentalItem } from "../../types"; // Shared types
import apiService from "../../services/apiService"; // For Add to Cart
// import { useNavigate } from "react-router-dom"; // If "Buy Now" navigates

// Define the props for this component explicitly
interface ItemDetailsDisplayProps {
  item: RentalItem;
}

const ItemDetailsDisplay: React.FC<ItemDetailsDisplayProps> = ({ item }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  // Assuming item.imageUrl is the primary image. If item has an array of images, logic changes.
  const [selectedImage, setSelectedImage] = useState(item.imageUrl || "https://via.placeholder.com/600");
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [cartMessage, setCartMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // const navigate = useNavigate(); // For "Buy Now" if it navigates

  const toggleDropdown = (section: string) => {
    setActiveDropdown(activeDropdown === section ? null : section);
  };

  // Handle "Add to Cart"
  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    setCartMessage(null);
    try {
      // Data needed by POST /api/cart
      const cartPayload = {
        id: item.id, // This is productId for the cart
        name: item.name,
        price: item.price,
        category: item.category,
        quantity: 1, // Default quantity to 1
        imageUrl: item.imageUrl,
      };
      await apiService.post("/cart", cartPayload);
      setCartMessage({ type: 'success', text: `${item.name} added to cart!` });
      // Optionally, update a global cart count here using Context/Redux/Zustand
    } catch (error: any) {
      console.error("Error adding item to cart:", error);
      const errorMessage = error.response?.data?.message || "Failed to add item to cart. Please try again.";
      setCartMessage({ type: 'error', text: errorMessage });
    } finally {
      setIsAddingToCart(false);
      // Clear message after a few seconds
      setTimeout(() => setCartMessage(null), 3000);
    }
  };

  // Placeholder image gallery logic
  // If your RentalItem has an array like `imageUrls: string[]`
  // const imageGallery = item.imageUrls && item.imageUrls.length > 0 ? item.imageUrls : [item.imageUrl || "https://via.placeholder.com/100"];
  // For now, using the single imageUrl multiple times as in original code:
  const imageGallery = [
    item.imageUrl || "https://via.placeholder.com/100",
    // Add more actual image URLs here if your item model supports an array
    // For placeholder, repeat or use different placeholders
    "https://via.placeholder.com/101", // Placeholder 2
    "https://via.placeholder.com/102", // Placeholder 3
    "https://via.placeholder.com/103", // Placeholder 4
  ].filter(url => url !== "https://via.placeholder.com/100" || item.imageUrl); // Filter out generic placeholders if main image exists

  const getAvailabilityInfo = (availabilityValue: RentalItem['availability']) => {
    if (availabilityValue === true || availabilityValue === "available") {
      return { text: "In Stock", color: "text-green-500" };
    }
    if (availabilityValue === "rented") {
      return { text: "Currently Rented", color: "text-yellow-600" };
    }
    if (availabilityValue === "maintenance") {
      return { text: "Under Maintenance", color: "text-orange-500" };
    }
    return { text: "Out of Stock", color: "text-red-500" };
  };
  const availabilityInfo = getAvailabilityInfo(item.availability);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 bg-transparent"> {/* Changed background to transparent if page has bg */}
      {/* Breadcrumb (can be made dynamic later) */}
      <nav className="text-sm mb-6">
        <ol className="flex items-center space-x-2 text-gray-600">
          <li><span>Home</span></li>
          <li><span className="text-gray-400">/</span></li>
          <li><span>{item.category}</span></li>
          <li><span className="text-gray-400">/</span></li>
          <li><span className="text-blue-600 font-medium">{item.name}</span></li>
        </ol>
      </nav>

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left: Image Gallery */}
          <div className="lg:w-1/2 p-6 bg-gray-50">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-white border">
              <img
                src={selectedImage}
                alt={item.name}
                className="w-full h-full object-contain" // Changed to object-contain
              />
            </div>
            {imageGallery.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-4">
                {imageGallery.slice(0, 4).map((url, index) => ( // Show max 4 thumbnails
                  <button
                    key={index}
                    onClick={() => setSelectedImage(url)}
                    className={`relative aspect-square rounded-lg overflow-hidden border ${
                      selectedImage === url ? "ring-2 ring-blue-500" : "hover:opacity-75"
                    } transition`}
                  >
                    <img
                      src={url}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details */}
          <div className="lg:w-1/2 p-6 lg:p-8 space-y-5"> {/* Adjusted spacing */}
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                  {item.name}
                </h1>
                <div className="mt-2 flex items-center space-x-3">
                  {item.ratings !== undefined && item.ratings > 0 && (
                    <>
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm font-medium text-gray-700">
                          {item.ratings.toFixed(1)}
                        </span>
                      </div>
                      <span className="text-sm text-gray-400">|</span>
                    </>
                  )}
                  <span className={`text-sm font-medium ${availabilityInfo.color}`}>
                    {availabilityInfo.text}
                  </span>
                </div>
              </div>
              <button className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition">
                <Heart className="w-6 h-6" /> {/* Wishlist functionality placeholder */}
              </button>
            </div>

            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{item.description}</p>

            <div className="space-y-1">
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl sm:text-4xl font-bold text-gray-900">
                  ₹{item.price.toFixed(2)}
                </span>
                <span className="text-base text-gray-500">/ month</span> {/* Assuming fixed unit */}
              </div>
              {item.originalPrice && item.originalPrice > item.price && (
                <div className="flex items-center space-x-2">
                  <span className="text-base text-gray-400 line-through">
                    ₹{item.originalPrice.toFixed(2)}
                  </span>
                  {item.discount && item.discount > 0 && (
                    <span className="px-2 py-0.5 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                      SAVE {item.discount.toFixed(0)}%
                    </span>
                  )}
                </div>
              )}
            </div>
            
            {/* Cart Message Area */}
            {cartMessage && (
              <div className={`p-3 rounded-md text-sm ${cartMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {cartMessage.text}
              </div>
            )}

            <div className="pt-4 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart || !(item.availability === true || item.availability === "available")}
                  className={`flex-1 flex items-center justify-center px-6 py-3 text-white rounded-xl transition shadow-md
                               ${(item.availability === true || item.availability === "available")
                                 ? 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                                 : 'bg-gray-400 cursor-not-allowed'}
                               ${isAddingToCart ? 'opacity-70 cursor-wait' : ''}`}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {isAddingToCart ? "Adding..." : "Add to Cart"}
                </button>
                {/* <button 
                  className="flex-1 flex items-center justify-center px-6 py-3 bg-gray-800 text-white rounded-xl hover:bg-black transition shadow-md focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
                  // onClick={() => { /* TODO: Implement Buy Now logic  
                  <CreditCard className="w-5 h-5 mr-2" />
                  Buy Now (To Implement)
                </button> 
                */}
              </div>
            </div>

            {item.offers && item.offers.length > 0 && (
              <div className="pt-5 border-t border-gray-200">
                <h3 className="text-base font-semibold text-gray-800 mb-3">Special Offers</h3>
                <ul className="space-y-2">
                  {item.offers.map((offer, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <span className="text-green-500 mr-2">✓</span> {offer}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-5 border-t border-gray-200 text-sm text-gray-500 grid grid-cols-2 gap-x-4 gap-y-2">
              {item.rentalType && (
                <div>
                  <span className="block text-gray-400 text-xs">Rental Type</span>
                  <span className="font-medium text-gray-700 capitalize">{item.rentalType}</span>
                </div>
              )}
               {item.category && (
                <div>
                  <span className="block text-gray-400 text-xs">Category</span>
                  <span className="font-medium text-gray-700">{item.category}</span>
                </div>
              )}
              {item.updatedAt && (
                <div>
                  <span className="block text-gray-400 text-xs">Last Updated</span>
                  <span className="font-medium text-gray-700">
                    {new Date(item.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              )}
               {item.ownerContactInfo && (
                <div className="col-span-2 mt-2"> {/* Takes full width if other info is sparse */}
                  <span className="block text-gray-400 text-xs">Owner Contact</span>
                  <span className="font-medium text-gray-700">{item.ownerContactInfo}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {item.specifications && Object.keys(item.specifications).length > 0 && (
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Product Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {Object.entries(item.specifications).map(([key, value]) => (
              <div key={key} className="flex py-2 border-b border-gray-100">
                <span className="w-1/3 font-medium text-gray-700 capitalize">
                  {key.replace(/_/g, ' ')}:
                </span>
                <span className="w-2/3 text-gray-600">{String(value)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Accordion Sections (Static data for now) */}
      <div className="mt-8 space-y-4">
        {[
          { title: "Cancellation And Returns", content: "Free cancellations within 24 hours.", icon: "🔄" },
          { title: "Care Instructions", content: "Keep the product in a dry place.", icon: "💧" },
          { title: "Quality Performance", content: "Certified for durability and reliability.", icon: "✨" },
          { title: "FAQ", content: "Frequently asked questions.", icon: "❓" },
        ].map((section, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
            <button
              onClick={() => toggleDropdown(section.title)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition focus:outline-none"
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl">{section.icon}</span>
                <span className="font-medium text-gray-900">{section.title}</span>
              </div>
              {activeDropdown === section.title ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>
            {activeDropdown === section.title && (
              <div className="px-6 pb-4 pt-2 bg-gray-50 border-t border-gray-200">
                <p className="text-gray-600 text-sm">{section.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemDetailsDisplay;