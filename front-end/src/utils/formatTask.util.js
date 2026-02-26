const getBudgetStatusFromTaskStatus = (taskStatus) =>
  taskStatus === "Done" ? "Completed" : "Planning";

const getBarColorFromPriority = (priority) => {
  if (priority === "High") return "var(--color-danger)";
  if (priority === "Medium") return "var(--color-accent)";
  return "var(--color-success)";
};

const mapPriority = (value) => {
  if (value === "High") return "High";
  if (value === "Medium") return "Medium";
  return "Low";
};

const mapStatus = (value) => {
  if (value === "In_Progress") return "In Progress";
  if (value === "Done") return "Done";
  if (value === "Todo") return "To Do";
  return "To Do";
};

const mapTimeline = (value) => {
  if (value === "Pre_Tet") {
    return "Pre Tet";
  }
  if (value === "During_Tet") {
    return "During Tet";
  }
  if (value === "After_Tet") {
    return "After Tet";
  }
};

export const formatTask = (task) => {
  const mappedPriority = mapPriority(task?.priority);
  const mappedStatus = mapStatus(task?.status);
  const mappedTimeline = mapTimeline(task?.timeline);
  const mappedDate = task?.duedTime
    ? new Date(task.duedTime).toISOString().slice(0, 10)
    : new Date().toISOString().slice(0, 10);

  return {
    id: task?.id,
    title: task?.title || "",
    date: mappedDate,
    category: task?.category?.name || "General",
    priority: mappedPriority,
    status: mappedStatus,
    timeline: mappedTimeline,
    budgetStatus: getBudgetStatusFromTaskStatus(mappedStatus),
    totalCost: 0,
    description: "",
    barColor: getBarColorFromPriority(mappedPriority),
    shoppingItemsCount: 0,
  };
};