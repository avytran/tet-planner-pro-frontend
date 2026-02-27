import { useState, useMemo } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useMutation } from '@apollo/client/react';
import { DELETE_SHOPPING_ITEM } from '@/graphql/mutations/shoppingItem.mutation';

import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

import { ConfirmModel } from '../Task/ConfirmModel';
import { ShoppingItemDialog } from '../ShoppingItemDialog';

import { getStatusBadgeStyle } from '@/utils/getItemStatusBadgeStyle';
import { formatDate } from '@/utils/formatDate';

export const ShoppingTable = ({ mode = "display", items = [] }) => {
    const { user } = useAuth();
    const [currentPage, setCurrentPage] = useState(1);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [seletedItem, setSeletedItem] = useState(null);

    const [deleteShoppingItem] = useMutation(DELETE_SHOPPING_ITEM);

    const handleClickDeleteButton = (id) => {
        setSeletedItem(id);
        setOpenConfirm(true);
    }

    const handleDeleteItem = async () => {
        await deleteShoppingItem({
            variables: {
                userId: user.id,
                itemId: seletedItem
            }
        });

        setSeletedItem(null);
        setOpenConfirm(false);
    };

    const handleClickEditButton = (id) => {
        setSeletedItem(id);
        setOpenEditDialog(true);
    }

    const editedItem = useMemo(() => {
        for (const item of items) {
            if (item.id === seletedItem) {
                return item;
            }
        }
    }, [seletedItem])

    return (
        <div className="flex-1 w-full">
            {
                openEditDialog && (
                    <ShoppingItemDialog
                        onClose={() => { setOpenEditDialog(false) }}
                        item={editedItem}
                    />
                )
            }
            {
                openConfirm && (
                    <ConfirmModel
                        setOpenConfirm={setOpenConfirm}
                        title="Delete Shopping Item"
                        msg="Are you sure you want to delete this item?"
                        mutationName="Delete"
                        handleMutation={handleDeleteItem}
                    />
                )
            }
            {/* Table */}
            <div className="bg-surface rounded-xl overflow-hidden border border-gray-200 shadow-md">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[698px]">
                        <thead>
                            <tr className="bg-primary h-[47px]">
                                <th className="px-4 text-xs font-semibold text-white tracking-wider font-sans">Name</th>
                                <th className="px-4 text-xs font-semibold text-white tracking-wider font-sans">Date</th>
                                <th className="px-4 text-xs font-semibold text-white tracking-wider font-sans">Price</th>
                                <th className="px-4 text-xs font-semibold text-white tracking-wider font-sans">Category</th>
                                <th className="px-4 text-xs font-semibold text-white tracking-wider text-center font-sans">Quantity</th>
                                <th className="px-4 text-xs font-semibold text-white tracking-wider font-sans">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.length > 0 ? (
                                items.map((item, index) => (
                                    <tr
                                        key={item.id}
                                        className={`border-b border-festive/20 hover:bg-festive/10 transition-colors h-[48px] ${index % 2 === 0 ? 'bg-surface' : 'bg-highlight/30'}`}
                                    >
                                        <td className="px-4">
                                            <span className="text-sm text-black font-sans font-light">{item.name}</span>
                                        </td>
                                        <td className="px-4">
                                            <span className="text-sm text-black font-sans font-light">{formatDate(item.duedTime)}</span>
                                        </td>
                                        <td className="px-4">
                                            <span className="text-sm text-black font-sans font-light">{item.price?.toLocaleString('en-US')}</span>
                                        </td>
                                        <td className="px-4">
                                            <span className="text-sm text-black font-sans font-light">{item.budget.name}</span>
                                        </td>
                                        <td className="px-4 text-center">
                                            <span className="text-sm text-black font-sans font-light">{item.quantity}</span>
                                        </td>
                                        <td className="px-4">
                                            <div className="flex items-center justify-between">
                                                {/* Status */}
                                                <span
                                                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium font-sans ${getStatusBadgeStyle(item.status)}`}
                                                >
                                                    {item.status}
                                                </span>

                                                {/* Buttons */}
                                                {
                                                    mode === "display" && (
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                type="button"
                                                                className="inline-flex items-center justify-center rounded-lg border border-primary/20 px-2.5 py-1.5 text-primary hover:bg-primary/5 cursor-pointer"
                                                                onClick={() => { handleClickEditButton(item.id) }}
                                                            >
                                                                <PencilSquareIcon className="h-4 w-4" />
                                                            </button>

                                                            <button
                                                                type="button"
                                                                className="inline-flex items-center justify-center rounded-lg border border-primary/20 px-2.5 py-1.5 text-primary hover:bg-primary/5 cursor-pointer"
                                                                onClick={() => handleClickDeleteButton(item.id)}
                                                            >
                                                                <TrashIcon className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-4 py-10 text-center text-black/40 italic font-sans">
                                        No matching results found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            {/* {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-4">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="text-primary hover:text-primary-strong cursor-pointer disabled:text-text-muted disabled:opacity-50 disabled:cursor-not-allowed font-sans text-sm"
                    >
                        &lt;
                    </button>
                    <span className="text-primary font-sans text-sm">Page {currentPage}/{totalPages}</span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="text-primary hover:text-primary-strong cursor-pointer disabled:text-text-muted disabled:opacity-50 disabled:cursor-not-allowed font-sans text-sm"
                    >
                        &gt;
                    </button>
                </div>
            )} */}
        </div>
    );
};