import React from "react";
import { WalletIcon } from "@heroicons/react/24/outline";

export default function ShoppingItemMessages({
    formData,
    totalShoppingCost,
    remainingBudget,
    maxBudget,
    newItemsCount,
    addedAmount,
}) {
    let cardColor, textColor, valueColor, progressColor, badgeColor, fitBg, fitText;
    if (formData.status === "Completed") {
        cardColor = "bg-white border border-gray-200";
        textColor = "text-success";
        valueColor = "text-success-strong";
        progressColor = "bg-success-strong";
        badgeColor = "bg-success text-white";
        fitBg = "bg-success";
        fitText = "text-white";
    } else if (formData.status === "Planning") {
        cardColor = "bg-white border border-gray-200";
        textColor = "text-accent-soft";
        valueColor = "text-accent";
        progressColor = "bg-accent";
        badgeColor = "bg-accent-soft text-white";
        fitBg = "bg-accent-soft";
        fitText = "text-white";
    }
    
    if (!formData.status) return null;
    return (
        <div className="w-72 flex flex-col gap-4">
            {/* Total shopping cost card */}
            <div className={`${cardColor} rounded-2xl p-4 shadow-md`}>
                <p className={`text-sm mb-1 text-black font-semibold`}>Total shopping cost</p>
                <div className={`flex justify-between items-center text-xs mb-2 text-black`}>
                    <span>35%</span>
                    <span>{maxBudget.toLocaleString()}</span>
                </div>
                
                {/* Progress bar */}
                <div className="h-2 bg-gray-200 rounded-full mb-3">
                    <div
                        className={`h-2 rounded-full ${progressColor}`}
                        style={{ width: "35%" }}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <p className={`text-2xl font-bold ${valueColor}`}>
                            {totalShoppingCost.toLocaleString()}
                        </p>
                        <p className={`text-xs ${textColor} mt-1`}>
                            remaining {remainingBudget.toLocaleString()}
                        </p>
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${fitBg}`}>
                            <WalletIcon className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-sm text-black mt-1">VND</span>
                    </div>
                </div>
            </div>

            {/* Budget fit message */}
            <div className={`${fitBg} rounded-[36px] px-4 py-4`}>
                <p className={`${fitText} text-sm font-medium text-center`}>
                    {"This item fits well within your Tết budget"}
                </p>
            </div>

            {/* Recently added summary */}
            <div className={`${cardColor} rounded-2xl p-4 shadow-md`}>
                <div className="flex items-center gap-2 mb-2">
                    <p className={`text-sm text-black`}>You just add</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${badgeColor}`}>
                        {newItemsCount}
                    </span>
                    <span className={`text-sm text-black`}>new items</span>
                </div>
                <p className={`text-2xl font-bold ${valueColor}`}>
                    +{addedAmount.toLocaleString()} VND
                </p>
            </div>
        </div>
    );
}