// src/routes/orderRoutes.ts
import { Router } from "express";
import { checkoutHandler, getOrderByIdHandler, getUserOrdersHandler } from "../controllers/orderController";
import { handleValidationErrors } from "../utils/validators"; // If any validators were needed
import { param } from "express-validator";

const router = Router();

// POST /api/orders/checkout (or just /api/orders with POST)
router.post(
    "/checkout",
    // No specific body validators needed if checkout is based on current cart
    checkoutHandler
);

// GET /api/orders (to get all orders for the mock user)
router.get(
    "/",
    getUserOrdersHandler
)

// GET /api/orders/:orderId (to get a specific order for the mock user)
router.get(
    "/:orderId",
    [param("orderId").isString().notEmpty().withMessage("Order ID parameter is required.")],
    handleValidationErrors, // Apply validator handler
    getOrderByIdHandler
);


export default router;