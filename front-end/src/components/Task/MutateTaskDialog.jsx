import {
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { TaskForm } from "./TaskForm";
import { TaskShoppingItems } from "./TaskShoppingItems";

export const MutateTaskDialog = ({ selectedTask, handleCloseTaskForm, categories, taskItems }) => {
    return (
        <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/40 p-4 overflow-y-auto">
            <div className="w-full max-w-5xl rounded-2xl border border-primary/10 bg-surface p-5 md:p-6 my-8">
                <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                        <h3 className="text-3xl font-bold text-primary">
                            {selectedTask ? "Edit Task" : "New Task"}
                        </h3>
                        <p className="mt-1 text-sm text-primary-strong/60">
                            Tết is more fun when your deadline stays in line too.
                        </p>
                    </div>
                    <button
                        type="button"
                        className="rounded-full border border-primary/30 p-1 text-primary flex-shrink-0"
                        onClick={handleCloseTaskForm}
                        aria-label="Close form"
                    >
                        <XMarkIcon className="h-5 w-5" />
                    </button>
                </div>

                <div className={`grid gap-6 md:grid-cols-[1fr_${selectedTask ? "1fr" : "auto"}]`}>
                    {/* Left column: Task form */}
                    <TaskForm
                        selectedTask={selectedTask}
                        categories={categories}
                        handleCloseTaskForm={handleCloseTaskForm}
                    />
                    {/* Right column: Shopping items */}
                    {
                        selectedTask && (
                            <TaskShoppingItems
                                taskId={selectedTask.id}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    )
}