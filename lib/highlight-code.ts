import { codeToHtml, type ShikiTransformer } from "shiki"

export const transformers = [{}] as ShikiTransformer[]

export async function highlightCode(
  code: string,
  language: string = "tsx",
  lineNumbers: boolean = false
) {
  const transformers: ShikiTransformer = {
    pre(node) {
      node.properties["class"] =
        "dark:bg-fd-card! not-prose text-sm fd-scroll-container min-w-0 overflow-x-auto px-4 py-2.5 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0"
    },
    line(node) {
      node.properties["data-line"] = ""
    },
  }

  if (lineNumbers) {
    transformers.code = (node) => {
      node.properties["data-line-numbers"] = ""
    }
  }

  const html = await codeToHtml(code, {
    lang: language,
    themes: {
      dark: "one-dark-pro",
      light: "one-light",
    },
    transformers: [transformers],
  })

  return html
}
