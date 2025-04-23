import { rehypeComponent } from '@/lib/rehype-component';
import { getHighlighter } from "@shikijs/compat";
import { rehypeCode, remarkGfm } from 'fumadocs-core/mdx-plugins';
import { fileGenerator, remarkDocGen, remarkInstall } from 'fumadocs-docgen';
import { defineDocs, defineConfig } from 'fumadocs-mdx/config';
import { codeImport } from "remark-code-import";
import remarkMath from 'remark-math';
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";

// Options: https://fumadocs.vercel.app/docs/mdx/collections#define-docs
export const docs = defineDocs({
  dir: 'content/docs',
});

export default defineConfig({
  mdxOptions: {
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
        }
      ],
    ],
    remarkPlugins: [
      codeImport,
      remarkGfm,
      remarkMath,
      [remarkInstall, { persist: { id: "package-manager" } }],
      [remarkDocGen, { generators: [fileGenerator()] }],
    ],
  },
});
