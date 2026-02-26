import React, { useState } from "react";

export default function CategoryCostWidget({
    category,
    percent,
    spent,
    total,
    color = "var(--color-primary)",
    bg = "var(--color-surface)",
    barColor = "var(--color-success)",
    barBg = "#CBD5E1",
    currency = "VND"
}) {
    const [expanded, setExpanded] = useState(true);
    let warningMsg = null;
    if (percent >= 100) {
        warningMsg = <div className="text-sm text-red-600 mb-3 font-semibold">Alert: Over category budget!</div>;
    } else if (percent >= 80) {
        warningMsg = <div className="text-sm text-orange-500 mb-3 font-semibold">Warning: Near category budget limit!</div>;
    }
    return (
        <div className="rounded-2xl shadow-md border border-gray-200 mb-3 font-sans" style={{ background: bg }}>
            <button
                className="flex items-center justify-between w-full px-4 py-4 focus:outline-none"
                onClick={() => setExpanded(e => !e)}
                aria-expanded={expanded}
                style={{ cursor: 'pointer', fontFamily: 'var(--font-sans)' }}
            >
                <span className="text-base font-semibold" style={{ color, fontFamily: 'var(--font-sans)' }}>{category}</span>
                <svg
                    className={`w-5 h-5 transition-transform duration-200 ${expanded ? '' : 'rotate-180'}`}
                    fill="none"
                    stroke="gray"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {expanded && (
                <div className="px-4 pb-4">
                    <div className="flex items-center justify-between text-sm mb-1" style={{fontFamily: 'var(--font-sans)'}}>
                        <span className="text-black/70">{percent}%</span>
                        <span style={{ color }}>{total.toLocaleString()}</span>
                    </div>
                    <div className="h-2 rounded-full mb-2" style={{ background: barBg }}>
                        <div
                            className="h-2 rounded-full"
                            style={{ width: `${percent}%`, background: barColor }}
                        />
                    </div>
                    {warningMsg}
                    <div className="text-2xl font-semibold flex items-end" style={{ color, fontFamily: 'var(--font-sans)' }}>
                        {spent.toLocaleString()}
                        <span className="text-2xl font-semibold ml-1">{currency}</span>
                    </div>
                </div>
            )}
        </div>
    );
}