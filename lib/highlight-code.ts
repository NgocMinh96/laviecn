import { codeToHtml, type ShikiTransformer } from "shiki"

export const transformers = [
  {
    code(node) {
      if (node.tagName === "code") {
        node.properties["data-line-numbers"] = ""
        // Add an empty line span at the end
        node.children.push({
          type: "element",
          tagName: "span",
          properties: { className: "line mb-2", "data-line": "" },
          children: [],
        })
      }
    },

  },
] as ShikiTransformer[]

export async function highlightCode(code: string, language: string = "tsx") {
  const html = await codeToHtml(code, {
    lang: language,
    themes: {
      dark: "one-dark-pro",
      light: "one-light",
    },
    transformers: [
      {
        pre(node) {
          node.properties["class"] =
            "dark:bg-fd-card! text-sm fd-scroll-container min-w-0 overflow-x-auto px-4 py-2.5 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0"
        },
        code(node) {
          node.properties["data-line-numbers"] = ""
        },
        line(node) {
          node.properties["data-line"] = ""
        },
      },
    ],
  })

  return html
}
