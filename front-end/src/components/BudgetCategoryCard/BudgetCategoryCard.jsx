import {
  ArrowRightIcon,
  PencilIcon,
  TrashIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
// import { Progress } from "@/components/ui/progress";
import React from "react";
import CommonButton from "../Button/CommonButton";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function BudgetCategoryCard({
  category,
  amountSpent,
  totalAmount,
  itemsCount,
}) {
  const remainingAmount = totalAmount - amountSpent;
  const percentageUsed = ((amountSpent / totalAmount) * 100).toFixed(2);
  const percentegeRemain = (100 - percentageUsed).toFixed(2);
  let color = "success";
  if (percentageUsed > 50 && percentageUsed <= 80) {
    color = "accent-soft";
  } else if (percentageUsed > 80) {
    color = "danger";
  }
  return (
    <div className="p-10 w-xs md:w-sm bg-white rounded-[40px] flex flex-col gap-4 shrink-0 ">
      <div className="flex ">
        <button className=" cursor-pointer p-2 rounded-xl hover:bg-bg">
          <PencilIcon className="w-5 h-5  " />
        </button>
        <button className=" cursor-pointer p-2 rounded-xl hover:bg-bg">
          <TrashIcon className="w-5 h-5  " />
        </button>
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
            {percentegeRemain}%
          </span>
        </div>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ width: "100%", mr: 1 }}>
            <LinearProgress
              variant="determinate"
              value={percentegeRemain}
              color={
                percentegeRemain > 50
                  ? "success"
                  : percentegeRemain > 20 && percentegeRemain < 50
                    ? "warning"
                    : "error"
              }
            />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {`${Math.round(percentegeRemain)}%`}
            </Typography>
          </Box>
        </Box>

        {/* <Progress value={75} className="*:bg-success" /> */}
        <span className="font-normal text-sm text-gray-500 text-left">
          You've spent {amountSpent.toLocaleString("en-US")} VND
        </span>
      </div>
      <div className="flex justify-between relative">
        <CommonButton
          label={"Detail"}
          trailingIcon={<ArrowRightIcon className="h-5 w-5" />}
        />
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
