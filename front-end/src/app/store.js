import { configureStore } from "@reduxjs/toolkit";
import budgetReducer from "../features/budget/budgetSlice";
import shoppingListReducer from "../features/shoppingList/shoppingListSlice";
export default configureStore({
  reducer: {
    budget: budgetReducer,
    shoppingList: shoppingListReducer,
  },
});
