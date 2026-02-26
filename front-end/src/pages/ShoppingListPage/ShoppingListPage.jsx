import React, { useState, useContext, useEffect } from 'react';
import { ShoppingFilter } from '../../components/ShoppingFilter/ShoppingFilter';
import { ShoppingTable } from '../../components/ShoppingTable/ShoppingTable';
import RowActionDialog from '../../components/ShoppingTable/RowActionDialog';
import CommonButton from '../../components/Button/CommonButton';
import ShoppingItemMessages from '../../components/ShoppingItemDialog/ShoppingItemMessages';
import CategoryCostWidget from '../../components/ShoppingListWidgets/CategoryCostWidget';
import { filterShoppingItems } from '../../utils/shoppingItemFilter';
import { useShoppingItemHandlers } from '../../hooks/useShoppingItemHandlers';
import { AuthContext } from '../../context/AuthContext';
import ProgressWidget from '../../components/ShoppingListWidgets/ProgressWidget';
import ShoppingItemDialog from '../../components/ShoppingItemDialog/ShoppingItemDialog';

import { useQuery, useMutation } from '@apollo/client/react';
import { GET_SHOPPING_LIST_DATA } from '../../graphql/queries/shopping.query';
import { UPDATE_SHOPPING_ITEM, DELETE_SHOPPING_ITEM, CREATE_SHOPPING_ITEM } from '../../graphql/mutations/shopping.mutation';

export default function ShoppingListPage() {
    const [filters, setFilters] = useState({
        priceRange: [0, 5000000],
        categories: [],
        timeline: [],
        status: [],
    });
    const { user } = useContext(AuthContext);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [rowActionDialog, setRowActionDialog] = useState({ open: false, rowIdx: null });
    const [editDialog, setEditDialog] = useState({ open: false, data: null });
    const [updateShoppingItem] = useMutation(UPDATE_SHOPPING_ITEM);
    const [deleteShoppingItem] = useMutation(DELETE_SHOPPING_ITEM);
    const [createShoppingItem] = useMutation(CREATE_SHOPPING_ITEM);
    const [searchValue, setSearchValue] = useState("");
    const [sortValue, setSortValue] = useState("");

    const buildParams = () => {
        const params = {
            sortBy: sortValue || undefined,
            sortOrder: "asc",
        };
        return params;
    };
    
    const userId = user?.id || "";
    const { data, previousData, loading, error, refetch } = useQuery(GET_SHOPPING_LIST_DATA, {
        variables: {
            userId,
            params: buildParams(),
        },
        fetchPolicy: "cache-and-network",
    });
    const currentData = data || previousData;

    const rawItems = (currentData?.getShoppingItemsOfUser?.items || []).map(item => ({
        ...item,
        dued_time: item.duedTime,
        category: item.budget?.name || '',
    }));
    const maxPrice = rawItems.length > 0 ? Math.max(...rawItems.map(i => i.price || 0)) : 5000000;

    React.useEffect(() => {
        setFilters(f => {
            let [min, max] = f.priceRange;
            if (max > maxPrice) max = maxPrice;
            if (min > max) min = 0;
            return { ...f, priceRange: [min, max] };
        });
    }, [maxPrice]);

    const budgets = currentData?.getBudgetsOfUser || [];
    const tasks = currentData?.getTasksOfUser || [];
    const totalBudget = currentData?.getTotalBudget?.totalBudget || 0;

    useEffect(() => {
        if (rawItems.length > 0) {
            const maxPrice = Math.max(...rawItems.map(i => i.price || 0));
            setFilters(f => ({
                ...f,
                priceRange: [0, maxPrice]
            }));
        }
    }, [currentData]);

    let shoppingItems = filterShoppingItems(rawItems, filters);
    if (searchValue) {
        shoppingItems = shoppingItems.filter(item => 
            item.name && item.name.toLowerCase().includes(searchValue.toLowerCase())
        );
    }

    const budgetCategoryObjects = budgets.map(b => ({ id: b?.id, name: b?.name })).filter(b => b.id && b.name);
    const totalShoppingCostRaw = rawItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shoppingCompletedRaw = rawItems.length > 0 ? Math.round((rawItems.filter(i => i.status === 'Completed').length / rawItems.length) * 100) : 0;
    const totalCategoryCostRaw = budgets.map(budget => {
        const spent = rawItems.filter(i => i.budget?.id === budget.id).reduce((sum, i) => sum + (i.price * i.quantity), 0);
        return {
            category: budget.name,
            spent,
            total: budget.allocatedAmount,
        };
    });

    // HOOKS
    const {
        handleEditSave,
        handleDelete,
        handleAddSave
    } = useShoppingItemHandlers({
        updateShoppingItem,
        deleteShoppingItem,
        createShoppingItem,
        refetch,
        setEditDialog,
        setOpenAddDialog,
        setRowActionDialog,
        shoppingItems,
        rowActionDialog,
        userId
    });

    useEffect(() => {
        if (rowActionDialog.open && (rowActionDialog.rowIdx == null || rowActionDialog.rowIdx >= shoppingItems.length)) {
            setRowActionDialog({ open: false, rowIdx: null });
        }
    }, [shoppingItems.length]);

    if (loading && !currentData) return <div className="p-10 text-center">Loading shopping items...</div>;
    if (error) return <div className="p-10 text-center text-red-500">Error loading shopping items!</div>;

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
                    <CommonButton 
                        label="Clear All" 
                        color="danger" 
                        onClick={async () => {
                            if (window.confirm("Are you sure you want to clear all shopping items?")) {
                                for (const item of shoppingItems) {
                                    try {
                                        await deleteShoppingItem({ variables: { userId, itemId: item.id } });
                                    } catch (e) {}
                                }
                                await refetch();
                                setFilters(f => ({ ...f, priceRange: [0, 5000000] }));
                            }
                        }}
                    />
                </div>
            </div>

            <div className="container mx-auto max-w-screen-2xl">
                <div className="flex gap-8 flex-wrap min-w-0 w-full">
                    {/* Filter Sidebar */}
                    <div className="w-[220px] min-w-[180px] flex-shrink-0">
                        <ShoppingFilter
                            filters={filters}
                            onFilterChange={setFilters}
                            categories={budgetCategoryObjects.map(b => b.name)}
                            maxPrice={maxPrice}
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
                                        onChange={e => {
                                            setSearchValue(e.target.value);
                                        }}
                                        className={`w-full pl-4 pr-10 py-2 border border-gray-300 bg-white rounded-full focus:outline-none focus:border-primary ${searchValue ? 'text-black' : 'text-gray-400'} placeholder:text-gray-400`}
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none">
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
                                            className={`px-3 py-2 pr-10 border border-gray-300 rounded-full focus:outline-none focus:border-primary bg-white hover:bg-gray-100 appearance-none ${sortValue ? 'text-black' : 'text-gray-400'}`}
                                            value={sortValue}
                                            onChange={e => { setSortValue(e.target.value); refetch(); }}
                                        >
                                            <option value="" disabled hidden>Select</option>
                                            <option value="dued_time" className="text-black hover:bg-gray-100">Date</option>
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
                                                task: item.task?.title || '',
                                                taskId: item.task?.id || '',
                                                itemName: item.name,
                                                budgetCategory: item.budget?.id || '',
                                                budgetCategoryName: item.budget?.name || '',
                                                estimatedPrice: item.price,
                                                quantity: item.quantity,
                                                duedDate: item.duedTime ? item.duedTime.slice(0,10) : '',
                                                status: item.status,
                                                id: item.id,
                                            }});
                                            setRowActionDialog({ open: false, rowIdx: null });
                                        }}
                                        onDelete={handleDelete}
                                    />
                                    <ShoppingItemDialog
                                        open={editDialog.open}
                                        onClose={() => setEditDialog({ open: false, data: null })}
                                        mode="edit"
                                        initialData={editDialog.data}
                                        onSave={handleEditSave}
                                        recentlyAddedItems={rawItems.slice(-5).reverse()}
                                        totalShoppingCost={totalShoppingCostRaw}
                                        remainingBudget={totalBudget - totalShoppingCostRaw}
                                        maxBudget={totalBudget}
                                        taskList={tasks
                                            .map(t => ({
                                                id: t.id,
                                                title: typeof t.title === 'string' ? t.title : '',
                                                category: typeof t.category === 'string' ? t.category : ''
                                            }))
                                            .filter(t => t.title)
                                        }
                                        budgetCategories={budgetCategoryObjects}
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
                                        percent={shoppingCompletedRaw}
                                        bought={rawItems.filter(i => i.status === 'Completed').length}
                                        total={rawItems.length}
                                        showCheck={true}
                                        subLabel={`You bought ${rawItems.filter(i => i.status === 'Completed').length}/${rawItems.length} planning items`}
                                        barColor="var(--color-success)"
                                        barBg="#E5E7EB"
                                        subTextColor="text-black/50"
                                    />
                                    <div className="mt-1" />
                                </div>
                            </div>

                            {/* Total shopping cost widget (status filter logic kept) */}
                            <div className="w-full">
                                <div className="w-full">
                                    <ShoppingItemMessages
                                        formData={{status: "Completed"}}
                                        totalShoppingCost={totalShoppingCostRaw}
                                        remainingBudget={totalBudget - totalShoppingCostRaw}
                                        maxBudget={totalBudget}
                                        onlyTotalCard={true}
                                        overBudget={totalShoppingCostRaw > totalBudget}
                                    />
                                </div>
                            </div>

                            {/* Total category cost widgets */}
                            <div className="mb-1 mt-2">
                                <span className="text-xl font-semibold text-black" style={{fontFamily: 'var(--font-sans)'}}>Total category cost</span>
                            </div>
                            {totalCategoryCostRaw.map((cat, idx) => (
                                <CategoryCostWidget
                                    key={idx}
                                    category={cat.category}
                                    percent={cat.total > 0 ? Math.min(100, Math.round((cat.spent / cat.total) * 100)) : 0}
                                    spent={cat.spent}
                                    total={cat.total}
                                    color = "var(--color-primary)"
                                    bg = "var(--color-surface)"
                                    barColor = "var(--color-success)"
                                    barBg = "#E5E7EB"
                                    currency = "VND"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            
            <ShoppingItemDialog
                open={openAddDialog}
                onClose={() => setOpenAddDialog(false)}
                onSave={handleAddSave}
                mode="add"
                recentlyAddedItems={rawItems.slice(-5).reverse()}
                totalShoppingCost={totalShoppingCostRaw}
                remainingBudget={totalBudget - totalShoppingCostRaw}
                maxBudget={totalBudget}
                taskList={tasks
                    .map(t => ({
                        id: t.id,
                        title: typeof t.title === 'string' ? t.title : '',
                        category: typeof t.category === 'string' ? t.category : ''
                    }))
                    .filter(t => t.title)
                }
                budgetCategories={budgetCategoryObjects}
            />
        </div>
    );
}