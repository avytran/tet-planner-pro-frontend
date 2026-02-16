import React from "react";

export default function BudgetMessage({ title, message, textColor, bgColor }) {
  return (
    <div
      className={`px-6 py-7 rounded-2xl justify-items-start  ${bgColor} w-xs md:w-sm gap-1.5 flex flex-col`}
    >
      <p className={`text-base font-semibold ${textColor}`}>{title}</p>
      <p className={`text-base font-light text-left ${textColor}`}>{message}</p>
    </div>
  );
}
