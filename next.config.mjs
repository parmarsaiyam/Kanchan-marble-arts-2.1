/** @type {import('next').NextConfig} */
const nextConfig = {
  // Both checks now run as part of `npm run build`. They used to be skipped,
  // which meant a type error or lint failure could be deployed without anyone
  // noticing, because the build stayed green while the editor showed problems.
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    // Optimisation used to be switched off, which meant a phone downloaded the
    // same full-size file a desktop did. Netlify's Next.js runtime serves
    // /_next/image through its own image CDN at no extra cost, so leaving this
    // on gives every <Image> a responsive srcset plus AVIF/WebP conversion.
    //
    // If images ever stop loading on a deploy, `unoptimized: true` here is the
    // one-line way back to the old behaviour.
    formats: ["image/avif", "image/webp"],
    // Real phone widths first: most visitors here are on mobile.
    deviceSizes: [360, 414, 640, 750, 828, 1080, 1200, 1600, 1920],
    imageSizes: [64, 96, 128, 200, 256, 384],
    // Cloudinary URLs are immutable (the transform is part of the path), so a
    // long cache is safe and keeps repeat transforms off the bill.
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/duuqhl0w9/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/testimonials",
        destination: "/",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
