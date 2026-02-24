import { useMemo, useState } from "react";
import { PieChart } from "@mui/x-charts";
import {
  CalendarDaysIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import CommonButton from "../../components/Button/CommonButton";
import { ShoppingFilter } from "../../components/ShoppingFilter";

const TASK_STATUS_OPTIONS = ["To Do", "In Progress", "Done"];

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

export default function TaskManagementPage() {
  const [tasks, setTasks] = useState(MOCK_TASKS);
  const [searchValue, setSearchValue] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [filters, setFilters] = useState({
    status: [],
    timeline: [],
    categories: [],
    priceRange: [0, 5000000],
  });

  const categories = useMemo(() => {
    return [...new Set(MOCK_TASKS.map((task) => task.category))];
  }, []);

  const visibleTasks = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();
    const [minPrice, maxPrice] = filters.priceRange;

    const filtered = tasks.filter((task) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        task.title.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        filters.status.length === 0 || filters.status.includes(task.budgetStatus);

      const matchesTimeline =
        filters.timeline.length === 0 || filters.timeline.includes(task.timeline);

      const matchesCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(task.category);

      const matchesPrice = task.totalCost >= minPrice && task.totalCost <= maxPrice;

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
    const inProgress = tasks.filter((task) => task.status === "In Progress").length;
    const done = tasks.filter((task) => task.status === "Done").length;
    const before = tasks.filter((task) => task.timeline === "Before Tet").length;

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
              onClick={() => {}}
            />
            <CommonButton
              label="Clear All"
              color="danger"
              className="!rounded-full !px-5 !py-2 text-sm"
              onClick={clearAll}
            />
          </div>
        </div>

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
                    <span className="w-3" style={{ backgroundColor: task.barColor }}></span>
                    <div className="grid flex-1 grid-cols-1 gap-3 p-3 md:grid-cols-[2fr_1fr_1fr_130px] md:items-center md:gap-4">
                      <div>
                        <p className="text-sm font-semibold text-primary-strong">{task.title}</p>
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
                        <p className="text-sm text-primary-strong">{task.category}</p>
                      </div>

                      <div>
                        <p className="text-[11px] font-semibold uppercase text-primary-strong/55">
                          Priority
                        </p>
                        <p className={`text-sm font-semibold ${PRIORITY_CLASS[task.priority]}`}>
                          {task.priority}
                        </p>
                      </div>

                      <div className="relative w-full md:w-[130px]">
                        <select
                          value={task.status}
                          onChange={(event) => onStatusChange(task.id, event.target.value)}
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
              <h2 className="mb-2 text-2xl font-semibold text-primary-strong">Tasks in Categories</h2>
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
              <h2 className="mb-4 text-3xl font-semibold text-primary-strong">Task Overview</h2>

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
    </section>
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
        <div className={`h-full ${colorClass}`} style={{ width: `${value}%` }}></div>
      </div>
      <p className="mt-1 text-[11px] text-primary-strong/60">{helperText}</p>
    </div>
  );
}
