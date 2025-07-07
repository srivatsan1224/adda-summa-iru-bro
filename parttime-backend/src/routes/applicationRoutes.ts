// src/routes/applicationRoutes.ts
import express from "express";
import { applyForJob } from "../controllers/applicationController";
// import { getJobApplications } from "../controllers/applicationController"; // Optional
// import { authenticateToken, authorizeJobPoster } from "../middlewares/authMiddleware"; // Example if auth was here

const router = express.Router();

// Apply for a specific job
// Client needs to pass job's location as a query parameter: ?jobLocation=<location_value>
router.post("/:jobId/apply", applyForJob);

// Optional: Get all applications for a specific job (would need authentication/authorization)
// router.get("/:jobId/applications", authenticateToken, authorizeJobPoster, getJobApplications);


export default router;