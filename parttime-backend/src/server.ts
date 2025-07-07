// src/app.ts
import express from "express";
import { config } from "./config";
import jobRoutes from "./routes/jobRoutes";
import applicationRoutes from "./routes/applicationRoutes"; // NEW
import "./utils/dbClient"; // Ensure DB connection is initialized
import cors from "cors";
// import errorHandler from "./middlewares/errorHandler"; // Example for global error handler

const app = express();
const port = config.port || 3002;

app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Routes
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes); // NEW - Mounted under /api/applications, but routes inside use /:jobId/apply

// Health Check Route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Global Error Handler (Example - should be defined in its own file)
// app.use(errorHandler);

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Job container: ${config.cosmos.jobContainerId}, App container: ${config.cosmos.applicationContainerId}`);
});