import {
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

export const TaskProgress = ({ summary }) => {
    return (
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
    )
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
