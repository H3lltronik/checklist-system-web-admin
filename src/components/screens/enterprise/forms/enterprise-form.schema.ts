import { FormRules } from "@/@types/common";

interface EnterpriseFormFields {
  id?: string;
  name: string;
  phone: string;
  email: string;
  userId: string;
  rfc: string;
  postalCode: string;
  streetName: string;
  interiorNumber: string;
  locationName: string;
  state: string;
  streetType: string;
  exteriorNumber: string;
  neighborhood: string;
  municipality: string;
  betweenStreets: string;
}

export const enterpriseFormRules: FormRules<EnterpriseFormFields> = {
  email: [
    {
      required: true,
      message: "Este campo es requerido",
    },
    {
      type: "email",
      message: "El email no es válido",
    },
  ],
  name: [
    {
      required: true,
      message: "Este campo es requerido",
    },
  ],
  phone: [
    {
      required: true,
      message: "Este campo es requerido",
    },
  ],
  userId: [
    {
      required: true,
      message: "Este campo es requerido",
    },
  ],
  rfc: [
    {
      required: true,
      message: "Este campo es requerido",
    },
  ],
  postalCode: [
    {
      required: true,
      message: "Este campo es requerido",
    },
  ],
  streetName: [
    {
      required: true,
      message: "Este campo es requerido",
    },
  ],
  streetType: [
    {
      required: false,
      message: "Este campo es requerido",
    },
  ],
  exteriorNumber: [
    {
      required: true,
      message: "Este campo es requerido",
    },
  ],
  interiorNumber: [
    {
      required: false,
      message: "Este campo es requerido",
    },
  ],
  neighborhood: [
    {
      required: true,
      message: "Este campo es requerido",
    },
  ],
  locationName: [
    {
      required: true,
      message: "Este campo es requerido",
    },
  ],
  municipality: [
    {
      required: true,
      message: "Este campo es requerido",
    },
  ],
  state: [
    {
      required: true,
      message: "Este campo es requerido",
    },
  ],
  betweenStreets: [
    {
      required: false,
      message: "Este campo es requerido",
    },
  ],
};
