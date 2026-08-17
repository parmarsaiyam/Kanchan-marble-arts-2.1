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
    // Every photo is served straight from Cloudinary, resized and converted by
    // the loader. Netlify does no image work at all, so nothing here is metered
    // and the browser makes one request instead of waiting on two CDNs.
    loader: "custom",
    loaderFile: "./lib/config/cloudinary-loader.ts",
    // The widths a srcset may contain. Phone sizes come first because most
    // visitors are on one, and the smallest entry is what a slow connection
    // ends up fetching.
    deviceSizes: [360, 414, 640, 750, 828, 1080, 1200, 1600, 1920],
    imageSizes: [64, 96, 128, 200, 256, 384],
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
