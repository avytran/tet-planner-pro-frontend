import React from "react";

export const InputField = ({
  label,
  icon,
  name,
  type = "text",
  placeholder,
  ...props
}) => {
  return (
    <div className="space-y-1 mb-8">
      {label && (
        <label
          htmlFor={name}
          className="block  font-body-strong font-bold  text-primary-strong"
        >
          {label}
        </label>
      )}
      <div className="flex items-center gap-2 bg-white rounded-md border-b-1 w-full">

        {icon && <span className="text-primary-strong text-lg w-10 h-10 flex items-center justify-center">{icon}</span>}
        <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="font-normal text-black w-full border-neutral-300 px-3 py-2 text-sm outline-none focus:ring-0 focus:outline-none focus:border-black "
        {...props}
      />
      </div>
      
    </div>
  );
};
