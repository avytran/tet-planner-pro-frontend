import { gql } from "@apollo/client";

export const GET_TOTAL_BUDGET = gql`
  query GetTotalBudget($userId: String!) {
    getTotalBudget(userId: $userId) {
      totalBudget
    }
  }
`;

export const GET_BUDGETS = gql`
  query GetBudgetsOfUser($userId: String!) {
    getBudgetsOfUser(userId: $userId) {
      allocatedAmount
      id
      name
      summary
    }
  }
`;

export const GET_BUDGETS_BY_ID = gql`
  query GetBudgetByIdOfUser($budgetId: String!, $userId: String!) {
    getBudgetByIdOfUser(id: $budgetId, userId: $userId) {
      id
      name
      allocatedAmount
      summary
    }
  }
`;
export const GET_SPENDING_TIMELINE = gql`
  query GetSpendingTimelineOfUser($userId: String!) {
    getSpendingTimelineOfUser(userId: $userId) {
      dates
      series {
        data
        label
      }
    }
  }
`;
