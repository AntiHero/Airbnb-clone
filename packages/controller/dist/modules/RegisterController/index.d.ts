interface RegisterControllerProps {
    children: (data: {
        submit: (values: any) => Promise<null>;
    }) => JSX.Element | null;
}
export declare const RegisterController: (props: RegisterControllerProps) => JSX.Element;
export {};
