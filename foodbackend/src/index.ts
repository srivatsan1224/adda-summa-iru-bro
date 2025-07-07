import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { CosmosClient } from '@azure/cosmos';
import dotenv from 'dotenv';
import cors from 'cors';


// Load environment variables
dotenv.config();
console.log('COSMOS_ENDPOINT:', process.env.COSMOS_ENDPOINT);
console.log('COSMOS_KEY:', process.env.COSMOS_KEY);

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(
  cors({
    origin: ['http://localhost:5174' ,'https://bachelors-web.vercel.app','https://bachelors-preview.vercel.app'],  // Replace with your frontend URL
  })
);

// Azure Cosmos DB Configuration
const client = new CosmosClient({
  endpoint: process.env.COSMOS_ENDPOINT || 'https://sudheeps.documents.azure.com:443/',
  key: process.env.COSMOS_KEY || 'z24k8ykchU67wFyV0aG0mBmH99y4lWXk2tGWpAIEYsrUzERSeTtBS1zAOdliTx9wkyn5bCculmzNACDbW3bsGg==',
});

const databaseId = process.env.DATABASE_ID || 'Bachelors';
const restaurantsContainerId = 'Restaurants';
const foodItemsContainerId = 'FoodItems';

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
app.post('/api/restaurants', async (req: Request, res: Response) => {
  const { name, address, phone, rating, image } = req.body as Restaurant;

  try {
    const { database } = await client.databases.createIfNotExists({ id: databaseId });
    const { container } = await database.containers.createIfNotExists({ id: restaurantsContainerId });

    const { resource } = await container.items.create<Restaurant>({ name, address, phone, rating, image });
    res.status(201).json(resource);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

// List all restaurants
app.get('/api/restaurants', async (req: Request, res: Response) => {
  try {
    const { database } = await client.databases.createIfNotExists({ id: databaseId });
    const { container } = await database.containers.createIfNotExists({ id: restaurantsContainerId });

    const { resources } = await container.items.readAll<Restaurant>().fetchAll();
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

// Add a food item to a restaurant
app.post('/api/restaurants/:id/food', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, ingredients, cost, rating, image } = req.body as Omit<FoodItem, 'restaurantId'>;

  try {
    const { database } = await client.databases.createIfNotExists({ id: databaseId });
    const { container } = await database.containers.createIfNotExists({ id: foodItemsContainerId });

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
app.get('/api/restaurants/:id/food', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const { database } = await client.databases.createIfNotExists({ id: databaseId });
    const { container } = await database.containers.createIfNotExists({ id: foodItemsContainerId });

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

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
