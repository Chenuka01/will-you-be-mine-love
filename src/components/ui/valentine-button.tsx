import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const valentineButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-lg font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none touch-manipulation",
  {
    variants: {
      variant: {
        yes: "bg-gradient-to-br from-primary to-valentine-rose-deep text-primary-foreground shadow-button hover:shadow-float hover:scale-105 active:scale-95",
        no: "bg-gradient-to-br from-muted to-valentine-rose-light text-foreground shadow-valentine hover:shadow-button",
        soft: "bg-secondary text-secondary-foreground shadow-valentine hover:bg-accent hover:scale-105 active:scale-95",
        chaos: "bg-gradient-to-br from-valentine-chaos-pink to-valentine-chaos-purple text-white shadow-button animate-wiggle",
        celebration: "bg-gradient-to-br from-valentine-gold to-valentine-coral text-white shadow-float hover:scale-105 active:scale-95",
        ghost: "text-foreground hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-14 px-8 py-4",
        sm: "h-10 px-4 py-2 text-base rounded-xl",
        lg: "h-16 px-10 py-5 text-xl",
        xl: "h-20 px-12 py-6 text-2xl",
        tiny: "h-8 px-3 py-1 text-sm rounded-lg",
      },
    },
    defaultVariants: {
      variant: "yes",
      size: "default",
    },
  }
);

export interface ValentineButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof valentineButtonVariants> {
  asChild?: boolean;
}

const ValentineButton = React.forwardRef<HTMLButtonElement, ValentineButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(valentineButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
ValentineButton.displayName = "ValentineButton";

export { ValentineButton, valentineButtonVariants };
