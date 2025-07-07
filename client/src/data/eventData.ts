// src/data/eventData.ts
export interface EventData {
  title: string;
  image: string;
  date: string;
  location: string;
  price: string;
  rating: string;
  reviews: string;
  tag: string;
  time: string;
  enrolled: string;
  venue: {
    name: string;
    address: string;
  };
  highlights: Array<{
    title: string;
    description: string;
  }>;
  agenda: Array<{
    id: number;
    title: string;
    time: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

// Your existing data exports
export const upcomingEvents = [/*...*/];
export const categories = [/*...*/];