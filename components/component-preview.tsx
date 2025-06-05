import * as React from "react"
import { Index } from "@/__registry__"

import { ComponentPreviewTabs } from "./component-preview-tabs"
import { ComponentSource } from "./component-source"

export function ComponentPreview({
  name,
  className,
  hideCode = false,
  ...props
}: React.ComponentProps<"div"> & {
  name: string
  hideCode?: boolean
}) {
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

  return (
    <ComponentPreviewTabs
      className={className}
      // align={align}
      hideCode={hideCode}
      component={<Component key={name} />}
      source={
        <ComponentSource name={name} title={"demo.tsx"} collapsible={false} />
      }
      {...props}
    />
  )
}
