// Use environment variable or fallback to avoid hydration mismatches
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  // For relative URLs, construct the path directly instead of using URL constructor
  const urlPath = `${API_BASE_URL}${endpoint}`;
  
  console.log('SDK fetchApi - URL Path:', urlPath);
  console.log('SDK fetchApi - Environment:', {
    NODE_ENV: process.env.NODE_ENV,
    API_BASE_URL
  });

  try {
    const response = await fetch(urlPath, options);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(`API Error: ${response.status} ${errorData.message || response.statusText}`);
    }
    return response.json() as Promise<T>;
  } catch (error) {
    console.error(`SDK fetch error for ${urlPath}: `, error);
    throw error;
  }
}

export default fetchApi;