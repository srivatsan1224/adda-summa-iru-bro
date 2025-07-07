// src/services/cartService.ts
import { CosmosService } from "./cosmosService";
import { ItemService } from "./itemService";
import { CartItem, RentalItem } from "../models/rentalModel";
import { NotFoundError, AppError, BadRequestError } from "../utils/errorHandler";
// import { v4 as uuidv4 } from 'uuid'; // Not directly used in this snippet but often useful

const cartContainer = CosmosService.getCartContainer(); // Partition Key: /userId

export const CartService = {
  // Corrected placement of async
  async addItem(
    userId: string,
    itemDetails: { productId: string; name: string; price: number; category: string; imageUrl?: string },
    quantity: number
  ): Promise<CartItem> {
    const { productId, name, price, category, imageUrl } = itemDetails;

    const availabilityCheck = await ItemService.checkItemAvailability(productId, category, quantity);
    if (!availabilityCheck.available || !availabilityCheck.item) { // Ensure item is also checked
      throw new AppError(`Item "${name}" is not available in the requested quantity or does not exist.`, 400);
    }
    const rentalItem = availabilityCheck.item; // We know item exists if available

    const cartItemId = `${userId}-${productId}`;

    const existingCartItem = await CosmosService.getItemById(cartContainer, cartItemId, userId) as CartItem | null;

    if (existingCartItem) {
      const newQuantity = existingCartItem.quantity + quantity;
      const totalAvailabilityCheck = await ItemService.checkItemAvailability(productId, category, newQuantity);
      if (!totalAvailabilityCheck.available) {
        throw new AppError(`Cannot add ${quantity} more of "${name}". Not enough stock for a total of ${newQuantity}.`, 400);
      }
      // Delegate to updateItemQuantity, ensuring it handles stock check for the final quantity
      return this.updateItemQuantity(userId, cartItemId, newQuantity);
    } else {
      const newCartItem: CartItem = {
        id: cartItemId,
        userId,
        productId,
        name: rentalItem.name,
        price: rentalItem.price,
        quantity,
        category: rentalItem.category,
        imageUrl: rentalItem.imageUrl || "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return CosmosService.createItem(cartContainer, newCartItem) as Promise<CartItem>;
    }
  },

  // Corrected placement of async
  async getCart(userId: string): Promise<CartItem[]> {
    const querySpec = {
      query: "SELECT * FROM c WHERE c.userId = @userId",
      parameters: [{ name: "@userId", value: userId }]
    };
    return CosmosService.queryItems(cartContainer, querySpec) as Promise<CartItem[]>;
  },

  // Corrected placement of async
  async removeItem(userId: string, cartItemId: string): Promise<void> {
    const cartItem = await CosmosService.getItemById(cartContainer, cartItemId, userId);
    if (!cartItem) {
      throw new NotFoundError(`Cart item with ID ${cartItemId} not found for user.`);
    }
    await CosmosService.deleteItem(cartContainer, cartItemId, userId);
  },

  // Corrected placement of async
  async updateItemQuantity(userId: string, cartItemId: string, quantity: number): Promise<CartItem> {
    if (quantity < 0) {
      throw new BadRequestError("Quantity cannot be negative.");
    }

    const cartItem = await CosmosService.getItemById(cartContainer, cartItemId, userId) as CartItem | null;
    if (!cartItem) {
      throw new NotFoundError(`Cart item with ID ${cartItemId} not found.`);
    }

    // If quantity is 0, the controller should handle calling removeItem.
    // This service method strictly updates quantity if > 0.
    if (quantity === 0) {
         // This path should ideally be handled by the controller calling removeItem directly.
         // If this service method must handle it, it complicates the return type or needs to throw.
         // For now, let's assume the controller prevents quantity 0 from reaching here for an *update*.
         // If it does, we can throw an error indicating deletion should be used.
        throw new BadRequestError("Quantity 0 for an update implies item removal. Please use the remove item endpoint.");
    }


    const availabilityCheck = await ItemService.checkItemAvailability(cartItem.productId, cartItem.category, quantity);
    if (!availabilityCheck.available || !availabilityCheck.item) { // Ensure item is also checked
      throw new AppError(`Item "${cartItem.name}" is not available in the new quantity of ${quantity} or no longer exists.`, 400);
    }

    const updatedCartItem = await CosmosService.updateItem(
      cartContainer,
      cartItemId,
      userId,
      { quantity, price: availabilityCheck.item.price, updatedAt: new Date().toISOString() }
    );

    if (!updatedCartItem) {
      throw new AppError("Failed to update cart item.", 500);
    }
    return updatedCartItem as CartItem;
  },

  // Corrected placement of async
  async clearCart(userId: string): Promise<void> {
    const userCartItems = await this.getCart(userId);
    const deletePromises = userCartItems.map(item =>
      CosmosService.deleteItem(cartContainer, item.id, userId)
    );
    await Promise.all(deletePromises);
  }
};