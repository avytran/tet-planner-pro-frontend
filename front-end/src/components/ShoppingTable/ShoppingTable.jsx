import React, { useState } from 'react';

export const ShoppingTable = ({ items = [] }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;
    
    const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
    const paginatedItems = items.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );
    
    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };
    
    const getStatusBadgeStyle = (status) => {
        switch (status) {
            case 'Completed':
                return 'bg-success text-white';
            case 'Planning':
                return 'bg-accent text-white';
            default:
                return 'bg-text-muted/20 text-text-muted';
        }
    };
    
    return (
        <div className="flex-1 w-full">
            {/* Table */}
            <div className="bg-surface rounded-lg overflow-hidden border border-gray-200 shadow-sm">
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
                            {paginatedItems.length > 0 ? (
                                paginatedItems.map((item, index) => (
                                    <tr 
                                        key={item.id} 
                                        className={`border-b border-festive/20 hover:bg-festive/10 transition-colors h-[48px]
                                            ${index % 2 === 0 ? 'bg-surface' : 'bg-highlight/30'}`}
                                    >
                                        <td className="px-4">
                                            <span className="text-sm text-black font-sans font-light">{item.name}</span>
                                        </td>
                                        <td className="px-4">
                                            <span className="text-sm text-black font-sans font-light">{formatDate(item.dued_time)}</span>
                                        </td>
                                        <td className="px-4">
                                            <span className="text-sm text-black font-sans font-light">{item.price?.toLocaleString('en-US')}</span>
                                        </td>
                                        <td className="px-4">
                                            <span className="text-sm text-black font-sans font-light">{item.category}</span>
                                        </td>
                                        <td className="px-4 text-center">
                                            <span className="text-sm text-black font-sans font-light">{item.quantity}</span>
                                        </td>
                                        <td className="px-4">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium font-sans ${getStatusBadgeStyle(item.status)}`}>
                                                {item.status}
                                            </span>
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
            {totalPages > 1 && (
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
            )}
        </div>
    );
};