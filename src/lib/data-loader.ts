import { Data, Service, Vulnerability } from './types'

export async function getAllData(): Promise<Data> {
  try {
    let url = '/data.json';
    if (typeof window === 'undefined') {
      // Estamos en el servidor
      const base =
        process.env.NEXT_PUBLIC_VERCEL_URL
          ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
          : process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : 'http://localhost:3000';
      url = `${base}/data.json`;
    }

    console.log('Fetching data from:', url);
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`Failed to fetch data.json: ${res.status} ${res.statusText}`);
      throw new Error(`No se pudo obtener data.json: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log('Data loaded successfully, services count:', data.services?.length || 0);
    return data as Data;
  } catch (error) {
    console.error('Failed to fetch or parse data.json', error);
    return { services: [] };
  }
}

export async function getServiceById(id: number): Promise<Service | undefined> {
  const { services } = await getAllData();
  return services.find(service => service.id === id);
}

export async function getVulnerabilityById(serviceId: number, vulnerabilityId: string): Promise<Vulnerability | undefined> {
  const service = await getServiceById(serviceId);
  return service?.vulnerabilities?.find(vuln => vuln.vulnerabilityId === vulnerabilityId);
}