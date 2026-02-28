import { createAsyncThunk } from "@reduxjs/toolkit";
import { apolloClient } from "@/apollo/client";
import {
  GET_SHOPPING_ITEMS_GROUPED_BY_TIMELINE,
  GET_TOP_COST_SHOPPING_ITEMS,
} from "@/graphql/queries/shoppingItem.querry";

export const fetchTopCostShoppingItems = createAsyncThunk(
  "shoppingList/fetchTopCostItems",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await apolloClient.query({
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

      return res?.data?.getShoppingItemsOfUser?.items ?? [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const fetchShoppingItemsByTimeline = createAsyncThunk(
  "shopping/fetchItemsByTimeline",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await apolloClient.query({
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
            duedTime: new Date().toISOString().split("T")[0] + "T00:00:00.000Z",
            page: 1,
            pageSize: 10,
            sortBy: "price",
            sortOrder: "desc",
          },
        },
        fetchPolicy: "network-only",
      });

      return {
        preTet: res?.data?.preTet?.items ?? [],
        duringTet: res?.data?.duringTet?.items ?? [],
        afterTet: res?.data?.afterTet?.items ?? [],
        today: res?.data?.today?.items ?? [],
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);
