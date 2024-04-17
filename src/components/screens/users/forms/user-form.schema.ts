import { FormRules } from "@/@types/common";

interface UserFormFields {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
  roleId: string;
  enterpriseId: string;
}

const userFormRules: FormRules<UserFormFields> = {
  name: [
    {
      required: true,
      message: "Este campo es requerido",
    },
  ],
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
        if (!value || getFieldValue(["credential", "password"]) === value) {
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

export const buildUserFormRules = (editMode: boolean): FormRules<UserFormFields> => {
  if (!editMode) {
    return userFormRules;
  } else {
    return {
      ...userFormRules,
      password: [
        () => ({
          validator(_, value) {
            if (!value) {
              return Promise.resolve();
            }
            if (value.length < 6) {
              return Promise.reject(new Error("La contraseña debe tener al menos 6 caracteres"));
            }
            return Promise.resolve();
          },
        }),
      ],
      confirmPassword: [
        ({ getFieldValue }) => ({
          validator(_, value) {
            const password = getFieldValue(["credential", "password"]);
            if (!password) {
              return Promise.resolve();
            }
            if (value !== password) {
              return Promise.reject(new Error("Las contraseñas no coinciden"));
            }
            return Promise.resolve();
          },
        }),
      ],
    };
  }
};
