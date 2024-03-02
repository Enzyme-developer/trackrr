import React, { HTMLAttributes, forwardRef } from "react";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const HeadingVariant = cva(
  "text-center tracking-tighter leading-tight, text-pink font-black",
  {
    variants: {
      size: {
        default: "text-4xl md:text-5xl lg:6xl",
        lg: "text-5xl md:text-6xl lg:7xl",
        sm: "text-2xl md:text-3xl lg:4xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

interface HeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof HeadingVariant> {}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, size, children, ...props }: any, ref: any) => {
    return (
      <h1
        ref={ref}
        {...props}
        className={cn(HeadingVariant({ size, className }))}
      >
        {children}
      </h1>
    );
  }
);

Heading.displayName = "Heading";
export default Heading;
