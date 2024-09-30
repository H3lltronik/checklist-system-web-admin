import { UserPermissions } from "@/@types/auth";
import { FormRules } from "@/@types/common";
import { Action, createAbilityForUser, Subjects } from "@/abilities";

interface UserFormFields {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
  roleId: string;
  enterpriseId: string;
}

const passwordPolicyValidator = (password: string) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length < minLength) {
    return "La contraseña debe tener al menos 8 caracteres.";
  }
  if (!hasUpperCase) {
    return "La contraseña debe contener al menos una letra mayúscula.";
  }
  if (!hasLowerCase) {
    return "La contraseña debe contener al menos una letra minúscula.";
  }
  if (!hasNumber) {
    return "La contraseña debe contener al menos un número.";
  }
  if (!hasSymbol) {
    return "La contraseña debe contener al menos un carácter especial.";
  }
  return null;
};

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
      validator(_, value) {
        if (!value) {
          return Promise.resolve();
        }
        const errorMessage = passwordPolicyValidator(value);
        if (errorMessage) {
          return Promise.reject(new Error(errorMessage));
        }
        return Promise.resolve();
      },
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

export const buildUserFormRules = (params: { editMode: boolean, permissions?: UserPermissions }): FormRules<UserFormFields> => {
  const { editMode, permissions } = params;
  const ability = createAbilityForUser(permissions);

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
            const errorMessage = passwordPolicyValidator(value);
            if (errorMessage) {
              return Promise.reject(new Error(errorMessage));
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

            if (value !== password && !ability.can(Action.Manage, Subjects.ScreenAll)) {
              return Promise.reject(new Error("Las contraseñas no coinciden"));
            }
            return Promise.resolve();
          },
        }),
      ],
    };
  }
};
