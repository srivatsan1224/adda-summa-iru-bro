// src/services/orderService.ts
import { CosmosService } from "./cosmosService";
import { ItemService } from "./itemService";
import { CartService } from "./cartService";
import { Order, OrderItem, CartItem } from "../models/rentalModel";
import { AppError, BadRequestError } from "../utils/errorHandler";
import { v4 as uuidv4 } from 'uuid';

const ordersContainer = CosmosService.getOrdersContainer(); // Partition Key: /userId

export const OrderService = {
  async processCheckout(userId: string): Promise<Order> {
    const cartItems: CartItem[] = await CartService.getCart(userId);

    if (!cartItems || cartItems.length === 0) {
      throw new BadRequestError("Your cart is empty. Nothing to checkout.");
    }

    let totalAmount = 0;
    const orderItems: OrderItem[] = [];

    // 1. Validate stock and prepare order items
    for (const cartItem of cartItems) {
      const availabilityCheck = await ItemService.checkItemAvailability(
        cartItem.productId,
        cartItem.category,
        cartItem.quantity
      );

      if (!availabilityCheck.available || !availabilityCheck.item) {
        throw new AppError(
          `Item "${cartItem.name}" (ID: ${cartItem.productId}) is no longer available in the requested quantity or does not exist. Please remove it from your cart or reduce quantity.`,
          400
        );
      }
      const currentPrice = availabilityCheck.item.price;
      totalAmount += currentPrice * cartItem.quantity;

      orderItems.push({
        productId: cartItem.productId,
        name: availabilityCheck.item.name,
        price: currentPrice,
        quantity: cartItem.quantity,
        category: availabilityCheck.item.category,
        imageUrl: availabilityCheck.item.imageUrl,
      });
    }

    // 2. (Simulate Payment)
    console.log(`[OrderService] Mock payment successful for user ${userId}, amount ${totalAmount}`);

    // 3. Create the Order document
    const now = new Date().toISOString();
    const newOrder: Order = {
      id: uuidv4(),
      userId,
      items: orderItems,
      totalAmount,
      orderDate: now,
      paymentStatus: 'mock_paid',
      createdAt: now,
      updatedAt: now,
    };

    const createdOrder = await CosmosService.createItem(ordersContainer, newOrder) as Order;

    // 4. Adjust stock for each item
    try {
      for (const item of orderItems) {
        await ItemService.adjustItemStock(item.productId, item.category, -item.quantity); // Decrement stock
      }
    } catch (stockError: any) {
      console.error(
        `CRITICAL: Order ${createdOrder.id} created, but failed to adjust stock. Error: ${stockError.message}`
      );
      // In a real scenario, consider how to handle this. For now, order is placed, stock might be off.
    }

    // 5. Clear the user's cart - MODIFIED FOR TESTING
    console.log(`[OrderService] Cart clearing is SKIPPED for userId: ${userId} for testing/demonstration purposes.`);
     await CartService.clearCart(userId); // <-- This line is now commented out

    return createdOrder;
  },

  async getOrderById(orderId: string, userId: string): Promise<Order | null> {
    return CosmosService.getItemById(ordersContainer, orderId, userId) as Promise<Order | null>;
  },

  async getUserOrders(userId: string): Promise<Order[]> {
    const querySpec = {
      query: "SELECT * FROM o WHERE o.userId = @userId ORDER BY o.createdAt DESC",
      parameters: [{ name: "@userId", value: userId }]
    };
    return CosmosService.queryItems(ordersContainer, querySpec) as Promise<Order[]>;
  }
};