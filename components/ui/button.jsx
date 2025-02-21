import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90 hover:shadow-lg hover:shadow-primary hover:text-primary hover:bg-primary-foreground hover:border hover:border-primary active:scale-95 transition-all duration-300 ease-in-out",
        destructive:
          "bg-destructive text-destructive-foreground hover:shadow-lg hover:shadow-destructive hover:text-destructive hover:bg-destructive-foreground hover:border hover:border-destructive",
        outline:
          "border border-[#439ecb] text-white bg-[#439ecb] shadow-sm hover:text-[#439ecb] hover:shadow-lg hover:shadow-[#439ecb] hover:bg-[#439ecb]/10 active:scale-95 active:shadow-md transition-all duration-300 ease-in-out",  
        secondary:
          "border border-[#FFD700] bg-[#FFD700] shadow-sm hover:shadow-lg hover:shadow-[#FFD700]/90 hover:text-[#FFD700] hover:bg-white active:scale-95 active:shadow-md transition-all duration-300 ease-in-out",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
