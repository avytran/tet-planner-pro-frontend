import { useDispatch, useSelector } from "react-redux";
import {
  calPercentage,
  mapDataDued,
  reminderNoti,
} from "../utils/dashboardUtils";
import { useEffect } from 'react';
import {
  selectBudgetState,
  selectTotalBudget,
  selectTotalSpending,
  selectSpendingTimeline
} from "../features/budget/budgetSelectors";
import {
  fetchBudgetData,
  fetchBudgetTotal,
  getSpendingTimelineThunk,
} from "@/features/budget/budgetThunks";
import {
  selectDashboard,
  selectTasks,
  selectItems,
  selectTasksStats,
  selectItemsStats,
  selectCategorySeries,
  selectTasksTotal,
  selectItemsTotal,
} from "../features/dashboard/dashboardSelectors";
import {
  fetchTasks,
  fetchItems,
  fetchTaskCategory,
  fetchTasksTotal,
  fetchItemsTotal,
} from "@/features/dashboard/dashboardThunks";
/**
 * getTasks
 * getTaskCategory
 * getItems
 * getTotalBudget
 */

export function useDashboardData(userId) {
  const dispatch = useDispatch();

  const { loadingDashboard, errorDashboard } = useSelector(selectDashboard);
  const { loadingBudgets, errorBudgets } = useSelector(selectBudgetState);

  const totalBudget = useSelector(selectTotalBudget);
  const totalSpending = useSelector(selectTotalSpending);
  const tasksPageSize = useSelector(selectTasksTotal);
  const itemsPageSize = useSelector(selectItemsTotal);
  const spendingTimeline = useSelector(selectSpendingTimeline);
  const tasksData = useSelector(selectTasks);
  const itemsData = useSelector(selectItems);
  const tasksStats = useSelector(selectTasksStats);
  const itemsStats = useSelector(selectItemsStats);
  const categorySeries = useSelector(selectCategorySeries);

  useEffect(() => {
    if (userId) {
      dispatch(fetchBudgetTotal(userId));
      dispatch(fetchBudgetData(userId));
      dispatch(fetchTasksTotal(userId));
      dispatch(fetchItemsTotal(userId));
      dispatch(fetchTaskCategory(userId))
      dispatch(getSpendingTimelineThunk(userId))
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (userId && tasksPageSize && itemsPageSize) {
      dispatch(fetchTasks(
        {
          userId: userId,
          params: { pageSize: tasksPageSize }
        }
      ));
      dispatch(fetchItems(
        {
          userId: userId,
          params: { pageSize: itemsPageSize }
        }
      ));
    }
  }, [userId, tasksPageSize, itemsPageSize, dispatch]);

  const loading = (loadingDashboard === "loading") || (loadingBudgets === "loading");
  const error = (errorDashboard === "failed") || (errorBudgets === "failed");

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
    spendingTimeline,
    reminderNotification
  };
}