import clsx from "clsx";
import React, { InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  iconClassName?: string;
  label?: string;
  error?: FieldError;
  authStyle?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { icon, iconClassName, className, label, error, authStyle, ...props },
    ref,
  ) => {
    const inputClass = twMerge(
      clsx(
        authStyle && "input",
        "w-[460px] h-12 bg-background-white placeholder:text-gray border-[1px] border-gray text-4 font-medium rounded-lg pl-7 focus:outline-none focus:z-10 relative",
        error && "border-danger error",
        className,
      ),
    );

    return (
      <div>
        {label && (
          <label htmlFor={props.name} className="text-4 my-3 block font-medium">
            {label}
          </label>
        )}

        <div className="relative">
          <input ref={ref} {...props} className={inputClass} />
          {icon && (
            <button type="button" className={iconClassName}>
              {icon}
            </button>
          )}
        </div>

        {error?.message && (
          <p className="my-3 text-[14px] text-danger">{error.message}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
