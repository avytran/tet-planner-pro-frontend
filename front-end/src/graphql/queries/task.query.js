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

export const GET_SHOPPING_ITEMS_OF_TASK = gql`
  query GetShoppingItemsOfTask($taskId: String!) {
    getShoppingItemsOfTask(taskId: $taskId) {
      id
      name
      duedTime
      price
      category
      quantity
      status
    }
  }
`;

export const GET_SHOPPING_ITEMS_COUNT = gql`
  query GetShoppingItemsCount($taskIds: [String!]!) {
    getShoppingItemsCounts(taskIds: $taskIds) {
      taskId
      count
    }
  }
`;
