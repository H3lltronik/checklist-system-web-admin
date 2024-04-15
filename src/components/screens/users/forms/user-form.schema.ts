import { FormRules } from "@/@types/common";

interface UserFormFields {
  username: string;
  password: string;
  confirmPassword: string;
  roleId: string;
  enterpriseId: string;
}

const userFormRules: FormRules<UserFormFields> = {
  username: [
    {
      required: true,
      message: "Este campo es requerido",
    },
    {
      type: "email",
      message: "El email no es válido",
    },
  ],
  password: [
    {
      required: true,
      message: "Este campo es requerido",
    },
    {
      min: 6,
      message: "La contraseña debe tener al menos 6 caracteres",
    },
  ],
  confirmPassword: [
    {
      required: true,
      message: "Este campo es requerido",
    },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue("password") === value) {
          return Promise.resolve();
        }
        return Promise.reject(new Error("Las contraseñas no coinciden"));
      },
    }),
  ],
  roleId: [
    {
      required: true,
      message: "Este campo es requerido",
    },
  ],
  enterpriseId: [
    {
      required: true,
      message: "Este campo es requerido",
    },
  ],
};

export const buildUserFormRules = (editMode: boolean) => {
  return !editMode ? userFormRules : { ...userFormRules, confirmPassword: [], password: [] };
};
