import express, { Request, Response, Router } from "express";
import { getContainer } from "../utils/dbClient";

const router: Router = express.Router();

// Job interface
interface Job {
  id?: string;
  title: string;
  description: string;
  companyName: string;
  location: string;
  jobType: string;
  salary?: string;
  requirements?: string[];
  benefits?: string[];
  contactEmail: string;
  contactPhone?: string;
  status: string;
  postedDate: string;
  views: number;
}

// Validation middleware for job creation
const validateJob = (req: Request, res: Response, next: any): void => {
  const { title, description, companyName, location, jobType, contactEmail } = req.body;

  if (!title || !description || !companyName || !location || !jobType || !contactEmail) {
    res.status(400).json({
      message: "Missing required fields: title, description, companyName, location, jobType, contactEmail",
    });
    return;
  }

  next();
};

// Create a job
router.post("/", validateJob, async (req: Request, res: Response): Promise<void> => {
  try {
    const jobData: Job = req.body;

    // Set default values
    jobData.status = "active";
    jobData.postedDate = new Date().toISOString();
    jobData.views = 0;

    const container = await getContainer("Jobs", "/location");
    const { resource: createdJob } = await container.items.create(jobData);

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
});

// Retrieve jobs with pagination and filtering
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const locationFilter = req.query.location as string | undefined;
    const jobType = req.query.jobType as string | undefined;
    const companyName = req.query.companyName as string | undefined;
    const search = req.query.search as string | undefined;

    const container = await getContainer("Jobs", "/location");
    
    const querySpec: any = {
      query: "SELECT * FROM c WHERE 1=1",
      parameters: [],
    };

    // Add filters to the query
    if (locationFilter) {
      querySpec.query += ` AND CONTAINS(c.location, @location, true)`;
      querySpec.parameters.push({ name: "@location", value: locationFilter });
    }
    if (jobType) {
      querySpec.query += ` AND c.jobType = @jobType`;
      querySpec.parameters.push({ name: "@jobType", value: jobType });
    }
    if (companyName) {
      querySpec.query += ` AND c.companyName = @companyName`;
      querySpec.parameters.push({ name: "@companyName", value: companyName });
    }

    // Add search functionality
    if (search) {
      querySpec.query += ` AND CONTAINS(c.title, @search, true)`;
      querySpec.parameters.push({ name: "@search", value: search });
    }

    // Add pagination
    querySpec.query += ` OFFSET @offset LIMIT @limit`;
    querySpec.parameters.push(
      { name: "@offset", value: (page - 1) * limit },
      { name: "@limit", value: limit }
    );

    const { resources: jobs } = await container.items.query(querySpec).fetchAll();

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
});

// Get job by ID
router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { location } = req.query;

    if (!id || !location) {
      res.status(400).json({
        message: "Job ID and location (partition key) are required.",
      });
      return;
    }

    const container = await getContainer("Jobs", "/location");
    const { resource: job } = await container.item(id, location as string).read();

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
});

// Delete job by ID
router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { location } = req.query;

    if (!id || !location) {
      res.status(400).json({
        message: "Job ID and location (partition key) are required for deletion.",
      });
      return;
    }

    const container = await getContainer("Jobs", "/location");
    
    try {
      await container.item(id, location as string).delete();
      res.status(200).json({ message: "Job deleted successfully." });
    } catch (deleteError: any) {
      res.status(404).json({ message: "Job not found or failed to delete." });
    }
  } catch (error) {
    console.error("Error in deleteJobById:", error);
    res.status(500).json({
      message: "Failed to delete job",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
});

// Update job by ID
router.put("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { currentLocation } = req.query;
    const updatedData: Partial<Job> = req.body;

    if (!id || !currentLocation) {
      res.status(400).json({
        message: "Job ID and currentLocation (partition key) are required for update.",
      });
      return;
    }

    if (updatedData.location && updatedData.location !== (currentLocation as string)) {
      console.warn(`Attempting to change location (partition key value) from "${currentLocation}" to "${updatedData.location}" via update.`);
    }

    const container = await getContainer("Jobs", "/location");
    
    try {
      const { resource: existingJob } = await container.item(id, currentLocation as string).read();

      if (!existingJob) {
        res.status(404).json({ message: "Job not found." });
        return;
      }

      const updatedJob = { ...existingJob, ...updatedData };
      const { resource: result } = await container.item(id, currentLocation as string).replace(updatedJob);

      res.status(200).json({
        message: "Job updated successfully.",
        data: result,
      });
    } catch (updateError: any) {
      res.status(404).json({ message: "Job not found or failed to update." });
    }
  } catch (error) {
    console.error("Error in updateJobById:", error);
    res.status(500).json({
      message: "Failed to update job",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
});

export default router;

