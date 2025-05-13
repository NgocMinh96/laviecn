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
      light: {
        "scroll-top": "oklch(0.55 0.01 286)",
        "scroll-top-bg": "oklch(0.55 0.01 286 / 10%)",
        "scroll-top-track": "oklch(0.55 0.01 286 / 20%)",
      },
      dark: {
        "scroll-top": "oklch(0.92 0 286)",
        "scroll-top-bg": "oklch(0.92 0 286 / 10%)",
        "scroll-top-track": "oklch(0.92 0 286 / 20%)",
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
