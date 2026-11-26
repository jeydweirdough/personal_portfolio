import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";
import { HOME_TITLE } from "@/lib/site";

export const alt = HOME_TITLE;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const weights = [400, 600, 700] as const;

export default async function OpenGraphImage() {
  const fonts = await Promise.all(
    weights.map(async (weight) => ({
      name: "Public Sans",
      weight,
      data: await readFile(join(process.cwd(), `src/assets/fonts/PublicSans-${weight}.ttf`)),
    })),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Public Sans",
          background: "#fff",
        }}
      >
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: 80 }}>
          <div style={{ fontSize: 82, fontWeight: 700, letterSpacing: -2, color: "#17201d" }}>{profile.name}</div>
          <div style={{ fontSize: 29, marginTop: 24, color: "#53605b" }}>{profile.titles.join(" · ")}</div>
        </div>
        <div
          style={{
            display: "flex",
            padding: "56px 80px",
            fontSize: 34,
            fontWeight: 600,
            background: "#1d5a4b",
            color: "#fff",
          }}
        >
          {profile.catchphrase}
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
