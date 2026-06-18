import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // 👈 CRITICAL: Next.js 15/16'da artık doğrudan ana kökte (root) tanımlanıyor
  serverExternalPackages: ['sharp'], 
  
  experimental: {
    // Diğer deneysel ayarlarınız varsa buraya...
  },
}

export default withPayload(nextConfig)