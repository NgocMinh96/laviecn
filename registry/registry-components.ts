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
    name: "zone-filter",
    type: "registry:component",
    dependencies: ["lucide-react"],
    registryDependencies: [
      "button",
      "input",
      "scroll-area",
      "https://laviecn.vercel.app/r/use-filter-zone.json",
    ],
    files: [
      {
        path: "components/zone-filter.tsx",
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
  {
    name: "json-table",
    type: "registry:component",
    dependencies: [
      "@dnd-kit/core",
      "@dnd-kit/modifiers",
      "@dnd-kit/sortable",
      "lucide-react",
    ],
    registryDependencies: ["button", "input", "scroll-area", "table", "utils"],
    files: [
      {
        path: "components/json-table.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "horizontal-scroll-menu",
    type: "registry:component",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "utils"],
    files: [
      {
        path: "components/horizontal-scroll-menu.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "multiple-selector",
    type: "registry:component",
    dependencies: ["lucide-react"],
    registryDependencies: ["command", "utils", "cmdk"],
    files: [
      {
        path: "components/multiple-selector.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "password-input",
    type: "registry:ui",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "input", "utils"],
    files: [
      {
        path: "components/password-input.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "counting-number",
    type: "registry:ui",
    dependencies: ["motion"],
    files: [
      {
        path: "components/counting-number.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "sliding-number",
    type: "registry:ui",
    dependencies: ["motion", "react-use-measure"],
    files: [
      {
        path: "components/sliding-number.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "smooth-cursor",
    type: "registry:ui",
    files: [
      {
        path: "components/smooth-cursor.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "theme-toggle",
    type: "registry:component",
    dependencies: ["lucide-react", "class-variance-authority"],
    registryDependencies: ["button", "utils"],
    files: [
      {
        path: "components/theme-toggle.tsx",
        type: "registry:component",
      },
    ],
  },
]
