import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTasks,
  fetchTaskCategory,
  fetchItems
} from "./dashboardThunks";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    tasks: [],
    categories: [],
    items: [],

    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      // FETCH TASKS
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH CATEGORY
      .addCase(fetchTaskCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTaskCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchTaskCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH ITEMS
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  },
});

export default dashboardSlice.reducer;