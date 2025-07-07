import { CosmosClient, Container, Database, PartitionKeyDefinition, PartitionKeyKind } from "@azure/cosmos";
import config from "./config";

// Initialize Cosmos Client
const client = new CosmosClient({
  endpoint: config.endpoint,
  key: config.key,
});

const databaseId: string = config.database.id;
const database: Database = client.database(databaseId);

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

// Function to retrieve user-specific data by email
export async function getUserData(email: string): Promise<any[]> {
  if (!email) {
    throw new Error("Email is required to retrieve user-specific data!");
  }

  try {
    const container = await getHousingPropertyContainer();

    const querySpec = {
      query: "SELECT * FROM c WHERE c.email = @email",
      parameters: [{ name: "@email", value: email }],
    };

    const { resources } = await container.items.query(querySpec).fetchAll();
    console.log(`User data retrieved for email '${email}':`, resources);

    return resources;
  } catch (error) {
    console.error(`Error retrieving user data for email '${email}':`, error);
    throw new Error("Failed to retrieve user data");
  }
}

// Function to create a new property listing for a user
export async function createPropertyListing(email: string, propertyData: any): Promise<any> {
  try {
    const container = await getHousingPropertyContainer();

    const propertyId = `property-${Date.now()}`;
    const propertyDocument = {
      id: propertyId,
      type: "property",
      email, // Partition key
      ...propertyData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const { resource } = await container.items.create(propertyDocument);
    console.log("Property listing created successfully:", resource);

    return resource;
  } catch (error) {
    console.error("Error creating property listing:", error);
    throw new Error("Failed to create property listing");
  }
}

// Function to retrieve all properties for a specific user
export async function getUserProperties(email: string): Promise<any[]> {
  try {
    const container = await getHousingPropertyContainer();

    const querySpec = {
      query: "SELECT * FROM c WHERE c.email = @email", // Removed 'type' filter
      parameters: [{ name: "@email", value: email }],
    };

    const { resources } = await container.items.query(querySpec).fetchAll();
    console.log(`Properties retrieved for email '${email}':`, resources); // Debugging log
    return resources;
  } catch (error) {
    console.error("Error retrieving user properties:", error);
    throw new Error("Failed to retrieve user properties");
  }
}


// Function to update a specific property
export async function updatePropertyListing(propertyId: string, email: string, updateData: any): Promise<any> {
  try {
    const container = await getHousingPropertyContainer();
    
    const { resource: existingProperty } = await container.item(propertyId).read();

    if (existingProperty.email !== email) {
      throw new Error("Unauthorized to update this property");
    }

    const updatedProperty = {
      ...existingProperty,
      ...updateData,
      updatedAt: new Date().toISOString(),
    };

    const { resource } = await container.item(propertyId).replace(updatedProperty);
    console.log("Property updated successfully:", resource);

    return resource;
  } catch (error) {
    console.error("Error updating property:", error);
    throw new Error("Failed to update property");
  }
}

// Function to delete a specific property
export async function deletePropertyListing(propertyId: string, email: string): Promise<void> {
  try {
    const container = await getHousingPropertyContainer();

    const { resource: property } = await container.item(propertyId).read();

    if (property.email !== email) {
      throw new Error("Unauthorized to delete this property");
    }

    await container.item(propertyId).delete();
    console.log("Property deleted successfully");
  } catch (error) {
    console.error("Error deleting property:", error);
    throw new Error("Failed to delete property");
  }
}

// Function to setup the database and predefined containers
export async function setupDatabaseAndContainer(): Promise<void> {
  try {
    await client.databases.createIfNotExists({ id: databaseId });
    console.log("Database is ready.");

    const housingPropertyContainer = await getHousingPropertyContainer();
    console.log(`Container '${housingPropertyContainer.id}' is ready.`);

    const containerNames: string[] = ["Users"];
    for (const containerName of containerNames) {
      try {
        await createContainerIfNotExists(containerName);
        console.log(`Container '${containerName}' is ready.`);
      } catch (error) {
        console.error(`Failed to create container '${containerName}':`, error);
      }
    }
  } catch (error) {
    console.error("Error setting up database:", error);
    throw new Error("Database setup failed");
  }
}

// Generic function to get a container by name
export async function getContainer(containerName: string): Promise<Container> {
  if (!containerName) {
    throw new Error("Container name is required!");
  }

  try {
    const container = database.container(containerName);
    return container;
  } catch (error) {
    console.error(`Error getting container '${containerName}':`, error);
    throw new Error(`Failed to retrieve container '${containerName}'`);
  }
}

// Generic function to create a container if it doesn't exist
export async function createContainerIfNotExists(containerName: string): Promise<Container> {
  if (!containerName) {
    throw new Error("Container name is required!");
  }

  try {
    const partitionKey: PartitionKeyDefinition = {
      paths: ["/email"],
      kind: PartitionKeyKind.Hash,
    };

    const { container } = await database.containers.createIfNotExists({
      id: containerName,
      partitionKey,
    });

    return container;
  } catch (error) {
    console.error(`Failed to create or access container '${containerName}':`, error);
    throw new Error(`Failed to ensure container '${containerName}' exists`);
  }
}
