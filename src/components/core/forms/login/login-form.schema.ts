import { Rule } from "rc-field-form/lib/interface";

interface FormRules {
  [key: string]: Rule[];
}

export const loginFormRules: FormRules = {
  username: [
    {
      required: true,
      message: "Este campo es requerido",
    },
  ],
  password: [
    {
      required: true,
      message: "Este campo es requerido",
    },
  ],
};
