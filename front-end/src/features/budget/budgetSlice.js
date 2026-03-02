import { createSlice } from "@reduxjs/toolkit";
import {
  createBudgetThunk,
  deleteBudgetThunk,
  fetchBudgetData,
  fetchBudgetTotal,
  getSpendingTimelineThunk,
  resetBudgetThunk,
  updateBudgetThunk,
  updateTotalBudgetThunk,
} from "./budgetThunks";

const budgetSlice = createSlice({
  name: "budget",
  initialState: {
    totalBudget: 0,
    budgets: [],
    spendingTimeline: { dates: [], series: [] },
    status: "idle",
    error: null,
    selectedBudgetId: null,
  },
  reducers: {
    setTotalBudget: (state, action) => {
      state.totalBudget = action.payload;
    },
    setSelectedBudgetId: (state, action) => {
      state.selectedBudgetId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBudgetTotal.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBudgetTotal.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.totalBudget = action.payload;
      })
      .addCase(fetchBudgetTotal.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchBudgetData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBudgetData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.budgets = action.payload;
      })
      .addCase(fetchBudgetData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateTotalBudgetThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTotalBudgetThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.totalBudget = action.payload;
      })
      .addCase(updateTotalBudgetThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteBudgetThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteBudgetThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.budgets = state.budgets.filter(
          (budget) => budget.id !== action.payload,
        );
      })
      .addCase(deleteBudgetThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createBudgetThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createBudgetThunk.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.budgets.push(action.payload);
      })
      .addCase(createBudgetThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateBudgetThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateBudgetThunk.fulfilled, (state, action) => {
        state.status = "succeeded";

        const updatedBudget = action.payload;

        const index = state.budgets.findIndex((b) => b.id === updatedBudget.id);

        if (index !== -1) {
          state.budgets[index] = updatedBudget;
        }
      })
      .addCase(updateBudgetThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(resetBudgetThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetBudgetThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.budgets = [];
        state.totalBudget = 0;
        state.spendingTimeline = { dates: [], series: [] };
      })
      .addCase(resetBudgetThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getSpendingTimelineThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSpendingTimelineThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.spendingTimeline = action.payload;
      })
      .addCase(getSpendingTimelineThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setTotalBudget, setSelectedBudgetId } = budgetSlice.actions;

export default budgetSlice.reducer;
