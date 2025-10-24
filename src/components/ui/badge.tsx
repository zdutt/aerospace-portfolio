import * as React from "react";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "secondary" | "outline";
  size?: "sm" | "md";
};

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

export function Badge({
  className,
  variant = "default",
  size = "md",
  ...props
}: BadgeProps) {
  const base =
    "inline-flex items-center whitespace-nowrap rounded-full font-medium ring-1 ring-inset";

  const variants: Record<NonNullable<BadgeProps["variant"]>, string> = {
    // solid-ish neutral (general chip)
    default: "bg-neutral-800 text-white ring-neutral-700",
    // ✅ matches your usage in ResumeTimeline (white/10 pill)
    secondary: "bg-white/10 text-white/85 ring-white/10",
    // thin outline (transparent)
    outline: "bg-transparent text-white ring-white/30",
  };

  const sizes: Record<NonNullable<BadgeProps["size"]>, string> = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-2.5 py-0.5 text-xs",
  };

  return (
    <span className={cx(base, variants[variant], sizes[size], className)} {...props} />
  );
}

export default Badge;
