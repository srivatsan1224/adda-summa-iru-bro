import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "./FormContext";
import { toast } from "react-toastify";
import { ChevronLeft, Upload, Check} from "lucide-react";
import { BlobServiceClient } from "@azure/storage-blob"; // Azure SDK
import "react-toastify/dist/ReactToastify.css";

// ✅ Azure Storage Configuration
const AZURE_STORAGE_ACCOUNT = "roshan"; // Example: "mystorageaccount"
const CONTAINER_NAME = "uploads"; // Example: "uploads"
const SAS_TOKEN = "sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2025-04-02T18:19:43Z&st=2025-02-08T10:19:43Z&spr=https&sig=4%2BMge9lZm1bQP7Zksl%2FgOsbL7oYNrXBiTkGOFlDJ0EY%3D";

const Gallery: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!formData.gallery) {
      updateFormData("gallery", { photos: [], startTime: "", endTime: "", availableAllDay: false });
    }
  }, [formData.gallery, updateFormData]);

  // ✅ Function to upload images to Azure Blob Storage
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const uploadedPhotos: string[] = [];
    const files = Array.from(e.target.files);

    setIsUploading(true);
    toast.info("Uploading photos to Azure...");

    try {
      // ✅ Create Blob Service Client
      const blobServiceClient = new BlobServiceClient(
        `https://${AZURE_STORAGE_ACCOUNT}.blob.core.windows.net?${SAS_TOKEN}`
      );

      // ✅ Get container reference
      const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);

      for (const file of files) {
        try {
          // ✅ Create a unique blob (file reference)
          const blobClient = containerClient.getBlockBlobClient(file.name);

          // ✅ Upload options
          const options = { blobHTTPHeaders: { blobContentType: file.type } };

          // ✅ Upload file to Azure Blob Storage
          await blobClient.uploadBrowserData(file, options);

          // ✅ Store the uploaded image URL
          uploadedPhotos.push(blobClient.url);
        } catch (error) {
          console.error("Photo upload failed:", error);
          toast.error(`Failed to upload ${file.name}`);
        }
      }

      // ✅ Update formData with new image URLs
      updateFormData("gallery", {
        ...formData.gallery,
        photos: [...(formData.gallery?.photos || []), ...uploadedPhotos],
      });

      toast.success("Photos uploaded successfully!");
    } catch (error) {
      console.error("Azure upload error:", error);
      toast.error("Failed to upload photos.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    toast.info("Submitting your form, please wait...");

    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      if (!user || !user.email) {
        throw new Error("User information not found. Please log in again.");
      }

      const formDataWithEmail = {
        ...formData,
        email: user.email,
      };

      const response = await fetch("http://localhost:3000/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataWithEmail),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to submit form data: ${errorMessage}`);
      }

      toast.success("Form data submitted successfully!");
      navigate("/propertydashboard");
    } catch (error: any) {
      console.error("Error submitting form data:", error);
      toast.error(error.message || "An unknown error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const navigationSteps = [
    "Property Details",
    "Locality Details",
    "Rental Details",
    "Amenities",
    "Gallery",
    "Schedule",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Progress Bar */}
          <div className="p-6 border-b border-teal-100">
            <div className="flex items-center">
              <button 
                onClick={() => navigate(-1)}
                className="flex items-center text-teal-700 hover:text-teal-800 font-medium"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                Back
              </button>
              <div className="flex-grow mx-6">
                <div className="h-2 bg-teal-100 rounded-full">
                  <div 
                    className="h-full bg-teal-600 rounded-full transition-all duration-300" 
                    style={{ width: "90%" }}
                  ></div>
                </div>
              </div>
              <span className="text-sm font-medium text-teal-700">5 of 6 completed</span>
            </div>
          </div>

          <div className="flex">
            {/* Navigation Sidebar */}
            <div className="w-64 bg-teal-50 p-6">
              <nav>
                <ul className="space-y-4">
                  {navigationSteps.map((step) => (
                    <li
                      key={step}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        step === "Gallery"
                          ? "bg-teal-600 text-white font-semibold"
                          : "text-teal-700 hover:bg-teal-100"
                      }`}
                    >
                      {step}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
              <div className="max-w-3xl mx-auto">
                <div className="bg-teal-50 rounded-2xl p-8 mb-8">
                  <h2 className="text-xl font-bold text-teal-900 mb-2">Gallery</h2>
                  <p className="text-teal-700 mb-6">
                    Add photos to get 5X more responses. 90% tenants contact on properties with photos.
                  </p>
                  <label className="relative inline-block">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handlePhotoUpload}
                      className="hidden"
                      disabled={isUploading}
                    />
                    <span className="inline-flex items-center px-6 py-3 bg-white border border-teal-200 rounded-xl hover:bg-teal-50 cursor-pointer transition-colors">
                      <Upload className="w-5 h-5 text-teal-600 mr-2" />
                      <span className="text-teal-700 font-medium">
                        {isUploading ? "Uploading..." : "Upload Photos"}
                      </span>
                    </span>
                  </label>
                </div>

                {/* Photo Grid */}
                {formData.gallery?.photos.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {formData.gallery.photos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={photo}
                          alt={`Property ${index + 1}`}
                          className="w-full h-32 object-cover rounded-xl"
                        />
                        <div className="absolute inset-0 bg-teal-900/60 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Check className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || isUploading}
                  className="w-full px-6 py-3 rounded-xl text-white font-medium shadow-lg bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800"
                >
                  {isSubmitting ? "Submitting..." : "Submit Property"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
