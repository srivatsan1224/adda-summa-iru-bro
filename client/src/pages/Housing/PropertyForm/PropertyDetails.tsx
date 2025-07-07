import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFormContext } from "./FormContext";
import { ChevronLeft, Building2, Phone } from 'lucide-react';

const PropertyDetailsForm: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const [localState, setLocalState] = useState(formData.propertyDetails || {
    apartmentType: "",
    bhkType: "",
    floor: "",
    totalFloors: "",
    propertyAge: "",
    facing: "",
    builtUpArea: "",
  });

  useEffect(() => {
    updateFormData("propertyDetails", localState);
  }, [localState]);

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
                    style={{ width: "20%" }}
                  ></div>
                </div>
              </div>
              <span className="text-sm font-medium text-teal-700">1 of 6 completed</span>
            </div>
          </div>

          <div className="flex">
            {/* Navigation Sidebar */}
            <div className="w-64 bg-teal-50 p-6">
              <nav>
                <ul className="space-y-4">
                  {navigationSteps.map((step) => (
                    <li
                      key={step}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        step === "Property Details"
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
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center space-x-3 mb-8">
                  <Building2 className="w-8 h-8 text-teal-600" />
                  <h2 className="text-2xl font-bold text-teal-900">Property Details</h2>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  {/* Apartment Type */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-teal-700">
                      Apartment Type *
                    </label>
                    <select
                      value={localState.apartmentType}
                      onChange={(e) => setLocalState(prev => ({ ...prev, apartmentType: e.target.value }))}
                      className="w-full px-4 py-2 border border-teal-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    >
                      <option value="">Select type</option>
                      <option value="Flat">Flat</option>
                      <option value="Villa">Villa</option>
                      <option value="Independent House">Independent House</option>
                    </select>
                  </div>

                  {/* BHK Type */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-teal-700">
                      BHK Type *
                    </label>
                    <select
                      value={localState.bhkType}
                      onChange={(e) => setLocalState(prev => ({ ...prev, bhkType: e.target.value }))}
                      className="w-full px-4 py-2 border border-teal-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    >
                      <option value="">Select BHK</option>
                      <option value="1 BHK">1 BHK</option>
                      <option value="2 BHK">2 BHK</option>
                      <option value="3 BHK">3 BHK</option>
                    </select>
                  </div>

                  {/* Floor */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-teal-700">
                      Floor *
                    </label>
                    <select
                      value={localState.floor}
                      onChange={(e) => setLocalState(prev => ({ ...prev, floor: e.target.value }))}
                      className="w-full px-4 py-2 border border-teal-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    >
                      <option value="">Select floor</option>
                      <option value="Ground Floor">Ground Floor</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
                  </div>

                  {/* Total Floors */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-teal-700">
                      Total Floors *
                    </label>
                    <select
                      value={localState.totalFloors}
                      onChange={(e) => setLocalState(prev => ({ ...prev, totalFloors: e.target.value }))}
                      className="w-full px-4 py-2 border border-teal-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    >
                      <option value="">Select total floors</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                  </div>

                  {/* Property Age */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-teal-700">
                      Property Age *
                    </label>
                    <select
                      value={localState.propertyAge}
                      onChange={(e) => setLocalState(prev => ({ ...prev, propertyAge: e.target.value }))}
                      className="w-full px-4 py-2 border border-teal-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    >
                      <option value="">Select age</option>
                      <option value="0-5 years">0-5 years</option>
                      <option value="5-10 years">5-10 years</option>
                      <option value="10+ years">10+ years</option>
                    </select>
                  </div>

                  {/* Facing */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-teal-700">
                      Facing *
                    </label>
                    <select
                      value={localState.facing}
                      onChange={(e) => setLocalState(prev => ({ ...prev, facing: e.target.value }))}
                      className="w-full px-4 py-2 border border-teal-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    >
                      <option value="">Select facing</option>
                      <option value="North">North</option>
                      <option value="East">East</option>
                      <option value="South">South</option>
                      <option value="West">West</option>
                    </select>
                  </div>

                  {/* Built Up Area */}
                  <div className="col-span-2 space-y-2">
                    <label className="block text-sm font-medium text-teal-700">
                      Built Up Area *
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={localState.builtUpArea}
                        onChange={(e) => setLocalState(prev => ({ ...prev, builtUpArea: e.target.value }))}
                        placeholder="Enter built up area"
                        className="flex-1 px-4 py-2 border border-teal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                      />
                      <span className="text-teal-700">Sq.ft</span>
                    </div>
                  </div>
                </div>

                {/* Help Section */}
                <div className="bg-teal-50 rounded-xl p-6 mb-8">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-teal-100 rounded-xl">
                      <Phone className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-teal-900 font-medium mb-2">
                        Need help filling the details?
                      </p>
                      <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                        Request Callback
                      </button>
                    </div>
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
                  <Link to="/locality">
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
    </div>
  );
};

export default PropertyDetailsForm;