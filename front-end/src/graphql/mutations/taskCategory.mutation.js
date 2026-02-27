import { gql } from "@apollo/client";

export const CREATE_TASK_CATEGORY = gql`
    mutation Mutation($userId: String!, $input: TaskCategoryInput!) {
        createTaskCategoryOfUser(userId: $userId, input: $input) {
            id
            userId
            name
        }
    }
`;

export const DELETE_TASK_CATEGORY = gql`
    mutation DeleteTaskCategoryOfUser($userId: String!, $categoryId: String!) {
        deleteTaskCategoryOfUser(userId: $userId, categoryId: $categoryId) {
            message
        }
    }
`;