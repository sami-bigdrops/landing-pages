import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Quotifii - Compare auto and home insurance quotes in the US"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "64px",
          background: "linear-gradient(135deg, #003599 0%, #0B4FCC 55%, #F16601 100%)",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginBottom: 20,
          }}
        >
          Quotifii
        </div>
        <div
          style={{
            fontSize: 40,
            fontWeight: 600,
            lineHeight: 1.25,
            maxWidth: 900,
          }}
        >
          Compare Auto & Home Insurance Quotes Across the United States
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 24,
            opacity: 0.92,
            maxWidth: 860,
          }}
        >
          Free quote comparison from trusted providers. No obligation.
        </div>
      </div>
    ),
    size
  )
}
