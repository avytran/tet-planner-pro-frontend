export const selectBudgetState = (state) => state.budget;

export const selectBudgets = (state) => state.budget.budgets;
export const selectTotalBudget = (state) => state.budget.totalBudget;

export const selectTotalSpending = (state) =>
  state.budget.budgets.reduce((sum, item) => sum + (item.summary || 0), 0);

export const selectTotalAllocation = (state) =>
  state.budget.budgets.reduce(
    (sum, item) => sum + (item.allocatedAmount || 0),
    0,
  );

export const selectRemaining = (state) =>
  state.budget.totalBudget -
  state.budget.budgets.reduce((sum, item) => sum + (item.summary || 0), 0);
