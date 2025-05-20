"use client"

/**
 * @see https://github.com/shadcn-ui/ui/blob/main/apps/www/components/code-block-wrapper.tsx
 */
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import * as React from "react"

interface CodeBlockProps extends React.ComponentPropsWithoutRef<typeof Collapsible> {
  expandButtonTitle?: string
}

export function CodeBlockWrapper({
  expandButtonTitle = "View Code",
  className,
  children,
  ...props
}: CodeBlockProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <CollapsibleContent forceMount className={cn("overflow-hidden", !open && "max-h-32")}>
        <div
          className={cn(
            "[&_figure]:my-0 [&_figure]:max-h-[640px] [&_figure]:pb-[20px] [&_figure]:bg-secondary/50 [&_figure]:border-none",
            !open ? "[&_figure]:overflow-hidden" : "[&_figure]:overflow-auto]"
          )}
        >
          {children}
        </div>
      </CollapsibleContent>
      <div
        className={cn(
          "bg-linear-to-b absolute flex items-center justify-center from-zinc-600/30 to-zinc-900/50 p-2",
          open ? "inset-x-0 bottom-0 h-12" : "inset-0"
        )}
      >
        <CollapsibleTrigger asChild>
          <Button className="bg-background text-foreground hover:bg-background/90 h-8">
            {open ? "Collapse" : expandButtonTitle}
          </Button>
        </CollapsibleTrigger>
      </div>
    </Collapsible>
  )
}
