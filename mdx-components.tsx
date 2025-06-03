import React from "react"
import { Step, Steps } from "fumadocs-ui/components/steps"
import { Tab, Tabs } from "fumadocs-ui/components/tabs"
import defaultComponents from "fumadocs-ui/mdx"
import type { MDXComponents } from "mdx/types"

import { ComponentIntroduce } from "@/components/component-introduce"
import { ComponentPreview } from "@/components/component-preview"
import { ComponentSource } from "@/components/component-source"
import { ComponentsList } from "@/components/components-list"

import { CodeBlock, Pre } from "./components/codeblock"

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    ...components,
    Tab,
    Tabs,
    Step,
    Steps,
    ComponentsList,
    ComponentSource,
    ComponentPreview,
    ComponentIntroduce,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    pre: ({ ref: _ref, ...props }) => (
      <CodeBlock {...props}>
        <Pre>{props.children}</Pre>
      </CodeBlock>
    ),
    code: ({ ...props }: React.ComponentProps<"code">) => {
      if (typeof props.children === "object") {
        return <code data-line-numbers="">{props.children}</code>
      }
      return <code>{props.children}</code>
    },
    span: ({ className, ...props }: React.ComponentProps<"span">) => {
      if (typeof className === "string" && className.includes("line")) {
        return <span className={className} data-line="" {...props} />
      }
      return <span className={className} {...props} />
    },
  }
}
