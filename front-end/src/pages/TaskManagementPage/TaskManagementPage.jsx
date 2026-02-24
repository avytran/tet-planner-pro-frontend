import { useEffect, useMemo, useState } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { PieChart } from "@mui/x-charts";
import {
  CalendarDaysIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import CommonButton from "../../components/Button/CommonButton";
import { ShoppingFilter } from "../../components/ShoppingFilter";
import {
  GET_TASKS_OF_USER,
  GET_SHOPPING_ITEMS_OF_TASK,
  GET_SHOPPING_ITEMS_COUNT,
} from "../../graphql/queries/task.query";
import {
  CREATE_SHOPPING_ITEM,
  DELETE_SHOPPING_ITEM,
} from "../../graphql/mutations/shoppingItem.mutation";
import { useAuth } from "../../hooks/useAuth";

const TASK_STATUS_OPTIONS = ["To Do", "In Progress", "Done"];
const PRIORITY_OPTIONS = ["Low", "Medium", "High"];
const TIMELINE_OPTIONS = ["Before Tet", "30 Tet", "Mung 1-3"];

const MOCK_TASKS = [
  {
    id: "task-1",
    title: "Planning Mâm Ngũ Quả",
    date: "2026-02-14",
    category: "Food",
    priority: "Medium",
    status: "To Do",
    timeline: "Before Tet",
    budgetStatus: "Planning",
    totalCost: 1200000,
    barColor: "var(--color-accent)",
  },
  {
    id: "task-2",
    title: "Mua Hoa Trang Trí",
    date: "2026-02-14",
    category: "Decoration",
    priority: "Low",
    status: "In Progress",
    timeline: "30 Tet",
    budgetStatus: "Planning",
    totalCost: 600000,
    barColor: "var(--color-primary)",
  },
  {
    id: "task-3",
    title: "Chuẩn Bị Giỏ Quà",
    date: "2026-02-14",
    category: "Gift",
    priority: "High",
    status: "Done",
    timeline: "Mung 1-3",
    budgetStatus: "Completed",
    totalCost: 1800000,
    barColor: "var(--color-success)",
  },
  {
    id: "task-4",
    title: "Mua Áo Dài",
    date: "2026-02-15",
    category: "Cloth",
    priority: "Medium",
    status: "To Do",
    timeline: "Before Tet",
    budgetStatus: "Planning",
    totalCost: 900000,
    barColor: "var(--color-accent)",
  },
  {
    id: "task-5",
    title: "Lên Danh Sách Lì Xì",
    date: "2026-02-16",
    category: "Gift",
    priority: "Low",
    status: "In Progress",
    timeline: "30 Tet",
    budgetStatus: "Planning",
    totalCost: 2500000,
    barColor: "var(--color-primary)",
  },
  {
    id: "task-6",
    title: "Dọn Dẹp Sau Tết",
    date: "2026-02-18",
    category: "Decoration",
    priority: "Low",
    status: "Done",
    timeline: "Mung 1-3",
    budgetStatus: "Completed",
    totalCost: 400000,
    barColor: "var(--color-success)",
  },
];

const STATUS_CLASS = {
  "To Do": "text-primary-strong",
  "In Progress": "text-accent",
  Done: "text-success-strong",
};

const PRIORITY_CLASS = {
  Low: "text-success",
  Medium: "text-accent",
  High: "text-danger",
};

const SORT_OPTIONS = {
  date: "Date",
  price: "Price",
  quantity: "Quantity",
};

const getBudgetStatusFromTaskStatus = (taskStatus) =>
  taskStatus === "Done" ? "Completed" : "Planning";

const getBarColorFromPriority = (priority) => {
  if (priority === "High") return "var(--color-danger)";
  if (priority === "Medium") return "var(--color-accent)";
  return "var(--color-success)";
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

const normalizeOptionValue = (value) =>
  String(value || "")
    .replace(/_/g, " ")
    .trim()
    .toLowerCase();

const mapPriorityFromApi = (value) => {
  const normalized = normalizeOptionValue(value);
  if (normalized === "high") return "High";
  if (normalized === "medium") return "Medium";
  return "Low";
};

const mapStatusFromApi = (value) => {
  const normalized = normalizeOptionValue(value);
  if (normalized === "in progress") return "In Progress";
  if (normalized === "done") return "Done";
  if (normalized === "todo") return "To Do";
  return "To Do";
};

const mapTimelineFromApi = (value) => {
  const normalized = normalizeOptionValue(value);
  if (normalized.includes("pre") || normalized.includes("before")) {
    return "Before Tet";
  }
  if (normalized.includes("30")) {
    return "30 Tet";
  }
  if (normalized.includes("after") || normalized.includes("mung")) {
    return "Mung 1-3";
  }
  return "Before Tet";
};

const normalizeTaskFromApi = (task) => {
  const normalizedPriority = mapPriorityFromApi(task?.priority);
  const normalizedStatus = mapStatusFromApi(task?.status);
  const normalizedTimeline = mapTimelineFromApi(task?.timeline);
  const normalizedDate = task?.duedTime
    ? new Date(task.duedTime).toISOString().slice(0, 10)
    : new Date().toISOString().slice(0, 10);

  return {
    id: task?.id || `task-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title: task?.title || "",
    date: normalizedDate,
    category: task?.categoryId || "General",
    priority: normalizedPriority,
    status: normalizedStatus,
    timeline: normalizedTimeline,
    budgetStatus: getBudgetStatusFromTaskStatus(normalizedStatus),
    totalCost: 0,
    description: "",
    barColor: getBarColorFromPriority(normalizedPriority),
    shoppingItemsCount: 0,
  };
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

  const [createShoppingItemMutation] = useMutation(CREATE_SHOPPING_ITEM);
  const [deleteShoppingItemMutation] = useMutation(DELETE_SHOPPING_ITEM);

  const {
    data: shoppingItemsData,
    loading: isShoppingItemsLoading,
    refetch: refetchShoppingItems,
  } = useQuery(GET_SHOPPING_ITEMS_OF_TASK, {
    variables: {
      taskId: editingTaskId,
    },
    skip: !editingTaskId,
    fetchPolicy: "network-only",
  });

  const {
    data: shoppingItemsCountData,
    refetch: refetchShoppingItemsCount,
  } = useQuery(GET_SHOPPING_ITEMS_COUNT, {
    variables: {
      taskIds: tasks.map((t) => t.id).filter((id) => !id.startsWith("task-")),
    },
    skip: tasks.length === 0,
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (!Array.isArray(tasksData?.getTasksOfUser)) {
      return;
    }

    setTasks(tasksData.getTasksOfUser.map(normalizeTaskFromApi));
  }, [tasksData]);

  useEffect(() => {
    if (!Array.isArray(shoppingItemsCountData?.getShoppingItemsCounts)) {
      return;
    }

    const countMap = {};
    shoppingItemsCountData.getShoppingItemsCounts.forEach((item) => {
      countMap[item.taskId] = item.count || 0;
    });

    setTasks((prev) =>
      prev.map((task) => ({
        ...task,
        shoppingItemsCount: countMap[task.id] || 0,
      })),
    );
  }, [shoppingItemsCountData]);

  useEffect(() => {
    if (
      !editingTaskId ||
      !Array.isArray(shoppingItemsData?.getShoppingItemsOfTask)
    ) {
      return;
    }

    const normalizedItems = shoppingItemsData.getShoppingItemsOfTask.map(
      (item) => ({
        id: item.id,
        name: item.name,
        category: item.category,
        estimatedPrice: item.price || 0,
        quantity: item.quantity || 1,
        duedDate: item.duedTime
          ? new Date(item.duedTime).toISOString().slice(0, 10)
          : "",
        status: item.status || "Planning",
      }),
    );

    setTaskItems(normalizedItems);
  }, [shoppingItemsData, editingTaskId]);

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
      (task) => task.timeline === "Before Tet",
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

  const closeItemForm = () => {
    setShowItemForm(false);
    setEditingItemId(null);
    setItemForm({
      name: "",
      category: "",
      estimatedPrice: "0",
      quantity: "1",
      duedDate: "",
      status: "Planning",
    });
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

        <div className="flex flex-col gap-4 lg:flex-row">
          <ShoppingFilter
            filters={filters}
            onFilterChange={setFilters}
            categories={categories}
          />

          <div className="min-w-0 flex-1">
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

            <ul className="space-y-3">
              {visibleTasks.map((task) => (
                <li
                  key={task.id}
                  className="overflow-hidden rounded-xl border border-primary/10 bg-white shadow-[0_2px_6px_rgba(0,0,0,0.08)]"
                >
                  <div className="flex">
                    <span
                      className="w-3"
                      style={{ backgroundColor: task.barColor }}
                    ></span>
                    <div className="grid flex-1 grid-cols-1 gap-3 p-3 md:grid-cols-[2fr_1fr_1fr_130px_auto] md:items-center md:gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-primary-strong">
                            {task.title}
                          </p>
                          {task.shoppingItemsCount > 0 && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-accent text-white">
                              {task.shoppingItemsCount}
                            </span>
                          )}
                        </div>
                        <div className="mt-1 flex items-center gap-1 text-xs text-primary-strong/70">
                          <CalendarDaysIcon className="h-3.5 w-3.5" />
                          <span>
                            {new Date(task.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>

                      <div>
                        <p className="text-[11px] font-semibold uppercase text-primary-strong/55">
                          Category
                        </p>
                        <p className="text-sm text-primary-strong">
                          {task.category}
                        </p>
                      </div>

                      <div>
                        <p className="text-[11px] font-semibold uppercase text-primary-strong/55">
                          Priority
                        </p>
                        <p
                          className={`text-sm font-semibold ${PRIORITY_CLASS[task.priority]}`}
                        >
                          {task.priority}
                        </p>
                      </div>

                      <div className="relative w-full md:w-[130px]">
                        <select
                          value={task.status}
                          onChange={(event) =>
                            onStatusChange(task.id, event.target.value)
                          }
                          className={`w-full appearance-none rounded-lg border border-primary/20 bg-surface py-1.5 pl-3 pr-8 text-sm outline-none ${STATUS_CLASS[task.status]}`}
                        >
                          {TASK_STATUS_OPTIONS.map((statusOption) => (
                            <option key={statusOption} value={statusOption}>
                              {statusOption}
                            </option>
                          ))}
                        </select>
                        <ChevronDownIcon className="pointer-events-none absolute right-2 top-2 h-4 w-4 text-primary/70" />
                      </div>

                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-lg border border-primary/20 px-2.5 py-1.5 text-primary hover:bg-primary/5"
                        onClick={() => openEditTaskForm(task)}
                        aria-label={`Edit ${task.title}`}
                      >
                        <PencilSquareIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}

              {visibleTasks.length === 0 && (
                <li className="rounded-xl border border-dashed border-primary/25 bg-bg px-4 py-7 text-center text-sm text-primary-strong/70">
                  No tasks found.
                </li>
              )}
            </ul>

            <div className="mt-5 flex justify-center text-sm text-primary">
              <button type="button" className="inline-flex items-center gap-2">
                <span>‹</span>
                <span>Page</span>
                <span>›</span>
              </button>
            </div>
          </div>

          <aside className="w-full lg:w-[300px]">
            <div className="mb-4 rounded-xl border border-primary/10 bg-white p-4">
              <h2 className="mb-2 text-2xl font-semibold text-primary-strong">
                Tasks in Categories
              </h2>
              <div className="flex justify-center">
                <PieChart
                  width={260}
                  height={220}
                  series={[
                    {
                      innerRadius: 40,
                      outerRadius: 85,
                      data: chartData,
                    },
                  ]}
                  hideLegend
                />
              </div>

              <div className="mt-1 flex flex-wrap justify-center gap-4 text-xs text-primary-strong/80">
                {chartData.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex items-center gap-1">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-primary/10 bg-white p-4">
              <h2 className="mb-4 text-3xl font-semibold text-primary-strong">
                Task Overview
              </h2>

              <OverviewRow
                title="Task In Progress"
                value={summary.inProgress}
                helperText="You've pending tasks"
                colorClass="bg-accent"
              />
              <OverviewRow
                title="Task Completed"
                value={summary.done}
                helperText="You've finished tasks"
                colorClass="bg-success"
              />
              <OverviewRow
                title="Current Timeline"
                value={summary.before}
                helperText="Before Tet"
                colorClass="bg-primary"
                isLast
              />
            </div>
          </aside>
        </div>
      </div>

      {isTaskFormOpen && (
        <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/40 p-4 overflow-y-auto">
          <div className="w-full max-w-5xl rounded-2xl border border-primary/10 bg-surface p-5 md:p-6 my-8">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h3 className="text-3xl font-bold text-primary">
                  {editingTaskId ? "Edit Task" : "New Task"}
                </h3>
                <p className="mt-1 text-sm text-primary-strong/60">
                  Tết is more fun when your deadline stays in line too.
                </p>
              </div>
              <button
                type="button"
                className="rounded-full border border-primary/30 p-1 text-primary flex-shrink-0"
                onClick={closeTaskForm}
                aria-label="Close form"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <form
              onSubmit={submitTaskForm}
              className="grid gap-6 md:grid-cols-[1fr_1fr]"
            >
              {/* Left column: Task form */}
              <div className="space-y-3">
                <h4 className="font-semibold text-primary mb-4">
                  Task Details
                </h4>

                <FieldRow label="Title">
                  <input
                    type="text"
                    value={taskForm.title}
                    onChange={(event) =>
                      onTaskFormFieldChange("title", event.target.value)
                    }
                    className="w-full rounded-lg border border-primary/20 bg-white px-3 py-2 text-sm outline-none focus:border-primary/50"
                    placeholder="Task title"
                  />
                </FieldRow>

                <FieldRow label="Category">
                  <input
                    type="text"
                    value={taskForm.category}
                    onChange={(event) =>
                      onTaskFormFieldChange("category", event.target.value)
                    }
                    className="w-full rounded-lg border border-primary/20 bg-white px-3 py-2 text-sm outline-none focus:border-primary/50"
                    placeholder="Food, Decoration..."
                    list="task-category-options"
                  />
                  <datalist id="task-category-options">
                    {categories.map((category) => (
                      <option key={category} value={category} />
                    ))}
                  </datalist>
                </FieldRow>

                <FieldRow label="Due Time">
                  <input
                    type="date"
                    value={taskForm.date}
                    onChange={(event) =>
                      onTaskFormFieldChange("date", event.target.value)
                    }
                    className="w-full rounded-lg border border-primary/20 bg-white px-3 py-2 text-sm outline-none focus:border-primary/50"
                  />
                </FieldRow>

                <FieldRow label="Description">
                  <input
                    type="text"
                    value={taskForm.description}
                    onChange={(event) =>
                      onTaskFormFieldChange("description", event.target.value)
                    }
                    className="w-full rounded-lg border border-primary/20 bg-white px-3 py-2 text-sm outline-none focus:border-primary/50"
                    placeholder="Task description"
                  />
                </FieldRow>

                <div className="grid grid-cols-2 gap-3">
                  <FieldRow label="Priority" inline>
                    <select
                      value={taskForm.priority}
                      onChange={(event) =>
                        onTaskFormFieldChange("priority", event.target.value)
                      }
                      className="w-full rounded-lg border border-primary/20 bg-white px-3 py-2 text-sm outline-none focus:border-primary/50"
                    >
                      {PRIORITY_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </FieldRow>

                  <FieldRow label="Status" inline>
                    <select
                      value={taskForm.status}
                      onChange={(event) =>
                        onTaskFormFieldChange("status", event.target.value)
                      }
                      className="w-full rounded-lg border border-primary/20 bg-white px-3 py-2 text-sm outline-none focus:border-primary/50"
                    >
                      {TASK_STATUS_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </FieldRow>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <FieldRow label="Timeline" inline>
                    <select
                      value={taskForm.timeline}
                      onChange={(event) =>
                        onTaskFormFieldChange("timeline", event.target.value)
                      }
                      className="w-full rounded-lg border border-primary/20 bg-white px-3 py-2 text-sm outline-none focus:border-primary/50"
                    >
                      {TIMELINE_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </FieldRow>

                  <FieldRow label="Budget (VND)" inline>
                    <input
                      type="number"
                      min={0}
                      value={taskForm.totalCost}
                      onChange={(event) =>
                        onTaskFormFieldChange("totalCost", event.target.value)
                      }
                      className="w-full rounded-lg border border-primary/20 bg-white px-3 py-2 text-sm outline-none focus:border-primary/50"
                    />
                  </FieldRow>
                </div>

                {formError && (
                  <p className="text-sm text-danger">{formError}</p>
                )}
              </div>

              {/* Right column: Shopping items */}
              <div className="flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-primary">Shopping Items</h4>
                  <button
                    type="button"
                    onClick={openItemForm}
                    className="text-sm text-accent hover:text-accent-strong font-medium"
                  >
                    + Add Item
                  </button>
                </div>

                {taskItems.length > 0 ? (
                  <div
                    className="rounded-lg border border-primary/10 bg-white overflow-x-auto flex-1"
                    style={{ maxHeight: "400px" }}
                  >
                    <table className="w-full text-xs">
                      <thead className="sticky top-0">
                        <tr className="bg-primary">
                          <th className="px-2 py-2 text-left font-medium text-white">
                            Name
                          </th>
                          <th className="px-2 py-2 text-left font-medium text-white">
                            Date
                          </th>
                          <th className="px-2 py-2 text-right font-medium text-white">
                            Price
                          </th>
                          <th className="px-2 py-2 text-left font-medium text-white">
                            Category
                          </th>
                          <th className="px-2 py-2 text-center font-medium text-white">
                            Qty
                          </th>
                          <th className="px-2 py-2 text-center font-medium text-white">
                            Status
                          </th>
                          <th className="px-2 py-2 text-center font-medium text-white">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {taskItems.map((item, idx) => (
                          <tr
                            key={item.id}
                            className={`border-t border-primary/10 hover:bg-primary/5 ${idx % 2 === 0 ? "bg-surface" : "bg-highlight/30"}`}
                          >
                            <td className="px-2 py-2 truncate">{item.name}</td>
                            <td className="px-2 py-2">
                              {item.duedDate
                                ? new Date(item.duedDate).toLocaleDateString(
                                    "vi-VN",
                                    {
                                      day: "2-digit",
                                      month: "2-digit",
                                      year: "numeric",
                                    },
                                  )
                                : "-"}
                            </td>
                            <td className="px-2 py-2 text-right">
                              {(item.estimatedPrice || 0).toLocaleString()}
                            </td>
                            <td className="px-2 py-2">{item.category}</td>
                            <td className="px-2 py-2 text-center">
                              {item.quantity}
                            </td>
                            <td className="px-2 py-2 text-center">
                              <span
                                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                  item.status === "Completed"
                                    ? "bg-success text-white"
                                    : "bg-accent text-white"
                                }`}
                              >
                                {item.status}
                              </span>
                            </td>
                            <td className="px-2 py-2 text-center">
                              <button
                                type="button"
                                onClick={() => deleteItem(item.id)}
                                className="text-danger hover:text-danger-strong text-xs font-medium"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="rounded-lg border border-primary/10 bg-white overflow-x-auto flex-1">
                    <table className="w-full text-xs">
                      <thead className="sticky top-0">
                        <tr className="bg-primary">
                          <th className="px-2 py-2 text-left font-medium text-white">
                            Name
                          </th>
                          <th className="px-2 py-2 text-left font-medium text-white">
                            Date
                          </th>
                          <th className="px-2 py-2 text-right font-medium text-white">
                            Price
                          </th>
                          <th className="px-2 py-2 text-left font-medium text-white">
                            Category
                          </th>
                          <th className="px-2 py-2 text-center font-medium text-white">
                            Qty
                          </th>
                          <th className="px-2 py-2 text-center font-medium text-white">
                            Status
                          </th>
                          <th className="px-2 py-2 text-center font-medium text-white">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td
                            colSpan="7"
                            className="px-2 py-8 text-center text-primary-strong/60 text-sm"
                          >
                            No items added yet.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}

                {showItemForm && (
                  <div className="rounded-lg border border-accent/20 bg-accent/5 p-3 space-y-2">
                    <h5 className="font-medium text-accent text-sm">
                      Add Shopping Item
                    </h5>
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={itemForm.name}
                        onChange={(e) =>
                          onItemFormFieldChange("name", e.target.value)
                        }
                        className="w-full rounded-lg border border-primary/20 bg-white px-2 py-1.5 text-xs outline-none focus:border-primary/50"
                        placeholder="Item name"
                      />

                      <input
                        type="text"
                        value={itemForm.category}
                        onChange={(e) =>
                          onItemFormFieldChange("category", e.target.value)
                        }
                        className="w-full rounded-lg border border-primary/20 bg-white px-2 py-1.5 text-xs outline-none focus:border-primary/50"
                        placeholder="Category"
                        list="item-category-options"
                      />
                      <datalist id="item-category-options">
                        {categories.map((cat) => (
                          <option key={cat} value={cat} />
                        ))}
                      </datalist>

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="number"
                          min={0}
                          value={itemForm.estimatedPrice}
                          onChange={(e) =>
                            onItemFormFieldChange(
                              "estimatedPrice",
                              e.target.value,
                            )
                          }
                          className="w-full rounded-lg border border-primary/20 bg-white px-2 py-1.5 text-xs outline-none focus:border-primary/50"
                          placeholder="Price"
                        />
                        <input
                          type="number"
                          min={1}
                          value={itemForm.quantity}
                          onChange={(e) =>
                            onItemFormFieldChange("quantity", e.target.value)
                          }
                          className="w-full rounded-lg border border-primary/20 bg-white px-2 py-1.5 text-xs outline-none focus:border-primary/50"
                          placeholder="Qty"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="date"
                          value={itemForm.duedDate}
                          onChange={(e) =>
                            onItemFormFieldChange("duedDate", e.target.value)
                          }
                          className="w-full rounded-lg border border-primary/20 bg-white px-2 py-1.5 text-xs outline-none focus:border-primary/50"
                        />
                        <select
                          value={itemForm.status}
                          onChange={(e) =>
                            onItemFormFieldChange("status", e.target.value)
                          }
                          className="w-full rounded-lg border border-primary/20 bg-white px-2 py-1.5 text-xs outline-none focus:border-primary/50"
                        >
                          <option value="Planning">Planning</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>

                      <div className="flex gap-2 justify-end">
                        <button
                          type="button"
                          onClick={submitItemForm}
                          className="rounded-lg bg-accent px-3 py-1 text-xs text-white hover:bg-accent-strong"
                        >
                          + Add
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Buttons - full width below */}
              <div className="col-span-full flex justify-center gap-3 mt-4 pt-4 border-t border-primary/10">
                <button
                  type="button"
                  className="rounded-full border border-primary/30 px-6 py-2 text-sm text-primary hover:bg-primary/5"
                  onClick={closeTaskForm}
                >
                  Cancel
                </button>
                <CommonButton
                  type="submit"
                  label={editingTaskId ? "Save Change" : "Create Task"}
                  color="accent"
                  className="!rounded-full !px-8 !py-2 text-sm"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

function FieldRow({ label, children, inline = false }) {
  return (
    <div
      className={`grid gap-2 ${inline ? "grid-cols-[80px_1fr] items-center" : "grid-cols-1"}`}
    >
      <label className="text-sm font-semibold text-primary-strong">
        {label}
      </label>
      {children}
    </div>
  );
}

function OverviewRow({ title, value, helperText, colorClass, isLast = false }) {
  return (
    <div className={isLast ? "" : "mb-4"}>
      <div className="mb-1 flex items-center justify-between">
        <p className="text-sm font-medium text-primary-strong">{title}</p>
        <ChevronDownIcon className="h-4 w-4 text-primary-strong/75" />
      </div>
      <p className="mb-1 text-xs text-primary-strong/75">{value}%</p>
      <div className="h-2 overflow-hidden rounded-full bg-primary/10">
        <div
          className={`h-full ${colorClass}`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
      <p className="mt-1 text-[11px] text-primary-strong/60">{helperText}</p>
    </div>
  );
}
