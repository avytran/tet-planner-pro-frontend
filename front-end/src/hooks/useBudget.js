import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBudgets,
  selectRemaining,
  selectTotalAllocation,
  selectTotalBudget,
  selectTotalSpending,
  selectBudgetState,
} from "../features/budget/budgetSelectors";
import { fetchBudgetData } from "@/features/budget/budgetThunks";

export const useBudget = (userId) => {
  const dispatch = useDispatch();

  const budgets = useSelector(selectBudgets);
  const totalBudget = useSelector(selectTotalBudget);
  const totalSpending = useSelector(selectTotalSpending);
  const totalAllocation = useSelector(selectTotalAllocation);
  const remaining = useSelector(selectRemaining);
  const { status, error } = useSelector(selectBudgetState);

  useEffect(() => {
    if (userId) dispatch(fetchBudgetData(userId));
  }, [userId, dispatch]);

  return {
    budgets,
    totalBudget,
    totalSpending,
    totalAllocation,
    remaining,
    loading: status === "loading",
    error,
  };
};
