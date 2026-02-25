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
