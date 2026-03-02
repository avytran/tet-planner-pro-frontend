import { mapData, transformData, calPercentage } from "../../utils/dashboardUtils";
import { createSelector } from "@reduxjs/toolkit";
import { CATEGORY_COLORS, MAX_CATEGORY } from "@/constants/dashboardConstant"

export const selectDashboard = (state) => state.dashboard;

export const selectTasksTotal = (state) => state.dashboard.tasksTotal;

export const selectItemsTotal = (state) => state.dashboard.itemsTotal;

export const selectTasks = (state) => state.dashboard.tasks;

export const selectTaskCategories = (state) => state.dashboard.categories;

export const selectItems = (state) => state.dashboard.items;

export const selectItemsCompleted = createSelector(
    [selectItems],
    (items) => items.filter(item => item.status === "Completed")
)

export const selectTasksStats = createSelector(
    [selectTasks],
    (tasks) => {
        const tasksMap = mapData(tasks)
        const transformed = transformData(tasksMap.result)

        return {
            total: tasksMap.total,
            done: tasksMap.done,
            innerData: transformed.innerData,
            outerData: transformed.outerData
        }
    }
)
export const selectItemsStats = createSelector(
    [selectItems],
    (items) => {
        const map = mapData(items)
        const transformed = transformData(map.result)

        return {
            total: map.total,
            done: map.done,
            innerData: transformed.innerData,
            outerData: transformed.outerData
        }
    }
)

export const selectCategorySeries = createSelector(
    [selectTasks, selectTaskCategories, selectTasksStats],
    (tasks, categories, tasksStats) => {

        const categoryIdMap = Object.fromEntries(
            categories.map(c => [c.id, c.name])
        )

        const sorted = Object.entries(
            tasks.reduce((acc, task) => {
                acc[task.category.id] = (acc[task.category.id] || 0) + 1
                return acc
            }, {})
        ).sort((a, b) => b[1] - a[1])

        const finalMap =
            sorted.length <= MAX_CATEGORY
                ? Object.fromEntries(sorted)
                : sorted.reduce((acc, [id, count], index) => {
                    if (index < MAX_CATEGORY - 1) {
                        acc[id] = count;
                    } else {
                        acc.others = (acc.others || 0) + count;
                    }
                    return acc;
                }, {});

        const categorySeries = Object.entries(finalMap).map(([id, value], index) => ({
            id,
            value: calPercentage(value, tasksStats.total),
            label: id === "others" ? "Others" : categoryIdMap[id],
            color: CATEGORY_COLORS[index % CATEGORY_COLORS.length]
        }));

        return categorySeries
    }
)