/* eslint-disable @typescript-eslint/no-explicit-any */
const API_URL = 'https://localhost:7198';

const fetchAPI = async (url: string, options: RequestInit = {}) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers, 
    };

    const response = await fetch(`${API_URL}${url}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || `Error fetching ${url}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API call to ${url} failed:`, error);
    throw error;
  }
};

export const api = {
  get: (url: string) => {
    return fetchAPI(url, { method: 'GET' });
  },

  post: (url: string, data: any) => {
    return fetchAPI(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  put: (url: string, data: any) => {
    return fetchAPI(url, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: (url: string) => {
    return fetchAPI(url, { method: 'DELETE' });
  },
};
