import React from "react";

export default function CommonButton({
  leadingIcon,
  trailingIcon,
  label,
  color = "accent",
  onClick,
  type = "button",
  className = "",
}) {
  const colorClasses = {
    accent: "bg-accent hover:bg-accent-soft",
    success: "bg-success-strong hover:bg-success",
    danger: "bg-primary  hover:bg-danger",
  };

  return (
    <button
      type={type}
      className={`w-fit font-normal text-white rounded-3xl flex py-3 px-5 justify-between gap-2 items-center cursor-pointer transition duration-300 ${colorClasses[color]}  ${className}`}
      onClick={onClick}
    >
      {leadingIcon}
      <span>{label}</span>
      {trailingIcon}
    </button>
  );
}
