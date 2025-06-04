import { Tab, Tabs } from "fumadocs-ui/components/tabs"
import { Terminal } from "lucide-react"
import convert from "npm-to-yarn"

import { highlightCode } from "@/lib/highlight-code"

import { CodeBlock } from "./codeblock"

export interface PackageManager {
  name: string
  command: (cmd: string) => string
}

interface ComponentInstallProps {
  command?: string
  packageManagers?: PackageManager[]
}

const defaultPackageManagers: PackageManager[] = [
  { name: "npm", command: (cmd) => cmd },
  { name: "pnpm", command: (cmd) => convert(cmd, "pnpm") },
  { name: "yarn", command: (cmd) => convert(cmd, "yarn") },
  { name: "bun", command: (cmd) => convert(cmd, "bun") },
]

export async function ComponentInstall({ command = "", packageManagers }: ComponentInstallProps) {
  const managers = packageManagers ?? defaultPackageManagers

  const highlightedMap: Record<string, string> = {}
  for (const pm of managers) {
    const code = pm.command(command)
    highlightedMap[pm.name] = await highlightCode(code, "bash")
  }

  return (
    <Tabs
      groupId="component-install"
      items={managers.map((pm) => pm.name)}
      label={<Terminal className="size-4" />}
      className="[&_span]:me-0!"
    >
      {managers.map((pm) => (
        <Tab key={pm.name}>
          <CodeBlock viewportProps={{ className: "[&_pre]:py-0! [&_pre]:overflow-x-visible!" }}>
            <div
              dangerouslySetInnerHTML={{
                __html: highlightedMap[pm.name] ?? "",
              }}
            />
          </CodeBlock>
        </Tab>
      ))}
    </Tabs>
  )
}
