import { useQuery } from '@apollo/client/react';
import { GET_TASKS, GET_TASK_CATEGORY, GET_ITEMS, GET_TOTAL_BUDGET } from '../graphql/queries/dashboard.query';

export function useTasks(userId) {
  const { loading, error, data } = useQuery(GET_TASKS, {
    variables: { userId },
  });

  return { loading, error, data };
}

export function useItems(userId) {
  const { loading, error, data } = useQuery(GET_ITEMS, {
    variables: { userId },
  });

  return { loading, error, data };
}

export function useTaskCategory(userId, categoryId) {
  const { loading, error, data } = useQuery(GET_TASK_CATEGORY, {
    variables: { userId, categoryId },
  });

  return { loading, error, data };
}

export function useTotalBudget(userId) {
  const { loading, error, data } = useQuery(GET_TOTAL_BUDGET, {
    variables: { userId },
  });

  return { loading, error, data };
}