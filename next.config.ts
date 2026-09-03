import type { NextConfig } from 'next';

const isGithubPages = process.env.GITHUB_ACTIONS === 'true';
const githubBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '/RUI-Homepage-codex';

const nextConfig: NextConfig = {
  ...(isGithubPages ? { output: 'export' as const, assetPrefix: githubBasePath } : {}),
};

export default nextConfig;
