import { gql } from "@apollo/client";

export const GET_TASKS_OF_USER = gql`
  query GetTasksOfUser($userId: String!, $params: GetTasksParams) {
    getTasksOfUser(userId: $userId, params: $params) {
      page
      pageSize
      totalItems
      totalPages
      tasks {
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
  }
`;

export const GET_TASK_BY_ID = gql`
  query Category($userId: String!, $taskId: String!) {
    getTaskOfUser(userId: $userId, taskId: $taskId) {
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

export const GET_SHOPPING_ITEMS_OF_TASK = gql`
  query GetShoppingItemsOfTask($userId: String!, $params: GetShoppingItemParams) {
    getShoppingItemsOfUser(userId: $userId, params: $params) {
      page
      pageSize
      totalItems
      totalPages
      items {
        id
        budget {
          id
          name
        }
        task {
          id
          title
        }
        name
        price
        status
        quantity
        duedTime
        timeline
        createdAt
        updatedAt
      }
    }
  }
`;