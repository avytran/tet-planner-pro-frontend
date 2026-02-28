import { BUDGET_CHART_COLORS } from "@/constants/budgetConstant";

export const transformSpendingTimelineData = (timelineData) => {
  if (!timelineData || timelineData.length === 0)
    return { dates: [], series: [] };
  const dates = timelineData.dates;
  const series = timelineData.series.map((item, index) => ({
    curve: "linear",
    color: BUDGET_CHART_COLORS[index % BUDGET_CHART_COLORS.length],
    data: item.data,
    label: item.label,
  }));
  return { dates, series };
};
