// src/routes/cartRoutes.ts
import { Router } from "express";
import {
    addItemToCartHandler, // Ensure this matches controller export
    getCartItemsHandler,  // Ensure this matches controller export
    removeItemFromCartHandler, // Ensure this matches controller export
    updateCartItemQuantityHandler // Ensure this matches controller export
} from "../controllers/cartController";
import {
    addItemToCartValidators,
    updateCartItemQuantityValidators, // Ensure this validator exists and is correct
    handleValidationErrors
} from "../utils/validators";
import { param } from "express-validator";

const router = Router();

router.post(
    "/",
    addItemToCartValidators,
    handleValidationErrors,
    addItemToCartHandler // Use correct handler
);

router.get("/", getCartItemsHandler); // Use correct handler

router.delete(
    "/:cartItemId",
    [param("cartItemId").isString().notEmpty().withMessage("Cart Item ID in path must be a non-empty string.")],
    handleValidationErrors,
    removeItemFromCartHandler // Use correct handler
);

router.put(
    "/:cartItemId",
    updateCartItemQuantityValidators,
    handleValidationErrors,
    updateCartItemQuantityHandler // Use correct handler
);

export default router;