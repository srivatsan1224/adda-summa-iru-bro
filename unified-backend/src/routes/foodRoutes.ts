import express, { Request, Response, Router } from 'express';
import { getContainer } from '../utils/dbClient';

const router: Router = express.Router();

// Types for restaurant and food item
interface Restaurant {
  id?: string;
  name: string;
  address: string;
  phone: string;
  rating: number;
  image: string;
}

interface FoodItem {
  id?: string;
  restaurantId: string;
  name: string;
  ingredients: string;
  cost: number;
  rating: number;
  image: string;
}

// Create a new restaurant
router.post('/restaurants', async (req: Request, res: Response) => {
  const { name, address, phone, rating, image } = req.body as Restaurant;

  try {
    const container = await getContainer('Restaurants');
    const { resource } = await container.items.create<Restaurant>({ name, address, phone, rating, image });
    res.status(201).json(resource);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

// List all restaurants
router.get('/restaurants', async (req: Request, res: Response) => {
  try {
    const container = await getContainer('Restaurants');
    const { resources } = await container.items.readAll<Restaurant>().fetchAll();
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

// Add a food item to a restaurant
router.post('/restaurants/:id/food', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, ingredients, cost, rating, image } = req.body as Omit<FoodItem, 'restaurantId'>;

  try {
    const container = await getContainer('FoodItems');
    const { resource } = await container.items.create<FoodItem>({
      restaurantId: id,
      name,
      ingredients,
      cost,
      rating,
      image,
    });
    res.status(201).json(resource);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

// Get food items for a restaurant
router.get('/restaurants/:id/food', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const container = await getContainer('FoodItems');
    const querySpec = {
      query: 'SELECT * FROM c WHERE c.restaurantId = @id',
      parameters: [{ name: '@id', value: id }],
    };

    const { resources } = await container.items.query<FoodItem>(querySpec).fetchAll();
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

export default router;

