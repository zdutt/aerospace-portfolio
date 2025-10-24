import * as React from "react";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "outline";
};

export function Badge({ variant = "default", className, ...props }: BadgeProps) {
  const base = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";
  const v =
    variant === "outline"
      ? "border border-neutral-700 text-neutral-300"
      : "bg-neutral-800 text-neutral-200";
  return <span className={`${base} ${v} ${className ?? ""}`} {...props} />;
}
