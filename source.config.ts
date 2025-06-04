import { transformerRemoveNotationEscape } from "@shikijs/transformers"
import { rehypeCode, rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins"
import { defineConfig, defineDocs, frontmatterSchema } from "fumadocs-mdx/config"
import { transformerTwoslash } from "fumadocs-twoslash"
import { createFileSystemTypesCache } from "fumadocs-twoslash/cache-fs"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import { z } from "zod"

import { rehypeComponent } from "@/lib/rehype-component"

import { transformers } from "./lib/highlight-code"

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
        ...transformers,
      ],
    },
    remarkCodeTabOptions: {
      parseMdx: true,
    },
    rehypePlugins: [rehypeCode, rehypeSlug, rehypeComponent, rehypePrettyCode],
    // remarkPlugins: [
    //   codeImport,
    //   remarkGfm,
    //   remarkMath,
    //   // [remarkInstall, { persist: { id: "package-manager" } }],
    //   [remarkDocGen, { generators: [fileGenerator()] }],
    // ],
  },
})

export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: frontmatterSchema.extend({
      links: z
        .object({
          doc: z.string().optional(),
          api: z.string().optional(),
        })
        .optional(),
    }),
  },
})
