import { gql } from "@apollo/client";

export const GET_TASKS_OF_USER = gql`
  query GetTasksOfUser($userId: String!, $params: GetTasksParams) {
    getTasksOfUser(userId: $userId, params: $params) {
      id
      category {
        id
        name
      }
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