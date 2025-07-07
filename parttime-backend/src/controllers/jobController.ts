import { Request, Response } from "express";
import { Job } from "../models/jobModel";
import {
  addJobToDatabase,
  getJobsFromDatabase,
  getJobFromDatabaseById,
  deleteJobFromDatabaseById,
  updateJobInDatabaseById,
} from "../services/jobService";

// Controller to create a new job
export const createJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const jobData: Job = req.body;

    // Set default values (location is expected from req.body and validated by middleware)
    jobData.status = "active";
    jobData.postedDate = new Date().toISOString();
    jobData.views = 0;

    const createdJob = await addJobToDatabase(jobData);

    res.status(201).json({
      message: "Job created successfully",
      data: createdJob,
    });
  } catch (error) {
    console.error("Error in createJob:", error);
    res.status(500).json({
      message: "Failed to create job",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};

// Controller to retrieve jobs with pagination and filtering
export const getJobs = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const locationFilter = req.query.location as string | undefined;
    const jobType = req.query.jobType as string | undefined;
    const companyName = req.query.companyName as string | undefined;
    const search = req.query.search as string | undefined;

    const filters: { [key: string]: any } = {};
    if (locationFilter) filters.location = locationFilter; // Note: this filters by location, not uses it as a partition key for the list query
    if (jobType) filters.jobType = jobType;
    if (companyName) filters.companyName = companyName;

    const jobs = await getJobsFromDatabase({
      page,
      limit,
      filters,
      search,
    });

    res.status(200).json({
      message: "Jobs retrieved successfully",
      data: jobs,
    });
  } catch (error) {
    console.error("Error in getJobs:", error);
    res.status(500).json({
      message: "Failed to retrieve jobs",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};

// Controller to retrieve a specific job by its ID and location (partition key)
export const getJobById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { location } = req.query; // Location (partition key) is now expected from query params

    if (!id || !location) {
      res.status(400).json({
        message: "Job ID and location (partition key) are required.",
      });
      return;
    }

    const job = await getJobFromDatabaseById(id, location as string);

    if (!job) {
      res.status(404).json({ message: "Job not found." });
      return;
    }

    res.status(200).json({
      message: "Job retrieved successfully",
      data: job,
    });
  } catch (error) {
    console.error("Error in getJobById:", error);
    res.status(500).json({
      message: "Failed to retrieve job",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};

// Controller to delete a specific job by its ID and location (partition key)
export const deleteJobById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { location } = req.query; // Location (partition key) is now expected from query params

    if (!id || !location) {
      res.status(400).json({
        message: "Job ID and location (partition key) are required for deletion.",
      });
      return;
    }

    // Directly attempt to delete using the provided id and location
    const deleteResult = await deleteJobFromDatabaseById(id, location as string);

    if (!deleteResult) {
      // This could mean the job wasn't found (already deleted or wrong id/location)
      // The service returns true on successful delete, false otherwise (e.g., item not found error from SDK)
      res.status(404).json({ message: "Job not found or failed to delete." });
      return;
    }

    res.status(200).json({ message: "Job deleted successfully." });
  } catch (error) {
    console.error("Error in deleteJobById:", error);
    res.status(500).json({
      message: "Failed to delete job",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};

// Controller to update a specific job by its ID and current location (partition key)
export const updateJobById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    // 'currentLocation' is the partition key of the job to be updated.
    // 'location' within req.body would be the new location value if it's being changed.
    const { currentLocation } = req.query;
    const updatedData: Partial<Job> = req.body;

    if (!id || !currentLocation) {
      res.status(400).json({
        message: "Job ID and currentLocation (partition key) are required for update.",
      });
      return;
    }
    
    // If the client sends 'location' in the body and it differs from 'currentLocation',
    // this signifies an attempt to change the partition key value.
    // A true partition key change requires a delete and create operation.
    // The current updateJobInDatabaseById performs a 'replace' which updates the item
    // within its 'currentLocation' partition. The `location` property on the item will be updated.
    if (updatedData.location && updatedData.location !== (currentLocation as string)) {
        console.warn(`Attempting to change location (partition key value) from "${currentLocation}" to "${updatedData.location}" via update. This will update the 'location' property but not move the item to a new partition with a 'replace' operation. A delete-and-create pattern is needed for true partition key changes.`);
    }

    const updatedJob = await updateJobInDatabaseById(
      id,
      currentLocation as string,
      updatedData
    );

    if (!updatedJob) {
      res.status(404).json({ message: "Job not found or failed to update." });
      return;
    }

    res.status(200).json({
      message: "Job updated successfully.",
      data: updatedJob,
    });
  } catch (error) {
    console.error("Error in updateJobById:", error);
    res.status(500).json({
      message: "Failed to update job",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};