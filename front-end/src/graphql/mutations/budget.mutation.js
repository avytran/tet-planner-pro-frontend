import { gql } from "@apollo/client";

export const UPDATE_TOTAL_BUDGET = gql`
  mutation UpdateTotalBudget(
    $userId: String!
    $input: UpdateTotalBudgetInput!
  ) {
    updateTotalBudget(userId: $userId, input: $input) {
      totalBudget
    }
  }
`;
export const DELETE_BUDGET = gql`
  mutation DeleteBudgetOfUser(
    $deleteBudgetOfUserId: String!
    $userId: String!
  ) {
    deleteBudgetOfUser(id: $deleteBudgetOfUserId, userId: $userId) {
      message
    }
  }
`;
export const CREATE_BUDGET = gql`
  mutation CreateBudgetOfUser($input: BudgetInput!) {
    createBudgetOfUser(input: $input) {
      id
      allocatedAmount
      name
      summary
    }
  }
`;
export const UPDATE_BUDGET = gql`
  mutation UpdateBudgetOfUser(
    $updateBudgetOfUserId: String!
    $input: BudgetInput!
  ) {
    updateBudgetOfUser(id: $updateBudgetOfUserId, input: $input) {
      id
      name
      allocatedAmount
      summary
    }
  }
`;
export const RESET_BUDGET = gql`
  mutation DeleteAllBudgetsOfUser($userId: String!) {
    deleteAllBudgetsOfUser(userId: $userId) {
      deletedBudgets
      deletedShoppingItems
      message
    }
  }
`;
