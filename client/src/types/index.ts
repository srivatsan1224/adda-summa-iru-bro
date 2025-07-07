// src/types/index.ts

// Matches backend RentalItem interface
export interface RentalItem {
  id: string;
  category: string; // Partition Key for rental_items container
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  availability: boolean | "available" | "rented" | "maintenance";
  imageUrl?: string;
  specifications?: Record<string, any>; // Or more specific type if known
  offers?: string[];
  ratings?: number;
  rentalType?: "short-term" | "long-term" | "event";
  ownerContactInfo?: string;
  createdAt: string; // ISOString
  updatedAt: string; // ISOString
  stock?: number;
}

// Matches backend CartItem interface
export interface CartItem {
  id: string;          // Unique ID for the cart entry, e.g., `${userId}-${productId}`
  userId: string;      // Partition Key for cart container (backend uses DEFAULT_MOCK_USER_ID)
  productId: string;   // ID of the actual RentalItem
  name: string;
  price: number;
  quantity: number;
  category: string;
  imageUrl?: string;
  createdAt: string; // ISOString
  updatedAt: string; // ISOString
}

// Matches backend OrderItem structure (snapshot within an Order)
export interface OrderItem {
  productId: string;
  name: string;
  price: number; // Price per unit at the time of order
  quantity: number;
  category: string;
  imageUrl?: string;
}

// Matches backend Order interface
export interface Order {
  id: string; // Unique order ID (e.g., UUID)
  userId: string; // Partition Key for orders container
  items: OrderItem[];
  totalAmount: number;
  orderDate: string; // ISOString
  paymentStatus: 'mock_paid' | 'pending' | 'failed';
  createdAt: string; // ISOString
  updatedAt: string; // ISOString
}

// For the category list from /api/categories
export type CategoryName = string;

// For the structured category data used in RentalHome's CategoryButton
export interface DisplayCategory {
  id: string; // Can be same as name for key prop
  name: string;
  img: string; // URL for the category image
  description: string;
  route: string; // Frontend route
}