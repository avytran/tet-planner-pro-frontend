import React from "react";

function formatNumberWithCommas(value) {
    if (!value) return "";
    const number = value.toString().replace(/\D/g, "");
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function ShoppingItemForm({ formData, setFormData, showCategoryDropdown, setShowCategoryDropdown, showStatusDropdown, setShowStatusDropdown, showTaskDropdown,
                                           setShowTaskDropdown, taskDropdownRef, taskOptions, budgetCategories, statusOptions, timelineOptions }) {
    return (
        <div className="space-y-4">
            {/* Task field */}
            <div className="flex items-center gap-4">
                <label className="w-24 text-sm font-semibold text-black">Task</label>
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
                            {taskOptions.filter(task => task.toLowerCase().includes(formData.task.toLowerCase())).length === 0 ? (
                                <div className="px-4 py-2 text-gray-400">No task found</div>
                            ) : (
                                taskOptions
                                    .filter(task => task.toLowerCase().includes(formData.task.toLowerCase()))
                                    .map(task => (
                                        <div
                                            key={task}
                                            className={`px-4 py-2 hover:bg-gray-100 cursor-pointer text-black`}
                                            onMouseDown={() => {
                                                setFormData({ ...formData, task });
                                                setShowTaskDropdown(false);
                                            }}
                                        >
                                            {task}
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
                    <label className="text-sm text-black font-semibold">Item name</label>
                    <input
                        type="text"
                        value={formData.itemName}
                        onChange={e => setFormData({ ...formData, itemName: e.target.value })}
                        className="w-40 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-black placeholder:text-gray-400"
                        placeholder="Enter item name"
                    />
                </div>
                
                {/* Budget Category */}
                <div className="flex flex-col gap-1 relative">
                    <label className="text-sm text-black font-semibold">Budget Category</label>
                    <div
                        className="w-36 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer flex justify-between items-center bg-white focus:border-primary"
                        tabIndex={0}
                        onClick={() => setShowCategoryDropdown(true)}
                        onBlur={() => setTimeout(() => setShowCategoryDropdown(false), 150)}
                    >
                        <span className={formData.budgetCategory ? "text-black" : "text-gray-400"}>
                            {formData.budgetCategory || "Select"}
                        </span>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                    {showCategoryDropdown && (
                        <div className="absolute top-full left-0 mt-1 w-36 bg-white border border-gray-300 rounded-lg shadow-lg z-20" tabIndex={0} onBlur={() => setShowCategoryDropdown(false)}>
                            {budgetCategories.map(category => (
                                <div
                                    key={category}
                                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2 text-black ${formData.budgetCategory === category ? "bg-gray-50" : ""}`}
                                    onMouseDown={() => {
                                        setFormData({ ...formData, budgetCategory: category });
                                        setShowCategoryDropdown(false);
                                    }}
                                >
                                    {formData.budgetCategory === category && (
                                        <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                    {category}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                
                {/* Estimated price */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-black font-semibold">Estimated price</label>
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
                    <label className="text-sm text-black font-semibold">Quantity</label>
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
                    <label className="text-sm text-black font-semibold">Dued date</label>
                    <input
                        type="date"
                        value={formData.duedDate}
                        onChange={e => setFormData({ ...formData, duedDate: e.target.value })}
                        className="w-36 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-black"
                    />

                    {/* Timeline tags */}
                    <div className="flex gap-1 mt-1">
                        {timelineOptions.map(timeline => (
                            <button
                                key={timeline}
                                onClick={() => setFormData({ ...formData, timeline })}
                                className={`px-2 py-0.5 text-xs rounded-full transition ${formData.timeline === timeline ? "bg-festive/90 text-black" : "bg-gray-100 text-black hover:bg-gray-200"}`}
                            >
                                {timeline}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Status */}
                <div className="flex flex-col gap-1 relative">
                    <label className="text-sm text-black font-semibold">Status</label>
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