import {
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import React from "react";

export default function ShoppingListCard({
  category,
  item,
  qty,
  date,
  price,
  status,
}) {
  return (
    <div className="p-5 flex flex-col gap-2 bg-white rounded-2xl w-3xs md:w-xs relative">
      <div className="flex justify-between items-center">
        <div className="bg-primary rounded-full  px-3 py-1 text-xs text-center justify-center items-center text-white font-light">
          <span>{category}</span>
        </div>
        <p className="font-normal">Qty {qty} </p>
      </div>
      <p className="text-left">{item}</p>
      <div className="flex flex-col  items-stretch gap-2">
        <div className="flex ">
          <CalendarIcon className="h-5 w-5" />
          <span className="ml-2 font-light text-sm">Needed by: {date}</span>
        </div>

        <p className="text-left text-xl text-primary">
          {price.toLocaleString("en-US")} VND
        </p>
      </div>
      <div
        className={`h-13 w-13 rounded-full  absolute right-2 bottom-2 flex justify-center items-center ${
          status === "Planning" ? "bg-festive" : "bg-success"
        }`}
      >
        {status === "Planning" ? (
          <ClockIcon className="h-8 w-8 text-white" />
        ) : (
          <CheckCircleIcon className="h-8 w-8 text-white" />
        )}
      </div>
    </div>
  );
}
