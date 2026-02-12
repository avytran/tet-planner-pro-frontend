import React from "react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
export default function ShoppingListItem({
  name,
  price,
  quantity,
  color,
  width,
}) {
  return (
    <div
      className={`px-6 py-5 justify-items-start rounded-2xl flex justify-between items-center ${width}  ${color}`}
    >
      <ShoppingBagIcon className="w-6 h-6 mr-4 " />
      <div className="flex-7">
        <p className={`text-base font-bode text-left `}>{name}</p>
        <p className={`text-base font-normal text-left ${color}`}>
          {price} VND
        </p>
      </div>
      <div>
        <p className="text-base font-bode "> Qty</p>
        <p className="text-base font-normal">{quantity}</p>
      </div>
    </div>
  );
}
