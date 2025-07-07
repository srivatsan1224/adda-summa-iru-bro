import React, { useState } from "react";
import { Search, MapPin } from "lucide-react";

interface ParttimeSearchProps {
  onSearch: (keywords: string, location: string) => void;
}

const ParttimeSearch: React.FC<ParttimeSearchProps> = ({ onSearch }) => {
  const [keywords, setKeywords] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  const handleSearch = () => {
    onSearch(keywords, location);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex gap-2 p-4 bg-white border border-gray-200 rounded-lg">
      {/* Keywords Input */}
      <div className="flex-1 relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Search size={20} />
        </div>
        <input
          type="text"
          placeholder="What type of part-time job?"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Location Input */}
      <div className="w-64 relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <MapPin size={20} />
        </div>
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Search Job
      </button>
    </div>
  );
};

export default ParttimeSearch;
