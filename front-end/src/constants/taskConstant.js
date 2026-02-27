export const TASK_STATUS_OPTIONS = [
  { label: "To Do", value: "Todo" },
  { label: "In Progress", value: "In_Progress" },
  { label: "Done", value: "Done" },
];
export const PRIORITY_OPTIONS = ["Low", "Medium", "High"];
export const TIMELINE_OPTIONS = [
  { label: "Pre Tet", value: "Pre_Tet" },
  { label: "During Tet", value: "During_Tet" },
  { label: "After Tet", value: "After_Tet" }
];

export const STATUS_CLASS = {
  "To Do": "text-primary-strong",
  "In Progress": "text-accent",
  Done: "text-success-strong",
};

export const PRIORITY_CLASS = {
  Low: "text-success",
  Medium: "text-accent",
  High: "text-danger",
};

export const SORT_MAP = {
  date: (a, b) => new Date(a.date) - new Date(b.date),
  price: (a, b) => b.totalCost - a.totalCost,
  quantity: (a, b) => a.title.localeCompare(b.title),
};

export const emptyTaskForm = () => ({
  title: "",
  category: "",
  date: "",
  description: "",
  priority: "Low",
  status: "To Do",
  timeline: "Pre Tet",
  totalCost: "0",
});

export const FILTER_OPTS = {
  status: TASK_STATUS_OPTIONS,
  timeline: TIMELINE_OPTIONS,
};

export const CHART_COLORS = [
  "var(--color-primary)",
  "var(--color-accent)",
  "var(--color-success)",
  "var(--color-danger)",
  "var(--color-warning)",
  "var(--color-info)",
]

export const TASKS_PER_PAGE = 10;