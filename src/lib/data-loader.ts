import { Data, Service, Vulnerability } from './types'

export async function getAllData(): Promise<Data> {
  try {
    let url = '/data.json';
    if (typeof window === 'undefined') {
      // Estamos en el servidor
      const base =
        process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : process.env.NEXT_PUBLIC_VERCEL_URL
          ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
          : 'http://localhost:3000';
      url = `${base}/data.json`;
    }
    const res = await fetch(url);
    if (!res.ok) throw new Error('No se pudo obtener data.json');
    const data = await res.json();
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