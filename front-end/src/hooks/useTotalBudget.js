import { useApolloClient } from "@apollo/client/react";
import { useEffect, useState } from "react";
import { GET_TOTAL_BUDGET } from "@/graphql/queries/budget.query";

export function useTotalBudget(userId) {
  const client = useApolloClient();

  const [totalBudget, setTotalBudget] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    let isCancelled = false;

    const fetch = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data } = await client.query({
          query: GET_TOTAL_BUDGET,
          variables: { userId },
          fetchPolicy: "network-only",
        });

        if (!isCancelled) {
          setTotalBudget(data?.getTotalBudget?.totalBudget ?? 0);
        }
      } catch (err) {
        console.error(err);
        if (!isCancelled) {
          setError(err);
          setTotalBudget(0);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetch();

    return () => {
      isCancelled = true;
    };
  }, [client, userId]);

  return { totalBudget, loading, error };
}

