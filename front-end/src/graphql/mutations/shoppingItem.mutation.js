import { gql } from "@apollo/client";

export const DELETE_SHOPPING_ITEM = gql`
  mutation Mutation($userId: String!, $itemId: String!) {
    deleteShoppingItemOfUser(userId: $userId, itemId: $itemId) {
      message
    }
  }
`;
