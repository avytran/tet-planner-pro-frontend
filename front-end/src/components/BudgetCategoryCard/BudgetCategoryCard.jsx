import { PencilIcon, TrashIcon, WalletIcon } from "@heroicons/react/24/outline";
// import { Progress } from "@/components/ui/progress";
import React from "react";

export default function BudgetCategoryCard({
  category,
  amountSpent,
  totalAmount,
  itemsCount,
}) {
  const remainingAmount = totalAmount - amountSpent;
  const percentageUsed = (amountSpent / totalAmount) * 100;
  let color = "success";
  if (percentageUsed > 50 && percentageUsed <= 80) {
    color = "accent-soft";
  } else if (percentageUsed > 80) {
    color = "highlight";
  }
  return (
    <div className="p-10 w-sm bg-white rounded-[40px] flex flex-col gap-4">
      <div className="flex ">
        <PencilIcon className="w-5 h-5 mr-4 " />
        <TrashIcon className="w-5 h-5 mr-4 " />
      </div>
      <p className="font-bold text-3xl text-left text-black">{category}</p>
      <div className="flex justify-between items-center">
        <div
          className={`h-14 w-14 rounded-full bg-${color} justify-center items-center flex`}
        >
          <WalletIcon className="w-9 h-9 text-white" />
        </div>
        <div className="flex flex-col items-end">
          <p className={`font-semibold text-2xl  text-${color}`}>
            {remainingAmount.toLocaleString("en-US")} VND
          </p>
          <p className="font-normal text-xl text-gray-400">
            /{totalAmount.toLocaleString("en-US")} VND
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <p className="font-normal text-xl text-black text-left">Remaining</p>
          <span className="font-normal text-xl text-black text-left">
            {percentageUsed}%
          </span>
        </div>

        {/* <Progress value={75} className="*:bg-success" /> */}
        <span className="font-normal text-sm text-gray-500 text-left">
          You've spent {amountSpent.toLocaleString("en-US")} VND
        </span>
      </div>
      <div className="flex justify-between relative">
        <button>Detail</button>
        <div className="flex">
          <div className="h-6 w-6 bg-primary-strong rounded-full absolute right-12" />
          <div className="h-6 w-6 bg-accent-soft rounded-full absolute right-9" />
          <div className="h-6 w-6 bg-festive rounded-full absolute right-6" />
          <div className="h-6 w-6 bg-bg rounded-full absolute right-3" />
          <div className="bg-success rounded-full absolute right-1 px-2 py-1 text-xs text-center justify-center items-center text-white font-light">
            {itemsCount}+
          </div>
        </div>
      </div>
    </div>
  );
}
