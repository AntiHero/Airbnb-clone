import { RegisterMutationVariables } from '../../generated/types';
interface RegisterControllerProps {
    children: (data: {
        submit: (values: RegisterMutationVariables) => Promise<null>;
    }) => JSX.Element | null;
}
export declare const RegisterController: (props: RegisterControllerProps) => JSX.Element | null;
export {};
