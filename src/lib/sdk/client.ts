const API_BASE_URL = typeof window !== 'undefined' 
  ? `${window.location.origin}/api` 
  : process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  // During build time in production, return empty data to prevent API calls
  if (process.env.NODE_ENV === 'production' && typeof window === 'undefined') {
    return [] as unknown as T;
  }

  const url = new URL(`${API_BASE_URL}${endpoint}`);
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