import express, { Request, Response, Router } from "express";
import { getContainer } from "../utils/dbClient";

const router: Router = express.Router();

// Application interface
interface Application {
  id?: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  jobPosterEmail: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  resumeUrl?: string;
  coverLetterNotes?: string;
  applicationDate: string;
  status: string;
}

// Apply for a specific job
router.post("/:jobId/apply", async (req: Request, res: Response): Promise<void> => {
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

    // Basic email validation
    if (!/\S+@\S+\.\S+/.test(applicantEmail)) {
      res.status(400).json({ message: "Invalid applicant email format." });
      return;
    }

    // Get job details first
    const jobContainer = await getContainer("Jobs", "/location");
    
    try {
      const { resource: job } = await jobContainer.item(jobId, jobLocation as string).read();
      
      if (!job) {
        res.status(404).json({ message: "Job not found." });
        return;
      }

      if (!job.contactEmail) {
        res.status(400).json({ message: "Job poster contact email missing." });
        return;
      }

      // Create application
      const applicationContainer = await getContainer("Applications", "/applicantEmail");
      
      const applicationData: Application = {
        jobId,
        jobTitle: job.title,
        companyName: job.companyName,
        jobPosterEmail: job.contactEmail,
        applicantName,
        applicantEmail,
        applicantPhone,
        resumeUrl,
        coverLetterNotes,
        applicationDate: new Date().toISOString(),
        status: "submitted"
      };

      const { resource: application } = await applicationContainer.items.create(applicationData);

      res.status(201).json({
        message: "Application submitted successfully.",
        data: application,
      });
    } catch (jobError: any) {
      res.status(404).json({ message: "Job not found." });
    }
  } catch (error) {
    console.error("Error in applyForJob controller:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    res.status(500).json({ message: "Failed to submit application", error: errorMessage });
  }
});

export default router;

