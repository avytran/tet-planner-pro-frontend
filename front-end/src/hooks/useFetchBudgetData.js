import { GET_BUDGETS, GET_TOTAL_BUDGET } from "@/graphql/queries/budget.query";
import { useQuery } from "@apollo/client/react";
import { useMemo } from "react";

export const useBudgetData = (userId) => {
  const {
    data: totalData,
    loading: loadingTotal,
    error: errorTotal,
  } = useQuery(GET_TOTAL_BUDGET, {
    variables: { userId },
    skip: !userId,
  });

  const {
    data: budgetsData,
    loading: loadingBudgets,
    error: errorBudgets,
  } = useQuery(GET_BUDGETS, {
    variables: { userId },
    skip: !userId,
  });

  const totalBudget = totalData?.getTotalBudget?.totalBudget ?? 0;

  const budgets = budgetsData?.getBudgetsOfUser ?? [];

  const totalSpending = useMemo(() => {
    return budgets.reduce((sum, item) => sum + (item.summary || 0), 0);
  }, [budgets]);
  const totalAllocation = useMemo(() => {
    return budgets.reduce((sum, item) => sum + (item.allocatedAmount || 0), 0);
  }, [budgets]);

  const remaining = totalBudget - totalSpending;

  return {
    totalBudget,
    totalSpending,
    totalAllocation,
    remaining,
    budgets,
    loading: loadingTotal || loadingBudgets,
    error: errorTotal || errorBudgets,
  };
};
