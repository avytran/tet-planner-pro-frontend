import { gql } from "@apollo/client";

export const GET_TASKS_TOTAL = gql`
    query GetTasksOfUser($userId: String!) {
        getTotalTasks: getTasksOfUser(userId: $userId) {
            totalItems
        }
    }
`;

export const GET_ITEMS_TOTAL = gql`
    query GetShoppingItemsOfUser($userId: String!) {
        getTotalItems: getShoppingItemsOfUser(userId: $userId) {
            totalItems
        }
    }
`;

export const GET_TASKS = gql`
    query GetTasksOfUser($userId: String!, $params: GetTasksParams) {
        getTasks: getTasksOfUser(userId: $userId, params: $params) {
            tasks {
                category {
                    id
                    name
                }
                status
                timeline
                duedTime
            }
        }
    }

`;

export const GET_TASK_CATEGORY = gql`
    query GetTaskCategoriesOfUser($userId: String!) {
        getTaskCategory: getTaskCategoriesOfUser(userId: $userId) {
            id
            name
        }
    }
`;

export const GET_ITEMS = gql`
    query GetShoppingItemsOfUser($userId: String!, $params: GetShoppingItemParams) {
        getItems: getShoppingItemsOfUser(userId: $userId, params: $params) {
            items {
                price
                quantity
                timeline
                status
                duedTime
                budget {
                    id
                    name
                }
            }
        }
    }
`;