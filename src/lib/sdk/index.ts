import fetchApi from "./client";
import { Service } from "../types";

export const getServices = (): Promise<Service[]> => {
  return fetchApi<Service[]>('/services')
}

export const getServiceById = (id: number): Promise<Service> => {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error('Invalid service ID');
  }
  return fetchApi<Service>(`/services/${id}`);
}