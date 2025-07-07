// src/components/Parttime/ParttimeJobCard.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, DollarSign, Clock } from "lucide-react";

// Job model interface
interface Job {
  id: string;
  title: string;
  description: string; // Keep this if your card might show it, otherwise optional
  location: string;    // This is crucial
  salaryRange: {
    min: number;
    max: number;
    unit: string;
  };
  jobType: string;
  companyName: string;
  postedDate: string;
  tags?: string[];
}

interface JobCardProps {
  job: Job;
}

const ParttimeJobCard: React.FC<JobCardProps> = ({ job }) => {
  const navigate = useNavigate();

  const getTimeAgo = (date: string) => {
    // ... (your existing getTimeAgo function) ...
    const postedDate = new Date(date);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - postedDate.getTime()) / 60000
    );

    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const handleNavigateToDetails = () => {
    // *** CHANGED LINE ***
    // Pass job.location in the state object
    navigate(`/parttime/job/${job.id}`, { state: { location: job.location } });
  };

  return (
    <div
      // *** CHANGED LINE ***
      onClick={handleNavigateToDetails} // Use the new handler
      className="flex items-start bg-white hover:bg-gray-50 border border-gray-200 p-4 cursor-pointer transition-all duration-200 rounded-lg"
    >
      {/* Company Logo/Initial */}
      <div className="w-12 h-12 rounded bg-gray-100 flex items-center justify-center mr-4 overflow-hidden">
        <span className="text-xl font-semibold text-gray-500">
          {job.companyName.charAt(0)}
        </span>
      </div>

      {/* Job Details */}
      <div className="flex-1">
        {/* Title and Time */}
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
          <span className="text-sm text-gray-500">
            {getTimeAgo(job.postedDate)}
          </span>
        </div>

        {/* Company Name */}
        <p className="text-sm text-gray-600 mb-2">{job.companyName}</p>

        {/* Job Metadata */}
        <div className="flex flex-wrap gap-3 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <MapPin size={14} />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{job.jobType}</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign size={14} />
            <span>
              ₹{job.salaryRange.min}-{job.salaryRange.max}/
              {job.salaryRange.unit}
            </span>
          </div>
        </div>

        {/* Tags */}
        {job.tags && job.tags.length > 0 && (
          <div className="flex gap-2 mt-2">
            {job.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ParttimeJobCard;