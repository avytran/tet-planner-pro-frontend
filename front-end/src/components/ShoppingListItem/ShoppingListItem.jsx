import React from "react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
export default function ShoppingListItem({
  name,
  price,
  quantity,
  bgColor = "bg-white",
  textColor,
}) {
  return (
    <div
      className={`px-6 py-5 justify-items-start rounded-2xl flex justify-between items-center gap-4 w-xs md:w-sm  ${bgColor} relative`}
    >
      <div className="h-10 w-10 rounded-full bg-white flex justify-center items-center">
        <ShoppingBagIcon className="w-5 h-5" />
      </div>
      <div className={`flex-7 ${textColor}`}>
        <p className="text-base font-bode text-left font-semibold">{name}</p>
        <p className="text-base font-light text-left">
          {price.toLocaleString("en-US")} VND
        </p>
      </div>
      <div className="absolute left-11/12 bottom-9/12 bg-danger rounded-2xl px-4 py-0.5 hover:scale-110 transform">
        <p className="text-base font-normal text-white">{quantity}</p>
      </div>
    </div>
  );
}
