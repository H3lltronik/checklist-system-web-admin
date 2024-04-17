import { GetEnterpriseListResponse, GetEnterpriseResponse } from "@/@types/api/enterprise";
import { LOCAL_STORAGE_TOKEN_KEY } from "@/auth";
import { notification } from "antd";

export const getEnterpriseList = async () => {
  const storedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  const url = "/api/enterprise";
  const data = await fetch(url, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  }).then((res) => res.json());

  return data as GetEnterpriseListResponse;
};

export const getEnterpriseDetails = async (id: number) => {
  const storedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  const url = `/api/enterprise/${id}`;
  const data = await fetch(url, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      notification.error({
        message: "Ocurrio un error",
      });
      console.error(err);
      return null;
    });
  // TODO: Implementa un global error handler

  return data as GetEnterpriseResponse;
};

export const createEnterprise = async (data: EnterprisePayload) => {
  const storedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  const url = "/api/enterprise";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${storedToken}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateEnterprise = async (id: number, data: EditEnterprisePayload) => {
  const storedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  const url = `/api/enterprise/${id}`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${storedToken}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteEnterprise = async (id: number) => {
  const storedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  const url = `/api/enterprise/${id}`;
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });
  return res.json();
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
