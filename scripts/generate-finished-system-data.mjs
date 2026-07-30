import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const inputPath = path.resolve(
  "docs/research/products/finished-pages.raw.json",
);
const outputPath = path.resolve(
  "src/data/products/finished.generated.ts",
);

const rawVariants = JSON.parse(await readFile(inputPath, "utf8"));
const fallbackIcon =
  "/assets/products/finished/poseena/df9416c5-b508-47f5-bb78-6ba523db126c.png";
const commonTabs = [
  {
    key: "poseena",
    label: "POSEENA 普西纳",
    route: "/home_decoration_p5.html",
    sprite:
      "/assets/products/finished/poseena/fe5763e5-37c8-4222-bf98-d4dba0b0aa02.jpg",
  },
  {
    key: "heqi",
    label: "禾气",
    route: "/home_decoration_p1.html",
    sprite:
      "/assets/products/finished/poseena/925d891b-d589-48d0-a44d-d09b0220e90f.jpg",
  },
  {
    key: "qizhi",
    label: "气质",
    route: "/home_decoration_p2.html",
    sprite:
      "/assets/products/finished/poseena/fe82d2e4-ffed-4386-b6d1-0cc7fbb10eab.jpg",
  },
  {
    key: "tianji",
    label: "天际",
    route: "/home_decoration_p3.html",
    sprite:
      "/assets/products/finished/poseena/b391778e-6b39-4269-9409-2d888309cb5c.jpg",
  },
  {
    key: "lingjian",
    label: "领见",
    route: "/home_decoration_p4.html",
    sprite:
      "/assets/products/finished/poseena/4d5335d7-8169-44ef-b025-c8bbe4f33f81.jpg",
  },
  {
    key: "diko",
    label: "DIKO",
    route: "/home_decoration_p6.html",
    sprite:
      "/assets/products/finished/poseena/053e5c97-7bb9-43a7-88a9-75ee128ca0a5.jpg",
  },
];

function localOnly(value) {
  return typeof value === "string" && value.startsWith("/assets/")
    ? value
    : "";
}

const normalized = rawVariants.map((variant) => ({
  key: variant.key,
  route:
    commonTabs.find((tab) => tab.key === variant.key)?.route ??
    "/home_decoration_p5.html",
  pageTitle: variant.pageTitle,
  hero: localOnly(variant.hero),
  introduction: variant.introduction,
  spaces: variant.spaces.map((space, index) => ({
    id: space.id ?? `${variant.key}-${index + 1}`,
    title: space.title,
    english: space.english,
    image: localOnly(space.image),
    icon: localOnly(space.icon) || fallbackIcon,
    detailImages: (space.detailImages ?? []).map(localOnly).filter(Boolean),
  })),
}));

const source = `/* This file is generated from the audited original-page extraction. */
export const finishedSeriesTabs = ${JSON.stringify(commonTabs, null, 2)} as const;

export const finishedVariantData = ${JSON.stringify(normalized, null, 2)} as const;
`;

await writeFile(outputPath, source);
process.stdout.write(
  `Generated ${normalized.length} finished-system variants in ${outputPath}.\n`,
);
