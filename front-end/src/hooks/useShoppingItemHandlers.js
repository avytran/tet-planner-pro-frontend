import { useCallback } from 'react';

export function useShoppingItemHandlers({
    updateShoppingItem,
    deleteShoppingItem,
    createShoppingItem,
    refetch,
    setEditDialog,
    setRowActionDialog,
    shoppingItems,
    rowActionDialog,
    userId
}) {
    const handleAddSave = useCallback(async (formData) => {
        try {
            await createShoppingItem({
                variables: {
                    userId,
                    input: {
                        name: formData.itemName,
                        price: Number(formData.estimatedPrice),
                        quantity: Number(formData.quantity),
                        duedTime: new Date(formData.duedDate).toISOString(),
                        status: formData.status,
                        budgetId: formData.budgetCategory,
                        taskId: formData.taskId,
                    },
                },
            });
            await refetch();
            return true;
        } catch (e) {
            alert("Add item failed!");
            return false;
        }
    }, [createShoppingItem, refetch, userId]);

    const handleEditSave = useCallback(async (formData) => {
        if (!formData?.id) return false;
        try {
            await updateShoppingItem({
                variables: {
                    userId,
                    itemId: formData.id,
                    input: {
                        name: formData.itemName,
                        price: Number(formData.estimatedPrice),
                        quantity: Number(formData.quantity),
                        duedTime: new Date(formData.duedDate).toISOString(),
                        status: formData.status,
                        budgetId: formData.budgetCategory,
                        taskId: formData.taskId,
                    },
                },
            });
            await refetch();
            setEditDialog({ open: false, data: null });
            return true;
        } catch (e) {
            alert("Edit item failed!");
            return false;
        }
    }, [updateShoppingItem, refetch, setEditDialog, userId]);

    const handleDelete = useCallback(async () => {
        const item = shoppingItems[rowActionDialog.rowIdx];
        if (!item?.id) return;
        try {
            await deleteShoppingItem({
                variables: { userId, itemId: item.id },
            });
            await refetch();
        } catch (e) {
            alert("Delete item failed!");
        }
        setEditDialog({ open: false, data: null });
        if (typeof setRowActionDialog === 'function') {
            setRowActionDialog({ open: false, rowIdx: null });
        }
    }, [deleteShoppingItem, refetch, setEditDialog, setRowActionDialog, shoppingItems, rowActionDialog, userId]);

    return { handleAddSave, handleEditSave, handleDelete };
}