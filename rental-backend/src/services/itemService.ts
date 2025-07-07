// src/services/itemService.ts
import { CosmosService } from "./cosmosService";
import { RentalItem } from "../models/rentalModel";
import { NotFoundError, AppError } from "../utils/errorHandler"; // Added AppError
import { v4 as uuidv4 } from 'uuid';

const rentalContainer = CosmosService.getRentalContainer();

export const ItemService = {
  async getAllItems(querySpec: any, limit?: number): Promise<RentalItem[]> { // Added optional limit
    let items = await CosmosService.queryItems(rentalContainer, querySpec) as RentalItem[];
    if (limit && items.length > limit) {
      items = items.slice(0, limit);
    }
    return items;
  },

  async getItemById(itemId: string, category: string): Promise<RentalItem | null> {
    const item = await CosmosService.getItemById(rentalContainer, itemId, category);
    if (!item) {
      return null;
    }
    return item as RentalItem;
  },

  async createItem(itemData: Partial<RentalItem>): Promise<RentalItem> {
    if (!itemData.category) {
        throw new AppError("Category is required to create an item.", 400);
    }
    const id = itemData.id || uuidv4();

    const newItem: RentalItem = {
      id: id,
      category: itemData.category,
      name: itemData.name!,
      description: itemData.description!,
      price: itemData.price!,
      availability: itemData.availability !== undefined ? itemData.availability : "available",
      originalPrice: itemData.originalPrice || itemData.price,
      discount: itemData.discount || 0,
      imageUrl: itemData.imageUrl || "",
      specifications: itemData.specifications || {},
      offers: itemData.offers || [],
      ratings: itemData.ratings || 0,
      rentalType: itemData.rentalType || "short-term",
      ownerContactInfo: itemData.ownerContactInfo || "",
      stock: itemData.stock !== undefined ? itemData.stock : 1, // Default stock to 1 if not provided
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...itemData,
    };
    return CosmosService.createItem(rentalContainer, newItem) as Promise<RentalItem>;
  },

  async updateItem(
    itemId: string,
    category: string,
    itemUpdates: Partial<RentalItem>
  ): Promise<RentalItem | null> {
    if (itemUpdates.category && itemUpdates.category !== category) {
        throw new AppError("Cannot change the category (partition key) of an item.", 400);
    }
    const { category: _, ...updatesWithoutCategory } = itemUpdates;

    const updatedItem = await CosmosService.updateItem(
      rentalContainer,
      itemId,
      category,
      {...updatesWithoutCategory, updatedAt: new Date().toISOString()}
    );
    if (!updatedItem) {
      return null;
    }
    return updatedItem as RentalItem;
  },

  async deleteItem(itemId: string, category: string): Promise<void> {
    const item = await CosmosService.getItemById(rentalContainer, itemId, category);
    if (!item) {
        throw new NotFoundError(`Item with ID ${itemId} in category ${category} not found.`);
    }
    await CosmosService.deleteItem(rentalContainer, itemId, category);
  },

  // NEW METHOD for checking stock/availability
  async checkItemAvailability(productId: string, category: string, requestedQuantity: number): Promise<{ available: boolean; item?: RentalItem }> {
    const item = await this.getItemById(productId, category);
    if (!item) {
      return { available: false }; // Item doesn't exist
    }

    // Check availability status and stock count
    const isGenerallyAvailable = item.availability === true || item.availability === "available";
    const hasEnoughStock = item.stock !== undefined && item.stock >= requestedQuantity;

    if (isGenerallyAvailable && hasEnoughStock) {
      return { available: true, item };
    }
    return { available: false, item };
  },

  // NEW METHOD for adjusting stock (will be used by OrderService)
  async adjustItemStock(productId: string, category: string, quantityChange: number): Promise<RentalItem | null> {
    const item = await this.getItemById(productId, category);
    if (!item) {
        throw new NotFoundError(`Product with ID ${productId} in category ${category} not found for stock adjustment.`);
    }
    if (item.stock === undefined) {
        throw new AppError(`Product ${productId} does not have stock management enabled.`, 400);
    }

    const newStock = item.stock + quantityChange; // quantityChange will be negative for decreasing stock

    if (newStock < 0) {
        throw new AppError(`Not enough stock for product ${productId}. Requested adjustment results in negative stock.`, 400);
    }

    return this.updateItem(productId, category, { stock: newStock });
  }
};