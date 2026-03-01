import { useSelector, useDispatch } from "react-redux";
import { undo, redo, updateFutureRecord, updatePastRecord } from "@/features/undoRedo/undoRedoSlice";
import { useMutation } from "@apollo/client/react";
import { useAuth } from "./useAuth";
import { GET_TASKS_OF_USER } from "@/graphql/queries/task.query";
import {
    CREATE_TASK,
    UPDATE_TASK,
    DELETE_TASK
} from "../graphql/mutations/task.mutation";
import { TASKS_PER_PAGE, SCOPE } from "@/constants/taskConstant";

export function useUndoRedoTask(currentPage) {
    const { user } = useAuth();

    const variables = {
        userId: user.id,
        params: {
            page: currentPage,
            pageSize: TASKS_PER_PAGE,
        },
    };

    const dispatch = useDispatch();
    const history = useSelector(state => state.undoRedo[SCOPE]);

    const [createTask, { loading: creating }] = useMutation(CREATE_TASK, {
        refetchQueries: [{ query: GET_TASKS_OF_USER, variables }],
    });

    const [updateTask, { loading: updating }] = useMutation(UPDATE_TASK, {
        update(cache, { data }) {
            const updatedTask = data?.updateTaskOfUser;

            if (!updatedTask) return;

            const existing = cache.readQuery({
                query: GET_TASKS_OF_USER,
                variables,
                skip: !user?.id,
            });

            if (!existing) return;

            cache.writeQuery({
                query: GET_TASKS_OF_USER,
                variables,
                data: {
                    getTasksOfUser: {
                        ...existing.getTasksOfUser,
                        tasks: existing.getTasksOfUser.tasks.map(task =>
                            task.id === updatedTask.id
                                ? { ...task, ...updatedTask }
                                : task
                        ),
                    },
                },
            });
        },
    });

    const [deleteTask, { loading: deleting }] = useMutation(DELETE_TASK, {
        refetchQueries: [{ query: GET_TASKS_OF_USER, variables }],
    });

    const isMutating = creating || updating || deleting;

    const handleUndo = async () => {
        if (!history?.past.length || isMutating) return;

        const last = history.past[history.past.length - 1];
        dispatch(undo(SCOPE));

        switch (last.type) {
            case "CREATE":
                await deleteTask({
                    variables: {
                        userId: user.id,
                        taskId: last.newData.id
                    }
                });
                break;

            case "DELETE": {
                const { id: oldId, ...input } = last.oldData;

                const res = await createTask({
                    variables: {
                        userId: user.id,
                        input,
                    },
                });

                const newTask = res.data.createTaskOfUser;
                const newId = newTask.id;

                dispatch(
                    updateFutureRecord({
                        scope: SCOPE,
                        oldId,
                        newId,
                    })
                );

                break;
            }

            case "UPDATE":
                const { id: taskId, ...taskInput } = last.oldData;
                await updateTask({
                    variables: {
                        userId: user.id,
                        taskId: taskId,
                        input: taskInput
                    },
                });
                break;

            default:
                break;
        }
    };

    const handleRedo = async () => {
        if (!history?.future.length || isMutating) return;

        const last = history.future[history.future.length - 1];
        dispatch(redo(SCOPE));

        switch (last.type) {
            case "CREATE": {
                const { id: oldId, ...input } = last.newData;

                const res = await createTask({
                    variables: {
                        userId: user.id,
                        input,
                    },
                });

                const newTask = res.data.createTaskOfUser;
                const newId = newTask.id;

                dispatch(
                    updatePastRecord({
                        scope: SCOPE,
                        oldId,
                        newId,
                    })
                );

                break;
            }

            case "DELETE":
                await deleteTask({
                    variables: {
                        userId: user.id,
                        taskId: last.oldData.id
                    }
                });
                break;

            case "UPDATE":
                const { id: taskId, ...taskInput } = last.newData;
                await updateTask({
                    variables: {
                        userId: user.id,
                        taskId: taskId,
                        input: taskInput
                    },
                });
                break;

            default:
                break;
        }
    };

    return {
        handleUndo,
        handleRedo,
        canUndo: !!history?.past.length && !isMutating,
        canRedo: !!history?.future.length && !isMutating,
        isMutating,
    };
}