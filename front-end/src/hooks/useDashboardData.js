import { useQuery } from '@apollo/client/react';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { GET_TASKS, GET_TASK_CATEGORY, GET_ITEMS, GET_TOTAL_BUDGET } from '../graphql/queries/dashboard.query';
import { mapData, transformData, calPercentage, mapDataDued, reminderNoti } from "../utils/dashboardUtils";

/**
 * getTasks
 * getTaskCategory
 * getItems
 * getTotalBudget
 */

export function useDashboardData() {
  const { user } = useContext(AuthContext);
  const MAX_CATEGORY = 4;

  function useTasks(userId) {
    const { loading, error, data } = useQuery(GET_TASKS, {
      variables: { userId },
    });

    return { loading, error, data };
  }

  function useItems(userId) {
    const { loading, error, data } = useQuery(GET_ITEMS, {
      variables: { userId },
    });

    return { loading, error, data };
  }

  function useTaskCategory(userId, categoryId) {
    const { loading, error, data } = useQuery(GET_TASK_CATEGORY, {
      variables: { userId, categoryId },
    });

    return { loading, error, data };
  }

  function useTotalBudget(userId) {
    const { loading, error, data } = useQuery(GET_TOTAL_BUDGET, {
      variables: { userId },
    });

    return { loading, error, data };
  }

  const { loading: tasksLoading, error: tasksError, data: tasksData } = useTasks(user.id);
  const { loading: itemsLoading, error: itemsError, data: itemsData } = useItems(user.id);
  const { loading: categoryLoading, error: categoryError, data: categoryData } = useTaskCategory(user.id);
  const { loading: budgetLoading, error: budgetError, data: budgetData } = useTotalBudget(user.id);

  const loading = tasksLoading || itemsLoading || categoryLoading || budgetLoading;
  const error = tasksError || itemsError || categoryError || budgetError;

  if (loading || error) {
    return { loading, error };
  }

  const tasksMap = mapData(tasksData.getTasks)
  const tasksMapTransformed = transformData(tasksMap.result)
  const tasksTotal = tasksMap.total
  const tasksDone = tasksMap.done
  const tasksInnerData = tasksMapTransformed.innerData
  const tasksOuterData = tasksMapTransformed.outerData

  const itemsMap = mapData(itemsData.getItems.items)
  const itemsMapTransformed = transformData(itemsMap.result)
  const itemsTotal = itemsMap.total
  const itemsDone = itemsMap.done
  const itemsInnerData = itemsMapTransformed.innerData
  const itemsOuterData = itemsMapTransformed.outerData

  const itemsCompleted = itemsData.getItems.items.filter(item => item.status === "Completed")
  const itemsSpent = itemsCompleted.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const categoryIdMap = Object.fromEntries(
    categoryData.getTaskCategory.map(c => [c.id, c.name])
  );

  const sorted = Object.entries(
    tasksData.getTasks.reduce((acc, task) => {
      acc[task.categoryId] = (acc[task.categoryId] || 0) + 1;
      return acc;
    }, {})
  ).sort((a, b) => b[1] - a[1]);

  const finalMap =
    sorted.length <= MAX_CATEGORY
      ? Object.fromEntries(sorted)
      : sorted.reduce((acc, [id, count], index) => {
        if (index < MAX_CATEGORY - 1) { // top 3
          acc[id] = count;
        } else {
          acc.others = (acc.others || 0) + count;
        }
        return acc;
      }, {});

  const colors = [
    'var(--color-primary)',
    'var(--color-accent)',
    'var(--color-success)',
    'var(--color-highlight)'
  ];

  const categorySeries = Object.entries(finalMap).map(([id, value], index) => ({
    id,
    value: calPercentage(value, tasksTotal),
    label: id === "others" ? "Others" : categoryIdMap[id],
    color: colors[index % colors.length]
  }));

  const tasksPercentage = calPercentage(tasksDone, tasksTotal);
  const itemsPercentage = calPercentage(itemsDone, itemsTotal);
  const budgetSpentPercentage = calPercentage(itemsSpent, budgetData.getTotalBudget.totalBudget);

  const budgetIdLabel = Object.fromEntries(
    [...new Map(itemsCompleted.map(item => [item.budget.id, item.budget.name]))]
  );

  const budgetIdArr = Object.keys(budgetIdLabel);
  let dateMapItems = new Map();

  itemsCompleted.forEach(item => {
    const day = new Date(item.updatedAt).toISOString().split('T')[0];
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
  const reminderNotification = reminderNoti(mapDataDued(tasksData.getTasks), mapDataDued(itemsData.getItems.items))
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