
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate("/explore-events"); // Navigate to the Explore Events page
  };

  return (
    <div className="relative h-[75vh] overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay opacity-20 animate-pulse"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-center md:text-left max-w-3xl">
            <div className="inline-block animate-bounce mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-500 text-white">
                🎉 New Events Added Daily
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in">
              Discover{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                Extraordinary
              </span>{" "}
              Events
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 animate-fade-in-up">
              Join thousands of people creating unforgettable memories at the
              most exciting events near you.
            </p>
            <div className="flex flex-col md:flex-row gap-4 animate-fade-in-up">
              {/* Explore Events Button with Navigation */}
              <button
                onClick={handleExploreClick}
                className="bg-white text-indigo-700 px-8 py-4 rounded-xl font-semibold hover:bg-indigo-50 transition-all transform hover:scale-105 shadow-lg"
              >
                Explore Events
              </button>

              {/* Host an Event Button (No navigation yet) */}
              <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all transform hover:scale-105">
                Host an Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
