import React, { useState } from 'react';
import { Search, Star, ChevronRight, Mic, X, Shield, Award, IndianRupee } from 'lucide-react';
import {
  ServiceCardProps,
  DetailedServiceCardProps,
  StepProps,
  PromiseCardProps,
  ServiceFeatureProps,
} from './types';

function PaintingandServices(): JSX.Element {
  const [showEstimateModal, setShowEstimateModal] = useState<boolean>(false);
  const [mobileNumber, setMobileNumber] = useState<string>('');

  const handleEstimateClick = (): void => {
    setShowEstimateModal(true);
  };

  const handleMobileNumberChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      setMobileNumber(value);
    }
  };

  const handleContinue = (): void => {
    if (mobileNumber.length === 10) {
      // Handle form submission
      console.log('Mobile number submitted:', mobileNumber);
    }
  };

  return (
 <div className="min-h-screen bg-gray-50">      {/* Search Bar */}
      <div className="p-4 bg-white shadow-sm">
        <div className="max-w-3xl mx-auto relative">
          <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search Sofa Cleaning, House Painting..."
            className="w-full pl-10 pr-10 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Mic className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
        </div>
      </div>

      {/* Main Content */}
 <div className="max-w-6xl mx-auto p-4">        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Home Painting Services</h1>
            <div className="flex items-center mt-2">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="ml-1 text-gray-600">4.8</span>
              <span className="ml-2 text-gray-500">(4.7M bookings near you)</span>
            </div>
          </div>
        </div>

        {/* Services Grid */}
         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
          <ServiceCard
            label="Interior Painting"
            tag="Flat 25% Off"
            icon="🏠"
          />
          <ServiceCard
            label="Exterior Painting"
            tag="Trending Now"
            icon="🏗️"
          />
          <ServiceCard
            label="Water Proofing"
            tag="Newly Launched"
            icon="💧"
          />
          <ServiceCard
            label="Rental Painting"
            icon="🏠"
          />
        </div>

        {/* Recent Projects */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white" />
                ))}
                <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs">
                  +30
                </div>
              </div>
              <span className="ml-3 font-medium">Recent Projects</span>
              <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">New</span>
            </div>
            <button className="text-teal-500 hover:text-teal-600">See All</button>
          </div>
        </div>

        {/* Service Cards */}
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DetailedServiceCard
            title="Interior Painting"
            rating="4.8"
            reviews="18K"
            features={[
              "Professional Painters for Perfect Finish",
              "On-site visit for Painting Estimate",
              "1-Year Service Warranty"
            ]}
            image="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800"
            onEstimateClick={handleEstimateClick}
          />
          
          <DetailedServiceCard
            title="Exterior Painting"
            rating="4.8"
            reviews="14K"
            features={[
              "Transform the home's exterior",
              "Prevent and repair cracks on walls",
              "Protect your house from harsh weather elements"
            ]}
            image="https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=800"
            onEstimateClick={handleEstimateClick}
          />
        </div>

        {/* How it works */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">How painting service works in Bangalore</h2>
          <div className="space-y-8">
            <Step
              number="1"
              title="Book Home Inspection"
              description="Tell us preferred time to book"
            />
            <Step
              number="2"
              title="Measure & Estimate"
              description="Get accurate quotes with laser measurements"
            />
            <Step
              number="3"
              title="Project Initiation"
              description="Guaranteed on time project initiation and completion"
            />
            <Step
              number="4"
              title="Cleaning & Quality Check"
              description="Post paint cleanup and quality check"
            />
          </div>
        </div>

        {/* Promise Section */}
       <div className="mt-12 bg-gray-50 rounded-lg p-4 md:p-8">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <span className="text-red-500 font-bold mr-2">WE </span>Bachelor Promise
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            <PromiseCard title="Best Price" icon="💰" />
            <PromiseCard title="Free Reschedule" icon="🔄" />
            <PromiseCard title="5 Star Rated Partner" icon="⭐" />
          </div>
        </div>
      </div>

      {/* Estimate Modal */}
      {showEstimateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg overflow-hidden max-w-4xl w-full flex">
            {/* Left side - Image */}
            <div className="w-1/2 relative hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800"
                alt="Painting Service"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right side - Form */}
            <div className="w-full md:w-1/2 p-8 relative">
              <button 
                onClick={() => setShowEstimateModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Enter mobile number to continue</h2>
                <p className="text-gray-600">Never shared, never spammed.</p>
              </div>

              <div className="mb-6">
                <div className="flex border rounded-lg overflow-hidden">
                  <div className="flex items-center px-3 bg-gray-50 border-r">
                    <img src="https://flagcdn.com/w20/in.png" alt="India" className="w-5 h-4 mr-1" />
                    <span className="text-gray600">+91</span>
                  </div>
                  <input
                    type="tel"
                    placeholder="Enter Mobile Number"
                    className="flex-1 p-3 outline-none"
                    value={mobileNumber}
                    onChange={handleMobileNumberChange}
                    maxLength={10}
                    pattern="[0-9]*"
                  />
                </div>
              </div>

              <button 
                className={`w-full bg-red-500 text-white py-3 rounded-lg font-medium transition-colors mb-8 ${
                  mobileNumber.length === 10 ? 'hover:bg-red-600' : 'opacity-50 cursor-not-allowed'
                }`}
                onClick={handleContinue}
                disabled={mobileNumber.length !== 10}
              >
                Continue
              </button>

              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">Why to choose Bachelor Services?</h3>
                <div className="grid grid-cols-2 gap-4">
                  <ServiceFeature icon={<IndianRupee className="w-5 h-5" />} text="Lowest Price Guaranteed." />
                  <ServiceFeature icon={<Award className="w-5 h-5" />} text="5 Star Rated Partners." />
                  <ServiceFeature icon={<Shield className="w-5 h-5" />} text="Free Reschedule." />
                  <ServiceFeature icon={<Star className="w-5 h-5" />} text="Dedicates Customer Support." />
                </div>
                <p className="text-sm text-gray-500">
                  By continuing, you agree to our Terms & Conditions and opting in to receive updates on 
                  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-4 h-4 inline mx-1" />
                  WhatsApp
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const ServiceCard: React.FC<ServiceCardProps> = ({ label, tag, icon }) => {
  return (
    <div className="relative bg-white p-3 md:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      {tag && (
        <span className="absolute top-2 left-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
          {tag}
        </span>
      )}
      <div className="mt-4 md:mt-6 text-center">
        <span className="text-2xl md:text-3xl mb-2 block">{icon}</span>
        <p className="text-xs md:text-sm font-medium text-gray-800">{label}</p>
      </div>
    </div>
  );
};

const DetailedServiceCard: React.FC<DetailedServiceCardProps> = ({ 
  title, 
  rating, 
  reviews, 
  features, 
  image, 
  onEstimateClick 
}) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-40 md:h-48">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4">
          <h3 className="text-white text-lg md:text-xl font-semibold">{title}</h3>
          <div className="flex items-center mt-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="ml-1 text-white text-sm">{rating}</span>
            <span className="ml-1 text-white text-sm">({reviews})</span>
          </div>
        </div>
      </div>
      <div className="p-3 md:p-4">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start text-sm">
              <span className="text-green-500 mr-2">✓</span>
              {feature}
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between mt-4">
          <button className="text-gray-600 text-sm flex items-center">
            Show more <ChevronRight className="w-4 h-4 ml-1" />
          </button>
          <button 
            onClick={onEstimateClick}
            className="px-3 md:px-4 py-2 bg-teal-500 text-white text-sm rounded hover:bg-teal-600"
          >
            GET ESTIMATE
          </button>
        </div>
      </div>
    </div>
  );
};
const Step: React.FC<StepProps> = ({ number, title, description }) => {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
        {number}
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
    </div>
  );
};

const PromiseCard: React.FC<PromiseCardProps> = ({ title, icon }) => {
  return (
    <div className="text-center">
      <span className="text-3xl mb-2 block">{icon}</span>
      <h3 className="font-medium">{title}</h3>
    </div>
  );
};

const ServiceFeature: React.FC<ServiceFeatureProps> = ({ icon, text }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="text-gray-600">{icon}</div>
      <span className="text-sm text-gray-700">{text}</span>
    </div>
  );
};

export default PaintingandServices;