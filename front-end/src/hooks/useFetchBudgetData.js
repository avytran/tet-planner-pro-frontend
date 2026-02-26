import { GET_BUDGETS, GET_TOTAL_BUDGET } from "@/graphql/queries/budget.query";
import { useApolloClient } from "@apollo/client/react";
import { useEffect, useMemo, useState } from "react";

export function useBudgetData(userId) {
  const client = useApolloClient();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalBudget, setTotalBudget] = useState(0);
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    if (!userId) return;

    const fetch = async () => {
      try {
        setLoading(true);
        setError(null);

        const [budgetRes, budgetsRes] = await Promise.all([
          client.query({ query: GET_TOTAL_BUDGET, variables: { userId } }),
          client.query({ query: GET_BUDGETS, variables: { userId } }),
        ]);

        setTotalBudget(budgetRes?.data?.getTotalBudget?.totalBudget ?? 0);
        setBudgets(budgetsRes?.data?.getBudgetsOfUser ?? []);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [userId]);

  const totalSpending = useMemo(() => {
    return budgets.reduce((sum, item) => sum + item.summary, 0);
  }, [budgets]);
  const remaining = totalBudget - totalSpending;

  return { totalBudget, totalSpending, remaining, budgets, loading, error };
}
