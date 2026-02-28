export const selectTopCostItems = (state) => state.shoppingList.topCostItems;
export const selectTopCostStatus = (state) => state.shoppingList.status.topCost;
export const selectTopCostError = (state) => state.shoppingList.error.topCost;
export const selectItemsByTimeline = (state) =>
  state.shoppingList.itemsByTimeline;
export const selectTimelineStatus = (state) =>
  state.shoppingList.status.timeline;
export const selectTimelineError = (state) => state.shoppingList.error.timeline;
