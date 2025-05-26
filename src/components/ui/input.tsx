import clsx from "clsx";
import React, { InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  iconClassName?: string;
  label?: string;
  error?: FieldError;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ icon, iconClassName, className, label, error, ...props }, ref) => {
    const inputClass = twMerge(
      clsx(
        "input",
        "w-[460px] h-12 bg-background-white placeholder:text-gray border-[1px] border-gray text-4 font-medium rounded-lg pl-[28px] focus:outline-none focus:z-10 relative",
        error && "border-danger error",
        className,
      ),
    );
    return (
      <>
        {label && (
          <label htmlFor={props.name} className="text-4 my-3 block font-medium">
            {label}
          </label>
        )}
        <input ref={ref} {...props} className={inputClass} />
        {icon && (
          <button type="button" className={iconClassName}>
            {icon}
          </button>
        )}
        {error?.message && (
          <p className="my-3 text-[14px] text-danger">{error.message}</p>
        )}
      </>
    );
  },
);

Input.displayName = "Input";

export default Input;
