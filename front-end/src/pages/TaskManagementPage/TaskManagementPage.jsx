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

import { TaskItem } from "@/components/Task/TaskItem/TaskItem";
import { formatTask } from "@/utils/formatTask.util";
import { TaskForm } from "@/components/Task/TaskForm";
import { TaskChart } from "@/components/Task/TaskChart";
import { TaskProgress } from "@/components/Task/TaskProgress";

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

const createEmptyFormState = () => ({
  title: "",
  category: "",
  date: "",
  description: "",
  priority: "Low",
  status: "To Do",
  timeline: "Before Tet",
  totalCost: "0",
});

export default function TaskManagementPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState(MOCK_TASKS);

  console.log(tasks);

  const [searchValue, setSearchValue] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [filters, setFilters] = useState({
    status: [],
    timeline: [],
    categories: [],
    priceRange: [0, 5000000],
  });
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [taskForm, setTaskForm] = useState(createEmptyFormState());
  const [formError, setFormError] = useState("");
  const [taskItems, setTaskItems] = useState([]);
  const [showItemForm, setShowItemForm] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  const [itemForm, setItemForm] = useState({
    name: "",
    category: "",
    estimatedPrice: "0",
    quantity: "1",
    duedDate: "",
    status: "Planning",
  });

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
    return [...new Set(tasks.map((task) => task.category))];
  }, [tasks]);

  const visibleTasks = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();
    const [minPrice, maxPrice] = filters.priceRange;

    const filtered = tasks.filter((task) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        task.title.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        filters.status.length === 0 ||
        filters.status.includes(task.budgetStatus);

      const matchesTimeline =
        filters.timeline.length === 0 ||
        filters.timeline.includes(task.timeline);

      const matchesCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(task.category);

      const matchesPrice =
        task.totalCost >= minPrice && task.totalCost <= maxPrice;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesTimeline &&
        matchesCategory &&
        matchesPrice
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

  const onStatusChange = (taskId, nextStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
            ...task,
            status: nextStatus,
            budgetStatus: nextStatus === "Done" ? "Completed" : "Planning",
          }
          : task,
      ),
    );
  };

  const clearAll = () => {
    setTasks([]);
  };

  const openCreateTaskForm = () => {
    setEditingTaskId(null);
    setTaskForm(createEmptyFormState());
    setFormError("");
    setIsTaskFormOpen(true);
  };

  const openEditTaskForm = (task) => {
    setEditingTaskId(task.id);
    setTaskForm({
      title: task.title,
      category: task.category,
      date: task.date,
      description: task.description || "",
      priority: task.priority,
      status: task.status,
      timeline: task.timeline,
      totalCost: task.totalCost.toString(),
    });
    setFormError("");
    setIsTaskFormOpen(true);
  };

  const closeTaskForm = () => {
    setIsTaskFormOpen(false);
    setEditingTaskId(null);
    setTaskForm(createEmptyFormState());
    setFormError("");
    setTaskItems([]);
    setShowItemForm(false);
    setEditingItemId(null);
  };

  const openItemForm = () => {
    setEditingItemId(null);
    setItemForm({
      name: "",
      category: "",
      estimatedPrice: "0",
      quantity: "1",
      duedDate: "",
      status: "Planning",
    });
    setShowItemForm(true);
  };

  const submitItemForm = (event) => {
    event.preventDefault();

    if (!itemForm.name.trim() || !itemForm.category.trim()) {
      return;
    }

    const nextItem = {
      id:
        editingItemId ||
        `item-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      name: itemForm.name.trim(),
      category: itemForm.category.trim(),
      estimatedPrice: Number(itemForm.estimatedPrice) || 0,
      quantity: Number(itemForm.quantity) || 1,
      duedDate: itemForm.duedDate,
      status: itemForm.status,
    };

    if (editingItemId) {
      setTaskItems((prev) =>
        prev.map((item) => (item.id === editingItemId ? nextItem : item)),
      );
    } else {
      setTaskItems((prev) => [...prev, nextItem]);
    }

    // Save to database immediately if editing an existing task
    if (editingTaskId) {
      const saveItem = async () => {
        try {
          await createShoppingItemMutation({
            variables: {
              input: {
                taskId: editingTaskId,
                name: nextItem.name,
                category: nextItem.category,
                price: nextItem.estimatedPrice,
                quantity: nextItem.quantity,
                duedTime: nextItem.duedDate,
                status: nextItem.status,
              },
            },
          });
        } catch (error) {
          console.error("Error saving shopping item:", error);
        }
      };
      saveItem();
    }

    // Reset item form để add item mới
    setItemForm({
      name: "",
      category: "",
      estimatedPrice: "0",
      quantity: "1",
      duedDate: "",
      status: "Planning",
    });
    // Giữ form mở để tiếp tục thêm items khác
  };

  const deleteItem = (itemId) => {
    setTaskItems((prev) => prev.filter((item) => item.id !== itemId));

    // Delete from database if it's a saved item (has real MongoDB id)
    if (itemId && !itemId.startsWith("item-") && editingTaskId) {
      deleteShoppingItemMutation({
        variables: {
          id: itemId,
        },
      }).then(() => {
        // Refetch shopping items count after deletion
        refetchShoppingItemsCount();
      }).catch((error) => {
        console.error("Error deleting shopping item:", error);
      });
    }
  };

  const onItemFormFieldChange = (field, value) => {
    setItemForm((prev) => ({ ...prev, [field]: value }));
  };

  const onTaskFormFieldChange = (field, value) => {
    setTaskForm((prev) => ({ ...prev, [field]: value }));
  };

  const submitTaskForm = async (event) => {
    event.preventDefault();

    if (!taskForm.title.trim() || !taskForm.category.trim() || !taskForm.date) {
      setFormError("Please fill in title, category and due date.");
      return;
    }

    const normalizedCost = Number(taskForm.totalCost) || 0;

    const nextTaskData = {
      title: taskForm.title.trim(),
      category: taskForm.category.trim(),
      date: taskForm.date,
      description: taskForm.description.trim(),
      priority: taskForm.priority,
      status: taskForm.status,
      timeline: taskForm.timeline,
      totalCost: normalizedCost,
      budgetStatus: getBudgetStatusFromTaskStatus(taskForm.status),
      barColor: getBarColorFromPriority(taskForm.priority),
    };

    let newTaskId = editingTaskId;

    if (!editingTaskId) {
      newTaskId = `task-${Date.now()}`;
      const nextTask = {
        id: newTaskId,
        ...nextTaskData,
      };
      setTasks((prev) => [nextTask, ...prev]);
    } else {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === editingTaskId
            ? {
              ...task,
              ...nextTaskData,
            }
            : task,
        ),
      );
    }

    // Save shopping items to DB with taskId
    try {
      for (const item of taskItems) {
        // Skip if item already has MongoDB id (already saved)
        if (item.id && !item.id.startsWith("item-")) {
          continue;
        }

        await createShoppingItemMutation({
          variables: {
            input: {
              taskId: newTaskId,
              name: item.name,
              category: item.category,
              price: item.estimatedPrice,
              quantity: item.quantity,
              duedTime: item.duedDate,
              status: item.status,
            },
          },
        });
      }
      // Refetch shopping items count after saving
      refetchShoppingItemsCount();
    } catch (error) {
      console.error("Error saving shopping items:", error);
      setFormError(
        "Failed to save shopping items. Task was saved but items may not be persisted.",
      );
    }

    closeTaskForm();
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
              onClick={openCreateTaskForm}
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
          <ShoppingFilter
            filters={filters}
            onFilterChange={setFilters}
            categories={categories}
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
                  key={task.id} 
                  task={task} 
                  openEditTaskForm={openEditTaskForm}
                  onStatusChange={onStatusChange}  
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
        <TaskForm
          editingTaskId={editingItemId}
          closeTaskForm={closeTaskForm}
          submitTaskForm={submitTaskForm}
          taskForm={taskForm}
          categories={categories}
          formError={formError}
          openItemForm={openItemForm}
          taskItems={taskItems}
          showItemForm={showItemForm}
          submitItemForm={submitItemForm}
          deleteItem={deleteItem}
        />
      )}
    </section>
  );
}
