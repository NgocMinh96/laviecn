import { type Registry } from "shadcn/registry"

export const components: Registry["items"] = [
  {
    name: "zone-select",
    type: "registry:component",
    registryDependencies: [
      "button",
      "label",
      "command",
      "popover",
      "https://laviecn.vercel.app/r/use-filter-zone.json",
    ],
    files: [
      {
        path: "components/zone-select.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "scroll-to-top",
    type: "registry:component",
    registryDependencies: ["motion"],
    files: [
      {
        path: "components/scroll-to-top.tsx",
        type: "registry:component",
      },
    ],
  },
]
