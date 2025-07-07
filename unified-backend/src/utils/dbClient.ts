import { CosmosClient, Container, Database, PartitionKeyDefinition, PartitionKeyKind } from "@azure/cosmos";
import config from "../config/database";

// Initialize Cosmos Client
const client = new CosmosClient({
  endpoint: config.endpoint,
  key: config.key,
});

const databaseId: string = config.database.id;
const database: Database = client.database(databaseId);

// Function to get or create a container with specified partition key
export async function getContainer(containerId: string, partitionKeyPath: string = "/id"): Promise<Container> {
  try {
    const partitionKey: PartitionKeyDefinition = {
      paths: [partitionKeyPath],
      kind: PartitionKeyKind.Hash,
    };

    const { container } = await database.containers.createIfNotExists({
      id: containerId,
      partitionKey,
    });

    return container;
  } catch (error) {
    console.error(`Error accessing or creating ${containerId} container:`, error);
    throw new Error(`Failed to ensure ${containerId} container exists`);
  }
}

// Function to get or create the main HousingProperty container
export async function getHousingPropertyContainer(): Promise<Container> {
  try {
    const partitionKey: PartitionKeyDefinition = {
      paths: ["/email"], // Using email as the partition key
      kind: PartitionKeyKind.Hash,
    };

    const { container } = await database.containers.createIfNotExists({
      id: "HousingProperty",
      partitionKey,
    });

    return container;
  } catch (error) {
    console.error("Error accessing or creating HousingProperty container:", error);
    throw new Error("Failed to ensure HousingProperty container exists");
  }
}

// Function to insert or update user-specific data within the HousingProperty container
export async function upsertUserData(email: string, data: any): Promise<void> {
  if (!email) {
    throw new Error("Email is required to manage user-specific data!");
  }

  try {
    const container = await getHousingPropertyContainer();

    const documentId = `${email}-${Date.now()}`;
    const document = {
      id: documentId,
      email, // Partition key
      ...data,
    };

    const { resource } = await container.items.upsert(document);
    console.log("User data upserted successfully:", resource);
  } catch (error) {
    console.error("Error upserting user data:", error);
    throw new Error("Failed to upsert user data");
  }
}

// Function to setup database and container (from original backend)
export async function setupDatabaseAndContainer(): Promise<void> {
  try {
    // Create database if it doesn't exist
    const { database: db } = await client.databases.createIfNotExists({
      id: databaseId,
    });
    console.log(`Database '${databaseId}' is ready.`);

    // Create containers if they don't exist
    await getContainer("Users", "/email");
    await getContainer("Products", "/id");
    await getContainer("Events", "/id");
    await getHousingPropertyContainer();
    
    console.log("All containers are ready.");
  } catch (error) {
    console.error("Error setting up database and containers:", error);
    throw error;
  }
}

export { client, database };

