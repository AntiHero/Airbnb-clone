// import { passwordTooShort } from './modules/user/register/errorMessages';
import { passwordTooShort } from '@abb/common';
import * as yup from "yup";


export const registerPasswordValidation = yup.string().min(6, passwordTooShort).max(255).required();