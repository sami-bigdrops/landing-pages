import type { MetadataRoute } from "next"
import { DEFAULT_DESCRIPTION, SITE_NAME } from "@/lib/seo"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#003599",
    lang: "en-US",
    dir: "ltr",
    categories: ["finance", "business"],
    icons: [
      {
        src: "/favicon.png",
        sizes: "100x100",
        type: "image/png",
        purpose: "any",
      },
    ],
  }
}
