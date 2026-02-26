import { useEffect, useMemo, useState } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import CommonButton from "../../components/Button/CommonButton";
import { ShoppingFilter } from "../../components/ShoppingFilter";
import {
  GET_TASKS_OF_USER
} from "../../graphql/queries/task.query";

import { useAuth } from "../../hooks/useAuth";

import { TaskItem } from "@/components/Task/TaskItem";
import { formatTask } from "@/utils/formatTask.util";
import { MutateTaskDialog } from "@/components/Task/MutateTaskDialog";
import { TaskChart } from "@/components/Task/TaskChart";
import { TaskProgress } from "@/components/Task/TaskProgress";
import { TaskFilter } from "@/components/Task/TaskFilter";

import { findItemById } from "@/utils/findItemById";

const MOCK_TASKS = [
  // {
  //   id: "task-1",
  //   title: "Planning Mâm Ngũ Quả",
  //   date: "2026-02-14",
  //   category: "Food",
  //   priority: "Medium",
  //   status: "To Do",
  //   timeline: "Before Tet",
  //   budgetStatus: "Planning",
  //   totalCost: 1200000,
  //   barColor: "var(--color-accent)",
  // },
  // {
  //   id: "task-2",
  //   title: "Mua Hoa Trang Trí",
  //   date: "2026-02-14",
  //   category: "Decoration",
  //   priority: "Low",
  //   status: "In Progress",
  //   timeline: "30 Tet",
  //   budgetStatus: "Planning",
  //   totalCost: 600000,
  //   barColor: "var(--color-primary)",
  // },
  // {
  //   id: "task-3",
  //   title: "Chuẩn Bị Giỏ Quà",
  //   date: "2026-02-14",
  //   category: "Gift",
  //   priority: "High",
  //   status: "Done",
  //   timeline: "Mung 1-3",
  //   budgetStatus: "Completed",
  //   totalCost: 1800000,
  //   barColor: "var(--color-success)",
  // },
  // {
  //   id: "task-4",
  //   title: "Mua Áo Dài",
  //   date: "2026-02-15",
  //   category: "Cloth",
  //   priority: "Medium",
  //   status: "To Do",
  //   timeline: "Before Tet",
  //   budgetStatus: "Planning",
  //   totalCost: 900000,
  //   barColor: "var(--color-accent)",
  // },
  // {
  //   id: "task-5",
  //   title: "Lên Danh Sách Lì Xì",
  //   date: "2026-02-16",
  //   category: "Gift",
  //   priority: "Low",
  //   status: "In Progress",
  //   timeline: "30 Tet",
  //   budgetStatus: "Planning",
  //   totalCost: 2500000,
  //   barColor: "var(--color-primary)",
  // },
  // {
  //   id: "task-6",
  //   title: "Dọn Dẹp Sau Tết",
  //   date: "2026-02-18",
  //   category: "Decoration",
  //   priority: "Low",
  //   status: "Done",
  //   timeline: "Mung 1-3",
  //   budgetStatus: "Completed",
  //   totalCost: 400000,
  //   barColor: "var(--color-success)",
  // },
];

const SORT_OPTIONS = {
  date: "Date",
  price: "Price",
  quantity: "Quantity",
};

export default function TaskManagementPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState(MOCK_TASKS);

  const [searchValue, setSearchValue] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [filters, setFilters] = useState({
    status: [],
    timeline: [],
    categories: [],
    priceRange: [0, 5000000],
  });

  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [taskItems, setTaskItems] = useState([]); // query ở dưới

  const {
    data: tasksData,
    loading: isTasksLoading,
    error: tasksError,
  } = useQuery(GET_TASKS_OF_USER, {
    variables: {
      userId: user?.id,
    },
    skip: !user?.id,
    fetchPolicy: "network-only",
  });

  // Format Task
  useEffect(() => {
    if (!Array.isArray(tasksData?.getTasksOfUser)) {
      return;
    }

    setTasks(tasksData.getTasksOfUser.map(formatTask));
  }, [tasksData]);

  const categories = useMemo(() => {
  const map = new Map();

  tasks.forEach(task => {
    if (task.category) {
      map.set(task.category.id, task.category);
    }
  });

  return Array.from(map.values());
}, [tasks]);

  const visibleTasks = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();

    const filtered = tasks.filter((task) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        task.title.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        filters.status.length === 0 ||
        filters.status.includes(task.status);

      const matchesTimeline =
        filters.timeline.length === 0 ||
        filters.timeline.includes(task.timeline);

      const matchesCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(task.category);

      return (
        matchesSearch &&
        matchesStatus &&
        matchesTimeline &&
        matchesCategory
      );
    });

    return [...filtered].sort((left, right) => {
      if (sortBy === "price") return right.totalCost - left.totalCost;
      if (sortBy === "quantity") return left.title.localeCompare(right.title);
      return new Date(left.date).getTime() - new Date(right.date).getTime();
    });
  }, [filters, searchValue, sortBy, tasks]);

  const chartData = useMemo(() => {
    const totals = categories.map((category) => {
      const count = tasks.filter((task) => task.category === category).length;
      return { category, count };
    });

    const colorMap = {
      Food: "var(--color-danger)",
      Decoration: "var(--color-primary)",
      Gift: "var(--color-accent)",
      Cloth: "var(--color-success)",
    };

    return totals.map((item, index) => ({
      id: index,
      value: item.count,
      label: item.category,
      color: colorMap[item.category] || "var(--color-primary)",
    }));
  }, [categories, tasks]);

  const summary = useMemo(() => {
    const total = tasks.length || 1;
    const inProgress = tasks.filter(
      (task) => task.status === "In Progress",
    ).length;
    const done = tasks.filter((task) => task.status === "Done").length;
    const before = tasks.filter(
      (task) => task.timeline === "Pre Tet",
    ).length;

    return {
      inProgress: Math.round((inProgress / total) * 100),
      done: Math.round((done / total) * 100),
      before: Math.round((before / total) * 100),
    };
  }, [tasks]);

  const clearAll = () => {
    setTasks([]);
  };

  const handleOpenCreateTaskForm = () => {
    setIsTaskFormOpen(true);
  };

  const handleOpenEditTaskForm = (task) => {
    setSelectedTaskId(task.id);
    setIsTaskFormOpen(true);
  };

  const handleCloseTaskForm = () => {
    setIsTaskFormOpen(false);
    setSelectedTaskId(null);
  };

  return (
    <section className="bg-bg px-4 py-8 md:px-8 md:py-10">
      <div className="mx-auto w-full max-w-[1260px] rounded-sm border border-primary/10 bg-surface p-5 md:p-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-5xl font-bold text-primary">Task Management</h1>
          <div className="flex items-center gap-3">
            <CommonButton
              leadingIcon={<PlusIcon className="h-4 w-4" />}
              label="Add Task"
              color="accent"
              className="!rounded-full !px-5 !py-2 text-sm"
              onClick={handleOpenCreateTaskForm}
            />
            <CommonButton
              label="Clear All"
              color="danger"
              className="!rounded-full !px-5 !py-2 text-sm"
              onClick={clearAll}
            />
          </div>
        </div>

        {isTasksLoading && (
          <p className="mb-4 rounded-lg border border-primary/20 bg-white px-3 py-2 text-sm text-primary-strong/70">
            Loading tasks from server...
          </p>
        )}

        {tasksError && (
          <p className="mb-4 rounded-lg border border-danger/30 bg-danger/5 px-3 py-2 text-sm text-danger">
            Failed to load tasks from backend. Showing local data.
          </p>
        )}

        {/* Main */}
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* Left - Filter */}
          <TaskFilter
            filters={filters}
            onFilterChange={setFilters}
            // categories={categories}
          />

          {/* Mid - Task List */}
          <div className="min-w-0 flex-1">
            {/* Search & Sort */}
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <div className="relative min-w-[260px] flex-1">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                  placeholder="Search Task Title"
                  className="w-full rounded-full border border-primary/20 bg-surface py-2 pl-4 pr-10 text-sm outline-none focus:border-primary/50"
                />
                <MagnifyingGlassIcon className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-primary/70" />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-primary-strong/80">Sort by</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value)}
                    className="appearance-none rounded-lg border border-primary/20 bg-surface py-2 pl-3 pr-8 text-sm text-primary-strong outline-none"
                  >
                    {Object.entries(SORT_OPTIONS).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon className="pointer-events-none absolute right-2 top-2.5 h-4 w-4 text-primary/70" />
                </div>
              </div>
            </div>

            {/* List */}
            <ul className="space-y-3">
              {visibleTasks.map((task) => (
                <TaskItem 
                  key={"task-" + task.id} 
                  task={task} 
                  handleOpenEditTaskForm={handleOpenEditTaskForm}
                />
              ))}

              {visibleTasks.length === 0 && (
                <li className="rounded-xl border border-dashed border-primary/25 bg-bg px-4 py-7 text-center text-sm text-primary-strong/70">
                  No tasks found.
                </li>
              )}
            </ul>

            {/* Pagination */}
            <div className="mt-5 flex justify-center text-sm text-primary">
              <button type="button" className="inline-flex items-center gap-2">
                <span>‹</span>
                <span>Page</span>
                <span>›</span>
              </button>
            </div>
          </div>

          {/* Right - Chart & Progress */}
          <aside className="w-full lg:w-[300px]">
            {/* <TaskChart
              chartData={chartData}
            />

            <TaskProgress
              summary={summary}
            /> */}
          </aside>
        </div>
      </div>

      {/* Task Form */}
      {isTaskFormOpen && (
        <MutateTaskDialog
          selectedTask={findItemById(tasks, selectedTaskId)}
          handleCloseTaskForm={handleCloseTaskForm}
          categories={categories}
          taskItems={taskItems}
        />
      )}
    </section>
  );
}
