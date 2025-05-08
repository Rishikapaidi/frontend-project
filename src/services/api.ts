import axios, { AxiosError, AxiosRequestConfig } from "axios";
import apiConfig from './apiConfig';

// Create an axios instance with base configuration
const api = axios.create({
  baseURL: apiConfig.USE_MOCK ? apiConfig.MOCK_API_URL : apiConfig.REAL_API_URL,
  timeout: apiConfig.REQUEST_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding authorization header
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add CSRF token for POST, PUT, DELETE requests if available
    const csrfToken = localStorage.getItem('csrfToken');
    if (csrfToken && (config.method === 'post' || config.method === 'put' || config.method === 'delete')) {
      config.headers['X-CSRFToken'] = csrfToken;
    }
    
    // Add API key if required
    if (apiConfig.API_KEY && !apiConfig.USE_MOCK) {
      config.headers["x-api-key"] = apiConfig.API_KEY;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle specific error status codes
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        // Handle unauthorized (e.g., redirect to login)
        console.error("Unauthorized access");
        // You might want to redirect to login page or refresh token
        // window.location.href = '/login';
      } else if (status === 403) {
        console.error("Forbidden - You don't have permission to access this resource");
      } else if (status === 404) {
        console.error("Resource not found");
      } else if (status >= 500) {
        console.error("Server error");
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Network error - no response received");
    } else {
      console.error("Error setting up request:", error.message);
    }
    
    return Promise.reject(error);
  }
);

// API service functions
const apiService = {
  // Authentication
  login: async (credentials: { email: string; password: string }) => {
    const endpoint = apiConfig.getEndpoint('LOGIN');
    return api.post(endpoint, credentials);
  },
  
  register: async (userData: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    role: string;
  }) => {
    const endpoint = apiConfig.getEndpoint('REGISTER');
    return api.post(endpoint, userData);
  },

  logout: async (refreshToken: string) => {
    const endpoint = apiConfig.getEndpoint('LOGOUT');
    return api.post(endpoint, { refresh_token: refreshToken });
  },

  refreshToken: async (refreshToken: string) => {
    const endpoint = apiConfig.getEndpoint('REFRESH_TOKEN');
    return api.post(endpoint, { refresh_token: refreshToken });
  },

  getCsrfToken: async () => {
    const endpoint = apiConfig.getEndpoint('GET_CSRF');
    const response = await api.get(endpoint);
    
    // Store CSRF token in localStorage for future requests
    if (response.data && response.data.csrf_token) {
      localStorage.setItem('csrfToken', response.data.csrf_token);
    }
    
    return response;
  },
  
  // User Profile
  getUserProfile: async () => {
    const endpoint = apiConfig.getEndpoint('USER_PROFILE');
    return api.get(endpoint);
  },
  
  updateUserProfile: async (profileData: any) => {
    const endpoint = apiConfig.getEndpoint('UPDATE_PROFILE');
    return api.put(endpoint, profileData);
  },
  
  // Services
  getServices: async (params?: any) => {
    const endpoint = apiConfig.getEndpoint('SERVICES');
    return api.get(endpoint, { params });
  },
  
  getServiceById: async (id: string) => {
    const endpoint = apiConfig.getEndpoint('SERVICE_BY_ID', { id });
    return api.get(endpoint);
  },
  
  getServicesByCategory: async (category: string) => {
    const endpoint = apiConfig.getEndpoint('SERVICES_BY_CATEGORY', { category });
    return api.get(endpoint);
  },

  getServiceCategories: async () => {
    const endpoint = apiConfig.getEndpoint('SERVICE_CATEGORIES');
    return api.get(endpoint);
  },
  
  searchServices: async (query: string) => {
    const endpoint = apiConfig.getEndpoint('SEARCH_SERVICES', { query });
    return api.get(endpoint);
  },

  getServicesNearby: async (lat: string, lng: string, radius: string) => {
    const endpoint = apiConfig.getEndpoint('CUSTOMER_SERVICES', { lat, lng, radius });
    return api.get(endpoint);
  },
  
  // Bookings
  getBookings: async () => {
    const endpoint = apiConfig.getEndpoint('BOOKINGS');
    return api.get(endpoint);
  },
  
  getBookingById: async (id: string) => {
    const endpoint = apiConfig.getEndpoint('BOOKING_BY_ID', { id });
    return api.get(endpoint);
  },

  getCustomerBookings: async () => {
    const endpoint = apiConfig.getEndpoint('CUSTOMER_BOOKINGS');
    return api.get(endpoint);
  },

  getProviderBookings: async () => {
    const endpoint = apiConfig.getEndpoint('PROVIDER_BOOKINGS');
    return api.get(endpoint);
  },
  
  createBooking: async (bookingData: any) => {
    const endpoint = apiConfig.getEndpoint('CREATE_BOOKING');
    return api.post(endpoint, bookingData);
  },
  
  getBookingStatus: async (id: string) => {
    const endpoint = apiConfig.getEndpoint('BOOKING_STATUS', { id });
    return api.get(endpoint);
  },
  
  cancelBooking: async (id: string) => {
    const endpoint = apiConfig.getEndpoint('CANCEL_BOOKING', { id });
    return api.post(endpoint);
  },
  
  // Helper method for custom API calls
  custom: async (
    method: 'get' | 'post' | 'put' | 'delete', 
    endpoint: string, 
    data?: any, 
    config?: AxiosRequestConfig
  ) => {
    switch (method) {
      case 'get':
        return api.get(endpoint, config);
      case 'post':
        return api.post(endpoint, data, config);
      case 'put':
        return api.put(endpoint, data, config);
      case 'delete':
        return api.delete(endpoint, config);
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
  }
};

export { apiService, apiConfig };
export default api;
