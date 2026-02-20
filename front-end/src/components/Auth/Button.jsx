import React from "react";

export default function AuthButton({
  leadingIcon,
  trailingIcon,
  label,
  color = "accent",
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) {
  const colorClasses = {
    accent: "bg-accent hover:bg-accent-soft",
    success: "bg-success-strong hover:bg-success",
    danger: "bg-primary  hover:bg-danger",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`font-normal text-white rounded-2xl flex py-2 px-8 justify-between gap-2 items-center transition duration-300 ${colorClasses[color]} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${className}`}
      onClick={onClick}
    >
      {leadingIcon}
      <span>{label}</span>
      {trailingIcon}
    </button>
  );
}
