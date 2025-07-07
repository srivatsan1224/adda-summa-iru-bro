// src/models/rentalModel.ts
export interface RentalItem {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  availability: boolean | "available" | "rented" | "maintenance";
  imageUrl?: string;
  specifications?: Record<string, any>;
  offers?: string[];
  ratings?: number;
  rentalType?: "short-term" | "long-term" | "event";
  ownerContactInfo?: string;
  createdAt: string;
  updatedAt: string;
  stock?: number;
}

// CartItem should represent the item *as it is in the cart*
// For the order, we'll store a snapshot of these cart items.
export interface CartItem {
  id: string;          // Unique ID for the cart entry, e.g., `${userId}-${productId}`
  userId: string;      // Partition Key for cart container
  productId: string;   // ID of the actual RentalItem
  name: string;        // Name of the product at the time it was added/updated in cart
  price: number;       // Price of the product at the time it was added/updated in cart
  quantity: number;
  category: string;    // Category of the product
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
}

// OrderItem will be a snapshot of CartItem at the time of order
export interface OrderItem {
  productId: string;
  name: string;
  price: number; // Price per unit at the time of order
  quantity: number;
  category: string;
  imageUrl?: string;
}

export interface Order {
  id: string; // Unique order ID (e.g., UUID)
  userId: string; // Partition Key for orders container
  items: OrderItem[]; // Snapshot of items
  totalAmount: number;
  orderDate: string; // ISOString
  paymentStatus: 'mock_paid' | 'pending' | 'failed'; // Updated for mock status
  // shippingAddress?: any; // Add if needed later
  // billingAddress?: any; // Add if needed later
  createdAt: string; // ISOString
  updatedAt: string; // ISOString
}