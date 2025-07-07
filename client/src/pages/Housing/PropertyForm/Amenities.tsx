import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFormContext } from "./FormContext";
import { ChevronLeft, Plus, Minus, Phone, MapPin } from 'lucide-react';

const AmenitiesForm: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const [localState, setLocalState] = useState(formData.amenities || {
    bathrooms: 0,
    balcony: 0,
    waterSupply: "",
    selectedAmenities: [],
    secondaryNumber: "",
    directions: "",
  });

  const toggleAmenity = (amenity: string) => {
    setLocalState((prev) => ({
      ...prev,
      selectedAmenities: prev.selectedAmenities.includes(amenity)
        ? prev.selectedAmenities.filter((item) => item !== amenity)
        : [...prev.selectedAmenities, amenity],
    }));
  };

  useEffect(() => {
    updateFormData("amenities", localState);
  }, [localState]);

  const amenitiesList = [
    "Lift",
    "Air Conditioner",
    "Intercom",
    "Children Play Area",
    "Servant Room",
    "Gas Pipeline",
    "Rain Water Harvesting",
    "House Keeping",
    "Visitor Parking",
    "Internet Services",
    "Club House",
    "Swimming Pool",
    "Fire Safety",
    "Shopping Center",
    "Park",
    "Sewage Treatment Plant",
    "Power Backup",
  ];

  const navigationSteps = [
    "Property Details",
    "Locality Details",
    "Rental Details",
    "Amenities",
    "Gallery",
    "Schedule",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Progress Bar */}
          <div className="p-6 border-b border-teal-100">
            <div className="flex items-center">
              <button 
                onClick={() => window.history.back()}
                className="flex items-center text-teal-700 hover:text-teal-800 font-medium"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                Back
              </button>
              <div className="flex-grow mx-6">
                <div className="h-2 bg-teal-100 rounded-full">
                  <div 
                    className="h-full bg-teal-600 rounded-full transition-all duration-300" 
                    style={{ width: "80%" }}
                  ></div>
                </div>
              </div>
              <span className="text-sm font-medium text-teal-700">4 of 5 completed</span>
            </div>
          </div>

          <div className="flex">
            {/* Navigation Sidebar */}
            <div className="w-64 bg-teal-50 p-6">
              <nav>
                <ul className="space-y-4">
                  {navigationSteps.map((step) => (
                    <li
                      key={step} // No need for index, use step as key
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        step === "Amenities"
                          ? "bg-teal-600 text-white font-semibold"
                          : "text-teal-700 hover:bg-teal-100"
                      }`}
                    >
                      {step}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
              <h2 className="text-2xl font-bold text-teal-900 mb-8">Amenities</h2>

              {/* Counter Inputs */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                {/* Bathrooms */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-teal-700">
                    Bathrooms
                  </label>
                  <div className="flex items-center justify-between px-4 py-2 border border-teal-200 rounded-xl bg-white">
                    <button
                      onClick={() => setLocalState(prev => ({ ...prev, bathrooms: Math.max(0, prev.bathrooms - 1) }))} 
                      className="p-1 hover:bg-teal-50 rounded-full text-teal-600"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="text-lg font-medium text-teal-900">{localState.bathrooms}</span>
                    <button
                      onClick={() => setLocalState(prev => ({ ...prev, bathrooms: prev.bathrooms + 1 }))} 
                      className="p-1 hover:bg-teal-50 rounded-full text-teal-600"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Balcony */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-teal-700">
                    Balcony
                  </label>
                  <div className="flex items-center justify-between px-4 py-2 border border-teal-200 rounded-xl bg-white">
                    <button
                      onClick={() => setLocalState(prev => ({ ...prev, balcony: Math.max(0, prev.balcony - 1) }))} 
                      className="p-1 hover:bg-teal-50 rounded-full text-teal-600"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="text-lg font-medium text-teal-900">{localState.balcony}</span>
                    <button
                      onClick={() => setLocalState(prev => ({ ...prev, balcony: prev.balcony + 1 }))} 
                      className="p-1 hover:bg-teal-50 rounded-full text-teal-600"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Water Supply */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-teal-700">
                    Water Supply
                  </label>
                  <select
                    value={localState.waterSupply}
                    onChange={(e) => setLocalState(prev => ({ ...prev, waterSupply: e.target.value }))}
                    className="w-full px-4 py-2 border border-teal-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  >
                    <option value="">Select availability</option>
                    <option value="24 hours">24 Hours</option>
                    <option value="Limited">Limited Hours</option>
                  </select>
                </div>
              </div>

              {/* Contact Details */}
              <div className="space-y-6 mb-8">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-teal-700">
                    Secondary Contact Number
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-4 border border-r-0 border-teal-200 rounded-l-xl bg-teal-50 text-teal-700">
                      <Phone className="w-5 h-5" />
                      +91
                    </span>
                    <input
                      type="text"
                      value={localState.secondaryNumber}
                      onChange={(e) => setLocalState(prev => ({ ...prev, secondaryNumber: e.target.value }))}
                      className="flex-1 px-4 py-2 border border-teal-200 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                      placeholder="Additional contact number"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-teal-700">
                    Directions for Tenants
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-3 text-teal-500 w-5 h-5" />
                    <input
                      type="text"
                      value={localState.directions}
                      onChange={(e) => setLocalState(prev => ({ ...prev, directions: e.target.value }))}
                      className="w-full pl-12 pr-4 py-2 border border-teal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                      placeholder="E.g., Take the road opposite to Amrita College, take right after 300m..."
                    />
                  </div>
                </div>
              </div>

              {/* Amenities Selection */}
              <div className="space-y-4 mb-8">
                <h3 className="text-lg font-semibold text-teal-900">
                  Available Amenities
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {amenitiesList.map((amenity) => (
                    <label
                      key={amenity} // Using amenity as the key
                      className="flex items-center space-x-3 p-3 border border-teal-200 rounded-xl hover:bg-teal-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={localState.selectedAmenities.includes(amenity)}
                        onChange={() => toggleAmenity(amenity)}
                        className="w-4 h-4 text-teal-600 border-teal-300 rounded focus:ring-teal-500"
                      />
                      <span className="text-sm text-teal-700">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => window.history.back()}
                  className="px-6 py-2 border border-teal-200 rounded-xl text-teal-700 hover:bg-teal-50"
                >
                  Previous
                </button>
                <Link to="/gallery">
                  <button className="px-6 py-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl hover:from-teal-700 hover:to-teal-800 shadow-lg">
                    Save & Continue
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmenitiesForm;
