import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { useMutation, useQuery } from "@apollo/client/react"
import { GET_SHOPPING_ITEMS_OF_TASK } from "@/graphql/queries/task.query"
import { DELETE_SHOPPING_ITEM } from "@/graphql/mutations/shoppingItem.mutation"
import { ConfirmModel } from "./ConfirmModel"

export const TaskShoppingItems = ({ taskId }) => {
    const { user } = useAuth();
    const [openConfirm, setOpenConfirm] = useState(false);
    const [selectedItem, setSelectedItem] = useState("");

    const { data } = useQuery(GET_SHOPPING_ITEMS_OF_TASK, {
        variables: {
            userId: user.id,
            params: {
                taskId: taskId
            },
        }
    })

    const [deleteItem] = useMutation(DELETE_SHOPPING_ITEM);

    const taskItems = data?.getShoppingItemsOfUser?.items || [];

    const handleOpenConfirm = (item) => {
        setOpenConfirm(true);
        setSelectedItem(item)
    }

    const handleDeleteItem = async () => {
        if (!selectedItem) return;

        await deleteItem({
            variables: {
                userId: user.id,
                itemId: selectedItem.id,
            },
            refetchQueries: [
                {
                    query: GET_SHOPPING_ITEMS_OF_TASK,
                    variables: {
                        userId: user.id,
                        params: { taskId },
                    },
                },
            ],
        });

        setOpenConfirm(false);
        setSelectedItem(null);
    };

    return (
        <div className="flex flex-col space-y-3">
            {
                openConfirm && (
                    <ConfirmModel
                        setOpenConfirm={setOpenConfirm}
                        title="Delete Shopping Item"
                        msg="Are you sure you want to delete this item?"
                        item={selectedItem.name}
                        mutationName="Delete"
                        handleMutation={handleDeleteItem}
                    />
                )
            }
            <div className="flex items-center justify-between">
                <h4 className="font-semibold text-primary">Shopping Items</h4>
                {/* <button
                                type="button"
                                onClick={openItemForm}
                                className="text-sm text-accent hover:text-accent-strong font-medium"
                            >
                                + Add Item
                            </button> */}
            </div>

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
                    {
                        taskItems?.length > 0 ? (
                            <tbody>
                                {taskItems.map((item, idx) => (
                                    <tr
                                        key={item.id}
                                        className={`border-t border-primary/10 hover:bg-primary/5 ${idx % 2 === 0 ? "bg-surface" : "bg-highlight/30"}`}
                                    >
                                        <td className="px-2 py-2 truncate">{item.name}</td>
                                        <td className="px-2 py-2">
                                            {item.duedTime
                                                ? new Date(item.duedTime).toLocaleDateString(
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
                                            {item.price || 0}
                                        </td>
                                        <td className="px-2 py-2">{item.budget.name}</td>
                                        <td className="px-2 py-2 text-center">
                                            {item.quantity}
                                        </td>
                                        <td className="px-2 py-2 text-center">
                                            <span
                                                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${item.status === "Completed"
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
                                                onClick={() => handleOpenConfirm(item)}
                                                className="text-danger hover:text-danger-strong text-xs font-medium"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        ) : (
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
                        )
                    }

                </table >
            </div >
        </div >
    )
}
