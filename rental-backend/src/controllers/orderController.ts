// src/controllers/orderController.ts
import { Request, Response, NextFunction } from "express";
import { OrderService } from "../services/orderService";
import { catchAsync } from "../utils/errorHandler";
import { NotFoundError } from "../utils/errorHandler";

const DEFAULT_MOCK_USER_ID = "default-mock-user";

export const checkoutHandler = catchAsync(async (_req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const userId = DEFAULT_MOCK_USER_ID; // Use mock user ID for now

  const order = await OrderService.processCheckout(userId);

  res.status(201).json({
    message: "Checkout successful. Order created.",
    order,
  });
});

export const getOrderByIdHandler = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = DEFAULT_MOCK_USER_ID; // Or get from authenticated user later
    const { orderId } = req.params;
    const order = await OrderService.getOrderById(orderId, userId);
    if (!order) {
        return next(new NotFoundError(`Order with ID ${orderId} not found.`));
    }
    res.status(200).json(order);
});

export const getUserOrdersHandler = catchAsync(async (_req: Request, res: Response, _next: NextFunction): Promise<void> => {
    const userId = DEFAULT_MOCK_USER_ID; // Or get from authenticated user later
    const orders = await OrderService.getUserOrders(userId);
    res.status(200).json(orders);
});