"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validRegisterSchema = exports.registerPasswordValidation = exports.passwordTooShort = exports.emailTooShort = exports.invalidEmal = void 0;
const yup = require("yup");
exports.invalidEmal = "email must be a valid email";
exports.emailTooShort = "email must be at least 3 characters";
exports.passwordTooShort = "password must be at least 6 characters";
exports.registerPasswordValidation = yup.string().min(6, exports.passwordTooShort).max(255).required();
exports.validRegisterSchema = yup.object().shape({
    email: yup
        .string()
        .min(3, exports.emailTooShort)
        .max(255)
        .email(exports.invalidEmal)
        .required(),
    password: exports.registerPasswordValidation,
});
