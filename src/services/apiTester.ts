/**
 * API Tester Utility
 * 
 * This utility provides functions to test API endpoints and ensure
 * they're working correctly with your real API.
 */

import api, { apiService, apiConfig } from './api';

/**
 * Test a specific API endpoint
 * @param name - Name of the test
 * @param apiCall - Function that calls the API
 * @param mockExpected - Whether the call is expected to work with mock data
 */
async function testEndpoint(
  name: string, 
  apiCall: () => Promise<any>,
  mockExpected: boolean = true
) {
  console.log(`Testing: ${name}`);
  
  try {
    // Test with mock API first if expected to work
    if (mockExpected) {
      const originalConfig = { ...apiConfig };
      apiConfig.USE_MOCK = true;
      
      try {
        const mockResult = await apiCall();
        console.log(`✅ Mock API call successful:`, mockResult.data);
      } catch (error) {
        console.error(`❌ Mock API call failed:`, error);
      }
      
      // Restore original config
      Object.assign(apiConfig, originalConfig);
    }
    
    // Test with real API
    apiConfig.USE_MOCK = false;
    const result = await apiCall();
    console.log(`✅ Real API call successful:`, result.data);
    return { success: true, data: result.data };
  } catch (error) {
    console.error(`❌ Real API call failed:`, error);
    return { success: false, error };
  } finally {
    // Always restore to the original setting
    apiConfig.USE_MOCK = true;
  }
}

/**
 * Run tests for all API endpoints
 */
async function testAllEndpoints() {
  // Services
  await testEndpoint('Get All Services', () => apiService.getServices());
  await testEndpoint('Get Service by ID', () => apiService.getServiceById('1'));
  await testEndpoint('Get Services by Category', () => apiService.getServicesByCategory('home'));
  await testEndpoint('Search Services', () => apiService.searchServices('plumbing'));
  
  // Bookings
  await testEndpoint('Get All Bookings', () => apiService.getBookings());
  
  // User
  await testEndpoint('Get User Profile', () => apiService.getUserProfile(), false);
  
  // Auth - these typically would not work with mock
  await testEndpoint('Login', () => 
    apiService.login({ email: 'test@example.com', password: 'password' }), 
    false
  );
}

/**
 * Test a specific endpoint by name and method
 */
async function testCustomEndpoint(
  method: 'get' | 'post' | 'put' | 'delete',
  endpoint: string,
  data?: any
) {
  console.log(`Testing custom endpoint: ${method.toUpperCase()} ${endpoint}`);
  
  try {
    apiConfig.USE_MOCK = false;
    const result = await apiService.custom(method, endpoint, data);
    console.log(`✅ API call successful:`, result.data);
    return { success: true, data: result.data };
  } catch (error) {
    console.error(`❌ API call failed:`, error);
    return { success: false, error };
  } finally {
    apiConfig.USE_MOCK = true;
  }
}

export { testEndpoint, testAllEndpoints, testCustomEndpoint }; 