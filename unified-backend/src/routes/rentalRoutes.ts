import express, { Request, Response, Router, NextFunction } from "express";
import { getContainer } from "../utils/dbClient";

const router: Router = express.Router();

// Rental Item interface
interface RentalItem {
  id?: string;
  name: string;
  category: string;
  description: string;
  price: number;
  ratings: number;
  rentalType: string;
  images: string[];
  ownerContactInfo?: {
    name: string;
    email: string;
    phone: string;
  };
  availability: boolean;
  location: string;
  createdAt?: string;
  updatedAt?: string;
}

// Error handling wrapper
const catchAsync = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

// Helper to decide if contact info should be shown
const shouldShowContactInfo = (_req: Request): boolean => {
  return true; // For now, always show contact info
};

// Function to selectively include contact info
const itemWithContactInfo = (item: RentalItem | null, showContact: boolean): Partial<RentalItem> | null => {
  if (!item) return null;
  const { ownerContactInfo, ...restOfItem } = item;
  if (showContact && ownerContactInfo) {
    return { ...restOfItem, ownerContactInfo };
  }
  return restOfItem;
};

// Get all categories
router.get("/categories", catchAsync(async (req: Request, res: Response): Promise<void> => {
  const container = await getContainer("RentalItems", "/category");
  
  const query = "SELECT DISTINCT c.category FROM c";
  const { resources: categories } = await container.items.query({ query }).fetchAll();
  
  const uniqueCategories = categories.map(item => item.category);
  
  res.status(200).json({
    success: true,
    data: uniqueCategories,
  });
}));

// Filter items by category with optional filters
router.get("/filter/:categoryName", catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { categoryName } = req.params;
  const { search, minPrice, maxPrice, ratings, rentalType, limit } = req.query;

  if (!categoryName) {
    res.status(400).json({ success: false, message: "Category name parameter is required." });
    return;
  }

  const container = await getContainer("RentalItems", "/category");
  
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

  // Add limit if provided
  if (limit) {
    query += ` OFFSET 0 LIMIT @limit`;
    parameters.push({ name: "@limit", value: Number(limit) });
  }

  const { resources: items } = await container.items.query({ query, parameters }).fetchAll();
  
  const showContact = shouldShowContactInfo(req);
  const processedItems = items.map(item => itemWithContactInfo(item, showContact));

  res.status(200).json({
    success: true,
    count: items.length,
    data: processedItems,
  });
}));

// Get item by ID
router.get("/items/:id", catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { category } = req.query;

  if (!id || !category) {
    res.status(400).json({ 
      success: false, 
      message: "Item ID and category (partition key) are required." 
    });
    return;
  }

  const container = await getContainer("RentalItems", "/category");
  
  try {
    const { resource: item } = await container.item(id, category as string).read();
    
    if (!item) {
      res.status(404).json({ success: false, message: "Item not found." });
      return;
    }

    const showContact = shouldShowContactInfo(req);
    const processedItem = itemWithContactInfo(item, showContact);

    res.status(200).json({
      success: true,
      data: processedItem,
    });
  } catch (error: any) {
    res.status(404).json({ success: false, message: "Item not found." });
  }
}));

// Create new rental item
router.post("/items", catchAsync(async (req: Request, res: Response): Promise<void> => {
  const itemData: RentalItem = {
    ...req.body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Validate required fields
  if (!itemData.name || !itemData.category || !itemData.price) {
    res.status(400).json({ 
      success: false, 
      message: "Name, category, and price are required." 
    });
    return;
  }

  const container = await getContainer("RentalItems", "/category");
  const { resource: createdItem } = await container.items.create(itemData);

  res.status(201).json({
    success: true,
    message: "Item created successfully",
    data: createdItem,
  });
}));

// Update rental item
router.put("/items/:id", catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { category } = req.query;
  const updateData = req.body;

  if (!id || !category) {
    res.status(400).json({ 
      success: false, 
      message: "Item ID and category (partition key) are required." 
    });
    return;
  }

  const container = await getContainer("RentalItems", "/category");
  
  try {
    const { resource: existingItem } = await container.item(id, category as string).read();
    
    if (!existingItem) {
      res.status(404).json({ success: false, message: "Item not found." });
      return;
    }

    const updatedItem = {
      ...existingItem,
      ...updateData,
      updatedAt: new Date().toISOString(),
    };

    const { resource: result } = await container.item(id, category as string).replace(updatedItem);

    res.status(200).json({
      success: true,
      message: "Item updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({ success: false, message: "Item not found." });
  }
}));

// Delete rental item
router.delete("/items/:id", catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { category } = req.query;

  if (!id || !category) {
    res.status(400).json({ 
      success: false, 
      message: "Item ID and category (partition key) are required." 
    });
    return;
  }

  const container = await getContainer("RentalItems", "/category");
  
  try {
    await container.item(id, category as string).delete();
    res.status(200).json({
      success: true,
      message: "Item deleted successfully",
    });
  } catch (error: any) {
    res.status(404).json({ success: false, message: "Item not found." });
  }
}));

export default router;

