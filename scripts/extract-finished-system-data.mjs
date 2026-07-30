import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const origin = "https://www.ny-dk.com";
const outputPath = path.resolve(
  "docs/research/products/finished-pages.raw.json",
);
const manifest = JSON.parse(
  await readFile(
    path.resolve("docs/research/products/finished-assets.manifest.json"),
    "utf8",
  ),
);

const variants = [
  { key: "poseena", path: "/home_decoration_p5.html?p=4" },
  { key: "heqi", path: "/home_decoration_p1.html?p=4" },
  { key: "qizhi", path: "/home_decoration_p2.html?p=4" },
  { key: "tianji", path: "/home_decoration_p3.html?p=4" },
  { key: "lingjian", path: "/home_decoration_p4.html?p=4" },
  { key: "diko", path: "/home_decoration_p6.html?p=4" },
];

const requestHeaders = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/138 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,*/*;q=0.8",
};

function cleanText(value = "") {
  return value
    .replaceAll(/<br\s*\/?>/gi, "\n")
    .replaceAll(/<[^>]+>/g, "")
    .replaceAll("&nbsp;", " ")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll(/\s+/g, " ")
    .trim();
}

function normalizeUrl(value, pageUrl) {
  return new URL(value.replaceAll("&amp;", "&"), pageUrl).href;
}

function assetMapFor(key) {
  return new Map(
    manifest[key].assets.map((asset) => [
      new URL(asset.source).pathname,
      asset.local,
    ]),
  );
}

function localize(value, pageUrl, assetMap) {
  const source = normalizeUrl(value, pageUrl);
  return assetMap.get(new URL(source).pathname) ?? source;
}

function firstMatch(html, pattern, index = 1) {
  return pattern.exec(html)?.[index] ?? "";
}

function extractVariant(html, variant, pageUrl) {
  const assets = assetMapFor(variant.key);
  const heroSource = firstMatch(
    html,
    /class=["']inner_banner["'][\s\S]*?<img[^>]+src=["']([^"']+)/i,
  );
  const introMatch =
    /class=["']xz["'][\s\S]*?<div class=["']txt["']>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>[\s\S]*?<span[^>]*>([\s\S]*?)<\/span>[\s\S]*?<em[^>]*>([\s\S]*?)<\/em>[\s\S]*?<i[^>]*>([\s\S]*?)<\/i>/i.exec(
      html,
    );

  const seriesTabs = [
    ...html.matchAll(
      /<a[^>]+href=["'](\/home_decoration_p(?:[1-6])?\.html[^"']*)["'][^>]*>\s*<img[^>]+src=["']([^"']+)/gi,
    ),
  ].map((match) => ({
    route: match[1],
    sprite: localize(match[2], pageUrl, assets),
  }));

  const sceneMatches = [
    ...html.matchAll(
      /<div class=["']item(?:\s+on|\s*)["']>[\s\S]*?<div class=["']img["']>\s*<img[^>]+src=["']([^"']+)[\s\S]*?<div class=["']txt["']>\s*<p[^>]*>([\s\S]*?)<\/p>\s*<span[^>]*>([\s\S]*?)<\/span>/gi,
    ),
  ];
  const scenes = sceneMatches
    .map((match) => ({
      image: localize(match[1], pageUrl, assets),
      english: cleanText(match[2]),
      title: cleanText(match[3]),
    }))
    .filter(
      (item) =>
        item.english.includes("SPACE") || item.english === "Customer Case",
    )
    .slice(0, 7);

  const spaceTabs = [
    ...html.matchAll(
      /<div class=["']swiper-slide[^"']*["'][^>]*data-img=["']([^"']*)["'][\s\S]*?<div class=["']ic["']>\s*<img[^>]+src=["']([^"']+)[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/gi,
    ),
  ]
    .map((match, index) => ({
      id: String(index + 1),
      title: cleanText(match[3]),
      icon: localize(match[2], pageUrl, assets),
      detailImages: match[1]
        .split(",")
        .map((url) => url.trim())
        .filter(Boolean)
        .map((url) => localize(url, pageUrl, assets)),
    }))
    .slice(0, scenes.length);

  const detailImageSource = firstMatch(
    html,
    /class=["']item_l[^"']*["'][\s\S]*?<img[^>]+src=["']([^"']+)/i,
  );
  const detailSection = firstMatch(
    html,
    /class=["']item_r[^"']*["']>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/i,
  );
  const detailSlides = [
    ...detailSection.matchAll(
      /class=["']swiper-slide[^"']*["'][\s\S]*?<img[^>]+src=["']([^"']+)/gi,
    ),
  ].map((match) => localize(match[1], pageUrl, assets));

  return {
    key: variant.key,
    sourcePath: variant.path,
    pageTitle: cleanText(firstMatch(html, /<title>([\s\S]*?)<\/title>/i)),
    hero: heroSource ? localize(heroSource, pageUrl, assets) : "",
    seriesTabs,
    introduction: {
      title: cleanText(introMatch?.[1]),
      subtitle: cleanText(introMatch?.[2]),
      description: cleanText(introMatch?.[3]),
      english: cleanText(introMatch?.[4]),
    },
    spaces: scenes.map((scene, index) => ({
      ...scene,
      ...spaceTabs[index],
    })),
    detailImage: detailImageSource
      ? localize(detailImageSource, pageUrl, assets)
      : "",
    detailSlides,
  };
}

const output = [];

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

  output.push(extractVariant(await response.text(), variant, pageUrl));
}

await writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`);
process.stdout.write(
  output
    .map(
      (variant) =>
        `${variant.key}: ${variant.spaces.length} spaces, ${variant.detailSlides.length} detail slides`,
    )
    .join("\n") + "\n",
);
