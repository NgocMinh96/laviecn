import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  redirects() {
    return [
      { source: "/", destination: "/docs", permanent: false },
    ].filter(Boolean);
  }
};

export default withMDX(config);
