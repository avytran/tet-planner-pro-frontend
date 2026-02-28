import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBudgets,
  selectRemaining,
  selectTotalAllocation,
  selectTotalBudget,
  selectTotalSpending,
  selectBudgetState,
  selectSpendingTimeline,
} from "../features/budget/budgetSelectors";
import {
  fetchBudgetData,
  fetchBudgetTotal,
  getSpendingTimelineThunk,
} from "@/features/budget/budgetThunks";

export const useBudget = (userId) => {
  const dispatch = useDispatch();

  const budgets = useSelector(selectBudgets);
  const totalBudget = useSelector(selectTotalBudget);
  const totalSpending = useSelector(selectTotalSpending);
  const totalAllocation = useSelector(selectTotalAllocation);
  const remaining = useSelector(selectRemaining);
  const spendingTimeline = useSelector(selectSpendingTimeline);
  const { status, error } = useSelector(selectBudgetState);

  useEffect(() => {
    if (userId) {
      dispatch(fetchBudgetTotal(userId));
      dispatch(fetchBudgetData(userId));
      dispatch(getSpendingTimelineThunk(userId));
    }
  }, [userId, dispatch]);

  return {
    budgets,
    totalBudget,
    totalSpending,
    totalAllocation,
    remaining,
    spendingTimeline,
    loading: status === "loading",
    error,
  };
};
