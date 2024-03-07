import React, { HTMLAttributes, forwardRef } from "react";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const paragraphVariant = cva(
  "text-black max-w-prose mb-1",
  {
    variants: {
      size: {
        sm: "text-sm sm:text-base",
        default: "text-base sm:text-lg",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

interface paragraphProps
  extends HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof paragraphVariant> {}

const Paragraph = forwardRef<HTMLParagraphElement, paragraphProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        {...props}
        className={cn(paragraphVariant({ size, className }))}
      >
        {children}
      </p>
    );
  }
);

Paragraph.displayName = "Paragraph";
export default Paragraph;
