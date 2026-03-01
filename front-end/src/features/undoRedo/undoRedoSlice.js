import { createSlice } from "@reduxjs/toolkit";

const MAX_HISTORY = 20;

const initialState = {};

const undoRedoSlice = createSlice({
  name: "undoRedo",
  initialState,
  reducers: {
    initScope(state, action) {
      const scope = action.payload;
      if (!state[scope]) {
        state[scope] = { past: [], future: [] };
      }
    },

    pushHistory(state, action) {
      const { scope, record } = action.payload;

      if (!state[scope]) {
        state[scope] = { past: [], future: [] };
      }

      state[scope].past.push(record);

      if (state[scope].past.length > MAX_HISTORY) {
        state[scope].past.shift();
      }

      state[scope].future = [];
    },

    updateFutureRecord: (state, action) => {
      const { scope, oldId, newId } = action.payload;

      const future = state[scope].future;
      if (!future.length) return;

      const last = future[future.length - 1];

      if (last.type === "DELETE") {
        last.oldData.id = newId;
      }
    },

    updatePastRecord: (state, action) => {
      const { scope, oldId, newId } = action.payload;

      const past = state[scope].past;
      if (!past.length) return;

      const last = past[past.length - 1];

      if (last.type === "CREATE" && last.newData.id === oldId) {
        last.newData.id = newId;
      }
    },

    undo(state, action) {
      const scope = action.payload;
      const target = state[scope];
      if (!target || !target.past.length) return;

      const last = target.past.pop();
      target.future.push(last);
    },

    redo(state, action) {
      const scope = action.payload;
      const target = state[scope];
      if (!target || !target.future.length) return;

      const next = target.future.pop();
      target.past.push(next);
    },
  },
});

export const { initScope, pushHistory, updateFutureRecord, updatePastRecord, undo, redo } = undoRedoSlice.actions;
export default undoRedoSlice.reducer;