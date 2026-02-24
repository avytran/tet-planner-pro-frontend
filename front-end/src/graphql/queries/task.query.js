import { gql } from "@apollo/client";

export const GET_TASKS_OF_USER = gql`
  query GetTasksOfUser($userId: String!) {
    getTasksOfUser(userId: $userId) {
      id
      title
      duedTime
      categoryId
      priority
      status
      timeline
      createdAt
      updatedAt
    }
  }
`;