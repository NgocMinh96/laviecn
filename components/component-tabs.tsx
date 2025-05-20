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
    <div className={cn("rounded-lg border bg-background", className)}>
      <Tabs defaultValue="preview" className="gap-0 not-prose">
        <TabsList className="w-full rounded-b-none border-b text-muted-foreground">
          <TabsTrigger value="preview">
            <EyeIcon size={16} />
            Preview
          </TabsTrigger>

          <TabsTrigger value="code">
            <CodeIcon size={16} />
            Code
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="preview"
          className="relative flex items-center justify-center p-6 min-h-[438px]"
        >
          <div className="-translate-y-px absolute top-4 right-0 left-0 border border-border/50 border-dashed" />
          <div className="absolute right-0 bottom-4 left-0 translate-y-px border border-border/50 border-dashed" />
          <div className="-translate-x-px absolute top-0 bottom-0 left-4 border border-border/50 border-dashed" />
          <div className="absolute top-0 right-4 bottom-0 translate-x-px border border-border/50 border-dashed" />
          {Preview}
        </TabsContent>

        <TabsContent value="code" className="component-block max-h-[438px]">
          {Code}
        </TabsContent>
      </Tabs>
    </div>
  )
}
