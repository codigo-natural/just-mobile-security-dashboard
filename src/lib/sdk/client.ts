// Use environment variable or fallback to avoid hydration mismatches
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = new URL(`${API_BASE_URL}${endpoint}`);

  console.log('SDK fetchApi - URL:', url.toString());
  console.log('SDK fetchApi - Environment:', {
    NODE_ENV: process.env.NODE_ENV,
    API_BASE_URL
  });

  try {
    const response = await fetch(url.toString(), options);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(`API Error: ${response.status} ${errorData.message || response.statusText}`);
    }
    return response.json() as Promise<T>;
  } catch (error) {
    console.error(`SDK fetch error for ${url}: `, error);
    throw error;
  }
}

export default fetchApi;