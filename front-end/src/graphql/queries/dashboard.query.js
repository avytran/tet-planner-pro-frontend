import { gql } from "@apollo/client";

export const GET_TASKS = gql`
    query GetTasksOfUser($userId: String!) {
        getTasks: getTasksOfUser(userId: $userId) {
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
    query GetShoppingItemsOfUser($userId: String!) {
        getItems:getShoppingItemsOfUser(userId: $userId) {
            items {
                price
                quantity
                timeline
                status
                updatedAt
                duedTime
                budget {
                    id
                    name
                }
            }
        }
    }
`;

export const GET_TOTAL_BUDGET = gql`
    query GetTotalBudget($userId: String!) {
        getTotalBudget(userId: $userId) {
            totalBudget
        }
    }
`;