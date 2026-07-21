import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name}, ${profile.title}, ${profile.institute}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0b0d0e",
          backgroundImage:
            "linear-gradient(to right, rgba(237,238,240,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(237,238,240,0.08) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#e8a33d",
            fontFamily: "monospace",
          }}
        >
          {profile.title} · {profile.institute}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 76,
            color: "#edeef0",
            fontWeight: 400,
          }}
        >
          {profile.name}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 28,
            color: "#9aa0a6",
            maxWidth: 900,
          }}
        >
          {profile.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
