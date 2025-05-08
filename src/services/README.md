# API Integration Guide

This guide explains how to integrate external APIs from your Postman collection into the Community Service Dashboard.

## File Structure

- `api.ts` - The main API service with functions for making API calls
- `apiConfig.ts` - Configuration file for API settings and endpoints
- `apiTester.ts` - Utility for testing API endpoints
- `postmanImporter.ts` - Utility for importing Postman collections

## How to Integrate Your APIs

### Step 1: Update API Configuration

Edit the `apiConfig.ts` file to configure your API:

```typescript
// Set your real API URL
REAL_API_URL: "https://your-real-api-url.com/api",

// Set to false to use the real API
USE_MOCK: false,

// Add your API key if required
API_KEY: "your-api-key",
```

### Step 2: Import Endpoints from Postman

There are two ways to import your Postman collection:

#### Option 1: Manually Map Endpoints

1. Open your Postman collection and review the endpoints
2. Update the `ENDPOINTS` object in `apiConfig.ts` with your endpoints:

```typescript
ENDPOINTS: {
  // Services
  SERVICES: {
    mock: "/services",
    real: "/your-real-endpoint/services",
  },
  // Add more endpoints...
}
```

#### Option 2: Use the Postman Importer

1. Export your Postman collection as JSON (v2.1)
2. Open `postmanImporter.ts` and replace the `postmanCollectionJson` variable with your collection JSON
3. Run the script using Node.js:

```bash
npx ts-node src/services/postmanImporter.ts
```

4. Copy the generated endpoints to the `ENDPOINTS` object in `apiConfig.ts`

### Step 3: Test Your API Integration

Use the `apiTester.ts` utility to test your API integration:

```typescript
import { testEndpoint, testAllEndpoints } from './services/apiTester';

// Test all endpoints
testAllEndpoints();

// Or test a specific endpoint
testEndpoint('Get Services', () => apiService.getServices());

// Test a custom endpoint
testCustomEndpoint('get', '/custom/endpoint');
```

### Step 4: Update Your React Components

Update your React components to use the new API service. The existing functions should continue to work, but they'll now call your real API instead of the mock API.

## API Authentication

If your API requires authentication:

1. Update the `api.ts` file to include authentication headers
2. Implement token storage in localStorage
3. Add a login function to obtain tokens

Example login implementation:

```typescript
// In a login component
import { apiService } from '../services/api';

const handleLogin = async (email, password) => {
  try {
    const response = await apiService.login({ email, password });
    const { token } = response.data;
    
    // Store the token in localStorage
    localStorage.setItem('token', token);
    
    // Redirect to dashboard
    navigate('/dashboard');
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

## Switching Between Mock and Real APIs

You can easily switch between the mock API and your real API:

```typescript
import { apiConfig } from './services/api';

// Use mock API
apiConfig.USE_MOCK = true;

// Use real API
apiConfig.USE_MOCK = false;
```

This is useful during development or when your real API is unavailable. 