/**
 * Postman Collection Importer Utility
 * 
 * This utility helps import Postman collection endpoints into the apiConfig file.
 * You can copy your Postman collection JSON here and run this file to generate 
 * endpoint mappings that can be added to your apiConfig.ts file.
 */

interface PostmanItem {
  name: string;
  request: {
    method: string;
    url: {
      raw: string;
      protocol?: string;
      host?: string[];
      path?: string[];
      query?: Array<{ key: string; value: string }>;
    };
  };
  item?: PostmanItem[];
}

interface PostmanCollection {
  info: {
    name: string;
    schema: string;
  };
  item: PostmanItem[];
}

/**
 * Extract endpoint from a Postman request URL
 */
function extractEndpoint(item: PostmanItem): string {
  const { url } = item.request;
  
  // If it's just a path without host
  if (url.path && !url.host) {
    return '/' + url.path.join('/');
  }
  
  // Extract the path after the domain
  let endpoint = '';
  if (url.path) {
    endpoint = '/' + url.path.join('/');
  }
  
  // Add query parameters if they exist
  if (url.query && url.query.length > 0) {
    endpoint += '?';
    url.query.forEach((q, index) => {
      if (index > 0) endpoint += '&';
      endpoint += `${q.key}=${q.value}`;
    });
  }
  
  return endpoint;
}

/**
 * Process a Postman collection and generate endpoint mappings
 */
function processPostmanCollection(collection: PostmanCollection): Record<string, any> {
  const endpoints: Record<string, any> = {};
  
  function processItems(items: PostmanItem[], prefix = '') {
    items.forEach(item => {
      // If it's a folder
      if (item.item) {
        processItems(item.item, `${prefix}${item.name}_`);
        return;
      }
      
      // It's an endpoint
      const endpointName = `${prefix}${item.name}`
        .toUpperCase()
        .replace(/\s+/g, '_')
        .replace(/[^A-Z0-9_]/g, '');
      
      const endpointPath = extractEndpoint(item);
      
      // Replace any path parameters with :param format
      const formattedPath = endpointPath.replace(/\{\{([^}]+)\}\}/g, (match, p1) => {
        return `:${p1.toLowerCase()}`;
      });
      
      endpoints[endpointName] = {
        mock: formattedPath, // You may need to adjust this for your mock API
        real: formattedPath,
        method: item.request.method
      };
    });
  }
  
  processItems(collection.item);
  return endpoints;
}

/**
 * Example usage:
 * 
 * 1. Export your Postman collection as JSON
 * 2. Paste the JSON content here
 * 3. Run this file using Node.js
 * 4. Copy the output and add it to your apiConfig.ts file
 */

// Paste your Postman collection JSON here
const postmanCollectionJson = `
{
  "info": {
    "name": "Your API Collection",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Services",
      "item": [
        {
          "name": "Get All Services",
          "request": {
            "method": "GET",
            "url": {
              "raw": "{{baseUrl}}/services",
              "host": ["{{baseUrl}}"],
              "path": ["services"]
            }
          }
        }
      ]
    }
  ]
}
`;

// This function would be used in Node.js to output the endpoints
function generateEndpointConfig() {
  try {
    const collection = JSON.parse(postmanCollectionJson);
    const endpoints = processPostmanCollection(collection);
    
    console.log('Generated endpoint config:');
    console.log(JSON.stringify(endpoints, null, 2));
    
    return endpoints;
  } catch (error) {
    console.error('Error processing Postman collection:', error);
    return {};
  }
}

// To use this in your application:
// Replace the placeholder `postmanCollectionJson` with your actual Postman collection
// Then call generateEndpointConfig() to get the endpoint mapping

export { processPostmanCollection, generateEndpointConfig }; 