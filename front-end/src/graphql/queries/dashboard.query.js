import { gql } from "@apollo/client";

export const TASKS_GRAPH = gql`
    query GetTasksOfUser($userId: String!) {
        getTasksOfUser(userId: $userId) {
            status
            timeline
        }
    }
`;

export const ITEMS_GRAPH = gql`
    query GetShoppingItemsOfUser($userId: String!) {
        getShoppingItemsOfUser(userId: $userId) {
            items {
            status
            timeline
            }
        }
    }
`;

export const BUDGET_PROGRESS = gql`

`;

export const TIMELINE_GRAPH = gql`

`;

export const CATEGORY_GRAPH = gql`

`;