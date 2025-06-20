import fs from 'node:fs'
import path from 'node:path'
import { Data, Service, Vulnerability } from './types'

const dataFilePath = path.join(process.cwd(), 'data.json');

let cachedData: Data | null = null;

export function getAllData(): Data {
  if (cachedData) {
    return cachedData;
  }

  try {
    const jsonData = fs.readFileSync(dataFilePath, 'utf-8');
    cachedData = JSON.parse(jsonData) as Data;
    return cachedData;
  } catch (error) {
    console.error('Failed to read or parse data.json', error)
    return { services: [] };
  }
}

export function getServiceById(id: number): Service | undefined {
  const { services } = getAllData()
  return services.find(service => service.id === id);
}

export function getVulnerabilityById(serviceId: number, vulnerabilityId: string): Vulnerability | undefined {
  const service = getServiceById(serviceId);
  return service?.vulnerabilities?.find(vuln => vuln.vulnerabilityId === vulnerabilityId)
}