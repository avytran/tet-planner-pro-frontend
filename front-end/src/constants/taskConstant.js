export const TASK_STATUS_OPTIONS = ["To Do", "In Progress", "Done"];
export const PRIORITY_OPTIONS = ["Low", "Medium", "High"];
export const TIMELINE_OPTIONS = ["Before Tet", "30 Tet", "Mung 1-3"];

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
  timeline: "Before Tet",
  totalCost: "0",
});