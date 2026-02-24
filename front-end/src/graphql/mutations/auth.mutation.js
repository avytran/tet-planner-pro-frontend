import { gql } from "@apollo/client";

export const LOGIN = gql`
    mutation Login($input: LoginInput!) {
        login(input: $input) {
            success
            user {
                id
                email
                fullName
                createdAt
                updatedAt
            }
        }
    }
`;

export const REGISTER = gql`
    mutation Register($input: RegisterInput!) {
        register(input: $input) {
            id
            email
            fullName
            createdAt
            updatedAt
        }
    }
`;

export const FORGOT_PASSWORD = gql`
    mutation ForgotPassword($input: ForgotPasswordInput!) {
        forgotPassword(input: $input) {
            message
        }
    }
`;

export const RESET_PASSWORD = gql`
    mutation ResetPassword($input: ResetPasswordInput!) {
        resetPassword(input: $input) {
            message
        }
    }
`;

export const LOGOUT = gql`
    mutation Mutation {
        logout
    }
`;