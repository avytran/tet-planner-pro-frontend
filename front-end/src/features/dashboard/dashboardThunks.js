import { createAsyncThunk } from "@reduxjs/toolkit";
import { apolloClient } from "@/apollo/client";
import { GET_TASKS_TOTAL, GET_ITEMS_TOTAL, GET_TASKS, GET_TASK_CATEGORY, GET_ITEMS } from "@/graphql/queries/dashboard.query";

/**
{
  "userId": "user.id",
  "params": {
    "pageSize": 29
  }
}
 */

export const fetchTasksTotal = createAsyncThunk(
    "dashboard/fetchTasksTotal",

    async (userId, { rejectWithValue }) => {
        try {
            const { data } = await apolloClient.query({
                query: GET_TASKS_TOTAL,
                variables: {
                    userId,
                },
                fetchPolicy: "network-only",
            });

            return data.getTotalTasks.totalItems;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    },
);

export const fetchItemsTotal = createAsyncThunk(
    "dashboard/fetchItemsTotal",

    async (userId, { rejectWithValue }) => {
        try {
            const { data } = await apolloClient.query({
                query: GET_ITEMS_TOTAL,
                variables: {
                    userId,
                },
                fetchPolicy: "network-only",
            });

            return data.getTotalItems.totalItems;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    },
);

export const fetchTasks = createAsyncThunk(
    "dashboard/fetchTasks",

    async ({ userId, params }, { rejectWithValue }) => {
        try {
            const { data } = await apolloClient.query({
                query: GET_TASKS,
                variables: {
                    userId,
                    params
                },
                fetchPolicy: "network-only",
            });

            return data.getTasks.tasks;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    },
);

export const fetchTaskCategory = createAsyncThunk(
    "dashboard/fetchTaskCategory",

    async (userId, { rejectWithValue }) => {
        try {
            const { data } = await apolloClient.query({
                query: GET_TASK_CATEGORY,
                variables: {
                    userId,
                },
                fetchPolicy: "network-only",
            });

            return data.getTaskCategory;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    },
);

export const fetchItems = createAsyncThunk(
    "dashboard/fetchItems",

    async ({userId, params}, { rejectWithValue }) => {
        try {
            const { data } = await apolloClient.query({
                query: GET_ITEMS,
                variables: {
                    userId,
                    params
                },
                fetchPolicy: "network-only",
            });

            return data.getItems.items;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    },
);