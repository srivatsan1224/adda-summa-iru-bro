import React from 'react';
import { User, Mail, Phone, MapPin, Building2, Calendar } from "lucide-react";
export interface OwnerSidebarProps {
  owner?: {
    name?: string;
    email?: string;
    mobile?: string;
  };
  property?: {
    buildingDescription?: string;
    locality?: string;
    availableFrom?: string;
  };
}

export const OwnerSidebar: React.FC<OwnerSidebarProps> = ({
  owner = { name: "Unknown Owner", email: "unknown@example.com", mobile: "N/A" },
  property = { buildingDescription: "Building details not available", locality: "Location not specified", availableFrom: "N/A" }
}) => {

  const handleContact = () => {
    alert(`Contacting owner at ${owner.email}`);
  };

  return (
    <div className="w-80 bg-white shadow-lg rounded-xl p-6 sticky top-24 h-fit border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="space-y-6">
        {/* Owner Profile */}
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-full mx-auto mb-4 flex items-center justify-center ring-4 ring-emerald-50">
            <User className="w-12 h-12 text-emerald-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 tracking-tight">
            {owner.name || "Unknown Owner"}
          </h3>
          <p className="text-sm text-gray-500 mt-1">Property Owner</p>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <div className="space-y-4">
            {/* Contact Details */}
            <div className="flex items-center space-x-3 text-gray-600 hover:text-emerald-600 transition-colors group cursor-pointer">
              <Phone className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 transition-colors" />
              <span className="text-sm">{owner.mobile || "N/A"}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600 hover:text-emerald-600 transition-colors group cursor-pointer">
              <Mail className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 transition-colors" />
              <span className="text-sm">{owner.email || "unknown@example.com"}</span>
            </div>

            {/* Property Details */}
            <div className="pt-4 border-t border-gray-100">
              <h4 className="text-sm font-medium text-gray-900 mb-3 tracking-wide uppercase">
                Property Details
              </h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Building2 className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm">{property.buildingDescription || "Building details not available"}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <MapPin className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm">{property.locality || "Location not specified"}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Calendar className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm">Available from {property.availableFrom || "N/A"}</span>
                </div>
              </div>
            </div>

            {/* Contact Button */}
            <button
              onClick={handleContact}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 mt-4 shadow-sm hover:shadow-md"
            >
              Contact Owner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
