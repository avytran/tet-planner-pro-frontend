import React, { useState } from 'react';
import { ShoppingFilter } from '../../components/ShoppingFilter/ShoppingFilter';
import { ShoppingTable } from '../../components/ShoppingTable/ShoppingTable';
import RowActionDialog from '../../components/ShoppingTable/RowActionDialog';
import CommonButton from '../../components/Button/CommonButton';
import ShoppingItemMessages from '../../components/ShoppingItemDialog/ShoppingItemMessages';
import CategoryCostWidget from '../../components/ShoppingListWidgets/CategoryCostWidget';
import ProgressWidget from '../../components/ShoppingListWidgets/ProgressWidget';
import ShoppingItemDialog from '../../components/ShoppingItemDialog/ShoppingItemDialog';

export default function ShoppingListPage() {
    // Dummy data for demo
    const [filters, setFilters] = useState({
        priceRange: [0, 5000000],
        categories: [],
        timeline: [],
        status: [],
    });
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [rowActionDialog, setRowActionDialog] = useState({ open: false, rowIdx: null });
    const [editDialog, setEditDialog] = useState({ open: false, data: null });
    const [searchValue, setSearchValue] = useState("");
    const [sortValue, setSortValue] = useState("");
    const shoppingItems = [
        { id: 1, name: 'Bao lì xì', dued_time: '2026-02-01T08:00:00', price: 55000, category: 'Decoration', quantity: 55, status: 'Planning' },
        { id: 2, name: 'Bao lì xì', dued_time: '2026-02-01T12:30:00', price: 55000, category: 'Decoration', quantity: 55, status: 'Completed' },
        { id: 3, name: 'Bao lì xì', dued_time: '2026-02-01T14:45:00', price: 55000, category: 'Decoration', quantity: 55, status: 'Planning' },
        { id: 4, name: 'Bao lì xì', dued_time: '2026-02-01T16:15:00', price: 55000, category: 'Decoration', quantity: 55, status: 'Planning' },
        { id: 5, name: 'Bao lì xì', dued_time: '2026-02-01T18:33:44', price: 55000, category: 'Decoration', quantity: 55, status: 'Planning' },
    ];
    const categories = ['Food', 'Decoration', 'Cloth', 'Gift'];

    // Dummy stats
    const totalShoppingCost = 10000000;
    const shoppingCompleted = 35; // percent
    const totalCategoryCost = [
        { category: 'Decoration', spent: 400000, total: 2000000 },
        { category: 'Food', spent: 400000, total: 2000000 },
        { category: 'Decoration', spent: 400000, total: 2000000 },
    ];

    return (
        <div className="bg-bg min-h-screen flex flex-col px-4 py-12 md:p-20">
            {/* Header */}
            <div className="container mx-auto flex items-center justify-between pb-8">
                <p className="text-5xl font-semibold text-primary">Shopping List</p>
                <div className="flex gap-4">
                    <CommonButton 
                        label={
                        <span className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                            Add Item
                        </span>
                        }
                        color="accent"
                        onClick={() => setOpenAddDialog(true)}
                    />
                    <CommonButton label="Clear All" color="danger" />
                </div>
            </div>

            <div className="container mx-auto max-w-screen-2xl">
                <div className="flex gap-8 flex-wrap min-w-0 w-full">
                    {/* Filter Sidebar */}
                    <div className="w-[220px] min-w-[180px] flex-shrink-0">
                        <ShoppingFilter
                        filters={filters}
                        onFilterChange={setFilters}
                        categories={categories}
                        />
                    </div>

                    {/* Main Content */}
                    <div className="flex flex-col md:flex-row gap-6 flex-1 min-w-0">
                        <div className="flex-1 flex flex-col gap-4 min-w-0">
                            {/* Search - Sort */}
                            <div className="flex items-center justify-between gap-4 w-full">
                                {/* Search */}
                                <div className="relative flex-1 max-w-[60%]">
                                    <input
                                        type="text"
                                        placeholder="Value"
                                        value={searchValue}
                                        onChange={e => setSearchValue(e.target.value)}
                                        className={`w-full pl-4 pr-10 py-2 border border-gray-300 bg-white rounded-full focus:outline-none focus:border-primary ${searchValue ? 'text-black' : 'text-gray-400'} placeholder:text-gray-400`}
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                                        </svg>
                                    </span>
                                </div>
                                {/* Sort By */}
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-primary">Sort by</span>
                                    <div className="relative">
                                        <select
                                            className={`px-3 py-2 pr-8 border border-gray-300 rounded-full focus:outline-none focus:border-primary bg-white hover:bg-gray-100 appearance-none ${sortValue ? 'text-black' : 'text-gray-400'}`}
                                            value={sortValue}
                                            onChange={e => setSortValue(e.target.value)}
                                        >
                                            <option value="" disabled hidden>Select</option>
                                            <option value="date" className="text-black hover:bg-gray-100">Date</option>
                                            <option value="price" className="text-black hover:bg-gray-100">Price</option>
                                            <option value="quantity" className="text-black hover:bg-gray-100">Quantity</option>
                                        </select>
                                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {/* Table */}
                            <div className="overflow-x-auto">
                                <div className="min-w-full">
                                    <ShoppingTable
                                        items={shoppingItems}
                                        onRowClick={idx => setRowActionDialog({ open: true, rowIdx: idx })}
                                    />
                                    <RowActionDialog
                                        open={rowActionDialog.open}
                                        onClose={() => setRowActionDialog({ open: false, rowIdx: null })}
                                        onEdit={() => {
                                            const item = shoppingItems[rowActionDialog.rowIdx];
                                            setEditDialog({ open: true, data: {
                                                task: '',
                                                itemName: item.name,
                                                budgetCategory: item.category,
                                                estimatedPrice: item.price,
                                                quantity: item.qty,
                                                duedDate: item.date,
                                                timeline: '',
                                                status: item.status,
                                                id: item.id,
                                            }});
                                            setRowActionDialog({ open: false, rowIdx: null });
                                        }}
                                        onDelete={() => {
                                            // TODO: handle delete logic
                                            setRowActionDialog({ open: false, rowIdx: null });
                                        }}
                                    />
                                    <ShoppingItemDialog
                                        open={editDialog.open}
                                        onClose={() => setEditDialog({ open: false, data: null })}
                                        mode="edit"
                                        initialData={editDialog.data}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Widgets */}
                        <div className="w-full md:w-[340px] min-w-[180px] flex flex-col gap-4 flex-shrink md:ml-0 ml-0 md:mt-0 mt-6 items-stretch">
                            {/* Shopping completed + Timeline widget */}
                            <div className="w-full">
                                <div className="bg-surface rounded-2xl shadow-md border border-gray-200 p-4 flex flex-col gap-2 mb-2 w-full">
                                    <ProgressWidget
                                        title="Shopping completed"
                                        percent={shoppingCompleted}
                                        bought={35}
                                        total={100}
                                        showCheck={true}
                                        subLabel={`You bought 35/100 planning items`}
                                        barColor="var(--color-success-strong)"
                                        barBg="#CBD5E1"
                                        subTextColor="text-black/50"
                                    />
                                    <div className="mt-1" />
                                    <ProgressWidget
                                        title="Timeline"
                                        percent={60}
                                        subLabel={`24 Tết`}
                                        barColor="var(--color-success)"
                                        barBg="#CBD5E1"
                                        subTextColor="text-black/50"
                                        hidePercent={true}
                                    />
                                </div>
                            </div>

                            {/* Total shopping cost widget */}
                            <div className="w-full">
                                <div className="w-full">
                                    <ShoppingItemMessages
                                        formData={{status: filters.status.length === 1 ? filters.status[0] : "Completed"}}
                                        totalShoppingCost={7500000}
                                        remainingBudget={11000000}
                                        maxBudget={11000000}
                                        onlyTotalCard={true}
                                    />
                                </div>
                            </div>

                            {/* Total category cost widgets */}
                            <div className="mb-1 mt-2">
                                <span className="text-xl font-semibold text-black" style={{fontFamily: 'var(--font-sans)'}}>Total category cost</span>
                            </div>
                            {totalCategoryCost.map((cat, idx) => (
                                <CategoryCostWidget
                                    key={idx}
                                    category={cat.category}
                                    percent={35}
                                    spent={cat.spent}
                                    total={cat.total}
                                    color = "var(--color-primary)"
                                    bg = "var(--color-surface)"
                                    barColor = "var(--color-success-strong)"
                                    barBg = "#CBD5E1"
                                    currency = "VND"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <ShoppingItemDialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} />
        </div>
    );
}