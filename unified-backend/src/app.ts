import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { setupDatabaseAndContainer } from "./utils/dbClient";
import serverConfig from "./config/server";

// Import routes
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import eventRoutes from "./routes/eventRoutes";
import foodRoutes from "./routes/foodRoutes";
import jobRoutes from "./routes/jobRoutes";
import applicationRoutes from "./routes/applicationRoutes";
import rentalRoutes from "./routes/rentalRoutes";

dotenv.config();

const app: Application = express();
const port: number = serverConfig.port;

// Middleware
app.use(cors({
  origin: serverConfig.corsAllowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Debug Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

// Health check route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ 
    message: "Unified Backend API is running!",
    timestamp: new Date().toISOString(),
    environment: serverConfig.nodeEnv
  });
});

// API Routes - Mount all routes under /api
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/rentals", rentalRoutes);

// Legacy route support for backward compatibility
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/events", eventRoutes);

// Error handling middleware
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", error);
  res.status(error.status || 500).json({
    message: error.message || "Internal server error",
    ...(serverConfig.nodeEnv === 'development' && { stack: error.stack })
  });
});

// 404 handler
app.use("*", (req: Request, res: Response) => {
  res.status(404).json({
    message: `Route ${req.originalUrl} not found`,
    availableRoutes: [
      "/api/users",
      "/api/products", 
      "/api/events",
      "/api/food",
      "/api/jobs",
      "/api/applications",
      "/api/rentals"
    ]
  });
});

// Initialize database and start server
const startServer = async () => {
  try {
    console.log("Setting up database and containers...");
    await setupDatabaseAndContainer();
    console.log("Database setup completed successfully!");

    app.listen(port, "0.0.0.0", () => {
      console.log(`🚀 Unified Backend Server running on port ${port} in ${serverConfig.nodeEnv} mode`);
      console.log(`🔗 Allowed CORS origins: ${serverConfig.corsAllowedOrigins.join(', ')}`);
      console.log(`📍 Health check: http://localhost:${port}/`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Handle graceful shutdown
const signals: NodeJS.Signals[] = ["SIGINT", "SIGTERM"];
signals.forEach((signal) => {
  process.on(signal, () => {
    console.log(`\n${signal} received. Shutting down gracefully...`);
    process.exit(0);
  });
});

// Start the server
startServer();

export default app;

