import { gql } from "@apollo/client";

export const CREATE_TASK = gql`
    mutation CreateTaskOfUser($userId: String!, $input: TaskInput!) {
        createTaskOfUser(userId: $userId, input: $input) {
            id
            categoryId
            title
            duedTime
            timeline
            priority
            status
            createdAt
        }
    }
`;

export const UPDATE_TASK = gql`
    mutation UpdateTaskOfUser($userId: String!, $taskId: String!, $input: TaskInput!) {
        updateTaskOfUser(userId: $userId, taskId: $taskId, input: $input) {
            id
            categoryId
            title
            duedTime
            timeline
            priority
            status
            createdAt
            updatedAt
        }
    }
`;

export const DELETE_TASK = gql`
    mutation DeleteTaskOfUser($userId: String!, $taskId: String!) {
        deleteTaskOfUser(userId: $userId, taskId: $taskId) {
            message
        }
    }
`;

export const PATCH_TASK = gql`
    mutation DeleteTaskCategoryOfUser($userId: String!, $taskId: String!, $input: TaskInput!) {
        patchTaskOfUser(userId: $userId, taskId: $taskId, input: $input) {
            id
            status
        }
    }
`;