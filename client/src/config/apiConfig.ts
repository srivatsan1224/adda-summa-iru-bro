// src/config/apiConfig.ts (for VITE)

let baseUrl = 'http://localhost:3000/api'; // Default

if (import.meta.env.VITE_API_URL) {
  baseUrl = import.meta.env.VITE_API_URL;
}

const API_BASE_URL = baseUrl;

export default API_BASE_URL;