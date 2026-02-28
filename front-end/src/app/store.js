import { configureStore } from "@reduxjs/toolkit";
import budgetReducer from "../features/budget/budgetSlice";
import shoppingListReducer from "../features/shoppingList/shoppingListSlice";
import undoRedoReducer from "../features/undoRedo/undoRedoSlice";
export default configureStore({
  reducer: {
    budget: budgetReducer,
    shoppingList: shoppingListReducer,
    undoRedo: undoRedoReducer,
  },
});
