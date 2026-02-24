import { gql } from "@apollo/client";

export const CREATE_SHOPPING_ITEM = gql`
  mutation CreateShoppingItem($input: CreateShoppingItemInput!) {
    createShoppingItem(input: $input) {
      id
      name
      duedTime
      price
      category
      quantity
      status
      taskId
    }
  }
`;

export const UPDATE_SHOPPING_ITEM = gql`
  mutation UpdateShoppingItem($id: String!, $input: UpdateShoppingItemInput!) {
    updateShoppingItem(id: $id, input: $input) {
      id
      name
      duedTime
      price
      category
      quantity
      status
      taskId
    }
  }
`;

export const DELETE_SHOPPING_ITEM = gql`
  mutation DeleteShoppingItem($id: String!) {
    deleteShoppingItem(id: $id)
  }
`;
