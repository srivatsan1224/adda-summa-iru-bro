import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { setupDatabaseAndContainer } from "./db";
import userRoutes from "./routes/userRoutes";
import dynamicRoutes from "./routes/api";
import dotenv from "dotenv";
import eventRoutes from "./routes/eventRoutes";;
dotenv.config();

import productRoutes from "./routes/productRoutes";

const app: Application = express();
const port: number = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Debug Middleware
app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.path}`);
    next();
});

// Routes
app.use("/user", userRoutes);
app.use("/api", (req, res, next) => {
    console.log(`API route accessed: ${req.method} ${req.path}`);
    next();
});
app.use("/api", dynamicRoutes);
app.use("/events",eventRoutes);
app.use("/products", productRoutes);
// Start Server
async function startServer(): Promise<void> {
    try {
        console.log("Initializing server...");
        await setupDatabaseAndContainer();
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
    }
}

startServer();