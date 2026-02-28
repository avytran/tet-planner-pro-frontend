import { GET_SHOPPING_ITEMS_GROUPED_BY_TIMELINE } from "@/graphql/queries/shoppingItem.querry";
import { useApolloClient } from "@apollo/client/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectItemsByTimeline,
  selectTimelineError,
  selectTimelineStatus,
  selectTopCostError,
  selectTopCostItems,
  selectTopCostStatus,
} from "@/features/shoppingList/shoppingListSelectors";
import {
  fetchShoppingItemsByTimeline,
  fetchTopCostShoppingItems,
} from "@/features/shoppingList/shoppingListThunk";

export const useShoppingItemsByTimeline = (userId) => {
  const dispatch = useDispatch();

  const data = useSelector(selectItemsByTimeline);
  const timelineStatus = useSelector(selectTimelineStatus);
  const timelineError = useSelector(selectTimelineError);

  useEffect(() => {
    if (userId) dispatch(fetchShoppingItemsByTimeline(userId));
  }, [userId, dispatch]);

  return {
    preTet: data.preTet || [],
    duringTet: data.duringTet || [],
    afterTet: data.afterTet || [],
    today: data.today || [],
    timelineLoading: timelineStatus === "loading",
    timelineError,
  };
};

export const useShoppingItem = (userId) => {
  const dispatch = useDispatch();

  const topCostItems = useSelector(selectTopCostItems);
  const topCostStatus = useSelector(selectTopCostStatus);
  const topCostError = useSelector(selectTopCostError);

  useEffect(() => {
    if (userId) {
      dispatch(fetchTopCostShoppingItems(userId));
    }
  }, [userId, dispatch]);

  return {
    topCostItems,
    topCostLoading: topCostStatus === "loading",
    topCostError,
  };
};
