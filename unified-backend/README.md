# Unified Backend

This is a unified backend that consolidates all the individual backend services from the original repository into a single Express.js application.

## Features

The unified backend includes all functionality from the following original services:

- **Main Backend** (`/backend`) - User management, products, events
- **Food Backend** (`/foodbackend`) - Restaurant and food item management
- **Part-time Backend** (`/parttime-backend`) - Job postings and applications
- **Rental Backend** (`/rental-backend`) - Rental item management

## API Endpoints

All endpoints are now available under the `/api` prefix:

### User Management
- `POST /api/users/signup` - User registration
- `POST /api/users/login` - User login
- `POST /api/users/google-login` - Google OAuth login
- `GET /api/users/get` - Get user by ID
- `POST /api/users/add-to-cart` - Add item to cart
- `PUT /api/users/cart/update` - Update cart item quantity
- `POST /api/users/cart/checkout` - Checkout cart

### Products
- `GET /api/products` - Get all products
- `GET /api/products/search` - Search and filter products

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:eventId` - Get event by ID
- `POST /api/events/createEvent` - Create new event
- `PUT /api/events/:eventId` - Update event
- `DELETE /api/events/:eventId` - Delete event

### Food Service
- `GET /api/food/restaurants` - Get all restaurants
- `POST /api/food/restaurants` - Create new restaurant
- `GET /api/food/restaurants/:id/food` - Get food items for restaurant
- `POST /api/food/restaurants/:id/food` - Add food item to restaurant

### Jobs
- `GET /api/jobs` - Get all jobs (with filtering and pagination)
- `POST /api/jobs` - Create new job
- `GET /api/jobs/:id` - Get job by ID
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job

### Applications
- `POST /api/applications/:jobId/apply` - Apply for a job

### Rentals
- `GET /api/rentals/categories` - Get all rental categories
- `GET /api/rentals/filter/:categoryName` - Filter rental items by category
- `GET /api/rentals/items/:id` - Get rental item by ID
- `POST /api/rentals/items` - Create new rental item
- `PUT /api/rentals/items/:id` - Update rental item
- `DELETE /api/rentals/items/:id` - Delete rental item

## Environment Variables

Copy `.env.example` to `.env` and configure the following variables:

```env
# Azure Cosmos DB Configuration
COSMOS_ENDPOINT=your_cosmos_endpoint_here
COSMOS_KEY=your_cosmos_key_here
COSMOS_DATABASE_NAME=your_database_name_here

# Server Configuration
PORT=3000
NODE_ENV=development

# CORS Configuration
CORS_ALLOWED_ORIGINS=http://localhost:5174,https://bachelors-web.vercel.app,https://bachelors-preview.vercel.app
```

## Installation and Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Build the project:
```bash
npm run build
```

4. Start the server:

For development:
```bash
npm run dev
```

For production:
```bash
npm start
```

## Database

The unified backend uses Azure Cosmos DB with the following containers:

- `Users` - User accounts and profiles
- `Products` - Product catalog
- `Events` - Event listings
- `Restaurants` - Restaurant information
- `FoodItems` - Food menu items
- `Jobs` - Job postings
- `Applications` - Job applications
- `RentalItems` - Rental item listings
- `HousingProperty` - Housing/property data

## Migration from Individual Services

This unified backend maintains backward compatibility with the original API endpoints. However, it's recommended to update frontend applications to use the new `/api` prefixed endpoints for consistency.

### Port Changes

The unified backend runs on port 3000 by default. Update your frontend configurations to point to:
- Development: `http://localhost:3000`
- Production: Your deployed backend URL

## CORS Configuration

The backend is configured to accept requests from:
- `http://localhost:5174` (Local development)
- `http://localhost:3000` (Alternative local port)
- `https://bachelors-web.vercel.app` (Production frontend)
- `https://bachelors-preview.vercel.app` (Preview frontend)

Additional origins can be added via the `CORS_ALLOWED_ORIGINS` environment variable.

