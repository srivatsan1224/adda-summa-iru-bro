import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import * as LucideIcons from "lucide-react"; // Import all Lucide icons dynamically
import HeroSection from "../../components/EventsComp/HeroSection";
import EventCard from "../../components/EventsComp/EventCard";
import CategoryCard from "../../components/EventsComp/CategoryCard";
import NewsletterSection from "../../components/EventsComp/NewsletterSection";

// Map category names to actual Lucide icons
const categories = [
  { name: "Music", icon: LucideIcons.Music, gradient: "from-pink-500 to-rose-500", count: "2.5k events" },
  { name: "Sports", icon: LucideIcons.Dumbbell, gradient: "from-blue-500 to-cyan-500", count: "1.8k events" },
  { name: "Arts", icon: LucideIcons.Palette, gradient: "from-violet-500 to-purple-500", count: "3.2k events" },
  { name: "Food", icon: LucideIcons.UtensilsCrossed, gradient: "from-orange-500 to-amber-500", count: "1.5k events" },
  { name: "Technology", icon: LucideIcons.Laptop, gradient: "from-emerald-500 to-teal-500", count: "2.1k events" },
  { name: "Business", icon: LucideIcons.Briefcase, gradient: "from-blue-600 to-indigo-600", count: "1.9k events" },
  { name: "Lifestyle", icon: LucideIcons.Heart, gradient: "from-red-500 to-pink-500", count: "2.7k events" },
  { name: "Education", icon: LucideIcons.GraduationCap, gradient: "from-amber-500 to-orange-500", count: "2.3k events" },
];

// Define Event type
interface Event {
  id: string; // Event ID (could be a number or string depending on your backend response)
  title: string;
  location: string;
  price: string;
  rating: number;
  image: string;
  date: string;
  reviews: number;
  tag: string;
}

const Index: React.FC = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]); // Define the state with the correct type
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Fetch upcoming events from backend API
    const fetchUpcomingEvents = async () => {
      try {
        const response = await fetch("http://localhost:3000/events");
        const data: Event[] = await response.json(); // Ensure the data is typed as Event[]
        setUpcomingEvents(data); // Set fetched data into state
      } catch (error) {
        console.error("Error fetching upcoming events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingEvents();
  }, []);

  // Handle event card click to navigate to event details page
  const handleEventClick = (eventId: string) => {
    navigate(`/events/${eventId}`); // Use navigate to redirect to event details page
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Events Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
        <h2 className="text-3xl font-bold text-gray-50 mb-6">Upcoming Events</h2>
        {loading ? (
          <p className="text-center text-gray-600">Loading events...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onClick={() => handleEventClick(event.id)} // Attach click handler
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-600">No upcoming events found.</p>
            )}
          </div>
        )}
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore by Category</h2>
          <p className="text-xl text-gray-600">Find the perfect event that matches your interests</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={index} category={category} />
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <NewsletterSection />
    </div>
  );
};

export default Index;
