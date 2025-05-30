import { ComponentIntroduce } from "@/components/component-introduce"
import { ComponentSource } from "@/components/component-source"
import { ComponentTabs } from "@/components/component-tabs"
import { Step, Steps } from "fumadocs-ui/components/steps"
import { Tab, Tabs } from "fumadocs-ui/components/tabs"
import defaultMdxComponents from "fumadocs-ui/mdx"
import type { MDXComponents } from "mdx/types"

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...components,
    Tab,
    Tabs,
    Step,
    Steps,
    ComponentTabs,
    ComponentSource,
    ComponentIntroduce,
  }
}
