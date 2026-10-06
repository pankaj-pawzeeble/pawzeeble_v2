import type { NextConfig } from 'next';

const V2_BASE_URL = (process.env.NEXT_PUBLIC_V2_BASE_URL || '').replace(/\/+$/, '');

const nextConfig: NextConfig = {
  // The scroll scenes attach window listeners once on mount; strict-mode double mounting is off to match the original behaviour.
  reactStrictMode: false,
  // Dev only: the V2 API does not send CORS headers for http://localhost:3000, so the browser calls
  // this same-origin path and Next forwards it to the API (see src/lib/pawteckt/api.ts).
  async rewrites() {
    if (process.env.NODE_ENV !== 'development' || !V2_BASE_URL) return [];
    return [{ source: '/v2-proxy/:path*', destination: `${V2_BASE_URL}/:path*` }];
  },
};

export default nextConfig;
