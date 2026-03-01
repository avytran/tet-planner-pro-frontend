import { useDispatch, useSelector } from "react-redux";
import {
  selectTotalBudget,
  selectTotalSpending,
} from "../features/budget/budgetSelectors";
import {
  selectDashboard,
  selectTasks,
  selectItems,
  selectTasksStats,
  selectItemsStats,
  selectCategorySeries,
  selectItemsCompleted,
} from "../features/dashboard/dashboardSelectors";
import {
  calPercentage,
  mapDataDued,
  reminderNoti,
} from "../utils/dashboardUtils";
import { useEffect } from 'react';
import {
  fetchBudgetData,
  fetchBudgetTotal,
} from "@/features/budget/budgetThunks";

import {
  fetchTasks,
  fetchItems,
  fetchTaskCategory,
} from "@/features/dashboard/dashboardThunks";
/**
 * getTasks
 * getTaskCategory
 * getItems
 * getTotalBudget
 */

export function useDashboardData(userId) {
  const dispatch = useDispatch();

  // import { selectTasksStats, selectItemsStats, selectCategorySeries } from "../features/dashboard/dashboardSelectors";
  const { loading, error } = useSelector(selectDashboard);

  const totalBudget = useSelector(selectTotalBudget);
  const totalSpending = useSelector(selectTotalSpending);
  const tasksData = useSelector(selectTasks);
  const itemsData = useSelector(selectItems);
  const tasksStats = useSelector(selectTasksStats);
  const itemsStats = useSelector(selectItemsStats);
  const categorySeries = useSelector(selectCategorySeries);
  const itemsCompleted = useSelector(selectItemsCompleted);

  useEffect(() => {
    if (userId) {
      dispatch(fetchBudgetTotal(userId));
      dispatch(fetchBudgetData(userId));
      dispatch(fetchTasks(userId));
      dispatch(fetchItems(userId));
      dispatch(fetchTaskCategory(userId))
    }
  }, [userId, dispatch]);

  // const loading = tasksLoading || itemsLoading || categoryLoading;
  // const error = tasksError || itemsError || categoryError;

  // if (loading || error) {
  //   return { loading, error };
  // }

  const tasksTotal = tasksStats.total
  const tasksDone = tasksStats.done
  const tasksInnerData = tasksStats.innerData
  const tasksOuterData = tasksStats.outerData

  const itemsTotal = itemsStats.total
  const itemsDone = itemsStats.done
  const itemsInnerData = itemsStats.innerData
  const itemsOuterData = itemsStats.outerData

  const tasksPercentage = calPercentage(tasksDone, tasksTotal);
  const itemsPercentage = calPercentage(itemsDone, itemsTotal);
  const budgetSpentPercentage = calPercentage(totalSpending, totalBudget);

  const budgetIdLabel = Object.fromEntries(
    [...new Map(itemsCompleted.map(item => [item.budget.id, item.budget.name]))]
  );

  const budgetIdArr = Object.keys(budgetIdLabel);
  let dateMapItems = new Map();

  itemsCompleted.forEach(item => {
    const day = new Date(item.duedTime).toISOString().split('T')[0];
    const value = item.price * item.quantity;
    const budgetId = item.budget.id;

    if (!dateMapItems.has(day)) {
      const dayData = Object.fromEntries(
        budgetIdArr.map(id => [id, 0])
      );
      dateMapItems.set(day, dayData);
    }

    const existing = dateMapItems.get(day);
    existing[budgetId] += value;
  });

  const sortedMap = new Map();
  for (let [date, data] of dateMapItems) {
    const sortedData = {};
    budgetIdArr.forEach(id => {
      sortedData[id] = data[id] || 0;
    });
    sortedMap.set(date, sortedData);
  }

  const datePoints = [...dateMapItems.keys()].sort();

  const timelineSeries = budgetIdArr.map((budgetId, index) => ({
    id: index,
    curve: "linear",
    data: datePoints.map(date => dateMapItems.get(date)?.[budgetId] || 0),
    label: budgetIdLabel[budgetId]
  }));

  const reminderNotification = reminderNoti(mapDataDued(tasksData), mapDataDued(itemsData))
  return {
    loading,
    error,
    tasksTotal,
    tasksDone,
    tasksInnerData,
    tasksOuterData,
    itemsTotal,
    itemsDone,
    itemsInnerData,
    itemsOuterData,
    tasksPercentage,
    itemsPercentage,
    budgetSpentPercentage,
    categorySeries,
    timelineSeries,
    datePoints,
    reminderNotification
  };
}