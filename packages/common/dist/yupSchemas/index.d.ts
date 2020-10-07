import * as yup from 'yup';
export declare const invalidEmal = "email must be a valid email";
export declare const emailTooShort = "email must be at least 3 characters";
export declare const passwordTooShort = "password must be at least 6 characters";
export declare const registerPasswordValidation: yup.StringSchema<string>;
export declare const validRegisterSchema: yup.ObjectSchema<yup.Shape<object | undefined, {
    email: string;
    password: string;
}>>;
