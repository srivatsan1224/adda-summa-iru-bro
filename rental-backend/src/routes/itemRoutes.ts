import * as express from "express";
import {
    filterItemsByCriteria,
    getItemByIdHandler, // Renamed from getItemById to avoid conflict if function itself was named getItemById
    createItemHandler,
    updateItemHandler,
    deleteItemHandler
} from "../controllers/itemController";
import {
    filterItemsValidators,
    getItemByIdValidators,
    createItemValidators,
    updateItemValidators, // Add this
    handleValidationErrors
} from "../utils/validators";
import { param, query } from "express-validator"; // For delete validator

const router = express.Router();

// CREATE an item
router.post(
    "/",
    createItemValidators,
    handleValidationErrors,
    createItemHandler
);

// READ items by category with filters
router.get(
    "/filter/:categoryName",
    filterItemsValidators,
    handleValidationErrors,
    filterItemsByCriteria
);

// READ a specific item by ID
router.get(
    "/:id",
    getItemByIdValidators,
    handleValidationErrors,
    getItemByIdHandler
);

// UPDATE an item by ID
router.put(
    "/:id", // Item ID in path
    updateItemValidators, // Category (partitionKey) expected in query
    handleValidationErrors,
    updateItemHandler
);

// DELETE an item by ID
router.delete(
    "/:id", // Item ID in path
    [ // Inline validators for delete, or create a dedicated one
        param("id").isString().notEmpty().withMessage("Item ID in path is required."),
        query("category").isString().notEmpty().withMessage("Category query parameter (partitionKey) is required for deletion.")
    ],
    handleValidationErrors,
    deleteItemHandler
);

export default router;