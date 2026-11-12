import { ImageResponse } from "next/og";

export const alt = "Merit Branding, an online studio for websites, stores, apps, hosting, and CRM";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#F4F1EA",
          color: "#0E2A3D",
        }}
      >
        <div style={{ width: 18, height: "100%", background: "#A6843D" }} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "72px 80px",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#1A5F86",
              fontWeight: 700,
            }}
          >
            Online studio
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1 }}>
              Merit Branding
            </div>
            <div style={{ marginTop: 24, fontSize: 34, color: "#3E5160" }}>
              Websites, stores, apps, hosting, and CRM
            </div>
          </div>
          <div style={{ fontSize: 26, color: "#3E5160" }}>meritbranding.com</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
