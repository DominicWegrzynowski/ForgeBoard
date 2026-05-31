import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

type BadgeProps = {
  children: ReactNode;
  tone?: "default" | "green" | "amber" | "red" | "blue";
};

export function Badge({ children, tone = "default" }: BadgeProps) {
  const toneMap = {
    default: "bg-slate-100 text-slate-700",
    green: "bg-emerald-100 text-emerald-700",
    amber: "bg-amber-100 text-amber-700",
    red: "bg-rose-100 text-rose-700",
    blue: "bg-blue-100 text-blue-700"
  };

  return <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", toneMap[tone])}>{children}</span>;
}
