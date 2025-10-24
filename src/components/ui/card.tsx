// src/components/ui/card.tsx
import * as React from "react";

const cn = (...c: Array<string | undefined | false>) => c.filter(Boolean).join(" ");

export function Card(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn("rounded-2xl border border-neutral-800 bg-neutral-900/60 shadow-lg", props.className)}
    />
  );
}

export function CardHeader(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cn("p-5", props.className)} />;
}

// ✅ remove the pt-0 so top padding applies
export function CardContent(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cn("p-5", props.className)} />;
}

export function CardFooter(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cn("p-5 pt-0", props.className)} />;
}

export function CardTitle(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 {...props} className={cn("text-lg font-semibold", props.className)} />;
}

export function CardDescription(props: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p {...props} className={cn("text-sm text-neutral-400", props.className)} />;
}
