// src/data.ts

export interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
}

export interface Restaurant {
  id: number;
  name: string;
  category: string;
  image: string;
  description: string;
  items: MenuItem[];
}

export const sampleRestaurants: Restaurant[] = [
  {
    id: 1,
    name: "Healthy Delights",
    category: "Healthy",
    image: "https://via.placeholder.com/150",
    description: "Delicious and healthy food for a balanced lifestyle.",
    items: [
      {
        id: 1,
        name: "Avocado Toast",
        category: "Healthy",
        price: 150,
        rating: 4.5,
        image: "https://via.placeholder.com/150",
      },
      {
        id: 2,
        name: "Quinoa Salad",
        category: "Healthy",
        price: 180,
        rating: 4.7,
        image: "https://via.placeholder.com/150",
      },
    ],
  },
  {
    id: 2,
    name: "Home Style Meals",
    category: "Home style",
    image: "https://via.placeholder.com/150",
    description: "Homely and comforting meals just like home.",
    items: [
      {
        id: 3,
        name: "Dal Tadka",
        category: "Home style",
        price: 120,
        rating: 4.6,
        image: "https://via.placeholder.com/150",
      },

      {
        id: 4,
        name: "Roti Sabzi",
        category: "Home style",
        price: 100,
        rating: 4.5,
        image: "https://via.placeholder.com/150",
      },
    ],
  },
];