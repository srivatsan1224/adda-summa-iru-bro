import React, { useEffect, useState } from "react";
// *** Add useNavigate for editing ***
import { useParams, useLocation as useRouteLocation, useNavigate } from "react-router-dom";
import {
  MapPin, Calendar, Clock, Building, Phone, Mail, Globe, ArrowLeft,
  Edit3, Trash2, // *** Icons for new buttons ***
} from "lucide-react";
import parttimeApiService from "../../services/parttimeApiService";
import ApplicationFormModal from "../../components/Parttime/ApplicationFormModal";

// ... (Interface Job remains the same) ...
interface Job {
  id: string;
  title: string;
  description: string;
  responsibilities: string[];
  location: string;
  salaryRange: { min: number; max: number; unit: string; };
  jobType: string;
  workSchedule: string;
  companyName: string;
  contactDetails: { email: string; phone?: string; };
  requiredEducation?: string;
  requiredSkills?: string[]; // Make sure this is in your interface if used
  applicationDeadline?: string;
  postedDate: string;
  tags?: string[];
  perks?: string[]; // Make sure this is in your interface if used
  numberOfOpenings?: number; // Make sure this is in your interface if used
}


const JobDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const routeLocationHook = useRouteLocation();
  const jobLocationFromState = routeLocationHook.state?.location as string | undefined;
  const navigate = useNavigate(); // *** For navigation to edit page ***

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<boolean>(false); // For delete/update actions
  const [error, setError] = useState<string | null>(null);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

  useEffect(() => {
    // ... (fetchJobDetails remains the same) ...
    const fetchJobDetails = async () => {
      if (!id || !jobLocationFromState) {
        setError("Job ID or location is missing to fetch details.");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const response = await parttimeApiService.get(
          `/jobs/${id}?location=${encodeURIComponent(jobLocationFromState)}`
        );
        setJob(response.data.data);
      } catch (err: any) {
        console.error("Error fetching job details:", err);
        setError(err.response?.data?.message || "Failed to fetch job details. Please try again.");
        setJob(null);
      } finally {
        setLoading(false);
      }
    };
    fetchJobDetails();
  }, [id, jobLocationFromState]);

  const handleApplyNow = () => { /* ... remains same ... */
     if (job) {
        setIsApplicationModalOpen(true);
    } else {
        alert("Job details not loaded yet. Please wait or refresh.");
    }
  };
  const handleCloseApplicationModal = () => setIsApplicationModalOpen(false);
  const handleApplicationSuccess = () => { /* ... remains same ... */
    alert("Application submitted! You can also show a toast here.");
  };

  // *** HANDLER FOR DELETING A JOB ***
  const handleDeleteJob = async () => {
    if (!job) return;
    if (window.confirm(`Are you sure you want to delete the job: "${job.title}"?`)) {
      setActionLoading(true);
      setError(null);
      try {
        // API: DELETE /api/jobs/:id?location=<location_value>
        await parttimeApiService.delete(`/jobs/${job.id}?location=${encodeURIComponent(job.location)}`);
        alert("Job deleted successfully!");
        navigate("/parttime"); // Navigate to home or job list page
      } catch (err: any) {
        console.error("Error deleting job:", err.response?.data || err.message);
        setError(err.response?.data?.message || "Failed to delete job. Please try again.");
        setActionLoading(false);
      }
      // No finally for setActionLoading here, as we navigate on success
    }
  };

  // *** HANDLER FOR NAVIGATING TO EDIT JOB PAGE ***
  const handleEditJob = () => {
    if (!job) return;
    // We'll pass the entire job object to the edit page to pre-fill the form
    // The edit page will be a modified version of JobPostingPage
    navigate(`/parttime/edit/${job.id}`, { state: { jobData: job } });
  };


  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-8 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) { // Display error message
    return (
      <div className="max-w-5xl mx-auto p-8 text-center">
        <h2 className="text-2xl font-semibold text-red-600">Error</h2>
        <p className="text-gray-600 mt-2">{error}</p>
        <button
          onClick={() => window.history.back()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }


  if (!job) {
    return (
      <div className="max-w-5xl mx-auto p-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-900">Job not found</h2>
        <p className="text-gray-600 mt-2">
          The job you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }

  // Apply Now Button functionality will be added in a later step

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-5xl mx-auto px-4">
          {/* ... Back button ... */}
           <button
             onClick={() => window.history.back()}
             className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
           >
             <ArrowLeft size={20} className="mr-2" />
             Back to Jobs
           </button>
        </div>

        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                {/* ... Job Title, Company, etc. ... */}
                <div className="flex items-start gap-4">
                   {/* Company Logo */}
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-2xl font-semibold text-gray-500">
                        {job.companyName.charAt(0)}
                        </span>
                    </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {job.title}
                  </h1>
                  <p className="text-lg text-gray-600 mt-1">
                    {job.companyName}
                  </p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Building size={16} />
                      <span>{job.jobType}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{job.workSchedule}</span>
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleApplyNow}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Apply Now
              </button>
              {/* Placeholder for actual ownership check for Edit/Delete */}
                  {true && ( // Replace 'true' with a real authorization check later
                    <>
                      {/* *** THE EDIT BUTTON - Ensure onClick is wired up *** */}
                      <button
                        onClick={handleEditJob} // Make sure this calls the function
                        disabled={actionLoading}
                        className="w-full sm:w-auto px-4 py-3 text-sm bg-yellow-500 text-white font-medium rounded-lg hover:bg-yellow-600 flex items-center justify-center gap-1 disabled:opacity-50"
                      >
                        <Edit3 size={16} /> Edit
                      </button>
                      <button
                        onClick={handleDeleteJob}
                        disabled={actionLoading}
                        className="w-full sm:w-auto px-4 py-3 text-sm bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 flex items-center justify-center gap-1 disabled:opacity-50"
                      >
                        {actionLoading ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div> : <Trash2 size={16} />}
                        {actionLoading ? "Deleting..." : "Delete"}
                      </button>
                    </>
                  )}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 p-6">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              {/* Job Description */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Job Description
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {job.description}
                </p>
              </div>

              {/* Responsibilities */}
              {job.responsibilities && job.responsibilities.length > 0 &&(
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Key Responsibilities
                  </h2>
                  <ul className="space-y-3">
                    {job.responsibilities.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-gray-600"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Job Overview */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Job Overview
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Calendar size={18} className="text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Posted Date
                      </p>
                      <p className="text-sm">
                        {new Date(job.postedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {job.applicationDeadline && (
                    <div className="flex items-center gap-3 text-gray-600">
                      <Clock size={18} className="text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Application Deadline
                        </p>
                        <p className="text-sm">
                          {new Date(
                            job.applicationDeadline
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3 text-gray-600">
                    <Building size={18} className="text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Education
                      </p>
                      <p className="text-sm">
                        {job.requiredEducation || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Company Details
                </h3>
                <div className="space-y-4">
                  {job.contactDetails?.phone && (
                    <div className="flex items-center gap-3 text-gray-600">
                      <Phone size={18} className="text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Phone
                        </p>
                        <p className="text-sm">{job.contactDetails.phone}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3 text-gray-600">
                    <Mail size={18} className="text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Email</p>
                      <p className="text-sm">{job.contactDetails.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-600">
                    <Globe size={18} className="text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Website
                      </p>
                      <a
                        href={`https://${job.companyName.toLowerCase().replace(/\s+/g, '').replace(/[.,]/g, '')}.com`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                         Visit Website (best guess)
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>


      {/* *** RENDER THE MODAL *** */}
      {job && ( // Only render modal if job data is available
        <ApplicationFormModal
          jobId={job.id}
          jobLocation={job.location} // Pass the actual job location
          jobTitle={job.title}
          companyName={job.companyName}
          isOpen={isApplicationModalOpen}
          onClose={handleCloseApplicationModal}
          onApplicationSuccess={handleApplicationSuccess}
        />
      )}
    </>
  );
};

export default JobDetailsPage;


