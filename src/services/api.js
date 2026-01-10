const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.github.com';

/**
 * Generic fetch wrapper to handle API calls
 * @param {string} endpoint - The API endpoint to call (e.g., '/search/issues')
 * @param {Object} options - Fetch options (method, headers, body, etc.)
 * @returns {Promise<any>} - The JSON response
 */
export const apiCall = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/vnd.github.v3+json',
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    // Return null for 204 No Content
    if (response.status === 204) {
        return null;
    }

    return await response.json();
  } catch (error) {
    console.error('API Call Failed:', error);
    throw error;
  }
};
