import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTasksTotal,
  fetchItemsTotal,
  fetchTasks,
  fetchTaskCategory,
  fetchItems,
} from "./dashboardThunks";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    tasksTotal: 0,
    itemsTotal: 0,
    tasks: [],
    categories: [],
    items: [],

    status: "idle",
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      // FETCH TASKS TOTAL
      .addCase(fetchTasksTotal.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasksTotal.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasksTotal = action.payload;
      })
      .addCase(fetchTasksTotal.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // FETCH ITEMS TOTAL
      .addCase(fetchItemsTotal.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItemsTotal.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.itemsTotal = action.payload;
      })
      .addCase(fetchItemsTotal.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // FETCH TASKS
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // FETCH CATEGORY
      .addCase(fetchTaskCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTaskCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchTaskCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // FETCH ITEMS
      .addCase(fetchItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

  },
});

export default dashboardSlice.reducer;