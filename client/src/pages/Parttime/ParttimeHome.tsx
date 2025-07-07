  import React, { useEffect, useState } from "react";
  import { Link } from "react-router-dom"; // *** Import Link for navigation ***
  import ParttimeJobCard from "../../components/Parttime/ParttimeJobCard";
  import ParttimeSearch from "../../components/Parttime/ParttimeSearch";
  import ParttimeFilter from "../../components/Parttime/ParttimeFilter";
  import parttimeApiService from "../../services/parttimeApiService";
  import { PlusCircle } from "lucide-react"; // Icon for the button
interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
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

const ParttimeHome: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [searchParams, setSearchParams] = useState({
    keywords: "",
    location: "",
  });
  const [loading, setLoading] = useState(true);

    const fetchJobs = async (params: Record<string, any> = {}) => { /* ... same ... */
      setLoading(true);
      try {
        const queryParams: Record<string, any> = {};
        for (const key in params) {
          if (params[key] !== "" && params[key] !== null && params[key] !== undefined) {
            queryParams[key] = params[key];
          }
        }
        const response = await parttimeApiService.get("/jobs", { params: queryParams });
        setJobs(response.data.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchJobs();
  }, []);

    const handleSearch = (keywords: string, location: string) => { /* ... same, remember to use `search: keywords` if backend expects `search` ... */
      setSearchParams({ keywords, location });
      fetchJobs({ ...filters, search: keywords, location }); // Use 'search'
    };

    const handleFilterChange = (newFilters: Record<string, any>) => { /* ... same ... */
      setFilters(newFilters);
      fetchJobs({ ...newFilters, ...searchParams, search: searchParams.keywords }); // Ensure search is included
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header and Post Job Button */}
          <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Find Part Time Jobs
              </h1>
              <p className="text-gray-600 mt-2">
                Thousands of jobs are waiting for you
              </p>
            </div>
            {/* *** NEW POST JOB BUTTON *** */}
            <Link
              to="/parttime/new" // Matches your route for JobPostingPage
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <PlusCircle size={20} />
              Post a New Job
            </Link>
          </div>

          {/* Search Section */}
          {/* ... same ... */}
          <div className="mb-6">
            <ParttimeSearch onSearch={handleSearch} />
          </div>

          {/* Main Content */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters */}
            <aside className="w-full md:w-64 flex-shrink-0"> {/* Adjusted for responsiveness */}
              <ParttimeFilter onFilterChange={handleFilterChange} />
            </aside>

            {/* Job Listings */}
            {/* ... same ... */}
             <main className="flex-1">
                {/* Results Header */}
                <div className="mb-4 flex justify-between items-center">
                <span className="text-gray-600">{jobs.length} jobs found</span>
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                    <option>Most Recent</option>
                    <option>Most Relevant</option>
                </select>
                </div>

            {/* Job Cards */}
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="h-32 bg-gray-100 animate-pulse rounded-lg"
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <ParttimeJobCard key={job.id} job={job} />
                ))}
                {jobs.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                    <p className="text-gray-500">
                      No jobs found matching your criteria
                    </p>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ParttimeHome;
