import { gql } from "@apollo/client";

export const CREATE_SHOPPING_ITEM = gql`
    mutation CreateShoppingItemOfUser($userId: String!, $input: ShoppingItemInput!) {
        createShoppingItemOfUser(userId: $userId, input: $input) {
            id
            name
            duedTime
            price
            category: budgetId
            quantity
            status
        }
    }
`;

export const UPDATE_SHOPPING_ITEM = gql`
    mutation UpdateShoppingItemOfUser($userId: String!, $itemId: String!, $input: ShoppingItemInput!) {
        updateShoppingItemOfUser(userId: $userId, itemId: $itemId, input: $input) {
            id
            name
            duedTime
            price
            category: budgetId
            quantity
            status
        }
    }
`;

export const DELETE_SHOPPING_ITEM = gql`
    mutation DeleteShoppingItemOfUser($userId: String!, $itemId: String!) {
        deleteShoppingItemOfUser(userId: $userId, itemId: $itemId) {
            message
        }
    }
`;