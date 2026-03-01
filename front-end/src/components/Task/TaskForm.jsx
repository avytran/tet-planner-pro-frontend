import { PRIORITY_OPTIONS, TASK_STATUS_OPTIONS } from "@/constants/taskConstant";
import CommonButton from "../Button/CommonButton";
import { useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createTaskSchema } from "@/schemas/task.schema";

import { useMutation, useQuery } from "@apollo/client/react";
import { CREATE_TASK, UPDATE_TASK } from "@/graphql/mutations/task.mutation";

import { useAuth } from "@/hooks/useAuth";

import { useDispatch } from "react-redux";
import { initScope } from "@/features/undoRedo/undoRedoSlice";
import { pushHistory } from "@/features/undoRedo/undoRedoSlice";

import { formatTimeline, serializeTaskInput } from "@/utils/formatTask.util";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { ManageCategoryPopup } from "./ManageCategoryPopup";
import { GET_TASKS_OF_USER } from "@/graphql/queries/task.query";
import { GET_TASK_CATEGORIES } from "@/graphql/queries/taskCategory.query";
import { CREATE_TASK_CATEGORY } from "@/graphql/mutations/taskCategory.mutation";
import { TASKS_PER_PAGE, SCOPE } from "@/constants/taskConstant";

export const TaskForm = ({ selectedTask, handleCloseTaskForm, currentPage }) => {
    const { user } = useAuth();
    const [open, setOpen] = useState(false);

    const { data: categoriesData } = useQuery(GET_TASK_CATEGORIES, {
        variables: { userId: user?.id },
        skip: !user?.id,
    });

    const variables = {
        userId: user.id,
        params: {
            page: currentPage,
            pageSize: TASKS_PER_PAGE,
        },
    };

    const [mutateTask] = useMutation(selectedTask ? UPDATE_TASK : CREATE_TASK, {
        refetchQueries: [
            {
                query: GET_TASKS_OF_USER,
                variables: variables,
            },
        ],
    });

    const [createTaskCategory] = useMutation(CREATE_TASK_CATEGORY, {
        refetchQueries: [
            {
                query: GET_TASK_CATEGORIES,
                variables: variables,
            },
        ],
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(createTaskSchema),
        defaultValues: {
            title: selectedTask?.title,
            categoryId: selectedTask?.category?.id,
            duedTime: selectedTask?.duedTime,
            priority: selectedTask?.priority || PRIORITY_OPTIONS[0],
            status: selectedTask?.status || TASK_STATUS_OPTIONS[0].value
        }
    });

    const categories = categoriesData?.getTaskCategoriesOfUser || [];

    const dispatch = useDispatch();

    // Dispatch history
    useEffect(() => {
        dispatch(initScope(SCOPE));
    }, [])

    const onSubmit = async (formData) => {
        let payload = {
            input: formData,
            userId: user.id
        }

        // If updating
        if (selectedTask) {
            // Add taskId to payload
            payload = { ...payload, taskId: selectedTask.id };
        } 

        const { data } = await mutateTask({
            variables: payload
        });

        if (selectedTask) {
            dispatch(
                pushHistory({
                    scope: SCOPE,
                    record: {
                        type: "UPDATE",
                        oldData: serializeTaskInput(selectedTask),
                        newData: serializeTaskInput(data.updateTaskOfUser),
                    },
                })
            );
        } else {
            dispatch(
                pushHistory({
                    scope: SCOPE,
                    record: { type: "CREATE", newData: serializeTaskInput(data.createTaskOfUser) },
                })
            );
        }

        reset();
        handleCloseTaskForm();
    };

    return (
        <>
            {/* Task Category Form */}
            {
                open && (
                    <ManageCategoryPopup
                        setOpen={setOpen}
                        createTaskCategory={createTaskCategory}
                    />
                )
            }
            {/* Task Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-3">
                    <h4 className="font-semibold text-primary mb-4">Task Details</h4>

                    {/* Title */}
                    <FieldRow label="Title">
                        <input
                            {...register("title")}
                            type="text"
                            placeholder="Task title"
                            className="w-full rounded-lg border border-primary/20 bg-white px-3 py-2 text-sm outline-none focus:border-primary/50"
                        />
                        {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
                    </FieldRow>

                    {/* Category */}
                    <FieldRow>
                        <label className="text-sm font-semibold text-primary-strong">
                            Category
                            <button
                                type="button"
                                onClick={() => setOpen(true)}
                                className="ml-2 text-xs text-accent hover:text-accent-strong cursor-pointer"
                            >
                                + Add
                            </button>
                        </label>
                        <div className="relative">
                            <select
                                {...register("categoryId")}
                                className="w-full appearance-none rounded-lg border border-primary/20 bg-white px-3 py-2 pr-10 text-sm outline-none focus:border-primary/50"
                            >
                                <option value="">-- Select category --</option>
                                {categories?.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                            <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/70" />
                        </div>

                        {errors.categoryId && (
                            <p className="text-red-500 text-xs">
                                {errors.categoryId.message}
                            </p>
                        )}
                    </FieldRow>

                    {/* Due Time */}
                    <FieldRow label="Due Time">
                        <input
                            {...register("duedTime")}
                            type="date"
                            className="w-full rounded-lg border border-primary/20 bg-white px-3 py-2 text-sm outline-none focus:border-primary/50"
                        />
                        {errors.duedTime && <p className="text-red-500 text-xs">{errors.duedTime.message}</p>}
                    </FieldRow>

                    <div className="grid grid-cols-2 gap-3">
                        {/* Priority */}
                        <FieldRow label="Priority" inline>
                            <div className="relative">
                                <select
                                    {...register("priority")}
                                    className="w-full appearance-none rounded-lg border border-primary/20 bg-white px-3 py-2 pr-10 text-sm outline-none focus:border-primary/50"
                                >
                                    {PRIORITY_OPTIONS.map((option) => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>

                                <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/70" />
                            </div>
                            {errors.priority && <p className="text-red-500 text-xs">{errors.priority.message}</p>}
                        </FieldRow>

                        {/* Status */}
                        <FieldRow label="Status" inline>
                            <div className="relative">
                                <select
                                    {...register("status")}
                                    className="w-full appearance-none rounded-lg border border-primary/20 bg-white px-3 py-2 pr-10 text-sm outline-none focus:border-primary/50"

                                >
                                    {TASK_STATUS_OPTIONS.map((o) => (
                                        <option key={o.value} value={o.value}>{o.label}</option>
                                    ))}
                                </select>
                                <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/70" />
                            </div>
                            {errors.status && <p className="text-red-500 text-xs">{errors.status.message}</p>}
                        </FieldRow>
                    </div>

                    {
                        selectedTask && (
                            <FieldRow label="Timeline" inline>
                                <input
                                    type="text"
                                    value={formatTimeline(selectedTask.timeline)}
                                    className="w-full rounded-lg border border-primary/20 bg-white px-3 py-2 text-sm outline-none focus:border-primary/50"
                                    disabled={true}
                                />
                            </FieldRow>
                        )
                    }
                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-3 mt-4 pt-4 border-t">
                    <button type="button" onClick={handleCloseTaskForm}>
                        Cancel
                    </button>
                    <CommonButton
                        type="submit"
                        label={selectedTask ? "Save Change" : "Create Task"}
                    />
                </div>
            </form>
        </>
    );
};

function FieldRow({ label, children, inline = false }) {
    return (
        <div
            className={`grid gap-1 ${inline ? "grid-cols-[60px_1fr] items-center" : "grid-cols-1"}`}
        >
            <label className="text-sm font-semibold text-primary-strong">
                {label}
            </label>
            {children}
        </div>
    );
}