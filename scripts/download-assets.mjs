import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, extname } from "node:path";

const extractPath = new URL("../docs/research/original-page-extract.json", import.meta.url);

const extract = JSON.parse(await readFile(extractPath, "utf8"));

const fontUrl =
  "https://omo-oss-file.thefastfile.com/portal-saas/ngc202306270002/cms/file/faca3e70-537f-40e3-8088-3419b0536fd1.ttf";

const unwrapBackground = (value) => {
  const match = value.match(/url\(["']?(.*?)["']?\)/);
  return match?.[1] ?? "";
};

const normalizeUrl = (value) => {
  if (!value) return "";
  return value.replaceAll("&amp;", "&");
};

const entries = [
  ...extract.images.map((image) => ({ category: "images", url: image.src })),
  ...extract.videos.map((video) => ({ category: "video", url: video.src })),
  ...extract.backgrounds.map((value) => ({
    category: "backgrounds",
    url: unwrapBackground(value),
  })),
  ...extract.favicons.map((url) => ({ category: "seo", url })),
  { category: "fonts", url: fontUrl },
]
  .map((entry) => ({ ...entry, url: normalizeUrl(entry.url) }))
  .filter((entry) => entry.url.startsWith("http"));

const uniqueEntries = [
  ...new Map(entries.map((entry) => [`${entry.category}:${entry.url}`, entry])).values(),
];

const extensionFor = (url, contentType) => {
  const parsed = new URL(url);
  const existing = extname(parsed.pathname);
  if (existing) return existing.toLowerCase();
  if (contentType.includes("image/webp")) return ".webp";
  if (contentType.includes("image/png")) return ".png";
  if (contentType.includes("image/svg")) return ".svg";
  if (contentType.includes("video/mp4")) return ".mp4";
  if (contentType.includes("font/ttf")) return ".ttf";
  return ".bin";
};

const safeFilename = (url, contentType) => {
  const parsed = new URL(url);
  const rawBase = basename(parsed.pathname, extname(parsed.pathname));
  const normalized = rawBase.replace(/[^a-zA-Z0-9_-]+/g, "-").replace(/^-|-$/g, "");
  const fallback = createHash("sha1").update(url).digest("hex").slice(0, 16);
  return `${normalized || fallback}${extensionFor(url, contentType)}`;
};

for (const category of ["images", "video", "backgrounds", "seo", "fonts"]) {
  await mkdir(new URL(`../public/assets/${category}/`, import.meta.url), {
    recursive: true,
  });
}

const manifest = {};
const failures = [];
let cursor = 0;

const downloadOne = async (entry) => {
  const response = await fetch(entry.url, {
    headers: {
      referer: "https://www.ny-dk.com/",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/138.0.0.0 Safari/537.36",
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const contentType = response.headers.get("content-type") ?? "";
  const filename = safeFilename(entry.url, contentType);
  const outputUrl = new URL(`../public/assets/${entry.category}/${filename}`, import.meta.url);
  await writeFile(outputUrl, Buffer.from(await response.arrayBuffer()));
  manifest[entry.url] = `/assets/${entry.category}/${filename}`;
};

const worker = async () => {
  while (cursor < uniqueEntries.length) {
    const entry = uniqueEntries[cursor];
    cursor += 1;
    try {
      await downloadOne(entry);
    } catch (error) {
      failures.push({
        url: entry.url,
        category: entry.category,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }
};

await Promise.all(Array.from({ length: 4 }, () => worker()));

await writeFile(
  new URL("../public/assets/manifest.json", import.meta.url),
  `${JSON.stringify(manifest, null, 2)}\n`,
  "utf8",
);
await writeFile(
  new URL("../docs/research/ASSET_DOWNLOAD_REPORT.json", import.meta.url),
  `${JSON.stringify(
    {
      requested: uniqueEntries.length,
      downloaded: Object.keys(manifest).length,
      failures,
    },
    null,
    2,
  )}\n`,
  "utf8",
);

console.log(
  `Downloaded ${Object.keys(manifest).length}/${uniqueEntries.length} assets. Failures: ${failures.length}`,
);
