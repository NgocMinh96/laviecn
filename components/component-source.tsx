"use client"

/**
 * @see https://github.com/shadcn-ui/ui/blob/main/apps/www/components/component-source.tsx
 */
import { CodeBlockWrapper } from "@/components/code-block-wrapper"
import { cn } from "@/lib/utils"
import type * as React from "react"

interface ComponentSourceProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string
}

export function ComponentSource({ children, className, ...props }: ComponentSourceProps) {
  return (
    <CodeBlockWrapper
      expandButtonTitle="Expand"
      className={cn("my-6 overflow-hidden rounded-md", className)}
      {...props}
    >
      {children}
    </CodeBlockWrapper>
  )
}
