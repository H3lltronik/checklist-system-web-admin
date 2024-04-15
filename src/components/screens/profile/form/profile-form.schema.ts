import { FormRules } from "@/@types/common";

interface RoleFormFields {
  name: string;
}

export const roleFormRules: FormRules<RoleFormFields> = {
  name: [
    {
      required: true,
      message: "Este campo es requerido",
    },
  ],
};
