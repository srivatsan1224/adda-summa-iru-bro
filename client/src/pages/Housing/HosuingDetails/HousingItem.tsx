import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { OwnerSidebar } from '../../../components/Housing/OwnerSidebar';
import { PropertyHeader } from '../../../components/Housing/PropertyHeader';
import { PropertyGallery } from '../../../components/Housing/PropertyGallery';
import { RoomDetails } from '../../../components/Housing/RoomDetails';
import { Services } from '../../../components/Housing/Services';
import { PropertyRules } from '../../../components/Housing/PropertyRules';
import { PropertyMap } from '../../../components/Housing/PropertyMap';

export const HousingItem: React.FC = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!propertyId) {
        console.error("Property ID is missing.");
        setError("Property ID is missing.");
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching property with ID:", propertyId);
const response = await fetch(`http://localhost:3000/api/property/${propertyId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch property: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Fetched property data:", data);
        setProperty(data);
        setLoading(false);
      } catch (err: any) {
        console.error("Error fetching property:", err.message);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 text-red-500 p-6 rounded-lg shadow-lg animate-fade-in">
          Error: {error}
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Property not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50/30">
      <PropertyHeader
        title={property.title || "Property Title"}
        location={property.localityDetails.locality || "Unknown Location"}
        rent={parseInt(property.rentalDetails.expectedRent, 10)}
        deposit={parseInt(property.rentalDetails.expectedDeposit, 10)}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          <div className="flex-1 space-y-8 animate-fade-in">
            <PropertyGallery images={property.gallery.photos || []} />
            
            <div className="space-y-8 mt-8">
              <div className="bg-white rounded-2xl shadow-sm p-8 hover:shadow-md transition-all duration-300">
                <h2 className="text-2xl font-semibold text-gray-900 tracking-tight mb-6 font-sans">
                  Available Room Options
                </h2>
                <div className="space-y-6">
  {property.roomOptions && property.roomOptions.length > 0 ? (
    property.roomOptions.map((room: any, index: number) => (
      <RoomDetails
        key={index}
        type={room.type}
        rent={room.rent}
        deposit={room.deposit}
      />
    ))
  ) : (
    <p className="text-gray-500">No room options available.</p>
  )}
</div>

              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow duration-300">
                <Services />
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow duration-300">
                <PropertyRules />
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow duration-300">
                <PropertyMap />
              </div>
            </div>
          </div>
          
          <div className="w-80 flex-shrink-0">
            <OwnerSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HousingItem;
