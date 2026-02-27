import { gql } from "@apollo/client";

export const GET_TASK_CATEGORIES = gql`
    query GetTaskCategoriesOfUser($userId: String!) {
        getTaskCategoriesOfUser(userId: $userId) {
            id
            userId
            name
        }
    }
`;