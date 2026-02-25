import React from "react";

export default function ProgressWidget({
    title = "Shopping completed",
    percent = 0,
    bought = 0,
    total = 0,
    showCheck = false,
    subLabel = "",
    barColor = "var(--color-success)",
    barBg = "#CBD5E1",
    subTextColor = "text-black/50",
    hidePercent = false
    }) {
    return (
        <div className="bg-surface rounded-2xl p-0 flex flex-col gap-0 font-sans">
            <span className="text-base font-semibold text-black mb-0.5">{title}</span>
            {!hidePercent && (
                <div className="flex items-center justify-between mb-0.5 w-full">
                    <span className="text-sm text-black" style={{fontFamily: 'var(--font-sans)'}}>{percent}%</span>
                    {showCheck && (
                        <svg className="w-5 h-5 text-black" fill="none" stroke="var(--color-black)" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    )}
                </div>
            )}
            <div className="w-full h-2 rounded-full mb-1" style={{ background: barBg }}>
                <div
                    className="h-2 rounded-full"
                    style={{ width: `${percent}%`, background: barColor }}
                />
            </div>
            {subLabel && (
                <span className={`text-sm font-normal ${subTextColor}`} style={{fontFamily: 'var(--font-sans)'}}>{subLabel}</span>
            )}
        </div>
    );
}