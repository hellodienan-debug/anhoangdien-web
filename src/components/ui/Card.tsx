import React from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children?: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  [key: string]: any;
}

export function Card({ children, className, hoverEffect = true, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "liquid-glass shadow-deep rounded-[32px] relative overflow-hidden",
        hoverEffect && "card-hover",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
