import React from "react";

export default function RowActionDialog({ open, onClose, onEdit, onDelete }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50" onClick={onClose}>
            <div
                className="bg-[var(--color-bg)] rounded-2xl border border-primary/50 shadow-lg p-0 min-w-[180px] max-w-xs flex flex-col items-center justify-center"
                onClick={e => e.stopPropagation()}
            >
                <button
                    className="group w-full flex flex-row items-center gap-2 py-3 px-4 rounded-t-2xl text-[var(--color-accent)] bg-transparent text-base border-b border-primary/50 hover:cursor-pointer hover:bg-[var(--color-accent-soft)] hover:text-white transition"
                    onClick={onEdit}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.536-6.536a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0L9 13z" />
                    </svg>
                    <span>Edit</span>
                </button>
                <button
                    className="group w-full flex flex-row items-center gap-2 py-3 px-4 rounded-b-2xl text-[var(--color-danger)] bg-transparent text-base hover:cursor-pointer hover:bg-[var(--color-text)] hover:text-white transition"
                    onClick={onDelete}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Delete</span>
                </button>
            </div>
        </div>
    );
}
