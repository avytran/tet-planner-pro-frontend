import React from "react";

export default function BudgetMessage({ title, message, textColor, bgColor }) {
  return (
    <div
      className={`px-6 py-7 rounded-2xl justify-items-start  ${bgColor} w-xs md:w-sm `}
    >
      <p className={`text-base font-semibold ${textColor}`}>{title}</p>
      <p className={`text-base font-normal text-left ${textColor}`}>
        {message}
      </p>
    </div>
  );
}
