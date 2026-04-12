import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
      primary: "bg-lns-navy text-white hover:bg-lns-navy/90",
      secondary: "bg-lns-red text-white hover:bg-lns-red/90",
      outline: "border border-lns-border bg-transparent hover:bg-lns-light-grey text-lns-navy",
      ghost: "bg-transparent hover:bg-lns-light-grey text-lns-navy",
      danger: "bg-red-600 text-white hover:bg-red-700",
    };

    const sizes = {
      sm: "h-11 px-4 text-sm md:h-12 md:px-6 md:text-[13px]",
      md: "h-12 px-8 text-sm md:h-12 md:px-8 md:text-[15px]",
      lg: "h-14 px-10 text-base md:h-14 md:px-10 md:text-[18px]",
      icon: "h-12 w-12 md:h-12 md:w-12",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lns-navy disabled:pointer-events-none disabled:opacity-50 active:scale-95",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
