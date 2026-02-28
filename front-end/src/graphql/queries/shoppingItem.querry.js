import { gql } from "@apollo/client";

export const GET_TOP_COST_SHOPPING_ITEMS = gql`
  query GetShoppingItemsOfUser(
    $userId: String!
    $params: GetShoppingItemParams
  ) {
    getShoppingItemsOfUser(userId: $userId, params: $params) {
      items {
        id
        name
        price
        quantity
        budget {
          id
          name
        }
      }
    }
  }
`;

export const GET_SHOPPING_ITEMS_GROUPED_BY_TIMELINE = gql`
  query GetShoppingItemsOfUser(
    $userId: String!
    $preTetParams: GetShoppingItemParams
    $duringTetParams: GetShoppingItemParams
    $afterTetParams: GetShoppingItemParams
    $todayParams: GetShoppingItemParams
  ) {
    preTet: getShoppingItemsOfUser(userId: $userId, params: $preTetParams) {
      items {
        id
        budget {
          name
        }
        duedTime
        name
        price
        quantity
        status
        timeline
      }
    }

    duringTet: getShoppingItemsOfUser(
      userId: $userId
      params: $duringTetParams
    ) {
      items {
        id
        budget {
          id
          name
        }
        duedTime
        name
        price
        quantity
        status
        timeline
      }
    }

    afterTet: getShoppingItemsOfUser(userId: $userId, params: $afterTetParams) {
      items {
        id
        budget {
          id
          name
        }
        duedTime
        name
        price
        quantity
        status
        timeline
      }
    }

    today: getShoppingItemsOfUser(userId: $userId, params: $todayParams) {
      items {
        id
        budget {
          id
          name
        }
        duedTime
        name
        price
        quantity
        status
        timeline
      }
    }
  }
`;
