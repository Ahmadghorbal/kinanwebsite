import { ImageResponse } from "next/og";
import { siteContent } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = siteContent.name.en;

// Latin text keeps the OG image glyph-safe across platforms without shipping a
// custom Arabic font into the edge renderer.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0b3b2c 0%, #04120d 100%)",
          color: "#f5f5f7",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            width: 84,
            height: 84,
            borderRadius: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(150deg, #2fb489, #157a5b)",
            color: "#04120d",
            fontSize: 38,
            fontWeight: 700,
          }}
        >
          KN
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -1 }}>
            {siteContent.name.en}
          </div>
          <div style={{ marginTop: 16, fontSize: 34, color: "#8fd8bf" }}>
            {siteContent.role.en}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
