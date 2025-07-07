import React from 'react';
import { Truck, Headset as HeadsetMic, ShieldCheck } from 'lucide-react';

const AdSection: React.FC = () => {
  return (
    <div className="w-[95%] md:w-[90%] mx-auto my-8 md:my-16">
      {/* Main Ad Banner */}
      <div className="relative h-[200px] md:h-[300px] rounded-xl overflow-hidden mb-6 md:mb-12">
        <img
          src="https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Special Offer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
          <div className="text-white p-6 md:p-12">
            <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">Special Offer</h2>
            <p className="text-sm md:text-xl mb-4 md:mb-6 max-w-md">
              Get an extra 20% off when you spend $100 or more
            </p>
            <button className="bg-white text-gray-900 px-6 md:px-8 py-2 md:py-3 rounded-full text-sm md:text-base font-semibold hover:bg-gray-100 transition-colors">
              Shop Now
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        {[
          {
            icon: Truck,
            title: "Free Shipping",
            description: "Free shipping on all orders over $50",
          },
          {
            icon: HeadsetMic,
            title: "24/7 Support",
            description: "Round the clock customer service",
          },
          {
            icon: ShieldCheck,
            title: "Secure Payment",
            description: "100% secure payment methods",
          },
        ].map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center group"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors mb-3 md:mb-4">
              <Icon className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1 md:mb-2">{title}</h3>
            <p className="text-sm md:text-base text-gray-600">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdSection;