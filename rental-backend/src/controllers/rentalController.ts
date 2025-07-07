import { Request, Response, NextFunction } from "express";
import { CosmosService } from "../services/cosmosService";
import { AppError, BadRequestError } from "../utils/errorHandler";

const rentalContainer = CosmosService.getRentalContainer();

export const addRentalItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { category, name, description, price, availability } = req.body;

    if (!category || !name || !description || price === undefined || availability === undefined) {
      return next(new BadRequestError("Missing required fields: category, name, description, price, availability."));
    }
    // Generate an ID if not provided, or expect it from the client
    // Ensure the ID is unique for the partition key (category)
    const id = req.body.id || `${category.substring(0, 3).toLowerCase()}-${new Date().getTime()}`;

    const newItemData = {
      ...req.body,
      id,
      originalPrice: req.body.originalPrice || price,
      discount: req.body.discount || 0,
      imageUrl: req.body.imageUrl || "",
      specifications: req.body.specifications || {},
      offers: req.body.offers || [],
      ratings: req.body.ratings || 0,
      rentalType: req.body.rentalType || "short-term",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const createdItem = await CosmosService.createItem(rentalContainer, newItemData);
    res.status(201).json(createdItem);
  } catch (error) {
    next(error);
  }
};