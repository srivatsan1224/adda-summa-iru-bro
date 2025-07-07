// src/pages/Parttime/JobPostingPage.tsx
import React, { useState, useEffect } from "react";
// *** Add useLocation and useParams for edit mode ***
import { useNavigate, useLocation as useRouteLocation, useParams } from "react-router-dom";
import parttimeApiService from "../../services/parttimeApiService";

// Interface for Job (can be shared or defined here if specific to this page)
interface Job {
  id: string;
  title: string;
  description: string;
  responsibilities: string[];
  location: string;
  requiredEducation: string;
  requiredSkills: string[];
  salaryRange: { min: number; max: number; unit: string; };
  jobType: string;
  workSchedule: string;
  companyName: string;
  contactDetails: { email: string; phone?: string; };
  tags?: string[];
  perks?: string[];
  applicationDeadline?: string;
  numberOfOpenings?: number;
  // Add any other fields needed for pre-filling
}

interface JobPayload { /* ... same as before ... */
  title: string;
  description: string;
  responsibilities: string[];
  location: string;
  requiredEducation: string;
  requiredSkills: string[];
  salaryRange: { min: number; max: number; unit: string; };
  jobType: string;
  workSchedule: string;
  companyName: string;
  contactDetails: { email: string; phone?: string; };
  tags?: string[];
  perks?: string[];
  applicationDeadline?: string;
  numberOfOpenings?: number;
}


const JobPostingPage: React.FC = () => {
  const navigate = useNavigate();
  const routeLocationHook = useRouteLocation(); // For getting state
  const { id: jobIdFromParams } = useParams<{ id?: string }>(); // For edit mode URL: /edit/:id

  const [isEditMode, setIsEditMode] = useState(false);
  const [existingJobData, setExistingJobData] = useState<Job | null>(null);

  const [formData, setFormData] = useState({
    title: "", description: "", responsibilities: "", location: "",
    requiredEducation: "", requiredSkills: "", salaryMin: "", salaryMax: "",
    salaryUnit: "month", jobType: "Part-Time", workSchedule: "", companyName: "",
    contactEmail: "", contactPhone: "", tags: "", perks: "",
    applicationDeadline: "", numberOfOpenings: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // *** EFFECT TO PRE-FILL FORM IN EDIT MODE ***
  useEffect(() => {
    const jobDataFromState = routeLocationHook.state?.jobData as Job | undefined;
    if (jobIdFromParams && jobDataFromState) { // If ID in URL and data in state, it's edit mode
      setIsEditMode(true);
      setExistingJobData(jobDataFromState);
      setFormData({
        title: jobDataFromState.title || "",
        description: jobDataFromState.description || "",
        responsibilities: jobDataFromState.responsibilities?.join("\n") || "",
        location: jobDataFromState.location || "",
        requiredEducation: jobDataFromState.requiredEducation || "",
        requiredSkills: jobDataFromState.requiredSkills?.join(", ") || "",
        salaryMin: jobDataFromState.salaryRange?.min?.toString() || "",
        salaryMax: jobDataFromState.salaryRange?.max?.toString() || "",
        salaryUnit: jobDataFromState.salaryRange?.unit || "month",
        jobType: jobDataFromState.jobType || "Part-Time",
        workSchedule: jobDataFromState.workSchedule || "",
        companyName: jobDataFromState.companyName || "",
        contactEmail: jobDataFromState.contactDetails?.email || "",
        contactPhone: jobDataFromState.contactDetails?.phone || "",
        tags: jobDataFromState.tags?.join(", ") || "",
        perks: jobDataFromState.perks?.join(", ") || "",
        applicationDeadline: jobDataFromState.applicationDeadline?.split('T')[0] || "", // Format for date input
        numberOfOpenings: jobDataFromState.numberOfOpenings?.toString() || "",
      });
    } else if (jobIdFromParams && !jobDataFromState) {
        // If ID in params but no state, could be a direct link to edit page
        // Optionally fetch job data here if needed, but for now, rely on state passing
        console.warn("Edit mode: Job ID present but no jobData in state. Form will be empty.");
        setIsEditMode(true); // Still consider it edit mode based on URL
    }
  }, [jobIdFromParams, routeLocationHook.state]);


  const handleChange = ( /* ... same as before ... */
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

     if (!formData.title || !formData.description || !formData.responsibilities || !formData.location ||
        !formData.requiredEducation || !formData.requiredSkills || !formData.salaryMin || !formData.salaryMax ||
        !formData.jobType || !formData.workSchedule || !formData.companyName || !formData.contactEmail
    ) {
        setError("Please fill in all mandatory fields marked with *");
        setLoading(false);
        return;
    }

    const jobPayload: JobPayload = { /* ... same payload construction ... */
      title: formData.title,
      description: formData.description,
      responsibilities: formData.responsibilities.split(/[\n,]+/).map(r => r.trim()).filter(r => r),
      location: formData.location, // For updates, if location changes, backend handles it as property update
      requiredEducation: formData.requiredEducation,
      requiredSkills: formData.requiredSkills.split(',').map(s => s.trim()).filter(s => s),
      salaryRange: { min: parseFloat(formData.salaryMin), max: parseFloat(formData.salaryMax), unit: formData.salaryUnit,},
      jobType: formData.jobType,
      workSchedule: formData.workSchedule,
      companyName: formData.companyName,
      contactDetails: { email: formData.contactEmail, phone: formData.contactPhone || undefined,},
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
      perks: formData.perks.split(',').map(p => p.trim()).filter(p => p),
      applicationDeadline: formData.applicationDeadline || undefined,
      numberOfOpenings: formData.numberOfOpenings ? parseInt(formData.numberOfOpenings, 10) : undefined,
    };

    if (isNaN(jobPayload.salaryRange.min) || isNaN(jobPayload.salaryRange.max)) { /* ... salary validation ... */
        setError("Salary Min and Max must be valid numbers."); setLoading(false); return;
    }
    if (jobPayload.numberOfOpenings !== undefined && isNaN(jobPayload.numberOfOpenings)) { /* ... openings validation ... */
        setError("Number of Openings must be a valid number."); setLoading(false); return;
    }


    try {
      if (isEditMode && existingJobData) {
        // *** UPDATE API CALL ***
        // API: PUT /api/jobs/:id?currentLocation=<job_current_location>
        // existingJobData.location is the *original* location (partition key)
        await parttimeApiService.put(
          `/jobs/${existingJobData.id}?currentLocation=${encodeURIComponent(existingJobData.location)}`,
          jobPayload
        );
        alert("Job updated successfully!");
        navigate(`/parttime/job/${existingJobData.id}`, { state: { location: jobPayload.location } }); // Navigate back to details, pass potentially new location
      } else {
        // *** CREATE API CALL (existing logic) ***
        const response = await parttimeApiService.post("/jobs", jobPayload);
        alert("Job posted successfully!");
        navigate(`/parttime/job/${response.data.data.id}`, { state: { location: response.data.data.location } }); // Navigate to new job
      }
    } catch (err: any) {
      console.error(`Error ${isEditMode ? "updating" : "posting"} job:`, err.response?.data || err.message);
      setError(err.response?.data?.message || `Failed to ${isEditMode ? "update" : "post"} job. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-md my-8">
      {/* *** Change title based on mode *** */}
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        {isEditMode ? "Edit Job Posting" : "Post a New Part-Time Job"}
      </h1>

      {error && ( /* ... error display ... */
        <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Job Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Job Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text" id="title" name="title" value={formData.title} onChange={handleChange} required
            className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Company Name */}
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} required
            className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location (e.g., City, State or "Remote") <span className="text-red-500">*</span>
          </label>
          <input
            type="text" id="location" name="location" value={formData.location} onChange={handleChange} required
            className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Job Type */}
        <div>
          <label htmlFor="jobType" className="block text-sm font-medium text-gray-700">
            Job Type <span className="text-red-500">*</span>
          </label>
          <select
            id="jobType" name="jobType" value={formData.jobType} onChange={handleChange} required
            className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="Part-Time">Part-Time</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Contract">Contract</option>
            <option value="Temporary">Temporary</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        {/* Work Schedule */}
        <div>
          <label htmlFor="workSchedule" className="block text-sm font-medium text-gray-700">
            Work Schedule (e.g., Mon-Fri 9am-1pm, Flexible 20hrs/week) <span className="text-red-500">*</span>
          </label>
          <input
            type="text" id="workSchedule" name="workSchedule" value={formData.workSchedule} onChange={handleChange} required
            className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Salary Range */}
        <fieldset className="border p-4 rounded-md">
            <legend className="text-sm font-medium text-gray-700 px-1">Salary Range <span className="text-red-500">*</span></legend>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                <div>
                    <label htmlFor="salaryMin" className="block text-xs font-medium text-gray-600">Min</label>
                    <input type="number" id="salaryMin" name="salaryMin" value={formData.salaryMin} onChange={handleChange} required min="0"
                           className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
                </div>
                <div>
                    <label htmlFor="salaryMax" className="block text-xs font-medium text-gray-600">Max</label>
                    <input type="number" id="salaryMax" name="salaryMax" value={formData.salaryMax} onChange={handleChange} required min="0"
                           className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
                </div>
                <div>
                    <label htmlFor="salaryUnit" className="block text-xs font-medium text-gray-600">Unit</label>
                    <select id="salaryUnit" name="salaryUnit" value={formData.salaryUnit} onChange={handleChange}
                            className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                        <option value="hour">Hour</option>
                        <option value="day">Day</option>
                        <option value="week">Week</option>
                        <option value="month">Month</option>
                        <option value="year">Year</option>
                    </select>
                </div>
            </div>
        </fieldset>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Job Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description" name="description" value={formData.description} onChange={handleChange} required rows={5}
            className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Detailed description of the job role..."
          ></textarea>
        </div>

        {/* Responsibilities */}
        <div>
          <label htmlFor="responsibilities" className="block text-sm font-medium text-gray-700">
            Key Responsibilities (Enter each on a new line or separated by commas) <span className="text-red-500">*</span>
          </label>
          <textarea
            id="responsibilities" name="responsibilities" value={formData.responsibilities} onChange={handleChange} required rows={4}
            className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="e.g., Develop new features, Collaborate with team, Write unit tests"
          ></textarea>
        </div>

        {/* Required Education */}
        <div>
          <label htmlFor="requiredEducation" className="block text-sm font-medium text-gray-700">
            Required Education <span className="text-red-500">*</span>
          </label>
          <input
            type="text" id="requiredEducation" name="requiredEducation" value={formData.requiredEducation} onChange={handleChange} required
            className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="e.g., Bachelor's Degree in CS, High School Diploma"
          />
        </div>

        {/* Required Skills */}
        <div>
          <label htmlFor="requiredSkills" className="block text-sm font-medium text-gray-700">
            Required Skills (Comma-separated) <span className="text-red-500">*</span>
          </label>
          <input
            type="text" id="requiredSkills" name="requiredSkills" value={formData.requiredSkills} onChange={handleChange} required
            className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="e.g., JavaScript, React, Communication, Teamwork"
          />
        </div>

        {/* Contact Details */}
        <fieldset className="border p-4 rounded-md">
            <legend className="text-sm font-medium text-gray-700 px-1">Contact Details <span className="text-red-500">*</span> (for applications)</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                    <label htmlFor="contactEmail" className="block text-xs font-medium text-gray-600">Contact Email</label>
                    <input type="email" id="contactEmail" name="contactEmail" value={formData.contactEmail} onChange={handleChange} required
                           className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
                </div>
                <div>
                    <label htmlFor="contactPhone" className="block text-xs font-medium text-gray-600">Contact Phone (Optional)</label>
                    <input type="tel" id="contactPhone" name="contactPhone" value={formData.contactPhone} onChange={handleChange}
                           className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
                </div>
            </div>
        </fieldset>

        {/* Optional Fields */}
        <h2 className="text-lg font-semibold text-gray-700 pt-4 border-t mt-6">Optional Details</h2>

        {/* Tags */}
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
            Tags (Comma-separated, e.g., remote, entry-level)
          </label>
          <input
            type="text" id="tags" name="tags" value={formData.tags} onChange={handleChange}
            className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Perks */}
        <div>
          <label htmlFor="perks" className="block text-sm font-medium text-gray-700">
            Perks/Benefits (Comma-separated)
          </label>
          <input
            type="text" id="perks" name="perks" value={formData.perks} onChange={handleChange}
            className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="e.g., Flexible hours, Health insurance, Free snacks"
          />
        </div>

        {/* Application Deadline */}
        <div>
          <label htmlFor="applicationDeadline" className="block text-sm font-medium text-gray-700">
            Application Deadline (Optional)
          </label>
          <input
            type="date" id="applicationDeadline" name="applicationDeadline" value={formData.applicationDeadline} onChange={handleChange}
            className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Number of Openings */}
        <div>
          <label htmlFor="numberOfOpenings" className="block text-sm font-medium text-gray-700">
            Number of Openings (Optional)
          </label>
          <input
            type="number" id="numberOfOpenings" name="numberOfOpenings" value={formData.numberOfOpenings} onChange={handleChange} min="1"
            className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Submit Button */}
        

        {/* Submit Button - Text changes based on mode */}
        <div className="mt-8 pt-6 border-t">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition ease-in-out duration-150"
          >
            {loading ? (isEditMode ? "Updating Job..." : "Posting Job...") : (isEditMode ? "Save Changes" : "Post Job")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobPostingPage;