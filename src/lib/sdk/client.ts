// Use environment variable or fallback to avoid hydration mismatches
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  // Determine if we're on server side
  const isServer = typeof window === 'undefined';
  
  let url: string;
  
  if (isServer) {
    // For server-side requests, we need an absolute URL
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXTAUTH_URL 
      ? process.env.NEXTAUTH_URL
      : 'http://localhost:3000';
    
    url = `${baseUrl}${API_BASE_URL}${endpoint}`;
  } else {
    // For client-side requests, relative URLs work fine
    url = `${API_BASE_URL}${endpoint}`;
  }
  
  console.log('SDK fetchApi - URL:', url);
  console.log('SDK fetchApi - Environment:', {
    NODE_ENV: process.env.NODE_ENV,
    API_BASE_URL,
    isServer,
    VERCEL_URL: process.env.VERCEL_URL
  });

  try {
    const response = await fetch(url, options);
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