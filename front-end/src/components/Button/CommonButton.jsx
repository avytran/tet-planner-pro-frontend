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
    accent: "bg-accent hover:bg-accent-soft text-white",
    success: "bg-success-strong hover:bg-success text-white",
    danger: "bg-primary  hover:bg-danger text-white",
    secondary: "bg-white text-primary border ",
  };

  return (
    <button
      type={type}
      className={`w-fit min-w-20 font-normal  rounded-3xl flex py-3 px-5 justify-center gap-2 items-center cursor-pointer transition duration-300 ${colorClasses[color]}  ${className}`}
      onClick={onClick}
    >
      {leadingIcon}
      <span>{label}</span>
      {trailingIcon}
    </button>
  );
}
