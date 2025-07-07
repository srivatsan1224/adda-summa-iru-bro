import React from "react";
import { Calendar, MapPin, Star, Heart } from "lucide-react";

// EventProps Interface with id as string
interface EventProps {
  id: string; // Change id to string
  title: string;
  location: string;
  price: string;
  rating: number;
  image: string;
  date: string;
  reviews: number;
  tag: string;
}

const EventCard: React.FC<{ event: EventProps; onClick: () => void }> = ({ event, onClick }) => {
  return (
    <div
      className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
      onClick={onClick} // Trigger the onClick handler passed as prop
    >
      {/* Event Image Section */}
      <div className="relative">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Tag Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-indigo-600">
            {event.tag}
          </span>
        </div>
        {/* Heart Button (Favorite) */}
        <button
          className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors group"
          aria-label="Add to favorites"
        >
          <Heart className="w-5 h-5 text-gray-600 group-hover:text-red-500 transition-colors" />
        </button>
      </div>

      {/* Event Details Section */}
      <div className="p-6">
        {/* Event Date */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <Calendar className="w-4 h-4 text-indigo-600" />
          <span>{event.date}</span>
        </div>

        {/* Event Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
          {event.title}
        </h3>

        {/* Event Location */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <MapPin className="w-4 h-4 text-indigo-600" />
          <span>{event.location}</span>
        </div>

        {/* Rating and Price */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1">
            {/* Rating */}
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="font-medium">{event.rating}</span>
            {/* Reviews */}
            <span className="text-gray-500">({event.reviews})</span>
          </div>
          {/* Price */}
          <span className="font-bold text-lg text-indigo-600">{event.price}</span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
