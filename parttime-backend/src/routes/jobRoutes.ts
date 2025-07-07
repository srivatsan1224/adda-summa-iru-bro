import express from "express";
import { createJob, getJobs, getJobById, deleteJobById, updateJobById} from "../controllers/jobController";
import { validateJob } from "../middlewares/validateJob";

const router = express.Router();

// Create a job
router.post("/", validateJob, createJob);

// Retrieve jobs (with pagination and filtering)
router.get("/", getJobs);
router.get("/:id", getJobById);
router.delete("/:id", deleteJobById);
router.put("/:id", updateJobById);
export default router;
