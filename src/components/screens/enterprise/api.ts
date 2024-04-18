import { GetEnterpriseListResponse, GetEnterpriseResponse } from "@/@types/api/enterprise";
import { httpRequest } from "@/http/http-client";

export const getEnterpriseList = async () => {
  const result = await httpRequest<GetEnterpriseListResponse>({
    url: "/api/enterprise",
    method: "GET",
  });

  return result.data;
};

export const getEnterpriseDetails = async (id: number) => {
  const result = await httpRequest<GetEnterpriseResponse>({
    url: `/api/enterprise/${id}`,
    method: "GET",
  });

  return result.data;
};

export const createEnterprise = async (data: EnterprisePayload) => {
  const result = await httpRequest({
    url: "/api/enterprise",
    method: "POST",
    body: JSON.stringify(data),
  });

  if (result.error) throw new Error(result.errorMessage);
  return result.data;
};

export const updateEnterprise = async (id: number, data: EditEnterprisePayload) => {
  const result = await httpRequest({
    url: `/api/enterprise/${id}`,
    method: "PATCH",
    body: JSON.stringify(data),
  });

  if (result.error) throw new Error(result.errorMessage);
  return result.data;
};

export const deleteEnterprise = async (id: number) => {
  const result = await httpRequest({
    url: `/api/enterprise/${id}`,
    method: "DELETE",
  });

  if (result.error) throw new Error(result.errorMessage);
  return result.data;
};

export interface EnterprisePayload {
  name: string;
  rfc: string;
  phone: string;
  email: string;
  postalCode: string;
  streetName: string;
  streetType: string;
  exteriorNumber: string;
  interiorNumber: string;
  neighborhood: string;
  locationName: string;
  municipality: string;
  state: string;
  betweenStreets: string;
}

export interface EditEnterprisePayload extends EnterprisePayload {}
