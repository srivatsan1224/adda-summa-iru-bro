// src/services/apiService.ts
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import API_BASE_URL from '../config/apiConfig'; // Import the base URL from your new config file

const apiService: AxiosInstance = axios.create({
  baseURL: API_BASE_URL, // Use the imported base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Request Interceptor (e.g., to add auth tokens) - Keep if you had it or want it
apiService.interceptors.request.use(
  (config) => {
    // Example: const token = localStorage.getItem('authToken');
    // if (token && config.headers) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Response Interceptor (e.g., for global error handling) - Keep if you had it or want it
apiService.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      console.error('API Error Response:', error.response.data);
      console.error('Status:', error.response.status);
    } else if (error.request) {
      console.error('API Error Request:', error.request);
    } else {
      console.error('API Error Message:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiService;