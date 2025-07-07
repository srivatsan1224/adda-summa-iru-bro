import React, { useEffect, useState, useCallback } from "react"; // Added useCallback
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MapPin, Search, Bell, Plus, Loader2, ShoppingCart } from "lucide-react"; 

import LatestProductCard from "../../components/Rental/LatestProductCard";
import CategoryButton from "../../components/Rental/CategoryButton";
import TestimonialCard from "../../components/Rental/TestimonialCard";

import DownloadSection from "../../components/HomePage/DownloadSection";
import apiService from "../../services/apiService";
import { RentalItem, DisplayCategory, CategoryName } from "../../types";

import BackgroundImg from "../../assets/RentalImages/background.png";
// Updated default images to be more generic or specific if you have them
import DefaultCategoryImg from "../../assets/RentalImages/furniture.png"; 
import DefaultProductImg from "../../assets/RentalImages/fitness.png";

import "@fontsource/inter";
import "@fontsource/lato";
import "@fontsource/montserrat";

const getCategoryImage = (categoryName: string): string => {
  const name = categoryName.toLowerCase();
  // Ensure these image URLs are valid and accessible
  if (name.includes("furniture")) return "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1";
  if (name.includes("appliances")) return "https://images.pexels.com/photos/5946636/pexels-photo-5946636.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1";
  if (name.includes("electronics")) return "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1";
  if (name.includes("fitness")) return "https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1";
  return DefaultCategoryImg;
};

const RentalHome: React.FC = () => {
  const navigate = useNavigate();
  const [displayCategories, setDisplayCategories] = useState<DisplayCategory[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<RentalItem[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [errorCategories, setErrorCategories] = useState<string | null>(null);
  const [errorProducts, setErrorProducts] = useState<string | null>(null);

  // Define your primary categories for featuring products
  const CATEGORIES_TO_FEATURE: CategoryName[] = ["Electronics", "Furniture", "Appliances", "Fitness"];

  const fetchCategories = useCallback(async () => {
    setIsLoadingCategories(true);
    setErrorCategories(null);
    try {
      const categoriesResponse = await apiService.get<CategoryName[]>("/categories");
      let fetchedCategoryNames = categoriesResponse.data;

      // Optionally, filter or order based on CATEGORIES_TO_FEATURE if needed
      // For example, to ensure only these are shown or shown in this order:
      fetchedCategoryNames = CATEGORIES_TO_FEATURE.filter(featuredCat => 
        fetchedCategoryNames.some(apiCat => apiCat.toLowerCase() === featuredCat.toLowerCase())
      );
      // Or if you want to include all from API but ensure your main ones are there:
      // just use categoriesResponse.data and ensure your getCategoryImage has fallbacks.

      const formattedCategories: DisplayCategory[] = fetchedCategoryNames.map((name) => ({
        id: name,
        name: name,
        img: getCategoryImage(name),
        description: `Quality ${name.toLowerCase()} at affordable prices`,
        route: `/rental/${name.toLowerCase().replace(/\s+/g, "-")}`,
      }));
      setDisplayCategories(formattedCategories);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setErrorCategories("Failed to load categories. Please try refreshing.");
    } finally {
      setIsLoadingCategories(false);
    }
  }, []); // Empty dependency array - fetch once on mount

  const fetchFeaturedProducts = useCallback(async () => {
    setIsLoadingProducts(true);
    setErrorProducts(null);
    try {
      const productPromises = CATEGORIES_TO_FEATURE.map(categoryName =>
        apiService.get<RentalItem[]>(`/items/filter/${categoryName}`, { params: { limit: 1 } })
          .then(response => {
            if (response.data && response.data.length > 0) {
              return response.data[0]; // Get the first item
            }
            console.warn(`No items found for featured category: ${categoryName}`);
            return null;
          })
          .catch(err => {
            console.warn(`Failed to fetch featured item for ${categoryName}:`, err.message);
            return null;
          })
      );
      const results = await Promise.all(productPromises);
      setFeaturedProducts(results.filter(item => item !== null) as RentalItem[]);
    } catch (err) { // This catch is for Promise.all itself, though individual errors are caught above
      console.error("Error fetching one or more featured products batches:", err);
      setErrorProducts("Failed to load some featured products.");
      setFeaturedProducts([]); // Clear or keep partials based on preference
    } finally {
      setIsLoadingProducts(false);
    }
  }, []); // Empty dependency array - fetch once on mount

  useEffect(() => {
    fetchCategories();
    fetchFeaturedProducts();
  }, [fetchCategories, fetchFeaturedProducts]); // Call the memoized functions
  const handleNavigateToCart = () => {
    // This path is relative to where RentalRoutes is mounted.
    // If RentalRoutes is at /home/rental/*, this becomes /home/rental/cart
    // If RentalRoutes is at /*, this becomes /cart
    // Adjust based on your main App.tsx router setup for RentalRoutes
    navigate("/rental/cart"); 
  };

  const testimonials = [
    { name: "Kyle Roberts DVM", role: "Customer Web Consultant", text: "Renting furniture and appliances has never been this easy! I set up my new apartment in no time without spending a fortune. The quality and flexibility are perfect for bachelors like me." },
    { name: "Sophia Anderson", role: "Internal Implementation Officer", text: "I love the hassle-free process. From selecting items to delivery, everything was smooth and quick. Renting appliances saved me money, and I didn't have to worry about maintenance!" },
    { name: "Stephen Brekke", role: "Legacy Integration Producer", text: "This platform is a game-changer! I rented everything I needed for my new place – furniture, appliances, and even fitness equipment. Affordable, reliable, and so convenient!" },
  ];

  const handleProductCardClick = (category: string, id: string) => {
    const categorySlug = category.toLowerCase().replace(/\s+/g, "-");
    navigate(`/rental/${categorySlug}/${id}`);
  };

  return (
    <div className="font-inter bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div
        className="w-full h-[600px] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${BackgroundImg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />
        {/* Navigation */}
        <nav className="relative z-10 pt-6">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <div className="hidden md:flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-white" />
                  <span className="text-white">Bangalore</span>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <Bell className="w-6 h-6 text-white cursor-pointer hover:text-blue-400 transition-colors" />
                                <button
                  onClick={handleNavigateToCart}
                  className="text-white cursor-pointer hover:text-blue-400 transition-colors p-1 relative"
                  aria-label="Shopping Cart"
                >
                  <ShoppingCart className="w-6 h-6" />
                  {/* Optional: Cart item count badge (requires global state)
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                    3 
                  </span>
                  */}
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  onClick={() => navigate("/rental/post-ad")}
                >
                  <Plus className="w-5 h-5" />
                  <span>Post Ad</span>
                </motion.button>
              </div>
            </div>
          </div>
        </nav>
        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 h-[calc(100%-80px)] flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-5xl font-bold text-white mb-6">
              Rent Furnishings & Appliances with Ease
            </h2>
            <p className="text-xl text-gray-200 mb-4">Your Home, Simplified.</p>
            <p className="text-lg text-gray-300 mb-8">
              Discover a hassle-free way to furnish your space with our curated
              selection of stylish and affordable rentals.
            </p>
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="w-full px-6 py-4 pl-12 rounded-lg bg-white/10 backdrop-blur-md text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Categories Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto py-16 sm:py-20 px-4"
      >
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10 sm:mb-12">
          Explore Categories
        </h2>
        {isLoadingCategories ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
          </div>
        ) : errorCategories ? (
           <p className="text-center text-red-500">{errorCategories}</p>
        ) : displayCategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {displayCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
              >
                <CategoryButton {...category} />
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No categories to display at the moment.</p>
        )}
      </motion.section>

      {/* Featured Products */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> {/* Added responsive padding */}
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10 sm:mb-12">
            Featured Products
          </h2>
          {isLoadingProducts ? (
             <div className="flex justify-center items-center h-60"><Loader2 className="w-10 h-10 text-blue-500 animate-spin" /></div>
          ) : errorProducts ? (
            <p className="text-center text-red-500">{errorProducts}</p>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
              {/*
                Default: 1 column, gap-6
                Small screens (sm): 2 columns, gap-6 (gap-6 from default still applies unless overridden)
                Medium screens (md): gap changes to md:gap-8 (columns still 2 from sm:)
                Large screens (lg): 4 columns, gap-8 (gap-8 from md: still applies)
              */}
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, type: "spring", stiffness: 100 }}
                  onClick={() => handleProductCardClick(product.category, product.id)}
                  // The card itself should be responsive.
                  // Adding 'flex' here ensures the motion.div takes up space if the card itself doesn't fill.
                  className="cursor-pointer flex flex-col" 
                >
                  <LatestProductCard
                    id={product.id}
                    name={product.name}
                    img={product.imageUrl || DefaultProductImg}
                    price={product.price}
                    category={product.category}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
             <p className="text-center text-gray-500">No featured products available at the moment.</p>
          )}
        </div>
      </section>

      <DownloadSection />

      {/* Testimonials Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10 sm:mb-12">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, type: "spring", stiffness: 100 }}
                className="flex" // Added flex for consistent card heights
              >
                <TestimonialCard {...testimonial} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RentalHome;