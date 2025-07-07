import { Routes, Route } from "react-router-dom";
import RentalHome from "../pages/Rental/RentalHome";
import FurnitureHome from "../pages/Rental/FurnitureHome";
import AppliancesHome from "../pages/Rental/AppliancesHome";
import ElectronicsHome from "../pages/Rental/ElectronicsHome";
import FitnessHome from "../pages/Rental/FitnessHome";
import ItemDetailsPage from "../pages/Rental/ItemDetailsPage";
import OrderConfirmationPage from "../pages/Rental/OrderConfirmationPage";
import CartPage from "../pages/Rental/CartPage"; 
import PostAd from "../pages/Rental/PostAd";
const RentalRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<RentalHome />} />
      <Route path="/furniture" element={<FurnitureHome />} />
      <Route path="/appliances" element={<AppliancesHome />} />
      <Route path="/electronics" element={<ElectronicsHome />} />
      <Route path="/fitness" element={<FitnessHome />} />
      <Route path="/post-ad" element={<PostAd />} />
      <Route path="/cart" element={<CartPage />} /> 
      <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
      <Route path="/:category/:id" element={<ItemDetailsPage />} />
    </Routes>
  );
};

export default RentalRoutes;
