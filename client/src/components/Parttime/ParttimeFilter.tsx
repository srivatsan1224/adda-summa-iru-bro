import React, { useState } from "react";

interface ParttimeFilterProps {
  onFilterChange: (filters: Record<string, any>) => void;
}

const ParttimeFilter: React.FC<ParttimeFilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    location: "",
    salaryRange: "",
    datePosted: "",
    jobType: "",
  });

  const handleFilterChange = (key: string, value: string) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="w-64 bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold text-gray-900">Filters</h2>
      </div>

      <div className="p-4 space-y-4">
        {/* Location Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <select
            className="w-full text-sm border border-gray-300 rounded-md p-2 hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) => handleFilterChange("location", e.target.value)}
          >
            <option value="">Any Location</option>
            <option value="near_me">Near Me</option>
            <option value="remote">Remote</option>
            <option value="exact">Exact Location</option>
          </select>
        </div>

        {/* Salary Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Salary Range
          </label>
          <select
            className="w-full text-sm border border-gray-300 rounded-md p-2 hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) => handleFilterChange("salaryRange", e.target.value)}
          >
            <option value="">Any</option>
            <option value="<30000">Below ₹30,000</option>
            <option value="30000-100000">₹30,000 - ₹1,00,000</option>
            <option value=">100000">Above ₹1,00,000</option>
          </select>
        </div>

        {/* Date Posted Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date Posted
          </label>
          <select
            className="w-full text-sm border border-gray-300 rounded-md p-2 hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) => handleFilterChange("datePosted", e.target.value)}
          >
            <option value="">All Time</option>
            <option value="24h">Last 24 Hours</option>
            <option value="3d">Last 3 Days</option>
            <option value="7d">Last 7 Days</option>
          </select>
        </div>

        {/* Job Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type of Employment
          </label>
          <select
            className="w-full text-sm border border-gray-300 rounded-md p-2 hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) => handleFilterChange("jobType", e.target.value)}
          >
            <option value="">Any</option>
            <option value="part_time">Part-Time</option>
            <option value="full_time">Full-Time</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ParttimeFilter;
