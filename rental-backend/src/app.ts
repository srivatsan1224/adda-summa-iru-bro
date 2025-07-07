// src/app.ts
import * as express from "express";
import * as cors from "cors";
import config from "./config";
import { globalErrorHandler, NotFoundError } from "./utils/errorHandler";

// Import Routes
import categoryRoutes from "./routes/categoryRoutes";
import itemRoutes from "./routes/itemRoutes";
import cartRoutes from "./routes/cartRoutes";
import rentalRoutes from "./routes/rentalRoutes"; // Keep or remove based on previous decision
import orderRoutes from "./routes/orderRoutes";   // <--- ADD THIS

const app = express();

const allowedOrigins = [
  "http://localhost:5174", // ✅ Local development
  "http://localhost:3000", // ✅ If your frontend runs on port 3000
  "https://bachelors-web.vercel.app", // ✅ Hosted frontend
  "https://bachelors-preview.vercel.app"
];
// CORS Middleware

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || config.corsAllowedOrigins.includes(origin) || config.nodeEnv === 'development') {
        callback(null, true);
      } else {
        console.warn(`CORS Blocked Request from: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"], // X-Mock-User-ID removed as we use default mock user
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/categories", categoryRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/rentals", rentalRoutes); // If still in use
app.use("/api/orders", orderRoutes);     // <--- ADD THIS

app.all("*", (req, _res, next) => {
  next(new NotFoundError(`Can't find ${req.originalUrl} on this server!`));
});

app.use(globalErrorHandler);

export default app;