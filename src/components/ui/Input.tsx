import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, type, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={id} 
            className="block text-[13px] font-black uppercase tracking-widest text-lns-mid-grey mb-2"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={id}
          className={cn(
            "w-full h-12 px-4 rounded-xl border border-gray-200 bg-white text-sm text-lns-navy transition-all",
            "placeholder:text-gray-400",
            "focus:outline-none focus:ring-2 focus:ring-lns-navy/10 focus:border-lns-navy",
            "disabled:opacity-50 disabled:bg-gray-50",
            error ? "border-lns-red focus:ring-lns-red/10 focus:border-lns-red" : "border-gray-200",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-xs text-lns-red mt-1 animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="text-xs text-lns-mid-grey mt-1">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
