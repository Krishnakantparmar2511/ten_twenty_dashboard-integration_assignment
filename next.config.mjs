/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Enable experimental features for Next.js 15
    optimizePackageImports: ['lucide-react'],
  },
  // Ensure proper handling of static assets
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  // Enable React strict mode for better development experience
  reactStrictMode: true,
};

export default nextConfig;
