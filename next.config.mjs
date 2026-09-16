/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Obligatoire : next/image refuse tout domaine non déclaré.
    remotePatterns: [
      { protocol: 'https', hostname: 'upload.wikimedia.org', pathname: '/**' },
      { protocol: 'https', hostname: 'www.moma.org', pathname: '/**' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
