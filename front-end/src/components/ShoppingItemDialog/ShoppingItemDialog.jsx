import React, { useState, useRef, useEffect } from "react";

import { XMarkIcon } from "@heroicons/react/24/outline";
import CommonButton from "../Button/CommonButton";
import { ShoppingTable } from "../ShoppingTable";
import ShoppingItemForm from "./ShoppingItemForm";
import { getTetTimelineAuto } from "../../utils/getTetTimelineAuto";
import ShoppingItemMessages from "./ShoppingItemMessages";

const statusOptions = ["Planning", "Completed"];

export default function ShoppingItemDialog({
    open = true,
    onClose,
    mode = "add", // 'add' | 'edit'
    initialData = null,
    onSave,
    recentlyAddedItems = [],
    totalShoppingCost = 0,
    remainingBudget = 0,
    maxBudget = 0,
    taskList = [],
    budgetCategories = [],
}) {
    const [sessionAddedItems, setSessionAddedItems] = useState([]);

    const newItemsCount = sessionAddedItems.length;
    const addedAmount = sessionAddedItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

    const initialFormState = {
        task: initialData?.task || "",
        taskId: initialData?.taskId || "",
        itemName: initialData?.itemName || "",
        budgetCategory: initialData?.budgetCategory || "",
        budgetCategoryName: initialData?.budgetCategoryName || "",
        estimatedPrice: initialData?.estimatedPrice || "",
        quantity: initialData?.quantity || 1,
        duedDate: initialData?.duedDate || "",
        status: initialData?.status || "",
        id: initialData?.id || undefined,
        timeline: initialData?.duedDate ? getTetTimelineAuto(initialData.duedDate) : "",
    };
    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        if (open) {
            setFormData({
                ...initialFormState,
                timeline: initialData?.duedDate ? getTetTimelineAuto(initialData.duedDate) : "",
            });
            setSessionAddedItems([]);
        }
    }, [open]);

    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const [showTaskDropdown, setShowTaskDropdown] = useState(false);
    const taskDropdownRef = useRef(null);

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
                            {mode === "add" ? "Shopping Item" : "Edit Shopping Item"}
                        </h2>
                        <p className="text-black/50 text-sm">
                            Tet is more fun when your budget stays happy too
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
                        taskOptions={taskList}
                        budgetCategories={budgetCategories}
                        statusOptions={statusOptions}
                    />
                    
                    {/* Save button */}
                    <div className="pt-4 flex justify-center">
                        <CommonButton
                            label="Save change"
                            color="success"
                            onClick={async () => {
                                if (
                                    !formData.taskId || !formData.itemName || !formData.budgetCategory || !formData.quantity
                                    || !formData.estimatedPrice || !formData.duedDate || !formData.status
                                ) {
                                    alert("Please fill in all required fields!");
                                    return;
                                }
                                if (onSave) {
                                    const isSuccess = await onSave(formData);
                                    console.log("Save status:", isSuccess)
                                        
                                    if (isSuccess && mode === "add") {
                                        const newItem = {
                                            id: Date.now().toString(),
                                            name: formData.itemName,
                                            dued_time: formData.duedDate,
                                            price: Number(formData.estimatedPrice),
                                            category: formData.budgetCategoryName,
                                            quantity: Number(formData.quantity),
                                            status: formData.status,
                                        };
                                        setSessionAddedItems(prev => [newItem, ...prev]);
                                        setFormData(initialFormState);
                                    }
                                }
                            }}
                        />
                    </div>

                    {/* Recently added section - Only show in add mode */}
                    {mode === "add" && sessionAddedItems.length > 0 && (
                        <div className="mt-8 flex gap-6 items-start">
                            {/* Left: Table */}
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-primary mb-2">
                                    Recently added shopping items
                                </h3>

                                <ShoppingTable items={sessionAddedItems} />
                            </div>

                            {/* Right: Messages */}
                            <ShoppingItemMessages
                                formData={sessionAddedItems[0]}
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