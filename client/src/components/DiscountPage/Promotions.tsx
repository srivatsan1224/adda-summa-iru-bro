import React from 'react';
import { Gift, ShoppingBag, Sparkles } from 'lucide-react';

interface Promotion {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  gradient: string;
  Icon: React.ElementType;
}

const promotions: Promotion[] = [
  {
    id: 1,
    title: 'Holiday Special',
    description: 'Up to 40% off on selected items',
    buttonText: 'Shop Now',
    gradient: 'bg-gradient-to-r from-purple-500 to-indigo-600',
    Icon: Gift,
  },
  {
    id: 2,
    title: 'Flash Sale',
    description: "24 hours only - Don't miss out!",
    buttonText: 'Shop Now',
    gradient: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    Icon: Sparkles,
  },
  {
    id: 3,
    title: 'Fashion Week',
    description: 'New arrivals every day',
    buttonText: 'Explore',
    gradient: 'bg-gradient-to-r from-pink-500 to-rose-500',
    Icon: ShoppingBag,
  },
  {
    id: 4,
    title: 'Clearance Sale',
    description: 'Up to 70% off everything',
    buttonText: 'Shop Now',
    gradient: 'bg-gradient-to-r from-amber-500 to-orange-500',
    Icon: Gift,
  },
  {
    id: 5,
    title: 'Premium Collection',
    description: 'Exclusive designs for you',
    buttonText: 'Discover',
    gradient: 'bg-gradient-to-b from-emerald-500 to-teal-600',
    Icon: Sparkles,
  },
];

const Promotions: React.FC = () => {
  return (
    <div className="w-[90%] mx-auto my-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {promotions.map((promo) => {
        const Icon = promo.Icon;
        return (
          <div
            key={promo.id}
            className={`${promo.gradient} rounded-xl p-6 sm:p-8 relative overflow-hidden group`}
          >
            <div className="relative z-10 flex flex-col h-full">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                {promo.title}
              </h3>
              <p className="text-sm sm:text-base text-white mb-4">
                {promo.description}
              </p>
              <button className="bg-white text-current px-4 py-2 sm:px-6 sm:py-2 rounded-full font-medium hover:bg-gray-50 transition-colors mt-auto">
                {promo.buttonText}
              </button>
            </div>
            <Icon className="absolute bottom-0 right-0 h-20 w-20 sm:h-32 sm:w-32 text-white/20 transform translate-x-6 translate-y-6 group-hover:translate-y-4 transition-transform" />
          </div>
        );
      })}
    </div>
  );
};

export default Promotions;
