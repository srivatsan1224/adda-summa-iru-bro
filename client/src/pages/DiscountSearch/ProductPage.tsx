import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Package, ShoppingCart } from "lucide-react";
import ProductGallery from "../../components/DiscountPage/ProductGallery";
import ProductInfo from "../../components/DiscountPage/ProductInfo";
import ProductTabs from "../../components/DiscountPage/ProductTabs";


const ProductPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {};

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<string>(product?.images?.[0] || "");
  const [selectedColor, setSelectedColor] = useState<string>(product?.colors?.[0] || "");
  const [selectedSize, setSelectedSize] = useState<string>(product?.sizes?.[0] || "");
  const [isWishlist, setIsWishlist] = useState<boolean>(false);
  const [pincode, setPincode] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("description");
  const [cartData, setCartData] = useState([]);

  // Fetch cart data from localStorage and API
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        // Get user data from localStorage
        const userJson = localStorage.getItem("user");
        if (!userJson) {
          
          return;
        }

        const user = JSON.parse(userJson);
        const userId = user.id; // Using email as userId

        // Fetch cart data from backend using the userId (email)
        const response = await axios.get(
          `http://localhost:3000/user/get?userId=${userId}`
        );

        const cartData = response.data.cart || [];
        setCartData(cartData);
        console.log(cartData);
       
      } catch (err: any) {
        console.log(err);
        
      }
    };

    fetchCartData();
  }, []);
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <Package className="w-16 h-16 text-gray-400 mx-auto" />
          <h1 className="text-2xl font-semibold text-gray-700">Product not found!</h1>
          <p className="text-gray-500">The product you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const handleAddToCart = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!user || !user.id) {
      alert("Please log in to add items to your cart");
      return;
    }

    try {
      await axios.post("http://localhost:3000/user/add-to-cart", {
        containerName: "Users",
        userId: user.id,
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity,
          color: selectedColor,
          size: selectedSize,
        },
      });

      alert("Added to cart successfully!");
    } catch (error: any) {
      console.error("Error adding to cart:", error);
      alert(error.response?.status === 404 
        ? "Server error: Please try again later" 
        : "Failed to add to cart. Please try again.");
    }
  };

  const specifications = {
    "Product Details": {
      "Material": "Premium Cotton Blend",
      "Fit": "Regular Fit",
      "Pattern": "Solid",
      "Care Instructions": "Machine wash",
      "Country of Origin": "India"
    },
    "Additional Features": {
      "Style": "Casual",
      "Occasion": "Daily wear",
      "Season": "All Season",
      "Neck Type": "Round Neck"
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Cart */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <a href="/" className="text-xl font-bold text-indigo-600">Store</a>
            </div>
            <button
              onClick={() => navigate('/cart')}
              className="relative p-2 text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-indigo-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartData.length}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm mb-4">
            <ol className="list-none p-0 inline-flex text-gray-600">
              <li className="flex items-center">
                <a href="#" className="hover:text-indigo-600">Home</a>
                <span className="mx-2">/</span>
              </li>
              <li className="flex items-center">
                <a href="#" className="hover:text-indigo-600">Fashion</a>
                <span className="mx-2">/</span>
              </li>
              <li className="text-gray-800">{product.name}</li>
            </ol>
          </nav>

          <div className="bg-white rounded-2xl shadow-sm">
            <div className="flex flex-col lg:flex-row gap-8 p-6 lg:p-8">
              <ProductGallery
                images={product.images}
                name={product.name}
                discount={product.discount}
                selectedImage={selectedImage}
                isWishlist={isWishlist}
                onImageSelect={setSelectedImage}
                onWishlistToggle={() => setIsWishlist(!isWishlist)}
                onAddToCart={handleAddToCart}
              />
              
              <ProductInfo
                product={product}
                quantity={quantity}
                selectedColor={selectedColor}
                selectedSize={selectedSize}
                pincode={pincode}
                onQuantityChange={handleQuantityChange}
                onColorSelect={setSelectedColor}
                onSizeSelect={setSelectedSize}
                onPincodeChange={setPincode}
              />
            </div>

            <ProductTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              product={product}
              specifications={specifications}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;