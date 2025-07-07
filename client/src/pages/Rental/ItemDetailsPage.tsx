import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react"; // For loading state
import apiService from "../../services/apiService";
import ItemDetailsDisplay from "../../components/Rental/ItemDetailsDisplay"; // Assuming path is correct
import { RentalItem } from "../../types"; // Shared types

const ItemDetailsPage: React.FC = () => {
  // useParams will try to match route params like /home/rental/:categorySlug/:id
  // Ensure your React Router routes are set up accordingly.
  // The category from the URL might be a slug (e.g., "electronics", "outdoor-gear")
  // while the backend might need the exact category name ("Electronics", "Outdoor Gear") for the partition key.
  // This might require a mapping or ensuring consistency.
  // For now, assuming `category` from URL param matches the backend's expected partition key value.
  const { id, category: categorySlug } = useParams<{ id: string; category: string }>(); // category here is categorySlug

  const [item, setItem] = useState<RentalItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || !categorySlug) {
      setError("Item ID or category is missing from URL.");
      setIsLoading(false);
      return;
    }

    const fetchItemDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // We need to convert categorySlug (e.g., "electronics") to the actual category name
        // that the backend uses as a partition key (e.g., "Electronics").
        // This mapping logic might be more complex if slugs differ significantly from actual names.
        // For simple cases where only casing differs or spaces are hyphens:
        let backendCategoryName = categorySlug
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        
        // If your category names are simple and match the slug (case-insensitively), you might just need to ensure correct casing.
        // For example, if all your categories are single words and match the slug:
        if (categorySlug === "electronics") backendCategoryName = "Electronics";
        if (categorySlug === "furniture") backendCategoryName = "Furniture";
        if (categorySlug === "appliances") backendCategoryName = "Appliances";
        if (categorySlug === "fitness") backendCategoryName = "Fitness";
        // Add more mappings as needed or implement a more robust slug-to-name conversion.


        const response = await apiService.get<RentalItem>(`/items/${id}`, {
          params: { category: backendCategoryName }, // Pass the backend-expected category name as partition key
        });
        setItem(response.data);
      } catch (err: any) {
        console.error("Error fetching item details:", err);
        if (err.response && err.response.status === 404) {
          setError("Item not found.");
        } else {
          setError("Failed to load item details. Please try again.");
        }
        setItem(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItemDetails();
  }, [id, categorySlug]); // Depend on id and categorySlug from URL

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
        <p className="ml-4 text-lg font-custom">Loading item details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6 font-custom text-center">
        <p className="text-red-500 text-xl">{error}</p>
        {/* You could add a button to go back or try again */}
      </div>
    );
  }

  if (!item) {
    // This case might be covered by error state if API returns 404 handled above
    return (
        <div className="max-w-7xl mx-auto p-6 font-custom text-center">
            <p className="text-gray-500 text-xl">Item data could not be loaded.</p>
        </div>
    );
}

  return (
    // Removed max-w-7xl and p-6 from here as ItemDetailsDisplay might have its own padding/max-width
    <div className="font-custom bg-gray-50 min-h-screen py-6"> {/* Added page background and padding */}
      <ItemDetailsDisplay item={item} />
    </div>
  );
};

export default ItemDetailsPage;