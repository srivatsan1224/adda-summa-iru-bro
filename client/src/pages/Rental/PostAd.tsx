import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../../services/apiService";
import { RentalItem } from "../../types";
import { Loader2 } from "lucide-react";

// FormData will store availability as a string from the select options
// but it represents the RentalItem['availability'] type.
type RentalFormAvailabilityStrings = "available" | "rented" | "maintenance" | "false_string"; // Represent boolean false as a string

type RentalFormData = {
  id?: string;
  category: string;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  // Store availability as a string from the select, matching option values
  availability: RentalFormAvailabilityStrings;
  imageUrl?: string;
  specifications: string;
  offers: string;
  ratings?: string;
  rentalType: "short-term" | "long-term" | "event";
  ownerContactInfo?: string;
  stock?: string;
};

const initialFormData: RentalFormData = {
  category: "",
  name: "",
  description: "",
  price: "",
  originalPrice: "",
  discount: "",
  availability: "available", // Default to "available" (string)
  imageUrl: "",
  specifications: '{}',
  offers: "",
  ratings: "",
  rentalType: "short-term",
  ownerContactInfo: "",
  stock: "1",
};

const PostAd: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RentalFormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    // For availability, ensure it's one of the defined string types
    if (name === "availability") {
        setFormData((prev) => ({ ...prev, [name]: value as RentalFormAvailabilityStrings }));
    } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    let specificationsObject: Record<string, any> = {};
    try {
      if (formData.specifications.trim()) {
        specificationsObject = JSON.parse(formData.specifications);
      }
    } catch (jsonError) {
      setError("Specifications must be in valid JSON format. Example: {\"color\": \"Red\", \"size\": \"Large\"}");
      setIsLoading(false);
      return;
    }

    const offersArray = formData.offers.trim()
      ? formData.offers.split(",").map((offer) => offer.trim()).filter(offer => offer)
      : [];

    // Convert string "false_string" to boolean false for availability
    let backendAvailability: RentalItem['availability'] = formData.availability as any; // Cast initially
if (formData.availability === "false_string") {
    backendAvailability = false; // Convert "false_string" to boolean false
}

    const payload: Partial<RentalItem> = {
      ...(formData.id && { id: formData.id.trim() }),
      category: formData.category,
      name: formData.name.trim(),
      description: formData.description.trim(),
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
      discount: formData.discount ? parseFloat(formData.discount) : undefined,
      availability: backendAvailability, // Use the converted value
      imageUrl: formData.imageUrl?.trim() || undefined,
      specifications: specificationsObject,
      offers: offersArray,
      ratings: formData.ratings ? parseFloat(formData.ratings) : undefined,
      rentalType: formData.rentalType,
      ownerContactInfo: formData.ownerContactInfo?.trim() || undefined,
      stock: formData.stock ? parseInt(formData.stock, 10) : 0,
    };
    
    if (!payload.category || !payload.name || !payload.description || isNaN(payload.price!) || payload.price! <= 0) {
        setError("Please fill in all required fields (Category, Name, Description, valid Price).");
        setIsLoading(false);
        return;
    }

    try {
      const response = await apiService.post<RentalItem>("/items", payload);
      console.log("Ad Posted Successfully:", response.data);
      setSuccessMessage(`Ad for "${response.data.name}" posted successfully! Item ID: ${response.data.id}`);
      setFormData(initialFormData);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err: any) {
      console.error("Error posting ad:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to post ad. Please check your connection and try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 mb-16 p-6 sm:p-8 bg-white shadow-xl rounded-xl border border-gray-200">
      <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-center text-blue-600">
        Post Your Rental Item
      </h2>
      <p className="text-gray-600 mb-6 sm:mb-8 text-center text-sm sm:text-base">
        Fill in the details below to create a new rental listing.
      </p>

      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 text-green-700 border border-green-300 rounded-md text-sm">
          {successMessage}
        </div>
      )}
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-300 rounded-md text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section Styling */}
        <div className="bg-gray-50 p-5 sm:p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
            Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ID (Optional) */}
            <div className="space-y-1">
              <label htmlFor="id" className="block text-sm font-medium text-gray-700">
                Item ID (Optional - leave blank for auto-generation)
              </label>
              <input
                type="text"
                id="id"
                name="id"
                placeholder="e.g., unique-item-code"
                value={formData.id || ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="" disabled>Select a category</option>
                <option value="Furniture">Furniture</option>
                <option value="Appliances">Appliances</option>
                <option value="Electronics">Electronics</option>
                <option value="Fitness">Fitness</option>
                {/* Add other categories if necessary */}
              </select>
            </div>
          </div>
          <div className="mt-4 space-y-1">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Item Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter item name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <div className="mt-4 space-y-1">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Detailed description of your item"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        <div className="bg-gray-50 p-5 sm:p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
            Pricing & Stock
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Rental Price (per unit) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="price"
                name="price"
                placeholder="0.00"
                value={formData.price}
                onChange={handleChange}
                required
                min="0.01" step="0.01"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700">
                Original Price (Optional)
              </label>
              <input
                type="number"
                id="originalPrice"
                name="originalPrice"
                placeholder="0.00"
                value={formData.originalPrice || ""}
                onChange={handleChange}
                min="0" step="0.01"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="discount" className="block text-sm font-medium text-gray-700">
                Discount (%) (Optional)
              </label>
              <input
                type="number"
                id="discount"
                name="discount"
                placeholder="0"
                value={formData.discount || ""}
                onChange={handleChange}
                min="0" max="100" step="0.1"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
             <div className="space-y-1 md:col-span-1"> {/* Stock */}
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                Stock Quantity
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                placeholder="0"
                min="0" step="1"
                value={formData.stock || ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-5 sm:p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
            Additional Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="availability" className="block text-sm font-medium text-gray-700">
                Availability <span className="text-red-500">*</span>
              </label>
              <select
                id="availability"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="available">Available (In Stock)</option>
                <option value={false as any}>Not Available (Out of Stock)</option> {/* Send boolean false */}
                <option value="rented">Currently Rented</option>
                <option value="maintenance">Under Maintenance</option>
              </select>
            </div>
            <div className="space-y-1">
              <label htmlFor="rentalType" className="block text-sm font-medium text-gray-700">
                Rental Type
              </label>
              <select
                id="rentalType"
                name="rentalType"
                value={formData.rentalType}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="short-term">Short-Term</option>
                <option value="long-term">Long-Term</option>
                <option value="event">Event-Specific</option>
              </select>
            </div>
            <div className="space-y-1">
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                Image URL
              </label>
              <input
                type="url" // Changed to type URL for basic validation
                id="imageUrl"
                name="imageUrl"
                placeholder="https://example.com/image.jpg"
                value={formData.imageUrl || ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="ratings" className="block text-sm font-medium text-gray-700">
                Initial Ratings (1-5, Optional)
              </label>
              <input
                type="number"
                id="ratings"
                name="ratings"
                placeholder="0"
                min="0" max="5" step="0.1"
                value={formData.ratings || ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
           <div className="mt-4 space-y-1">
              <label htmlFor="ownerContactInfo" className="block text-sm font-medium text-gray-700">
                Owner Contact Info (Optional)
              </label>
              <input
                type="text"
                id="ownerContactInfo"
                name="ownerContactInfo"
                placeholder="e.g., email@example.com or (555) 123-4567"
                value={formData.ownerContactInfo || ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          <div className="mt-4 space-y-1">
            <label htmlFor="specifications" className="block text-sm font-medium text-gray-700">
              Specifications (JSON format)
            </label>
            <textarea
              id="specifications"
              name="specifications"
              placeholder='{"color": "Black", "material": "Wood"}'
              value={formData.specifications}
              onChange={handleChange}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-xs"
            />
            <p className="text-xs text-gray-500 mt-1">
              Example: {JSON.stringify({ feature1: "value1", feature2: "value2" })}
            </p>
          </div>
          <div className="mt-4 space-y-1">
            <label htmlFor="offers" className="block text-sm font-medium text-gray-700">
              Offers (comma-separated)
            </label>
            <input
              type="text"
              id="offers"
              name="offers"
              placeholder="Free delivery, 10% off setup"
              value={formData.offers}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        <div className="flex items-center text-xs text-gray-500 my-4">
          <span className="text-red-500 mr-1">*</span> Required fields
        </div>

        <div className="flex space-x-4 mt-6">
          <button
            type="button"
            onClick={() => navigate(-1)} // Go back to previous page
            className="w-1/3 p-3 border border-gray-400 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="w-2/3 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium text-sm disabled:opacity-70"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 mx-auto animate-spin" />
            ) : (
              "Post Rental Item"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostAd;0