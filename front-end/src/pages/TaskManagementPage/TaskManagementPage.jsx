import { useEffect, useMemo, useState } from "react";
import { useQuery, useMutation } from "@apollo/client/react";

import { DELETE_ALL_TASKS } from "@/graphql/mutations/task.mutation";

import {
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import CommonButton from "../../components/Button/CommonButton";
import {
  GET_TASKS_OF_USER
} from "../../graphql/queries/task.query";

import { useAuth } from "../../hooks/useAuth";

import { useUndoRedoTask } from "@/hooks/useUndoRedoTask";

import { TaskItem } from "@/components/Task/TaskItem";
import { formatTask } from "@/utils/formatTask.util";
import { MutateTaskDialog } from "@/components/Task/MutateTaskDialog";
import { TaskChart } from "@/components/Task/TaskChart";
import { TaskProgress } from "@/components/Task/TaskProgress";
import { TaskFilter } from "@/components/Task/TaskFilter";
import { UndoRedoButtons } from "@/components/UndoRedoButtons/UndoRedoButtons";

import { findItemById } from "@/utils/findItemById";
import { CHART_COLORS } from "@/constants/taskConstant";
import { getTetTimelineAuto } from "@/utils/getTetTimelineAuto";

import { TASKS_PER_PAGE } from "@/constants/taskConstant";

export default function TaskManagementPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);

  const [searchValue, setSearchValue] = useState("");
  const [filters, setFilters] = useState({
    status: [],
    timeline: [],
    categories: [],
    priceRange: [0, 5000000],
  });

  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: tasksData,
    loading: isTasksLoading,
    error: tasksError,
    refetch
  } = useQuery(GET_TASKS_OF_USER, {
    variables: {
      userId: user?.id,
      params: {
        page: currentPage,
        pageSize: TASKS_PER_PAGE
      }
    },
    skip: !user?.id,
  });

  const [deleteAllTasks] = useMutation(DELETE_ALL_TASKS);

  const totalPages = tasksData?.getTasksOfUser?.totalPages || 1;

  const { handleUndo, handleRedo, canUndo, canRedo } = useUndoRedoTask(currentPage);

  // Reset page when filter/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchValue, filters]);

  // Format Task
  useEffect(() => {
    if (!Array.isArray(tasksData?.getTasksOfUser.tasks)) {
      return;
    }
    setTasks(tasksData.getTasksOfUser.tasks.map(formatTask));
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

    return filtered;
  }, [filters, searchValue, tasks]);

  const chartData = useMemo(() => {
    const totals = categories.map((category, index) => {
      const count = tasks.filter((task) => task.category === category).length;

      return {
        id: category.id,
        value: count,
        name: category.name,
        color: CHART_COLORS[index % CHART_COLORS.length],
      };
    });

    return totals;
  }, [categories, tasks]);

  const summary = useMemo(() => {
    const total = tasks.length || 1;
    const inProgress = tasks.filter(
      (task) => task.status === "In Progress",
    ).length;
    const done = tasks.filter((task) => task.status === "Done").length;
    const before = tasks.filter(
      (task) => task.timeline === getTetTimelineAuto(new Date()),
    ).length;

    return {
      inProgress: Math.round((inProgress / total) * 100),
      done: Math.round((done / total) * 100),
      before: Math.round((before / total) * 100),
    };
  }, [tasks]);

  const clearAll = async () => {
    setTasks([]);
    await deleteAllTasks({
      variables: {
        userId: user.id
      }
    });
    await refetch();
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
    <section className="bg-bg min-h-screen flex flex-col px-4 py-12 md:p-20">
      <div className="container mx-auto max-w-screen-2xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-5xl font-bold text-primary">Task Management</h1>
          <div className="flex items-center gap-3">
            <UndoRedoButtons 
              handleUndo={handleUndo}
              handleRedo={handleRedo}
              canUndo={canUndo}
              canRedo={canRedo}
            />
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
            categories={categories}
          />

          {/* Mid - Task List */}
          <div className="min-w-0 flex-1">
            {/* Search */}
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
            </div>

            {/* List */}
            <ul className="space-y-3">
              {visibleTasks.map((task) => (
                <TaskItem
                  key={"task-" + task.id}
                  task={task}
                  handleOpenEditTaskForm={handleOpenEditTaskForm}
                  currentPage={currentPage}
                />
              ))}

              {visibleTasks.length === 0 && (
                <li className="rounded-xl border border-dashed border-primary/25 bg-bg px-4 py-7 text-center text-sm text-primary-strong/70">
                  No tasks found.
                </li>
              )}
            </ul>

            {/* Pagination */}
            <div className="mt-6 flex justify-center gap-2">

              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                Prev
              </button>

              {Array.from({ length: totalPages }).map((_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded ${
                      currentPage === page ? "bg-primary text-white" : "border"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          </div>

          {/* Right - Chart & Progress */}
          <aside className="w-full lg:w-[300px]">
            <TaskChart
              chartData={chartData}
            />

            <TaskProgress
              summary={summary}
            />
          </aside>
        </div>
      </div>

      {/* Task Form */}
      {isTaskFormOpen && (
        <MutateTaskDialog
          selectedTask={findItemById(tasks, selectedTaskId)}
          handleCloseTaskForm={handleCloseTaskForm}
          currentPage={currentPage}
        />
      )}
    </section>
  );
}