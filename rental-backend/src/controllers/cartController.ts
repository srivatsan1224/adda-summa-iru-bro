// src/controllers/cartController.ts
import { Request, Response, NextFunction } from "express";
import { CartService } from "../services/cartService"; // Import CartService
import { catchAsync, AppError, BadRequestError, NotFoundError } from "../utils/errorHandler";

const DEFAULT_MOCK_USER_ID = "default-mock-user";

export const addItemToCartHandler = catchAsync(async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const userId = DEFAULT_MOCK_USER_ID;
  const { id: productId, name, price, category, imageUrl, quantity } = req.body; // 'id' from body is productId

  if (!productId || !name || price === undefined || !category || quantity === undefined) {
      throw new BadRequestError("Missing required fields: productId, name, price, category, quantity.");
  }
  if (typeof quantity !== 'number' || quantity <= 0) {
      throw new BadRequestError("Quantity must be a positive number.");
  }

  const itemDetails = { productId, name, price, category, imageUrl };
  const cartItem = await CartService.addItem(userId, itemDetails, quantity);
  res.status(201).json(cartItem);
});

export const getCartItemsHandler = catchAsync(async (_req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const userId = DEFAULT_MOCK_USER_ID;
  const items = await CartService.getCart(userId);
  res.status(200).json(items);
});

export const removeItemFromCartHandler = catchAsync(async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const userId = DEFAULT_MOCK_USER_ID;
  const { cartItemId } = req.params;

  if (!cartItemId) { // Validator should catch this
      throw new BadRequestError("Cart item ID parameter is required.");
  }
  await CartService.removeItem(userId, cartItemId);
  res.status(204).send();
});

export const updateCartItemQuantityHandler = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = DEFAULT_MOCK_USER_ID;
    const { cartItemId } = req.params;
    const { quantity } = req.body;

    if (!cartItemId) { // Validator should catch this
        throw new BadRequestError("Cart item ID parameter is required.");
    }
    if (quantity === undefined || typeof quantity !== 'number' || quantity < 0) {
        throw new BadRequestError("Valid quantity (number >= 0) is required.");
    }

    if (quantity === 0) {
        // If quantity is 0, treat as remove item
        await CartService.removeItem(userId, cartItemId);
        res.status(204).send();
        return;
    }

    const updatedItem = await CartService.updateItemQuantity(userId, cartItemId, quantity);
    res.status(200).json(updatedItem);
});