// src/config.ts
import dotenv from "dotenv";
dotenv.config(); // Ensure this is at the top to load .env variables

export const config = {
  port: process.env.PORT,
  cosmos: {
    endpoint: process.env.COSMOS_ENDPOINT,
    key: process.env.COSMOS_KEY,
    databaseId: process.env.COSMOS_DATABASE_ID,
    jobContainerId: process.env.COSMOS_CONTAINER_ID, // Maps to CONTAINER_ID from .env
    applicationContainerId: process.env.APPLICATION_CONTAINER_ID,
  },
  email: {
    apiKey: process.env.EMAIL_SERVICE_API_KEY,
    senderAddress: process.env.SENDER_EMAIL_ADDRESS,
  },
  // Add other configurations if you have them
};