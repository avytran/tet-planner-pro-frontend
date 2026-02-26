import { GET_SHOPPING_ITEMS_GROUPED_BY_TIMELINE } from "@/graphql/queries/shoppingItem.querry";
import { useApolloClient } from "@apollo/client/react";
import { useEffect, useState } from "react";

export function useShoppingItemsByTimeline(userId) {
  const client = useApolloClient();
  const [data, setData] = useState({
    preTet: [],
    duringTet: [],
    afterTet: [],
    today: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetch = async () => {
      try {
        const res = await client.query({
          query: GET_SHOPPING_ITEMS_GROUPED_BY_TIMELINE,
          variables: {
            userId,
            preTetParams: {
              timeline: "Pre_Tet",
              page: 1,
              pageSize: 10,
              sortBy: "dued_time",
              sortOrder: "desc",
            },
            duringTetParams: {
              timeline: "During_Tet",
              page: 1,
              pageSize: 10,
              sortBy: "dued_time",
              sortOrder: "desc",
            },
            afterTetParams: {
              timeline: "After_Tet",
              page: 1,
              pageSize: 10,
              sortBy: "dued_time",
              sortOrder: "desc",
            },
            todayParams: {
              duedTime: new Date().toISOString().split("T")[0],
              page: 1,
              pageSize: 10,
              sortBy: "price",
              sortOrder: "desc",
            },
          },
          fetchPolicy: "network-only",
        });

        setData({
          preTet: res?.data?.preTet?.items ?? [],
          duringTet: res?.data?.duringTet?.items ?? [],
          afterTet: res?.data?.afterTet?.items ?? [],
          today: res?.data?.today?.items ?? [],
        });
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
    ...data,
    loading,
    error,
  };
}
