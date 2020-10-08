export declare type Maybe<T> = T | null;
export declare type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export interface Scalars {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
}
export interface Mutation {
    login?: Maybe<Array<Error>>;
    logout?: Maybe<Scalars['Boolean']>;
    register?: Maybe<Array<Error>>;
    sendForgotPasswordEmail?: Maybe<Scalars['Boolean']>;
    restorePasswordChange?: Maybe<Array<Error>>;
    dummy?: Maybe<Scalars['String']>;
}
export interface MutationLoginArgs {
    email: Scalars['String'];
    password: Scalars['String'];
}
export interface MutationRegisterArgs {
    email: Scalars['String'];
    password: Scalars['String'];
}
export interface MutationSendForgotPasswordEmailArgs {
    email: Scalars['String'];
}
export interface MutationRestorePasswordChangeArgs {
    password: Scalars['String'];
    key: Scalars['String'];
}
export interface User {
    id: Scalars['ID'];
    email: Scalars['String'];
}
export interface Query {
    me?: Maybe<User>;
    hello?: Maybe<Scalars['String']>;
}
export interface QueryHelloArgs {
    name?: Maybe<Scalars['String']>;
}
export interface Error {
    path: Scalars['String'];
    message: Scalars['String'];
}
export declare type RegisterMutationVariables = Exact<{
    email: Scalars['String'];
    password: Scalars['String'];
}>;
export declare type RegisterMutation = {
    register?: Maybe<Array<{
        message: string;
    }>>;
};
