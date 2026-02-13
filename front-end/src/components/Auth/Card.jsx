import React from "react";
import { cn } from "@/lib/utils";

export const Card = ({ className = "", children, ...props }) => {
  return (
    <div
      className={cn(
        "bg-white rounded-3xl shadow-lg border border-neutral-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardSection = ({ className = "", children, ...props }) => (
  <div className={cn("p-15 md:p-15", className)} {...props}>
    {children}
  </div>
);