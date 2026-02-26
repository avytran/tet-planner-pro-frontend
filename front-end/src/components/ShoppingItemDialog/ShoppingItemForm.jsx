import React from "react";
import { getTetTimelineAuto } from "../../utils/getTetTimelineAuto";

function formatNumberWithCommas(value) {
    if (!value) return "";
    const number = value.toString().replace(/\D/g, "");
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function ShoppingItemForm({ formData, setFormData, showCategoryDropdown, setShowCategoryDropdown, showStatusDropdown, setShowStatusDropdown,
                                           showTaskDropdown, setShowTaskDropdown, taskDropdownRef, taskOptions, budgetCategories, statusOptions }) {
    React.useEffect(() => {
        if (formData.duedDate) {
            const timeline = getTetTimelineAuto(formData.duedDate);
            if (timeline !== formData.timeline) {
                setFormData(f => ({ ...f, timeline }));
            }
        }
    }, [formData.duedDate]);

    return (
        <div className="space-y-4">
            {/* Task field */}
            <div className="flex items-center gap-4">
                <label className="w-24 text-sm font-semibold text-black">
                    Task <span className="text-red-500">*</span>
                </label>
                <div className="flex-1 max-w-xs relative" ref={taskDropdownRef}>
                    <div className="relative">
                        <input
                            type="text"
                            value={formData.task}
                            onChange={e => {
                                setFormData({ ...formData, task: e.target.value });
                                setShowTaskDropdown(true);
                            }}
                            onFocus={() => setShowTaskDropdown(true)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-black placeholder:text-gray-400 pr-10"
                            placeholder="Select task"
                            autoComplete="off"
                        />

                        {/* Chevron button */}
                        <button
                            type="button"
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-transparent border-none cursor-pointer"
                            tabIndex={0}
                            onMouseDown={e => {
                                e.preventDefault();
                                setShowTaskDropdown(v => !v);
                            }}
                        >
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                    
                    {/* Dropdown */}
                    {showTaskDropdown && (
                        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto">
                            {taskOptions.filter(task => task.title.toLowerCase().includes(formData.task.toLowerCase())).length === 0 ? (
                                <div className="px-4 py-2 text-gray-400">No task found</div>
                            ) : (
                                taskOptions
                                    .filter(task => task.title.toLowerCase().includes(formData.task.toLowerCase()))
                                    .map(task => (
                                        <div
                                            key={task.id}
                                            className={`px-4 py-2 hover:bg-gray-100 cursor-pointer text-black ${formData.taskId === task.id ? "bg-gray-50" : ""}`}
                                            onMouseDown={() => {
                                                setFormData({ ...formData, task: task.title, taskId: task.id });
                                                setShowTaskDropdown(false);
                                            }}
                                        >
                                            {task.title}
                                        </div>
                                    ))
                            )}
                        </div>
                    )}
                </div>
            </div>
            
            {/* Item details row */}
            <div className="flex flex-wrap items-start gap-4">
                {/* Item name */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-black font-semibold">
                        Item name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={formData.itemName}
                        onChange={e => setFormData({ ...formData, itemName: e.target.value })}
                        className="w-40 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-black placeholder:text-gray-400"
                        placeholder="Enter item name"
                    />
                </div>
                
                {/* Budget category */}
                <div className="flex flex-col gap-1 relative">
                    <label className="text-sm text-black font-semibold">
                        Budget Category <span className="text-red-500">*</span>
                    </label>
                    <div
                        className="w-36 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer flex justify-between items-center bg-white focus:border-primary"
                        tabIndex={0}
                        onClick={() => setShowCategoryDropdown(true)}
                        onBlur={() => setTimeout(() => setShowCategoryDropdown(false), 150)}
                    >
                        <span className={formData.budgetCategory ? "text-black" : "text-gray-400"}>
                            {budgetCategories.find(c => c.id === formData.budgetCategory)?.name || "Select"}
                        </span>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                    {showCategoryDropdown && (
                        <div className="absolute top-full left-0 mt-1 w-36 bg-white border border-gray-300 rounded-lg shadow-lg z-20" tabIndex={0} onBlur={() => setShowCategoryDropdown(false)}>
                            {budgetCategories.map(category => (
                                <div
                                    key={category.id}
                                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2 text-black ${formData.budgetCategory === category.id ? "bg-gray-50" : ""}`}
                                    onMouseDown={() => {
                                        setFormData({
                                            ...formData,
                                            budgetCategory: category.id,
                                            budgetCategoryName: category.name
                                        });
                                        setShowCategoryDropdown(false);
                                    }}
                                >
                                    {(formData.budgetCategory === category.id) && (
                                        <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                    {category.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                
                {/* Estimated price */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-black font-semibold">
                        Estimated price <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={formatNumberWithCommas(formData.estimatedPrice)}
                            onChange={e => {
                                const raw = e.target.value.replace(/,/g, "");
                                if (/^\d*$/.test(raw)) {
                                    setFormData({ ...formData, estimatedPrice: raw });
                                }
                            }}
                            className="w-36 pr-6 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-black placeholder:text-gray-400"
                            placeholder="0"
                            style={{ paddingRight: '3rem' }}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm bg-white pl-1">VND</span>
                    </div>
                </div>

                {/* Quantity */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-black font-semibold">
                        Quantity <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        value={formData.quantity}
                        onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                        className="w-20 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-center text-black"
                        min="1"
                    />
                </div>

                {/* Dued date */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-black font-semibold">
                        Dued date <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="date"
                        value={formData.duedDate}
                        onChange={e => setFormData({ ...formData, duedDate: e.target.value })}
                        className="w-36 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-black"
                    />

                    {/* Timeline tag */}
                    {formData.timeline && (
                        <div className="mt-1 flex justify-end">
                            <span className="inline-block px-3 py-1 text-xs rounded-full bg-festive text-black">
                                {formData.timeline}
                            </span>
                        </div>
                    )}
                </div>

                {/* Status */}
                <div className="flex flex-col gap-1 relative">
                    <label className="text-sm text-black font-semibold">
                        Status <span className="text-red-500">*</span>
                    </label>
                    <div
                        className="w-36 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer flex justify-between items-center bg-white focus:border-primary"
                        tabIndex={0}
                        onClick={() => setShowStatusDropdown(true)}
                        onBlur={() => setTimeout(() => setShowStatusDropdown(false), 150)}
                    >
                        <span className={formData.status ? "text-black" : "text-gray-400"}>
                            {formData.status || "Select status"}
                        </span>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                    {showStatusDropdown && (
                        <div className="absolute top-full left-0 mt-1 w-32 bg-white border border-gray-300 rounded-lg shadow-lg z-20" tabIndex={0} onBlur={() => setShowStatusDropdown(false)}>
                            {statusOptions.map(status => (
                                <div
                                    key={status}
                                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2 text-black ${formData.status === status ? "bg-gray-50" : ""}`}
                                    onMouseDown={() => {
                                        setFormData({ ...formData, status });
                                        setShowStatusDropdown(false);
                                    }}
                                >
                                    {formData.status === status && (
                                        <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                    {status}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}