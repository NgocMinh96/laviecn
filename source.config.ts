import { rehypeComponent } from "@/lib/rehype-component"
import { getHighlighter } from "@shikijs/compat"
import { transformerRemoveNotationEscape } from "@shikijs/transformers"
import { rehypeCode, rehypeCodeDefaultOptions, remarkGfm } from "fumadocs-core/mdx-plugins"
import { fileGenerator, remarkDocGen, remarkInstall } from "fumadocs-docgen"
import { defineConfig, defineDocs } from "fumadocs-mdx/config"
import { transformerTwoslash } from "fumadocs-twoslash"
import { createFileSystemTypesCache } from "fumadocs-twoslash/cache-fs"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import { codeImport } from "remark-code-import"
import remarkMath from "remark-math"
import { transformers } from "./lib/highlight-code"

// Options: https://fumadocs.vercel.app/docs/mdx/collections#define-docs
export const docs = defineDocs({
  dir: "content/docs",
})

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      lazy: true,
      experimentalJSEngine: true,
      langs: ["ts", "js", "html", "tsx", "mdx"],
      inline: "tailing-curly-colon",
      themes: {
        light: "one-light",
        dark: "one-dark-pro",
      },
      transformers: [
        ...(rehypeCodeDefaultOptions.transformers ?? []),
        transformerTwoslash({
          typesCache: createFileSystemTypesCache(),
        }),
        transformerRemoveNotationEscape(),
      ],
    },
    remarkCodeTabOptions: {
      parseMdx: true,
    },
    remarkPlugins: [
      codeImport,
      remarkGfm,
      remarkMath,
      [remarkInstall, { persist: { id: "package-manager" } }],
      [remarkDocGen, { generators: [fileGenerator()] }],
    ],
    rehypePlugins: [
      rehypeCode,
      rehypeSlug,
      rehypeComponent,
      [
        rehypePrettyCode,
        {
          theme: {
            dark: "one-dark-pro",
            light: "one-light",
          },
          createHighlighter: () =>
            getHighlighter({
              themes: ["one-dark-pro", "one-light"],
            }),
          transformers,
        },
      ],
    ],
  },
})
