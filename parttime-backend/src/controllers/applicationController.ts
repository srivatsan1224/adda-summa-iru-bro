// src/controllers/applicationController.ts
import { Request, Response } from "express";
import { submitApplication } from "../services/applicationService";

export const applyForJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const { jobId } = req.params;
    const { jobLocation } = req.query; // Job's location (partition key) needed to fetch job details
    const { applicantName, applicantEmail, applicantPhone, resumeUrl, coverLetterNotes } = req.body;

    if (!jobId || !jobLocation) {
      res.status(400).json({ message: "Job ID and jobLocation (query param) are required." });
      return;
    }

    if (!applicantName || !applicantEmail || !applicantPhone) {
      res.status(400).json({ message: "Applicant name, email, and phone are required." });
      return;
    }

    // Basic email validation (can be more robust)
    if (!/\S+@\S+\.\S+/.test(applicantEmail)) {
        res.status(400).json({ message: "Invalid applicant email format." });
        return;
    }

    const application = await submitApplication(jobId, jobLocation as string, {
      applicantName,
      applicantEmail,
      applicantPhone,
      resumeUrl,
      coverLetterNotes
    });

    if (application) {
      res.status(201).json({
        message: "Application submitted successfully.",
        data: application,
      });
    } else {
      // This case should ideally be caught by specific errors in the service
      res.status(500).json({ message: "Failed to submit application." });
    }
  } catch (error) {
    console.error("Error in applyForJob controller:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    if (errorMessage.includes("Job not found") || errorMessage.includes("Job poster contact email missing")) {
        res.status(404).json({ message: errorMessage });
    } else {
        res.status(500).json({ message: "Failed to submit application", error: errorMessage });
    }
  }
};

// Optional: Controller to get applications for a job (requires auth to ensure only job poster sees this)
// export const getJobApplications = async (req: Request, res: Response): Promise<void> => {
//   // ... similar structure, call getApplicationsForJob service ...
//   // ... MUST implement authorization here ...
// };