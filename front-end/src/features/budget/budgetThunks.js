import { createAsyncThunk } from "@reduxjs/toolkit";
import { apolloClient } from "@/apollo/client";
import { GET_BUDGETS, GET_TOTAL_BUDGET } from "@/graphql/queries/budget.query";
import {
  CREATE_BUDGET,
  DELETE_BUDGET,
  UPDATE_BUDGET,
  UPDATE_TOTAL_BUDGET,
} from "@/graphql/mutations/budget.mutation";

export const fetchBudgetData = createAsyncThunk(
  "budget/fetchBudgetData",
  async (userId) => {
    const [totalRes, budgetsRes] = await Promise.all([
      apolloClient.query({
        query: GET_TOTAL_BUDGET,
        variables: { userId },
        fetchPolicy: "network-only",
      }),
      apolloClient.query({
        query: GET_BUDGETS,
        variables: { userId },
        fetchPolicy: "network-only",
      }),
    ]);

    return {
      totalBudget: totalRes.data?.getTotalBudget?.totalBudget ?? 0,
      budgets: budgetsRes.data?.getBudgetsOfUser ?? [],
    };
  },
);

export const updateTotalBudgetThunk = createAsyncThunk(
  "budget/updateTotalBudget",
  async ({ userId, amount }, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_TOTAL_BUDGET,
        variables: {
          userId,
          input: { totalBudget: amount },
        },
      });

      return data.updateTotalBudget.totalBudget;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const deleteBudgetThunk = createAsyncThunk(
  "budget/deleteBudget",
  async ({ budgetId, userId }, { rejectWithValue }) => {
    try {
      await apolloClient.mutate({
        mutation: DELETE_BUDGET,
        variables: {
          deleteBudgetOfUserId: budgetId,
          userId,
        },
      });

      return budgetId;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const createBudgetThunk = createAsyncThunk(
  "budget/createBudget",
  async ({ userId, input }, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_BUDGET,
        variables: {
          input: {
            ...input,
            userId,
          },
        },
      });

      return data.createBudgetOfUser;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const updateBudgetThunk = createAsyncThunk(
  "budget/updateBudget",
  async ({ id, input }, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_BUDGET,
        variables: {
          updateBudgetOfUserId: id,
          input,
        },
      });

      return data.updateBudgetOfUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
