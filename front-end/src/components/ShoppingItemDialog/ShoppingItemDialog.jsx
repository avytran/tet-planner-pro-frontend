import React, { useState, useRef, useEffect } from "react";

import { XMarkIcon } from "@heroicons/react/24/outline";
import CommonButton from "../Button/CommonButton";
import { ShoppingTable } from "../ShoppingTable";
import ShoppingItemForm from "./ShoppingItemForm";
import ShoppingItemMessages from "./ShoppingItemMessages";

const statusOptions = ["Planning", "Completed"];
const timelineOptions = ["Before Tet", "30 Tet", "Mung 1-3"];

export default function ShoppingItemDialog({
    open = true,
    onClose,
    mode = "add", // 'add' | 'edit'
    initialData = null,
}) {
    // Simulate fetch from DB (replace with real API call)
    const [budgetCategories, setBudgetCategories] = useState([]);
    // Simulate task list with category mapping (replace with real API call)
    const [taskList, setTaskList] = useState([
        { title: "Mâm ngũ quả", category: "Food" },
        { title: "Trang trí nhà cửa", category: "Shopping" },
        { title: "Chuẩn bị bánh chưng", category: "Food" },
        { title: "Mua hoa", category: "Gift" },
        { title: "Lì xì", category: "Gift" },
    ]);

    useEffect(() => {
        // Simulate async fetch
        setTimeout(() => {
        setBudgetCategories(["Shopping", "Drink", "Food", "Gift", "xxxx"]);
        }, 200);
    }, []);

    const initialFormState = {
        task: initialData?.task || "",
        itemName: initialData?.itemName || "",
        budgetCategory: initialData?.budgetCategory || "",
        estimatedPrice: initialData?.estimatedPrice || "",
        quantity: initialData?.quantity || 1,
        duedDate: initialData?.duedDate || "",
        timeline: initialData?.timeline || "",
        status: initialData?.status || "",
    };
    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        if (open) {
        setFormData(initialFormState);
        }
    }, [open]);

    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const [showTaskDropdown, setShowTaskDropdown] = useState(false);
    const taskDropdownRef = useRef(null);

    useEffect(() => {
        const found = taskList.find(t => t.title === formData.task);
        if (found && found.category && formData.budgetCategory !== found.category) {
        setFormData(f => ({ ...f, budgetCategory: found.category }));
        }
    }, [formData.task]);

    useEffect(() => {
        if (!showTaskDropdown) return;
        function handleClickOutside(e) {
        if (taskDropdownRef.current && !taskDropdownRef.current.contains(e.target)) {
            setShowTaskDropdown(false);
        }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showTaskDropdown]);

    if (!open) return null;

    return (
        <div
        className="fixed inset-0 flex items-center justify-center bg-black/50"
        style={{ zIndex: 1100 }}
        onClick={onClose}
        >
        <div
            className="bg-white rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-y-auto mx-4 relative"
            onClick={e => e.stopPropagation()}
        >
            {/* Close button */}
            <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition z-10 cursor-pointer"
            >
            <XMarkIcon className="w-6 h-6 text-gray-500" />
            </button>

            <div className="p-8">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-2xl font-medium text-black">
                {mode === "add" ? "Shopping item" : "Edit shopping item"}
                </h2>
                <p className="text-black/50 text-sm">
                Tết is more fun when your budget stays happy too
                </p>
            </div>

            {/* Form section */}
            <ShoppingItemForm
                formData={formData}
                setFormData={setFormData}
                showCategoryDropdown={showCategoryDropdown}
                setShowCategoryDropdown={setShowCategoryDropdown}
                showStatusDropdown={showStatusDropdown}
                setShowStatusDropdown={setShowStatusDropdown}
                showTaskDropdown={showTaskDropdown}
                setShowTaskDropdown={setShowTaskDropdown}
                taskDropdownRef={taskDropdownRef}
                taskOptions={taskList.map(t => t.title)}
                budgetCategories={budgetCategories}
                statusOptions={statusOptions}
                timelineOptions={timelineOptions}
            />
            {/* Save button */}
            <div className="pt-2 flex justify-center">
                <CommonButton
                label="Save change"
                color="success"
                onClick={() => {}}
                />
            </div>

            {/* Recently added section - Only show in add mode */}
            {mode === "add" && (
                <div className="mt-8 flex gap-6 items-center">
                {/* Left: Table */}
                <div className="flex-1">
                    <h3 className="text-xl font-semibold text-primary mb-2">
                    Recently added shopping items
                    </h3>
                    <p className="text-lg text-primary text-sm mb-4">
                    Task: {formData.task}
                    </p>

                    <ShoppingTable items={mockRecentlyAdded.map(item => ({
                    id: item.id,
                    name: item.name,
                    dued_time: item.date,
                    price: item.price,
                    category: item.category,
                    quantity: item.qty,
                    status: item.status,
                    }))} />
                </div>

                {/* Right: Messages */}
                <ShoppingItemMessages
                    formData={formData}
                    totalShoppingCost={totalShoppingCost}
                    remainingBudget={remainingBudget}
                    maxBudget={maxBudget}
                    newItemsCount={newItemsCount}
                    addedAmount={addedAmount}
                />
                </div>
            )}
            </div>
        </div>
        </div>
    );
}