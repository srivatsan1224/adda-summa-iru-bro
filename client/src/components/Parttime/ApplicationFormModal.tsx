// src/components/Parttime/ApplicationFormModal.tsx
import React, { useState, useEffect } from "react";
import parttimeApiService from "../../services/parttimeApiService"; // Your API service
import { X } from "lucide-react"; // For close button

interface ApplicationFormModalProps {
  jobId: string;
  jobLocation: string; // Partition key for the job
  jobTitle: string;
  companyName: string;
  isOpen: boolean;
  onClose: () => void;
  onApplicationSuccess: () => void; // Callback for successful application
}

const ApplicationFormModal: React.FC<ApplicationFormModalProps> = ({
  jobId,
  jobLocation,
  jobTitle,
  companyName,
  isOpen,
  onClose,
  onApplicationSuccess,
}) => {
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [resumeUrl, setResumeUrl] = useState(""); // Optional
  const [coverLetterNotes, setCoverLetterNotes] = useState(""); // Optional

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Reset form when modal is reopened or job changes
  useEffect(() => {
    if (isOpen) {
      setApplicantName("");
      setApplicantEmail("");
      setApplicantPhone("");
      setResumeUrl("");
      setCoverLetterNotes("");
      setError(null);
      setSuccess(null);
      setLoading(false);
    }
  }, [isOpen, jobId]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!applicantName || !applicantEmail || !applicantPhone) {
      setError("Name, Email, and Phone Number are required.");
      setLoading(false);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(applicantEmail)) {
        setError("Please enter a valid email address.");
        setLoading(false);
        return;
    }

    const applicationData = {
      applicantName,
      applicantEmail,
      applicantPhone,
      resumeUrl: resumeUrl || undefined, // Send undefined if empty
      coverLetterNotes: coverLetterNotes || undefined, // Send undefined if empty
    };

    try {
      // API endpoint: /api/jobs/:jobId/apply?jobLocation=<location_value>
      await parttimeApiService.post(
        `/jobs/${jobId}/apply?jobLocation=${encodeURIComponent(jobLocation)}`,
        applicationData
      );
      setSuccess(`Successfully applied for "${jobTitle}" at ${companyName}! The company will contact you if interested.`);
      onApplicationSuccess(); // Call success callback
      // Optionally clear form fields, but useEffect above does it on reopen.
      // setLoading(false); // No need as we might close the modal
      // setTimeout(onClose, 3000); // Auto close after success
    } catch (err: any) {
      console.error("Error submitting application:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to submit application. Please try again.");
      setLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 transition-opacity duration-300 ease-in-out">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Apply for: {jobTitle}</h2>
            <p className="text-sm text-gray-500">at {companyName}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded-md text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 border border-green-300 rounded-md text-sm">
            {success}
            <button onClick={onClose} className="ml-4 text-sm font-semibold text-green-800 hover:underline">Close</button>
          </div>
        )}

        {!success && ( // Only show form if not successful yet
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="applicantName" className="block text-sm font-medium text-gray-700">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text" id="applicantName" value={applicantName} onChange={(e) => setApplicantName(e.target.value)}
                required
                className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="applicantEmail" className="block text-sm font-medium text-gray-700">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email" id="applicantEmail" value={applicantEmail} onChange={(e) => setApplicantEmail(e.target.value)}
                required
                className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="applicantPhone" className="block text-sm font-medium text-gray-700">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel" id="applicantPhone" value={applicantPhone} onChange={(e) => setApplicantPhone(e.target.value)}
                required
                className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="resumeUrl" className="block text-sm font-medium text-gray-700">
                Resume URL (Optional - e.g., LinkedIn, Google Drive link)
              </label>
              <input
                type="url" id="resumeUrl" value={resumeUrl} onChange={(e) => setResumeUrl(e.target.value)}
                className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="https://linkedin.com/in/yourprofile or https://drive.google.com/..."
              />
            </div>
            <div>
              <label htmlFor="coverLetterNotes" className="block text-sm font-medium text-gray-700">
                Cover Letter / Additional Notes (Optional)
              </label>
              <textarea
                id="coverLetterNotes" value={coverLetterNotes} onChange={(e) => setCoverLetterNotes(e.target.value)}
                rows={4}
                className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Briefly tell us why you're a good fit or add any notes..."
              ></textarea>
            </div>
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition ease-in-out duration-150"
              >
                {loading ? "Submitting Application..." : "Submit Application"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ApplicationFormModal;