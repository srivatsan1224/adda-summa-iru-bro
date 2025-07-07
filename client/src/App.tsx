import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { FormProvider } from "./pages/Housing/PropertyForm/FormContext";
import { CartProvider } from "./components/Foods/context/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import UserDetails from "./pages/UserDetails";
import PostProperty from "./pages/Housing/PostProperty";
import Main from "./pages/Housing/PropertyForm/Main";
import PropertyDetailsForm from "./pages/Housing/PropertyForm/PropertyDetails";
import LocalityDetailsForm from "./pages/Housing/PropertyForm/LocalityDetails";
import Gallery from "./pages/Housing/PropertyForm/Gallery";
import AmenitiesForm from "./pages/Housing/PropertyForm/Amenities";
import RentalDetailsForm from "./pages/Housing/PropertyForm/RentalDetails";
import PropertyList from "./pages/Housing/PropertyList";
import LoginPage from "./pages/Login/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import DiscountPage from "./pages/DiscountPage/DiscountPage";
import SearchPage from "./pages/DiscountSearch/SearchPage";
import FiltersPage from "./components/Foods/FiltersPage";
import RestaurantDetails from "./components/Foods/RestaurantDetails";
import VendorDashboard from "./components/Foods/VendorDashboard";
import RestaurantList from "./components/Foods/RestaurantList";
import FoodList from "./components/Foods/FoodList";
import RentalRoutes from "./routes/rentalRoutes";
import ParttimeRoutes from "./routes/parttimeRoutes";
import ProductPage from "./pages/DiscountSearch/ProductPage";
import CartPage from "./pages/DiscountSearch/CartPage";
import HousingItem from "./pages/Housing/HosuingDetails/HousingItem";
import HousingHome from "./pages/Housing/HousingHome";
import { Analytics } from "@vercel/analytics/react";
import EventsHome from "./pages/Events/Home";
import ExploreEvents from "./pages/Events/ExploreEvents";
import EventListing from "./pages/Events/EventListing";
import CartPage1 from "./components/Foods/CartPage1";
import CartButton from "./components/Foods/CartButton";
import HomePage from "./components/Foods/FoodHome";
import EventForm from "./pages/EventForm";
import PaintingandServices from "./pages/Housing/Painting/PaintingandService";
import PackersMovers from "./pages/Housing/PackersandMovers/PackersandMovers";
import Payrent from "./pages/Housing/Payrent/Payrent";
import ScrollToTop from "./pages/ScrollToTop";
import PostAd from "./pages/Rental/PostAd";
import AboutUs from "./components/AboutUs";

const App: React.FC = () => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;

  // Function to check if the user is authenticated
  const isAuthenticated = (): boolean => {
    const user = localStorage.getItem("user");
    return user !== null; // Returns true if user data is present in localStorage
  };

  // Use location to get the current path
  const location = useLocation();

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Analytics />
      <FormProvider>
        <CartProvider>
          {/* Conditionally render Navbar */}
          {location.pathname !== "/login" && location.pathname !== "/SignUp" && <Navbar />}

          {/* Scroll to Top on Route Change */}
          <ScrollToTop />

          <Routes>
            {/* Authentication Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/SignUp" element={<SignupPage />} />

            {/* Home Page */}
            <Route path="/" element={<Home />} />

            {/* Rental & Part-Time Routes */}

            <Route path="/rental/*" element={<RentalRoutes />} />
            {/* <Route path="/post-ad" element={<PostAd />} /> */}

            <Route path="/home/rental/*" element={<RentalRoutes />} />

            <Route path="/parttime/*" element={<ParttimeRoutes />} />
            <Route path="/post-ad" element={<PostAd />} />

            {/* User Profile (Protected) */}
            <Route
              path="/profile"
              element={isAuthenticated() ? <UserDetails /> : <LoginPage />}
            />

            {/* Housing Routes */}
            <Route path="/housinghome" element={<HousingHome />} />
            <Route
              path="/propertydashboard"
              element={isAuthenticated() ? <PostProperty /> : <LoginPage />}
            />
            <Route path="/propertyform" element={<Main />} />
            <Route path="/propertydetails" element={<PropertyDetailsForm />} />
            <Route path="/locality" element={<LocalityDetailsForm />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/amenities" element={<AmenitiesForm />} />
            <Route path="/rentaldetails" element={<RentalDetailsForm />} />
            <Route path="/propertylist" element={<PropertyList />} />
            <Route path="/housingitem" element={<HousingItem />} />
            <Route path="/housingitem/:propertyId" element={<HousingItem />} />
            <Route path="/housinghome/paintingandcleaning" element={<PaintingandServices />} />
            <Route path="/housinghome/payrent" element={<Payrent />} />
            <Route path="/housinghome/packersandmovers" element={<PackersMovers />} />

            {/* Discount & Shopping Routes */}
            <Route path="/discount" element={<DiscountPage />} />
            <Route path="/discountsearch" element={<SearchPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />

            {/* Food Routes */}
            <Route path="/foodhome" element={<HomePage />} />
            <Route path="/restaurant" element={<RestaurantList />} />
            <Route path="/restaurant/:id" element={<FoodList />} />
            <Route path="/foodvendor" element={<VendorDashboard />} />
            <Route path="/filters" element={<FiltersPage />} />
            <Route path="/restaurant1/:id" element={<RestaurantDetails />} />
            <Route path="/cart1" element={<CartPage1 />} />
            <Route path="/about" element={<AboutUs />} />

            {/* Event Routes */}
            <Route path="/eventshome" element={<EventsHome />} />
            <Route path="/explore-events" element={<ExploreEvents />} />
            <Route path="/events/:id" element={<EventListing />} />
            <Route path="/eventsForm" element={<EventForm />} />
          </Routes>

          <CartButton />

          {/* Conditionally render Footer */}
          {location.pathname !== "/login" && location.pathname !== "/SignUp" && <Footer />}
        </CartProvider>
      </FormProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
