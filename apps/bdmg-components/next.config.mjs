/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  async redirects() {
    return [{ source: "/", destination: "/docs", permanent: false }]
  },
}

export default nextConfig
