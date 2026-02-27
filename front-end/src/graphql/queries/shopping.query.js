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