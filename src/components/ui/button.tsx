import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  variant?: "default" | "secondary" | "outline" | "ghost" | "primary";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
};

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    const base =
      "inline-flex items-center justify-center whitespace-nowrap rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
      default: "bg-white text-black hover:bg-neutral-200 focus:ring-neutral-400",
      secondary:
        "bg-neutral-800 text-white hover:bg-neutral-700 focus:ring-neutral-600",
      outline:
        "border border-neutral-700 bg-transparent text-white hover:bg-neutral-900/60 focus:ring-neutral-600",
      ghost:
        "bg-transparent text-white hover:bg-neutral-900/60 focus:ring-neutral-700",
      primary:
        "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    };

    const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-5 text-base",
    };

    return (
      <Comp
        ref={ref}
        className={cx(base, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export default Button;
