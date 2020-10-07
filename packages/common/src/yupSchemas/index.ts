import * as yup from 'yup';

export const invalidEmal = "email must be a valid email";
export const emailTooShort = "email must be at least 3 characters";
export const passwordTooShort = "password must be at least 6 characters";

export const registerPasswordValidation = yup.string().min(6, passwordTooShort).max(255).required();

export const validRegisterSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, emailTooShort)
    .max(255)
    .email(invalidEmal)
    .required(),
  password: registerPasswordValidation,
});

