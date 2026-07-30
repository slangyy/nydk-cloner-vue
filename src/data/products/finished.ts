import {
  finishedSeriesTabs as generatedSeriesTabs,
  finishedVariantData,
} from "@/data/products/finished.generated";
import type {
  FinishedSeriesKey,
  FinishedSeriesTab,
  FinishedSystemVariant,
} from "@/types/products";

const watermark =
  "/assets/backgrounds/109cddbb-f0ab-4d85-b117-906b3cd928a9.png";

export const finishedSeriesTabs: readonly FinishedSeriesTab[] =
  generatedSeriesTabs;

function createVariant(
  variant: (typeof finishedVariantData)[number],
): FinishedSystemVariant {
  return {
    ...variant,
    hero: {
      image: variant.hero,
      imageAlt: `${variant.introduction.title}成品系统空间`,
      title: "PRODUCT SYSTEM",
      subtitle: variant.introduction.title,
      watermark,
      aspectRatio: [1920, 1080],
      breadcrumbs: [
        {
          label: "网站首页",
          to: "/",
          showHomeIcon: true,
        },
        {
          label: variant.introduction.title,
          current: true,
        },
      ],
    },
  };
}

export const finishedSystemVariants = {
  poseena: createVariant(finishedVariantData[0]),
  heqi: createVariant(finishedVariantData[1]),
  qizhi: createVariant(finishedVariantData[2]),
  tianji: createVariant(finishedVariantData[3]),
  lingjian: createVariant(finishedVariantData[4]),
  diko: createVariant(finishedVariantData[5]),
} as const satisfies Readonly<
  Record<FinishedSeriesKey, FinishedSystemVariant>
>;
