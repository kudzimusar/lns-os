import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const FloatingInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, type, id, ...props }, ref) => {
    return (
      <div className="relative group w-full">
        <input
          type={type}
          className={cn(
            "peer block w-full appearance-none rounded-xl border border-lns-border bg-transparent px-4 py-3 text-sm text-lns-navy focus:border-lns-navy focus:outline-none focus:ring-0 transition-all placeholder-transparent",
            className
          )}
          placeholder=" "
          id={id}
          ref={ref}
          {...props}
        />
        <label
          htmlFor={id}
          className="absolute left-4 top-1 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm text-lns-mid-grey duration-300 peer-placeholder-shown:translate-y-2.5 peer-placeholder-shown:scale-100 peer-focus:left-4 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-lns-navy pointer-events-none bg-white px-1"
        >
          {label}
        </label>
      </div>
    );
  }
);
FloatingInput.displayName = "FloatingInput";

export { FloatingInput };
