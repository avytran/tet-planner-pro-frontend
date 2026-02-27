import { gql } from '@apollo/client';

export const GET_SHOPPING_LIST_DATA = gql`
    query ShoppingListData($userId: String!, $params: GetShoppingItemParams) {
        getShoppingItemsOfUser(userId: $userId, params: $params) {
            items {
                id
                name
                price
                status
                quantity
                duedTime
                timeline
                task {
                    id
                    title
                }
                budget {
                    id
                    name
                }
            }
        }

        getBudgetsOfUser(userId: $userId) {
            id
            name
            allocatedAmount
        }

        getTasksOfUser(userId: $userId) {
            tasks {
                id
                title
                category {
                    id
                    name
                }
            }
        }
            
        getTotalBudget(userId: $userId) {
            totalBudget
        }
    }
`;

export const GET_SHOPPING_FORM_DATA = gql`
    query ShoppingFormData($userId: String!) {
        getBudgetsOfUser(userId: $userId) {
            id
            name
        }

        getTasksOfUser(userId: $userId) {
            tasks {
                id
                title
                category {
                    id
                    name
                    }
            }
        }
    }
`;

export const GET_SHOPPING_ITEMS_OF_TASK = gql`
  query GetShoppingItemsOfTask($userId: String!, $params: GetShoppingItemParams) {
    getShoppingItemsOfUser(userId: $userId, params: $params) {
      items {
        id
        budget {
          id
          name
        }
        name
        price
        status
        quantity
        duedTime
      }
    }
  }
`;