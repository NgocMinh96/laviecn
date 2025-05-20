"use client"

import { Index } from "@/__registry__"
import { cn } from "@/lib/utils"
import { CodeIcon, EyeIcon } from "lucide-react"
import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"

interface ComponentTabsProps extends React.ComponentPropsWithoutRef<"div"> {
  name: string
  children: React.ReactNode
  align?: "start" | "center" | "end"
  preventPreviewFocus?: boolean
  scalePreview?: boolean
  fullPreview?: boolean
}

export function ComponentTabs({ name, children, className }: ComponentTabsProps) {
  const Codes = React.Children.toArray(children) as React.ReactElement[]
  const Code = Codes[0]

  const Preview = React.useMemo(() => {
    const Component = Index[name]?.component

    if (!Component) {
      return (
        <p className="text-muted-foreground text-sm">
          Component{" "}
          <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {name}
          </code>{" "}
          not found in registry.
        </p>
      )
    }

    return <Component />
  }, [name])

  return (
    <div
      className={cn(
        "size-full overflow-hidden rounded-lg border bg-background not-prose max-h-[438px]",
        className
      )}
    >
      <Tabs defaultValue="preview" className="size-full gap-0">
        <TabsList className="w-full rounded-none border-b">
          <TabsTrigger value="preview">
            <EyeIcon size={16} className="text-muted-foreground" />
            Preview
          </TabsTrigger>
          <TabsTrigger value="code">
            <CodeIcon size={16} className="text-muted-foreground" />
            Code
          </TabsTrigger>
        </TabsList>
        <TabsContent value="code" className="component-block">
          {Code}
        </TabsContent>
        <TabsContent value="preview" className="not-fumadocs-codeblock size-full overflow-hidden">
          <div className="relative flex size-full flex-col items-center justify-center gap-4 overflow-hidden p-10">
            <div className="-translate-y-px absolute top-6 right-0 left-0 border border-border/50 border-dashed" />
            <div className="absolute right-0 bottom-6 left-0 translate-y-px border border-border/50 border-dashed" />
            <div className="-translate-x-px absolute top-0 bottom-0 left-6 border border-border/50 border-dashed" />
            <div className="absolute top-0 right-6 bottom-0 translate-x-px border border-border/50 border-dashed" />
            {Preview}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
