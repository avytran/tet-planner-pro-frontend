import { GET_TOP_COST_SHOPPING_ITEMS } from "@/graphql/queries/shoppingItem.querry";
import { useApolloClient } from "@apollo/client/react";
import { useEffect, useState } from "react";

export function useTopCostShoppingItems(userId) {
  const client = useApolloClient();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetch = async () => {
      try {
        const res = await client.query({
          query: GET_TOP_COST_SHOPPING_ITEMS,
          variables: {
            userId,
            params: {
              sortBy: "total_cost",
              page: 1,
              pageSize: 3,
              sortOrder: "desc",
            },
          },
          fetchPolicy: "network-only",
        });

        setData(res?.data?.getShoppingItemsOfUser?.items ?? []);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [userId]);

  return {
    data,
    loading,
    error,
  };
}
