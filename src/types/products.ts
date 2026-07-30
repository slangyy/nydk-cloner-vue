import type { InnerPageHeroConfig } from "@/types/content";

export type ProductPageKey =
  | "design"
  | "production"
  | "process"
  | "intelligent"
  | "finished"
  | "material"
  | "integrated"
  | "service";

export interface ProductPageConfig {
  readonly key: ProductPageKey;
  readonly hero: InnerPageHeroConfig;
}

export interface ProductSectionContent {
  readonly eyebrow?: string;
  readonly title: string;
  readonly subtitle?: string;
  readonly description: string;
  readonly english?: string;
  readonly image?: string;
  readonly imageAlt?: string;
}

export interface ProductCarouselSlide {
  readonly id: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly title?: string;
  readonly description?: string;
}

export interface ProductSpaceTab {
  readonly id: string;
  readonly title: string;
  readonly english: string;
  readonly icon?: string;
  readonly slides: readonly ProductCarouselSlide[];
}

export interface ProductionCapability {
  readonly id: string;
  readonly title: string;
  readonly description: readonly string[];
  readonly icon: string;
}

export interface MaterialItem {
  readonly id: string;
  readonly title: string;
  readonly image: string;
}

export interface ServiceStep {
  readonly id: string;
  readonly number: string;
  readonly title: string;
  readonly subtitle: string;
  readonly icon?: string;
}

export type IntegratedVariantKey = "door" | "wall" | "cabinet";

export interface IntegratedVariantTab {
  readonly key: IntegratedVariantKey;
  readonly label: string;
  readonly route: string;
  readonly sprite: string;
}

export interface IntegratedSystemVariant {
  readonly key: IntegratedVariantKey;
  readonly route: string;
  readonly pageTitle: string;
  readonly hero: InnerPageHeroConfig;
  readonly introduction: {
    readonly title: string;
    readonly subtitle: string;
    readonly description: string;
    readonly english: string;
  };
  readonly slides: readonly ProductCarouselSlide[];
}

export type FinishedSeriesKey =
  | "poseena"
  | "heqi"
  | "qizhi"
  | "tianji"
  | "lingjian"
  | "diko";

export interface FinishedSeriesTab {
  readonly key: FinishedSeriesKey;
  readonly label: string;
  readonly route: string;
  readonly sprite: string;
}

export interface FinishedSpace {
  readonly id: string;
  readonly title: string;
  readonly english: string;
  readonly image: string;
  readonly icon: string;
  readonly detailImages: readonly string[];
}

export interface FinishedSystemVariant {
  readonly key: FinishedSeriesKey;
  readonly route: string;
  readonly pageTitle: string;
  readonly hero: InnerPageHeroConfig;
  readonly introduction: ProductSectionContent;
  readonly spaces: readonly FinishedSpace[];
}
