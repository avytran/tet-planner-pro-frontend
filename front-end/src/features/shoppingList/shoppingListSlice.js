import { createSlice } from "@reduxjs/toolkit";
import {
  fetchShoppingItemsByTimeline,
  fetchTopCostShoppingItems,
} from "./shoppingListThunk";

const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState: {
    topCostItems: [],
    itemsByTimeline: {
      preTet: [],
      duringTet: [],
      afterTet: [],
      today: [],
    },
    status: {
      topCost: "idle",
      timeline: "idle",
    },

    error: {
      topCost: null,
      timeline: null,
    },
  },
  reducers: {
    removeItemsByBudgetId: (state, action) => {
      const budgetIdToRemove = action.payload;
      state.topCostItems = state.topCostItems.filter(
        (item) => item.budget.id !== budgetIdToRemove,
      );

      Object.keys(state.itemsByTimeline).forEach((timeline) => {
        state.itemsByTimeline[timeline] = state.itemsByTimeline[
          timeline
        ].filter((item) => item.budget.id !== budgetIdToRemove);
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopCostShoppingItems.pending, (state) => {
        state.status.topCost = "loading";
      })
      .addCase(fetchTopCostShoppingItems.fulfilled, (state, action) => {
        state.status.topCost = "succeeded";
        state.topCostItems = action.payload;
      })
      .addCase(fetchTopCostShoppingItems.rejected, (state, action) => {
        state.status.topCost = "failed";
        state.error.topCost = action.payload;
      })
      .addCase(fetchShoppingItemsByTimeline.pending, (state) => {
        state.timelineStatus = "loading";
      })
      .addCase(fetchShoppingItemsByTimeline.fulfilled, (state, action) => {
        state.timelineStatus = "succeeded";
        state.itemsByTimeline = action.payload;
      })
      .addCase(fetchShoppingItemsByTimeline.rejected, (state, action) => {
        state.timelineStatus = "failed";
        state.timelineError = action.payload;
      });
  },
});
export const { removeItemsByBudgetId } = shoppingListSlice.actions;
export default shoppingListSlice.reducer;
