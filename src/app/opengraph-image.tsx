import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background:
            "radial-gradient(circle at 12% 12%, rgba(34,211,238,0.28), transparent 40%), radial-gradient(circle at 90% 22%, rgba(251,191,36,0.2), transparent 38%), linear-gradient(160deg, #0b1120 0%, #020617 72%)",
          color: "#e2e8f0",
          fontFamily: "Segoe UI, Helvetica, Arial, sans-serif",
          padding: "56px 64px",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.1) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "linear-gradient(180deg, rgba(0,0,0,0.65), transparent 92%)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 18, zIndex: 1 }}>
          <p
            style={{
              margin: 0,
              fontSize: 20,
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: "#67e8f9",
              fontWeight: 600,
            }}
          >
            AI Systems Portfolio
          </p>
          <h1
            style={{
              margin: 0,
              fontSize: 64,
              lineHeight: 1.05,
              fontWeight: 700,
              maxWidth: 960,
              letterSpacing: "-0.02em",
            }}
          >
            Lakshay Kumar
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: 30,
              color: "#cbd5e1",
              maxWidth: 990,
              lineHeight: 1.3,
            }}
          >
            LLM inference, multimodal retrieval benchmarks, and simulation-grade C++/VTK engineering.
          </p>
        </div>
        <div
          style={{
            display: "flex",
            gap: 14,
            zIndex: 1,
          }}
        >
          {["vLLM Load-Tuned", "600k Embedding Benchmarks", "C++ / VTK Systems"].map((tag) => (
            <span
              key={tag}
              style={{
                border: "1px solid rgba(103, 232, 249, 0.55)",
                borderRadius: 999,
                padding: "10px 20px",
                fontSize: 20,
                color: "#cffafe",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
