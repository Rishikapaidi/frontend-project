// API Configuration
const apiConfig = {
  // Base URLs
  MOCK_API_URL: "http://localhost:3001",
  REAL_API_URL: "https://your-real-api-url.com", // TODO: Replace with your actual API URL
  
  // API Settings
  USE_MOCK: true, // Set to false to use the real API
  API_KEY: "", // If your API requires an API key
  API_VERSION: "v1", // If your API uses versioning
  
  // Timeout settings
  REQUEST_TIMEOUT: 30000, // 30 seconds
  
  // Endpoint mappings - map mock endpoints to real API endpoints
  ENDPOINTS: {
    // Authentication
    LOGIN: {
      mock: "/auth/login",
      real: "/api/users/login/",
      method: "POST"
    },
    LOGOUT: {
      mock: "/auth/logout",
      real: "/api/users/logout/",
      method: "POST"
    },
    REGISTER: {
      mock: "/auth/register",
      real: "/api/users/signup/",
      method: "POST"
    },
    REFRESH_TOKEN: {
      mock: "/auth/refresh",
      real: "/api/users/token/refresh/",
      method: "POST"
    },
    GET_CSRF: {
      mock: "/auth/csrf",
      real: "/api/users/csrf/",
      method: "GET"
    },
    
    // User
    USER_PROFILE: {
      mock: "/user/profile",
      real: "/api/users/profile/",
      method: "GET"
    },
    UPDATE_PROFILE: {
      mock: "/user/profile",
      real: "/api/users/profile/",
      method: "PUT"
    },
    
    // Services
    SERVICES: {
      mock: "/services",
      real: "/api/services/",
      method: "GET"
    },
    SERVICE_BY_ID: {
      mock: "/services/:id",
      real: "/api/services/:id",
      method: "GET"
    },
    SERVICES_BY_CATEGORY: {
      mock: "/services?category=:category",
      real: "/api/services/categories/:category",
      method: "GET"
    },
    SERVICE_CATEGORIES: {
      mock: "/services/categories",
      real: "/api/services/categories/",
      method: "GET"
    },
    SEARCH_SERVICES: {
      mock: "/services?q=:query",
      real: "/api/services/?q=:query",
      method: "GET"
    },
    CUSTOMER_SERVICES: {
      mock: "/services?lat=:lat&lng=:lng&radius=:radius",
      real: "/api/services/?lat=:lat&lng=:lng&radius=:radius",
      method: "GET"
    },
    
    // Bookings
    BOOKINGS: {
      mock: "/bookings",
      real: "/api/bookings/",
      method: "GET"
    },
    BOOKING_BY_ID: {
      mock: "/bookings/:id",
      real: "/api/bookings/:id",
      method: "GET"
    },
    CUSTOMER_BOOKINGS: {
      mock: "/bookings/customer",
      real: "/api/bookings/customer/",
      method: "GET"
    },
    PROVIDER_BOOKINGS: {
      mock: "/bookings/provider",
      real: "/api/bookings/provider/",
      method: "GET"
    },
    CREATE_BOOKING: {
      mock: "/bookings",
      real: "/api/bookings/create/",
      method: "POST"
    },
    BOOKING_STATUS: {
      mock: "/bookings/:id/status",
      real: "/api/bookings/:id/status/",
      method: "GET"
    },
    CANCEL_BOOKING: {
      mock: "/bookings/:id/cancel",
      real: "/api/bookings/:id/cancel/",
      method: "POST"
    }
  },
  
  // Helper function to get the appropriate endpoint
  getEndpoint: function(endpointKey: string, params?: Record<string, string>): string {
    // @ts-ignore - This is a dynamic access
    const endpoints = this.ENDPOINTS[endpointKey];
    if (!endpoints) {
      throw new Error(`Endpoint "${endpointKey}" not found in API configuration`);
    }
    
    let endpoint = this.USE_MOCK ? endpoints.mock : endpoints.real;
    
    // Replace path parameters
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        endpoint = endpoint.replace(`:${key}`, value);
      });
    }
    
    return endpoint;
  }
};

export default apiConfig; 