import { gql } from "@apollo/client";

export const LOGIN = gql`
    mutation Login($input: LoginInput!) {
        login(input: $input) {
            accessToken
            refreshToken
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
