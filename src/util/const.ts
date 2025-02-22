import * as yup from "yup";

export const schema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .matches(/^\p{Lu}/u, "Name must start with a capital letter"),
  age: yup
    .number()
    .required('Age is required"')
    .positive("Age must be positive")
    .integer("Age must be an integer"),
  email: yup
    .string()
    .required("E-mail is required")
    .email("Email must have valid format"),
  password: yup
    .string()
    .required("Password is required")
    .matches(/\d/, "Password must contain a number")
    .matches(/\p{Lu}/u, "Password must contain an uppercase letter")
    .matches(/\p{Ll}/u, "Password must contain a lowercase letter")
    .matches(
      /[-+:|/\\%*#@$!?^&]/,
      'Password must contain a character from "-+/%*:#@\\$!?|^&"'
    ),
  "passwordConfirm": yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords do not match"),
  gender: yup.string().oneOf(["male", "female"]).required(),
  isAccept: yup
    .boolean()
    .required("You must accept the Terms and Conditions")
    .isTrue("You must accept the Terms and Conditions"),
});

export type FormFieldsElement = {
  name: HTMLInputElement;
  age: HTMLInputElement;
  email: HTMLInputElement;
  gender: HTMLInputElement;
  isAccept: HTMLInputElement;
};

export type DataFormFields = {
  name: string;
  age: number;
  email: string;
  gender: string;
  isAccept: boolean;
};
