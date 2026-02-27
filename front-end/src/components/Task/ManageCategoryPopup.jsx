import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useMutation, useQuery } from "@apollo/client/react";
import { CREATE_TASK_CATEGORY, DELETE_TASK_CATEGORY } from "@/graphql/mutations/taskCategory.mutation";
import { GET_TASK_CATEGORIES } from "@/graphql/queries/taskCategory.query";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ConfirmModel } from "./ConfirmModel";

export const ManageCategoryPopup = ({ setOpen }) => {
    const { user } = useAuth();
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [openConfirm, setOpenConfirm] = useState(false);
    const [deletedCategoryId, setDeletedCategoryId] = useState(null);

    const { data, refetch } = useQuery(GET_TASK_CATEGORIES, {
        variables: { userId: user.id },
    });

    const [createTaskCategory] = useMutation(CREATE_TASK_CATEGORY);
    const [deleteTaskCategory] = useMutation(DELETE_TASK_CATEGORY);

    const categories = data?.getTaskCategoriesOfUser || [];

    const handleAdd = async () => {
        if (!name.trim()) {
            setError("Category name is required");
            return;
        }

        await createTaskCategory({
            variables: { userId: user.id, input: { name } },
        });

        setName("");
        setError("");
        refetch();
    };

    const handleDelete = async () => {
        await deleteTaskCategory({
            variables: { userId: user.id, categoryId: deletedCategoryId },
        });

        refetch();
        setOpenConfirm(false);
        setDeletedCategoryId(null);
    };

    const handleOpenConfirm = (id) => {
        setDeletedCategoryId(id);
        setOpenConfirm(true);
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            {
                openConfirm && (
                    <ConfirmModel 
                        setOpenConfirm={setOpenConfirm}
                        title="Delete Task Category"
                        msg="Are you sure you want to delete this category?"
                        mutationName="Delete"
                        handleMutation={handleDelete}
                    />
                )
            }
            <div className="w-full max-w-md rounded-2xl bg-white shadow-xl animate-fadeIn">

                {/* Header */}
                <div className="flex items-center justify-between border-b px-5 py-3">
                    <h3 className="text-lg font-semibold text-primary">
                        Manage Categories
                    </h3>
                    <button
                        onClick={() => setOpen(false)}
                        className="rounded-full p-1 hover:bg-gray-100 cursor-pointer"
                    >
                        <XMarkIcon className="h-5 w-5 text-gray-500" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-5 space-y-4">

                    {/* Add category */}
                    <div>
                        <label className="text-sm font-medium text-primary mb-1 block">
                            New category
                        </label>
                        <div className="flex gap-2">
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter category name"
                                className="flex-1 rounded-lg border border-primary/20 px-3 py-2 text-sm outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
                            />
                            <button
                                onClick={handleAdd}
                                className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-strong transition cursor-pointer"
                            >
                                Add
                            </button>
                        </div>
                        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
                    </div>

                    {/* List */}
                    <div>
                        <p className="mb-2 text-sm font-medium text-primary">
                            Existing categories
                        </p>

                        <ul className="max-h-48 space-y-2 overflow-y-auto rounded-lg border border-primary/10 p-2">
                            {categories.map((c) => (
                                <li
                                    key={c.id}
                                    className="flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-primary/5 transition"
                                >
                                    <span className="text-primary-strong">{c.name}</span>

                                    <button
                                        onClick={() => handleOpenConfirm(c.id)}
                                        className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-danger hover:bg-danger/10 hover:text-danger-strong transition cursor-pointer"
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                        Delete
                                    </button>
                                </li>
                            ))}

                            {categories.length === 0 && (
                                <li className="py-6 text-center text-xs text-primary/60">
                                    No categories yet
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end border-t px-5 py-3">
                    <button
                        onClick={() => setOpen(false)}
                        className="rounded-lg border px-4 py-1.5 text-sm hover:bg-gray-50 cursor-pointer"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};