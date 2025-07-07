import { Request, Response, NextFunction } from "express";
import { CosmosService } from "../services/cosmosService";
import { catchAsync } from "../utils/errorHandler"; // Import catchAsync

const rentalContainer = CosmosService.getRentalContainer();

// This might become redundant if item creation is handled by POST /api/items
// export const addCategoryItem = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   // ... logic for adding an item that's specifically tied to a category view ...
//   // For now, assume general item creation covers this.
// });

export const getAllCategories = catchAsync(async (_req: Request, res: Response, _next: NextFunction): Promise<void> => {
    const querySpec = {
        query: "SELECT DISTINCT VALUE c.category FROM c WHERE IS_DEFINED(c.category)" // Ensure category field exists
    };
    const categories = await CosmosService.queryItems(rentalContainer, querySpec);
    res.status(200).json(categories);
});