// src/services/applicationService.ts
import { applicationContainer } from "../utils/dbClient";
import { Job } from "../models/jobModel"; // To get job details
import { Application } from "../models/applicationModel";
import { sendEmail } from "../utils/emailService";
import { getJobFromDatabaseById } from "./jobService"; // Reuse job service

interface ApplicationData {
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  resumeUrl?: string;
  coverLetterNotes?: string;
}

export const submitApplication = async (
  jobId: string,
  jobPartitionKey: string, // This is job's location, used to fetch job details
  applicationData: ApplicationData
): Promise<Application | null> => {
  try {
    // 1. Fetch the job details to get poster's email, job title etc.
    const job = await getJobFromDatabaseById(jobId, jobPartitionKey);
    if (!job) {
      console.error(`Job with ID ${jobId} and location ${jobPartitionKey} not found.`);
      throw new Error("Job not found.");
    }

    if (!job.contactDetails?.email) {
      console.error(`Job poster email not found for job ID ${jobId}. Cannot send notification.`);
      throw new Error("Job poster contact email missing.");
    }

    const newApplication: Application = {
      jobId: job.id!,
      jobTitle: job.title,
      jobLocation: job.location, // This will be the partition key for the application item
      companyName: job.companyName,
      applicantName: applicationData.applicantName,
      applicantEmail: applicationData.applicantEmail,
      applicantPhone: applicationData.applicantPhone,
      resumeUrl: applicationData.resumeUrl,
      coverLetterNotes: applicationData.coverLetterNotes,
      posterEmail: job.contactDetails.email,
      applicationDate: new Date().toISOString(),
      status: "Submitted",
    };

    // 2. Save the application to the database
    const { resource: createdApplication } = await applicationContainer.items.create(newApplication);
    if (!createdApplication) {
      throw new Error("Failed to create application in the database.");
    }

    // 3. Send email notification to the job poster
    const emailSent = await sendEmail({
      to: job.contactDetails.email,
      subject: `New Application for "${job.title}" at ${job.companyName}`,
      textBody: `
        Hello,

        You have received a new application for your job posting: "${job.title}".

        Applicant Details:
        Name: ${createdApplication.applicantName}
        Email: ${createdApplication.applicantEmail}
        Phone: ${createdApplication.applicantPhone}
        ${createdApplication.resumeUrl ? `Resume: ${createdApplication.resumeUrl}` : ''}
        ${createdApplication.coverLetterNotes ? `Notes: ${createdApplication.coverLetterNotes}` : ''}

        Application Date: ${new Date(createdApplication.applicationDate).toLocaleString()}

        Regards,
        PartTime Job Portal
      `,
      // htmlBody: `<h1>New Application</h1><p>...</p>` // Optional HTML version
    });

    if (!emailSent) {
      // Log this, but don't fail the application submission if email fails.
      // Could implement a retry mechanism or flag for manual follow-up.
      console.warn(`Application ${createdApplication.id} submitted, but email notification to ${job.contactDetails.email} failed.`);
    }

    return createdApplication as Application;

  } catch (error) {
    console.error("Error in submitApplication service:", error);
    throw error; // Re-throw for the controller to handle
  }
};

// Optional: Service to get applications for a specific job (for job poster)
// export const getApplicationsForJob = async (jobId: string, jobLocation: string): Promise<Application[]> => {
//   try {
//     const querySpec = {
//       query: "SELECT * FROM c WHERE c.jobId = @jobId AND c.jobLocation = @jobLocation ORDER BY c.applicationDate DESC",
//       parameters: [
//         { name: "@jobId", value: jobId },
//         { name: "@jobLocation", value: jobLocation } // Query by partition key
//       ],
//     };
//     const { resources } = await applicationContainer.items.query(querySpec).fetchAll();
//     return resources;
//   } catch (error) {
//     console.error("Error fetching applications:", error);
//     throw error;
//   }
// };