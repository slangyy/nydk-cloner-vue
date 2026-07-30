import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const origin = "https://www.ny-dk.com";
const outputRoot = path.resolve("public/assets/products/finished");
const manifestPath = path.resolve(
  "docs/research/products/finished-assets.manifest.json",
);

const variants = [
  { key: "poseena", path: "/home_decoration_p5.html?p=4" },
  { key: "heqi", path: "/home_decoration_p1.html?p=4" },
  { key: "qizhi", path: "/home_decoration_p2.html?p=4" },
  { key: "tianji", path: "/home_decoration_p3.html?p=4" },
  { key: "lingjian", path: "/home_decoration_p4.html?p=4" },
  { key: "diko", path: "/home_decoration_p6.html?p=4" },
];

const ignoredNames = new Set([
  "109cddbb-f0ab-4d85-b117-906b3cd928a9.png",
  "b654ba19-270e-4f71-8f05-9a0613b05fef.png",
  "495b445c-aaee-44cb-bc02-ab11ecae1abe.jpg",
  "1cad9789-3ef6-4db4-bfe2-982d171ae254.png",
  "0105c246-d678-4c2e-8519-d297e76b04a7.jpg",
]);

const requestHeaders = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/138 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,image/avif,image/webp,image/*,*/*;q=0.8",
};

function extractAssetUrls(html) {
  const matches = html.matchAll(
    /https:\/\/omo-oss-image\.thefastimg\.com\/[^"'(),\s<>]+/g,
  );

  return [
    ...new Set(
      [...matches]
        .map(([url]) => url.replaceAll("&amp;", "&"))
        .filter((url) => !ignoredNames.has(path.basename(new URL(url).pathname))),
    ),
  ];
}

function getFileName(url, seenNames) {
  const parsedUrl = new URL(url);
  const originalName = path.basename(parsedUrl.pathname);
  const knownUrl = seenNames.get(originalName);

  if (!knownUrl || knownUrl === url) {
    seenNames.set(originalName, url);
    return originalName;
  }

  const extension = path.extname(originalName);
  const stem = path.basename(originalName, extension);
  const suffix = createHash("sha1").update(url).digest("hex").slice(0, 8);
  return `${stem}-${suffix}${extension}`;
}

async function downloadAsset(url, destination, referer) {
  const response = await fetch(url, {
    headers: {
      ...requestHeaders,
      Referer: referer,
    },
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${url}`);
  }

  await writeFile(destination, Buffer.from(await response.arrayBuffer()));
}

async function runPool(tasks, concurrency) {
  const results = [];
  let cursor = 0;

  async function worker() {
    while (cursor < tasks.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await tasks[index]();
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, tasks.length) }, () => worker()),
  );
  return results;
}

const manifest = {};

for (const variant of variants) {
  const pageUrl = new URL(variant.path, origin).href;
  const response = await fetch(pageUrl, {
    headers: {
      ...requestHeaders,
      Referer: origin,
    },
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${pageUrl}`);
  }

  const html = await response.text();
  const urls = extractAssetUrls(html);
  const variantDir = path.join(outputRoot, variant.key);
  const seenNames = new Map();
  await mkdir(variantDir, { recursive: true });

  const assets = await runPool(
    urls.map((url) => async () => {
      const fileName = getFileName(url, seenNames);
      const destination = path.join(variantDir, fileName);
      await downloadAsset(url, destination, pageUrl);
      return {
        source: url,
        local: `/assets/products/finished/${variant.key}/${fileName}`,
      };
    }),
    6,
  );

  manifest[variant.key] = {
    page: pageUrl,
    assets,
  };
}

await mkdir(path.dirname(manifestPath), { recursive: true });
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

const total = Object.values(manifest).reduce(
  (sum, variant) => sum + variant.assets.length,
  0,
);
process.stdout.write(
  `Downloaded ${total} finished-system assets across ${variants.length} variants.\n`,
);
