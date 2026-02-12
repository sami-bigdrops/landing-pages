/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui", "@workspace/lp-core"],
  async redirects() {
    return [{ source: "/", destination: "/docs", permanent: false }]
  },
}

export default nextConfig
