"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterController = void 0;
const client_1 = require("@apollo/client");
const registerMutation = client_1.gql `
  mutation Register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      message
    }
  }
`;
exports.RegisterController = (props) => {
    const [register] = client_1.useMutation(registerMutation);
    const submit = (values) => __awaiter(void 0, void 0, void 0, function* () {
        const { data } = yield register({
            variables: values,
        });
        return data;
    });
    return props.children({ submit });
};
