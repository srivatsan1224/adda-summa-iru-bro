// src/utils/dbClient.ts
import { CosmosClient, Database, Container } from "@azure/cosmos";
import { config } from "../config";

const { endpoint, key, databaseId, jobContainerId, applicationContainerId } = config.cosmos;

if (!endpoint || !key || !databaseId || !jobContainerId || !applicationContainerId) { // Added applicationContainerId check
  console.error(
    "Missing Cosmos DB configuration (endpoint, key, databaseId, jobContainerId, or applicationContainerId) in environment variables."
  );
  process.exit(1);
}

const client = new CosmosClient({ endpoint, key });
const databaseInstance: Database = client.database(databaseId); // Renamed for clarity
const jobContainerInstance: Container = databaseInstance.container(jobContainerId); // Renamed for clarity
const applicationContainerInstance: Container = databaseInstance.container(applicationContainerId); // NEW

(async () => {
  try {
    await client.getDatabaseAccount();
    // Optional: You could add checks here to ensure both containers exist
    console.log(`Connected to Cosmos DB: Database - ${databaseId}`);
    console.log(`Job Container: ${jobContainerId}, Application Container: ${applicationContainerId}`);
  } catch (error) {
    console.error("Failed to connect to Cosmos DB or initialize containers:", error);
    process.exit(1);
  }
})();

export {
  client,
  databaseInstance as database, // Export with original name if preferred
  jobContainerInstance as jobContainer, // Export for jobService
  applicationContainerInstance as applicationContainer, // NEW - Export for applicationService
};