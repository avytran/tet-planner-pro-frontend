import { gql } from "@apollo/client";

export const GET_TASKS = gql`
    query GetTasksOfUser($userId: String!) {
        getTasks: getTasksOfUser(userId: $userId) {
            categoryId
            status
            timeline
        }
    }
`;

export const GET_TASK_CATEGORY = gql`
    query GetTaskCategoryByIdOfUser($userId: String!, $categoryId: String!) {
        getTaskCategory: getTaskCategoryByIdOfUser(userId: $userId, categoryId: $categoryId) {
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
                status
                duedTime
                    budget {
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