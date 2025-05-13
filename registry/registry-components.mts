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
    dependencies: ["motion", "lucide-react"],
    cssVars: {
      theme: {
        "scroll-top-color": "var(--scroll-top-color)",
        "scroll-top-progress": "rgb(var(--scroll-top-color))",
        "scroll-top-bg": "rgb(var(--scroll-top-color), 0.1)",
        "scroll-top-track": "rgb(var(--scroll-top-color), 0.2)",
      },
      light: {
        "scroll-top-color": "115, 115, 115",
      },
      dark: {
        "scroll-top-color": "228, 228, 231",
      },
    },
    files: [
      {
        path: "components/scroll-to-top.tsx",
        type: "registry:component",
      },
    ],
  },
]
