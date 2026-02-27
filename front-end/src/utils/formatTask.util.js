const getBarColorFromPriority = (priority) => {
  if (priority === "High") return "var(--color-danger)";
  if (priority === "Medium") return "var(--color-accent)";
  return "var(--color-success)";
};

import { TIMELINE_OPTIONS } from "@/constants/taskConstant";

export const formatTimeline = (timeline) => {
  for (const t of TIMELINE_OPTIONS) {
    if (t.value === timeline) {
      return t.label;
    }
  }
}

export const formatTask = (task) => {
  const date = task?.duedTime ? new Date(task.duedTime) : new Date();

  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);

  const mappedDate = localDate.toISOString().slice(0, 10);

  return {
    id: task?.id,
    title: task?.title,
    duedTime: mappedDate,
    category: task?.category,
    priority: task?.priority,
    status: task?.status,
    timeline: task?.timeline,
    barColor: getBarColorFromPriority(task?.priority)
  };
};