import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import { useFormContext } from "./FormContext";
import { ChevronLeft, MapPin, Navigation } from 'lucide-react';
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icon issue in Leaflet
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const LocalityDetailsForm: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const [localState, setLocalState] = useState(formData.localityDetails || {
    city: "Chennai",
    locality: "",
    landmark: "",
    mapCenter: { lat: 13.0827, lng: 80.2707 },
    markerPosition: { lat: 13.0827, lng: 80.2707 },
  });

  useEffect(() => {
    updateFormData("localityDetails", localState);
  }, [localState]);

  const handleMarkerDragEnd = (event: L.DragEndEvent) => {
    const latlng = event.target.getLatLng();
    setLocalState((prev) => ({
      ...prev,
      markerPosition: {
        lat: latlng.lat,
        lng: latlng.lng,
      },
    }));
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setLocalState((prev) => ({
          ...prev,
          mapCenter: { lat, lng },
          markerPosition: { lat, lng },
        }));
      });
    }
  };

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
                    style={{ width: "40%" }}
                  ></div>
                </div>
              </div>
              <span className="text-sm font-medium text-teal-700">2 of 6 completed</span>
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
                        step === "Locality Details"
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
              <div className="max-w-3xl mx-auto space-y-8">
                <h2 className="text-2xl font-bold text-teal-900">Locality Details</h2>

                {/* City Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-teal-700">
                    City *
                  </label>
                  <select
                    value={localState.city}
                    onChange={(e) => setLocalState(prev => ({ ...prev, city: e.target.value }))}
                    className="w-full px-4 py-2 border border-teal-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  >
                    <option value="Chennai">Chennai</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                  </select>
                </div>

                {/* Locality Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-teal-700">
                    Locality *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-3 text-teal-500 w-5 h-5" />
                    <input
                      type="text"
                      value={localState.locality}
                      onChange={(e) => setLocalState(prev => ({ ...prev, locality: e.target.value }))}
                      placeholder="Enter location / society name"
                      className="w-full pl-12 pr-4 py-2 border border-teal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    />
                  </div>
                  <button
                    onClick={handleUseCurrentLocation}
                    className="mt-2 inline-flex items-center text-sm text-teal-600 hover:text-teal-700"
                  >
                    <Navigation className="w-4 h-4 mr-1" />
                    Use Current Location
                  </button>
                </div>

                {/* Landmark Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-teal-700">
                    Landmark / Street *
                  </label>
                  <input
                    type="text"
                    value={localState.landmark}
                    onChange={(e) => setLocalState(prev => ({ ...prev, landmark: e.target.value }))}
                    placeholder="e.g. Evergreen street"
                    className="w-full px-4 py-2 border border-teal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>

                {/* Map */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-teal-700">Mark Locality on Map</h3>
                  <p className="text-sm text-teal-600">
                    Set property location by moving the map marker
                  </p>
                  <div className="rounded-xl overflow-hidden border border-teal-200">
                    <MapContainer
                      center={localState.mapCenter}
                      zoom={14}
                      scrollWheelZoom={false}
                      style={{ height: "400px", width: "100%" }}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      <Marker
                        position={localState.markerPosition}
                        draggable={true}
                        eventHandlers={{
                          dragend: handleMarkerDragEnd,
                        }}
                      >
                        <Popup>Drag to adjust location</Popup>
                      </Marker>
                    </MapContainer>
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
                  <Link to="/rentaldetails">
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

export default LocalityDetailsForm;