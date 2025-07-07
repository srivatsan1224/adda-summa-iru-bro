import { Request, Response, NextFunction } from "express";
import { ItemService } from "../services/itemService";
import { RentalItem } from "../models/rentalModel";
import { AppError, NotFoundError, BadRequestError } from "../utils/errorHandler";
import { catchAsync } from "../utils/errorHandler"; // Import catchAsync

// Helper to decide if contact info should be shown (currently always true for mock)
const shouldShowContactInfo = (_req: Request): boolean => {
  // TODO: Replace with actual authentication check
  return true;
};

// Function to selectively include contact info
const G_rental_item_with_contact_info = (item: RentalItem | null, showContact: boolean): Partial<RentalItem> | null => {
    if (!item) return null;
    const { ownerContactInfo, ...restOfItem } = item;
    if (showContact && ownerContactInfo) {
        return { ...restOfItem, ownerContactInfo };
    }
    return restOfItem;
};

export const filterItemsByCriteria = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { categoryName } = req.params;
    const { search, minPrice, maxPrice, ratings, rentalType, limit } = req.query; // Added limit

    if (!categoryName) {
        return next(new BadRequestError("Category name parameter is required."));
    }

    let query = "SELECT * FROM c WHERE c.category = @categoryName";
    const parameters: { name: string; value: string | number }[] = [
      { name: "@categoryName", value: categoryName as string },
    ];

    if (search) {
      query += " AND CONTAINS(LOWER(c.name), LOWER(@search))";
      parameters.push({ name: "@search", value: search as string });
    }
    if (minPrice) {
      query += " AND c.price >= @minPrice";
      parameters.push({ name: "@minPrice", value: Number(minPrice) });
    }
    if (maxPrice) {
      query += " AND c.price <= @maxPrice";
      parameters.push({ name: "@maxPrice", value: Number(maxPrice) });
    }
    if (ratings) {
      query += " AND c.ratings >= @ratings";
      parameters.push({ name: "@ratings", value: Number(ratings) });
    }
    if (rentalType) {
      query += " AND c.rentalType = @rentalType";
      parameters.push({ name: "@rentalType", value: rentalType as string });
    }
    // Note: Cosmos DB SQL doesn't directly support LIMIT in the same way as SQL.
    // TOP is used for limiting results.
    // We need to construct the query string carefully if using TOP.
    // For simplicity, if limit is provided, we'll fetch all and slice in service/controller,
    // OR use TOP if it's a simple query. For complex queries with many ANDs,
    // TOP should be at the beginning.
    // A more robust solution for pagination involves continuation tokens.

    // Simple TOP N for now (if no other ordering is applied, order is not guaranteed)
    let finalQuery = "";
    if (limit && !isNaN(Number(limit))) {
        finalQuery = `SELECT TOP ${Number(limit)} * FROM c WHERE c.category = @categoryName`;
        // Re-add other filters if TOP is used this way, which makes it more complex.
        // A better approach is to let CosmosService handle TOP N if the SDK supports it easily with query objects,
        // or fetch all and slice if dataset is small.
        // For now, let's assume the ItemService might handle slicing if a limit is passed,
        // or we adjust the query here if it's simple enough.

        // Let's modify the ItemService.getAllItems to handle limit by slicing for now
        // and keep the controller query simpler.
    }


    const querySpec = { query, parameters };
    // Pass limit to ItemService if it's designed to handle it
    const items: RentalItem[] = await ItemService.getAllItems(querySpec, limit ? Number(limit) : undefined);


    const showContact = shouldShowContactInfo(req);
    const processedItems = items.map(item => G_rental_item_with_contact_info(item, showContact));

    res.status(200).json(processedItems);
});

export const getItemByIdHandler = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const category = req.query.category as string; // Partition key from query

    if (!category) { // Validator should catch this
      return next(new BadRequestError("Category query parameter (partitionKey) is required."));
    }

    const item = await ItemService.getItemById(id, category);
    if (!item) {
      return next(new NotFoundError("Item not found."));
    }

    const showContact = shouldShowContactInfo(req);
    const processedItem = G_rental_item_with_contact_info(item, showContact);
    res.status(200).json(processedItem);
});

export const createItemHandler = catchAsync(async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    // req.body should be validated by middleware (createItemValidators)
    const newItemData: Partial<RentalItem> = req.body;
    const createdItem = await ItemService.createItem(newItemData);
    res.status(201).json(createdItem);
});

export const updateItemHandler = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const category = req.query.category as string; // Partition key from query
    const itemUpdates: Partial<RentalItem> = req.body;

    if (!category) { // Validator should catch this
        return next(new BadRequestError("Category query parameter (partitionKey) is required for update."));
    }
    // Prevent changing category (partition key) via this endpoint directly in the body
    if (itemUpdates.category && itemUpdates.category !== category) {
        return next(new BadRequestError("Cannot change item's category (partition key) using this update method. Use a dedicated migration process if needed."));
    }
    delete itemUpdates.category; // Ensure category is not in the update payload passed to service if it matches partition key

    const updatedItem = await ItemService.updateItem(id, category, itemUpdates);
    if (!updatedItem) {
      return next(new NotFoundError("Item not found or could not be updated."));
    }
    res.status(200).json(updatedItem);
});

export const deleteItemHandler = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const category = req.query.category as string; // Partition key from query

    if (!category) { // Validator should catch this
        return next(new BadRequestError("Category query parameter (partitionKey) is required for deletion."));
    }

    await ItemService.deleteItem(id, category);
    res.status(204).send();
});