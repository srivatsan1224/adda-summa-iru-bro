// src/services/cosmosService.ts
import { CosmosClient, Container } from "@azure/cosmos";
import config from "../config";
import { AppError, NotFoundError } from "../utils/errorHandler"; // Assuming NotFoundError is defined

const client = new CosmosClient({
  endpoint: config.cosmosDbEndpoint,
  key: config.cosmosDbKey,
});

const database = client.database(config.cosmosDbDatabaseId);

const getContainer = (containerId: string): Container => {
  return database.container(containerId);
};

export const CosmosService = {
  getRentalContainer: () => getContainer(config.cosmosDbRentalContainerId),
  getCartContainer: () => getContainer(config.cosmosDbCartContainerId),
  getOrdersContainer: () => getContainer(config.cosmosDbOrdersContainerId), // Ensure this method exists

  // ... getItemById, queryItems, createItem, deleteItem, updateItem (from previous versions, no changes here)
  async getItemById(container: Container, id: string, partitionKey: string) {
    try {
      const { resource } = await container.item(id, partitionKey).read();
      return resource;
    } catch (error: any) {
      if (error.code === 404) return null;
      console.error(`Error fetching item with ID ${id} and partition key ${partitionKey}:`, error.message);
      throw error;
    }
  },

  async queryItems(container: Container, querySpec: any) {
    try {
      const { resources } = await container.items.query(querySpec).fetchAll();
      return resources;
    } catch (error: any) {
      console.error("Error querying items:", error.message);
      throw error;
    }
  },

  async createItem(container: Container, newItem: any) {
    try {
      const { resource } = await container.items.create(newItem);
      return resource;
    } catch (error: any) {
      console.error("Error creating item:", error.message);
      // Consider re-throwing a specific AppError if it's a known conflict, etc.
      if (error.code === 409) { // Conflict
        throw new AppError(`Resource with ID ${newItem.id} already exists.`, 409, true);
      }
      throw error;
    }
  },

  async deleteItem(container: Container, id: string, partitionKey: string) {
    try {
      // It's good practice to ensure item exists before delete if you want a specific "not found"
      // However, .delete() itself will error (404) if item not found with correct PK.
      await container.item(id, partitionKey).delete();
    } catch (error: any) {
      if (error.code === 404) {
        throw new NotFoundError(`Item with ID ${id} and partition key ${partitionKey} not found for deletion.`);
      }
      console.error(`Error deleting item with ID ${id}:`, error.message);
      throw error;
    }
  },

  async updateItem(container: Container, id: string, partitionKey: string, itemUpdates: Partial<any>) {
    try {
        const itemToUpdate = container.item(id, partitionKey);
        const { resource: existingItem } = await itemToUpdate.read(); // Check existence
        if (!existingItem) {
            throw new NotFoundError(`Item with ID ${id} and partition key ${partitionKey} not found for update.`);
        }
        const updatedDoc = { ...existingItem, ...itemUpdates, updatedAt: new Date().toISOString() };
        const { resource } = await itemToUpdate.replace(updatedDoc);
        return resource;
    } catch (error: any) {
        if (error.code === 404) { // Should be caught by the read() above, but as a fallback
            throw new NotFoundError(`Item with ID ${id} and partition key ${partitionKey} not found for update.`);
        }
        console.error(`Error updating item with ID ${id}:`, error.message);
        throw error;
    }
  },
};