import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 675,
};
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background:
            "radial-gradient(circle at 88% 12%, rgba(34,211,238,0.18), transparent 35%), linear-gradient(180deg, #0b1120 0%, #020617 68%)",
          color: "#e2e8f0",
          fontFamily: "Segoe UI, Helvetica, Arial, sans-serif",
          padding: "56px 64px",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <p
            style={{
              margin: 0,
              fontSize: 18,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "#67e8f9",
              fontWeight: 600,
            }}
          >
            Lakshay Kumar
          </p>
          <h1
            style={{
              margin: 0,
              fontSize: 58,
              lineHeight: 1.06,
              fontWeight: 700,
              maxWidth: 1000,
              letterSpacing: "-0.02em",
            }}
          >
            Advanced AI Systems Engineer
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: 30,
              color: "#cbd5e1",
              maxWidth: 980,
              lineHeight: 1.32,
            }}
          >
            From full-stack delivery to LLM optimization, multimodal evaluation, and C++/3D systems.
          </p>
        </div>
        <p style={{ margin: 0, fontSize: 24, color: "#94a3b8" }}>
          Portfolio, case studies, and interactive lab demos
        </p>
      </div>
    ),
    size,
  );
}
