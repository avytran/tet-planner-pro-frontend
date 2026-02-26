import {
  XMarkIcon,
} from "@heroicons/react/24/outline";

import CommonButton from "../Button/CommonButton";

import { PRIORITY_OPTIONS, TASK_STATUS_OPTIONS, TIMELINE_OPTIONS } from "@/constants/taskConstant";

export const TaskForm = ({ editingTaskId, closeTaskForm, submitTaskForm, taskForm, categories,
     formError, openItemForm, taskItems, showItemForm, submitItemForm, deleteItem}) => {
    return (
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
    )
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