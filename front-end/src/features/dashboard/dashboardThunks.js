import { createAsyncThunk } from "@reduxjs/toolkit";
import { apolloClient } from "@/apollo/client";
import { GET_TASKS, GET_TASK_CATEGORY, GET_ITEMS } from "@/graphql/queries/dashboard.query";

export const fetchTasks = createAsyncThunk(
    "dashboard/fetchTasks",

    async (userId, { rejectWithValue }) => {
        try {
            const { data } = await apolloClient.query({
                query: GET_TASKS,
                variables: {
                    userId,
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

    async (userId, { rejectWithValue }) => {
        try {
            const { data } = await apolloClient.query({
                query: GET_ITEMS,
                variables: {
                    userId,
                },
                fetchPolicy: "network-only",
            });

            return data.getItems.items;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    },
);