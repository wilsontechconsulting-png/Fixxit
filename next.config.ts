import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Generate unique build IDs to force cache refresh
  generateBuildId: async () => {
    return `build-${Date.now()}`
  },
  
  // Disable static page generation caching during development
  // This ensures every deploy is fresh
  experimental: {
    isrMemoryCacheSize: 0,
  },
  
  // Add headers to prevent caching issues
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
        ],
      },
    ]
  },
}

export default nextConfig
