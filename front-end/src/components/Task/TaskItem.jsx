import {
  CalendarDaysIcon,
  ChevronDownIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import { useState } from "react";
import { useMutation } from "@apollo/client/react";

import { PRIORITY_CLASS, STATUS_CLASS, TASK_STATUS_OPTIONS } from "@/constants/taskConstant";
import { DELETE_TASK } from "@/graphql/mutations/task.mutation";
import { useAuth } from "@/hooks/useAuth";

import { ConfirmModel } from "./ConfirmModel";

export const TaskItem = ({ task, handleOpenEditTaskForm }) => {
    const { user } = useAuth();
    const [deleteTask] = useMutation(DELETE_TASK);
    const [openConfirm, setOpenConfirm] = useState(false);

    const handleDeleteTask = async () => {
        await deleteTask({
            variables: {
                userId: user.id,
                taskId: task.id,
            }
        });

        setOpenConfirm(false);
    }

    return (
        <li
            className="overflow-hidden rounded-xl border border-primary/10 bg-white shadow-[0_2px_6px_rgba(0,0,0,0.08)]"
        >
            {
                openConfirm && (
                    <ConfirmModel 
                        setOpenConfirm={setOpenConfirm}
                        title="Delete Task"
                        msg="Are you sure you want to delete this task?"
                        item={task.title}
                        mutationName="Delete"
                        handleMutation={handleDeleteTask}
                    />
                )
            }
            <div className="flex">
                <span
                    className="w-3"
                    style={{ backgroundColor: task.barColor }}
                ></span>
                <div className="grid flex-1 grid-cols-1 gap-3 p-3 md:grid-cols-[2fr_1fr_1fr_140px_40px_40px] md:items-center md:gap-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-primary-strong">
                                {task.title}
                            </p>
                        </div>
                        <div className="mt-1 flex items-center gap-1 text-xs text-primary-strong/70">
                            <CalendarDaysIcon className="h-3.5 w-3.5" />
                            <span>
                                {new Date(task.duedTime).toLocaleDateString("en-US", {
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
                            {task.category.name}
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
                            {TASK_STATUS_OPTIONS.map((s) => (
                                <option key={s.value} value={s.value}>
                                    {s.label}
                                </option>
                            ))}
                        </select>
                        <ChevronDownIcon className="pointer-events-none absolute right-2 top-2 h-4 w-4 text-primary/70" />
                    </div>

                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-lg border border-primary/20 px-2.5 py-1.5 text-primary hover:bg-primary/5 cursor-pointer"
                        onClick={() => handleOpenEditTaskForm(task)}
                        aria-label={`Edit ${task.title}`}
                    >
                        <PencilSquareIcon className="h-4 w-4" />
                    </button>

                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-lg border border-primary/20 px-2.5 py-1.5 text-primary hover:bg-primary/5 cursor-pointer"
                        onClick={() => setOpenConfirm(true)}
                    >
                        <TrashIcon className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </li>
    )
}
