import { GetEnterpriseListResponse, GetEnterpriseResponse } from "@/@types/api/enterprise";
import { httpRequest } from "@/http/http-client";

export class FindAllEnterprisesDto {
  search?: string;
  id?: string | number;
  perPage?: number;
  limit?: number;
  page?: number; // Página actual
}

export const getEnterpriseList = async (params: FindAllEnterprisesDto) => {
  const url = new URL("/api/enterprise", window.location.origin);

  if (params?.search) url.searchParams.append("search", params.search);
  if (params?.id) url.searchParams.append("id", params.id.toString());
  if (params?.limit) url.searchParams.append("limit", params.limit.toString());
  if (params?.perPage) url.searchParams.append("perPage", params.perPage.toString());
  if (params?.page) url.searchParams.append("page", params.page.toString()); // Añadir el parámetro page

  const result = await httpRequest<GetEnterpriseListResponse>({
    url: url.toString(),
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
