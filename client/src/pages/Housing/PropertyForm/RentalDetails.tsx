import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFormContext } from "./FormContext";
import { ChevronLeft, Home, IndianRupee, Calendar, Users } from 'lucide-react';

const RentalDetailsForm: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const [localState, setLocalState] = useState(formData.rentalDetails || {
    propertyType: "onlyRent",
    expectedRent: "",
    expectedDeposit: "",
    rentNegotiable: false,
    monthlyMaintenance: "",
    availableFrom: "",


    preferredTenants: [],
    furnishing: "",
    parking: "",
    description: "",
  });

  const toggleTenantPreference = (preference: string) => {
    setLocalState((prev) => ({
      ...prev,
      preferredTenants: prev.preferredTenants?.includes(preference)
        ? prev.preferredTenants.filter((item) => item !== preference)
        : [...(prev.preferredTenants || []), preference],
    }));
  };

  useEffect(() => {
    updateFormData("rentalDetails", localState);
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
                    style={{ width: "60%" }}
                  ></div>
                </div>
              </div>
              <span className="text-sm font-medium text-teal-700">3 of 6 completed</span>
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
                        step === "Rental Details"
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
                  <Home className="w-8 h-8 text-teal-600" />
                  <h2 className="text-2xl font-bold text-teal-900">Rental Details</h2>
                </div>

                <div className="space-y-8">
                  {/* Rental Amounts */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-teal-700">
                        Expected Rent *
                      </label>
                      <div className="relative">
                        <IndianRupee className="absolute left-4 top-3 text-teal-500 w-5 h-5" />
                        <input
                          type="text"
                          value={localState.expectedRent}
                          onChange={(e) => setLocalState(prev => ({ ...prev, expectedRent: e.target.value }))}
                          placeholder="Enter monthly rent"
                          className="w-full pl-12 pr-4 py-2 border border-teal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-teal-700">
                        Expected Deposit *
                      </label>
                      <div className="relative">
                        <IndianRupee className="absolute left-4 top-3 text-teal-500 w-5 h-5" />
                        <input
                          type="text"
                          value={localState.expectedDeposit}
                          onChange={(e) => setLocalState(prev => ({ ...prev, expectedDeposit: e.target.value }))}
                          placeholder="Enter security deposit"
                          className="w-full pl-12 pr-4 py-2 border border-teal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-teal-700">
                        Monthly Maintenance
                      </label>
                      <div className="relative">
                        <IndianRupee className="absolute left-4 top-3 text-teal-500 w-5 h-5" />
                        <input
                          type="text"
                          value={localState.monthlyMaintenance}
                          onChange={(e) => setLocalState(prev => ({ ...prev, monthlyMaintenance: e.target.value }))}
                          placeholder="Enter maintenance amount"
                          className="w-full pl-12 pr-4 py-2 border border-teal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-teal-700">
                        Available From *
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-3 text-teal-500 w-5 h-5" />
                        <input
                          type="date"
                          value={localState.availableFrom}
                          onChange={(e) => setLocalState(prev => ({ ...prev, availableFrom: e.target.value }))}
                          className="w-full pl-12 pr-4 py-2 border border-teal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Preferred Tenants */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Users className="w-6 h-6 text-teal-600" />
                      <h3 className="text-lg font-semibold text-teal-900">
                        Preferred Tenants *
                      </h3>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      {["Anyone", "Family", "Bachelor Female", "Bachelor Male", "Company"].map(
                        (tenant) => (
                          <label
                            key={tenant}
                            className={`flex items-center space-x-3 p-3 border rounded-xl cursor-pointer transition-colors ${
                              localState.preferredTenants?.includes(tenant)
                                ? "border-teal-500 bg-teal-50"
                                : "border-teal-200 hover:bg-teal-50"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={localState.preferredTenants?.includes(tenant)}
                              onChange={() => toggleTenantPreference(tenant)}
                              className="w-4 h-4 text-teal-600 border-teal-300 rounded focus:ring-teal-500"
                            />
                            <span className="text-sm text-teal-700">{tenant}</span>
                          </label>
                        )
                      )}
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
                    <Link to="/amenities">
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
    </div>
  );
};

export default RentalDetailsForm;